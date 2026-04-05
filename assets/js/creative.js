/**
 * CREATIVE.JS — Interactive "WOW" Logic
 * Handles: Terminal Sparklines, Before/After Slider, Pulse Map, Eco-Impact, Trust Orbs
 */

document.addEventListener('DOMContentLoaded', () => {
    initSparklines();
    initBaSlider();
    initPulseMap();
    initTrustOrbs();
    initEcoImpact();
});

/* 1. TERMINAL SPARKLINES */
function initSparklines() {
    const charts = document.querySelectorAll('.terminal-chart');
    charts.forEach(chart => {
        const points = Array.from({length: 10}, () => Math.floor(Math.random() * 40));
        const svg = `
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" style="width:100%;height:100%;">
                <path d="M 0 ${40 - points[0]} ${points.map((p, i) => `L ${i * 11} ${40 - p}`).join(' ')}" 
                      fill="none" 
                      stroke="var(--green-accent)" 
                      stroke-width="2" 
                      vector-effect="non-scaling-stroke"></path>
            </svg>
        `;
        chart.innerHTML = svg;
    });
}

/* 2. CINEMATIC BEFORE/AFTER SLIDER */
function initBaSlider() {
    const container = document.querySelector('.ba-container');
    const overlay = document.querySelector('.ba-overlay');
    const handle = document.querySelector('.ba-handle');
    const counter = document.getElementById('ba-counter-val');
    
    if (!container) return;

    const move = (e) => {
        let x = e.pageX - container.offsetLeft;
        if (x < 0) x = 0;
        if (x > container.offsetWidth) x = container.offsetWidth;
        
        let percent = (x / container.offsetWidth) * 100;
        overlay.style.width = percent + '%';
        handle.style.left = percent + '%';
        
        // Dynamic counter logic (from 0 to ₹15,000)
        let cash = Math.floor((percent / 100) * 15420);
        if (counter) counter.textContent = '₹' + cash.toLocaleString();
    };

    container.addEventListener('mousemove', move);
    container.addEventListener('touchmove', (e) => move(e.touches[0]));
}

/* 3. SIMPLIFIED PULSE HUB (Live Activity) */
function initPulseMap() {
    const hub = document.querySelector('.pulse-hub__visual');
    if (!hub) return;

    const areas = [
        'Gachibowli', 'Madhapur', 'Secunderabad', 
        'Banjara Hills', 'Kavadiguda', 'Jubilee Hills',
        'Kukatpally', 'Hitech City', 'Manikonda'
    ];

    const showToast = () => {
        const area = areas[Math.floor(Math.random() * areas.length)];
        const toast = document.getElementById('map-toast');
        
        if (toast) {
            toast.textContent = `New pickup in ${area}!`;
            
            // Randomly position around the center logo
            const angle = Math.random() * Math.PI * 2;
            const radius = 60 + Math.random() * 40;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            toast.style.left = `calc(50% + ${x}px)`;
            toast.style.top = `calc(50% + ${y}px)`;
            toast.classList.add('visible');
            
            setTimeout(() => {
                toast.classList.remove('visible');
            }, 2500);
        }
    };

    // Initial delay then repeat
    setTimeout(showToast, 1000);
    setInterval(showToast, 4500); // 1.5x faster feel with more frequent updates
}

/* 4. TRUST ORBS BACKGROUND */
function initTrustOrbs() {
    const container = document.querySelector('.trust-orbs');
    if (!container) return;

    for (let i = 0; i < 5; i++) {
        const orb = document.createElement('div');
        orb.className = 'trust-orb';
        const size = Math.random() * 300 + 200;
        orb.style.width = size + 'px';
        orb.style.height = size + 'px';
        orb.style.left = Math.random() * 100 + '%';
        orb.style.top = Math.random() * 100 + '%';
        container.appendChild(orb);
    }

    document.addEventListener('mousemove', (e) => {
        const orbs = document.querySelectorAll('.trust-orb');
        orbs.forEach((orb, i) => {
            const shift = (i + 1) * 20;
            const x = (e.clientX - window.innerWidth / 2) / shift;
            const y = (e.clientY - window.innerHeight / 2) / shift;
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

/* 5. ECO IMPACT CALCULATOR (HOOK INTO MAIN CALC) */
function initEcoImpact() {
    window.updateEcoStats = (weight) => {
        const stats = {
            trees: (weight * 0.12).toFixed(1),
            oil: (weight * 0.45).toFixed(0),
            co2: (weight * 1.8).toFixed(1)
        };
        
        const treesVal = document.getElementById('eco-trees');
        const oilVal = document.getElementById('eco-oil');
        const co2Val = document.getElementById('eco-co2');

        if (treesVal) treesVal.textContent = stats.trees;
        if (oilVal) oilVal.textContent = stats.oil + 'L';
        if (co2Val) co2Val.textContent = stats.co2 + 'kg';
    };
}
