# Architecture Overview
See the implementation_plan.md artifact for the complete system architecture, data flow diagrams, and component breakdown.

## Tech Stack
- **Frontend**: Next.js 14+ (App Router, RSC, ISR)
- **CMS**: Sanity v3 (headless, GROQ API)
- **Styling**: Tailwind CSS + @tailwindcss/typography
- **Hosting**: Vercel (Edge Network, 100+ PoPs)
- **Database**: PostgreSQL via Neon (optional, for user data)

## Rendering Strategy
| Page Type | Strategy | Revalidation |
|-----------|----------|-------------|
| Homepage | ISR | On-demand webhook + 60s |
| Article | ISR | On-demand webhook |
| Category | ISR | On-demand + 300s |
| Search | SSR streaming | None |
| Studio | CSR | N/A |
