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
  let chapterIntro = null;
  let progressFrame = null;
  const sizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(queueProgress) : null;

  function queueProgress() {
    // 合并同一帧内的滚动和尺寸变化事件，减少重复读取页面高度。
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

    // 只观察当前视口下方的内容，已可见的内容直接呈现。
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
    // 切换页面或暂停动效时清理观察器和待执行帧。
    chapterIntro?.revert();
    chapterIntro = null;
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

  function enterChapter() {
    const hero = main?.querySelector('.chapter-hero');
    if (!hero) return;
    const gsap = window.gsap;
    if (!gsap) {
      hero.classList.add('cinema-route-enter');
      return;
    }

    // 章节切换只为页首编排镜头，标签、课件和正文随时可操作。
    chapterIntro = gsap.context(() => {
      gsap.timeline({defaults: {ease: 'power2.out'}})
        .from(hero.querySelector('img'), {scale: 1.045, duration: .68}, 0)
        .from('.eyebrow, h1, .chapter-subtitle',
          {y: 9, opacity: .64, duration: .34, stagger: .045}, .04);
    }, hero);
  }

  function mount(nextMain, {routeChanged = false} = {}) {
    clearMotion();
    main = nextMain;
    progress = document.querySelector('[data-reading-progress]');
    watchMain();
    if (enabled && routeChanged) enterChapter();
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
