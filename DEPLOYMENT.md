# ACM Chapter Website - Deployment Guide

## Quick Start: Deploy to Vercel

The easiest way to deploy this website is with [Vercel](https://vercel.com).

### Option 1: One-Click Deploy (Recommended)

Click this button to deploy directly to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Facm-chapter-website&project-name=acm-chapter&repo-name=acm-chapter-website)

### Option 2: Git Integration (Recommended for Teams)

1. **Push to GitHub**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/acm-chapter-website.git
   git push -u origin main
   \`\`\`

2. **Connect to Vercel**
   - Go to [https://vercel.com/new](https://vercel.com/new)
   - Select "Import Git Repository"
   - Connect your GitHub account
   - Select the repository
   - Click "Import"

3. **Configure Environment Variables**
   - In the Vercel dashboard, go to Settings → Environment Variables
   - Add the following variables:
     \`\`\`
     NEXT_PUBLIC_ACM_MEMBERSHIP_URL = https://acm.org/membership
     DEFAULT_ORG_EMAIL = hello@acmchapter.org
     \`\`\`

4. **Deploy**
   - Click "Deploy"
   - Your site will be live in seconds!

### Option 3: Manual Deployment

1. **Build the project**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Install Vercel CLI**
   \`\`\`bash
   npm install -g vercel
   \`\`\`

3. **Deploy**
   \`\`\`bash
   vercel
   \`\`\`

4. **Follow the prompts** to link your Vercel account and deploy

## Local Development

To run the site locally during development:

\`\`\`bash
npm install
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000)

## Production Build

To create an optimized production build:

\`\`\`bash
npm run build
npm start
\`\`\`

## Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# Required for membership redirect
NEXT_PUBLIC_ACM_MEMBERSHIP_URL=https://acm.org/membership

# Organization contact email
DEFAULT_ORG_EMAIL=hello@acmchapter.org
\`\`\`

## Customization

### Update Organization Details

1. **Site Metadata** (`app/layout.tsx`)
   \`\`\`tsx
   export const metadata: Metadata = {
     title: "Your ACM Chapter",
     description: "Your chapter description",
   }
   \`\`\`

2. **Content Data** (in `/data` folder)
   - Edit JSON files to update team, events, projects, etc.
   - Changes apply immediately without rebuild

3. **Branding** (`app/globals.css`)
   - Customize colors in the `:root` CSS variables
   - Update logo in `components/layout/header.tsx`

4. **Contact Information** (`components/layout/footer.tsx`)
   - Update email addresses
   - Add social media links

## Monitoring & Analytics

The site includes Vercel Analytics. To view:

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Analytics"
3. View real-time visitors, page views, and performance metrics

## Custom Domain

1. In Vercel Dashboard → Project Settings → Domains
2. Add your custom domain (e.g., acm.youruniversity.edu)
3. Follow DNS configuration instructions
4. Domain will be active within 24 hours

## Continuous Deployment

Every push to your GitHub repository automatically triggers a new deployment:

- **Main branch** → Production deployment
- **Other branches** → Preview deployments

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Check Node version: `node --version` (should be 18+)
2. Clear dependencies: `rm -rf node_modules && npm install`
3. Clear build cache: `rm -rf .next && npm run build`

### Deployment Failed

1. Check Vercel logs in the dashboard
2. Verify environment variables are set
3. Ensure all imports are correct
4. Check for TypeScript errors: `npm run build`

### Site Not Loading

1. Verify the deployment is complete (green checkmark on Vercel)
2. Check browser console for errors
3. Clear browser cache and cookies
4. Try incognito/private browsing mode

## Performance Optimization

Your site is already optimized for production:

- ✅ Image optimization with Next/Image
- ✅ Static generation for fast loads
- ✅ Automatic code splitting
- ✅ CDN delivery via Vercel Edge Network

Check performance metrics:
\`\`\`bash
npm run build  # Shows build info and metrics
\`\`\`

## Security Headers

Vercel automatically adds security headers:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security

## Scaling & Limits

Free Vercel plan includes:
- ∞ Static sites
- 10 serverless functions/month
- 100 GB bandwidth/month

For higher limits, upgrade to Pro or Enterprise plans.

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Issues**: Report bugs and issues
- **Email**: hello@acmchapter.org

---

Your site is ready to deploy! 🚀
