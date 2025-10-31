# Dr. Bee Leez Blend - Landing Page

An elegant, typographically-driven landing page for Dr. Bee Leez Blend - a smoker's supplement that replenishes vital nutrients depleted by tobacco smoking.

## Design Philosophy

Inspired by Aesop skincare meets pharmaceutical insert meets luxury supplement brand. Minimalist, sophisticated, with typography and whitespace doing the heavy lifting.

## Tech Stack

- **Framework**: Next.js 14+ with App Router (TypeScript)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Typography**:
  - Playfair Display (serif display)
  - Inter (sans-serif body)
- **Icons**: Lucide React

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Required Assets

You need to add the following assets to the project:

#### Product Label Image
- **Location**: `/public/label_for_Dr_Beez_blend.png`
- **Description**: Product label image for the hero section
- **Required**: Yes

#### Research Downloads
- **Location**: `/public/downloads/Abstracts_of_Nutrient_Depletion_10-19-18.pdf`
- **Description**: PDF compilation of research citations and abstracts
- **Required**: Yes

- **Location**: `/public/downloads/Powerpoint_Tob_Smoking_New_Perspective_allows_3-8-25.pptx`
- **Description**: Dr. Bieley's comprehensive research presentation (75 slides)
- **Required**: Yes

**Create the downloads directory:**
```bash
mkdir -p public/downloads
```

Then add your files:
- `public/label_for_Dr_Beez_blend.png`
- `public/downloads/Abstracts_of_Nutrient_Depletion_10-19-18.pdf`
- `public/downloads/Powerpoint_Tob_Smoking_New_Perspective_allows_3-8-25.pptx`

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Update `.env.local` with your actual purchase URL:

```
NEXT_PUBLIC_PURCHASE_URL=https://your-manufacturer-purchase-url.com
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
/app
  ├── layout.tsx          # Root layout with fonts and metadata
  ├── page.tsx            # Main landing page
  ├── globals.css         # Global styles and theme colors
  └── robots.txt          # SEO robots file

/components
  └── sections/
      ├── Hero.tsx              # Hero section with product image
      ├── ProblemSolution.tsx   # Problem & Solution two-column section
      ├── Formula.tsx           # Complete formula table
      ├── Research.tsx          # Research highlights & downloads
      └── Purchase.tsx          # Purchase CTA & disclaimers

/public
  ├── label_for_Dr_Beez_blend.png  # (YOU NEED TO ADD THIS)
  └── downloads/
      ├── Abstracts_of_Nutrient_Depletion_10-19-18.pdf      # (YOU NEED TO ADD THIS)
      └── Powerpoint_Tob_Smoking_New_Perspective_allows_3-8-25.pptx  # (YOU NEED TO ADD THIS)
```

## Page Sections

1. **Hero** - Full viewport hero with product label image, tagline, and primary CTA
2. **Problem & Solution** - Two-column layout explaining nutrient depletion and replenishment
3. **Formula** - Elegant table displaying all 7 nutrients with therapeutic doses
4. **Research** - Research highlights and downloadable study materials
5. **Purchase** - Purchase CTA, contact information, and important disclaimers

## Color Palette

- **Royal Blue**: `#1e3a8a` - Primary brand color
- **Gold**: `#d4af37` - Accent color for CTAs
- **Cream**: `#fafaf9` - Background color
- **Charcoal**: `#1f2937` - Text color

## Typography

- **Display/Headers**: Playfair Display (serif) - Large, confident, spacious
- **Body Text**: Inter (sans-serif) - Highly readable, generous line-height
- **Numbers**: Monospace figures for supplement facts

## Build for Production

```bash
npm run build
npm start
```

## Accessibility

- WCAG 2.1 AA compliant
- High contrast ratios (4.5:1 minimum for body text)
- Keyboard navigation support
- Proper heading hierarchy
- Semantic HTML
- Alt text for images

## SEO

- Meta tags configured in `layout.tsx`
- Open Graph tags for social sharing
- Robots.txt included
- Semantic HTML5 structure

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

© 2019-2025 Harlan Bieley, MD, MS. All Rights Reserved.
