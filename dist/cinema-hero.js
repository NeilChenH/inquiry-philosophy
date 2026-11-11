(() => {
  'use strict';

  const mouse = window.matchMedia('(any-pointer: fine)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const paintInterval = 1000 / 30;
  let mounted = null;
  let motionEnabled = false;

  function lightTexture(size, stops) {
    const texture = document.createElement('canvas');
    texture.width = texture.height = size;
    const context = texture.getContext('2d');
    if (!context) return null;
    const center = size / 2;
    const gradient = context.createRadialGradient(center, center, 0, center, center, center);
    for (const [position, color] of stops) gradient.addColorStop(position, color);
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
    return texture;
  }

  function prepareCanvas(state) {
    if (!state.context) return;
    const width = state.hero.clientWidth;
    const height = state.hero.clientHeight;
    if (!width || !height) return;
    const scale = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(2000000 / (width * height)));
    state.width = width;
    state.height = height;
    state.canvas.width = Math.max(1, Math.round(width * scale));
    state.canvas.height = Math.max(1, Math.round(height * scale));
    state.context.setTransform(state.canvas.width / width, 0, 0, state.canvas.height / height, 0, 0);
  }

  function paint(state) {
    const {context, width, height, age, x, y, motes, bloom, glint} = state;
    if (!context || !width || !height) return;
    context.clearRect(0, 0, width, height);
    if (bloom) {
      const size = Math.min(width * .85, height * 1.6);
      const centerX = width * .7 + Math.sin(age * .2) * width * .06 + x * 28;
      const centerY = height * .32 + y * 20;
      context.globalAlpha = .7;
      context.drawImage(bloom, centerX - size * .5, centerY - size * .4, size, size * .8);
    }
    if (glint) {
      const count = width < 650 ? 18 : motes.length;
      for (let i = 0; i < count; i++) {
        const mote = motes[i];
        const drift = (mote.y + 1 - (age * mote.speed) % 1) % 1;
        const light = .34 + Math.sin(age * mote.flicker + i) * .13;
        const px = width * mote.x + Math.sin(drift * 9 + i) * 15 + x * 18 * mote.depth;
        const py = height * drift + y * 14 * mote.depth;
        context.globalAlpha = light * Math.min(drift * 10, (1 - drift) * 10, 1);
        context.drawImage(glint, px, py, mote.size, mote.size);
      }
    }
    context.globalAlpha = 1;
  }

  function frame(state, now) {
    const delta = state.lastTime ? Math.min(50, now - state.lastTime) : 16;
    state.lastTime = now;
    state.age += delta / 1000;
    const smoothing = 1 - Math.exp(-delta / 100);
    const dx = state.targetX - state.x;
    const dy = state.targetY - state.y;
    if (Math.abs(dx) + Math.abs(dy) > .002) {
      state.x += dx * smoothing;
      state.y += dy * smoothing;
      state.hero.style.setProperty('--hero-shift-x', `${(state.x * -23).toFixed(2)}px`);
      state.hero.style.setProperty('--hero-shift-y', `${(state.y * -15).toFixed(2)}px`);
    }
    if (now - state.lastPaint >= paintInterval) {
      paint(state);
      state.lastPaint = now;
    }
    state.frameId = window.requestAnimationFrame(time => frame(state, time));
  }

  function reconcile(state, enabled = motionEnabled && !reduced.matches) {
    const live = enabled && state.intersects && !document.hidden;
    state.hero.toggleAttribute('data-hero-motion', enabled);
    state.hero.toggleAttribute('data-hero-live', live);

    if (!enabled) {
      state.hero.removeAttribute('data-hero-intro');
      state.hero.style.removeProperty('--hero-shift-x');
      state.hero.style.removeProperty('--hero-shift-y');
      state.x = state.y = state.targetX = state.targetY = 0;
    }
    if (!live) {
      window.cancelAnimationFrame(state.frameId);
      state.frameId = 0;
      state.lastTime = 0;
      return;
    }
    if (!state.introduced) {
      state.hero.setAttribute('data-hero-intro', '');
      state.introduced = true;
    }
    if (!state.frameId) {
      prepareCanvas(state);
      state.frameId = window.requestAnimationFrame(now => frame(state, now));
    }
  }

  function mount(hero) {
    if (mounted?.hero === hero) return;
    if (mounted) {
      reconcile(mounted, false);
      mounted.listeners.abort();
      mounted.visibility?.disconnect();
      mounted.resize?.disconnect();
      mounted = null;
    }
    if (!hero) return;

    const canvas = hero.querySelector('#cinema-dust');
    const context = canvas?.getContext('2d') || null;
    const listeners = new AbortController();
    const state = {
      hero, canvas, context, listeners,
      intersects: !('IntersectionObserver' in window),
      introduced: false,
      frameId: 0, lastTime: 0, lastPaint: -Infinity,
      age: 0, width: 0, height: 0,
      x: 0, y: 0, targetX: 0, targetY: 0,
      motes: Array.from({length: 54}, () => ({
        x: Math.random(), y: Math.random(),
        speed: .008 + Math.random() * .021,
        flicker: .5 + Math.random() * 1.1,
        depth: Math.random(),
        size: 2 + Math.random() * 6,
      })),
      bloom: context && lightTexture(192, [
        [0, 'rgba(255, 222, 153, .21)'],
        [.27, 'rgba(234, 205, 144, .13)'],
        [1, 'rgba(218, 199, 144, 0)'],
      ]),
      glint: context && lightTexture(16, [
        [0, 'rgba(251, 247, 204, 1)'],
        [.24, 'rgba(245, 241, 186, .76)'],
        [1, 'rgba(239, 228, 155, 0)'],
      ]),
    };
    mounted = state;
    const signal = listeners.signal;
    const refresh = () => { if (mounted === state) reconcile(state); };
    const resize = () => { if (state.frameId) prepareCanvas(state); };

    hero.addEventListener('pointermove', event => {
      if (!state.frameId || !mouse.matches || event.pointerType !== 'mouse') return;
      const rect = hero.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      state.targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      state.targetY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    }, {passive: true, signal});
    hero.addEventListener('pointerleave', () => {
      state.targetX = state.targetY = 0;
    }, {passive: true, signal});
    document.addEventListener('visibilitychange', refresh, {signal});
    reduced.addEventListener?.('change', refresh, {signal});
    window.addEventListener('resize', resize, {passive: true, signal});

    if ('IntersectionObserver' in window) {
      state.visibility = new IntersectionObserver(([entry]) => {
        state.intersects = entry.isIntersecting;
        refresh();
      });
      state.visibility.observe(hero);
    }
    if ('ResizeObserver' in window) {
      state.resize = new ResizeObserver(resize);
      state.resize.observe(hero);
    }
    refresh();
  }

  function sync(enabled) {
    motionEnabled = Boolean(enabled);
    if (mounted) reconcile(mounted);
  }

  window.inquiryHero = {mount, sync};
})();
