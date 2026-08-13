/// <reference types="@cloudflare/workers-types" />

interface Env {
  RESEND_API_KEY: string;
  ORDER_EMAIL_TO?: string;
}

type PagesFunction<Env = unknown> = (context: {
  request: Request;
  env: Env;
  params: Record<string, string>;
  waitUntil: (promise: Promise<unknown>) => void;
  next: () => Promise<Response>;
  data: Record<string, unknown>;
}) => Response | Promise<Response>;

// Production recipients; override with ORDER_EMAIL_TO (comma-separated).
// NOTE: until a domain is verified in Resend, it only delivers to the Resend
// account's own address — hence the .dev.vars override for local testing.
const DEFAULT_ORDER_EMAILS = [
  "info@hillestadlabs.com",
  "qcassistant@hillestadlabs.com",
];

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

// Pricing must match components/sections/CheckoutForm.tsx — recomputed
// server-side so the client-supplied total is never trusted.
const calculateShipping = (qty: number) => {
  if (qty >= 12) return 19.95;
  if (qty >= 3) return 12.95;
  return 7.95;
};

const calculateSubtotal = (qty: number) => {
  const basePrice = 50;
  if (qty >= 24) return qty * basePrice * 0.75;
  if (qty >= 12) return qty * basePrice * 0.8;
  if (qty >= 3) return qty * basePrice * 0.9;
  return qty * basePrice;
};

const clean = (value: unknown, maxLength: number): string =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const VALID_STATE_CODES = new Set([
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI",
  "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN",
  "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH",
  "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA",
  "WV", "WI", "WY",
]);

interface Address {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}

const cleanAddress = (value: unknown): Address => {
  const raw = (value && typeof value === "object" ? value : {}) as Record<string, unknown>;
  return {
    address1: clean(raw.address1, 200),
    address2: clean(raw.address2, 200),
    city: clean(raw.city, 100),
    state: clean(raw.state, 2).toUpperCase(),
    zip: clean(raw.zip, 20),
  };
};

const addressComplete = (a: Address) =>
  !!(a.address1 && a.city) &&
  VALID_STATE_CODES.has(a.state) &&
  /^\d{5}(-\d{4})?$/.test(a.zip);

const formatAddress = (a: Address) =>
  [a.address1, a.address2, `${a.city}, ${a.state} ${a.zip}`].filter(Boolean).join("\n");

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: Record<string, unknown>;
  try {
    body = (await context.request.json()) as Record<string, unknown>;
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  // Only whitelisted fields are read. The full card number and CVV are never
  // accepted or forwarded — emailing them would violate PCI-DSS.
  const firstName = clean(body.firstName, 100);
  const lastName = clean(body.lastName, 100);
  const shippingAddress = cleanAddress(body.shippingAddress);
  const billingAddress = cleanAddress(body.billingAddress);
  const email = clean(body.email, 200);
  const cardExpiry = clean(body.cardExpiry, 5);
  const cardNumber = clean(body.cardNumber, 30).replace(/\D/g, "").slice(0, 19);
  const quantity = Math.max(1, Math.min(999, Math.floor(Number(body.quantity) || 0)));

  if (
    !firstName ||
    !lastName ||
    !addressComplete(shippingAddress) ||
    !addressComplete(billingAddress) ||
    !body.quantity
  ) {
    return jsonResponse({ error: "Missing required fields" }, 400);
  }

  const subtotal = calculateSubtotal(quantity);
  const shipping = calculateShipping(quantity);
  const total = subtotal + shipping;

  const emailText = [
    "New Dr. Bee Leez Blend order (TEST MODE — no payment was processed)",
    "",
    `Name: ${firstName} ${lastName}`,
    `Quantity: ${quantity}`,
    `Subtotal: $${subtotal.toFixed(2)}`,
    `Shipping: $${shipping.toFixed(2)}`,
    `Total: $${total.toFixed(2)}`,
    "",
    "Shipping address:",
    formatAddress(shippingAddress),
    "",
    "Billing address:",
    formatAddress(billingAddress),
    "",
    `Card: ${cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ") || "????"}, expires ${cardExpiry || "??/??"}`,
    "(Security code not included — PCI-DSS prohibits transmitting it; not needed for manual/virtual-terminal entry.)",
    "",
    `Receipt email: ${email || "not provided"}`,
  ].join("\n");

  if (!context.env.RESEND_API_KEY) {
    // On localhost (wrangler pages dev) let the flow succeed without a key so
    // the form can be tested; the order is logged to the wrangler console
    // instead of emailed. In production a missing key is still a hard error.
    const hostname = new URL(context.request.url).hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      console.log("[TEST MODE — email not sent]\n" + emailText);
      return jsonResponse({ success: true, testMode: true });
    }
    return jsonResponse({ error: "Email is not configured (missing RESEND_API_KEY)" }, 500);
  }

  const to = context.env.ORDER_EMAIL_TO
    ? context.env.ORDER_EMAIL_TO.split(",").map((address) => address.trim()).filter(Boolean)
    : DEFAULT_ORDER_EMAILS;

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Dr. Bee Leez Orders <orders@leonardmaurice.com>",
        to,
        reply_to: email || undefined,
        subject: `New order: ${quantity}x Dr. Bee Leez Blend — $${total.toFixed(2)} (${firstName} ${lastName})`,
        text: emailText,
      }),
    });

    if (!resendResponse.ok) {
      const detail = await resendResponse.text();
      console.error("Resend error:", resendResponse.status, detail);
      return jsonResponse({ error: "Failed to send order email" }, 502);
    }

    return jsonResponse({ success: true });
  } catch (error) {
    console.error("Order email error:", error);
    return jsonResponse({ error: "Failed to send order email" }, 500);
  }
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
