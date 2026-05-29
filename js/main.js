/* JustFlip — landing page interactions
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
      '.placeholder, .algo__visual, .tile, .algo__flow li, .algo__formula, .markdown__sample, ' +
      '.widget, .split, .duo__chips, .cta, ' +
      '.float-pill, .ai__terminal, .ai__panel, .ai__note'
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
   * Algorithm illustration: count-up ring + urgency cycle.
   * Mirrors the onboarding progress/urgency panel.
   * ------------------------------------------------- */
  const algorithmDashboard = document.querySelector('[data-algo-dashboard]');
  if (algorithmDashboard) {
    const progressValue = algorithmDashboard.querySelector('[data-algo-progress-value]');
    const ringProgress = algorithmDashboard.querySelector('.algo__ring-progress');
    const urgencyDots = Array.from(algorithmDashboard.querySelectorAll('.algo__urgency-dot'));
    const progressTarget = Number(algorithmDashboard.dataset.progressTarget || 78);
    const progressDuration = Number(algorithmDashboard.dataset.progressDuration || 1400);
    const urgencyCycle = Number(algorithmDashboard.dataset.urgencyCycle || 2400);
    const urgencyPalette = ['#8c8a7a', '#e0914f', '#f0c04b', '#d9745e', '#c45c4b'];
    const ringLength = ringProgress?.getTotalLength?.() || 0;
    let activeUrgency = 0;
    let hasStarted = false;

    const hexToRgba = (hex, alpha) => {
      const normalized = hex.replace('#', '');
      const value = normalized.length === 3
        ? normalized.split('').map((char) => char + char).join('')
        : normalized;
      const int = Number.parseInt(value, 16);
      const r = (int >> 16) & 255;
      const g = (int >> 8) & 255;
      const b = int & 255;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const setUrgency = (index) => {
      activeUrgency = ((index % urgencyPalette.length) + urgencyPalette.length) % urgencyPalette.length;
      const color = urgencyPalette[activeUrgency];

      algorithmDashboard.style.setProperty('--algo-urgency-color', color);
      algorithmDashboard.style.setProperty('--algo-urgency-glow', hexToRgba(color, 0.38));

      urgencyDots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === activeUrgency);
      });
    };

    const setProgress = (value) => {
      const clamped = Math.max(0, Math.min(progressTarget, value));
      if (progressValue) progressValue.textContent = `${Math.round(clamped)}%`;
      if (ringProgress && ringLength > 0) {
        ringProgress.style.strokeDasharray = `${ringLength}`;
        ringProgress.style.strokeDashoffset = `${ringLength * (1 - clamped / 100)}`;
      }
    };

    const animateProgress = () => {
      if (prefersReducedMotion) return;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / progressDuration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setProgress(progressTarget * eased);
        if (progress < 1) {
          window.requestAnimationFrame(tick);
        } else {
          setProgress(progressTarget);
        }
      };
      window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (hasStarted) return;
      hasStarted = true;

      if (prefersReducedMotion) {
        setProgress(progressTarget);
        setUrgency(2);
        return;
      }

      setProgress(0);
      setUrgency(0);
      animateProgress();

      window.setInterval(() => {
        setUrgency(activeUrgency + 1);
      }, urgencyCycle);
    };

    if ('IntersectionObserver' in window) {
      const dashboardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          start();
          dashboardObserver.unobserve(entry.target);
        });
      }, { threshold: 0.35, rootMargin: '0px 0px -8% 0px' });

      dashboardObserver.observe(algorithmDashboard);
    } else {
      start();
    }
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
