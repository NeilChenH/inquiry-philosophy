(() => {
  'use strict';

  const escape = value => String(value ?? '').replace(/[&<>"']/g, character =>
    ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[character]);

  const quote = '没有被检验过的人生，不值得过。';
  const quoteSource = 'https://chs.harvard.edu/primary-source/plato-the-apology-of-socrates-sb/';
  const {gsap, ScrollTrigger} = window;
  const scrollAnimations = Boolean(gsap && ScrollTrigger);
  if (scrollAnimations) gsap.registerPlugin(ScrollTrigger);
  let motion = false;
  let mounted = null;
  let frame = 0;

  function renderOpening(chapterId) {
    return `<section class="hero inquiry-nebula" aria-labelledby="opening-title">
      <canvas id="cinema-dust" aria-hidden="true"></canvas>
      <div class="hero-copy">
        <h1 class="nebula-title" id="opening-title" aria-label="观问 INQUIRY">
          <span class="nebula-zh" aria-hidden="true"><span style="--glyph-index:0">观</span><span style="--glyph-index:1">问</span></span>
          <span class="nebula-english" aria-hidden="true" lang="en">INQUIRY</span>
        </h1>
        <p class="nebula-subtitle">从一个问题开始<span lang="en">A WORLD OF IDEAS</span></p>
        <div class="hero-actions"><a class="button primary" href="#/chapter/${chapterId}">
          <span>走入哲学<small lang="en">ENTER PHILOSOPHY</small></span><span class="arrow" aria-hidden="true">↗</span>
        </a></div>
      </div>
    </section>`;
  }

  function renderDoor(chapter, {pageCount, image, credit}, completed) {
    const units = chapter.sections.length;
    const done = chapter.sections.filter(unit => completed.has(unit.id)).length;
    const percent = units ? Math.round(done / units * 100) : 0;
    const art = credit(chapter.id);
    const number = String(chapter.id).padStart(2, '0');
    return `<article class="cinema-door" data-door="${chapter.id}" aria-labelledby="door-${chapter.id}-title">
      <div class="door-grid">
        <div class="door-copy">
          <div class="door-number" aria-hidden="true">${number}</div>
          <h3 id="door-${chapter.id}-title">${escape(chapter.title.zh)}<small lang="en">${escape(chapter.title.en)}</small></h3>
          <p class="door-subtitle">${escape(chapter.subtitle.zh)}<span lang="en">${escape(chapter.subtitle.en)}</span></p>
          <p class="door-counts">${pageCount(chapter)} 页 PAGES <span aria-hidden="true">/</span> ${units} 单元 UNITS</p>
          <div class="door-progress">
            <div><span>完成进度 <small lang="en">PROGRESS</small></span><strong data-door-percent="${percent}" aria-hidden="true">${percent}%</strong></div>
            <progress value="${percent}" max="100" aria-label="第 ${chapter.id} 章完成进度 / Chapter ${chapter.id} progress">${percent}%</progress>
          </div>
          <a class="door-entry" href="#/chapter/${chapter.id}"><span>进入第 ${chapter.id} 章<small lang="en">ENTER CHAPTER ${number}</small></span><span aria-hidden="true">↗</span></a>
        </div>
        <figure class="door-figure">
          <div class="door-image"><img src="${escape(image(chapter.id))}" alt="${escape(art?.title || chapter.title.zh)}" loading="lazy" decoding="async"></div>
          ${art?.source ? `<figcaption><a href="${escape(art.source)}" target="_blank" rel="noopener noreferrer">${escape(art.creator || art.title)}${art.licenseUrl ? ` · ${escape(art.license)}` : ''} <span aria-hidden="true">↗</span></a></figcaption>` : ''}
        </figure>
      </div>
    </article>`;
  }

  function renderPath(chapterId, fullSlides) {
    const steps = [
      {title: '看见关系', en: 'See the connections', detail: '用互动图解，试着区分演绎、归纳和溯因。', detailEn: 'Use an interactive diagram to distinguish deduction, induction and abduction.', href: '#/chapter/3'},
      {title: '回到原页', en: 'Return to the source', detail: fullSlides ? '对照原图、英文和中文译文，追到概念的出处。' : '用页码索引找到对应原图、英文和中文译文。', detailEn: fullSlides ? 'Compare the slide image, English text and Chinese translation.' : 'Find the slide image, English text and Chinese translation through the page index.', href: `#/chapter/${chapterId}/slides/1`},
      {title: '练习追问', en: 'Put ideas to the test', detail: '选一组题，读解析，再回到让你犹豫的地方。', detailEn: 'Try a set of questions, read the explanations and revisit what made you pause.', href: '#/review'}
    ];
    return `<section class="home-path" aria-labelledby="thought-path-title">
      <div class="home-scene-inner">
        <h2 id="thought-path-title" class="home-scene-title">学习路径<small lang="en">THE LEARNING PATH</small></h2>
        <div class="thought-path" data-home-path>
          <svg class="path-line path-line-wide" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true"><path d="M0 1H100" pathLength="1" /></svg>
          <ol>
            ${steps.map((step, index) => `<li style="--path-step:${index}">
              ${index < steps.length - 1 ? '<svg class="path-line path-line-narrow" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true"><path d="M1 0V100" pathLength="1" /></svg>' : ''}
              <a href="${step.href}">
                <span class="path-dot" aria-hidden="true"></span>
                <span class="path-step-copy">
                  <strong>${step.title}<small lang="en">${step.en}</small></strong>
                  <span>${step.detail}</span><span lang="en">${step.detailEn}</span>
                </span>
              </a>
            </li>`).join('')}
          </ol>
        </div>
      </div>
    </section>`;
  }

  function renderReflection() {
    const glyphs = Array.from(quote, (glyph, index) =>
      `<span style="--quote-order:${index}">${escape(glyph)}</span>`).join('');
    return `<section class="home-reflection" aria-labelledby="reflection-title" data-home-reflection>
      <div class="home-scene-inner reflection-inner">
        <h2 id="reflection-title" class="home-scene-title">今日思考<small lang="en">TODAY’S QUESTION</small></h2>
        <blockquote class="reflection-quote">
          <p lang="zh-CN"><span class="sr-only">${quote}</span><span class="reflection-glyphs" aria-hidden="true">${glyphs}</span></p>
          <p lang="en">“The unexamined life is not worth living.”</p>
          <cite><a href="${quoteSource}" target="_blank" rel="noopener noreferrer">苏格拉底 · 柏拉图《申辩篇》38a <span aria-hidden="true">↗</span><small lang="en">Socrates · Plato, Apology 38a</small></a></cite>
        </blockquote>
        <div class="reflection-stage">
          <form class="reflection-form" aria-describedby="reflection-privacy">
            <label for="reflection-question">你今天在想什么问题？<small lang="en">What question are you thinking about today?</small></label>
            <textarea id="reflection-question" name="question" rows="3" maxlength="180" required></textarea>
            <div class="reflection-actions">
              <p id="reflection-privacy">提问只保留在当前页面。<span lang="en">Your question stays on this page.</span></p>
              <button type="submit" class="reflection-submit"><span>留下一问<small lang="en">RELEASE A QUESTION</small></span><span aria-hidden="true">↗</span></button>
            </div>
            <output class="reflection-status" aria-live="polite"></output>
          </form>
          <details class="reflection-recall" hidden>
            <summary>重读这次提问 / Read this question again</summary>
            <p></p>
          </details>
          <div class="reflection-flights" aria-hidden="true"></div>
        </div>
      </div>
    </section>`;
  }

  function render(context) {
    const {chapters, lastChapter, fullSlides} = context;
    const chapterId = chapters.some(chapter => chapter.id === lastChapter) ? lastChapter : chapters[0]?.id || 1;
    const completed = new Set(context.completed);
    return `<div class="inquiry-home">
      ${renderOpening(chapterId)}
      <section class="home-journey" aria-labelledby="journey-title">
        <div class="home-scene-inner">
          <div class="journey-intro">
            <h2 id="journey-title" class="home-scene-title">八扇门，<br>八种看世界的方式<small lang="en">EIGHT DOORS, EIGHT WAYS TO SEE</small></h2>
            <a class="journey-index" href="#/chapters">查看章节目录 <span lang="en">CHAPTER INDEX</span><span aria-hidden="true">↗</span></a>
          </div>
          ${chapters.map(chapter => renderDoor(chapter, context, completed)).join('')}
        </div>
      </section>
      ${renderPath(chapterId, fullSlides)}
      ${renderReflection()}
    </div>`;
  }

  function queueSceneFrame() {
    if (!mounted || !motion || mounted.scrollMedia || frame) return;
    frame = requestAnimationFrame(updateScenes);
  }

  function setActiveDoor(state, door) {
    if (state.active === door) return;
    state.active?.removeAttribute('data-door-active');
    door?.setAttribute('data-door-active', '');
    state.active = door;
    countDoor(door);
  }

  function startScrollScenes(state) {
    if (!scrollAnimations) {
      queueSceneFrame();
      return;
    }

    // 一个首页只保留一组滚动触发器，切章或关闭动效时统一复原。
    state.scrollMedia = gsap.matchMedia(state.home);
    state.scrollMedia.add({
      animate: '(prefers-reduced-motion: no-preference)',
      wide: '(min-width: 761px)'
    }, ({conditions}) => {
      if (!conditions.animate) return;
      for (const door of state.doors) {
        ScrollTrigger.create({
          id: `inquiry-door-${door.dataset.door}`,
          trigger: door,
          start: 'top 58%',
          end: 'bottom 58%',
          onToggle: trigger => {
            if (trigger.isActive) setActiveDoor(state, door);
            else if (state.active === door) setActiveDoor(state, null);
          }
        });
        // 只移动图片的合成层，不让正文跟着视差移动。
        if (conditions.wide) {
          gsap.fromTo(door.querySelector('.door-image img'),
            {yPercent: -4, scale: 1.12},
            {yPercent: 4, scale: 1.12, ease: 'none', scrollTrigger: {
              trigger: door, start: 'top bottom', end: 'bottom top', scrub: true
            }});
        }
      }

      const path = state.home.querySelector('[data-home-path]');
      const dots = path.querySelectorAll('.path-dot');
      const pathTimeline = gsap.timeline({
        defaults: {immediateRender: false, ease: 'power2.out'},
        scrollTrigger: {id: 'inquiry-path', trigger: path, start: 'top 84%', once: true}
      });
      // pathLength 为 1，使用 SVG 属性保留小数偏移，避免按像素取整。
      pathTimeline
        .fromTo(path.querySelectorAll('.path-line path'),
          {attr: {'stroke-dasharray': '1 1', 'stroke-dashoffset': 1}},
          {attr: {'stroke-dashoffset': 0}, duration: .9}, 0)
        .from(dots, {scale: .68, opacity: .48, duration: .36, stagger: .22}, .12)
        .set(dots, {clearProps: 'transform,opacity'});

      const reflection = state.home.querySelector('[data-home-reflection]');
      gsap.from(reflection.querySelectorAll('.reflection-glyphs > span'), {
        opacity: .45, y: 5, duration: .42, stagger: .032, immediateRender: false,
        scrollTrigger: {id: 'inquiry-reflection', trigger: reflection, start: 'top 84%', once: true}
      });
      return () => setActiveDoor(state, null);
    });
    // 字体加载后标题高度可能变化，只在本次挂载仍有效时重新测量。
    const media = state.scrollMedia;
    if (document.fonts?.status === 'loading') {
      document.fonts.ready.then(() => {
        if (state.scrollMedia === media) ScrollTrigger.refresh();
      });
    }
  }

  function stopCount() {
    const counter = mounted?.counter;
    if (!counter) return;
    cancelAnimationFrame(counter.frame);
    counter.label.textContent = `${counter.percent}%`;
    mounted.counter = null;
  }

  function countDoor(door) {
    stopCount();
    if (!door || mounted.counted.has(door)) return;
    const label = door.querySelector('[data-door-percent]');
    const percent = Number(label.dataset.doorPercent);
    if (percent <= 0) return;
    mounted.counted.add(door);
    const counter = {label, percent, frame: 0, start: null};
    mounted.counter = counter;
    label.textContent = '0%';
    // 进度条始终保留真实值，入场时只滚动显示数字。
    const step = time => {
      counter.start ??= time;
      const ratio = Math.min(1, (time - counter.start) / 560);
      label.textContent = `${Math.round(percent * (1 - (1 - ratio) ** 3))}%`;
      if (ratio < 1) counter.frame = requestAnimationFrame(step);
      else mounted.counter = null;
    };
    counter.frame = requestAnimationFrame(step);
  }

  function updateScenes() {
    frame = 0;
    if (!mounted || !motion || document.hidden) return;
    const viewport = window.innerHeight;
    const center = viewport * .52;
    const visible = [];
    let active = null;
    let distance = Infinity;

    // 先读尺寸，再集中更新样式，滚动时只移动可见画面。
    for (const door of mounted.doors) {
      const box = door.getBoundingClientRect();
      if (box.bottom <= 0 || box.top >= viewport) continue;
      const offset = (box.top + box.height * .5) - center;
      const pan = Math.max(-30, Math.min(30, -offset * .075));
      visible.push({door, pan});
      if (Math.abs(offset) < distance) {
        active = door;
        distance = Math.abs(offset);
      }
    }
    const reached = mounted.reveals.filter(scene => {
      if (scene.hasAttribute('data-reached')) return false;
      const box = scene.getBoundingClientRect();
      return box.top < viewport * .86 && box.bottom > 0;
    });
    for (const {door, pan} of visible) door.style.setProperty('--door-pan', `${pan.toFixed(2)}px`);
    for (const scene of reached) scene.setAttribute('data-reached', '');
    setActiveDoor(mounted, active);
  }

  function launchReflection(layer, question) {
    layer.replaceChildren();
    const token = document.createElement('span');
    token.className = 'reflection-flight';
    const text = document.createElement('span');
    const characters = Array.from(question);
    text.textContent = characters.slice(0, 36).join('') + (characters.length > 36 ? '…' : '');
    token.append(text);
    const sparks = Array.from({length: 9}, (_, index) => {
      const spark = document.createElement('span');
      const angle = (index / 8) * Math.PI;
      spark.className = 'reflection-spark';
      spark.style.setProperty('--spark-x', `${Math.cos(angle) * (75 + (index % 3) * 25)}px`);
      spark.style.setProperty('--spark-y', `${-30 - Math.sin(angle) * 100}px`);
      spark.style.setProperty('--spark-delay', `${340 + index * 34}ms`);
      return spark;
    });
    for (const element of [token, ...sparks]) {
      element.addEventListener('animationend', event => {
        if (event.target === element) element.remove();
      });
    }
    layer.append(token, ...sparks);
  }

  function mount(main) {
    if (mounted) stopScenes(mounted);
    mounted?.listeners.abort();
    mounted = null;
    const home = main?.querySelector('.inquiry-home');
    if (!home) return;

    const listeners = new AbortController();
    const {signal} = listeners;
    const form = home.querySelector('.reflection-form');
    const field = form.elements.question;
    const recall = home.querySelector('.reflection-recall');
    const flights = home.querySelector('.reflection-flights');
    const status = home.querySelector('.reflection-status');
    mounted = {
      home, listeners, flights, active: null, counted: new Set(), counter: null, scrollMedia: null,
      doors: [...home.querySelectorAll('[data-door]')],
      reveals: [...home.querySelectorAll('[data-home-path], [data-home-reflection]')]
    };
    if (!scrollAnimations) {
      window.addEventListener('scroll', queueSceneFrame, {passive: true, signal});
      window.addEventListener('resize', queueSceneFrame, {passive: true, signal});
      document.addEventListener('visibilitychange', queueSceneFrame, {signal});
    }
    field.addEventListener('input', () => field.setCustomValidity(''), {signal});
    form.addEventListener('submit', event => {
      event.preventDefault();
      const question = field.value.trim();
      if (!question) {
        field.setCustomValidity('请写下一个问题。 / Enter a question.');
        field.reportValidity();
        return;
      }
      // 提问仅存在当前页面，通过 textContent 写入，不会执行输入内容。
      recall.querySelector('p').textContent = question;
      recall.hidden = false;
      recall.open = false;
      field.value = '';
      status.textContent = '已留下一问，可在下方重读。 / Question captured. You can reread it below.';
      if (motion && !document.hidden) launchReflection(flights, question);
    }, {signal});
    sync(motion);
  }

  function sync(animate) {
    motion = Boolean(animate);
    if (!mounted) return;
    mounted.home.toggleAttribute('data-home-motion', motion);
    if (motion) {
      if (!mounted.scrollMedia) startScrollScenes(mounted);
      return;
    }
    stopScenes(mounted);
  }

  function stopScenes(state) {
    state.scrollMedia?.revert();
    state.scrollMedia = null;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    stopCount();
    setActiveDoor(state, null);
    for (const door of state.doors) door.style.removeProperty('--door-pan');
    state.flights.replaceChildren();
  }

  window.inquiryHome = {render, mount, sync};
})();
