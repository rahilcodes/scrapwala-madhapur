/**
 * generate-pages.js — Programmatic Page Generator
 * Generates all service pages and area pages from templates + JSON data
 * Run: node generate-pages.js
 */

const fs = require('fs');
const path = require('path');

const SERVICES = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'services.json'), 'utf8'));
const AREAS = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'areas.json'), 'utf8'));

const HEAD_COMMON = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/tokens.css">
<link rel="stylesheet" href="../assets/css/base.css">
<link rel="stylesheet" href="../assets/css/components.css">
<link rel="stylesheet" href="../assets/css/layout.css">
<link rel="stylesheet" href="../assets/css/responsive.css">
<link rel="stylesheet" href="../assets/css/reviews.css">
<link rel="manifest" href="../site.webmanifest">`;

const NAV = `<nav class="nav" id="main-nav">
<div class="nav__inner">
<a href="../index.html" class="nav__logo">Scrapwala<span>.</span></a>
<div class="nav__links nav__dropdown-container">
<a href="../index.html">Home</a>
<div class="nav__item">
  <a href="../services.html">Services <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-left:2px"><polyline points="6 9 12 15 18 9"/></svg></a>
  <div class="nav__dropdown">
    ${SERVICES.slice(0, 10).map(s => `<a href="../services/${s.slug}.html">${s.shortTitle}</a>`).join('\n    ')}
    <a href="../services.html" style="color:var(--green-mid);font-weight:600">View all ${SERVICES.length} Services &rarr;</a>
  </div>
</div>
<div class="nav__item">
  <a href="../index.html#areas">Locations <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-left:2px"><polyline points="6 9 12 15 18 9"/></svg></a>
  <div class="nav__dropdown">
    <a href="../areas/scrap-buyers-kavadiguda.html">Kavadiguda</a>
    <a href="../areas/scrap-buyers-gachibowli.html">Gachibowli</a>
    <a href="../areas/scrap-buyers-madhapur.html">Madhapur</a>
    <a href="../areas/scrap-buyers-secunderabad.html">Secunderabad</a>
    <a href="../areas/scrap-buyers-banjara-hills.html">Banjara Hills</a>
    <a href="../index.html#areas" style="color:var(--green-mid);font-weight:600">View all 30+ Areas &rarr;</a>
  </div>
</div>
<a href="../about.html">About</a>
<a href="../contact.html">Contact</a>
</div>
<div class="nav__actions">
<a href="../index.html#booking" class="btn btn--dark" style="padding:10px 22px;font-size:14px;">Book Free Pickup <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
<button class="nav__hamburger" id="nav-hamburger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
</div>
</div>
</nav>
<div class="nav__mobile" id="nav-mobile">
<a href="../index.html">Home</a>
<div class="nav__mobile-item">
  <a href="#" class="nav__mobile-trigger">Services</a>
  <div class="nav__mobile-dropdown">
    ${SERVICES.slice(0, 8).map(s => `<a href="../services/${s.slug}.html">${s.shortTitle}</a>`).join('\n    ')}
    <a href="../services.html" style="font-weight:700;color:var(--green-mid)">View all Services &rarr;</a>
  </div>
</div>
<div class="nav__mobile-item">
  <a href="#" class="nav__mobile-trigger">Locations</a>
  <div class="nav__mobile-dropdown">
    <a href="../areas/scrap-buyers-kavadiguda.html">Kavadiguda</a>
    <a href="../areas/scrap-buyers-gachibowli.html">Gachibowli</a>
    <a href="../areas/scrap-buyers-madhapur.html">Madhapur</a>
    <a href="../areas/scrap-buyers-secunderabad.html">Secunderabad</a>
    <a href="../areas/scrap-buyers-banjara-hills.html">Banjara Hills</a>
    <a href="../index.html#areas" style="font-weight:700;color:var(--green-mid)">View all 30+ Areas &rarr;</a>
  </div>
</div>
<a href="../about.html">About</a>
<a href="../contact.html">Contact</a>
<a href="../index.html#booking" class="btn btn--primary btn--full">Book Free Pickup</a>
</div>`;

const PHONE_ICON = `<svg class="icon-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`;

const WA_SVG = `<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.462-1.494A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.39-1.584l-.39-.234-3.307 1.106 1.107-3.303-.254-.404A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>`;

const ARROW_ICON = `<svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
const PLUS_ICON = `<svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
const CHECK_ICON = `<svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;

function buildFooter() {
  return `<footer class="footer">
