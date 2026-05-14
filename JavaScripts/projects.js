/**
 * REEM AL-SAFADI — PORTFOLIO
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
          padding: 1.5rem 1.5rem;
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
     2. PROJECT FILTERING
     ============================================= */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      /* Update active button state */
      filterBtns.forEach(b => {
        b.classList.remove('filter-btn--active');
        b.classList.add('filter-btn--inactive');
      });
      btn.classList.add('filter-btn--active');
      btn.classList.remove('filter-btn--inactive');

      const filter = btn.dataset.filter;

      /* Show / hide cards with a simple fade */
      projectCards.forEach(card => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;

        if (show) {
          card.style.display = 'flex';
          /* Trigger reflow so transition fires */
          requestAnimationFrame(() => {
            card.style.opacity   = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity   = '0';
          card.style.transform = 'translateY(12px)';
          /* Hide after transition */
          setTimeout(() => {
            if (btn.dataset.filter !== 'all' && card.dataset.category !== btn.dataset.filter) {
              card.style.display = 'none';
            }
          }, 250);
        }
      });
    });
  });

  /* Init card transitions */
  projectCards.forEach(card => {
    card.style.transition = 'opacity 250ms ease, transform 250ms ease';
  });

  /* =============================================
     3. SCROLL-BASED NAV SHADOW
     ============================================= */
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
    } else {
      header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
    }
  }, { passive: true });

  /* =============================================
     4. CARD BUTTON FEEDBACK (Demo / GitHub)
     ============================================= */
  document.querySelectorAll('.card-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const original = this.innerHTML;
      this.style.opacity = '0.7';
      setTimeout(() => {
        this.style.opacity = '1';
      }, 150);
    });
  });

  /* =============================================
     5. STAGGERED CARD ENTRANCE ANIMATION
     ============================================= */
  const animateCards = () => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, i) => {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = `opacity 400ms ease ${i * 80}ms, transform 400ms ease ${i * 80}ms`;

      /* Use IntersectionObserver to trigger when in viewport */
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      observer.observe(card);
    });
  };

  animateCards();

});