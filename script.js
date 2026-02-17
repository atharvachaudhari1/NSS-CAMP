/* ════════════════════════════════════════
   NSS Special Camp 2026 – Script
   Pure JS • No frameworks
   ════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Countdown Timer ─── */
  const TARGET = new Date('2026-03-15T00:00:00+05:30').getTime();

  const $days    = document.getElementById('cd-days');
  const $hours   = document.getElementById('cd-hours');
  const $minutes = document.getElementById('cd-minutes');
  const $seconds = document.getElementById('cd-seconds');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function updateValue(el, newVal) {
    const formatted = pad(newVal);
    if (el.textContent !== formatted) {
      el.textContent = formatted;
      // Trigger tick animation
      el.classList.remove('tick');
      // Force reflow so animation restarts
      void el.offsetWidth;
      el.classList.add('tick');
    }
  }

  function tick() {
    const now  = Date.now();
    const diff = TARGET - now;

    if (diff <= 0) {
      updateValue($days, 0);
      updateValue($hours, 0);
      updateValue($minutes, 0);
      updateValue($seconds, 0);
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    updateValue($days, d);
    updateValue($hours, h);
    updateValue($minutes, m);
    updateValue($seconds, s);
  }

  // Run immediately, then every second
  tick();
  setInterval(tick, 1000);

  /* ─── Scroll Reveal ─── */
  const revealEls = document.querySelectorAll('.reveal');

  function handleReveal() {
    const triggerBottom = window.innerHeight * 0.88;

    revealEls.forEach(function (el) {
      const top = el.getBoundingClientRect().top;
      if (top < triggerBottom) {
        el.classList.add('visible');
      }
    });
  }

  // Passive listener for perf
  window.addEventListener('scroll', handleReveal, { passive: true });
  // Run on load for elements already in view
  handleReveal();
})();
