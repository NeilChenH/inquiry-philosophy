(() => {
  'use strict';

  // 纸卷复盘独立保存，避免重新计时练习替换考试当天的作答记录。
  const storageKey = 'inquiry-3192-paper-reviews-v1';
  let papers = {};
  let canSave = true;
  const escape = text => window.inquiryEscape(String(text ?? ''));
  const label = (question, choice) => question.optionLabels?.[choice] || 'ABCD'[choice];
  const hasAnswer = (record, number) => Object.hasOwn(record.answers, number) &&
    !(record.answers[number] === null && record.uncertain.includes(number));
  const isScored = question => Number.isInteger(question.answer);
  const clone = value => JSON.parse(JSON.stringify(value));
  const link = (paper, view) => `#/tests/${paper.id}/${view}`;
  const pair = text => `<div class="pair"><p lang="zh-CN">${escape(text.zh)}</p><p class="en" lang="en">${escape(text.en)}</p></div>`;

  function configure(availablePapers) {
    papers = Object.fromEntries(Object.entries(availablePapers).filter(([, paper]) => paper.referenceKey));
  }

  function emptyRecord() {
    return {answers: {}, confirmed: [], uncertain: [], status: 'draft', updatedAt: 0};
  }

  function validNumbers(numbers, paper) {
    return Array.isArray(numbers) && new Set(numbers).size === numbers.length &&
      numbers.every(number => Number.isInteger(number) && number >= 1 && number <= paper.questions.length);
  }

  function validateRecord(value, paper) {
    if (!value || typeof value !== 'object' || Array.isArray(value) ||
        !value.answers || typeof value.answers !== 'object' || Array.isArray(value.answers) ||
        !validNumbers(value.confirmed, paper) || !validNumbers(value.uncertain || [], paper) ||
        !Number.isSafeInteger(value.updatedAt) || value.updatedAt <= 0 ||
        !['draft', 'reviewed'].includes(value.status)) throw Error('paper review format');
    const answers = {};
    for (const [number, choice] of Object.entries(value.answers)) {
      const question = paper.questions[Number(number) - 1];
      if (!/^[1-9]\d*$/.test(number) || !question ||
          (choice !== null && (!Number.isInteger(choice) || choice < 0 || choice >= question.options.length))) {
        throw Error('paper review answer');
      }
      answers[number] = choice;
    }
    if (value.confirmed.some(number => !Object.hasOwn(answers, number) ||
        (answers[number] === null && (value.uncertain || []).includes(number)))) throw Error('unselected confirmation');
    if (value.status === 'reviewed' && value.confirmed.length !== paper.questions.length) throw Error('incomplete review');
    return {
      answers,
      confirmed: [...value.confirmed],
      uncertain: [...(value.uncertain || [])],
      status: value.status,
      updatedAt: value.updatedAt
    };
  }

  function validateRecords(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('paper reviews');
    return Object.fromEntries(Object.entries(value).map(([id, record]) => {
      if (!Object.hasOwn(papers, id)) throw Error('unknown review paper');
      return [id, validateRecord(record, papers[id])];
    }));
  }

  function load() {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? validateRecords(JSON.parse(raw)) : {};
    } catch {
      canSave = false;
      return {};
    }
  }

  function getRecord(paper) {
    return load()[paper.id] || emptyRecord();
  }

  function saveRecord(paper, record) {
    // 每次写入前重新读取其他试卷，保留另一个页面刚保存的复盘。
    const saved = load();
    if (!canSave) throw Error('paper review storage');
    record.updatedAt = Math.max(Date.now(), (saved[paper.id]?.updatedAt || 0) + 1);
    saved[paper.id] = validateRecord(record, paper);
    localStorage.setItem(storageKey, JSON.stringify(saved));
  }

  function exportRecords() {
    return clone(load());
  }

  function prepareImport(value) {
    // 先完整校验，再由外层学习档案统一提交，避免半份档案落盘。
    const incoming = validateRecords(value);
    const saved = load();
    if (!canSave) throw Error('paper review storage');
    let restored = 0;
    for (const [id, record] of Object.entries(incoming)) {
      if (saved[id] && saved[id].updatedAt >= record.updatedAt) continue;
      saved[id] = record;
      restored++;
    }
    return {
      write: restored ? [storageKey, JSON.stringify(saved)] : null,
      restored,
      kept: Object.keys(incoming).length - restored
    };
  }

  async function importFile(file) {
    if (!file || file.size > 2000000) throw Error('paper review file');
    const data = JSON.parse(await file.text());
    if (data?.app !== 'inquiry-paper-review' || data.version !== 1 || !Object.hasOwn(papers, data.paperId)) {
      throw Error('paper review file format');
    }
    const record = validateRecord({
      answers: data.answers,
      confirmed: data.confirmed,
      uncertain: data.uncertain || [],
      status: data.status || 'draft',
      updatedAt: data.updatedAt ?? Date.now()
    }, papers[data.paperId]);
    const result = prepareImport({[data.paperId]: record});
    if (result.write) localStorage.setItem(...result.write);
    return {...result, paperId: data.paperId};
  }

  function statusText(record, number) {
    if (record.confirmed.includes(number)) return '已确认 / Confirmed';
    return record.uncertain.includes(number) ? '涂改待确认 / Handwriting to confirm' : '待确认 / To confirm';
  }

  function references(question) {
    return question.references.map(ref => `<a href="#/chapter/${ref.chapter}/slides/${ref.page}">第 ${ref.chapter} 章第 ${ref.page} 页 / Ch. ${ref.chapter}, p. ${ref.page}</a>`).join(' · ');
  }

  function summary(paper, record) {
    if (record.status !== 'reviewed') {
      return `<section class="test-panel paper-review-pending"><h2>确认后查看个人复盘<small lang="en">Confirm your answers to review</small></h2><p>每题确认一个选择，或明确标为未作答，再生成参考成绩。<br><span lang="en">Confirm a choice or mark each question unanswered, then generate your reference result.</span></p></section>`;
    }
    const scored = paper.questions.filter(isScored);
    const correct = paper.questions.filter((question, i) => isScored(question) && record.answers[i + 1] === question.answer).length;
    const unanswered = paper.questions.filter((_, i) => record.answers[i + 1] === null).length;
    const mistakes = paper.questions.map((question, i) => ({question, number: i + 1}))
      .filter(({question, number}) => isScored(question) && record.answers[number] !== question.answer);
    const chapters = [...new Set(scored.map(question => question.references[0].chapter))];
    return `<section class="test-panel paper-review-result" aria-labelledby="paper-review-result-title">
      <h2 id="paper-review-result-title" tabindex="-1">个人纸卷复盘<small lang="en">Your paper review</small></h2>
      <p class="test-score"><strong data-paper-review-score>${correct}/${scored.length}</strong> 参考分 / reference marks</p>
      <p>未作答 ${unanswered} 题 · 争议题 ${paper.questions.length - scored.length} 题暂不计分。<br><span lang="en">${unanswered} unanswered. ${paper.questions.length - scored.length} disputed question(s) are excluded.</span></p>
      <p>按本站参考答案计算，可结合逐题解析回看。<br><span lang="en">Calculated from the site's reference answers. Review the explanations alongside your selections.</span></p>
      <h3>知识点分布 / Topic breakdown</h3>
      <div class="paper-review-chapters">${chapters.map(chapter => {
        const numbers = paper.questions.map((question, i) => ({question, number: i + 1}))
          .filter(({question}) => isScored(question) && question.references[0].chapter === chapter);
        const right = numbers.filter(({question, number}) => record.answers[number] === question.answer).length;
        return `<a href="#/chapter/${chapter}"><span>第 ${chapter} 章 / Chapter ${chapter}</span><strong>${right}/${numbers.length}</strong><progress value="${right}" max="${numbers.length}" aria-label="第 ${chapter} 章正确题数 / Chapter ${chapter} correct"></progress></a>`;
      }).join('')}</div>
      <h3>回看题目 / Questions to revisit</h3>
      ${mistakes.length ? `<ol class="paper-review-mistakes">${mistakes.map(({question, number}) => `<li><button type="button" class="test-back" data-paper-review-action="question" data-number="${number}">Q${number} · ${escape(question.topic.zh)} / ${escape(question.topic.en)}</button><p>你的选择 / Your choice · ${record.answers[number] === null ? '未答 / Unanswered' : label(question, record.answers[number])} · 参考答案 / Reference · ${label(question, question.answer)}</p><div class="pair"><p lang="zh-CN">${escape(question.explanation.zh)}</p><p lang="en" class="en">${escape(question.explanation.en)}</p></div><p class="test-refs">${references(question)}</p></li>`).join('')}</ol>` : '<p>已确认作答与全部可计分题的参考答案一致。<br><span lang="en">Your confirmed answers match every scored reference answer.</span></p>'}
      ${paper.questions.some(question => !isScored(question)) ? `<aside class="test-distinction"><h3>争议题回看 / Disputed questions</h3>${paper.questions.map((question, i) => !isScored(question) ? `<p><button class="test-back" type="button" data-paper-review-action="question" data-number="${i + 1}">Q${i + 1} · ${escape(question.topic.zh)} / ${escape(question.topic.en)}</button></p>${pair(question.distinction || question.explanation)}<p class="test-refs">${references(question)}</p>` : '').join('')}</aside>` : ''}
    </section>`;
  }

  function questionMarkup(paper, question, index, record) {
    const number = index + 1;
    const selected = hasAnswer(record, number) ? record.answers[number] : undefined;
    const confirmed = record.confirmed.includes(number);
    const title = `Q${number} · ${question.topic.zh} / ${question.topic.en}`;
    return `<details class="test-panel paper-review-question${confirmed ? ' is-confirmed' : ''}" id="paper-review-q${number}" data-paper-review-card="${number}"${number === 1 ? ' open' : ''}>
      <summary><strong>${escape(title)}</strong><span data-paper-review-status="${number}">${statusText(record, number)}</span></summary>
      <div class="paper-review-question-body"><fieldset><legend><span lang="en">${escape(question.stem)}</span></legend>
      ${question.statements?.length ? `<ol class="test-statements" type="I" lang="en">${question.statements.map(statement => `<li>${escape(statement)}</li>`).join('')}</ol>` : ''}
      <div class="test-options">${question.options.map((option, choice) => `<label class="test-option"><input type="radio" name="paper-review-q${number}" data-paper-review-choice="${number}" value="${choice}"${selected === choice ? ' checked' : ''}><span class="test-letter">${label(question, choice)}.</span><span lang="en">${escape(option)}</span></label>`).join('')}
      <label class="test-option paper-review-unanswered"><input type="radio" name="paper-review-q${number}" data-paper-review-choice="${number}" value="unanswered"${hasAnswer(record, number) && selected === null ? ' checked' : ''}><span aria-hidden="true">—</span><span>当时未作答 / I left this unanswered</span></label></div></fieldset>
      ${question.translation ? `<details class="paper-review-translation"><summary>展开中文对照 / Chinese translation</summary><div lang="zh-CN"><p>${escape(question.translation.stem)}</p>${question.translation.statements?.length ? `<ol type="I">${question.translation.statements.map(statement => `<li>${escape(statement)}</li>`).join('')}</ol>` : ''}<ol class="paper-review-translated-options">${question.translation.options.map((option, choice) => `<li><strong>${label(question, choice)}.</strong> ${escape(option)}</li>`).join('')}</ol></div></details>` : ''}
      <button class="button" type="button" data-paper-review-action="confirm" data-number="${number}"${!hasAnswer(record, number) || confirmed ? ' disabled' : ''}>${confirmed ? '已确认 / Confirmed' : '确认本题作答 / Confirm this answer'}</button>
      ${!isScored(question) ? '<p class="paper-review-note">本题存在争议，暂不计分。 / This question is disputed and currently excluded from scoring.</p>' : ''}
      </div></details>`;
  }

  function render(paper) {
    const record = getRecord(paper);
    return `<div class="test-area paper-review-area"><a class="test-back" href="#/tests">← Test 1 测验专区 / Test 1 hub</a>
      <h1 tabindex="-1">纸卷作答复盘<small lang="en">Paper answer review</small></h1>
      <p>${escape(paper.zh)} / <span lang="en">${escape(paper.en)}</span></p>
      <p>导入个人作答草稿，或按纸卷重新录入。复盘记录保存在当前浏览器，可通过学习档案转移。<br><span lang="en">Import your answer draft or enter choices from your paper. Review records stay in this browser and can be transferred through Progress.</span></p>
      <div class="test-actions paper-review-actions"><button class="button" data-paper-review-action="import" type="button">导入作答草稿 / Import answer draft</button><a class="button" href="#/progress">学习档案 / Progress</a><a class="button" href="${link(paper, 'answers')}">双语参考解析 / Reference explanations</a></div>
      <input type="file" accept="application/json,.json" data-paper-review-file hidden>
      <p class="paper-review-message" role="status" aria-live="polite" data-paper-review-message>${canSave ? '' : '浏览器暂时无法读取或保存复盘记录。 / This browser cannot currently read or save review records.'}</p>
      <section class="test-panel paper-review-controls"><div class="paper-review-count"><strong data-paper-review-count>已确认 ${record.confirmed.length}/${paper.questions.length} / Confirmed</strong><button class="button primary" type="button" data-paper-review-action="generate">生成个人复盘 / Review confirmed answers</button></div>
        <nav class="test-grid test-grid-review" aria-label="纸卷题号 / Paper question navigation">${paper.questions.map((_, i) => `<button class="${record.confirmed.includes(i + 1) ? 'answered' : ''}" data-paper-review-action="question" data-number="${i + 1}" type="button" aria-label="第 ${i + 1} 题，${statusText(record, i + 1)}">${i + 1}</button>`).join('')}</nav></section>
      <div data-paper-review-summary>${summary(paper, record)}</div>
      <div class="test-review-list">${paper.questions.map((question, i) => questionMarkup(paper, question, i, record)).join('')}</div>
    </div>`;
  }

  function mount(paper, view, main, rerender) {
    const controller = new AbortController();
    const {signal} = controller;
    const message = text => {
      const node = main.querySelector('[data-paper-review-message]');
      if (node) node.textContent = text;
    };
    const refresh = record => {
      main.querySelector('[data-paper-review-count]').textContent = `已确认 ${record.confirmed.length}/${paper.questions.length} / Confirmed`;
      main.querySelector('[data-paper-review-summary]').innerHTML = summary(paper, record);
      for (let number = 1; number <= paper.questions.length; number++) {
        const confirmed = record.confirmed.includes(number);
        const card = main.querySelector(`[data-paper-review-card="${number}"]`);
        card.classList.toggle('is-confirmed', confirmed);
        card.querySelector('[data-paper-review-status]').textContent = statusText(record, number);
        const confirm = card.querySelector('[data-paper-review-action="confirm"]');
        confirm.disabled = confirmed || !hasAnswer(record, number);
        confirm.textContent = confirmed ? '已确认 / Confirmed' : '确认本题作答 / Confirm this answer';
        const nav = main.querySelector(`.paper-review-controls [data-number="${number}"]`);
        nav.classList.toggle('answered', confirmed);
        nav.setAttribute('aria-label', `第 ${number} 题，${statusText(record, number)}`);
      }
    };
    const focusQuestion = number => {
      const details = main.querySelector(`#paper-review-q${number}`);
      if (!details) return;
      details.open = true;
      details.querySelector('summary').focus({preventScroll: true});
      details.scrollIntoView({block: 'start'});
    };
    main.addEventListener('change', async event => {
      const target = event.target;
      if (target.matches('[data-paper-review-file]')) {
        const file = target.files[0];
        if (!file) return;
        try {
          const result = await importFile(file);
          if (rerender) rerender();
          else main.innerHTML = render(paper);
          message(result.restored ? '个人作答草稿已导入，请逐题确认。 / Answer draft imported. Confirm each answer.' : '已保留浏览器中较新的复盘记录。 / The newer browser record was kept.');
        } catch {
          message('草稿格式不正确或浏览器无法保存，请检查文件后重试。 / Invalid draft or unavailable browser storage. Check the file and try again.');
        }
        target.value = '';
        return;
      }
      if (!target.matches('[data-paper-review-choice]')) return;
      const number = Number(target.dataset.paperReviewChoice);
      const record = getRecord(paper);
      record.answers[number] = target.value === 'unanswered' ? null : Number(target.value);
      record.confirmed = record.confirmed.filter(value => value !== number);
      record.uncertain = record.uncertain.filter(value => value !== number);
      record.status = 'draft';
      try {
        saveRecord(paper, record);
        refresh(record);
        message('选择已保存，请确认本题作答。 / Choice saved. Confirm this answer.');
      } catch {
        message('浏览器无法保存本次选择，请稍后重试。 / This browser could not save your choice. Try again.');
      }
    }, {signal});
    main.addEventListener('click', event => {
      const button = event.target.closest('[data-paper-review-action]');
      if (!button) return;
      const action = button.dataset.paperReviewAction;
      const number = Number(button.dataset.number);
      if (action === 'import') {
        main.querySelector('[data-paper-review-file]').click();
        return;
      }
      if (action === 'question') {
        focusQuestion(number);
        return;
      }
      const record = getRecord(paper);
      if (action === 'confirm') {
        if (!hasAnswer(record, number) || record.confirmed.includes(number)) return;
        record.confirmed.push(number);
        record.uncertain = record.uncertain.filter(value => value !== number);
        record.status = 'draft';
      } else if (action === 'generate') {
        const next = paper.questions.findIndex((_, i) => !record.confirmed.includes(i + 1));
        if (next >= 0) {
          message(`请先确认第 ${next + 1} 题。 / Confirm Q${next + 1} first.`);
          focusQuestion(next + 1);
          return;
        }
        record.status = 'reviewed';
      } else return;
      try {
        saveRecord(paper, record);
        refresh(record);
        message(action === 'confirm' ? `第 ${number} 题已确认。 / Q${number} confirmed.` : '个人参考复盘已生成。 / Your reference review is ready.');
        if (action === 'generate') {
          const title = main.querySelector('#paper-review-result-title');
          title.focus({preventScroll: true});
          title.scrollIntoView({block: 'start'});
        }
      } catch {
        message('浏览器无法保存复盘记录，请稍后重试。 / This browser could not save the review. Try again.');
      }
    }, {signal});
    return () => controller.abort();
  }

  window.inquiryPaperReviews = {configure, render, mount, exportRecords, prepareImport, importFile};
})();
