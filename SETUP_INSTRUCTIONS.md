# Setup Instructions for Dr. Bee Leez Blend Landing Page

## Quick Start Checklist

### ✅ Already Completed
- [x] Next.js project setup with TypeScript
- [x] Tailwind CSS 4 configured with custom colors
- [x] Framer Motion installed for animations
- [x] Google Fonts (Playfair Display & Inter) integrated
- [x] All 5 page sections created
- [x] Responsive design implemented
- [x] SEO metadata configured
- [x] Environment variables template created
- [x] Build verified successfully

### 🚧 Required Actions Before Launch

#### 1. Add Product Assets

You must add these files to your project:

**Product Label Image:**
```
/public/label_for_Dr_Beez_blend.png
```

**Research Downloads:**
```
/public/downloads/Abstracts_of_Nutrient_Depletion_10-19-18.pdf
/public/downloads/Powerpoint_Tob_Smoking_New_Perspective_allows_3-8-25.pptx
```

**Where to get these files:**
- Product label: From your Downloads folder or product photography
- Research PDFs: Mentioned in the original prompt spec

**If you don't have these files yet:**
- The site will build successfully but show broken image/download links
- Add placeholder images/files temporarily for testing if needed

#### 2. Configure Purchase URL

1. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and replace with your actual purchase URL:
   ```
   NEXT_PUBLIC_PURCHASE_URL=https://your-actual-purchase-url.com
   ```

#### 3. Test Locally

Run the development server:
```bash
npm run dev
```

Open http://localhost:3000 and verify:
- [ ] Product label image displays correctly
- [ ] All sections render properly
- [ ] Download links work (PDF and PPTX)
- [ ] Purchase button links to correct URL
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Animations are smooth and subtle
- [ ] Typography hierarchy is clear

#### 4. Update Robots.txt

Edit `/app/robots.txt` and replace the sitemap URL with your actual domain:
```
Sitemap: https://your-actual-domain.com/sitemap.xml
```

## Page Structure Overview

### Hero Section
- Full viewport height
- Product label image (left/center)
- Tagline and description (right/below on mobile)
- Two CTAs: Purchase button (gold) + View Research link

### Problem & Solution
- Two-column layout (stacks on mobile)
- Left: "Tobacco Depletes Your Body" with bullet points
- Right: "Replenishment Works" with benefits
- Surgeon General quote included

### Formula
- Elegant table layout
- All 7 nutrients with forms and dosages
- Monospace alignment for numbers
- Clean, pharmaceutical aesthetic

### Research & Downloads
- Left: 5 research highlights with checkmarks
- Right: Downloadable PDF and PPTX with icons
- Hover effects on download cards

### Purchase & Disclaimers
- Large purchase CTA button
- Contact information (phone, email, address)
- Important safety warnings in amber-bordered box
- FDA disclaimer
- Copyright notice

## Design Features

### Color Palette
- **Royal Blue** (#1e3a8a): Primary brand color
- **Gold** (#d4af37): CTA buttons and accents
- **Cream** (#fafaf9): Background sections
- **Charcoal** (#1f2937): Text color

### Typography
- **Headlines**: Playfair Display (serif) - Large, elegant
- **Body**: Inter (sans-serif) - Clean, readable
- Generous line-height (1.7-1.8) for body text
- Wide letter-spacing for display text

### Animations
- Subtle fade-in on scroll (Framer Motion)
- Smooth transitions (200-300ms)
- Gentle hover effects (scale, underline, color)
- No flashy or distracting animations

## Testing Checklist

### Desktop (1024px+)
- [ ] Two-column layouts display side-by-side
- [ ] Generous margins (10-15% on sides)
- [ ] Typography hierarchy is clear
- [ ] Hover states work on all interactive elements

### Tablet (640-1024px)
- [ ] Layouts adjust gracefully
- [ ] Font sizes scale appropriately
- [ ] Touch targets are adequately sized

### Mobile (<640px)
- [ ] All columns stack vertically
- [ ] CTA buttons are thumb-friendly (min 48px height)
- [ ] Text remains readable
- [ ] Product label image scales appropriately

### Accessibility
- [ ] Tab navigation works through all interactive elements
- [ ] Focus states are visible
- [ ] Color contrast meets WCAG AA (4.5:1 body, 3:1 large text)
- [ ] Screen reader alt text is descriptive
- [ ] Heading hierarchy is logical (h1 → h2 → h3)

### Performance
- [ ] Images are optimized (Next/Image handles this)
- [ ] Build completes without errors
- [ ] No console errors in browser
- [ ] Lighthouse score 95+ (after adding real images)

## Deployment

### Option 1: Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Add environment variable `NEXT_PUBLIC_PURCHASE_URL` in Vercel dashboard
4. Deploy automatically

### Option 2: Other Platforms
- Build command: `npm run build`
- Output directory: `.next`
- Install command: `npm install`
- Node version: 20+

## Important Notes

### Legal Compliance
- All disclaimers are prominently displayed (not hidden)
- FDA disclaimer is included and readable (16px minimum)
- Tobacco warnings are unmissable (amber-bordered box)
- No health claims beyond what's supported by research

### Content Tone
- Elegant, clinical, confident
- No marketing hype or fluff
- Science-backed statements only
- Compassionate but not patronizing

### What NOT to Add
- ❌ No additional images or stock photos
- ❌ No testimonials (product is new)
- ❌ No FAQ accordions
- ❌ No popups or modals
- ❌ No chatbots
- ❌ No countdown timers or false scarcity
- ❌ No social media embeds

## Support

If you encounter issues:
1. Check that all assets are in correct locations
2. Verify environment variables are set
3. Run `npm install` to ensure dependencies are installed
4. Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

## Next Steps

1. ✅ Add the 3 required asset files (image + 2 PDFs)
2. ✅ Configure purchase URL in `.env.local`
3. ✅ Test locally with `npm run dev`
4. ✅ Deploy to Vercel or your preferred platform
5. ✅ Update robots.txt with actual domain
6. ✅ Monitor performance with Lighthouse

---

**Built with:**
- Next.js 16.0.1
- Tailwind CSS 4
- Framer Motion
- TypeScript

**License:** © 2019-2025 Harlan Bieley, MD, MS. All Rights Reserved.
