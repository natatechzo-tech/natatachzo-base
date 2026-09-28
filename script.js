/**
 * ==============================================================================
 * NATA TECHZO - WEBSITE CONFIGURATION
 * ==============================================================================
 * Easily update the contact information, brand details, and social links below.
 * Non-programmers can edit the values inside the quotes ("").
 * If left empty, clean placeholder labels are displayed automatically.
 */
const SITE_CONFIG = {
  brandName: "NATA TECHZO",
  tagline: "From Ideas to Digital Solutions.",
  
  // Enter your WhatsApp number in international format without '+' or spaces (e.g. "919876543210")
  whatsapp: "", 

  // Enter your phone number formatted for display (e.g. "+91 98765 43210")
  phone: "",    

  // Enter your contact email address (e.g. "contact@natatechzo.com")
  email: "",    

  // Enter your physical or operating location (e.g. "Tamil Nadu, India")
  location: "", 

  // Social profile links (leave as "" if not active yet)
  socials: {
    github: "",
    linkedin: "",
    instagram: "",
    twitter: ""
  }
};

/* --------------------------------------------------------------------------
   DOM INITIALIZATION
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initSiteConfig();
  initHeaderAndNav();
  initHeroCanvas();
  initHero3DTilt();
  initScrollAnimations();
  initContactForm();
  initQuickCTAs();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. BIND CONFIGURATION TO UI
   -------------------------------------------------------------------------- */
function initSiteConfig() {
  const whatsappEl = document.getElementById("config-whatsapp");
  const phoneEl = document.getElementById("config-phone");
  const emailEl = document.getElementById("config-email");
  const locationEl = document.getElementById("config-location");

  const whatsappLink = document.getElementById("link-whatsapp");
  const phoneLink = document.getElementById("link-phone");
  const emailLink = document.getElementById("link-email");

  // WhatsApp
  if (SITE_CONFIG.whatsapp && SITE_CONFIG.whatsapp.trim() !== "") {
    if (whatsappEl) whatsappEl.textContent = "+" + SITE_CONFIG.whatsapp.replace(/\D/g, "");
    if (whatsappLink) whatsappLink.href = `https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}`;
  } else {
    if (whatsappEl) whatsappEl.textContent = "[YOUR WHATSAPP NUMBER]";
    if (whatsappLink) whatsappLink.href = "#contact";
  }

  // Phone
  if (SITE_CONFIG.phone && SITE_CONFIG.phone.trim() !== "") {
    if (phoneEl) phoneEl.textContent = SITE_CONFIG.phone;
    if (phoneLink) phoneLink.href = `tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`;
  } else {
    if (phoneEl) phoneEl.textContent = "[YOUR PHONE NUMBER]";
    if (phoneLink) phoneLink.href = "#contact";
  }

  // Email
  if (SITE_CONFIG.email && SITE_CONFIG.email.trim() !== "") {
    if (emailEl) emailEl.textContent = SITE_CONFIG.email;
    if (emailLink) emailLink.href = `mailto:${SITE_CONFIG.email}`;
  } else {
    if (emailEl) emailEl.textContent = "[YOUR EMAIL ADDRESS]";
    if (emailLink) emailLink.href = "#contact";
  }

  // Location
  if (SITE_CONFIG.location && SITE_CONFIG.location.trim() !== "") {
    if (locationEl) locationEl.textContent = SITE_CONFIG.location;
  } else {
    if (locationEl) locationEl.textContent = "[YOUR LOCATION]";
  }
}

/* --------------------------------------------------------------------------
   2. STICKY NAVBAR, MOBILE MENU & SCROLLSPY
   -------------------------------------------------------------------------- */
function initHeaderAndNav() {
  const header = document.querySelector(".header");
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link:not(.dropdown-toggle)");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  const scrollProgressBar = document.getElementById("scroll-progress");

  // Sticky header & Scroll Progress Bar
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Progress Bar
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && scrollProgressBar) {
      const progressPercent = (scrollY / totalHeight) * 100;
      scrollProgressBar.style.width = `${progressPercent}%`;
    }

    updateScrollSpy();
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      mobileToggle.classList.toggle("active");
      mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close mobile menu on clicking any navigation link
    document.querySelectorAll(".nav-link, .dropdown-item").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
          navMenu.classList.remove("open");
          mobileToggle.classList.remove("active");
          mobileToggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        mobileToggle.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Mobile dropdown toggle
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener("click", (e) => {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          const parent = toggle.closest(".nav-dropdown");
          if (parent) {
            parent.classList.toggle("mobile-open");
          }
        }
      });
    });
  }

  // Smooth scroll with offset & insurance card highlighting
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth" });

        // If clicking an insurance card anchor, highlight the card
        if (targetId.startsWith("#insurance-")) {
          setTimeout(() => {
            targetEl.classList.add("highlighted");
            setTimeout(() => targetEl.classList.remove("highlighted"), 2000);
          }, 400);
        }
      }
    });
  });
}

// Active link indicator on scroll (Scrollspy)
function updateScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollPos = window.scrollY + 160;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   3. HERO PARTICLES / CONSTELLATION CANVAS
   -------------------------------------------------------------------------- */
