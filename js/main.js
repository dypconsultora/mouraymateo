/* =====================================================================
   MOURA Y MATEO — JS vanilla
   Aurora hero (haces), header sticky, menú mobile, scroll reveal,
   barra de progreso, marquee infinito, carrusel de opiniones, count-up.
   Degradación segura: si algo falla, el contenido se ve igual.
   ===================================================================== */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- AURORA: generar haces de energía ---------- */
  function buildBeams() {
    const wrap = $('#beams');
    if (!wrap) return;
    const isMobile = window.innerWidth < 640;
    const count = reduceMotion ? 18 : (isMobile ? 28 : 60);
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const b = document.createElement('div');
      b.className = 'light-beam' + (Math.random() < 0.28 ? ' is-energy' : '');
      const rise = (Math.random() * 2 + 4).toFixed(2);   // 4–6s
      const fade = rise;
      b.style.left = (Math.random() * 100) + '%';
      b.style.width = (Math.floor(Math.random() * 3) + 1) + 'px';
      b.style.height = (Math.random() * 25 + 30) + 'vh';
      b.style.animationDelay = (Math.random() * 5).toFixed(2) + 's';
      b.style.animationDuration = rise + 's, ' + fade + 's';
      frag.appendChild(b);
    }
    wrap.appendChild(frag);
  }

  /* ---------- HEADER sticky (transparente -> sólido) ---------- */
  function header() {
    const h = $('#site-header');
    if (!h) return;
    const onScroll = () => h.classList.toggle('is-solid', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- BARRA DE PROGRESO ---------- */
  function progress() {
    const bar = $('#scroll-progress');
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- MENÚ MOBILE ---------- */
  function mobileMenu() {
    const btn = $('#menu-toggle');
    const menu = $('#mobile-menu');
    if (!btn || !menu) return;
    const open = $('.icon-open', btn);
    const close = $('.icon-close', btn);
    const toggle = (show) => {
      menu.classList.toggle('hidden', !show);
      btn.setAttribute('aria-expanded', String(show));
      if (open) open.classList.toggle('hidden', show);
      if (close) close.classList.toggle('hidden', !show);
    };
    btn.addEventListener('click', () => toggle(menu.classList.contains('hidden')));
    $$('.mobile-link', menu).forEach(a => a.addEventListener('click', () => toggle(false)));
  }

  /* ---------- SCROLL REVEAL ---------- */
  function reveal() {
    const items = $$('[data-reveal]');
    if (!items.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(el => io.observe(el));
  }

  /* ---------- MARQUEE infinito (clona el track) ---------- */
  function marquee() {
    ['#diff-marquee', '#brand-marquee'].forEach(sel => {
      const track = $(sel);
      if (!track) return;
      track.innerHTML += track.innerHTML; // duplica para loop sin cortes
    });
  }

  /* ---------- COUNT-UP de estadísticas ---------- */
  function counters() {
    const nums = $$('.stat-count');
    if (!nums.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const to = parseFloat(el.dataset.to || '0');
        const dec = parseInt(el.dataset.dec || '0', 10);
        const dur = 1400; const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (to * eased).toFixed(dec);
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = to.toFixed(dec);
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.6 });
    nums.forEach(n => io.observe(n));
  }

  /* ---------- CARRUSEL DE OPINIONES ---------- */
  function reviews() {
    const track = $('#reviews-track');
    const prev = $('#rev-prev');
    const next = $('#rev-next');
    const dotsWrap = $('#reviews-dots');
    if (!track || !prev || !next || !dotsWrap) return;

    const cards = $$('.review-card', track);
    const perView = () => window.innerWidth < 640 ? 1 : (window.innerWidth < 1024 ? 2 : 4);
    let page = 0;

    const pages = () => Math.max(1, Math.ceil(cards.length / perView()));

    const buildDots = () => {
      dotsWrap.innerHTML = '';
      for (let i = 0; i < pages(); i++) {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Ir al grupo ' + (i + 1));
        b.addEventListener('click', () => { page = i; render(); });
        dotsWrap.appendChild(b);
      }
    };

    const render = () => {
      const pv = perView();
      const total = pages();
      if (page > total - 1) page = total - 1;
      if (page < 0) page = 0;
      const card = cards[0];
      const gap = 20; // 1.25rem
      const step = (card.getBoundingClientRect().width + gap) * pv;
      track.style.transform = 'translateX(' + (-step * page) + 'px)';
      $$('button', dotsWrap).forEach((d, i) => d.classList.toggle('active', i === page));
    };

    prev.addEventListener('click', () => { page--; render(); });
    next.addEventListener('click', () => { page++; render(); });

    let auto = null;
    const startAuto = () => {
      if (reduceMotion) return;
      stopAuto();
      auto = setInterval(() => { page = (page + 1) % pages(); render(); }, 5000);
    };
    const stopAuto = () => auto && clearInterval(auto);
    track.parentElement.addEventListener('mouseenter', stopAuto);
    track.parentElement.addEventListener('mouseleave', startAuto);

    let resizeT;
    window.addEventListener('resize', () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(() => { buildDots(); render(); }, 150);
    });

    buildDots();
    render();
    startAuto();
  }

  /* ---------- TARJETA PREMIUM (Nosotros) — adaptación vanilla del
     "cinematic hero": brillo que sigue el mouse, tilt 3D del teléfono,
     y relleno del anillo + contador al entrar en pantalla. */
  function premiumCard() {
    const card = $('#about-card');
    const phone = $('#iphone-tilt');
    const ringFg = $('#ring-fg');
    const ringCount = $('#ring-count');
    if (!card) return;

    const CIRC = 402;          // 2π·64
    const TARGET = 100;        // batería nueva = 100%

    /* Anillo + contador al entrar en viewport */
    const animateRing = () => {
      if (ringFg) ringFg.style.strokeDashoffset = String(CIRC * (1 - TARGET / 100));
      if (!ringCount) return;
      if (reduceMotion) { ringCount.textContent = String(TARGET); return; }
      const dur = 1800, start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        ringCount.textContent = String(Math.round(TARGET * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { animateRing(); io.disconnect(); } });
      }, { threshold: 0.3 });
      io.observe(card);
    } else { animateRing(); }

    if (reduceMotion) return;

    /* Brillo (sheen) que sigue el cursor + tilt del teléfono — solo en dispositivos con puntero fino */
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let raf = null, pending = null;
    const onMove = (e) => {
      pending = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const ev = pending;
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', (ev.clientX - r.left) + 'px');
        card.style.setProperty('--mouse-y', (ev.clientY - r.top) + 'px');
        if (phone) {
          const rx = ((ev.clientY - r.top) / r.height - 0.5) * -16;
          const ry = ((ev.clientX - r.left) / r.width - 0.5) * 16;
          phone.style.transform = 'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
        }
      });
    };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', () => {
      if (phone) phone.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  /* ---------- AÑO en el footer ---------- */
  function year() {
    $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- INIT ---------- */
  function init() {
    buildBeams();
    header();
    progress();
    mobileMenu();
    reveal();
    marquee();
    counters();
    reviews();
    premiumCard();
    year();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
