/**
 * main.js — Application Entry Point
 * Scrapwala Hyderabad — Premium Home Service Redesign
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof Nav !== 'undefined') Nav.init();
  if (typeof Calculator !== 'undefined') Calculator.init();
  if (typeof FAQ !== 'undefined') FAQ.init();
  if (typeof Form !== 'undefined') Form.init();
  if (typeof Animations !== 'undefined') Animations.init();

  // ---- Smart Price Timestamp ----
  const priceTimestamp = document.getElementById('price-timestamp');
  if (priceTimestamp) {
    const now = new Date();
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    priceTimestamp.textContent = `Updated today, ${hours}:${minutes} ${ampm}`;
  }

  // ---- WhatsApp Widget ----
  const waFab = document.getElementById('wa-fab');
  const waPopup = document.getElementById('wa-popup');
  const waClose = document.getElementById('wa-close');
  const waBadge = document.getElementById('wa-badge');
  const waTime = document.getElementById('wa-time');

  if (waFab && waPopup) {
    if (waTime) {
      const now = new Date();
      waTime.textContent = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    }

    // Auto-show popup after 8 seconds
    setTimeout(() => {
      if (!waPopup.classList.contains('show')) {
        waPopup.classList.add('show');
      }
    }, 8000);

    waFab.addEventListener('click', () => {
      waPopup.classList.toggle('show');
      if (waBadge) waBadge.style.opacity = '0';
    });

    if (waClose) {
      waClose.addEventListener('click', (e) => {
        e.stopPropagation();
        waPopup.classList.remove('show');
      });
    }
  }

  // ---- Area page pre-fill ----
  const bodyArea = document.body.dataset.area;
  if (bodyArea) {
    const areaInput = document.getElementById('form-area');
    if (areaInput) areaInput.value = bodyArea;
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('main-nav')?.offsetHeight || 68;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});
