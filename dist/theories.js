(() => {
  'use strict';

  const items = [...window.INQUIRY_THEORIES.items].sort((a, b) => a.chapters[0] - b.chapters[0]);
  const byId = new Map(items.map(item => [item.id, item]));
  const chapters = Object.values(window.COURSE_CHAPTERS);
  const kinds = {
    theory: {zh: '理论与立场', en: 'Theories and positions'},
    tradition: {zh: '思想传统', en: 'Traditions'},
    method: {zh: '推理与方法', en: 'Methods'},
    framework: {zh: '概念框架', en: 'Frameworks'},
    branch: {zh: '哲学分支', en: 'Branches'}
  };
  const escape = value => window.inquiryEscape(value);
  const normalize = text => text.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase();
  // 预先整理检索文本，每次输入只切换条目的可见状态，保留输入法和键盘焦点。
  const searchIndex = new Map(items.map(item => [
    item.id,
    normalize([item.name.zh, item.name.en, item.intro.zh, item.intro.en, ...(item.aliases ?? [])].join(' '))
  ]));
  const pair = ({zh, en}) => `<div class="pair theory-pair"><p lang="zh-CN">${escape(zh)}</p><p class="en" lang="en">${escape(en)}</p></div>`;
  const title = ({zh, en}) => `${escape(zh)}<small lang="en">${escape(en)}</small>`;
  const label = ({zh, en}) => `${escape(zh)} / ${escape(en)}`;
  const route = id => `#/theories/${id}`;

  function chapterFilter(id) {
    return /^chapter-[1-8]$/.test(id) ? id.slice(-1) : '';
  }

  function contents(item, level) {
    const heading = `h${level}`;
    return `<div class="theory-contents">
      <section class="theory-explanation">
        <${heading}>${title({zh: '理论解析', en: 'How it works'})}</${heading}>
        ${pair(item.explanation)}
      </section>
      <section>
        <${heading}>${title({zh: '例子与辨析', en: 'Worked examples'})}</${heading}>
        <div class="theory-examples">${item.examples.map(example =>
          `<article><h${level + 1}>${title(example.title)}</h${level + 1}>${pair(example)}</article>`).join('')}</div>
        <aside class="theory-clarification">${pair(item.misconception)}</aside>
      </section>
      <section class="theory-references">
        <${heading}>${title({zh: '回看课件', en: 'Read the slides'})}</${heading}>
        <ul>${item.references.map(({chapter, page}) =>
          `<li><a href="#/chapter/${chapter}/slides/${page}">第 ${chapter} 章第 ${page} 页 / Ch. ${chapter}, p. ${page}</a></li>`).join('')}
          ${(item.externalReferences || []).map(ref =>
            `<li><a href="${escape(ref.url)}" rel="noopener noreferrer" target="_blank">${escape(ref.title)}</a></li>`).join('')}</ul>
      </section>
      ${item.related.length ? `<section class="theory-related">
        <${heading}>${title({zh: '关联条目', en: 'Related reading'})}</${heading}>
        <ul>${item.related.map(id => `<li><a href="${route(id)}">${label(byId.get(id).name)}</a></li>`).join('')}</ul>
      </section>` : ''}
    </div>`;
  }

  function listItem(item) {
    return `<details class="theory-item" data-theory-id="${item.id}">
      <summary>
        <strong>${title(item.name)}</strong><span class="theory-item-kind">${label(kinds[item.kind])}</span>
      </summary>
      <div class="theory-item-body"></div>
    </details>`;
  }

  function options(values, active) {
    return values.map(([value, name]) => `<option value="${value}"${value === active ? ' selected' : ''}>${label(name)}</option>`).join('');
  }

  function chapterName(chapter) {
    return {zh: `第 ${chapter.id} 章 · ${chapter.title.zh}`, en: chapter.title.en};
  }

  function render(id) {
    const item = byId.get(id);
    if (item) {
      return `<div class="theory-page theory-article">
        <a class="theory-text-link" href="#/theories">← 理论目录 / Theory index</a>
        <header class="theory-intro"><p class="theory-item-kind">${label(kinds[item.kind])}</p>
          <h1 tabindex="-1">${title(item.name)}</h1>${pair(item.intro)}</header>${contents(item, 2)}
      </div>`;
    }
    const chapter = chapterFilter(id);
    return `<div class="theory-page">
      <header class="theory-intro">
        <h1 tabindex="-1">哲学理论入门<small lang="en">Philosophy explained</small></h1>
        ${pair({zh: '从八章课件的主要理论和思想传统入手。展开任一条目，读懂它在问什么，再用两个例子试着分辨。', en: 'Start with the major ideas and traditions from the eight chapters. Open an entry to see the question it addresses, then work through two examples.'})}
      </header>
      <section aria-labelledby="theory-index-title">
        <h2 id="theory-index-title">理论目录 <small lang="en">Theory index</small></h2>
        <div class="theory-controls">
          <label>搜索理论 <span lang="en">Search ideas</span>
            <input type="search" data-theory-search autocomplete="off" placeholder="例如：归纳、empiricism / e.g. induction"></label>
          <label>所属章节 <span lang="en">Chapter</span>
            <select data-theory-chapter><option value="">全部章节 / All chapters</option>
              ${options(chapters.map(ch => [String(ch.id), chapterName(ch)]), chapter)}
            </select></label>
          <label>条目类型 <span lang="en">Type</span>
            <select data-theory-kind><option value="">全部类型 / All types</option>${options(Object.entries(kinds), '')}</select></label>
        </div>
        <p class="theory-count" role="status" data-theory-count></p>
        <p class="theory-empty" data-theory-empty hidden>未找到相关条目，试试缩短关键词或调整筛选。<br><span lang="en">No entries match. Try a shorter term or change the filters.</span> <button class="button" type="button" data-theory-reset>清除筛选 / Clear filters</button></p>
        <div class="theory-list">${items.map(listItem).join('')}</div>
      </section>
    </div>`;
  }

  function mount(main) {
    main.querySelector('.theory-page h1')?.focus({preventScroll: true});
    const search = main.querySelector('[data-theory-search]');
    if (!search) return () => {};

    const controller = new AbortController();
    const {signal} = controller;
    const chapter = main.querySelector('[data-theory-chapter]');
    const kind = main.querySelector('[data-theory-kind]');
    const rows = Array.from(main.querySelectorAll('[data-theory-id]'));
    const count = main.querySelector('[data-theory-count]');
    const empty = main.querySelector('[data-theory-empty]');
    let composing = false;
    let priorCount = -1;

    function update() {
      const words = normalize(search.value).trim().split(/\s+/).filter(Boolean);
      let visible = 0;
      for (const row of rows) {
        const id = row.dataset.theoryId;
        const item = byId.get(id);
        const matches = (!chapter.value || item.chapters.includes(Number(chapter.value))) &&
          (!kind.value || kind.value === item.kind) && words.every(word => searchIndex.get(id).includes(word));
        row.hidden = !matches;
        if (matches) visible++;
      }
      if (visible !== priorCount) count.textContent = `显示 ${visible} / ${items.length} 个条目 · ${visible} of ${items.length} entries`;
      priorCount = visible;
      empty.hidden = visible !== 0;
    }

    search.addEventListener('compositionstart', () => { composing = true; }, {signal});
    search.addEventListener('compositionend', () => { composing = false; update(); }, {signal});
    search.addEventListener('input', event => { if (!composing && !event.isComposing) update(); }, {signal});
    chapter.addEventListener('change', update, {signal});
    kind.addEventListener('change', update, {signal});
    // 首次展开才填入案例，章节筛选列表和首屏无需创建上百个案例节点。
    main.querySelector('.theory-list').addEventListener('toggle', event => {
      const row = event.target;
      const item = byId.get(row.dataset.theoryId);
      if (!row.open || !item) return;
      const body = row.querySelector('.theory-item-body');
      if (body.firstElementChild) return;
      body.innerHTML = `${pair(item.intro)}${contents(item, 3)}
        <a class="theory-text-link" href="${route(item.id)}">单独打开本条 / Open this entry</a>`;
    }, {capture: true, signal});
    main.querySelector('[data-theory-reset]').addEventListener('click', () => {
      search.value = '';
      chapter.value = '';
      kind.value = '';
      update();
      search.focus();
    }, {signal});
    update();
    return () => controller.abort();
  }

  window.inquiryTheories = {render, mount};
})();
