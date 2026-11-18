(() => {
  'use strict';

  const key = 'inquiry-3192-test1-v1';
  const duration = 30 * 60 * 1000;
  const papers = {
    june: {
      id: 'june', zh: '六月学期原卷', en: 'June Trimester Test 1',
      source: 'Universiti Tunku Abdul Rahman · MPU3192 · June 2026 Trimester',
      ...window.INQUIRY_TEST_JUNE
    },
    october: {
      id: 'october', zh: '十月自编模拟卷', en: 'October Mock Test 1',
      source: '本站自编 · 参照六月学期考试 / Site-authored · Modeled on the June paper',
      ...window.INQUIRY_TEST_OCTOBER
    }
  };
  const levels = { basic: '基础辨识 / Basic', applied: '辨析与应用 / Applied', advanced: '综合辨析 / Advanced' };
  const types = { single: '单选 / Single best answer', combination: '组合 / Combination', reverse: '反选 / Negative stem' };
  const letter = value => 'ABCD'[value] ?? '—';
  const route = (paper, view) => `#/tests/${paper.id}/${view}`;
  const escape = value => window.inquiryEscape(value);
  const pair = text => `<div class="pair"><p class="zh" lang="zh-CN">${escape(text.zh)}</p><p class="en" lang="en">${escape(text.en)}</p></div>`;
  let attempts = {};
  let storageAvailable = true;
  let release = () => {};

  function load() {
    if (!storageAvailable) return;
    let raw;
    try {
      raw = localStorage.getItem(key);
    } catch {
      storageAvailable = false;
      return;
    }
    let saved;
    try { saved = JSON.parse(raw || '{}'); } catch { saved = {}; }
    const records = {};
    for (const id of Object.keys(papers)) {
      const a = saved?.[id];
      if (!a || !['active', 'submitted'].includes(a.status) || !Number.isFinite(a.deadline)) continue;
      const answers = {};
      for (const [number, choice] of Object.entries(a.answers || {})) {
        if (/^(?:[1-9]|1[0-9]|20)$/.test(number) && Number.isInteger(choice) && choice >= 0 && choice < 4) {
          answers[number] = choice;
        }
      }
      records[id] = { status: a.status, deadline: a.deadline, answers, submittedAt: a.submittedAt };
    }
    attempts = records;
  }

  function save() {
    if (!storageAvailable) return;
    try {
      localStorage.setItem(key, JSON.stringify(attempts));
    } catch {
      storageAvailable = false;
    }
  }

  function submitted(a, now = Date.now()) {
    a.status = 'submitted';
    a.submittedAt = Math.min(a.deadline, now);
  }

  function expire() {
    // 以绝对截止时间为准，刷新、后台节流或换页均不增加作答时间。
    const now = Date.now();
    const overdue = Object.values(attempts).filter(a => a.status === 'active' && a.deadline <= now);
    for (const a of overdue) submitted(a, now);
    if (overdue.length) save();
  }

  function score(paper, a) {
    return paper.questions.reduce((total, q, i) => total + Number(a.answers[i + 1] === q.answer), 0);
  }

  function validSubmission(a) {
    return a?.status === 'submitted' && Number.isSafeInteger(a.deadline) &&
      Number.isSafeInteger(a.submittedAt) && a.submittedAt > 0 && a.submittedAt <= a.deadline;
  }

  function exportSubmissions() {
    load();
    expire();
    return Object.fromEntries(Object.entries(attempts)
      .filter(([, a]) => validSubmission(a))
      .map(([id, a]) => [id, {...a, score: score(papers[id], a)}]));
  }

  function prepareSubmissionImport(archive) {
    // 先校验整份测验记录，等章节档案通过后再一并保存。
    if (!archive || typeof archive !== 'object' || Array.isArray(archive)) throw Error('test archive');
    const incoming = Object.entries(archive).map(([id, a]) => {
      if (!Object.hasOwn(papers, id) || !validSubmission(a) ||
          !a.answers || typeof a.answers !== 'object' || Array.isArray(a.answers)) throw Error('test attempt');
      const questions = papers[id].questions;
      const answers = Object.entries(a.answers);
      for (const [number, choice] of answers) {
        const question = questions[Number(number) - 1];
        if (!/^[1-9]\d*$/.test(number) || !question || !Number.isInteger(choice) ||
            choice < 0 || choice >= question.options.length) throw Error('test answer');
      }
      // 成绩由导入的答案重新计算，不读取文件中的分数字段。
      return [id, {status: 'submitted', deadline: a.deadline, submittedAt: a.submittedAt,
        answers: Object.fromEntries(answers)}];
    });

    load();
    const next = {...attempts};
    const now = Date.now();
    let restored = 0;
    for (const [id, a] of incoming) {
      const local = attempts[id];
      const localSubmission = local?.status === 'active' ? local.deadline : local?.submittedAt;
      // 保留当前进行中的测验，以及同卷已经更新的交卷记录。
      if ((local?.status === 'active' && local.deadline > now) || localSubmission >= a.submittedAt) continue;
      next[id] = a;
      restored++;
    }
    return {write: restored ? [key, JSON.stringify(next)] : null, restored, kept: incoming.length - restored};
  }

  function title(zh, en) {
    return `<h1 tabindex="-1">${zh}<small lang="en">${en}</small></h1>`;
  }

  function frame(content) {
    const storageNotice = storageAvailable ? '' :
      '<p role="status">浏览器无法保存测验。作答仅在本次打开期间有效。 / This browser cannot save tests. Your attempt lasts until the page is refreshed or closed.</p>';
    return `<div class="test-area">${storageNotice}${content}</div>`;
  }

  function bread() {
    return '<a class="test-back" href="#/tests">← Test 1 测验专区 / Test 1 hub</a>';
  }

  function hub() {
    return frame(`<a class="test-back" href="#/review">← 综合复习 / Review</a>
      ${title('Test 1 测验专区', 'Test 1 practice')}
      <p>独立计时练习，或直接打开双语解析。<br><span lang="en">Take a timed paper or open its bilingual review.</span></p>
      <div class="test-paper-list">${Object.values(papers).map(paper => {
        const a = attempts[paper.id];
        const button = a?.status === 'active' ? '继续作答 / Resume' : a?.status === 'submitted' ? '查看成绩 / View result' : '进入试卷 / Open paper';
        const view = a?.status === 'submitted' ? 'result' : 'paper';
        return `<section class="test-panel">
          <h2>${paper.zh}<small lang="en">${paper.en}</small></h2>
          <p class="test-source">${paper.source}</p>
          <p>20 题 · 20 分 · 30 分钟<br><span lang="en">20 questions · 20 marks · 30 minutes</span></p>
          <div class="test-actions">
            <a class="button primary" href="${route(paper, view)}">${button}</a>
            <a class="button" href="${route(paper, 'answers')}">答案与解析 / Answers &amp; explanations</a>
          </div>
        </section>`;
      }).join('')}</div>`);
  }

  function preflight(paper) {
    return frame(`${bread()}${title(paper.zh, paper.en)}
      <p class="test-source">${paper.source}</p>
      <div class="test-panel test-intro">
        ${pair({
          zh: '20 道英文单选题，每题 1 分，限时 30 分钟。点击开始后，刷新或离开页面都不会暂停计时。按时交卷或等待自动交卷。',
          en: 'Answer 20 multiple-choice questions for one mark each in 30 minutes. Once you start, reloading or leaving the page will not pause the timer. Submit when ready or let the test submit at time up.'
        })}
        <button class="button primary" type="button" data-test-action="start">开始计时 / Start test</button>
      </div>`);
  }

  function statements(q) {
    if (!q.statements?.length) return '';
    return `<ol class="test-statements" type="I" lang="en">${q.statements.map(item => `<li>${escape(item)}</li>`).join('')}</ol>`;
  }

  function optionLabel(option, i) {
    return `<span class="test-letter" aria-hidden="true">${letter(i)}</span><span lang="en"><span class="sr-only">${letter(i)}. </span>${escape(option)}</span>`;
  }

  function question(q, index, a) {
    const number = index + 1;
    return `<fieldset class="test-question test-panel" id="test-q${number}" data-test-card="${number}" tabindex="-1">
      <legend><span class="test-question-number">Q${number}</span> <span lang="en">${escape(q.stem)}</span></legend>
      ${statements(q)}
      <div class="test-options">${q.options.map((option, i) => `<label class="test-option">
        <input type="radio" name="q${number}" data-test-answer="${number}" value="${i}" ${a.answers[number] === i ? 'checked' : ''}>
        ${optionLabel(option, i)}
      </label>`).join('')}</div>
    </fieldset>`;
  }

  function clock(deadline) {
    const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    return [Math.floor(seconds / 60), seconds % 60].map(n => String(n).padStart(2, '0')).join(':');
  }

  function navLabel(number, answered) {
    return `第 ${number} 题，${answered ? '已答' : '未答'} / Q${number}, ${answered ? 'answered' : 'unanswered'}`;
  }

  function paperMarkup(paper, a) {
    return frame(`${bread()}${title(paper.zh, paper.en)}
      <div class="test-paper-layout">
        <aside class="test-controls test-panel" aria-label="作答进度 / Test progress">
          <div class="test-controls-top">
            <div><span class="test-time-label">剩余时间 / Time left</span><strong class="test-timer" role="timer" data-test-timer>${clock(a.deadline)}</strong></div>
            <p data-test-count>已答 ${Object.keys(a.answers).length}/20 / Answered</p>
          </div>
          <nav class="test-grid" aria-label="题号导航 / Question navigation">${paper.questions.map((_, index) => {
            const number = index + 1;
            const answered = Number.isInteger(a.answers[number]);
            return `<button type="button" data-test-action="question" data-number="${number}" aria-label="${navLabel(number, answered)}" class="${answered ? 'answered' : ''}">${number}</button>`;
          }).join('')}</nav>
          <button class="button primary" type="button" data-test-action="submit">交卷 / Submit test</button>
        </aside>
        <div class="test-questions">${paper.questions.map((q, i) => question(q, i, a)).join('')}</div>
      </div>
      ${confirmDialog()}`);
  }

  function confirmDialog() {
    return `<dialog class="info-dialog test-confirm" data-test-dialog aria-labelledby="test-confirm-title" aria-describedby="test-confirm-message">
      <h2 id="test-confirm-title"></h2><p id="test-confirm-message"></p>
      <div class="test-actions">
        <form method="dialog"><button class="button" autofocus>取消 / Cancel</button></form>
        <button class="button primary" type="button" data-test-action="confirm"></button>
      </div>
    </dialog>`;
  }

  function result(paper, a) {
    if (!a || a.status !== 'submitted') return frame(`${bread()}${title('测验尚未交卷', 'Test not submitted')}
      <a class="button primary" href="${route(paper, 'paper')}">${a ? '继续作答 / Resume' : '进入试卷 / Open paper'}</a>`);
    const unanswered = 20 - Object.keys(a.answers).length;
    const timedOut = a.submittedAt === a.deadline;
    return frame(`${bread()}${title(paper.zh + '成绩', paper.en + ' result')}
      <div class="test-panel test-result">
        <p>${timedOut ? '时间到，已自动交卷 / Time is up. Test submitted.' : '已交卷 / Test submitted'}</p>
        <p class="test-score"><strong data-test-score>${score(paper, a)}/20</strong> 分 / marks</p>
        <p>未答 ${unanswered} 题 / ${unanswered} unanswered</p>
        <div class="test-actions">
          <a class="button primary" href="${route(paper, 'answers')}">答案与解析 / Answers &amp; explanations</a>
          <button class="button" type="button" data-test-action="retry">重新作答 / Retake</button>
        </div>
      </div>${confirmDialog()}`);
  }

  function answers(paper, a) {
    const graded = a?.status === 'submitted';
    const explanation = (q, i) => {
      const selected = graded ? a.answers[i + 1] : undefined;
      const selection = !graded ? '' : Number.isInteger(selected)
        ? `你的答案 / Your answer · ${letter(selected)}`
        : '未答 / Unanswered';
      const refs = q.references.map(({chapter, page}) =>
        `<a href="#/chapter/${chapter}/slides/${page}">第 ${chapter} 章第 ${page} 页 / Ch. ${chapter}, p. ${page}</a>`).join(' · ');
      return `<details class="test-panel test-explanation" id="test-exp-${i + 1}" data-test-explanation="${i + 1}">
        <summary><strong>Q${i + 1} · ${escape(q.topic.zh)} / <span lang="en">${escape(q.topic.en)}</span></strong>
          <span class="test-answer-marker">答案 / Answer · ${letter(q.answer)}</span>
        </summary>
        <div class="test-explanation-body">
          <p class="test-meta">${types[q.type]} · ${levels[q.difficulty]}${selection ? ' · ' + selection : ''}</p>
          <p class="test-stem" lang="en">${escape(q.stem)}</p>${statements(q)}
          <ol class="test-review-options" type="A" lang="en">${q.options.map((option, ix) => `<li${ix === q.answer ? ' class="correct"' : ''}>${escape(option)}</li>`).join('')}</ol>
          ${pair(q.explanation)}
          ${q.distinction ? `<aside class="test-distinction"><h3>原卷与课件辨析 / Paper and slide wording</h3>${pair(q.distinction)}</aside>` : ''}
          <p class="test-refs">课件 / Slides · ${refs}</p>
        </div>
      </details>`;
    };
    return frame(`${bread()}${title(paper.zh + '解析', paper.en + ' explanations')}
      <p class="test-source">${paper.source}</p>
      <a class="button" href="${route(paper, graded ? 'result' : 'paper')}">${graded ? '返回成绩 / Back to result' : '进入试卷 / Open paper'}</a>
      ${paper.style?.length ? `<section class="test-panel test-style"><h2>六月卷出题分析<small lang="en">June paper analysis</small></h2>
        ${paper.style.map(pair).join('')}</section>` : ''}
      <nav class="test-grid test-grid-review" aria-label="按题号查看解析 / Review by question">${paper.questions.map((q, i) =>
        `<button type="button" data-test-action="question" data-number="${i + 1}" aria-label="第 ${i + 1} 题解析 / Q${i + 1} explanation">${i + 1}<small>${letter(q.answer)}</small></button>`).join('')}</nav>
      <div class="test-review-list">${paper.questions.map(explanation).join('')}</div>`);
  }

  function render(id, view) {
    load();
    expire();
    const paper = Object.hasOwn(papers, id) && papers[id];
    if (!paper?.questions?.length) return hub();
    const a = attempts[id];
    if (view === 'answers') return answers(paper, a);
    if (view === 'result' || a?.status === 'submitted') return result(paper, a);
    return a ? paperMarkup(paper, a) : preflight(paper);
  }

  function mount(main, current, rerender) {
    release();
    if (current.type !== 'tests') return;
    const id = current.paperId;
    const view = current.testView;
    const paper = Object.hasOwn(papers, id) && papers[id];
    const controller = new AbortController();
    const {signal} = controller;
    let ticker;
    release = () => {
      controller.abort();
      clearInterval(ticker);
    };
    const go = next => {
      const hash = route(paper, next);
      if (location.hash === hash) rerender();
      else location.hash = hash;
    };
    const showTimer = () => {
      expire();
      const timer = main.querySelector('[data-test-timer]');
      const a = attempts[id];
      if (!timer || !a) return;
      if (a.status === 'submitted') {
        clearInterval(ticker);
        go('result');
      } else timer.textContent = clock(a.deadline);
    };
    const refreshCounts = () => {
      const a = attempts[id];
      main.querySelector('[data-test-count]').textContent = `已答 ${Object.keys(a.answers).length}/20 / Answered`;
      for (const b of main.querySelectorAll('.test-controls [data-number]')) {
        const n = Number(b.dataset.number);
        const answered = Number.isInteger(a.answers[n]);
        b.classList.toggle('answered', answered);
        b.setAttribute('aria-label', navLabel(n, answered));
      }
    };

    const start = () => {
      attempts[id] = {status: 'active', deadline: Date.now() + duration, answers: {}};
      save();
      go('paper');
    };

    function ask(retry) {
      const dialog = main.querySelector('[data-test-dialog]');
      const remaining = 20 - Object.keys(attempts[id].answers).length;
      dialog.querySelector('h2').textContent = retry ? '重新作答 / Retake' : '确认交卷 / Confirm submission';
      dialog.querySelector('p').textContent = retry
        ? '开始新一轮会替换这套卷的上次作答记录。 / Starting again replaces this paper’s last attempt.'
        : `还有 ${remaining} 题未答。交卷后将结束本次计时。 / ${remaining} unanswered. Submitting ends this attempt.`;
      const confirm = dialog.querySelector('button.primary');
      confirm.dataset.testAction = retry ? 'retry-confirm' : 'confirm';
      confirm.textContent = retry ? '开始新一轮 / Start a new attempt' : '确认交卷 / Submit';
      dialog.showModal();
    }

    if (paper) {
      main.addEventListener('click', event => {
        const button = event.target.closest('[data-test-action]');
        if (!button) return;
        load();
        expire();
        const a = attempts[id];
        switch (button.dataset.testAction) {
          case 'start':
            if (!a) start(); else rerender();
            break;
          case 'question': {
            const n = button.dataset.number;
            const item = document.getElementById(view === 'answers' ? `test-exp-${n}` : `test-q${n}`);
            if (!item) break;
            if (item.tagName === 'DETAILS') item.open = true;
            (item.querySelector('summary') || item).focus({preventScroll: true});
            item.scrollIntoView({block: 'start'});
            break;
          }
          case 'submit':
            if (a?.status === 'active') ask(false); else go('result');
            break;
          case 'confirm':
            if (a?.status === 'active') { submitted(a); save(); }
            go('result');
            break;
          case 'retry':
            if (a?.status === 'submitted') ask(true);
            break;
          case 'retry-confirm':
            if (a?.status === 'submitted') start();
            break;
        }
      }, {signal});

      main.addEventListener('change', event => {
        if (!event.target.matches('[data-test-answer]')) return;
        load();
        expire();
        const a = attempts[id];
        if (!a || a.status !== 'active') { go('result'); return; }
        // 作答只修改本套的记录，评分和原有章节题库互不干扰。
        a.answers[event.target.dataset.testAnswer] = Number(event.target.value);
        save();
        refreshCounts();
      }, {signal});
    }

    if (main.querySelector('[data-test-timer]')) {
      ticker = setInterval(showTimer, 250);
      document.addEventListener('visibilitychange', showTimer, {signal});
      window.addEventListener('pageshow', showTimer, {signal});
    }
    window.addEventListener('storage', event => {
      if (event.key === key) rerender();
    }, {signal});
    // 答题交互全部在当前正文中，换页时释放计时器和事件。
    main.querySelector('.test-area > h1')?.focus({preventScroll: true});
  }

  window.inquiryTests = {render, mount, exportSubmissions, prepareSubmissionImport};
})();
