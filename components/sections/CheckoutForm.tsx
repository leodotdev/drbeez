"use client";

import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { SiteContent } from "@/lib/default-content";

// TEST MODE: card fields only need to be non-empty so the flow can be
// exercised with fake data. Set to false to enforce Luhn/expiry/CVC checks.
const LENIENT_CARD_VALIDATION = true;

// Tiered flat-rate shipping by quantity; must match functions/api/order.ts
const calculateShipping = (qty: number) => {
  if (qty >= 12) return 19.95;
  if (qty >= 3) return 12.95;
  return 7.95;
};

// Pricing: $50 per bottle, 10% off for 3+ bottles, 20% off for 12+ bottles
const calculateDisplayPrice = (qty: number) => {
  if (qty <= 0) return 0;
  const basePrice = 50;

  if (qty >= 12) {
    return qty * basePrice * 0.8;
  } else if (qty >= 3) {
    return qty * basePrice * 0.9;
  } else {
    return qty * basePrice;
  }
};

const luhnValid = (digits: string) => {
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = digits.charCodeAt(i) - 48;
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
};

const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, "")
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, "$1 ");

const formatZip = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 9);
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
};

const zipValid = (zip: string) => /^\d{5}(-\d{4})?$/.test(zip);

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

export const US_STATES = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"],
  ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"],
  ["DC", "District of Columbia"], ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"],
  ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"],
  ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"],
  ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"],
  ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"],
  ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"],
  ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"],
  ["OK", "Oklahoma"], ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"],
  ["SC", "South Carolina"], ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"],
  ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"],
  ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
] as const;

interface Address {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}

const emptyAddress: Address = {
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
};

const requiredAddressFields: (keyof Address)[] = ["address1", "city", "state", "zip"];

const inputClasses =
  "w-full px-3 py-2 border border-charcoal/20 rounded-md text-charcoal bg-white transition-[border-color,box-shadow] duration-150 hover:border-charcoal/40 focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-royal-blue/15 aria-invalid:border-red-400";
const labelClasses = "block text-charcoal-muted text-sm mb-1";
const sectionLegendClasses =
  "text-xs font-semibold uppercase tracking-wider text-charcoal-muted mb-2";
const errorClasses = "text-red-600 text-sm mt-1";

interface AddressFieldsetProps {
  idPrefix: string;
  autoCompletePrefix: "shipping" | "billing";
  value: Address;
  errors: Partial<Record<keyof Address, string>>;
  onChange: (field: keyof Address, value: string) => void;
  checkout: SiteContent["checkout"];
}

