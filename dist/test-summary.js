(() => {
  'use strict';

  const statuses = {
    correct: {zh: '正确', en: 'Correct'},
    incorrect: {zh: '错误', en: 'Incorrect'},
    unanswered: {zh: '未答', en: 'Unanswered'},
    disputed: {zh: '暂不计分', en: 'Excluded'}
  };
  const formats = {
    single: {zh: '普通单选', en: 'Single answer'},
    combination: {zh: '组合题', en: 'Combination'},
    reverse: {zh: '反选题', en: 'Negative stem'}
  };
  const formatPractice = {
    single: {
      zh: '先遮住选项，用一句话给出自己的判断。再打开选项，对照题干里支持判断的关键词。',
      en: 'Cover the options and state your answer in one sentence. Then compare the options against a clue in the stem.'
    },
    combination: {
      zh: '先逐条判断 I–IV，再到选项里找完全匹配的组合。复盘时单独说明最容易混淆的一条。',
      en: 'Judge I–IV individually before looking for a matching combination. Explain the statement you found hardest to classify.'
    },
    reverse: {
      zh: '先圈出 NOT 或 EXCEPT，明确题目要找哪种例外。逐项核对后再选。',
      en: 'Mark NOT or EXCEPT so the requested exception is clear. Check each option before selecting it.'
    }
  };
  const escape = value => window.inquiryEscape(value);
  const bilingual = ({zh, en}) => `${escape(zh)} <span lang="en">${escape(en)}</span>`;
  const pair = ({zh, en}) => `<div class="pair"><p lang="zh-CN">${escape(zh)}</p><p class="en" lang="en">${escape(en)}</p></div>`;
  const chapterTitle = chapter => window.COURSE_CHAPTERS?.[chapter]?.title ?? {zh: '课件主题', en: 'Course topics'};

  function tally(items) {
    const total = {correct: 0, incorrect: 0, unanswered: 0, disputed: 0};
    for (const item of items) total[item.status]++;
    return total;
  }

  function assess(paper, answers) {
    // 从当前交卷记录重算，旧记录、重新导入和自动交卷共用同一套判断。
    return paper.questions.map((question, index) => {
      const number = index + 1;
      const choice = answers?.[number];
      const selected = Number.isInteger(choice) && choice >= 0 && choice < question.options.length ? choice : null;
      const status = !Number.isInteger(question.answer) ? 'disputed'
        : selected === null ? 'unanswered'
        : selected === question.answer ? 'correct' : 'incorrect';
      return {question, number, selected, status, chapter: question.references[0]?.chapter};
    });
  }

  function breakdown(items, label) {
    return `<ul class="test-summary-breakdown">${items.map(({key, counts, total}) => {
      const available = total - counts.disputed;
      const title = label(key);
      return `<li><strong>${bilingual(title)}</strong><span class="test-summary-breakdown-score">${counts.correct}/${available}</span>
        <p>错 ${counts.incorrect} · 未答 ${counts.unanswered}${counts.disputed ? ` · 暂不计分 ${counts.disputed}` : ''}<br>
        <span lang="en">${counts.incorrect} incorrect · ${counts.unanswered} unanswered${counts.disputed ? ` · ${counts.disputed} excluded` : ''}</span></p></li>`;
    }).join('')}</ul>`;
  }

  function group(items, findKey) {
    const groups = new Map();
    for (const item of items) {
      const key = findKey(item);
      const current = groups.get(key) ?? [];
      current.push(item);
      groups.set(key, current);
    }
    return Array.from(groups, ([key, questions]) => ({key, counts: tally(questions), total: questions.length}));
  }

  function slideLinks(refs) {
    return refs.map(({chapter, page}) => `<a href="#/chapter/${chapter}/slides/${page}">第 ${chapter} 章第 ${page} 页 / Ch. ${chapter}, p. ${page}</a>`).join(' · ');
  }

  function choiceText(question, index) {
    const label = question.optionLabels?.[index] ?? 'ABCD'[index];
    const translated = question.translation?.options?.[index];
    return `<span lang="en">${escape(label)}. ${escape(question.options[index])}</span>${translated ? ` <span lang="zh-CN">（${escape(translated)}）</span>` : ''}`;
  }

  function reviewItem({question, number, selected, status}, answerLabel) {
    const choice = selected === null ? '未选 / No choice' : choiceText(question, selected);
    return `<details class="test-summary-item" id="test-summary-q${number}" data-summary-state="${status}">
      <summary><strong>Q${number} · ${bilingual(question.topic)}</strong><small>${bilingual(statuses[status])}</small></summary>
      <div class="test-summary-item-body">
        <p>你的作答 / Your response · ${choice}</p>
        ${status === 'disputed' ? '' : `<p>${bilingual(answerLabel)} · ${choiceText(question, question.answer)}</p>`}
        ${pair(question.distinction ?? question.explanation)}
        ${question.distinction ? `<details class="test-summary-detail"><summary>完整解析 / Full explanation</summary>${pair(question.explanation)}</details>` : ''}
        <p class="test-refs">课件 / Slides · ${slideLinks(question.references)}</p>
      </div>
    </details>`;
  }

  function render(paper, answers) {
    const items = assess(paper, answers);
    const counts = tally(items);
    const chapters = group(items, item => item.chapter).sort((a, b) => a.key - b.key);
    const types = group(items, item => item.question.type).sort((a, b) =>
      Object.keys(formats).indexOf(a.key) - Object.keys(formats).indexOf(b.key));
    const needsReview = items.filter(item => item.status === 'incorrect' || item.status === 'unanswered');
    const disputed = items.filter(item => item.status === 'disputed');
    const answerLabel = paper.referenceKey ? {zh: '参考答案', en: 'Reference answer'} : {zh: '答案', en: 'Answer'};
    const remaining = entry => entry.counts.incorrect + entry.counts.unanswered;
    const priority = chapters.filter(entry => remaining(entry) > 0)
      .sort((a, b) => remaining(b) - remaining(a) || b.counts.incorrect - a.counts.incorrect || a.key - b.key);
    const answered = counts.correct + counts.incorrect;
    const weakFormat = types.filter(entry => entry.counts.incorrect)
      .sort((a, b) => b.counts.incorrect - a.counts.incorrect)[0];
    const note = !answered
      ? {zh: '本轮可计分题均未作答。可以先读相关理论的例子，再任选一组题练习。', en: 'The scored items are all unanswered. Read an example in the guide, then try a group of questions.'}
      : needsReview.length
        ? {zh: '先按下方章节顺序复习。回看错题时，用自己的话解释正确选项，再合上解析重做未答题。', en: 'Start with the chapters listed below. Put each correct answer into your own words, then retry the unanswered items with the explanations closed.'}
        : {zh: '本轮所有可计分题均答对。选一道题解释为什么其他选项不合题意，巩固自己的判断。', en: 'You answered every scored item correctly. Choose one question and explain why the other options do not fit.'};

    return `<section class="test-panel test-auto-summary" aria-labelledby="test-summary-title" data-test-summary>
      <header><h2 id="test-summary-title">自动复盘<small lang="en">Your test review</small></h2></header>
      <dl class="test-summary-counts">${Object.entries(counts).filter(([state, value]) => state !== 'disputed' || value)
        .map(([state, value]) => `<div data-summary-count="${state}"><dt>${bilingual(statuses[state])}</dt><dd>${value}</dd></div>`).join('')}</dl>
      ${pair(note)}
      ${answered && priority.length ? `<div class="test-summary-priorities"><h3>先复习这些章节 <small lang="en">Chapters to revisit first</small></h3>
        <ol>${priority.map(entry => `<li><a href="#/theories/chapter-${entry.key}">${bilingual(chapterTitle(entry.key))}</a><span>错 ${entry.counts.incorrect} · 未答 ${entry.counts.unanswered} / ${entry.counts.incorrect} incorrect · ${entry.counts.unanswered} unanswered</span></li>`).join('')}</ol>
        <p class="test-meta">按错题与未答题数排列。<br><span lang="en">Ordered by the number of missed and unanswered items.</span></p></div>` : ''}
      ${weakFormat ? `<div class="test-summary-format">
        <h3>${escape(formats[weakFormat.key].zh)}答错 ${weakFormat.counts.incorrect} 题
          <small lang="en">${escape(formats[weakFormat.key].en)} · ${weakFormat.counts.incorrect} incorrect</small></h3>
        ${pair(formatPractice[weakFormat.key])}</div>` : ''}
      <details class="test-summary-detail"><summary>按章节和题型查看 <span lang="en">Results by chapter and question type</span></summary>
        <h3>章节 <small lang="en">Chapters</small></h3>
        <p class="test-meta">跨章题按主要课件引用归类。分母为本组可计分题数。<br><span lang="en">Each question is grouped by its first slide reference. The denominator counts scored items.</span></p>
        ${breakdown(chapters, chapterTitle)}
        <h3>题型 <small lang="en">Question types</small></h3>${breakdown(types, key => formats[key])}
      </details>
      ${needsReview.length ? `<details class="test-summary-detail"><summary>错题与未答题（${needsReview.length}） <span lang="en">Incorrect and unanswered items</span></summary>${needsReview.map(item => reviewItem(item, answerLabel)).join('')}</details>` : ''}
      ${disputed.length ? `<details class="test-summary-detail"><summary>暂不计分的题 <span lang="en">Excluded items</span></summary>${disputed.map(item => reviewItem(item, answerLabel)).join('')}</details>` : ''}
      <div class="test-actions"><a class="button" href="#/theories">浏览哲学理论入门 / Open the philosophy guide</a></div>
    </section>`;
  }

  window.inquiryTestSummary = {render};
})();