function initHeroCanvas() {
  const canvas = document.getElementById("techCanvas");
  if (!canvas) return;

  // Check prefers-reduced-motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    canvas.style.display = "none";
    return;
  }

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  const particleCount = 42;
  const maxDistance = 120;

  let mouse = { x: null, y: null, radius: 140 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    if (e.clientY <= rect.bottom) {
      mouse.x = e.clientX;
      mouse.y = e.clientY - rect.top;
    } else {
      mouse.x = null;
      mouse.y = null;
    }
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Particle Class
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? "rgba(56, 189, 248, " : "rgba(139, 92, 246, ";
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion/interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color}${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let animationFrameId;
  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  animate();

  // Pause canvas when out of view
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animationFrameId) animate();
      } else {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    });
  });

  const heroSection = document.getElementById("home");
  if (heroSection) heroObserver.observe(heroSection);
}

/* --------------------------------------------------------------------------
   4. 3D TILT EFFECT ON HERO CARD
   -------------------------------------------------------------------------- */
function initHero3DTilt() {
  const card = document.querySelector(".hero-interactive-card");
  if (!card) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  });
}

/* --------------------------------------------------------------------------
   5. INTERSECTION OBSERVER SCROLL REVEALS
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  if (!revealElements.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealElements.forEach(el => el.classList.add("active"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   6. QUICK CTAs & SERVICE PRE-SELECTION
   -------------------------------------------------------------------------- */
function initQuickCTAs() {
  const ctaLinks = document.querySelectorAll("[data-service-target]");
  const serviceSelect = document.getElementById("form-service");

  ctaLinks.forEach(link => {
    link.addEventListener("click", () => {
      const targetService = link.getAttribute("data-service-target");
      if (serviceSelect && targetService) {
        serviceSelect.value = targetService;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. CONTACT FORM LOGIC (WhatsApp & Email Fallback)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const alertBox = document.getElementById("formAlert");
  const sendWhatsAppBtn = document.getElementById("btnSendWhatsApp");
  const sendEmailBtn = document.getElementById("btnSendEmail");

  if (!form) return;

  function getFormData() {
    const name = document.getElementById("form-name").value.trim();
    const email = document.getElementById("form-email").value.trim();
    const phone = document.getElementById("form-phone").value.trim();
    const service = document.getElementById("form-service").value;
    const message = document.getElementById("form-message").value.trim();

    return { name, email, phone, service, message };
  }

  function validate(data) {
    if (!data.name) {
      showAlert("Please enter your name.", "error");
      return false;
    }
    if (!data.email && !data.phone) {
      showAlert("Please provide either your Email or Phone number so we can reach you.", "error");
      return false;
    }
    if (!data.message) {
      showAlert("Please enter a short message describing your requirement.", "error");
      return false;
    }
    return true;
  }

  function showAlert(msg, type) {
    if (!alertBox) return;
    alertBox.textContent = msg;
    alertBox.className = `form-alert ${type}`;
    alertBox.style.display = "block";
    setTimeout(() => {
      if (type === "success") {
        alertBox.style.display = "none";
      }
    }, 6000);
  }

  // Handle Send via WhatsApp
  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const data = getFormData();
      if (!validate(data)) return;

      const targetNumber = (SITE_CONFIG.whatsapp && SITE_CONFIG.whatsapp.trim() !== "") 
        ? SITE_CONFIG.whatsapp.replace(/\D/g, "") 
        : "";

      const formattedText = `*Enquiry for NATA TECHZO*\n` +
        `------------------------\n` +
        `*Name:* ${data.name}\n` +
        `*Email:* ${data.email || 'Not provided'}\n` +
        `*Phone:* ${data.phone || 'Not provided'}\n` +
        `*Service:* ${data.service}\n` +
        `*Message:* ${data.message}`;

      const encodedText = encodeURIComponent(formattedText);
      const waUrl = targetNumber 
        ? `https://wa.me/${targetNumber}?text=${encodedText}`
        : `https://api.whatsapp.com/send?text=${encodedText}`;

      window.open(waUrl, "_blank", "noopener,noreferrer");
      showAlert("Opening WhatsApp with your pre-filled enquiry. Thank you!", "success");
      form.reset();
    });
  }

  // Handle Send via Email (mailto)
  if (sendEmailBtn) {
    sendEmailBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const data = getFormData();
      if (!validate(data)) return;

      const recipient = (SITE_CONFIG.email && SITE_CONFIG.email.trim() !== "") 
        ? SITE_CONFIG.email 
        : "contact@natatechzo.com";

      const subject = encodeURIComponent(`Project Enquiry: ${data.service} - ${data.name}`);
      const body = encodeURIComponent(
        `Hello NATA TECHZO Team,\n\n` +
        `I would like to discuss a requirement with you.\n\n` +
        `Name: ${data.name}\n` +
        `Phone: ${data.phone || 'N/A'}\n` +
        `Email: ${data.email || 'N/A'}\n` +
        `Selected Service: ${data.service}\n\n` +
        `Message:\n${data.message}\n\n` +
        `Looking forward to hearing from you.`
      );

      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
      showAlert("Opening your email client with the details pre-filled. Thank you!", "success");
      form.reset();
    });
  }

  // Standard Form Submission fallback
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = getFormData();
    if (!validate(data)) return;

    // Default to WhatsApp if configured, else Email
    if (SITE_CONFIG.whatsapp && SITE_CONFIG.whatsapp.trim() !== "") {
      sendWhatsAppBtn.click();
    } else {
      sendEmailBtn.click();
    }
  });
}

/* --------------------------------------------------------------------------
   8. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById("floating-back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
