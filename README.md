# ACM Chapter Website

A modern, production-ready website for ACM Chapter built with Next.js, TailwindCSS, and Framer Motion.

## Features

- ✨ Responsive, accessible design
- 🎨 Modern UI with smooth animations
- 📱 Mobile-first approach
- 🔍 SEO optimized
- 🚀 Fast performance with Next.js App Router
- 📊 Dynamic content from JSON files
- 💬 AI-powered chatbot for FAQs
- 📧 Contact, newsletter, and donation forms
- 🎯 Multiple content pages (blog, events, projects, research, etc.)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS v4
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Image Optimization**: Next/Image
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd acm-chapter-website
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

\`\`\`
├── app/
│   ├── api/                 # API routes (contact, newsletter, donations, chatbot)
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   ├── team/               # Team page
│   ├── events/             # Events pages
│   ├── blogs/              # Blog pages
│   ├── projects/           # Projects page
│   ├── research/           # Research & publications
│   ├── sponsors/           # Sponsors page
│   ├── contact/            # Contact page
│   ├── membership/         # Membership page
│   ├── donate/             # Donation page
│   ├── stats/              # Statistics page
│   └── globals.css         # Global styles with theme tokens
├── components/
│   ├── layout/             # Header, Footer components
│   ├── chatbot/            # Chatbot widget
│   └── ui/                 # shadcn/ui components
├── data/
│   ├── team.json           # Team members
│   ├── events.json         # Events
│   ├── blogs.json          # Blog posts
│   ├── projects.json       # Projects
│   ├── publications.json   # Research publications
│   ├── sponsors.json       # Sponsors
│   ├── stats.json          # Growth statistics
│   ├── testimonials.json   # Reviews & testimonials
│   └── chatbot_faq.json    # FAQ data for chatbot
├── public/                 # Static assets
└── README.md              # This file
\`\`\`

## Data Files

All content is stored in JSON files under `/data`. You can easily update:

- **team.json**: Team members with photos and bios
- **events.json**: Upcoming and past events
- **blogs.json**: Blog posts with content
- **projects.json**: Technical projects and tools
- **publications.json**: Research papers and institutions
- **sponsors.json**: Sponsor logos and links
- **stats.json**: Growth statistics for charts
- **chatbot_faq.json**: FAQ entries for the chatbot

## API Routes

### Contact Form
- **POST** `/api/contact` - Submit contact form
- **GET** `/api/contact` - Retrieve submissions (demo only)

### Newsletter
- **POST** `/api/newsletter/subscribe` - Subscribe to newsletter

### Donations
- **POST** `/api/donate` - Process donation (mock payment)

### Chatbot
- **POST** `/api/chatbot/query` - Query FAQ with fuzzy matching

## Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
NEXT_PUBLIC_ACM_MEMBERSHIP_URL=https://acm.org/join
DEFAULT_ORG_EMAIL=hello@acmchapter.org
\`\`\`

## Deployment to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Facm-chapter-website)

### Manual Deployment

1. Push your code to GitHub

2. Go to [Vercel](https://vercel.com) and import your repository

3. Configure environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_ACM_MEMBERSHIP_URL`
   - `DEFAULT_ORG_EMAIL`

4. Click "Deploy"

### Post-Deployment

Your site will be live at `https://<project-name>.vercel.app`

## Customization

### Theming

Edit `app/globals.css` to customize colors. The theme uses CSS custom properties:

- `--primary`: Main brand color (default: navy)
- `--accent`: Accent color (default: cyan)
- `--foreground`: Text color
- `--background`: Background color

### Adding New Pages

1. Create a new directory under `app/` (e.g., `app/new-page/`)
2. Add `page.tsx` with your content
3. Update the navigation in `components/layout/header.tsx`

### Updating Content

Simply edit the JSON files in `/data` and the changes will reflect in the UI.

## Performance Optimization

- ✅ Image optimization with Next/Image
- ✅ Static Site Generation (SSG) for fast loads
- ✅ Incremental Static Regeneration (ISR) for fresh content
- ✅ Code splitting and lazy loading
- ✅ Optimized bundle size

## SEO Features

- ✅ Meta tags and Open Graph images
- ✅ Semantic HTML
- ✅ XML Sitemap support
- ✅ robots.txt
- ✅ Structured data ready

## Accessibility

- ✅ ARIA labels and roles
- ✅ Semantic HTML elements
- ✅ Keyboard navigation
- ✅ Screen reader friendly
- ✅ Color contrast compliant

## Support

For issues or questions:
- Email: hello@acmchapter.org
- GitHub Issues: [Create an issue]

## License

MIT License - feel free to use this for your ACM Chapter!

## Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

Built with ❤️ for the tech community
\`\`\`

```json file="" isHidden
