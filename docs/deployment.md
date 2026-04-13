# Deployment Runbook

## Prerequisites
- Vercel account linked to Git repo
- Sanity project created (sanity.io/manage)
- Environment variables configured in Vercel dashboard

## Deploy Steps
1. Push to `main` branch triggers Vercel auto-deploy
2. Preview deployments created for every PR
3. Sanity Studio deployed via `pnpm --filter @parenthub/cms deploy`

## Post-Deploy Verification
1. Check Vercel deployment logs for build errors
2. Verify sitemap at /sitemap.xml
3. Test webhook revalidation (publish an article in Sanity)
4. Run Lighthouse CI against production URL
5. Verify OG images via Facebook Debugger / Twitter Card Validator
