/* =========================================================
   NATA TECHZO — script.js
   Vanilla JavaScript, no dependencies.

   >>> EDIT THIS BLOCK TO CONFIGURE YOUR CONTACT DETAILS <<<
========================================================= */

const SITE_CONFIG = {
  brandName: "NATA TECHZO",
  tagline: "Technology • Projects • Digital Services",

  whatsapp: "ADD_WHATSAPP_NUMBER",   // e.g. "919876543210" (country code + number, no + or spaces)
  phone: "ADD_PHONE_NUMBER",         // e.g. "+91 98765 43210"
  email: "ADD_EMAIL",                // e.g. "hello@natatechzo.com"
  location: "ADD_LOCATION",          // e.g. "Tamil Nadu, India"

  socials: {
    github: "ADD_GITHUB_URL",        // e.g. "https://github.com/yourusername"
    whatsapp: "ADD_WHATSAPP_URL",    // e.g. "https://wa.me/919876543210" (leave as-is to auto-derive from whatsapp above)
    telegram: "ADD_TELEGRAM_URL",    // e.g. "https://t.me/yourusername"
    discord: "ADD_DISCORD_URL"       // e.g. "https://discord.gg/yourinvite"
  }
};

/* ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  applySiteConfig();
  initNavbarScroll();
  initMobileMenu();
  initActiveNavLink();
  initRevealOnScroll();
  initBackToTop();
  initContactForm();
});

/* ---------------------------------------------------------
   Fill contact info + social links from SITE_CONFIG
--------------------------------------------------------- */
function applySiteConfig() {
  const set = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  if (!isPlaceholder(SITE_CONFIG.whatsapp)) set("infoWhatsapp", SITE_CONFIG.whatsapp);
  if (!isPlaceholder(SITE_CONFIG.phone)) set("infoPhone", SITE_CONFIG.phone);
  if (!isPlaceholder(SITE_CONFIG.email)) set("infoEmail", SITE_CONFIG.email);
  if (!isPlaceholder(SITE_CONFIG.location)) set("infoLocation", SITE_CONFIG.location);

  const whatsappUrl = isPlaceholder(SITE_CONFIG.socials.whatsapp)
    ? buildWhatsappLink()
    : SITE_CONFIG.socials.whatsapp;

  const linkTargets = [
    ["socialGithub", "footerGithub", SITE_CONFIG.socials.github],
    ["socialWhatsapp", "footerWhatsapp", whatsappUrl],
    ["socialTelegram", "footerTelegram", SITE_CONFIG.socials.telegram],
    ["socialDiscord", "footerDiscord", SITE_CONFIG.socials.discord]
  ];

  linkTargets.forEach(([socialId, footerId, url]) => {
    [socialId, footerId].forEach((id) => {
      const el = document.getElementById(id);
      if (el && url && !isPlaceholder(url)) el.href = url;
    });
  });
}

function isPlaceholder(value) {
  return !value || value.startsWith("ADD_");
}

function buildWhatsappLink(message) {
  if (isPlaceholder(SITE_CONFIG.whatsapp)) return "#";
  const digits = SITE_CONFIG.whatsapp.replace(/[^0-9]/g, "");
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/* ---------------------------------------------------------
   Navbar scroll effect
--------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------------------------------------------------------
   Mobile hamburger menu
--------------------------------------------------------- */
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!hamburger || !mobileMenu) return;

  const closeMenu = () => {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  };

  hamburger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

/* ---------------------------------------------------------
   Active nav link on scroll
--------------------------------------------------------- */
function initActiveNavLink() {
  const sections = document.querySelectorAll("main section[id], .hero[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------
   Reveal-on-scroll animations
--------------------------------------------------------- */
function initRevealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((item) => observer.observe(item));
}

/* ---------------------------------------------------------
   Back-to-top button
--------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => btn.classList.toggle("visible", window.scrollY > 500),
    { passive: true }
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------------------------------------------------------
   Contact form: validation + WhatsApp / mailto
--------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const whatsappBtn = document.getElementById("sendWhatsapp");
  const emailBtn = document.getElementById("sendEmail");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm()) sendViaWhatsapp();
  });

  emailBtn.addEventListener("click", () => {
    if (validateForm()) sendViaEmail();
  });

  function validateForm() {
    let valid = true;
    const fields = [
      { id: "name", test: (v) => v.trim().length >= 2, msg: "Please enter your name." },
      { id: "email", test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: "Please enter a valid email." },
      { id: "phone", test: (v) => v.trim().length >= 7, msg: "Please enter a valid phone number." },
      { id: "subject", test: (v) => v.trim().length > 0, msg: "Please select a subject." },
      { id: "message", test: (v) => v.trim().length >= 10, msg: "Message should be at least 10 characters." }
    ];

    fields.forEach(({ id, test, msg }) => {
      const input = document.getElementById(id);
      const errorEl = document.getElementById(`err-${id}`);
      const ok = test(input.value);
      if (!ok) valid = false;
      if (errorEl) errorEl.textContent = ok ? "" : msg;
    });

    if (!valid) showToast("Please check the highlighted fields.", "error");
    return valid;
  }

  function getFormValues() {
    return {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      subject: document.getElementById("subject").value.trim(),
      message: document.getElementById("message").value.trim()
    };
  }

  function buildMessage(values) {
    return [
      "Hello Nata Techzo,",
      "",
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      `Requirement: ${values.subject}`,
      `Message: ${values.message}`,
      "",
      "I would like to discuss this requirement."
    ].join("\n");
  }

  function sendViaWhatsapp() {
    if (isPlaceholder(SITE_CONFIG.whatsapp)) {
      showToast("WhatsApp number not configured yet. Please set it in script.js.", "error");
      return;
    }
    const message = buildMessage(getFormValues());
    window.open(buildWhatsappLink(message), "_blank", "noopener,noreferrer");
    showToast("Opening WhatsApp with your enquiry...");
  }

  function sendViaEmail() {
    if (isPlaceholder(SITE_CONFIG.email)) {
      showToast("Email address not configured yet. Please set it in script.js.", "error");
      return;
    }
    const values = getFormValues();
    const subject = encodeURIComponent(`Enquiry: ${values.subject}`);
    const body = encodeURIComponent(buildMessage(values));
    window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
    showToast("Opening your email app...");
  }
}

/* ---------------------------------------------------------
   Toast notifications
--------------------------------------------------------- */
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast${type === "error" ? " error" : ""}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(12px)";
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}
