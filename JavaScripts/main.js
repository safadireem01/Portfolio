// ── Tailwind config (preserved exactly) ─────────────────────
const tailwindConfig = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "error-container": "#ffdad6",
        "on-tertiary-container": "#fdfcfa",
        "background": "#fcf9f8",
        "surface-container": "#f0eded",
        "on-surface": "#1b1c1c",
        "outline-variant": "#c4c8c0",
        "on-primary": "#ffffff",
        "surface-bright": "#fcf9f8",
        "on-primary-fixed": "#121f12",
        "inverse-on-surface": "#f3f0f0",
        "on-secondary-container": "#67645f",
        "on-background": "#1b1c1c",
        "secondary-fixed-dim": "#cac6bf",
        "on-error-container": "#93000a",
        "surface-container-lowest": "#ffffff",
        "on-tertiary": "#ffffff",
        "primary": "#516050",
        "surface-container-high": "#eae7e7",
        "on-tertiary-fixed-variant": "#464746",
        "on-error": "#ffffff",
        "surface-dim": "#dcd9d9",
        "on-tertiary-fixed": "#1a1c1b",
        "tertiary-fixed": "#e3e2e0",
        "on-secondary-fixed": "#1d1b17",
        "on-primary-fixed-variant": "#3c4a3c",
        "primary-fixed-dim": "#bbcbb8",
        "tertiary": "#5b5c5b",
        "inverse-surface": "#303030",
        "outline": "#747872",
        "on-secondary-fixed-variant": "#494742",
        "primary-fixed": "#d7e7d3",
        "surface-variant": "#e4e2e1",
        "tertiary-container": "#747573",
        "surface-tint": "#546253",
        "secondary-fixed": "#e7e2db",
        "on-surface-variant": "#444842",
        "on-primary-container": "#f7fff2",
        "inverse-primary": "#bbcbb8",
        "primary-container": "#6a7868",
        "on-secondary": "#ffffff",
        "surface-container-highest": "#e4e2e1",
        "surface": "#fcf9f8",
        "error": "#ba1a1a",
        "surface-container-low": "#f6f3f2",
        "secondary": "#615e59",
        "tertiary-fixed-dim": "#c7c6c5",
        "secondary-container": "#e7e2db"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "section-gap-desktop": "120px",
        "section-gap-mobile": "64px",
        "gutter": "24px",
        "stack-md": "24px",
        "stack-lg": "48px",
        "container-max-width": "1140px",
        "stack-sm": "12px",
        "base": "8px"
      },
      fontFamily: {
        "label-md": ["Inter"],
        "headline-md": ["Manrope"],
        "display-lg-mobile": ["Manrope"],
        "body-lg": ["Inter"],
        "display-lg": ["Manrope"],
        "body-md": ["Inter"],
        "headline-sm": ["Manrope"]
      },
      fontSize: {
        "label-md": ["14px", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "500" }],
        "headline-md": ["32px", { lineHeight: "1.3", fontWeight: "600" }],
        "display-lg-mobile": ["36px", { lineHeight: "1.2", fontWeight: "700" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "headline-sm": ["24px", { lineHeight: "1.4", fontWeight: "600" }]
      }
    }
  }
};

// ── Mobile menu toggle ───────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const isOpen = mobileMenu.classList.contains('open');
  menuToggle.querySelector('span').textContent = isOpen ? 'close' : 'menu';
});

// ── Close mobile menu on link click ─────────────────────────
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle.querySelector('span').textContent = 'menu';
  });
});

// ── Smooth scroll for anchor links ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});