function AddressFieldset({
  idPrefix,
  autoCompletePrefix,
  value,
  errors,
  onChange,
  checkout,
}: AddressFieldsetProps) {
  const field = (
    name: keyof Address,
    label: string,
    autoComplete: string,
    extraProps: React.InputHTMLAttributes<HTMLInputElement> = {}
  ) => {
    const id = `${idPrefix}-${name}`;
    const error = errors[name];
    return (
      <div>
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
        <input
          type="text"
          id={id}
          name={`${autoCompletePrefix}-${autoComplete}`}
          autoComplete={`${autoCompletePrefix} ${autoComplete}`}
          value={value[name]}
          onChange={(e) =>
            onChange(name, name === "zip" ? formatZip(e.target.value) : e.target.value)
          }
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...extraProps}
        />
        {error && (
          <p id={`${id}-error`} className={errorClasses}>
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {field("address1", checkout.address1Label, "address-line1")}
      {field("address2", checkout.address2Label, "address-line2")}
      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-2">
          {field("city", checkout.cityLabel, "address-level2")}
        </div>
        <div>
          <label htmlFor={`${idPrefix}-state`} className={labelClasses}>
            {checkout.stateLabel}
          </label>
          <div className="relative">
            <select
              id={`${idPrefix}-state`}
              name={`${autoCompletePrefix}-state`}
              autoComplete={`${autoCompletePrefix} address-level1`}
              value={value.state}
              onChange={(e) => onChange("state", e.target.value)}
              className={`${inputClasses} appearance-none cursor-pointer pr-8`}
              aria-invalid={!!errors.state}
              aria-describedby={errors.state ? `${idPrefix}-state-error` : undefined}
            >
              <option value="" disabled>
                —
              </option>
              {US_STATES.map(([code]) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal pointer-events-none"
              aria-hidden="true"
            />
          </div>
          {errors.state && (
            <p id={`${idPrefix}-state-error`} className={errorClasses}>
              {errors.state}
            </p>
          )}
        </div>
        {field("zip", checkout.zipLabel, "postal-code", {
          inputMode: "numeric",
          maxLength: 10,
          placeholder: "12345",
        })}
      </div>
    </div>
  );
}

export default function CheckoutForm() {
  const { t: content } = useI18n();
  const [quantity, setQuantity] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [shipping, setShipping] = useState<Address>(emptyAddress);
  const [billing, setBilling] = useState<Address>(emptyAddress);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const subtotal = calculateDisplayPrice(quantity);
  const shippingCost = calculateShipping(quantity);
  const orderTotal = subtotal + shippingCost;
  const checkout = content.checkout;

  const clearError = (key: string) =>
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const setShippingField = (name: keyof Address, value: string) => {
    setShipping((prev) => ({ ...prev, [name]: value }));
    clearError(`shipping-${name}`);
  };

  const setBillingField = (name: keyof Address, value: string) => {
    setBilling((prev) => ({ ...prev, [name]: value }));
    clearError(`billing-${name}`);
  };

  const addressErrors = (prefix: string): Partial<Record<keyof Address, string>> => {
    const result: Partial<Record<keyof Address, string>> = {};
    for (const name of requiredAddressFields) {
      const message = errors[`${prefix}-${name}`];
      if (message) result[name] = message;
    }
    return result;
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};

    if (!firstName.trim()) next.firstName = checkout.requiredFieldError;
    if (!lastName.trim()) next.lastName = checkout.requiredFieldError;

    for (const name of requiredAddressFields) {
      if (!shipping[name].trim()) next[`shipping-${name}`] = checkout.requiredFieldError;
    }
    if (!next["shipping-zip"] && !zipValid(shipping.zip.trim()))
      next["shipping-zip"] = checkout.invalidZipError;
    if (!billingSameAsShipping) {
      for (const name of requiredAddressFields) {
        if (!billing[name].trim()) next[`billing-${name}`] = checkout.requiredFieldError;
      }
      if (!next["billing-zip"] && !zipValid(billing.zip.trim()))
        next["billing-zip"] = checkout.invalidZipError;
    }

    if (LENIENT_CARD_VALIDATION) {
      if (!cardNumber.trim()) next.cardNumber = checkout.requiredFieldError;
      if (!cardExpiry.trim()) next.cardExpiry = checkout.requiredFieldError;
    } else {
      const cardDigits = cardNumber.replace(/\D/g, "");
      if (cardDigits.length < 13 || cardDigits.length > 19 || !luhnValid(cardDigits))
        next.cardNumber = checkout.invalidCardError;

      const expiryMatch = cardExpiry.match(/^(\d{2})\/(\d{2})$/);
      if (!expiryMatch) {
        next.cardExpiry = checkout.invalidExpiryError;
      } else {
        const month = parseInt(expiryMatch[1], 10);
        const year = 2000 + parseInt(expiryMatch[2], 10);
        const now = new Date();
        const endOfMonth = new Date(year, month, 0, 23, 59, 59);
        if (month < 1 || month > 12 || endOfMonth < now)
          next.cardExpiry = checkout.invalidExpiryError;
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // TEMP: dummy data for exercising the form; button renders only while
  // LENIENT_CARD_VALIDATION is on, so both disappear together for production.
  const fillTestData = () => {
    setFirstName("Test");
    setLastName("Order");
    setShipping({
      address1: "123 Main Street",
      address2: "Apt 4",
      city: "Miami",
      state: "FL",
      zip: "33133",
    });
    setBilling(emptyAddress);
    setBillingSameAsShipping(true);
    setCardNumber(formatCardNumber("4242424242424242"));
    setCardExpiry("12/30");
    setEmail("leo@leo.dev");
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const trimAddress = (a: Address): Address => ({
      address1: a.address1.trim(),
      address2: a.address2.trim(),
      city: a.city.trim(),
      state: a.state.trim(),
      zip: a.zip.trim(),
    });

    setStatus("submitting");
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          shippingAddress: trimAddress(shipping),
          billingAddress: trimAddress(billingSameAsShipping ? shipping : billing),
          email: email.trim(),
          quantity,
          total: orderTotal,
          cardNumber: cardNumber.replace(/\D/g, ""),
          cardExpiry,
        }),
      });

      if (!response.ok) throw new Error(`Order submission failed: ${response.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-charcoal/10 rounded-lg p-8 w-full max-w-md flex flex-col items-center text-center gap-3">
        <CheckCircle2 className="w-10 h-10 text-royal-blue" aria-hidden="true" />
        <p className="text-xl font-semibold text-charcoal">{checkout.successTitle}</p>
        <p className="text-charcoal-muted">{checkout.successMessage}</p>
      </div>
    );
  }

  return (
    <div className="border border-charcoal/10 rounded-lg p-5 w-full max-w-md">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {LENIENT_CARD_VALIDATION && (
          <button
            type="button"
            onClick={fillTestData}
            className="w-full px-4 py-2 border border-dashed border-charcoal/30 rounded-md text-sm text-charcoal-muted hover:border-royal-blue hover:text-royal-blue transition-[border-color,color,transform] duration-150 active:scale-[0.96]"
          >
            Fill with test data (temporary)
          </button>
        )}

        {/* Quantity & Pricing */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <label htmlFor="qty" className="text-charcoal-muted text-sm">
              {content.hero.qtyLabel}
            </label>
            <input
              type="number"
              id="qty"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              className="w-16 px-3 py-2 border border-charcoal/20 rounded-md text-center text-charcoal bg-white transition-[border-color,box-shadow] duration-150 hover:border-charcoal/40 focus:outline-none focus:border-royal-blue focus:ring-[3px] focus:ring-royal-blue/15"
            />
          </div>

          <div className="text-right">
            <div className="text-2xl font-semibold text-charcoal">
              ${orderTotal.toFixed(2)}
            </div>
            <div className="text-charcoal-muted text-sm">
              {quantity >= 12 ? (
                <span className="text-royal-blue">{content.hero.saveText12Plus}</span>
              ) : quantity >= 3 ? (
                <span className="text-royal-blue">{content.hero.saveText3Plus}</span>
              ) : (
                "$50/bottle"
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-sm text-charcoal-muted">
          <div className="flex justify-between">
            <span>{checkout.subtotalLabel}</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>{checkout.shippingLabel}</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
        </div>

        <p className="text-charcoal-muted text-sm text-center">
          $50/bottle · {content.hero.saveText3Plus} 3+ · {content.hero.saveText12Plus} 12+
        </p>

        <hr className="border-charcoal/10" />

        {/* Name */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="checkout-first-name" className={labelClasses}>
              {checkout.firstNameLabel}
            </label>
            <input
              type="text"
              id="checkout-first-name"
              name="firstName"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                clearError("firstName");
              }}
              className={inputClasses}
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? "checkout-first-name-error" : undefined}
            />
            {errors.firstName && (
              <p id="checkout-first-name-error" className={errorClasses}>{errors.firstName}</p>
            )}
          </div>
          <div>
            <label htmlFor="checkout-last-name" className={labelClasses}>
              {checkout.lastNameLabel}
            </label>
            <input
              type="text"
              id="checkout-last-name"
              name="lastName"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                clearError("lastName");
              }}
              className={inputClasses}
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "checkout-last-name-error" : undefined}
            />
            {errors.lastName && (
              <p id="checkout-last-name-error" className={errorClasses}>{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Shipping Address */}
        <fieldset className="flex flex-col gap-2">
          <legend className={sectionLegendClasses}>
            {checkout.shippingAddressLabel}
          </legend>
          <AddressFieldset
            idPrefix="checkout-shipping"
            autoCompletePrefix="shipping"
            value={shipping}
            errors={addressErrors("shipping")}
            onChange={setShippingField}
            checkout={checkout}
          />
        </fieldset>

        {/* Payment */}
        <fieldset className="flex flex-col gap-3">
          <legend className={sectionLegendClasses}>{checkout.paymentLabel}</legend>
          <div>
            <label htmlFor="checkout-card-number" className={labelClasses}>
            {checkout.cardNumberLabel}
          </label>
          <input
            type="text"
            id="checkout-card-number"
            name="cardnumber"
            dir="ltr"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => {
              setCardNumber(formatCardNumber(e.target.value));
              clearError("cardNumber");
            }}
            className={inputClasses}
            aria-invalid={!!errors.cardNumber}
            aria-describedby={errors.cardNumber ? "checkout-card-number-error" : undefined}
          />
          {errors.cardNumber && (
            <p id="checkout-card-number-error" className={errorClasses}>{errors.cardNumber}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="checkout-card-expiry" className={labelClasses}>
              {checkout.cardExpiryLabel}
            </label>
            <input
              type="text"
              id="checkout-card-expiry"
              name="exp-date"
              dir="ltr"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              value={cardExpiry}
              onChange={(e) => {
                setCardExpiry(formatExpiry(e.target.value));
                clearError("cardExpiry");
              }}
              className={inputClasses}
              aria-invalid={!!errors.cardExpiry}
              aria-describedby={errors.cardExpiry ? "checkout-card-expiry-error" : undefined}
            />
            {errors.cardExpiry && (
              <p id="checkout-card-expiry-error" className={errorClasses}>{errors.cardExpiry}</p>
            )}
          </div>
        </div>
        </fieldset>

        {/* Billing Address */}
        <fieldset className="flex flex-col gap-2">
          <legend className={sectionLegendClasses}>
            {checkout.billingAddressLabel}
          </legend>
          <label className="flex items-center gap-2 py-1 text-charcoal text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              checked={billingSameAsShipping}
              onChange={(e) => setBillingSameAsShipping(e.target.checked)}
              className="w-4 h-4 accent-royal-blue"
            />
            {checkout.sameAsShippingLabel}
          </label>
          {!billingSameAsShipping && (
            <AddressFieldset
              idPrefix="checkout-billing"
              autoCompletePrefix="billing"
              value={billing}
              errors={addressErrors("billing")}
              onChange={setBillingField}
              checkout={checkout}
            />
          )}
        </fieldset>

        {/* Email (optional) */}
        <div>
          <label htmlFor="checkout-email" className={labelClasses}>
            {checkout.emailLabel}
          </label>
          <input
            type="email"
            id="checkout-email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
          />
        </div>

        {status === "error" && (
          <p role="alert" className="text-red-600 text-sm text-center">
            {checkout.errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full inline-flex items-center justify-center gap-2 bg-royal-blue text-white px-6 py-3 rounded-md font-[450] hover:bg-royal-blue/90 transition-[background-color,transform] duration-150 active:scale-[0.96] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? checkout.submittingText : checkout.submitButtonText}
          <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
