/* ── Shared site navigation (μοναδική πηγή αλήθειας — ίδιο navbar παντού) ── */
(function() {
  const DROPDOWN_LINKS = [
    { href: 'pages/prosanatolismos.html', label: 'Γ΄ ΓΕΛ Προσανατολισμός' },
    { href: 'pages/epal.html',            label: 'Γ΄ ΕΠΑΛ' },
    { href: 'pages/videos.html',          label: 'Β΄ Λυκείου Άλγεβρα' },
  ];
  const TAIL_LINKS = [
    { href: 'pages/about.html', label: 'Σχετικά' },
  ];

  const inPages = location.pathname.includes('/pages/');
  const prefix = inPages ? '../' : '';
  const rel = (href) => prefix + (inPages ? href.replace('pages/', '') : href);

  const dropdownItems = DROPDOWN_LINKS.map(l => `<li><a href="${rel(l.href)}">${l.label}</a></li>`).join('');
  const tailItems = TAIL_LINKS.map(l => `<li><a href="${rel(l.href)}">${l.label}</a></li>`).join('');

  const navEl = document.querySelector('nav');
  if (!navEl) return;
  navEl.innerHTML = `
    <a class="nav-logo" href="${prefix}index.html">ΜΑΘΗΜΑΤΙΚΑ</a>
    <ul class="nav-links">
      <li><a href="${prefix}index.html">Αρχική</a></li>
      <li class="nav-dropdown">
        <a href="#" class="nav-dropdown-toggle">Τάξη ▾</a>
        <ul class="nav-dropdown-menu">${dropdownItems}</ul>
      </li>
      ${tailItems}
    </ul>
    <button class="nav-hamburger" aria-label="Μενού">☰</button>
  `;
})();

/* shared.js */

/* ── Active nav link ── */
(function() {
  const path = location.pathname.replace(/\/$/, '').split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path) a.classList.add('active');
  });
})();

/* ── Hamburger ── */
const burger = document.querySelector('.nav-hamburger');
const navLinks = document.querySelector('.nav-links');
if (burger) burger.addEventListener('click', () => navLinks.classList.toggle('open'));

/* ── Dropdown toggle (touch/click) ── */
document.querySelectorAll('.nav-dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    const menu = this.nextElementSibling;
    const isOpen = menu.style.display === 'block';
    // close all
    document.querySelectorAll('.nav-dropdown-menu').forEach(m => m.style.display = '');
    menu.style.display = isOpen ? '' : 'block';
  });
});
document.addEventListener('click', function(e) {
  if (!e.target.closest('.nav-dropdown')) {
    document.querySelectorAll('.nav-dropdown-menu').forEach(m => m.style.display = '');
  }
});


(function() {
  const canvas = document.getElementById('star-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, stars = [];

  function init() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    stars = Array.from({length: 280}, () => ({
      x: Math.random()*W, y: Math.random()*H,
      r: Math.random()*1.3+0.15,
      a: Math.random()*0.7+0.15,
      p: Math.random()*Math.PI*2,
      c: Math.random()<0.15?'warm':Math.random()<0.12?'blue':'white'
    }));
  }
  init();
  window.addEventListener('resize', init);

  function draw(t) {
    ctx.clearRect(0,0,W,H);
    // deep space gradient
    const g = ctx.createRadialGradient(W*.5,H*.5,0,W*.5,H*.5,W*.9);
    g.addColorStop(0,'#0c0a1e'); g.addColorStop(.5,'#07050f'); g.addColorStop(1,'#000000');
    ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
    // nebula blobs
    [
      {x:.18,y:.3,r:.26,c:'rgba(55,8,80,'},
      {x:.76,y:.62,r:.2,c:'rgba(8,28,75,'},
      {x:.5,y:.5,r:.32,c:'rgba(28,4,55,'},
    ].forEach(n => {
      const ng = ctx.createRadialGradient(n.x*W,n.y*H,0,n.x*W,n.y*H,n.r*W);
      ng.addColorStop(0, n.c+'0.12)'); ng.addColorStop(1, n.c+'0)');
      ctx.fillStyle = ng; ctx.fillRect(0,0,W,H);
    });
    // stars
    stars.forEach(s => {
      const f = .6+.4*Math.sin(t*.0014+s.p);
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle = s.c==='warm'?`rgba(255,215,170,${s.a*f})`:
                      s.c==='blue'?`rgba(160,195,255,${s.a*f})`:`rgba(225,232,255,${s.a*f})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

/* ── Floating math symbols ── */
(function() {
  const container = document.querySelector('.math-float');
  if (!container) return;
  const syms = ['π','Σ','∫','Δ','θ','∞','√','φ','λ','Ω','α','β','γ','δ','sin','cos','lim','dx','f(x)','∑','∈','ℝ','∀','⇒'];
  let count = 0;
  function spawn() {
    if (count > 18) return;
    const el = document.createElement('span');
    el.className = 'mf-sym';
    el.textContent = syms[Math.floor(Math.random()*syms.length)];
    const size = Math.random()*40+14;
    el.style.cssText = `
      left:${Math.random()*100}%;
      font-size:${size}px;
      animation-duration:${Math.random()*18+12}s;
      animation-delay:${Math.random()*4}s;
    `;
    container.appendChild(el);
    count++;
    el.addEventListener('animationend', () => { el.remove(); count--; setTimeout(spawn, 800); });
  }
  for (let i = 0; i < 10; i++) setTimeout(spawn, i * 600);
})();

/* ── Scroll reveal ── */
(function() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
})();
