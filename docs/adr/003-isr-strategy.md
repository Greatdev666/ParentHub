# ADR-003: ISR Strategy
**Status**: Accepted
**Decision**: Use Incremental Static Regeneration with on-demand revalidation via Sanity webhooks.
**Rationale**: Full SSG is impractical at millions of pages (build times). ISR pre-renders top pages and generates the rest on-demand. On-demand revalidation ensures content freshness without polling.