<div class="footer__main">
<div class="footer__brand">
  <div class="footer__logo">Scrapwala<span>.</span></div>
  <p class="footer__tagline">Hyderabad's most trusted scrap collection service. Turning waste into wealth, one pickup at a time.</p>
  <div class="footer__contact-items">
    <a href="tel:+919392901664" class="footer__contact-link">${PHONE_ICON} +91 93929 01664</a>
    <a href="mailto:scrapwala95@gmail.com" class="footer__contact-link"><svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> scrapwala95@gmail.com</a>
  </div>
</div>
<div><div class="footer__col-title">Services</div><div class="footer__links">${SERVICES.slice(0, 10).map(s=>`<a href="../services/${s.slug}.html">${s.shortTitle}</a>`).join('')}</div></div>
<div><div class="footer__col-title">Areas</div><div class="footer__links">${AREAS.slice(0, 10).map(a=>`<a href="../areas/scrap-buyers-${a.slug}.html">${a.name}</a>`).join('')}</div></div>
<div><div class="footer__col-title">Quick Links</div><div class="footer__links"><a href="../index.html">Home</a><a href="../about.html">About</a><a href="../services.html">All Services</a><a href="../contact.html">Contact</a><a href="../index.html#calculator">Price Calculator</a><a href="../index.html#faq">FAQ</a></div></div>
</div>
<div class="footer__bottom"><span>© 2025 Scrapwala Hyderabad. All rights reserved.</span><div class="footer__bottom-links"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></div></div>
</footer>
<div class="wa-widget" id="wa-widget">
  <div class="wa-widget__popup" id="wa-popup">
    <div class="wa-widget__header">
      <div class="wa-widget__avatar">SW<span class="wa-widget__dot"></span></div>
      <div><h4>Scrapwala</h4><p>Typically replies quickly</p></div>
      <button class="wa-widget__close" id="wa-close" aria-label="Close chat"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
    </div>
    <div class="wa-widget__body"><div class="wa-widget__msg">Hi there! 👋 Need a free scrap pickup today? We're online and ready to help.<span class="wa-widget__msg-time" id="wa-time">Now</span></div></div>
    <div class="wa-widget__footer"><a href="https://wa.me/919392901664?text=Hi%20Scrapwala%2C%20I%20want%20to%20schedule%20a%20pickup" target="_blank" class="wa-widget__btn">${WA_SVG} Start Chat</a></div>
  </div>
  <button class="wa-widget__fab" id="wa-fab" aria-label="Open WhatsApp chat">${WA_SVG}<span class="wa-widget__badge" id="wa-badge">1</span></button>
</div>
<div class="sticky-cta"><a href="tel:+919392901664" class="btn btn--dark" style="flex:1;padding:12px">${PHONE_ICON} Call Now</a><a href="https://wa.me/919392901664" class="btn btn--wa" target="_blank" rel="noopener" style="flex:1;padding:12px">${WA_SVG} WhatsApp</a></div>`;
}

function buildScripts(extras = []) {
  const base = ['nav', 'animations', 'main'];
  return [...extras, ...base].map(s => `<script src="../assets/js/${s}.js" defer></script>`).join('\n');
}

function buildSchema(name, desc) {
  return JSON.stringify({
    "@context":"https://schema.org","@type":"LocalBusiness","name":"Scrapwala Hyderabad","telephone":"+919392901664",
    "address":{"@type":"PostalAddress","streetAddress":"1_4_27/71/2, Padmashali Colony, Indira Nagar, Kavadiguda, Hyderabad, Telangana 500080","addressLocality":"Hyderabad","postalCode":"500080","addressCountry":"IN"},
    "aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"400"},
    "description": desc
  });
}

// ===== GENERATE SERVICE PAGES =====
function generateServicePage(svc) {
  const faqs = svc.faqs.map(f => `<div class="faq-item">
<div class="faq-item__question">${f.q} <span class="faq-item__icon">${PLUS_ICON}</span></div>
<div class="faq-item__answer">${f.a}</div>
</div>`).join('\n');

  const materials = svc.materials.map(m => `<div class="material-item"><div class="material-item__dot"></div>${m}</div>`).join('\n');

  const areaLinks = AREAS.slice(0, 12).map(a => `<a href="../areas/scrap-buyers-${a.slug}.html" class="nearby-pill">${a.name}</a>`).join('\n');

  const otherServices = SERVICES.filter(s => s.id !== svc.id).slice(0, 4).map(s =>
    `<a href="${s.slug}.html" class="service-card reveal">
