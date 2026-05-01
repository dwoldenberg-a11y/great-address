# Great Address

Premium domain marketplace built with Next.js 16 + Supabase.

## Setup

### 1. Supabase

Create a project at [supabase.com](https://supabase.com), then in the SQL Editor:

1. Run [`supabase/schema.sql`](supabase/schema.sql) — creates the `domains` table, RLS policies, and update trigger.
2. Run [`supabase/seed.sql`](supabase/seed.sql) — inserts the 136 starter domains.

In **Authentication → Providers → Email**, disable **"Enable Sign Ups"** so only your admin user can exist.

In **Authentication → Users**, click **Add user** and create yourself an admin account.

### 2. Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_EMAIL=you@example.com
RESEND_API_KEY=...
```

Add the same vars to your Vercel project (Settings → Environment Variables).

### 3. Run

```bash
npm install
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Admin

The admin dashboard at `/admin` lets you, per-domain:

- Edit the suggested price (blank = "Make an Offer")
- Edit description and category
- **Hide** a domain (removed from public site)
- **Mark sold** (shown publicly with a "Sold" badge, no offer forms)

## Data model

| Column          | Type           | Notes                                       |
|-----------------|----------------|---------------------------------------------|
| `slug`          | text, unique   | URL slug, e.g. `steel-ai`                   |
| `name`          | text           | Display name, e.g. `steel.ai`               |
| `description`   | text           | Optional                                    |
| `category`      | text           | e.g. `AI`, `App`                            |
| `asking_price`  | numeric, null  | `null` shows "Make an Offer" on the public site |
| `highlights`    | text[]         | Bullet tags shown on the detail page        |
| `status`        | text           | `visible` \| `hidden` \| `sold`             |
| `sort_order`    | integer        | Lower = shown first                         |

RLS: anon role sees `visible` + `sold`; authenticated role (admin) sees everything.
