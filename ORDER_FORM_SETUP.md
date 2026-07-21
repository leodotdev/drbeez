# Order Form Setup

The checkout form on the landing page posts to `/api/order` (a Cloudflare Pages Function) which emails the order details.

## Current status: TEST MODE

- Orders are emailed to `leo@leo.dev` (override with the `ORDER_EMAIL_TO` env var).
- **No payment is processed.** The full card number and security code never leave the browser — only the last 4 digits and expiry are included in the email. Emailing full card data would violate PCI-DSS; to actually charge cards, integrate a payment processor (Stripe, Square, Authorize.net) or return to SlimCD's hosted checkout.

## Email setup (Resend)

1. Sign up at [resend.com](https://resend.com) using `leo@leo.dev` (the free tier can send to your own account email from `onboarding@resend.dev` without domain verification).
2. Create an API key.
3. In Cloudflare: **Workers & Pages** → your project → **Settings** → **Environment variables** → add `RESEND_API_KEY` (mark as secret).
4. Optional: add `ORDER_EMAIL_TO` to change the recipient.
5. Redeploy.

To send from your own domain later (e.g. `orders@drbeez.com`), verify the domain in Resend and update the `from` address in `functions/api/order.ts`.

## Testing locally

`next dev` does not run Pages Functions itself; instead, dev mode proxies `/api/*` to a local wrangler server (see `next.config.ts`). Run both:

```bash
npx wrangler pages dev out --port 8788   # serves the functions (reads .dev.vars)
npm run dev                              # localhost:3000, proxies /api/* to :8788
```

Secrets for local testing live in `.dev.vars` (gitignored): `RESEND_API_KEY` and optionally `ORDER_EMAIL_TO`. Note: until a domain is verified in Resend, it will only deliver to the Resend account's own email address. Run `npm run build` to refresh the static site wrangler serves on :8788 if you test there directly.
