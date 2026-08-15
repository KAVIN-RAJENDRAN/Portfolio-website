# Kavin Rajendran - Premium AI Engineer Portfolio

A complete, production-ready, minimalist monochrome portfolio website built using **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

This website features custom trailing mouse cursors, mouse spotlight tracking, intersection-observed lazy loading, automated GitHub REST API integrations with local session caching, dynamic dark/light theme switching with OS preferences fallback, and parameterized fallback visual assets for missing resources.

---

## 1. Project Structure

```text
kavin-portfolio/
├── public/
│   └── assets/              # Place asset uploads here
│       ├── kavin-profile.webp
│       ├── Kavin_Rajendran_Resume.pdf
│       ├── srm-logo.webp
│       ├── renault-logo.webp
│       └── murugappa-logo.webp
├── src/
│   ├── components/
│   │   ├── AssetImage.tsx          # Dynamic asset fallback renderer
│   │   ├── BackgroundSpotlight.tsx # Grid pattern & mouse-following spotlight glow
│   │   ├── CustomCursor.tsx        # Trailing desktop cursor (scales on hovers)
│   │   ├── ThemeContext.tsx        # Dark/Light state provider with LocalStorage
│   │   ├── ThemeToggle.tsx         # Detailed sliding clouds/stars toggle
│   │   ├── Navbar.tsx              # Scroll-spy navigation with terminal brand logo
│   │   ├── Hero.tsx                # Intro and download trigger
│   │   ├── About.tsx               # Editable profile.json card & Education details
│   │   ├── Skills.tsx              # Competency categories with inline SVGs
│   │   ├── Experience.tsx          # Dynamic timeline (Alternating cards, scrolling line)
│   │   ├── Projects.tsx            # Spotlight glowing project cards
│   │   ├── GitHubActivity.tsx      # Intersection lazy loader, caching, skeletons
│   │   ├── Certifications.tsx      # Credential highlights with verify/view controls
│   │   ├── Contact.tsx             # Validated form with honeypots & rate trackers
│   │   └── Footer.tsx              # Bottom credit lines
│   ├── data/
│   │   └── portfolioData.ts        # CENTRAL PORFOLIO DATA CONFIGURATION FILE
│   ├── App.tsx                     # Main layout assembly
│   ├── main.tsx                    # App mounter
│   └── index.css                   # Tailwind references, theme colors, scrollbars
├── index.html                      # HTML wrapper, SEO tags & JSON-LD structured schema
├── tailwind.config.js              # Tailwind extend rules
├── postcss.config.js               # PostCSS loader
├── tsconfig.json                   # TypeScript build settings
├── vite.config.ts                  # Vite bundler options
├── .env.example                    # Contact API env variables blueprint
├── .gitignore                      # Git ignored files
└── README.md                       # This file
```

---

## 2. Installation & Setup

To install dependencies and start the local development environment:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16.0 or higher recommended) installed.

### Steps
1. Navigate to the project root directory:
   ```bash
   cd "c:/Users/Admin/Desktop/Kavin Potfolio"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch the local development dev server:
   ```bash
   npm run dev
   ```
   The site will load automatically at `http://localhost:3000`.

---

## 3. Asset Replacement Instructions

The site uses a fallback helper component (`src/components/AssetImage.tsx`) that automatically draws premium initials badges if images are missing. However, to customize with physical files, place the assets in the `public/assets/` directory (create the folder if it does not exist) using the exact file names below:

1. **Profile Photograph:**
   - **Path:** `public/assets/kavin-profile.webp` (or adjust `personal.profileImage` in `src/data/portfolioData.ts` to matching formats)
2. **Resume PDF Document:**
   - **Path:** `public/assets/Kavin_Rajendran_Resume.pdf` (Clicking "Download Resume" downloads this file via the HTML `download` attribute)
3. **SRM University Logo:**
   - **Path:** `public/assets/srm-logo.webp`
4. **Renault Nissan Logo:**
   - **Path:** `public/assets/renault-logo.webp`
5. **Tube Products of India / Murugappa Group Logo:**
   - **Path:** `public/assets/murugappa-logo.webp`

---

## 4. Contact Form Service Integration

The contact form is parameterized to run in a mock environment if no keys are found (printing logs to the console). To hook it up to a live server, choose one of the following methods:

### Option A: Using Formspree (Simplest)
1. Register on [Formspree](https://formspree.io/) and create a new form.
2. Copy your form action URL (looks like `https://formspree.io/f/your_form_id`).
3. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
4. Add the Formspree endpoint variable:
   ```env
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
   ```
5. The form will automatically switch from Mock mode to live Formspree submissions.

### Option B: Using EmailJS
1. Register on [EmailJS](https://www.emailjs.com/).
2. Create an Email Service and an Email Template. Define template tags matching:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{message}}`
3. Copy `.env.example` to `.env.local` and add your credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   ```
4. The form will dynamically bind and deliver submissions via EmailJS.

---

## 5. Deployment Guide

### Build Production Bundle
Compile code and build the optimized production assets:
```bash
npm run build
```
This generates a static `dist/` directory, which can be hosted on any static provider.

### Deploying to GitHub Pages
1. Install the `gh-pages` package:
   ```bash
   npm install gh-pages --save-dev
   ```
2. In `vite.config.ts`, set the `base` property to your repository name:
   ```typescript
   export default defineConfig({
     base: '/repository-name/', // e.g. '/portfolio/'
     // other config...
   })
   ```
3. Add deployment scripts in your `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Run the deploy routine:
   ```bash
   npm run deploy
   ```

### Deploying to Vercel
1. Install Vercel CLI or link your repository to the [Vercel Dashboard](https://vercel.com).
2. Set build configurations:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Add any environment variables (`VITE_FORMSPREE_ENDPOINT` or EmailJS credentials) in the Vercel project settings dashboard.

### Deploying to Netlify
1. Connect your repository to [Netlify](https://www.netlify.com).
2. Set site configurations:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
3. Save environment variables in Netlify console settings if using live forms.
