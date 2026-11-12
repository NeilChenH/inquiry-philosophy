(() => {
  'use strict';

  const mouse = window.matchMedia('(any-pointer: fine)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let mounted = null;
  let motionEnabled = false;
  let nebulaScene = null;

  function seededRandom(seed) {
    return () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
  }

  function noiseGrid(width, height, random) {
    return {width, height, values: Float32Array.from({length: width * height}, random)};
  }

  function sampleNoise({width, height, values}, x, y) {
    const column = x * (width - 1.001);
    const row = y * (height - 1.001);
    const left = Math.floor(column);
    const top = Math.floor(row);
    const dx = column - left;
    const dy = row - top;
    const u = dx * dx * (3 - 2 * dx);
    const v = dy * dy * (3 - 2 * dy);
    const i = top * width + left;
    const upper = values[i] + (values[i + 1] - values[i]) * u;
    const lower = values[i + width] + (values[i + width + 1] - values[i + width]) * u;
    return upper + (lower - upper) * v;
  }

  function cloudTexture(random, offset) {
    const texture = document.createElement('canvas');
    const width = texture.width = 336;
    const height = texture.height = 220;
    const context = texture.getContext('2d');
    if (!context) return null;
    const broad = noiseGrid(8, 6, random);
    const middle = noiseGrid(21, 14, random);
    const fine = noiseGrid(54, 33, random);
    const pixels = context.createImageData(width, height);

    // 低分辨率纹理只生成一次，多层噪声塑造云带的褶皱和明暗。
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = x / width;
        const v = y / height;
        const large = sampleNoise(broad, u, v);
        const detail = sampleNoise(middle, u, v);
        const grain = sampleNoise(fine, u, v);
        const spine = .55 + offset - (u - .5) * .59 + Math.sin(u * 11 + offset * 12) * .067;
        const distance = v - spine + (large - .5) * .29 + (detail - .5) * .065;
        const falloff = Math.exp(-distance * distance / .018);
        const thread = Math.exp(-Math.abs(distance - .028) * 28);
        const density = Math.pow(Math.max(0, large * .47 + detail * .37 + grain * .16 - .21), 1.32);
        const flare = Math.max(0, detail - .35) * .7 + large * .39;
        const i = (y * width + x) * 4;
        pixels.data[i] = 126 + flare * 117;
        pixels.data[i + 1] = 56 + flare * 102;
        pixels.data[i + 2] = 15 + flare * 51;
        pixels.data[i + 3] = Math.min(1, density * (falloff * 1.3 + thread * .35)) * 255;
      }
    }
    context.putImageData(pixels, 0, 0);
    return texture;
  }

  function makeScene() {
    const random = seededRandom(20842);
    const stars = Array.from({length: 320}, (_, i) => {
      const x = random();
      const scatter = (random() + random() + random() - 1.5) * .58;
      const y = i < 184 ? random() : .55 - (x - .5) * .54 + scatter;
      return {x, y, radius: .35 + random() ** 3 * 1.28, shine: .13 + random() * .57, phase: random() * Math.PI * 2};
    });
    return {stars, clouds: [cloudTexture(random, -.077), cloudTexture(random, .133)]};
  }

  function prepareCanvas(state) {
    if (!state.context) return;
    const width = state.hero.clientWidth;
    const height = state.hero.clientHeight;
    if (!width || !height) return;
    // 限制画布像素总量，控制高分屏的绘制开销。
    const scale = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(2000000 / (width * height)));
    state.width = width;
    state.height = height;
    state.canvas.width = Math.max(1, Math.round(width * scale));
    state.canvas.height = Math.max(1, Math.round(height * scale));
    state.context.setTransform(state.canvas.width / width, 0, 0, state.canvas.height / height, 0, 0);
  }

  function paint(state) {
    const {context, width, height, age, x, y, pointer, fieldStrength} = state;
    if (!context || !width || !height || !nebulaScene) return;
    context.clearRect(0, 0, width, height);

    const cloudWidth = Math.max(width * 1.11, height * .96);
    const cloudHeight = height * 1.14;
    const cloudLeft = (width - cloudWidth) * .5;
    const cloudTop = (height - cloudHeight) * .5;
    const [back, front] = nebulaScene.clouds;
    if (back) {
      context.globalAlpha = .56;
      context.drawImage(back, cloudLeft + x * 11, cloudTop + y * 8, cloudWidth, cloudHeight);
    }
    if (front) {
      context.globalAlpha = .73;
      context.drawImage(front, cloudLeft - x * 21 + Math.sin(age * .18) * 14, cloudTop - y * 13, cloudWidth, cloudHeight);
    }

    const count = width < 650 ? 188 : nebulaScene.stars.length;
    const reach = Math.min(168, width * .22);
    for (let i = 0; i < count; i++) {
      const star = nebulaScene.stars[i];
      let px = star.x * width + Math.sin(age * .24 + star.phase) * 4 - x * star.radius * 7;
      let py = star.y * height + Math.cos(age * .16 + star.phase) * 5 - y * star.radius * 5;
      if (fieldStrength > .015) {
        const dx = pointer.fieldX - px;
        const dy = pointer.fieldY - py;
        const distance = Math.hypot(dx, dy);
        if (distance < reach && distance > .5) {
          const pull = fieldStrength * (1 - distance / reach) ** 2 * (i % 4 === 0 ? -23 : 16);
          px += dx / distance * pull;
          py += dy / distance * pull;
        }
      }
      const flicker = .76 + Math.sin(age * .98 + star.phase) * .24;
      context.globalAlpha = star.shine * flicker;
      context.fillStyle = i % 5 === 0 ? '#f4e8bd' : '#e8b662';
      context.fillRect(px, py, star.radius, star.radius);
      if (star.radius > 1.5) {
        context.globalAlpha *= .29;
        context.fillRect(px - 2.2, py + .4, 5.8, .7);
        context.fillRect(px + .4, py - 2.2, .7, 5.8);
      }
    }
    context.globalAlpha = 1;
  }

  function moveHalo(pointer) {
    pointer.element.style.transform = `translate3d(${pointer.x.toFixed(2)}px, ${pointer.y.toFixed(2)}px, 0)`;
  }

  function releaseMagnet(pointer) {
    const magnet = pointer.magnet;
    if (!magnet) return;
    magnet.button.removeAttribute('data-hero-magnet');
    magnet.button.style.removeProperty('--hero-magnet-x');
    magnet.button.style.removeProperty('--hero-magnet-y');
    pointer.element.removeAttribute('data-cta');
    pointer.magnet = null;
  }

  function resetPointer(state) {
    const pointer = state.pointer;
    if (pointer.x !== null) state.hero.removeAttribute('data-hero-pointer');
    pointer.x = null;
    releaseMagnet(pointer);
    state.targetX = state.targetY = 0;
  }

  function trackPointer(state, event) {
    // 混合设备也须收到实际鼠标事件，触摸和手写笔不会触发跟随。
    if (!state.frameId || !mouse.matches || event.pointerType !== 'mouse') {
      resetPointer(state);
      return;
    }
    const rect = state.hero.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const pointer = state.pointer;
    pointer.targetX = event.clientX - rect.left;
    pointer.targetY = event.clientY - rect.top;
    pointer.fieldX = pointer.targetX;
    pointer.fieldY = pointer.targetY;
    state.targetX = (pointer.targetX / rect.width) * 2 - 1;
    state.targetY = (pointer.targetY / rect.height) * 2 - 1;
    if (pointer.x === null) {
      pointer.x = pointer.targetX;
      pointer.y = pointer.targetY;
      moveHalo(pointer);
      state.hero.setAttribute('data-hero-pointer', '');
    }

    const button = event.target?.closest?.('.hero-actions a.button') || null;
    if (button !== (pointer.magnet?.button || null)) {
      releaseMagnet(pointer);
      if (button) {
        pointer.magnet = {button, x: 0, y: 0};
        pointer.element.setAttribute('data-cta', '');
        button.setAttribute('data-hero-magnet', '');
      }
    }
    if (button) {
      const box = button.getBoundingClientRect();
      const pull = (point, start, size) => Math.max(-1, Math.min(1, (point - start) * 2 / (size || 1) - 1));
      pointer.magnet.targetX = pull(event.clientX, box.left, box.width) * 7;
      pointer.magnet.targetY = pull(event.clientY, box.top, box.height) * 5;
    }
  }

  function followPointer(pointer, delta) {
    if (pointer.x === null) return;
    const easing = 1 - Math.exp(-delta / 42);
    const haloX = pointer.targetX - pointer.x;
    const haloY = pointer.targetY - pointer.y;
    if (Math.abs(haloX) + Math.abs(haloY) > .15) {
      pointer.x += haloX * easing;
      pointer.y += haloY * easing;
      moveHalo(pointer);
    }

    const magnet = pointer.magnet;
    if (!magnet) return;
    const dx = magnet.targetX - magnet.x;
    const dy = magnet.targetY - magnet.y;
    if (Math.abs(dx) + Math.abs(dy) < .05) return;
    magnet.x += dx * easing;
    magnet.y += dy * easing;
    magnet.button.style.setProperty('--hero-magnet-x', `${magnet.x.toFixed(2)}px`);
    magnet.button.style.setProperty('--hero-magnet-y', `${magnet.y.toFixed(2)}px`);
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
    }
    followPointer(state.pointer, delta);
    state.fieldStrength += ((state.pointer.x === null ? 0 : 1) - state.fieldStrength) * smoothing;
    // 粒子绘制与指针跟随分开节流，空闲时只更新缓慢流动的背景。
    const paintInterval = state.pointer.x === null ? 1000 / 24 : 1000 / 30;
    if (now - state.lastPaint >= paintInterval) {
      paint(state);
      state.lastPaint = now;
    }
    state.frameId = window.requestAnimationFrame(time => frame(state, time));
  }

  function playIntro(state) {
    const gsap = window.gsap;
    if (!gsap) {
      state.hero.setAttribute('data-hero-intro', '');
      return;
    }

    // 星云先铺开，双语片名与学习入口依次进入。保留文字对比度和键盘可用性。
    state.intro = gsap.context(() => {
      const timeline = gsap.timeline({defaults: {ease: 'power2.out'}});
      timeline
        .from(state.canvas, {opacity: .35, duration: .8}, 0)
        .from('.nebula-zh > span', {y: 18, opacity: .5, duration: .65, stagger: .09}, .07)
        .from('.nebula-english', {y: 9, opacity: .5, duration: .55}, .23)
        .from('.nebula-subtitle', {y: 7, opacity: .65, duration: .45}, .38)
        .from('.hero-actions', {opacity: .75, duration: .38}, .49);
    }, state.hero);
  }

  function reconcile(state, enabled = motionEnabled && !reduced.matches) {
    // 首屏离开视口或页面进入后台时暂停绘制，并复位指针效果。
    const live = enabled && state.intersects && !document.hidden;
    state.hero.toggleAttribute('data-hero-motion', enabled);
    state.hero.toggleAttribute('data-hero-live', live);

    if (!enabled) {
      state.hero.removeAttribute('data-hero-intro');
      state.x = state.y = state.targetX = state.targetY = 0;
    }
    if (!live) {
      state.intro?.revert();
      state.intro = null;
      resetPointer(state);
      window.cancelAnimationFrame(state.frameId);
      state.frameId = 0;
      state.lastTime = 0;
      state.fieldStrength = 0;
      return;
    }
    if (!state.introduced) {
      playIntro(state);
      state.introduced = true;
    }
    if (!state.frameId) {
      prepareCanvas(state);
      if (state.context && !nebulaScene) nebulaScene = makeScene();
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
      mounted.pointer.element.remove();
      mounted = null;
    }
    if (!hero) return;

    const canvas = hero.querySelector('#cinema-dust');
    const context = canvas?.getContext('2d') || null;
    const cursor = document.createElement('span');
    cursor.className = 'hero-pointer';
    cursor.setAttribute('aria-hidden', 'true');
    const cursorLabel = document.createElement('span');
    cursorLabel.className = 'hero-pointer-label';
    cursorLabel.textContent = '打开 / OPEN';
    cursor.append(cursorLabel);
    hero.append(cursor);
    const listeners = new AbortController();
    const state = {
      hero, canvas, context, listeners,
      intersects: !('IntersectionObserver' in window),
      introduced: false,
      frameId: 0, lastTime: 0, lastPaint: -Infinity,
      age: 0, width: 0, height: 0,
      x: 0, y: 0, targetX: 0, targetY: 0, fieldStrength: 0,
      pointer: {element: cursor, x: null, y: 0, targetX: 0, targetY: 0, fieldX: 0, fieldY: 0, magnet: null},
    };
    mounted = state;
    const signal = listeners.signal;
    const refresh = () => { if (mounted === state) reconcile(state); };
    const reset = () => resetPointer(state);
    const resize = () => {
      reset();
      if (state.frameId) prepareCanvas(state);
    };

    hero.addEventListener('pointermove', event => trackPointer(state, event), {passive: true, signal});
    hero.addEventListener('pointerleave', reset, {signal});
    hero.addEventListener('pointercancel', reset, {signal});
    document.addEventListener('visibilitychange', refresh, {signal});
    mouse.addEventListener?.('change', reset, {signal});
    reduced.addEventListener?.('change', refresh, {signal});
    window.addEventListener('blur', reset, {signal});
    window.addEventListener('scroll', reset, {passive: true, signal});
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
