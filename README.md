# Nata Techzo — Website

A lightweight, device-adaptive static website for Nata Techzo, built with plain HTML5, CSS3 and vanilla JavaScript. No frameworks, no build tools, no backend. Sizing scales fluidly from mobile up through large desktop monitors using CSS `clamp()` and a fluid `min()` container, rather than a fixed-width layout.

## Files

```
index.html
style.css
script.js
vercel.json
assets/
  images/
    logo.png   (placeholder logomark — replace with your real logo)
```

Open `index.html` directly in a browser and the site works — no server or build step required.

## 1. Replacing the logo

`assets/images/logo.png` is currently an honest placeholder (a generated gradient mark, not your real logo — no logo file was provided to generate this site). To use your real logo:

1. Replace `assets/images/logo.png` with your actual logo file, keeping the same filename and path (`assets/images/logo.png`). If your file is a different format (e.g. `.jpg`), either convert it to `.png` or update the three `src="assets/images/logo.png"` references in `index.html` (navbar `.brand-logo-img`, hero `.hero-logo`, footer `.footer-logo-img`) to match.
2. The logo displays with `object-fit: contain`, so its original proportions are preserved — it is never cropped, stretched or distorted.
3. If your logo has a transparent background, it will sit cleanly inside the navbar, the glowing hero orb, and the footer without any extra work.

## 2. WhatsApp number

Open `script.js` and edit the `SITE_CONFIG` block at the top of the file:

```js
const SITE_CONFIG = {
  brandName: "NATA TECHZO",
  tagline: "Technology • Projects • Digital Services",
  whatsapp: "919876543210", // country code + number, digits only
  ...
};
```

## 3. Phone number

Same block in `script.js`:

```js
phone: "+91 98765 43210",
```

## 4. Email address

Same block in `script.js`:

```js
email: "hello@natatechzo.com",
```

## 5. GitHub link

Inside `socials`:

```js
socials: {
  github: "https://github.com/yourusername",
  ...
}
```

## 6. Telegram link

```js
telegram: "https://t.me/yourusername",
```

## 7. Discord link

```js
discord: "https://discord.gg/yourinvite",
```

## 8. Location

```js
location: "Your City, Your State",
```

Until these values are filled in, the contact section will show a note reminding you to configure them, and the WhatsApp/email buttons will show a toast instead of failing silently.

## 9. Changing website text

All visible text lives directly in `index.html` — headings, paragraphs, card content and buttons are plain HTML, so you can edit them with any text editor. Section order matches the on-page navigation (Home → Services → Projects → Internship → Insurance → About → Contact → Footer).

Colors, spacing and effects are controlled in `style.css` via CSS variables at the top of the file (`:root { --cyan: ...; --blue: ...; --container-max: 1500px; }` etc.). The fluid sizing scale (container width, section padding, gutters) is also defined there via `--container-max`, `--gutter` and `--section-pad` if you want to adjust how the site scales across screen sizes.

## 10. Deploying to Vercel

1. Push this project to a GitHub repository (or use the Vercel CLI directly on the folder).
2. Go to [vercel.com](https://vercel.com/) and click **Add New → Project**.
3. Import the repository (or drag-and-drop the folder if using the CLI: `vercel deploy`).
4. Framework preset: choose **Other** / **Static** — no build command is needed.
5. Leave the output directory as the project root (where `index.html` lives). `vercel.json` is already included with clean URLs and basic security/cache headers.
6. Deploy. Vercel will serve the static files directly.

No environment variables, database, or server configuration are required.
