(() => {
  'use strict';

  const revealTargets = [
    '.section-heading h2',
    '.chapter-card',
    '.path-item > h3',
    '.review-callout h2',
    '.chapter-content .toolbar h2',
    '.section-accordion > summary .module-title',
  ].join(', ');

  let main = null;
  let progress = null;
  let enabled = false;
  let revealObserver = null;
  let progressFrame = null;
  const sizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(queueProgress) : null;

  function queueProgress() {
    if (!enabled || !progress || progressFrame !== null) return;
    progressFrame = requestAnimationFrame(() => {
      progressFrame = null;
      const page = document.scrollingElement || document.documentElement;
      const distance = page.scrollHeight - page.clientHeight;
      const ratio = distance > 0 ? Math.min(1, Math.max(0, page.scrollTop / distance)) : 0;
      progress.style.setProperty('--reading-progress', ratio.toFixed(4));
    });
  }

  function observeReveals() {
    if (typeof IntersectionObserver !== 'function') return;
    revealObserver = new IntersectionObserver((entries, observer) => {
      if (observer !== revealObserver || !enabled) return;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        entry.target.classList.add('cinema-reveal');
      }
    }, {rootMargin: '0px 0px 16px 0px'});

    const viewportBottom = document.documentElement.clientHeight;
    for (const target of main.querySelectorAll(revealTargets)) {
      if (target.getBoundingClientRect().top >= viewportBottom) revealObserver.observe(target);
    }
  }

  function watchMain() {
    if (!enabled || !main) return;
    observeReveals();
    if (progress) sizeObserver?.observe(main);
    queueProgress();
  }

  function clearMotion() {
    revealObserver?.disconnect();
    revealObserver = null;
    sizeObserver?.disconnect();
    if (progressFrame !== null) cancelAnimationFrame(progressFrame);
    progressFrame = null;
    main?.querySelectorAll('.cinema-reveal, .cinema-route-enter').forEach(element => {
      element.classList.remove('cinema-reveal', 'cinema-route-enter');
    });
    progress?.style.removeProperty('--reading-progress');
  }

  function mount(nextMain, {routeChanged = false} = {}) {
    clearMotion();
    main = nextMain;
    progress = document.querySelector('[data-reading-progress]');
    watchMain();
    if (enabled && routeChanged) main?.querySelector('.chapter-hero')?.classList.add('cinema-route-enter');
  }

  function sync(nextEnabled) {
    if (enabled === nextEnabled) return;
    enabled = nextEnabled;
    document.documentElement.classList.toggle('cinema-motion-ready', enabled);
    if (enabled) watchMain();
    else clearMotion();
  }

  window.addEventListener('scroll', queueProgress, {passive: true});
  window.addEventListener('resize', queueProgress, {passive: true});
  window.inquiryMotion = {mount, sync};
})();