<div class="service-card__icon"><svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg></div>
<div class="service-card__title">${s.shortTitle}</div>
<p class="service-card__desc">${s.tagline}</p>
<span class="service-card__tag">View rates ${ARROW_ICON}</span>
</a>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${svc.metaTitle}</title>
<meta name="description" content="${svc.metaDesc}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://scrapwala.in/services/${svc.slug}.html">
<meta property="og:title" content="${svc.metaTitle}">
<meta property="og:description" content="${svc.metaDesc}">
<meta property="og:type" content="website">
${HEAD_COMMON}
<script type="application/ld+json">${buildSchema(svc.h1, svc.metaDesc)}</script>
</head>
<body>
${NAV}

<div class="page-hero">
<div class="page-hero__bg"></div>
<div class="page-hero__grid"></div>
<div class="page-hero__content">
<div class="breadcrumb"><a href="../">Home</a><span class="breadcrumb__sep">/</span><a href="../services.html">Services</a><span class="breadcrumb__sep">/</span><span>${svc.title}</span></div>
<div class="badge"><span class="badge__dot"></span> Hyderabad's Best Rates</div>
<h1>${svc.h1}</h1>
<p class="page-hero__sub">${svc.tagline}</p>
<div class="page-hero__actions">
<a href="tel:+919392901664" class="btn btn--primary btn--lg">${PHONE_ICON} Call for Free Pickup</a>
<a href="https://wa.me/919392901664?text=Hi%20Scrapwala%2C%20I%20want%20to%20sell%20${encodeURIComponent(svc.shortTitle)}%20scrap" class="btn btn--outline" target="_blank" rel="noopener">WhatsApp Us</a>
</div>
</div>
</div>

<div class="price-strip">Current ${svc.shortTitle} Rate: <span>&nbsp;₹${svc.priceRange}/${svc.unit}</span></div>

<section>
<div class="container">
<div class="section-label reveal">Materials we accept</div>
<div class="section-title reveal">${svc.title} we buy</div>
<div class="materials-list">${materials}</div>
</div>
</section>

<section class="how-section">
<div class="container">
<div class="section-label reveal">How it works</div>
<div class="section-title reveal">Three steps. Done in a day.</div>
<div class="steps">
<div class="step reveal"><div class="step__num">01</div><div class="step__icon"><svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></div><div class="step__title">Call or WhatsApp</div><p class="step__desc">Tell us you have ${svc.shortTitle.toLowerCase()} scrap. We confirm the current rate and schedule a pickup.</p></div>
<div class="step reveal"><div class="step__num">02</div><div class="step__icon"><svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div><div class="step__title">We come to you</div><p class="step__desc">Our team arrives same day or next day with certified digital scales and full equipment.</p></div>
<div class="step reveal"><div class="step__num">03</div><div class="step__icon"><svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div><div class="step__title">Instant payment</div><p class="step__desc">Get paid immediately in cash or via UPI. Digital receipt sent on WhatsApp.</p></div>
</div>
</div>
</section>

<section class="booking-section" id="booking-form">
<div class="booking-grid">
<div class="booking-left reveal">
<div class="section-label section-label--light">Book a pickup</div>
<h2>Sell your ${svc.shortTitle.toLowerCase()} scrap today.</h2>
<p class="booking-left__sub">Free doorstep pickup. Same-day service. No minimum quantity. Instant payment at ₹${svc.priceRange}/${svc.unit}.</p>
<div class="booking-perks">
<div class="booking-perk"><div class="booking-perk__check">${CHECK_ICON}</div>Same-day pickup available</div>
<div class="booking-perk"><div class="booking-perk__check">${CHECK_ICON}</div>Instant payment — cash or UPI</div>
<div class="booking-perk"><div class="booking-perk__check">${CHECK_ICON}</div>Certified digital weighing</div>
<div class="booking-perk"><div class="booking-perk__check">${CHECK_ICON}</div>Price match guarantee</div>
</div>
</div>
<div class="booking-form reveal" id="booking-form">
<div class="booking-form__title">Schedule your free pickup</div>
<div class="form-row">
<div><input type="text" class="book-input" id="form-name" placeholder="Your name" autocomplete="name"><div class="form-error"></div></div>
<div><input type="tel" class="book-input" id="form-phone" placeholder="Phone number" autocomplete="tel"><div class="form-error"></div></div>
</div>
<div class="form-stack">
<input type="text" class="book-input" id="form-area" placeholder="Your area in Hyderabad" autocomplete="address-level2">
<select class="book-input" id="form-type"><option value="${svc.shortTitle}" selected>${svc.shortTitle}</option></select>
<select class="book-input" id="form-time"><option value="default">Preferred pickup time</option><option value="Today Morning">Today Morning</option><option value="Today Afternoon">Today Afternoon</option><option value="Tomorrow">Tomorrow</option></select>
<button class="btn btn--dark btn--full" id="form-submit">Book Free Pickup ${ARROW_ICON}</button>
</div>
</div>
</div>
</section>

