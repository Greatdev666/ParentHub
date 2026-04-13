# ParentHub Platform

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Sanity](https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

**A modern, high-performance content platform for parenting insights—built with a scalable, CMS-driven architecture for speed, flexibility, and editorial excellence.**

---

## Overview

ParentHub is a production-grade content platform designed for delivering expert-driven parenting advice at scale. Inspired by leading editorial properties like Parents.com and What to Expect, ParentHub combines a blazing-fast Next.js frontend with a headless Sanity CMS backend, giving editorial teams full creative control while maintaining developer-grade performance and SEO standards.

This is not a blog template. It is a modular, monorepo-architected content system built for real editorial workflows, multi-author credibility, and a premium reader experience.

---

## Key Features

### Content and Editorial

- **Dynamic Homepage** - Algorithmically curated sections including Latest Articles, Featured Post hero, Category Spotlights, and a Team Showcase
- **Featured Topics Carousel** - An interactive, auto-scrolling carousel highlighting editorially chosen articles
- **Explore Topics** - A visual grid linking readers to top-level content categories
- **Modular Content Blocks** - Articles support rich content beyond paragraphs: data tables, callout boxes, FAQ accordions, statistical grids, numbered step cards, product cards, and embedded video
- **Author System** - Dedicated author profile pages with full bios, expertise badges, social links, and an automated feed of their published work
- **Author Cards** - Every article displays a contextual author card linking to their profile, building reader trust and editorial credibility

### Discovery and Engagement

- **Live Search** - A navbar-integrated search bar with 300ms debounced type-ahead suggestions, thumbnail previews, and a full results page
- **Email Article Sharing** - Readers can send any article to their inbox via a one-click form powered by Resend, complete with branded HTML email templates
- **Category and Subcategory Routing** - Deep, hierarchical content organization with automatic navigation generation from the CMS
- **Related Articles** - Contextual recommendations displayed at the bottom of every article

### Performance and SEO

- **Server-Side Rendering** - All pages are server-rendered via Next.js App Router for maximum performance and crawlability
- **Structured Data** - Automatic JSON-LD injection for Articles and Breadcrumbs on every content page
- **Dynamic Sitemap and Robots** - Programmatically generated sitemap.xml and robots.txt
- **Open Graph Metadata** - Fully resolved OG tags for rich social media previews
- **Dark Mode** - System-aware theme toggling with smooth transitions across the entire UI

### Editorial Workflow

- **Draft Preview System** - Editors can preview unpublished content in a secure sidebar directly within Sanity Studio
- **Webhook Revalidation** - On-demand ISR triggered by Sanity publish events for instant content updates without full rebuilds
- **Visual Editing Isolation** - Stega markers and editorial overlays are strictly sandboxed to the preview environment

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Runtime | Next.js 14 (App Router) | Server rendering, routing, API routes |
| CMS | Sanity v3 | Headless content management, real-time editing |
| Styling | Tailwind CSS 3 | Utility-first responsive design system |
| Typography | tailwindcss/typography | Prose styling for long-form content |
| Email | Resend | Transactional email delivery |
| Icons | Lucide React | Consistent, tree-shakeable icon set |
| Monorepo | Turborepo + pnpm | Workspace orchestration and caching |
| Node | 20.0.0 or higher | Runtime requirement |

---

## Architecture Overview

ParentHub follows a decoupled architecture with clear separation between content authoring and content delivery.

```
+----------------------------------+
|         Sanity Studio            |
|   (Embedded at /studio route)    |
|                                  |
|  Authors > Articles > Categories |
|  Rich text blocks, media, SEO   |
+----------------+-----------------+
                 |
                 | GROQ Queries
                 | Webhook (revalidation)
                 v
+----------------------------------+
|       Next.js App Router         |
|                                  |
|  Server Components (SSR/ISR)     |
|  API Routes (/api/*)             |
|  Client Components (Search, UI)  |
|                                  |
|  +----------------------------+  |
|  |  Sanity Client (fetch.ts)  |  |
|  |  Draft Mode / Preview      |  |
|  |  Image URL Builder         |  |
|  +----------------------------+  |
+----------------------------------+
```

Data flows one direction: Editors create and publish content in Sanity. Sanity fires a webhook. Next.js revalidates the affected pages. Readers see fresh content within seconds.

---

## Folder Structure

```
ParentHub-Platform/
|-- apps/
|   +-- web/                          # Next.js frontend application
|       |-- app/
|       |   |-- (site)/               # Public-facing routes
|       |   |   |-- [category]/       # Category listing pages
|       |   |   |   +-- [subcategory]/
|       |   |   |       +-- [slug]/   # Individual article pages
|       |   |   |-- author/[slug]/    # Author profile pages
|       |   |   |-- search/           # Full search results page
|       |   |   |-- about/            # Static pages
|       |   |   +-- layout.tsx        # Site-wide layout (Header + Footer)
|       |   |-- (studio)/             # Embedded Sanity Studio
|       |   +-- api/                  # API route handlers
|       |       |-- search/           # Live search endpoint
|       |       |-- send-article/     # Email delivery endpoint
|       |       |-- revalidate/       # Webhook-triggered ISR
|       |       |-- preview/          # Draft mode activation
|       |       +-- og/               # Dynamic OG image generation
|       |-- components/
|       |   |-- content/              # ArticleCard, AuthorCard, EmailForm
|       |   |-- home/                 # Homepage sections (Hero, Carousel, etc.)
|       |   |-- layout/              # Header, Footer, SearchBar, ThemeToggle
|       |   |-- portable-text/        # Rich content renderers (Table, FAQ, etc.)
|       |   |-- seo/                  # JSON-LD structured data components
|       |   +-- ui/                   # Shared primitives (Card, Badge, etc.)
|       +-- lib/
|           +-- sanity/               # Client config, queries, image helpers
|-- packages/
|   +-- cms/                          # Sanity schema definitions
|       +-- schemas/
|           |-- documents/            # article, author, category, page, tag, teamMember
|           |-- objects/              # callout, faq, statGrid, tableBlock, videoEmbed
|           +-- singletons/           # siteSettings, footerSettings
|-- infrastructure/                   # Deployment configs, monitoring, scripts
|-- studio-parenthub/                 # Standalone Sanity Studio (alternative entry)
|-- turbo.json                        # Turborepo pipeline configuration
+-- pnpm-workspace.yaml              # Monorepo workspace definition
```

---

## Getting Started

### Prerequisites

- Node.js 20.0.0 or higher
- pnpm 9.14.0 or higher - Install with `npm install -g pnpm`
- A Sanity.io project (free tier works)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/parenthub-platform.git
cd parenthub-platform

# Install all workspace dependencies
pnpm install

# Copy the environment template
cp .env.example apps/web/.env.local
```

### Configure Environment Variables

Edit `apps/web/.env.local` with your actual credentials. See the Environment Variables section below for details.

### Run the Development Server

```bash
# Start both the Next.js frontend and Sanity Studio
pnpm dev
```

- Frontend: http://localhost:3000
- Sanity Studio: http://localhost:3333

---

## Environment Variables

All environment variables live in `apps/web/.env.local`. Here is what each one does:

| Variable | Required | Description |
|----------|----------|-------------|
| NEXT_PUBLIC_SANITY_PROJECT_ID | Yes | Your Sanity project ID (found in sanity.io/manage) |
| NEXT_PUBLIC_SANITY_DATASET | Yes | Dataset name, typically `production` |
| NEXT_PUBLIC_SANITY_API_VERSION | Yes | Sanity API version date (e.g., `2024-01-01`) |
| SANITY_API_READ_TOKEN | Yes | API token with at least Editor permissions for preview/draft fetching |
| SANITY_WEBHOOK_SECRET | Recommended | Shared secret for validating incoming Sanity webhook payloads |
| NEXT_PUBLIC_SITE_URL | Yes | The canonical URL of your site (`http://localhost:3000` for dev) |
| REVALIDATION_SECRET | Recommended | Secret token for securing the /api/revalidate endpoint |
| NEXT_PUBLIC_GTM_ID | Optional | Google Tag Manager container ID for analytics |
| RESEND_API_KEY | Optional | API key from Resend.com, required for the Send to Email feature |

**Security Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. All others remain server-side only. Never commit `.env.local` to version control.

---

## Content Management

ParentHub is designed so that non-technical editors can manage 100% of the content without touching code.

### Creating Content in Sanity Studio

1. Navigate to `/studio` on your running instance
2. Use the sidebar to create or edit Articles, Authors, Categories, and Pages
3. Articles support a rich body editor with the following custom blocks:
   - Callout Boxes (Tip, Warning, and Info variants)
   - FAQ Accordions (Question/answer pairs that expand on click)
   - Data Tables (Structured tabular content)
   - Statistical Grids (Visual data cards with customizable shapes)
   - Numbered Step Cards (Ordered instructional content)
   - Product Cards (Merchandise or resource highlights)
   - Video Embeds (YouTube/Vimeo integration)

### Author Profiles

Each author document includes:

- **Short Bio** - Displayed on article cards across the site
- **Full Bio** - Rich text biography rendered on their dedicated profile page
- **Areas of Expertise** - Tagged skills (e.g., Pediatrics, Nutrition)
- **Social Links** - Twitter and LinkedIn profiles
- **Role** - Editorial title displayed beneath their name

### Publishing Workflow

1. Create or edit content in the Studio
2. Click Publish to push changes live
3. If webhook revalidation is configured, affected pages refresh automatically
4. Use the Preview sidebar to see unpublished drafts on the live frontend in real-time

---

## Deployment

### Vercel (Recommended)

```bash
# Install the Vercel CLI
npm install -g vercel

# Deploy from the project root
vercel --prod
```

Set all environment variables in the Vercel dashboard under Settings then Environment Variables.

### Hostinger VPS

1. **Provision the server** - Install Node.js >= 20, pnpm, and a process manager like PM2

2. **Clone and build:**

```bash
git clone https://github.com/your-org/parenthub-platform.git
cd parenthub-platform
pnpm install
pnpm build
```

3. **Start the production server:**

```bash
cd apps/web
pm2 start npm --name "parenthub" -- start
```

4. **Configure Nginx** as a reverse proxy pointing to localhost:3000

5. **Set up SSL** via Lets Encrypt / Certbot

6. **Configure Sanity webhooks** to point to `https://yourdomain.com/api/revalidate`

### Sanity Studio Deployment

The Studio is embedded in the Next.js app at `/studio`, so it deploys alongside the frontend automatically. No separate deployment is needed.

---

## API Routes

| Endpoint | Method | Purpose |
|----------|--------|---------|
| /api/search?q=keyword | GET | Returns top 5 matching articles for live search suggestions |
| /api/send-article | POST | Sends a branded HTML email containing the article to the specified address |
| /api/revalidate | POST | Webhook endpoint - Sanity triggers this to revalidate cached pages on publish |
| /api/preview | GET | Activates Next.js Draft Mode for previewing unpublished content |
| /api/disable-preview | GET | Deactivates Draft Mode and clears the preview cookie |
| /api/og | GET | Generates dynamic Open Graph images for social sharing |

---

## Roadmap

- Newsletter subscription system with audience segmentation
- Comment and discussion threads on articles
- Algolia integration for advanced full-text search
- Reading progress indicator on article pages
- Bookmark and save article functionality
- Multi-language (i18n) content support
- A/B testing framework for headlines and layouts
- Admin analytics dashboard for editors
- PWA support for mobile readers

---

## Contributing

Contributions are welcome. To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please follow existing code conventions, use TypeScript throughout, and ensure your changes do not break the build (`pnpm build`).

---

## License

This project is licensed under the MIT License. See LICENSE for details.

---

Built with intention by the ParentHub team. Empowering parents with expert-driven content, delivered at production speed.
