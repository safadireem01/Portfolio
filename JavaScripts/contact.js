/**
 * REEM AL-SAFADI — CONTACT PAGE
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
     2. SCROLL-AWARE NAV SHADOW
     ============================================= */
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 12px rgba(0,0,0,0.1)'
      : '0 1px 3px rgba(0,0,0,0.06)';
  }, { passive: true });

  /* =============================================
     3. CONTACT FORM — VALIDATION & SUBMISSION
     ============================================= */
  const form        = document.querySelector('.contact-form');
  const successMsg  = document.querySelector('.form-success');
  const submitBtn   = document.querySelector('.submit-btn');

  if (!form) return;

  /* Simple inline validation helpers */
  const showError = (input, msg) => {
    clearError(input);
    input.style.borderBottomColor = '#ba1a1a';
    const err = document.createElement('span');
    err.className = 'field-error';
    err.style.cssText = 'display:block; font-size:12px; color:#ba1a1a; margin-top:4px;';
    err.textContent = msg;
    input.parentElement.appendChild(err);
  };

  const clearError = (input) => {
    const existing = input.parentElement.querySelector('.field-error');
    if (existing) existing.remove();
    input.style.borderBottomColor = '';
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /* Live validation on blur */
  const nameInput    = document.getElementById('name');
  const emailInput   = document.getElementById('email');
  const messageInput = document.getElementById('message');

  nameInput.addEventListener('blur', () => {
    if (!nameInput.value.trim()) showError(nameInput, 'Please enter your name.');
    else clearError(nameInput);
  });

  emailInput.addEventListener('blur', () => {
    if (!emailInput.value.trim()) {
      showError(emailInput, 'Please enter your email address.');
    } else if (!validateEmail(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email address.');
    } else {
      clearError(emailInput);
    }
  });

  messageInput.addEventListener('blur', () => {
    if (!messageInput.value.trim()) showError(messageInput, 'Please enter a message.');
    else clearError(messageInput);
  });

  /* Submit */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    if (!nameInput.value.trim()) {
      showError(nameInput, 'Please enter your name.');
      valid = false;
    }
    if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email address.');
      valid = false;
    }
    if (!messageInput.value.trim()) {
      showError(messageInput, 'Please enter a message.');
      valid = false;
    }

    if (!valid) return;

    /* Simulate async send */
    submitBtn.textContent = 'Sending…';
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;

    setTimeout(() => {
      /* Reset button */
      submitBtn.innerHTML = `
        <span>Send Message</span>
        <span class="material-symbols-outlined submit-btn__icon">send</span>
      `;
      submitBtn.style.opacity = '1';
      submitBtn.disabled = false;

      /* Show success */
      successMsg.classList.add('form-success--visible');

      /* Reset form */
      form.reset();

      /* Hide success after 5 s */
      setTimeout(() => successMsg.classList.remove('form-success--visible'), 5000);
    }, 1200);
  });

  /* =============================================
     4. PAGE ENTRANCE ANIMATIONS
     ============================================= */
  const animateIn = (el, delay = 0) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(el);
  };

  animateIn(document.querySelector('.page-header'), 0);
  animateIn(document.querySelector('.form-card'),    100);
  animateIn(document.querySelector('.contact-card'), 200);
  animateIn(document.querySelector('.accent-card'),  300);

});