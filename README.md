# ParentHub Platform

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Sanity](https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

**A production-grade editorial platform for expert-driven parenting content — featuring a universal code playground, sandboxed live previews, adaptive routing, and a premium "Warm Orange" design system.**

---

## Overview

ParentHub is not a blog template. It is a modular, monorepo-architected content system built for real editorial workflows, multi-author credibility, interactive code experiences, and a premium reader experience.

The platform combines a blazing-fast Next.js 14 frontend with a headless Sanity CMS backend, giving editorial teams full creative control — from rich callout variants and precision-aligned data tables to live code sandboxes — while maintaining developer-grade performance, SEO standards, and visual polish.

Inspired by leading editorial properties like Parents.com, What to Expect, and Stripe's documentation experience.

---

## Key Features

### Content & Editorial System

- **Dynamic Homepage** — Algorithmically curated sections including Latest Articles, Featured Post hero, Category Spotlights, and Team Showcase
- **Featured Topics Carousel** — Interactive, auto-scrolling carousel highlighting editorially chosen articles
- **Explore Topics** — Visual grid linking readers to top-level content categories
- **Author System** — Dedicated author profile pages with bios, expertise badges, social links, and automated article feeds
- **Author Cards** — Contextual author cards on every article, building trust and editorial credibility
- **Article-in-Article Embedding** — "In This Post" cards with intelligent category-aware URL resolution for cross-linking related content

### Rich Content Blocks

ParentHub supports **12 custom content blocks** beyond standard text, giving editors a component-level toolkit:

| Block | Description |
|-------|-------------|
| **Callout Box** | Multi-type (Info, Warning, Tip, Research, Quote, Accent Dark) with **dual visual styles** — Rounded Box or Side-Accent Line |
| **FAQ Accordion** | Expandable question/answer pairs with smooth animations |
| **Data Table** | Structured tabular content with **cell alignment control** (Left/Center/Right) and **optional row indexing** |
| **Statistical Grid** | Visual data cards with customizable shapes and metrics |
| **Numbered Card List** | Ordered instructional content with branded tag styling |
| **Product Card** | Merchandise or resource highlights |
| **Video Embed** | YouTube/Vimeo integration with responsive aspect ratios |
| **Image with Alt** | Accessible images with editor-defined alt text |
| **Article Embed List** | Cross-article references with dynamic SEO-friendly URL construction |
| **Code Snippet** | Syntax-aware code display with **Universal Playground** (see below) |

### Universal Code Playground

A standout feature that elevates ParentHub from editorial platform to interactive learning environment:

- **7 Supported Languages** — HTML, CSS, JavaScript, TypeScript, Python, JSON, and Bash/Shell
- **Tabbed Interface** — Premium `[ Code ]` / `[ Preview ]` tab switcher on every snippet
- **Sandboxed Live Preview** — Web languages (HTML/CSS/JS/TS) render inside a secure, isolated `<iframe>` using `srcdoc` with the `sandbox` attribute — zero risk to the parent document
- **Terminal Simulation** — Python, Bash, and JSON snippets display editor-provided output in a realistic dark-mode terminal console with a blinking cursor and command prompt
- **Copy to Clipboard** — One-click copy with visual confirmation state
- **Editor-Controlled** — Editors toggle "Enable Live Preview" per snippet, and provide optional "Expected Output" for console languages

### Discovery & Engagement

- **Live Search** — Navbar-integrated search with 300ms debounced type-ahead suggestions, thumbnail previews, and full results page
- **Email Article Sharing** — One-click inbox delivery powered by Resend with branded HTML email templates
- **Universal Route Resolver** — A single catch-all resolver handles all content depths (1, 2, or 3 segments) with intelligent fallback logic, eliminating 404s for flat and nested article paths alike
- **Related Articles** — Contextual recommendations at the bottom of every article

### Community Interactions

- **Secure Guest Commenting** — Readers can engage with articles via a threaded commenting system without needing strict user accounts.
- **Passwordless Guest Editing** — Includes a sophisticated "Ownership Token" system allowing users to securely edit their comments via browser-binding within a 24-hour window.
- **Smart Thread Deletion** — Authors can remove comments within 24 hours. Employs a dual-strategy engine: Hard Deletes for solitary comments, and Soft Deletes for thread anchors to preserve conversation context.
- **Toggle-able Loves** — Integrated "Unlike" logic letting users toggle their engagement securely, complete with server-side safety floors so engagement counts never drop below zero.

### Performance & SEO

- **Server-Side Rendering** — All pages rendered via Next.js App Router for maximum performance and crawlability
- **Structured Data** — Automatic JSON-LD injection for Articles and Breadcrumbs
- **Dynamic Sitemap & Robots** — Programmatically generated `sitemap.xml` and `robots.txt`
- **Open Graph Metadata** — Fully resolved OG tags for rich social media previews
- **Dark Mode** — System-aware theme toggling with smooth transitions across every component

### Editorial Workflow

- **Draft Preview System** — Editors preview unpublished content in a secure sidebar within Sanity Studio
- **Webhook Revalidation** — On-demand ISR triggered by Sanity publish events for instant updates without full rebuilds
- **Visual Editing Isolation** — Stega markers and editorial overlays sandboxed to the preview environment

---

## Design System — "Warm Orange" Palette

ParentHub uses a curated, premium editorial aesthetic built around a **Burnt Orange & Peach** palette:

| Token | Hex | Usage |
|-------|-----|-------|
| Brand Orange | `#BD552A` | Primary accents, headings, interactive highlights |
| Brand Orange Dark | `#A34E24` | Hover states, deep emphasis |
| Peach Background | `#FFF9F6` | Card backgrounds, callout fills, inline code highlights |
| Peach Border | `#FFEDE0` | Subtle borders, card outlines |
| Brand Navy | System default | Body text, table headers, dark-mode surfaces |

All editorial components — callouts, tables, numbered cards, article embeds, code blocks, and body links — are unified under this palette.

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Runtime | Next.js 14 (App Router) | Server rendering, routing, API routes |
| CMS | Sanity v3 | Headless content management, real-time editing |
| Styling | Tailwind CSS 3 | Utility-first responsive design system |
| Typography | @tailwindcss/typography | Prose styling for long-form content |
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
|  Code snippets, callout styles   |
+----------------+-----------------+
                 |
                 | GROQ Queries
                 | Webhook (revalidation)
                 v
+------------------------------------------+
|         Next.js App Router               |
|                                          |
|  Universal Route Resolver                |
|  (Handles 1, 2, or 3-segment paths)     |
|                                          |
|  Server Components (SSR/ISR)             |
|  API Routes (/api/*)                     |
|  Client Components (Search, Playground)  |
|                                          |
|  +------------------------------------+  |
|  |  Portable Text Serializers         |  |
|  |  12 custom block renderers         |  |
|  |  Sandboxed iframe engine           |  |
|  |  Terminal simulation renderer      |  |
|  +------------------------------------+  |
|                                          |
|  +------------------------------------+  |
|  |  Sanity Client (fetch.ts)          |  |
|  |  Draft Mode / Preview              |  |
|  |  Image URL Builder                 |  |
|  +------------------------------------+  |
+------------------------------------------+
```

Data flows one direction: Editors create and publish content in Sanity → Sanity fires a webhook → Next.js revalidates the affected pages → Readers see fresh content within seconds.

---

## Folder Structure

```
ParentHub-Platform/
|-- apps/
|   +-- web/                          # Next.js frontend application
|       |-- app/
|       |   |-- (site)/               # Public-facing routes
|       |   |   |-- [...slug]/        # Universal Route Resolver
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
|       |   |-- content/              # ArticleView, AuthorCard, EmailForm
|       |   |-- home/                 # Homepage sections (Hero, Carousel)
|       |   |-- layout/              # Header, Footer, SearchBar, ThemeToggle
|       |   |-- portable-text/        # Rich content renderers:
|       |   |   |-- Callout.tsx       #   Multi-variant callout (Box / Side-Accent)
|       |   |   |-- TableBlock.tsx    #   Precision tables (Align + Index)
|       |   |   |-- CodeBlock.tsx     #   Universal Playground (Iframe + Terminal)
|       |   |   |-- ArticleEmbedList  #   In-article cross-linking
|       |   |   |-- FAQBlock.tsx      #   Accordion FAQ
|       |   |   |-- StatGrid.tsx      #   Statistical data cards
|       |   |   |-- NumberedCardList  #   Ordered step cards
|       |   |   +-- serializers.tsx   #   Central component registry
|       |   |-- seo/                  # JSON-LD structured data components
|       |   +-- ui/                   # Shared primitives (Card, Badge)
|       +-- lib/
|           +-- sanity/               # Client config, queries, image helpers
|-- packages/
|   +-- cms/                          # Sanity schema definitions
|       +-- schemas/
|           |-- documents/            # article, author, category, page, tag, teamMember
|           |-- objects/              # callout, faq, statGrid, tableBlock, videoEmbed,
|           |                         # codeBlock, articleEmbedList, numberedCardList
|           +-- singletons/           # siteSettings, footerSettings
|-- infrastructure/                   # Deployment configs, monitoring, scripts
|-- turbo.json                        # Turborepo pipeline configuration
+-- pnpm-workspace.yaml              # Monorepo workspace definition
```

---

## Getting Started

### Prerequisites

- Node.js 20.0.0 or higher
- pnpm 9.14.0 or higher — Install with `npm install -g pnpm`
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

   - **Callout Boxes** — 6 semantic types (Info, Warning, Tip, Research, Quote, Accent Dark) × 2 visual styles (Rounded Box, Side-Accent Line)
   - **FAQ Accordions** — Question/answer pairs that expand on click
   - **Data Tables** — Structured tabular content with **alignment control** (Left/Center/Right) and **optional row indexing** (#)
   - **Statistical Grids** — Visual data cards with customizable shapes
   - **Numbered Step Cards** — Ordered instructional content with branded styling
   - **Product Cards** — Merchandise or resource highlights
   - **Video Embeds** — YouTube/Vimeo integration
   - **Article Embed Lists** — Cross-link related articles with category-aware SEO paths
   - **Code Snippets** — Multi-language playground with optional live preview sandbox

### Code Snippet Workflow

1. Insert a **Code Snippet** block into the article body
2. Select the **Language** (HTML, CSS, JavaScript, TypeScript, Python, JSON, or Bash/Shell)
3. Optionally add a **Filename** (e.g., `index.html`)
4. Paste or write the code
5. Toggle **"Enable Live Preview / Sandbox"** to activate the interactive playground
6. For Python/Bash: fill in the **"Expected Output"** field to power the terminal simulation

### Author Profiles

Each author document includes:

- **Short Bio** — Displayed on article cards across the site
- **Full Bio** — Rich text biography on their dedicated profile page
- **Areas of Expertise** — Tagged skills (e.g., Pediatrics, Nutrition)
- **Social Links** — Twitter and LinkedIn profiles
- **Role** — Editorial title displayed beneath their name

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

Set all environment variables in the Vercel dashboard under Settings → Environment Variables.

### Hostinger VPS

1. **Provision the server** — Install Node.js >= 20, pnpm, and a process manager like PM2

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

5. **Set up SSL** via Let's Encrypt / Certbot

6. **Configure Sanity webhooks** to point to `https://yourdomain.com/api/revalidate`

### Sanity Studio Deployment

The Studio is embedded in the Next.js app at `/studio`, so it deploys alongside the frontend automatically. No separate deployment is needed.

---

## API Routes

| Endpoint | Method | Purpose |
|----------|--------|---------|
| /api/search?q=keyword | GET | Returns top 5 matching articles for live search suggestions |
| /api/send-article | POST | Sends a branded HTML email containing the article to the specified address |
| /api/comments | GET/POST/PATCH/DELETE | Handles guest commenting, ownership verification, smart deletion, and 24h edits |
| /api/likes | POST | Handles optimistic toggling of content likes (increment/decrement) with strict positive floors |
| /api/revalidate | POST | Webhook endpoint — Sanity triggers this to revalidate cached pages on publish |
| /api/preview | GET | Activates Next.js Draft Mode for previewing unpublished content |
| /api/disable-preview | GET | Deactivates Draft Mode and clears the preview cookie |
| /api/og | GET | Generates dynamic Open Graph images for social sharing |

---

## Roadmap

- Newsletter subscription system with audience segmentation
- Algolia integration for advanced full-text search
- Reading progress indicator on article pages
- Bookmark and save article functionality
- Multi-language (i18n) content support
- A/B testing framework for headlines and layouts
- Admin analytics dashboard for editors
- PWA support for mobile readers
- Syntax highlighting engine (Prism/Shiki) for code blocks
- Per-column alignment in data tables
- Collaborative real-time editing in Sanity

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
