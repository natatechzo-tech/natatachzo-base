# Nata Techzo — Website

A lightweight static website for Nata Techzo, built with plain HTML5, CSS3 and vanilla JavaScript. No frameworks, no build tools, no backend.

## Files

```
index.html
style.css
script.js
assets/
  logo.svg   (placeholder logomark — replace with your real logo)
```

Open `index.html` directly in a browser and the site works — no server or build step required.

## 1. Replacing the logo

`assets/logo.svg` is a placeholder "NT" mark. To use your real logo:

1. Add your logo file to the `assets/` folder (e.g. `assets/logo.png`).
2. In `index.html`, update every `src="assets/logo.svg"` to your new filename. There are three places: the navbar (`.brand-logo`), the hero visual (`.hero-logo`), and the footer (`.footer-logo`).
3. If your logo already has a transparent background, no extra work is needed — the surrounding containers are already styled to sit around it rather than inside a plain box.

## 2. WhatsApp number

Open `script.js` and edit the top of the file:

```js
const CONTACT_CONFIG = {
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

```js
github: "https://github.com/yourusername",
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

All visible text lives directly in `index.html` — headings, paragraphs, card content and buttons are plain HTML, so you can edit them with any text editor. Section order matches the on-page navigation (Home → About → Services → Internship → Insurance → Projects → Why → Contact → Footer).

Colors, spacing and effects are controlled in `style.css` via CSS variables at the top of the file (`:root { --cyan: ...; --blue: ...; }` etc.) if you want to adjust the visual theme.

## 10. Deploying to Vercel

1. Push this project to a GitHub repository (or use the Vercel CLI directly on the folder).
2. Go to [vercel.com](https://vercel.com/) and click **Add New → Project**.
3. Import the repository (or drag-and-drop the folder if using the CLI: `vercel deploy`).
4. Framework preset: choose **Other** / **Static** — no build command is needed.
5. Leave the output directory as the project root (where `index.html` lives).
6. Deploy. Vercel will serve the static files directly.

No environment variables, database, or server configuration are required.