<section class="faq-section">
<div class="container">
<div class="faq-section__header reveal">
<div class="section-label">FAQ</div>
<div class="section-title">${svc.shortTitle} scrap — common questions</div>
</div>
<div class="faq-list">${faqs}</div>
</div>
</section>

<section>
<div class="container">
<div class="section-label reveal">Other services</div>
<div class="section-title reveal">We also collect</div>
<div class="services-grid">${otherServices}</div>
</div>
</section>

<section class="nearby-section">
<div class="container">
<div class="section-label reveal">Areas we serve</div>
<div class="section-title reveal">Available across Hyderabad</div>
<div class="nearby-grid">${areaLinks}</div>
</div>
</section>

${buildFooter()}
<!-- AUDIO WIDGET -->
<div class="audio-widget">
  <audio id="bg-audio" loop preload="none">
    <source src="../assets/audio/ambient-loop.mp3" type="audio/mpeg">
  </audio>
  <button id="audio-toggle" class="audio-toggle-btn" aria-label="Toggle background music">
    <svg class="icon-mute" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
    <svg class="icon-unmute" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
  </button>
</div>
${buildScripts(['faq', 'form'])}
</body>
</html>`;
}

// ===== GENERATE AREA PAGES =====
function generateAreaPage(area) {
  const neighborAreas = AREAS.filter(a => area.neighbors.includes(a.slug)).slice(0, 6);
  const neighborLinks = neighborAreas.map(a => `<a href="scrap-buyers-${a.slug}.html" class="nearby-pill">Scrap Buyers in ${a.name}</a>`).join('\n');
  const allAreaLinks = AREAS.filter(a => a.slug !== area.slug).slice(0, 16).map(a => `<a href="scrap-buyers-${a.slug}.html" class="area-pill">${a.name}</a>`).join('\n');
  const serviceLinks = SERVICES.map(s => `<a href="../services/${s.slug}.html" class="service-card reveal">
<div class="service-card__icon"><svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg></div>
<div class="service-card__title">${s.shortTitle}</div>
<p class="service-card__desc">${s.tagline}</p>
<span class="service-card__tag">${s.priceRange !== 'Market linked' ? '₹'+s.priceRange+'/'+s.unit : 'Market Rate'} ${ARROW_ICON}</span>
</a>`).join('\n');

  const metaTitle = `Scrap Buyers in ${area.name} Hyderabad — Free Pickup, Best Price | Scrapwala`;
  const metaDesc = `Sell scrap in ${area.name}, Hyderabad at best rates. Iron, copper, aluminium, paper, e-waste — free doorstep pickup, digital weighing, instant cash payment. Call Scrapwala.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${metaTitle}</title>
<meta name="description" content="${metaDesc}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://scrapwala.in/areas/scrap-buyers-${area.slug}.html">
<meta property="og:title" content="${metaTitle}">
<meta property="og:description" content="${metaDesc}">
<meta property="og:type" content="website">
${HEAD_COMMON}
<script type="application/ld+json">${buildSchema(`Scrapwala — Scrap Buyers in ${area.name}`, metaDesc)}</script>
</head>
<body data-area="${area.name}">
${NAV}

