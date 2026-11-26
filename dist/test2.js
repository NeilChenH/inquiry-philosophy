(() => {
  'use strict';

  const {rounds, audit, comparisons, dimensions, revision} = window.INQUIRY_TEST2;
  const firstRound = rounds[0];
  const roundsById = new Map(rounds.map(round => [round.id, round]));
  const bankSize = rounds.reduce((size, round) => size + round.questions.length, 0);
  const storageKey = 'inquiry-3192-test2-november-v2';
  const legacyKey = 'inquiry-3192-test2-november-v1';
  const papers = {
    june: {zh: '六月原卷', en: 'June paper', paperId: 'june', questions: window.INQUIRY_TEST_JUNE.questions},
    actual: {zh: '十月真题', en: 'October paper', paperId: 'october-2026-actual', questions: window.INQUIRY_TEST_OCTOBER_ACTUAL.questions}
  };
  const formats = {
    single: {zh: '普通单选', en: 'Single answer'},
    combination: {zh: '组合题', en: 'Combination'},
    reverse: {zh: '反选题', en: 'Negative stem'}
  };
  const demands = {
    definition: {zh: '定义或关键特征', en: 'Definition or feature'},
    purpose: {zh: '目的或影响', en: 'Purpose or effect'},
    distinction: {zh: '区别或归类', en: 'Distinction or classification'},
    scenario: {zh: '情境判断', en: 'Case judgement'}
  };

  const escape = value => window.inquiryEscape(value);
  const label = (zh, en) => `${escape(zh)} / <span lang="en">${escape(en)}</span>`;
  const title = (zh, en) => `${escape(zh)}<small lang="en">${escape(en)}</small>`;
  const pair = ({zh, en}) => `<div class="pair test2-pair"><p lang="zh-CN">${escape(zh)}</p><p class="en" lang="en">${escape(en)}</p></div>`;
  const hasAnswer = value => Boolean(value?.trim());
  const newRecord = () => ({reviewed: false, answers: {}, checked: {}});
  const roundUrl = (round, review = false) => `#/test2/${round.id}${review ? '/review' : ''}`;
  let records = {activeRound: firstRound.id, rounds: {}};
  let storageAvailable = true;
  let release = () => {};

  function readJson(key) {
    const raw = localStorage.getItem(key);
    try { return JSON.parse(raw); }
    catch { return null; }
  }

  function readRound(round, saved) {
    const clean = newRecord();
    clean.reviewed = saved?.reviewed === true;
    for (const question of round.questions) {
      const answer = saved?.answers?.[question.id];
      if (typeof answer !== 'string') continue;
      clean.answers[question.id] = answer;
      const checked = saved?.checked?.[question.id];
      if (hasAnswer(answer) && Array.isArray(checked)) {
        clean.checked[question.id] = question.points.filter(point => checked.includes(point.id)).map(point => point.id);
      }
    }
    return clean;
  }

  function load() {
    if (!storageAvailable) return records;
    try {
      const saved = readJson(storageKey);
      if (saved?.rounds && typeof saved.rounds === 'object' && !Array.isArray(saved.rounds)) {
        const activeRound = roundsById.has(saved.activeRound) ? saved.activeRound : firstRound.id;
        records = {activeRound, rounds: Object.fromEntries(rounds.map(round => [round.id, readRound(round, saved.rounds[round.id])]))};
      } else {
        // 旧版五道题沿用原题 ID，保留第一轮的草稿与已勾选采分点。
        records = {activeRound: firstRound.id, rounds: {[firstRound.id]: readRound(firstRound, readJson(legacyKey))}};
      }
    } catch {
      storageAvailable = false;
    }
    return records;
  }

  function save(next, main) {
    records = next;
    if (storageAvailable) {
      try { localStorage.setItem(storageKey, JSON.stringify(next)); }
      catch { storageAvailable = false; }
    }
    const status = main.querySelector('[data-test2-storage]');
    if (status) status.hidden = storageAvailable;
  }

  function countScore(state, question) {
    return state.checked[question.id]?.length ?? 0;
  }

  function slideLinks(question) {
    return question.pages.map(page => `<a href="#/chapter/${question.chapter}/slides/${page}">${label(`第 ${page} 页`, `p. ${page}`)}</a>`).join('');
  }

  function frame(content, {zh, en}, round) {
    return `<article class="test-area test2-area"${round ? ` data-test2-round-id="${round.id}"` : ''}>
      <a class="test-back" href="#/review">← ${label('综合复习', 'Review')}</a>
      <h1 tabindex="-1">${title(zh, en)}</h1>
      ${content}
    </article>`;
  }

  function storageStatus() {
    return `<p class="test2-notice" role="status" data-test2-storage ${storageAvailable ? 'hidden' : ''}>
      ${label('浏览器存储不可用。本次作答可继续，刷新会清除本次记录。', 'Browser storage is unavailable. You can continue, but a reload clears this attempt.')}
    </p>`;
  }

  function roundChooser(active, saved) {
    return `<nav class="test2-round-chooser" aria-label="选择练习轮次 / Choose a practice round"><ol>${rounds.map(round => {
      const record = saved.rounds[round.id] ?? newRecord();
      return `<li><a href="${roundUrl(round)}"${round.id === active.id ? ' aria-current="page"' : ''}>
        <strong>${title(`第 ${round.id} 轮`, `Round ${round.id}`)}</strong>
        <span class="test-meta" data-test2-round-count="${round.id}">${answeredText(round, record)}</span>
      </a></li>`;
    }).join('')}</ol></nav>`;
  }

  function nextRoundLink(round) {
    const next = rounds[rounds.indexOf(round) + 1];
    const destination = next ?? firstRound;
    return `<a class="button" href="${roundUrl(destination)}">${next ? label('下一轮', 'Next round') : label('回到第 1 轮', 'Return to round 1')} →</a>`;
  }

  function paper(round, state, saved) {
    const {questions} = round;
    return frame(`
      <p class="test-meta">${label(`第 5–8 章 · 题库 ${bankSize} 题 · 每轮 ${questions.length} 题`, `Chapters 5–8 · ${bankSize} questions · ${questions.length} per round`)}</p>
      ${pair({
        zh: '每题用两三句简单英文作答。写完可用双语范答和采分点自评，各轮草稿保存在当前浏览器。',
        en: 'Use two or three short English sentences per question. Self-check with bilingual answers and marking points. Drafts for each round stay in this browser.'
      })}
      ${storageStatus()}
      ${roundChooser(round, saved)}
      <div class="test-actions test2-top-actions">
        ${state.reviewed ? `<a class="button" href="${roundUrl(round, true)}">${label('查看本轮自评', 'Open this round’s review')}</a>` : ''}
        <a class="button" href="#/test2/analysis">${label('查看命题分析', 'Read the paper analysis')}</a>
      </div>
      <form data-test2-form>
        <div class="test-questions">${questions.map((question, index) => {
          const number = index + 1;
          return `<fieldset class="test-panel test2-question">
            <legend>${label(`第 ${number} 题`, `Question ${number}`)}</legend>
            <p class="test-meta">${label(`第 ${question.chapter} 章 · 3 个采分点`, `Chapter ${question.chapter} · 3 marking points`)}</p>
            <p id="test2-stem-${number}" class="test-stem" lang="en">${escape(question.stem.en)}</p>
            <details class="test2-disclosure test2-translation">
              <summary>${label('展开中文题干', 'Show Chinese translation')}</summary>
              <p lang="zh-CN">${escape(question.stem.zh)}</p>
            </details>
            <label for="test2-answer-${number}">${label(`第 ${number} 题作答`, `Answer for Question ${number}`)}</label>
            <textarea id="test2-answer-${number}" rows="3" lang="en" data-test2-answer="${question.id}"
              aria-describedby="test2-stem-${number}">${escape(state.answers[question.id] ?? '')}</textarea>
          </fieldset>`;
        }).join('')}</div>
        <div class="test-actions test2-end-actions">
          <button type="submit" class="button primary">${label('完成作答，进入自评', 'Finish and review answers')}</button>
          <p class="test-meta" data-test2-answered role="status">${answeredText(round, state)}</p>
        </div>
      </form>
      <dialog class="info-dialog test-confirm" data-test2-dialog aria-labelledby="test2-confirm-title" aria-describedby="test2-confirm-note">
        <h2 id="test2-confirm-title">${title('还有留空题', 'Some questions are blank')}</h2>
        <p id="test2-confirm-note"></p>
        <form method="dialog" class="test-actions">
          <button class="button" value="cancel" autofocus>${label('继续作答', 'Continue writing')}</button>
          <button class="button primary" value="review">${label('进入自评', 'Review answers')}</button>
        </form>
      </dialog>
    `, {zh: `11 月 Test 2 自编模拟卷 · 第 ${round.id} 轮`, en: `November Test 2 practice paper · Round ${round.id}`}, round);
  }

  function countAnswers(round, state) {
    return round.questions.filter(question => hasAnswer(state.answers[question.id])).length;
  }

  function answeredText(round, state) {
    const count = countAnswers(round, state);
    return label(`已写 ${count} / ${round.questions.length} 题`, `${count} of ${round.questions.length} answers written`);
  }

  function overview(round, state) {
    const maximum = round.questions.reduce((total, question) => total + question.points.length, 0);
    const done = round.questions.reduce((total, question) => total + countScore(state, question), 0);
    const remaining = maximum - done;
    const unanswered = round.questions.length - countAnswers(round, state);
    const note = remaining
      ? label(`待确认 ${remaining} 个采分点 · 留空 ${unanswered} 题`,
        `${remaining} marking points to check · ${unanswered} unanswered`)
      : label(`本轮 ${maximum} 个采分点均已确认。`, `All ${maximum} marking points are checked.`);
    return `<p class="test2-score"><strong data-test2-score>${done} / ${maximum}</strong> ${label('已覆盖采分点', 'marking points covered')}</p>
      <progress aria-label="已覆盖采分点 / Marking points covered" value="${done}" max="${maximum}"></progress>
      <p class="test-meta">${note}</p>`;
  }

  function pending(round, state) {
    const todo = round.questions.flatMap((question, index) => {
      const unchecked = question.points.filter(point => !state.checked[question.id]?.includes(point.id));
      return unchecked.length ? [{question, unchecked, number: index + 1}] : [];
    });
    if (!todo.length) return `<p>${label('可回看任一题，练习用自己的话复述。', 'Revisit any question and practise saying it in your own words.')}</p>`;
    return `<ul class="test2-pending-list">${todo.map(({question, unchecked, number}) => `<li>
      <strong>Q${number} · ${label(question.topic.zh, question.topic.en)}</strong>
      <ul>${unchecked.map(point => `<li>${label(point.zh, point.en)}</li>`).join('')}</ul>
      <p class="test-refs">${label(`第 ${question.chapter} 章课件`, `Chapter ${question.chapter} slides`)} · ${slideLinks(question)}</p>
    </li>`).join('')}</ul>`;
  }

  function analysisOf(question) {
    return `<details class="test2-disclosure">
      <summary>${label('为什么这样出题', 'Why this question is written this way')}</summary>
      <h4>${label('选这个考点的依据', 'Why this topic')}</h4>
      ${pair(question.choice)}
      <h4>${label('问法与题型的依据', 'Why this wording and format')}</h4>
      ${pair(question.design)}
      <h4>${label('常见漏答', 'Common omissions')}</h4>
      ${pair(question.commonMiss)}
    </details>`;
  }

  function reviewedQuestion(question, index, state) {
    const number = index + 1;
    const answer = state.answers[question.id];
    const answered = hasAnswer(answer);
    const checked = state.checked[question.id] ?? [];
    return `<section class="test-panel test2-review-question" aria-labelledby="test2-topic-${number}">
      <h2 id="test2-topic-${number}">${title(`Q${number} · ${question.topic.zh}`, question.topic.en)}</h2>
      ${pair(question.stem)}
      <h3>${label('你的作答', 'Your answer')}</h3>
      <p class="test2-response" lang="${answered ? 'en' : 'zh-CN'}">${answered ? escape(answer) : label('未作答', 'Unanswered')}</p>
      <h3>${label('双语参考答案', 'Bilingual model answer')}</h3>
      ${pair(question.model)}
      <fieldset class="test2-checklist" ${answered ? '' : 'disabled'}>
        <legend>${label(`第 ${number} 题采分点`, `Question ${number} marking points`)}</legend>
        ${answered ? '' : `<p class="test-meta">${label('填写这道题后可勾选采分点。', 'Write an answer to check these marking points.')}</p>`}
        ${question.points.map(point => `<label class="test2-point">
          <input type="checkbox" data-test2-point="${point.id}" data-test2-question="${question.id}" ${checked.includes(point.id) ? 'checked' : ''}>
          <span><span lang="zh-CN">${escape(point.zh)}</span><span class="test-meta" lang="en">${escape(point.en)}</span></span>
        </label>`).join('')}
      </fieldset>
      ${analysisOf(question)}
      <p class="test-refs">${label(`回看第 ${question.chapter} 章课件`, `Read Chapter ${question.chapter} slides`)} · ${slideLinks(question)}</p>
    </section>`;
  }

  function review(round, state, saved) {
    return frame(`
      ${pair({
        zh: '按你的答案实际表达的意思勾选采分点。意思正确的简单说法也可以得分。',
        en: 'Check each point your answer expresses. Simple wording counts when it conveys the right idea.'
      })}
      ${storageStatus()}
      ${roundChooser(round, saved)}
      <section class="test-panel test2-overview" aria-labelledby="test2-overview-title">
        <h2 id="test2-overview-title">${title('本次复盘', 'Your review')}</h2>
        <div data-test2-overview role="status">${overview(round, state)}</div>
        <details class="test2-disclosure">
          <summary>${label('待补要点与课件回看', 'Points to revisit and slide references')}</summary>
          <div data-test2-pending>${pending(round, state)}</div>
        </details>
        <div class="test-actions test2-top-actions">
          <a class="button" href="${roundUrl(round)}">${label('返回修改作答', 'Edit your answers')}</a>
          <a class="button" href="#/test2/analysis">${label('查看命题分析', 'Read the paper analysis')}</a>
          ${nextRoundLink(round)}
        </div>
      </section>
      <div class="test-review-list">
        ${round.questions.map((question, index) => reviewedQuestion(question, index, state)).join('')}
      </div>
      <div class="test-actions test2-end-actions">${nextRoundLink(round)}</div>
    `, {zh: `11 月 Test 2 自评 · 第 ${round.id} 轮`, en: `November Test 2 answer review · Round ${round.id}`}, round);
  }

  function paperAudit(id) {
    const paper = papers[id];
    return `<details class="test2-disclosure" data-test2-text-audit="${id}">
      <summary>${label(`${paper.zh}逐题观察（20 题）`, `${paper.en} item audit (20 questions)`)}</summary>
      <ol class="test2-audit-list">${audit[id].map((entry, index) => {
        const question = paper.questions[index];
        const demand = demands[entry.demand];
        const format = formats[question.type];
        return `<li><h3>Q${index + 1} · ${title(question.topic.zh, question.topic.en)}</h3>
          <p class="test-meta">${label(format.zh, format.en)} · ${label(demand.zh, demand.en)}</p>
          ${pair(entry.observation)}</li>`;
      }).join('')}</ol>
      <a class="test-back" href="#/tests/${paper.paperId}/answers">${label('查看原题与解析', 'Open original questions and explanations')} ↗</a>
    </details>`;
  }

  function comparisonsMarkup() {
    const numbers = list => list.map(n => `Q${n}`).join('、');
    return `<ol class="test2-audit-list">${comparisons.map(item => `<li>
      <h3>${title(item.title.zh, item.title.en)}</h3>
      <p class="test-meta">${label(`六月 ${numbers(item.june)}`, `June ${numbers(item.june)}`)} ·
        ${label(`十月 ${numbers(item.actual)}`, `October ${numbers(item.actual)}`)}</p>
      ${pair(item.body)}
    </li>`).join('')}</ol>`;
  }

  const getFit = scores => dimensions.reduce((total, dimension) => total + scores[dimension.id].score, 0);
  const roundFit = round => round.questions.reduce((total, question) => total + getFit(question.fit), 0);
  const firstFit = roundFit(firstRound);
  const otherItemFits = firstRound.questions.filter(question => question.id !== revision.question)
    .reduce((total, question) => total + getFit(question.fit), 0);
  const firstFitWith = scores => otherItemFits +
    dimensions.reduce((total, dimension) => total + scores[dimension.id], 0);
  const initialFit = firstFitWith(revision.scores);
  const baselineFit = firstFitWith(revision.baselineScores);

  function fitDetails(question, index) {
    return `<details class="test2-disclosure" data-test2-fit-item="${index + 1}">
      <summary>Q${index + 1} · ${label(question.topic.zh, question.topic.en)} · ${getFit(question.fit)} / 20</summary>
      ${pair(question.stem)}
      <p class="test-refs">${label(`第 ${question.chapter} 章课件`, `Chapter ${question.chapter} slides`)} · ${slideLinks(question)}</p>
      <dl class="test2-fit-grid">${dimensions.map(dimension => {
        const assessment = question.fit[dimension.id];
        return `<div><dt><strong>${label(dimension.title.zh, dimension.title.en)}</strong> · ${assessment.score} / ${dimension.max}</dt>
          <dd>${pair(assessment)}</dd></div>`;
      }).join('')}</dl>
    </details>`;
  }

  function roundAnalysis(round) {
    return `<details class="test2-disclosure" data-test2-fit-round="${round.id}">
      <summary><strong>${label(`第 ${round.id} 轮 · ${round.title.zh}`, `Round ${round.id} · ${round.title.en}`)}</strong> · ${roundFit(round)} / 100</summary>
      ${round.questions.map(fitDetails).join('')}
      <a class="test-back" href="${roundUrl(round)}">${label(`做第 ${round.id} 轮`, `Practise round ${round.id}`)} ↗</a>
    </details>`;
  }

  function analysis() {
    return frame(`
      ${pair({
        zh: '题库根据六月原卷、十月真题、课件和老师已说明的简答要求编写。每轮按同一套量表评估这些已知特征。取得 Test 2 参考卷后，可用实际题型和难度校准。',
        en: 'The bank draws on the June and October Test 1 papers, the slides and the teacher’s guidance on short answers. The same rubric measures these known features for each round. A Test 2 reference paper can help calibrate the item formats and difficulty.'
      })}
      <p class="test2-score"><strong data-test2-fit-total>${firstFit} / 100</strong> ${label('第 1 轮已知命题特征拟合度', 'Round 1 fit to known question patterns')}</p>
      <div class="test-actions test2-top-actions"><a class="button primary" href="#/test2">${label('打开模拟卷', 'Open the practice paper')}</a></div>
      <div class="test-review-list">
        <details class="test-panel test2-disclosure test2-round" open data-test2-round="1">
          <summary>${title('第一轮 · 题型与语气', 'Round 1 · Format and wording')}</summary>
          ${pair({
            zh: '两卷各 20 道四选一。六月有 15 道普通单选、4 道组合和 1 道明确反选；十月分别为 12、8、0。只数英文题干，六月中位 20.5 词，十月中位 12.5 词，组合陈述与选项另计。卷面常用限定词聚焦核心，少量题先给短材料再问结论。',
            en: 'Both papers have 20 four-option items. June has 15 ordinary items, four combinations and one negative prompt. October has 12, eight and zero. Median stem length is 20.5 words in June and 12.5 in October, excluding options and combination statements. Qualifiers narrow the target, and some questions use short material before asking for a judgement.'
          })}
          ${pair({
            zh: '写成简答时保留 main purpose、main feature 和具体情境，把 which of the following 换成写出一项、说明一个区别或简述原因。',
            en: 'For short answers, keep cues such as main purpose and main feature and add concrete cases where useful. A learner can state a feature, give a distinction or briefly explain a reason.'
          })}
          ${paperAudit('june')}${paperAudit('actual')}
        </details>
        <details class="test-panel test2-disclosure test2-round" data-test2-round="2">
          <summary>${title('第二轮 · 重复考点与换问法', 'Round 2 · Recurring topics and changed prompts')}</summary>
          ${comparisonsMarkup()}
        </details>
        <details class="test-panel test2-disclosure test2-round" data-test2-round="3">
          <summary>${title('第三轮 · 课件迁移与拟合度复评', 'Round 3 · Transfer to the slides and reassessment')}</summary>
          ${pair({
            zh: '每轮第 5、7、8 章各一题，第 6 章两题，兼顾知识与真理标准。每轮更换考点或案例，用两三句英文试答并核对三个采分点。分项充分吻合给全分，部分吻合给半分，缺少依据给零分。',
            en: 'Every round gives Chapters 5, 7 and 8 one question each and Chapter 6 two. Content and cases vary. A trial answer checks each command and point in two or three English sentences. Give full credit for a clear fit, half for a partial fit and zero when evidence is absent.'
          })}
          <ul class="test2-rubric">${dimensions.map(dimension => `<li>
            <strong>${label(dimension.title.zh, dimension.title.en)} · ${dimension.max} / 20</strong>
            ${pair(dimension.standard)}
          </li>`).join('')}</ul>
          <div class="test2-revision">
            <h3>${title(`第 1 轮从 ${initialFit} 分、${baselineFit} 分到 ${firstFit} 分`, `Round 1: ${initialFit}, then ${baselineFit}, now ${firstFit}`)}</h3>
            ${pair(revision.draft)}
            ${pair(revision.reason)}
            ${pair(revision.improvement)}
          </div>
          ${rounds.map(roundAnalysis).join('')}
        </details>
      </div>
    `, {zh: '11 月 Test 2 命题分析', en: 'November Test 2 paper analysis'});
  }

  function render(roundPart, detail) {
    if (roundPart === 'analysis') return analysis();
    const saved = load();
    const round = roundPart === 'review' ? firstRound : (roundsById.get(roundPart || saved.activeRound) ?? firstRound);
    const state = saved.rounds[round.id] ?? newRecord();
    const reviewing = roundPart === 'review' || detail === 'review';
    return reviewing && state.reviewed ? review(round, state, saved) : paper(round, state, saved);
  }

  function mount(main, route, navigate) {
    release();
    release = () => {};
    if (route.type !== 'test2') return;
    const controller = new AbortController();
    const {signal} = controller;
    release = () => controller.abort();
    const form = main.querySelector('[data-test2-form]');
    const dialog = main.querySelector('[data-test2-dialog]');
    const result = main.querySelector('[data-test2-overview]');
    const pendingPoints = main.querySelector('[data-test2-pending]');
    const round = roundsById.get(main.querySelector('[data-test2-round-id]')?.dataset.test2RoundId);
    main.querySelector('h1')?.focus({preventScroll: true});
    if (!round) return;

    function saveRound(saved, state) {
      saved.rounds[round.id] = state;
      saved.activeRound = round.id;
      save(saved, main);
    }

    function finish() {
      const saved = load();
      const state = saved.rounds[round.id] ?? newRecord();
      state.reviewed = true;
      saveRound(saved, state);
      navigate(roundUrl(round, true));
    }

    if (form) {
      // 每次编辑只更新当前题，重置该题的旧自评。其余题保留已确认采分点。
      form.addEventListener('input', event => {
        const field = event.target;
        const id = field.dataset.test2Answer;
        if (!round.questions.some(question => question.id === id)) return;
        const saved = load();
        const state = saved.rounds[round.id] ?? newRecord();
        if (state.answers[id] === field.value) return;
        state.answers[id] = field.value;
        delete state.checked[id];
        saveRound(saved, state);
        const answered = form.querySelector('[data-test2-answered]');
        const status = answeredText(round, state);
        if (answered.innerHTML !== status) {
          answered.innerHTML = status;
          main.querySelector(`[data-test2-round-count="${round.id}"]`).innerHTML = status;
        }
      }, {signal});

      form.addEventListener('submit', event => {
        event.preventDefault();
        const state = load().rounds[round.id] ?? newRecord();
        const blank = round.questions.length - countAnswers(round, state);
        if (!blank) return finish();
        dialog.returnValue = 'cancel';
        const blankNotice = blank === 1 ? '1 question is unanswered.' : `${blank} questions are unanswered.`;
        dialog.querySelector('#test2-confirm-note').innerHTML = label(`还有 ${blank} 题未作答。`, blankNotice);
        dialog.showModal();
      }, {signal});

      dialog.addEventListener('close', () => {
        if (dialog.returnValue === 'review') finish();
      }, {signal});
    }

    if (result) main.addEventListener('change', event => {
      const field = event.target;
      const question = round.questions.find(item => item.id === field.dataset.test2Question);
      const id = field.dataset.test2Point;
      if (!question?.points.some(point => point.id === id)) return;
      const saved = load();
      const state = saved.rounds[round.id] ?? newRecord();
      if (!hasAnswer(state.answers[question.id])) return;
      const checked = new Set(state.checked[question.id] ?? []);
      if (field.checked) checked.add(id);
      else checked.delete(id);
      state.checked[question.id] = [...checked];
      saveRound(saved, state);
      result.innerHTML = overview(round, state);
      pendingPoints.innerHTML = pending(round, state);
    }, {signal});
  }

  function entry() {
    return `<section class="test-panel test-review-entry">
      <div><h2>${title('11 月 Test 2 自编模拟卷', 'NOVEMBER TEST 2 PRACTICE')}</h2>
      <p class="test-meta test2-entry-meta">${label(`第 5–8 章 · 题库 ${bankSize} 题 · 每轮 5 题`, `Chapters 5–8 · ${bankSize} questions · 5 per round`)}</p></div>
      <a class="button primary" href="#/test2">${label('进入简答练习', 'Open Test 2 practice')} ↗</a>
    </section>`;
  }

  window.inquiryTest2 = {render, mount, entry};
})();
