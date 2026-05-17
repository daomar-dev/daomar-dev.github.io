# daomar.dev landing site

The static landing page for **daomar.dev** — an independent AI venture studio. The site is bilingual (English / 简体中文), mobile-friendly, and optimized for both search engines and generative answer engines.

Deployed via GitHub Pages from `main`. CNAME -> `daomar.dev`.

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | Landing page (hero, principles, projects, pulse) |
| `faq.html` | FAQ (bilingual, FAQPage JSON-LD) |
| `updates.html` | Daily-refreshed activity feed |
| `sources.html` | Public, machine-readable sources behind the site |
| `i18n.js` | Shared bilingual dictionary + lang toggle |
| `data/updates.json` | Daily activity feed (committed by Actions) |
| `data/sources.json` | Daily snapshot of public sources |
| `scripts/fetch-content.mjs` | Builder that produces both JSON files |
| `.github/workflows/daily-content.yml` | Runs the builder every day at 03:17 UTC |
| `llms.txt`, `robots.txt`, `sitemap.xml` | SEO + GEO helpers |

## Local development

```sh
# Optional: run the daily builder once to seed data/*.json
node scripts/fetch-content.mjs

# Preview locally with any static server, for example:
python3 -m http.server 8080
```

## Brand notes

- The brand name is **always lowercase**: `daomar.dev`.
- Default language is English; Simplified Chinese is auto-selected for `zh-*` browsers and remembered via `localStorage`.
- Same URL serves both languages; `hreflang` advertises both variants.