<div class="page-hero">
<div class="page-hero__bg"></div>
<div class="page-hero__grid"></div>
<div class="page-hero__content">
<div class="breadcrumb"><a href="../">Home</a><span class="breadcrumb__sep">/</span><a href="../#areas">Areas</a><span class="breadcrumb__sep">/</span><span>${area.name}</span></div>
<div class="badge"><span class="badge__dot"></span> ${area.district}</div>
<h1>Scrap Buyers in ${area.name}, Hyderabad</h1>
<p class="page-hero__sub">Looking to sell scrap in ${area.name}? Scrapwala offers free doorstep pickup, certified digital weighing, and instant payment by cash or UPI. We are ${area.district}'s most trusted scrap collection service.</p>
<div class="page-hero__actions">
<a href="tel:+919392901664" class="btn btn--primary btn--lg">${PHONE_ICON} Call for Free Pickup</a>
<a href="https://wa.me/919392901664?text=Hi%20Scrapwala%2C%20I%20need%20scrap%20pickup%20in%20${encodeURIComponent(area.name)}" class="btn btn--outline" target="_blank" rel="noopener">WhatsApp Us</a>
</div>
</div>
</div>

<section>
<div class="container">
<div class="section-label reveal">Services in ${area.name}</div>
<div class="section-title reveal">What we collect in ${area.name}</div>
<div class="section-sub reveal">We collect all types of scrap from homes, offices, and commercial establishments in ${area.name} and nearby areas in ${area.district}.</div>
<div class="services-grid">${serviceLinks}</div>
</div>
</section>

<section class="how-section">
<div class="container">
<div class="section-label reveal">Process</div>
<div class="section-title reveal">How pickup works in ${area.name}</div>
<div class="steps">
<div class="step reveal"><div class="step__num">01</div><div class="step__icon"><svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></div><div class="step__title">Call or WhatsApp</div><p class="step__desc">Tell us you are in ${area.name} and what scrap you have. We confirm the rate and schedule a pickup time.</p></div>
<div class="step reveal"><div class="step__num">02</div><div class="step__icon"><svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div><div class="step__title">We come to ${area.name}</div><p class="step__desc">Our uniformed team arrives at your door in ${area.name} — same day or next day. We handle lifting, sorting, and weighing.</p></div>
<div class="step reveal"><div class="step__num">03</div><div class="step__icon"><svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div><div class="step__title">Instant payment</div><p class="step__desc">Paid by cash or UPI on the spot. You get a digital receipt on WhatsApp with full weight and price breakdown.</p></div>
</div>
</div>
</section>

<section class="booking-section" id="booking-form">
<div class="booking-grid">
<div class="booking-left reveal">
<div class="section-label section-label--light">Book a pickup</div>
<h2>Free pickup in ${area.name}.<br>Today.</h2>
<p class="booking-left__sub">Our team covers ${area.name} and all of ${area.district}. No charges, no minimums. Just your scrap converted to cash.</p>
<div class="booking-perks">
<div class="booking-perk"><div class="booking-perk__check">${CHECK_ICON}</div>Same-day pickup in ${area.name}</div>
<div class="booking-perk"><div class="booking-perk__check">${CHECK_ICON}</div>Instant payment — cash or UPI</div>
<div class="booking-perk"><div class="booking-perk__check">${CHECK_ICON}</div>No minimum quantity</div>
<div class="booking-perk"><div class="booking-perk__check">${CHECK_ICON}</div>Digital receipt on WhatsApp</div>
</div>
</div>
<div class="booking-form reveal" id="booking-form">
<div class="booking-form__title">Schedule pickup in ${area.name}</div>
<div class="form-row">
<div><input type="text" class="book-input" id="form-name" placeholder="Your name" autocomplete="name"><div class="form-error"></div></div>
<div><input type="tel" class="book-input" id="form-phone" placeholder="Phone number" autocomplete="tel"><div class="form-error"></div></div>
</div>
<div class="form-stack">
<input type="text" class="book-input" id="form-area" placeholder="Your area" value="${area.name}" autocomplete="address-level2">
<select class="book-input" id="form-type"><option value="default">What do you want to sell?</option><option value="Household scrap">Household scrap</option><option value="Metal / Iron / Copper">Metal / Iron / Copper</option><option value="E-waste">E-waste</option><option value="Mixed scrap">Mixed scrap</option></select>
<select class="book-input" id="form-time"><option value="default">Preferred pickup time</option><option value="Today Morning">Today Morning</option><option value="Today Afternoon">Today Afternoon</option><option value="Tomorrow">Tomorrow</option></select>
<button class="btn btn--dark btn--full" id="form-submit">Book Free Pickup ${ARROW_ICON}</button>
</div>
</div>
</div>
</section>

