/**
 * calculator.js — Scrap Price Calculator Module
 * Scrapwala Hyderabad
 * Handles: price calculation, result display, WhatsApp CTA prefill
 */

const Calculator = (() => {
  // Material rates: id → rate in ₹
  const RATES = {
    'iron-steel':    { rate: 25,  unit: 'kg',    label: 'Iron / Steel' },
    'copper':        { rate: 450, unit: 'kg',    label: 'Copper' },
    'aluminium':     { rate: 102, unit: 'kg',    label: 'Aluminium' },
    'brass':         { rate: 300, unit: 'kg',    label: 'Brass' },
    'newspaper':     { rate: 10,  unit: 'kg',    label: 'Newspaper / Books' },
    'cardboard':     { rate: 6,   unit: 'kg',    label: 'Cardboard' },
    'plastic-hdpe':  { rate: 15,  unit: 'kg',    label: 'Plastic (HDPE)' },
    'ewaste':        { rate: 120, unit: 'piece',  label: 'E-Waste' },
    'batteries':     { rate: 45,  unit: 'piece',  label: 'Batteries' }
  };

  let selectEl, qtyEl, resultEl, ctaEl, qtyLabelEl;

  function init() {
    selectEl   = document.getElementById('calc-material');
    qtyEl      = document.getElementById('calc-qty');
    resultEl   = document.getElementById('calc-result-amount');
    ctaEl      = document.getElementById('calc-cta');
    qtyLabelEl = document.getElementById('calc-qty-label');

    if (!selectEl || !qtyEl || !resultEl) return;

    selectEl.addEventListener('change', onMaterialChange);
    qtyEl.addEventListener('input', calculate);
    qtyEl.addEventListener('change', calculate);

    if (ctaEl) {
      ctaEl.addEventListener('click', openWhatsApp);
    }

    // Initial calculation
    onMaterialChange();
  }

  function onMaterialChange() {
    const material = RATES[selectEl.value];
    if (!material) return;

    // Update quantity label
    if (qtyLabelEl) {
      qtyLabelEl.textContent = `Approximate quantity (${material.unit})`;
    }

    calculate();
  }

  function calculate() {
    const materialId = selectEl.value;
    const material = RATES[materialId];
    if (!material) return;

    const qty = Math.max(0, parseFloat(qtyEl.value) || 0);
    const total = Math.round(material.rate * qty);

    // Eco Impact Hook
    if (window.updateEcoStats) {
      window.updateEcoStats(qty);
    }

    // Animate result update
    animateValue(resultEl, total);
  }

  function animateValue(el, newVal) {
    const formatted = '₹' + newVal.toLocaleString('en-IN');
    el.textContent = formatted;
    el.style.transform = 'scale(1.05)';
    setTimeout(() => { el.style.transform = 'scale(1)'; }, 150);
  }

  function openWhatsApp() {
    const materialId = selectEl.value;
    const material = RATES[materialId] || {};
    const qty = qtyEl.value || '0';
    const amount = resultEl.textContent || '₹0';

    const msg = encodeURIComponent(
      `Hi Scrapwala! I want to book a free scrap pickup.\n` +
      `Material: ${material.label}\n` +
      `Quantity: ${qty} ${material.unit || 'kg'}\n` +
      `Estimated value: ${amount}`
    );

    window.open(`https://wa.me/919392901664?text=${msg}`, '_blank');
  }

  return { init };
})();
