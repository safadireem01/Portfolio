/**
 * REEM AL-SAFADI — LUMINA CASE STUDY
 * script.js
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =============================================
     1. MOBILE MENU TOGGLE
     ============================================= */
  const mobileToggle = document.querySelector('.nav__mobile-toggle');
  const navLinks     = document.querySelector('.nav__links');
  let menuOpen = false;

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      menuOpen = !menuOpen;

      if (menuOpen) {
        navLinks.style.cssText = `
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(252,249,248,0.97);
          backdrop-filter: blur(12px);
          padding: 1.5rem;
          gap: 1.25rem;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        `;
        mobileToggle.querySelector('.material-symbols-outlined').textContent = 'close';
      } else {
        navLinks.removeAttribute('style');
        mobileToggle.querySelector('.material-symbols-outlined').textContent = 'menu';
      }
    });
  }

  /* =============================================
     2. STICKY NAV SHADOW ON SCROLL
     ============================================= */
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 12px rgba(0,0,0,0.08)'
      : 'none';
  }, { passive: true });

  /* =============================================
     3. SCROLL-TRIGGERED ENTRANCE ANIMATIONS
        Uses IntersectionObserver to stagger-animate
        sections and cards as they enter the viewport.
     ============================================= */
  const fadeUp = (elements, { stagger = 0, threshold = 0.12 } = {}) => {
    elements.forEach((el, i) => {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = `opacity 550ms ease ${stagger * i}ms, transform 550ms ease ${stagger * i}ms`;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity   = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      }, { threshold });

      observer.observe(el);
    });
  };

  /* Hero */
  fadeUp([document.querySelector('.hero__intro')], { stagger: 0 });
  fadeUp([document.querySelector('.hero__image-wrap')], { stagger: 0 });

  /* Overview */
  fadeUp(document.querySelectorAll('.section-overview > *'), { stagger: 80 });

  /* Challenge text + cards */
  fadeUp([document.querySelector('.challenge-text')], { stagger: 0 });
  fadeUp(document.querySelectorAll('.challenge-card'), { stagger: 100 });

  /* Process cards */
  fadeUp(document.querySelectorAll('.process-card'), { stagger: 120 });

  /* Solution */
  fadeUp(document.querySelectorAll('.section-solution__inner > *'), { stagger: 100 });

  /* Gallery */
  fadeUp(document.querySelectorAll('.gallery-primary, .gallery-secondary-item'), { stagger: 100 });

  /* CTA */
  fadeUp([document.querySelector('.section-cta__inner')], { stagger: 0 });

  /* =============================================
     4. READING PROGRESS BAR
        A thin primary-colour bar at the very top
        that fills as the user scrolls the page.
     ============================================= */
  const progressBar = document.createElement('div');
  progressBar.id = 'reading-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 0%;
    background-color: #516050;
    z-index: 100;
    transition: width 100ms linear;
    pointer-events: none;
  `;
  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(pct, 100)}%`;
  }, { passive: true });

  /* =============================================
     5. SMOOTH IMAGE PARALLAX (hero only, subtle)
     ============================================= */
  const heroImg = document.querySelector('.hero__image-wrap img');

  if (heroImg) {
    window.addEventListener('scroll', () => {
      const offset = window.scrollY;
      // Subtle 0.15 factor keeps it gentle
      heroImg.style.transform = `translateY(${offset * 0.08}px)`;
    }, { passive: true });
  }

});