<section class="faq-section">
<div class="container">
<div class="faq-section__header reveal"><div class="section-label">FAQ</div><div class="section-title">Scrap pickup in ${area.name} — questions</div></div>
<div class="faq-list">
<div class="faq-item"><div class="faq-item__question">Do you provide scrap pickup in ${area.name}? <span class="faq-item__icon">${PLUS_ICON}</span></div><div class="faq-item__answer">Yes. Scrapwala provides free doorstep scrap pickup across ${area.name} and all nearby areas in ${area.district}. Call us or WhatsApp to schedule — we can usually come the same day.</div></div>
<div class="faq-item"><div class="faq-item__question">What scrap materials do you buy in ${area.name}? <span class="faq-item__icon">${PLUS_ICON}</span></div><div class="faq-item__answer">We buy all types of scrap including iron, steel, copper, aluminium, brass, newspapers, cardboard, plastic, e-waste, old electronics, and vehicles. No minimum quantity required.</div></div>
<div class="faq-item"><div class="faq-item__question">What are scrap rates in ${area.name} today? <span class="faq-item__icon">${PLUS_ICON}</span></div><div class="faq-item__answer">Scrap rates in ${area.name} are based on the daily Hyderabad market price. Iron is ₹24–28/kg, copper ₹420–480/kg, aluminium ₹95–110/kg. Call for the latest rates.</div></div>
<div class="faq-item"><div class="faq-item__question">How fast can you reach ${area.name}? <span class="faq-item__icon">${PLUS_ICON}</span></div><div class="faq-item__answer">We offer same-day pickup in ${area.name} for calls placed before noon. Typical response time is 2–4 hours. For next-day pickup, we confirm an exact time window.</div></div>
</div>
</div>
</section>

<section class="nearby-section">
<div class="container">
<div class="section-label reveal">Nearby areas</div>
<div class="section-title reveal">We also serve near ${area.name}</div>
<div class="nearby-grid">${neighborLinks}</div>
</div>
</section>

<section class="areas-section">
<div class="container">
<div class="section-label section-label--accent reveal">All areas</div>
<div class="section-title reveal" style="color:var(--white)">Serving all of Hyderabad</div>
<div class="areas-grid">${allAreaLinks}</div>
</div>
</section>

${buildFooter()}
<!-- AUDIO WIDGET -->
<div class="audio-widget">
  <audio id="bg-audio" loop preload="none">
    <source src="../assets/audio/ambient-loop.mp3" type="audio/mpeg">
  </audio>
  <button id="audio-toggle" class="audio-toggle-btn" aria-label="Toggle background music">
    <svg class="icon-mute" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
    <svg class="icon-unmute" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
  </button>
</div>
${buildScripts(['faq', 'form'])}
</body>
</html>`;
}

// ===== MAIN =====
// Create directories
fs.mkdirSync(path.join(__dirname, 'services'), { recursive: true });
fs.mkdirSync(path.join(__dirname, 'areas'), { recursive: true });

// Generate service pages
SERVICES.forEach(svc => {
  const html = generateServicePage(svc);
  const filePath = path.join(__dirname, 'services', `${svc.slug}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`[SERVICE] ${filePath}`);
});

// Generate area pages
AREAS.forEach(area => {
  const html = generateAreaPage(area);
  const filePath = path.join(__dirname, 'areas', `scrap-buyers-${area.slug}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`[AREA] ${filePath}`);
});

// Generate sitemap.xml
const sitemapUrls = [
  { loc: 'https://scrapwala.in/', priority: '1.0' },
  { loc: 'https://scrapwala.in/about.html', priority: '0.8' },
  { loc: 'https://scrapwala.in/contact.html', priority: '0.8' },
  { loc: 'https://scrapwala.in/services.html', priority: '0.9' },
  ...SERVICES.map(s => ({ loc: `https://scrapwala.in/services/${s.slug}.html`, priority: '0.8' })),
  ...AREAS.map(a => ({ loc: `https://scrapwala.in/areas/scrap-buyers-${a.slug}.html`, priority: '0.7' }))
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(u => `  <url><loc>${u.loc}</loc><changefreq>weekly</changefreq><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>`;
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap, 'utf8');
console.log('[SEO] sitemap.xml');

// Generate robots.txt
const robots = `User-agent: *
Allow: /

Sitemap: https://scrapwala.in/sitemap.xml
`;
fs.writeFileSync(path.join(__dirname, 'robots.txt'), robots, 'utf8');
console.log('[SEO] robots.txt');

console.log(`\nDone! Generated ${SERVICES.length} service pages + ${AREAS.length} area pages + sitemap + robots.txt`);
