# ClipConnect Themes

Premium Lovable template marketplace — buy a subscription, get instant remix links.

## Stack

- **Frontend**: React 19 + Vite + TailwindCSS v4
- **Auth**: JWT (migrating to Supabase)
- **Payments**: Cashfree
- **Routing**: React Router v7

## Local Development

```bash
npm install
cp .env.example .env   # fill in your keys
npm run dev            # starts on http://localhost:3000
```

## Deploy to Vercel

1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Set env vars from `.env.example` in Vercel dashboard
4. Framework preset: **Vite** — Build command: `npm run build`, Output: `dist`

## Environment Variables

See `.env.example` for all required variables.

## Admin: Adding Remix Links

```bash
curl -X POST https://your-domain.com/api/admin/set-links \
  -H "x-admin-secret: YOUR_ADMIN_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"Template Name": "https://lovable.dev/app/remix/YOUR_ID"}'
```
