# Nice Korean Friend

English-language editorial site for foreigners visiting or newly living in Korea.
**Korea, explained like a friend would.**

Built with Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · MDX content · Pagefind search.
Deploys to Vercel with zero configuration.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then edit values (all optional for local dev)
npm run dev                  # http://localhost:3000
```

Production build (also validates content, checks links, and builds the search index):

```bash
npm run build
npm start
```

> Search only works after a production build — Pagefind indexes the rendered HTML
> in the `postbuild` step. In `next dev` the search page shows a friendly notice instead.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | `prebuild` (validate content + check links) → `next build` → `postbuild` (Pagefind index) |
| `npm run validate-content` | Zod-validates every MDX frontmatter in `/content`; fails on any violation. Also blocks `status: published` articles that still contain `[VERIFY]` placeholders |
| `npm run check-links` | Verifies every internal link in `/content` and `/src` resolves to a real route |
| `npm run generate-placeholders` | Regenerates any missing placeholder content files (never overwrites; `--force` to overwrite) |
| `npm run lint` | ESLint |

Content validation runs automatically before every build (`prebuild`), so **invalid
frontmatter fails the build** — locally and on Vercel.

## Environment variables

All are optional; the site builds and runs with none set. See [.env.example](.env.example).

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata/sitemap/RSS/JSON-LD (defaults to `https://nicekoreanfriend.com`) |
| `NEXT_PUBLIC_GA_ID` | GA4 ID. Loads **only after** the visitor accepts the cookie banner |
| `NEXT_PUBLIC_ADSENSE_ENABLED` | Must be exactly `true` for any `<AdSlot>` to render. Anything else → ads render nothing at all |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense publisher ID (`ca-pub-…`), required when ads are enabled |
| `ADS_TXT_CONTENT` | Contents of `/ads.txt` (use `\n` for line breaks). Empty → `/ads.txt` returns 404. Baked at build time — redeploy after changing |
| `CONTACT_FORM_FORWARD_URL` | JSON endpoint (e.g. Formspree form URL) that receives contact-form submissions. Empty → submissions are logged to the server console only |

## Content model

Content lives in `/content` as MDX, validated with zod at build time
([src/lib/schema.ts](src/lib/schema.ts)):

```
content/
  articles/     40 guides — one file per article, slug = filename
  categories/   8 hub pages (name, shortDescription, order, emoji + intro body)
  authors/      2 profiles (minji, jun)
```

### Article frontmatter schema

```yaml
title: "How to Open a Korean Bank Account as a Foreigner"   # 10–120 chars
description: "…"        # 50–170 chars (meta description)
category: money-banking # one of the 8 category slugs
template: how-to        # how-to | explainer | listicle | comparison
author: jun             # minji | jun
datePublished: "2026-08-30"
dateModified: "2026-08-30"   # must be >= datePublished
tags: ["bank-account", "arc"]  # 1–8 tags
quickAnswer: "…"        # 2–4 sentences, rendered in the Quick Answer box
faqs:                   # at least 3; rendered + emitted as FAQPage JSON-LD
  - question: "…"
    answer: "…"
status: draft           # draft | published
sources: []             # optional list of source URLs
```

### How to add an article

1. Create `content/articles/<slug>.mdx` — the filename is the URL slug
   (`/{category}/{slug}`). Copy an existing file as a template.
2. Fill in the frontmatter above. Keep `status: draft` while writing.
3. Write the body in MDX under H2 sections matching the article template.
   Use `[VERIFY]` for any figure you haven't confirmed against a primary source.
4. Run `npm run validate-content && npm run check-links`.
5. When every `[VERIFY]` is resolved and facts are sourced, set
   `status: published` and update `dateModified`.

### Draft vs published

`status: draft` articles are fully browsable for review but:
- show a prominent **DRAFT** banner,
- are `noindex, nofollow`,
- are excluded from `sitemap.xml`, `feed.xml`, and Article/FAQ JSON-LD.

The validator refuses to let a `published` article contain `[VERIFY]`.
**All 40 generated placeholder articles are drafts on purpose** — publish them
one by one as they're researched.

## Features

- **SEO**: per-page metadata + canonical, OG image route (`/api/og?title=…`),
  `sitemap.xml`, `robots.txt`, RSS (`/feed.xml`), JSON-LD
  (Organization, WebSite + SearchAction, Article, FAQPage, BreadcrumbList).
- **Search**: [Pagefind](https://pagefind.app) static index over article pages
  (`data-pagefind-body`), built in `postbuild`, served from `/pagefind/`.
- **Start Here** (`/start-here`): arrival checklist with progress persisted in
  `localStorage`.
- **Cookie consent**: banner on first visit; GA4 and the AdSense loader are
  injected **only after Accept**. Choice stored in `localStorage`.
- **AdSlot** component: hard-gated by `NEXT_PUBLIC_ADSENSE_ENABLED=true`,
  consent-gated at runtime, labeled "Advertisement".
- **Legal pages**: Privacy Policy (GDPR/CCPA, GA4 + AdSense cookies), Terms,
  Disclaimer & affiliate disclosure, Editorial Policy, About, Contact (working form).

## Deploying to Vercel

1. Push this repo to GitHub/GitLab.
2. In Vercel: **Add New Project** → import the repo. Framework preset
   auto-detects Next.js; no settings to change.
3. Add the environment variables you want (see table above) for the
   Production environment.
4. Deploy. `prebuild`/`postbuild` run automatically, so content validation and
   the search index are part of every deployment.
5. Point your domain at Vercel and set `NEXT_PUBLIC_SITE_URL` to it, then redeploy.

## Project layout

```
src/app/            routes (App Router)
  [category]/       category hubs → /money-banking
  [category]/[slug] articles      → /money-banking/open-bank-account-korea
  authors/[slug]    author pages
  api/og            OG image generator (edge)
  api/contact       contact form endpoint
  ads.txt, feed.xml sitemap.ts, robots.ts
src/components/     UI (AdSlot, CookieConsent, StartHereChecklist, SearchClient…)
src/lib/            content loader, zod schemas, JSON-LD builders, site config
content/            MDX content (articles / categories / authors)
scripts/            validate-content, check-links, generate-placeholders
```
