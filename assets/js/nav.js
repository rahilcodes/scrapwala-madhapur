/**
 * nav.js — Navigation interactions
 * Scrapwala Hyderabad — Premium Home Service Redesign
 */

const Nav = (() => {
  function init() {
    const nav = document.getElementById('main-nav');
    const hamburger = document.getElementById('nav-hamburger');
    const mobileNav = document.getElementById('nav-mobile');

    // Scroll shadow
    if (nav) {
      window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 20);
      }, { passive: true });
    }

    // Hamburger toggle
    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
        hamburger.querySelectorAll('span').forEach((s, i) => {
          if (isOpen) {
            if (i === 0) s.style.transform = 'translateY(7px) rotate(45deg)';
            if (i === 1) s.style.opacity = '0';
            if (i === 2) s.style.transform = 'translateY(-7px) rotate(-45deg)';
          } else {
            s.style.transform = '';
            s.style.opacity = '';
          }
        });
      });

      // Close when clicking a link
      mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileNav.classList.remove('open');
          hamburger.setAttribute('aria-expanded', false);
          hamburger.querySelectorAll('span').forEach(s => {
            s.style.transform = '';
            s.style.opacity = '';
          });
        });
      });
    }

    // Mobile dropdowns
    document.querySelectorAll('.nav__mobile-trigger').forEach(trigger => {
      trigger.addEventListener('click', e => {
        e.preventDefault();
        const dropdown = trigger.nextElementSibling;
        if (dropdown) dropdown.classList.toggle('open');
      });
    });

    // Close mobile nav on outside click
    document.addEventListener('click', e => {
      if (mobileNav && mobileNav.classList.contains('open')) {
        if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
          mobileNav.classList.remove('open');
          hamburger.setAttribute('aria-expanded', false);
          hamburger.querySelectorAll('span').forEach(s => {
            s.style.transform = '';
            s.style.opacity = '';
          });
        }
      }
    });
  }

  return { init };
})();
