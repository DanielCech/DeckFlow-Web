/* DeckFlow — landing page interactions
   ----------------------------------------------------- */

(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------
   * Nav: tonal shift once we've scrolled past the hero edge
   * ------------------------------------------------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------------------------------------------------
   * Reveal: tag every direct content child of [data-section]
   * with a staggered fade-up.
   * ------------------------------------------------- */
  const sections = document.querySelectorAll('[data-section]');
  sections.forEach((section) => {
    const candidates = section.querySelectorAll(
      '.eyebrow, .display, .headline, .lede, .kicker, .hero__actions, .hero__meta, ' +
      '.placeholder, .tile, .algo__flow li, .algo__formula, .markdown__sample, ' +
      '.widget, .split, .duo__chips, .cta'
    );
    candidates.forEach((el, i) => {
      el.setAttribute('data-reveal', '');
      el.style.setProperty('--reveal-delay', `${Math.min(i * 70, 420)}ms`);
    });
  });

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------------------------------------------------
   * Rail: highlight the section currently in view.
   * ------------------------------------------------- */
  const railItems = Array.from(document.querySelectorAll('.rail li'));
  const railMap = new Map(railItems.map((li) => [li.dataset.target, li]));

  if ('IntersectionObserver' in window) {
    const navIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        const li = railMap.get(id);
        if (!li) return;
        if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
          railItems.forEach((x) => x.classList.remove('is-active'));
          li.classList.add('is-active');
        }
      });
    }, { threshold: [0.35, 0.6] });

    sections.forEach((section) => {
      if (section.id && railMap.has(section.id)) navIO.observe(section);
    });
  }

  /* ---------------------------------------------------
   * Light parallax for elements tagged with data-parallax.
   * Values are pixels per scrolled pixel — small numbers.
   * ------------------------------------------------- */
  if (!prefersReducedMotion) {
    const parallaxItems = Array.from(document.querySelectorAll('[data-parallax]'))
      .map((el) => ({ el, rate: parseFloat(el.dataset.parallax) || 0 }));

    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      parallaxItems.forEach(({ el, rate }) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        const center = rect.top + rect.height / 2;
        const offset = (center - vh / 2) * rate;
        el.style.transform =
          (el.classList.contains('placeholder--tilt') ? 'rotate(4deg) ' : '') +
          `translate3d(0, ${(-offset).toFixed(1)}px, 0)`;
      });
      ticking = false;
    };
    const onScrollParallax = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener('scroll', onScrollParallax, { passive: true });
    window.addEventListener('resize', update);
  }

  /* ---------------------------------------------------
   * Hero pointer glow: nudge the beam toward the cursor
   * for a subtle "follow the light" effect on desktop.
   * ------------------------------------------------- */
  const beam = document.querySelector('.hero__beam');
  if (beam && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    let raf;
    document.querySelector('.hero')?.addEventListener('pointermove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 6;
        const y = (e.clientY / window.innerHeight - 0.5) * 6;
        beam.style.transform = `translate3d(${x}%, ${y}%, 0)`;
      });
    });
  }

  /* ---------------------------------------------------
   * Smooth scroll for in-page anchors (respects reduced motion).
   * ------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });
})();
