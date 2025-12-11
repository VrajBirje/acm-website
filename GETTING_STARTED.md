# Getting Started with ACM Chapter Website

Welcome! This guide will help you get up and running quickly.

## What's Included

This is a complete, production-ready website for an ACM Chapter with:

- 🏠 **Homepage** with hero, features, stats, and CTA
- 👥 **Team Page** with filters
- 📅 **Events Management** (upcoming & past events)
- 📝 **Blog System** with categories and detail pages
- 🛠️ **Projects Showcase** with tech stack display
- 📊 **Research Publications** with institutions
- 💼 **Sponsors Page** with tiered display
- 🎓 **Alumni Spotlight** with mentorship CTA
- 📧 **Contact Form** with validation
- 💬 **Newsletter Subscription**
- 🎁 **Donation System** with mock payment
- 🤖 **AI-Powered Chatbot** with FAQ matching
- 📈 **Statistics & Growth Charts**
- 🎨 **Beautiful Animations** with Framer Motion
- 📱 **Fully Responsive Design**
- ♿ **Accessible & SEO-Optimized**

## Quick Setup (2 minutes)

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Create Environment File
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

### 3. Start Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) 🎉

## Customizing Your Site

### Change Organization Name & Details

Edit **app/layout.tsx**:
\`\`\`tsx
export const metadata: Metadata = {
  title: "Your ACM Chapter - Innovation & Technology Community",
  description: "Your chapter description here",
}
\`\`\`

### Update Content

All content is in the **data/** folder as JSON files. Simply edit:

- `team.json` - Team members
- `events.json` - Events
- `blogs.json` - Blog posts
- `projects.json` - Projects
- `publications.json` - Research papers
- `sponsors.json` - Sponsors

Changes are reflected immediately in development!

### Customize Colors & Theme

Edit **app/globals.css** color variables:

\`\`\`css
:root {
  --primary: oklch(0.08 0.0 0); /* Main brand color */
  --accent: oklch(0.6 0.2 200); /* Accent color */
}
\`\`\`

### Add Your Logo

1. Place your logo in `public/` folder
2. Update **components/layout/header.tsx**:
   \`\`\`tsx
   <Image src="/your-logo.png" alt="Logo" width={32} height={32} />
   \`\`\`

## Adding New Pages

### Example: Add an "About Us" Page

1. Create folder: `app/about/`
2. Create file: `app/about/page.tsx`
3. Add content using the same patterns as other pages
4. Update navigation in `components/layout/header.tsx`

\`\`\`tsx
export function Header() {
  const navLinks = [
    // ... existing links ...
    { label: "About", href: "/about" },
  ]
}
\`\`\`

## API Endpoints

Your site includes working API routes:

- **POST** `/api/contact` - Contact form submissions
- **POST** `/api/newsletter/subscribe` - Newsletter subscriptions
- **POST** `/api/donate` - Donation processing (mock)
- **POST** `/api/chatbot/query` - FAQ chatbot queries

## Understanding the Project Structure

\`\`\`
acm-chapter-website/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout with metadata
│   ├── globals.css           # Theme and global styles
│   ├── team/page.tsx         # Team page
│   ├── events/page.tsx       # Events page
│   ├── blogs/                # Blog pages
│   ├── projects/page.tsx     # Projects showcase
│   ├── research/page.tsx     # Research papers
│   ├── sponsors/page.tsx     # Sponsors page
│   ├── alumni/page.tsx       # Alumni page
│   ├── contact/page.tsx      # Contact page
│   ├── membership/page.tsx   # Membership info
│   ├── donate/page.tsx       # Donations
│   ├── newsletter/page.tsx   # Newsletter signup
│   ├── stats/page.tsx        # Statistics & charts
│   ├── api/                  # API routes
│   ├── not-found.tsx         # 404 page
│   └── error.tsx             # Error page
├── components/
│   ├── layout/               # Header & Footer
│   ├── chatbot/              # Chatbot widget
│   └── ui/                   # UI components (shadcn/ui)
├── data/
│   ├── team.json             # Team data
│   ├── events.json           # Events data
│   ├── blogs.json            # Blog posts
│   ├── projects.json         # Projects
│   ├── publications.json     # Research papers
│   ├── sponsors.json         # Sponsors
│   ├── stats.json            # Growth stats
│   ├── testimonials.json     # Reviews
│   └── chatbot_faq.json      # FAQ data
├── public/                   # Static assets
├── README.md                 # Project documentation
└── DEPLOYMENT.md             # Deployment guide
\`\`\`

## Deployment

### Deploy to Vercel (Recommended)

\`\`\`bash
# Option 1: Use Vercel CLI
npm install -g vercel
vercel

# Option 2: Connect GitHub to Vercel Dashboard
# Go to https://vercel.com/new and import your repository
\`\`\`

See **DEPLOYMENT.md** for detailed instructions.

## Common Tasks

### Add a New Team Member
\`\`\`json
// data/team.json - Add to coreTeam array
{
  "id": 6,
  "name": "Your Name",
  "role": "Your Role",
  "bio": "Your bio",
  "image": "https://images.unsplash.com/...",
  "category": "core"
}
\`\`\`

### Add a New Event
\`\`\`json
// data/events.json - Add to upcomingEvents array
{
  "id": 4,
  "title": "Your Event",
  "date": "2025-02-15",
  "time": "18:00",
  "location": "Location",
  "description": "Event description",
  "image": "https://images.unsplash.com/...",
  "registrationUrl": "#"
}
\`\`\`

### Update Membership Link

Edit **app/membership/page.tsx** or set env variable:
\`\`\`env
NEXT_PUBLIC_ACM_MEMBERSHIP_URL=https://acm.org/register
\`\`\`

## Styling with Tailwind CSS

This project uses Tailwind CSS v4 with semantic color tokens:

\`\`\`tsx
// Use semantic classes instead of hardcoded colors
<div className="bg-primary text-primary-foreground"> {/* Good */}
<div className="bg-blue-500 text-white"> {/* Avoid */}
\`\`\`

Available classes:
- `bg-background`, `text-foreground`
- `bg-primary`, `text-primary-foreground`
- `bg-accent`, `text-accent-foreground`
- `border-border`, `bg-card`, `text-muted-foreground`

## Performance Tips

1. **Images**: Keep images under 500KB, use Unsplash for placeholders
2. **Components**: Use `"use client"` only when needed (interactivity)
3. **Data**: Keep JSON files organized and lean
4. **Animations**: Framer Motion is already optimized

## Troubleshooting

### Port 3000 Already in Use
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

### Build Errors
\`\`\`bash
rm -rf .next node_modules
npm install
npm run build
\`\`\`

### Styling Issues
- Check `app/globals.css` for color definitions
- Clear `.next` folder: `rm -rf .next`
- Restart dev server

## Next Steps

1. ✅ Customize content in `/data` folder
2. ✅ Update branding and colors
3. ✅ Add your logo and images
4. ✅ Update contact information
5. ✅ Deploy to Vercel

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/
- **shadcn/ui**: https://ui.shadcn.com/

---

Happy building! 🚀 If you have questions, check DEPLOYMENT.md or README.md
