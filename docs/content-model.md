# Content Model

## Document Types
- **article**: Core content. Has title, slug, body (Portable Text), category, author, tags, SEO.
- **author**: Contributor profiles with name, bio, social links.
- **category**: Hierarchical taxonomy (supports parent references for nesting).
- **tag**: Flat taxonomy for cross-cutting topics.
- **page**: Static pages (about, contact, privacy).

## Object Types
- **seo**: Reusable SEO metadata (title, description, ogImage, noIndex).
- **portableText**: Rich text with custom blocks (callout, video, FAQ, product card).
- **imageWithAlt**: Image with mandatory alt text for accessibility.

## Singletons
- **siteSettings**: Global config (title, logo, analytics IDs).
- **navigation**: Header/footer menu structure.
- **homepage**: Homepage hero and featured content.
