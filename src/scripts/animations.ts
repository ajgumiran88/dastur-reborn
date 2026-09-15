/* ============================================================================
   DASTUR — progressive-enhancement animation module.
   Scroll reveals only. Decorative image, magnetic, tilt, and parallax motion
   are intentionally omitted. Fully usable without this file.
   ========================================================================== */

const html = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Reveal all `[data-animate]` immediately (used as a fallback / reduced-motion). */
function revealAll() {
  document.querySelectorAll('[data-animate]').forEach((el) => el.classList.add('is-inview'));
}

if (reduce || !('IntersectionObserver' in window)) {
  html.classList.remove('animate-ready');
  revealAll();
} else {
  html.classList.add('animate-live');
  initReveals();
}

function initReveals() {
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-animate]'));
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const delay = Number(el.dataset.animateDelay ?? 0);
        window.setTimeout(() => el.classList.add('is-inview'), delay);
        obs.unobserve(el);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );

  items.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      const delay = Number(el.dataset.animateDelay ?? 0);
      window.setTimeout(() => el.classList.add('is-inview'), Math.min(delay, 500));
    } else {
      io.observe(el);
    }
  });
}
