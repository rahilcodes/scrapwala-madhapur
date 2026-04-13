/**
 * animations.js — Scroll Reveal + Before/After Slider
 * Scrapwala Hyderabad — Premium Home Service Redesign
 * Smooth fade-in only — no aggressive motion
 */

const Animations = (() => {
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

    els.forEach(el => observer.observe(el));
  }

  function initBeforeAfter() {
    const container = document.getElementById('ba-container');
    const overlay = document.getElementById('ba-overlay');
    const handle = document.getElementById('ba-handle');
    const counter = document.getElementById('ba-counter-val');
    if (!container || !overlay || !handle) return;

    let dragging = false;
    let pos = 50; // percent

    function setPos(x) {
      const rect = container.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(5, Math.min(95, pct));
      pos = pct;

      overlay.style.width = pct + '%';
      handle.style.left = pct + '%';

      // Counter value based on overlap
      if (counter) {
        const val = Math.round((100 - pct) * 120);
        counter.textContent = '₹' + val.toLocaleString('en-IN');
      }
    }

    container.addEventListener('mousedown', e => { dragging = true; setPos(e.clientX); });
    container.addEventListener('touchstart', e => { dragging = true; setPos(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('mousemove', e => { if (dragging) setPos(e.clientX); });
    document.addEventListener('touchmove', e => { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('mouseup', () => { dragging = false; });
    document.addEventListener('touchend', () => { dragging = false; });

    // Initial position
    setPos(container.getBoundingClientRect().left + container.offsetWidth * 0.5);
  }

  function initCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;

      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          const interval = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current).toLocaleString('en-IN') + suffix;
            if (current >= target) clearInterval(interval);
          }, 16);
        }
      }, { threshold: 0.5 });

      observer.observe(el);
    });
  }

  function init() {
    initReveal();
    initBeforeAfter();
    initCounters();
  }

  return { init };
})();
