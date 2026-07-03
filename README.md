# Kirthika A — Portfolio

A single-page, responsive, ATS-friendly portfolio built with plain HTML/CSS/JS (no build step required).

## File structure

```
portfolio/
├── index.html          # All page content & structure
├── css/
│   └── style.css        # Design tokens, layout, dark/light themes, animations
├── js/
│   └── script.js         # Theme toggle, nav, scroll reveal, form validation
├── assets/
│   └── Kirthika_A_Resume.pdf   # Downloadable resume (replace with latest version)
└── README.md
```

## Run locally

No build tools needed. Either:

1. Open `index.html` directly in a browser, **or**
2. Serve it locally (recommended, avoids any relative-path quirks):
   ```bash
   npx serve .
   # or
   python3 -m http.server 5500
   ```
   Then visit `http://localhost:5500`.

## Customize

- **Content**: edit text directly in `index.html` (each section is clearly commented).
- **Colors/fonts**: change the CSS variables at the top of `css/style.css` under `:root`, `[data-theme="dark"]`, `[data-theme="light"]`.
- **Resume**: replace `assets/Kirthika_A_Resume.pdf` with your latest PDF (same filename, or update the `href` in `index.html`).
- **Contact form**: currently client-side only (validates and shows a confirmation message). Wire it to a real backend — see below.

## Wiring the contact form to a backend

Pick one:
- **Formspree** (zero backend code): create a form at formspree.io, then in `js/script.js` replace the success block in the `submit` handler with a `fetch()` POST to your Formspree endpoint.
- **Netlify Forms**: if deploying to Netlify, add `data-netlify="true"` and a hidden `form-name` input to the `<form>` in `index.html` — Netlify handles the rest automatically.
- **Custom API**: point `fetch()` at your own `/api/contact` route (Node/Express, serverless function, etc.).

## Deployment

### Vercel
```bash
npm i -g vercel
cd portfolio
vercel
```
Follow the prompts — Vercel auto-detects a static site, no config needed.

### Netlify
- **Drag & drop**: go to app.netlify.com/drop and drop the `portfolio` folder.
- **CLI**:
  ```bash
  npm i -g netlify-cli
  cd portfolio
  netlify deploy --prod
  ```

### GitHub Pages
```bash
cd portfolio
git init
git add .
git commit -m "Deploy portfolio"
git branch -M main
git remote add origin https://github.com/Kirthika1822/portfolio.git
git push -u origin main
```
Then in the repo: **Settings → Pages → Source: `main` branch, `/root`**. Your site will be live at
`https://kirthika1822.github.io/portfolio/`.

Before deploying, update:
- `<meta property="og:url">` and the JSON-LD `"url"` in `index.html` to your real domain.
- `og:image` — add a real `assets/og-image.png` (1200×630px) for link previews.

## What's already built in

- ✅ Sticky navbar with scroll progress bar and active-section highlighting
- ✅ Dark/light mode toggle (persisted via `localStorage`, respects system preference on first visit)
- ✅ Signature hero: an animated "signal trace" connecting the intro to the CTAs — ties the ECE circuit background to the code identity
- ✅ Scroll-reveal animations on every section, `prefers-reduced-motion` respected
- ✅ Skill "signal bars" instead of generic progress bars
- ✅ Fully keyboard-navigable, visible focus states, skip-to-content link, semantic landmarks, `aria-live` form status
- ✅ SEO: descriptive `<title>`/meta description, Open Graph + Twitter cards, `Person` JSON-LD schema
- ✅ Mobile-first responsive layout down to ~360px
- ✅ Scroll-to-top button
- ✅ Resume download button wired to `assets/Kirthika_A_Resume.pdf`

## Suggested enhancements

1. **Real content**: add a project screenshot/GIF or live demo link once the Hotel Booking System or IoT project has a deployable/demoable piece.
2. **Blog/notes section**: even 2–3 short technical write-ups (e.g. "Designing the Hotel Booking schema") give recruiters proof of communication skill.
3. **Analytics**: add privacy-friendly analytics (Plausible or GA4) to see which sections recruiters spend time on.
4. **Testimonials**: a short quote from an internship mentor adds social proof.
5. **Case-study depth**: expand one project into a full case study page (problem → constraints → decisions → result) linked from the project card.
6. **Lighthouse pass**: run `npx lighthouse https://your-site.com --view` after deployment and address any flagged performance/accessibility items — the current markup is already built to score well (semantic HTML, no layout-shifting images, deferred script, minimal JS).
7. **Custom domain**: `firstnamelastname.dev` or `.me` reads more professional than a subdomain on a resume.
