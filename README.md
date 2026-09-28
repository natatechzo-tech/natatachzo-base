# NATA TECHZO - Official Website

> **"From Ideas to Digital Solutions."**

A modern, production-quality, responsive website for **NATA TECHZO**, a technology and digital solutions brand. Built using semantic HTML5, modern CSS3 (with CSS Custom Properties, glassmorphism and subtle glowing accents), and Vanilla JavaScript.

---

## 🚀 Live Preview & Architecture

* **Zero Build Steps:** No Node.js compilation, npm build, or bundler required.
* **Local Testing:** Double-click or open `index.html` in any web browser (`file:///...`).
* **Static Deployment:** Fully optimized for **Vercel**, GitHub Pages, Cloudflare Pages, or Netlify.

---

## 📁 Project Structure

```
nata-techzo/
├── index.html              # Semantic HTML5 markup with accessible ARIA tags & SEO metadata
├── style.css               # Dark futuristic tech styling, responsive grid & animations
├── script.js               # Interactive canvas, 3D tilt, sticky navbar, form fallback & config
├── vercel.json             # Vercel static hosting configuration & security headers
├── README.md               # Documentation & customization guide
└── assets/
    ├── images/
    │   ├── logo.png        # NATA TECHZO brand logo
    │   └── favicon.svg     # Clean browser tab favicon
    └── projects/
        ├── gps-traders.svg # Browser mockup for GPS Traders (https://gpstraders.in/)
        ├── uyirppu.svg     # Browser mockup for Uyirppu (https://uyirppu.in/)
        └── upcoming.svg    # Browser mockup for Active Pipeline / More Projects
```

---

## ⚙️ Configuration (Contact Details)

At the top of `script.js`, there is a dedicated `SITE_CONFIG` object designed so that non-programmers can easily update contact information:

```javascript
const SITE_CONFIG = {
  brandName: "NATA TECHZO",
  tagline: "From Ideas to Digital Solutions.",
  
  // Enter your WhatsApp number in international format without '+' or spaces
  whatsapp: "919876543210", 

  // Enter your phone number formatted for display
  phone: "+91 98765 43210",    

  // Enter your contact email address
  email: "contact@natatechzo.com",    

  // Enter your location (city/state)
  location: "Tamil Nadu, India", 

  // Social profile links
  socials: {
    github: "https://github.com",
    whatsapp: "919876543210",
    telegram: "https://t.me/yourusername"
  }
};
```

* If left as empty strings (`""`), the website automatically renders clean placeholders (`[YOUR WHATSAPP NUMBER]`, `[YOUR PHONE NUMBER]`, etc.) without throwing errors.

---

## 📸 Replacing Project Mockups with Real Screenshots

The featured project cards are designed with realistic browser chrome windows.
To replace the vector mockup with an actual screenshot:
1. Save your screenshot as a PNG or JPG (e.g. `gps-traders.png` or `uyirppu.png`) inside `assets/projects/`.
2. In `index.html`, find the `<div class="browser-screen">` element and update the image `src`:
   ```html
   <img src="assets/projects/gps-traders.png" alt="GPS Traders Screenshot" loading="lazy" width="800" height="480">
   ```

---

## 🌐 Deploying to Vercel

### Method 1: Using GitHub (Recommended)
1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Framework Preset: **Other** (Static Site).
5. Root Directory: `./` (or leave default).
6. Click **Deploy**. Vercel will immediately deploy and provide an active URL.

### Method 2: Drag & Drop
1. In the Vercel Dashboard, navigate to **Projects** &rarr; **Deploy**.
2. Drag and drop the `nata-techzo` folder.
3. Your website will be live in seconds.

---

## 🛡️ Brand Compliance & Integrity

* **Educational & Institutional Claims:** The website does not falsely claim to be an accredited institution, university-affiliated body, or government organization.
* **Metrics & Statistics:** No fabricated statistics (e.g. "1000+ clients") are used.
* **Insurance Services:** Accurately positioned as advisory and assistance (e.g. *"LIC Insurance Services"* and *"Insurance Agent"*) with transparent policy disclaimers.

---

## 🎨 Features & Visual Details

* **Interactive Constellation Canvas:** Light, ambient particle network in the hero section reacting smoothly to cursor movement.
* **3D Tilt Interaction:** Floating code terminal window with realistic CSS 3D perspective.
* **Sticky Navigation Bar:** Blurs dynamically on scroll and highlights the active section.
* **Insurance Dropdown Menu:** Instant smooth scroll to specific insurance categories with subtle golden highlight pulse.
* **Dual Contact Submission:** Form options to instantly send inquiries via WhatsApp API or open the user's default email client pre-filled.
* **Full Responsiveness:** Tested and verified from 320px mobile screens up to 4K desktop displays.
* **Accessibility:** Full keyboard tab navigation, high contrast text, and support for `prefers-reduced-motion`.
