const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const read = file => fs.readFileSync(path.join(dist, file), 'utf8');
const exists = file => fs.existsSync(path.join(dist, file));
const context = vm.createContext({window: {}});
const pagesByChapter = [41, 25, 32, 32, 43, 27, 44, 41];
const html = read('index.html');
const scripts = Array.from(html.matchAll(/<script src="([^"]+)"/g), match => match[1]);
const entry = fs.readFileSync(path.join(root, '打开学习站.html'), 'utf8');

assert(entry.includes('href="dist/index.html"'), 'Local launcher target');
assert.equal(scripts.at(-1), 'app.js', 'Application loads after content');
assert.equal(new Set(scripts).size, scripts.length, 'Each script loads once');
for (const asset of html.matchAll(/<(?:link|script)\b[^>]*\b(?:src|href)="([^"]+)"/g)) {
  assert(exists(asset[1]), `Missing entry asset: ${asset[1]}`);
}
for (const script of scripts) {
  const code = new vm.Script(read(script), {filename: script});
  // 浏览器动效依赖 DOM，静态验收仅检查语法及入口资源。
  if (!script.startsWith('assets/vendor/') && !['app.js', 'visualizations.js', 'cinema-hero.js', 'cinema-motion.js', 'cinema-home.js', 'cinema-chapter.js'].includes(script)) {
    code.runInContext(context, {timeout: 3000});
  }
}

context.window.inquiryEscape = value => String(value).replace(/[&<>"']/g, char =>
  ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[char]);
const {COURSE_CHAPTERS, COURSE_SUPPLEMENTS, SOURCE_INVENTORY, FULL_COURSE_SITE, IMAGE_CREDITS} = context.window;
assert.equal(new URL(FULL_COURSE_SITE).protocol, 'https:');
assert.equal(SOURCE_INVENTORY.length, pagesByChapter.length);
assert.equal(Object.keys(COURSE_CHAPTERS).length, pagesByChapter.length);
assert.equal(IMAGE_CREDITS.length, pagesByChapter.length);
assert.equal(context.window.SOURCE_PAGES, undefined, 'Full slide transcripts stay with the full course edition');
assert(!exists('originals') && !exists('assets/slides'), 'Open edition contains no original PDF or slide image bundles');

function bilingual(value, label) {
  assert(value?.zh?.trim() && value?.en?.trim(), `Missing bilingual content: ${label}`);
}

function checkPageReferences(pages, max, label) {
  assert(pages?.length && pages.every(page => Number.isInteger(page) && page >= 1 && page <= max),
    `Invalid PDF page references: ${label}`);
}

const stats = {chapters: 0, indexedPages: 0, units: 0, terms: 0, multipleChoice: 0, reflections: 0, images: 0};
const ids = new Set();
function unique(id) {
  assert(id && !ids.has(id), `Duplicate or missing ID: ${id}`);
  ids.add(id);
}

for (const [offset, maxPage] of pagesByChapter.entries()) {
  const id = offset + 1;
  const chapter = COURSE_CHAPTERS[id];
  const source = SOURCE_INVENTORY[offset];
  assert.equal(chapter.id, id);
  assert.equal(source.id, id);
  assert.equal(source.pages, maxPage);
  assert(/^CHAPTER_[1-8]_[A-Z0-9_]+\.pdf$/i.test(source.file), 'Course inventory uses filenames only');
  assert.equal(chapter.pages.length, maxPage);
  bilingual(chapter.title, `Chapter ${id} title`);
  bilingual(chapter.subtitle, `Chapter ${id} subtitle`);
  bilingual(chapter.overview, `Chapter ${id} overview`);
  stats.chapters++;
  stats.indexedPages += maxPage;

  for (const [i, page] of chapter.pages.entries()) {
    assert.equal(page.n, i + 1, `Chapter ${id} PDF page order`);
    assert.deepEqual(Object.keys(page).sort(), ['n', 'title'], 'Index entries carry the page number and title');
    bilingual(page.title, `Chapter ${id}, page ${page.n}`);
  }
  for (const unit of chapter.sections) {
    unique(unit.id);
    bilingual(unit.title, unit.id);
    bilingual(unit.lead, unit.id);
    assert(unit.blocks.length, `Missing text blocks: ${unit.id}`);
    unit.blocks.forEach(block => bilingual(block, unit.id));
    if (unit.example) bilingual(unit.example, unit.id);
    if (unit.takeaway) bilingual(unit.takeaway, unit.id);
    checkPageReferences(unit.pages, maxPage, unit.id);
    stats.units++;
  }
  for (const term of chapter.terms) {
    bilingual(term, `Chapter ${id} term`);
    bilingual(term.note, term.en);
    checkPageReferences(term.pages, maxPage, term.en);
    stats.terms++;
  }
  // 核对目标卡的来源与单元跳转，避免章节编辑后出现失效链接。
  const outcomes = chapter.learningOutcomes;
  if (id === 7 || id === 8) {
    assert.equal(outcomes?.page, 2, `Chapter ${id} learning outcomes source`);
    assert.equal(outcomes.items.length, 3, `Chapter ${id} learning outcomes count`);
    for (const item of outcomes.items) {
      bilingual(item, `Chapter ${id} learning outcome`);
      assert(item.units?.length && item.units.every(unitId => chapter.sections.some(unit => unit.id === unitId)),
        `Chapter ${id} learning outcome points to an unknown unit`);
    }
  } else {
    assert.equal(outcomes, undefined, `Chapter ${id} has no source learning outcomes`);
  }
  for (const question of chapter.quiz) {
    unique(question.id);
    bilingual(question.question, question.id);
    checkPageReferences(question.pages, maxPage, question.id);
    if (question.type === 'reflection') {
      bilingual(question.modelAnswer, question.id);
      stats.reflections++;
    } else {
      assert.equal(question.type, 'mcq');
      assert.equal(question.options.length, 4);
      assert(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 4);
      question.options.forEach(option => bilingual(option, question.id));
      bilingual(question.explanation, question.id);
      stats.multipleChoice++;
    }
  }
  for (const note of [...chapter.notes, ...(COURSE_SUPPLEMENTS[id] || [])]) {
    bilingual(note, note.title.en);
    bilingual(note.title, note.title.en);
    checkPageReferences(note.pages, maxPage, note.title.en);
    for (const reference of note.references || []) assert.equal(new URL(reference.url).protocol, 'https:');
  }
  const art = IMAGE_CREDITS.find(credit => credit.chapter === id);
  assert.equal(art.image, `assets/chapter-${id}.jpg`);
  assert(art.title && art.creator && art.license && art.modifications);
  assert.equal(new URL(art.source).protocol, 'https:');
  if (art.licenseUrl) assert.equal(new URL(art.licenseUrl).protocol, 'https:');
  const jpeg = fs.readFileSync(path.join(dist, art.image));
  assert.equal(jpeg.readUInt16BE(0), 0xffd8, `Expected JPEG for chapter ${id}`);
  stats.images++;
}

assert.deepEqual(stats, {
  chapters: 8,
  indexedPages: 285,
  units: 66,
  terms: 200,
  multipleChoice: 80,
  reflections: 16,
  images: 8,
});
console.log(JSON.stringify(stats, null, 2));
console.log('All open edition checks passed.');

// 测验使用独立数据；核对原答案表、四选一结构及解析中的课件入口。
const {INQUIRY_TEST_JUNE: june, INQUIRY_TEST_OCTOBER: october, INQUIRY_TEST_OCTOBER_ACTUAL: actual} = context.window;
for (const [name, paper] of [['June', june], ['October', october], ['October actual', actual]]) {
  assert.equal(paper.questions.length, 20, name);
  assert.equal(paper.questions.filter(q => q.type === 'combination').length, paper === actual ? 8 : 4, name);
  assert.equal(paper.questions.filter(q => q.type === 'reverse').length, paper === actual ? 0 : 1, name);
  paper.questions.forEach((q, index) => {
    const label = `${name} Q${index + 1}`;
    assert(q.stem.trim() && q.options.length === 4 && new Set(q.options).size === 4, label);
    assert(q.options.every(option => option.trim()), label);
    assert((paper === actual && index === 15 && q.answer === null) || (Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4), label);
    assert(['single', 'reverse', 'combination'].includes(q.type) && ['basic', 'applied', 'advanced'].includes(q.difficulty), label);
    assert.equal(q.statements?.length || 0, q.type === 'combination' ? 4 : 0, label);
    bilingual(q.topic, label);
    bilingual(q.explanation, label);
    if (q.distinction) bilingual(q.distinction, label);
    assert(q.references.length > 0, label);
    q.references.forEach(ref => checkPageReferences([ref.page], pagesByChapter[ref.chapter - 1], label));
    if (paper === actual) {
      assert(q.translation.stem.trim() && q.translation.options.length === 4, label);
      assert.equal(q.translation.statements?.length || 0, q.statements?.length || 0, label);
      assert(q.sourcePages.every(page => page >= 2 && page <= 6), label);
    }
  });
}
assert.equal(june.questions.map(q => 'ABCD'[q.answer]).join(''), 'DDCDACDAADBADDACCDAC');
[9, 12, 18].forEach(i => bilingual(june.questions[i].distinction, `June Q${i + 1} source distinction`));
assert.deepEqual([1, 2, 3, 4].map(ch => october.questions.filter(q => q.references[0].chapter === ch).length), [5, 4, 5, 6]);
assert.equal(actual.questions.map(q => q.answer === null ? '?' : (q.optionLabels || ['A','B','C','D'])[q.answer]).join(''), 'DBCBDBDDBCCCDDB?BACD');
assert.deepEqual(Array.from(actual.questions[7].optionLabels), ['A','B','D','C']);
assert.equal(actual.questions[7].answer, 2);
assert.deepEqual(Array.from(actual.questions[8].sourcePages), [3,4]);
console.log('All three Test 1 papers passed; October actual has 19 scored items.');

// 同时校验目录、深链接和课件引用，避免新增理论时损坏离线入口。
const {items: theories} = context.window.INQUIRY_THEORIES;
const theoryIds = new Set(theories.map(item => item.id));
assert.equal(theoryIds.size, theories.length, 'Each theory has a unique route');
const coveredChapters = new Set();
for (const item of theories) {
  const {id, name, intro, explanation, misconception, examples, related, chapters, references} = item;
  assert(/^[a-z][a-z0-9-]*$/.test(id), id);
  assert(['theory', 'tradition', 'method', 'framework', 'branch'].includes(item.kind), id);
  [name, intro, explanation, misconception].forEach(text => bilingual(text, id));
  assert.equal(examples.length, 2, id);
  for (const example of examples) {
    bilingual(example.title, id);
    bilingual(example, id);
  }
  const referenceChapters = new Set();
  for (const {chapter, page} of references) {
    assert(COURSE_CHAPTERS[chapter], id);
    checkPageReferences([page], pagesByChapter[chapter - 1], id);
    referenceChapters.add(chapter);
    coveredChapters.add(chapter);
  }
  assert.equal(referenceChapters.size, chapters.length, id);
  assert(chapters.every(chapter => referenceChapters.has(chapter)), id);
  assert(related.length && related.every(other => other !== id && theoryIds.has(other)), id);
  for (const ref of item.externalReferences || []) assert.equal(new URL(ref.url).protocol, 'https:');
  const article = context.window.inquiryTheories.render(id);
  assert(article.includes(`#/chapter/${references[0].chapter}/slides/${references[0].page}`), id);
  assert(article.includes('lang="zh-CN"') && article.includes('lang="en"'), id);
}
assert.deepEqual([...coveredChapters].sort(), [1, 2, 3, 4, 5, 6, 7, 8]);
assert.equal((context.window.inquiryTheories.render('').match(/data-theory-id=/g) || []).length, theories.length);
console.log(`Theory guide verified: ${theories.length} entries and ${theories.length * 2} bilingual worked examples.`);

// 评分保留原印刷标签，争议题在三类作答状态之外单列。
for (const [paper, excluded] of [[june, 0], [october, 0], [{...actual, referenceKey: true}, 1]]) {
  const render = context.window.inquiryTestSummary.render;
  const complete = Object.fromEntries(paper.questions.flatMap((q, index) => q.answer === null ? [] : [[index + 1, q.answer]]));
  const summary = render(paper, complete);
  assert.match(summary, new RegExp(`data-summary-count="correct">[\\s\\S]*?<dd>${20 - excluded}</dd>`));
  assert(!summary.includes('data-summary-state="incorrect"'));
  const partial = render(paper, {1: (paper.questions[0].answer + 1) % 4});
  assert.match(partial, /data-summary-count="incorrect">[\s\S]*?<dd>1<\/dd>/);
  assert.match(partial, new RegExp(`data-summary-count="unanswered">[\\s\\S]*?<dd>${19 - excluded}</dd>`));
  assert(partial.includes('data-summary-state="incorrect"') && partial.includes('data-summary-state="unanswered"'));
  assert(partial.includes('href="#/theories/chapter-'));
  assert.equal(partial.includes('data-summary-state="disputed"'), Boolean(excluded));
  if (excluded) {
    const q8 = partial.slice(partial.indexOf('id="test-summary-q8"'), partial.indexOf('id="test-summary-q9"'));
    assert(q8.includes('Reference answer') && q8.includes('D. Emotional.'));
  }
}
console.log('Automatic review verified for full, partial and disputed scoring.');

// 每轮分别校验 15 个学习采分点与 100 分命题拟合度。
const test2 = context.window.INQUIRY_TEST2;
const {rounds: shortRounds, dimensions: fitDimensions, revision: fitRevision} = test2;
assert.deepEqual(Array.from(shortRounds, round => round.id), ['1', '2', '3', '4', '5']);
const shortQuestions = shortRounds.flatMap(round => round.questions);
assert.equal(shortQuestions.length, 25);
assert.equal(new Set(shortQuestions.map(question => question.id)).size, shortQuestions.length);
assert.equal(new Set(shortQuestions.map(question => question.stem.en)).size, shortQuestions.length);
assert.equal(new Set(shortQuestions.map(question => question.stem.zh)).size, shortQuestions.length);
assert(shortQuestions.every(question => /^[a-z][a-z0-9-]*$/.test(question.id)));
const scoreFit = question => test2.dimensions.reduce((sum, dimension) => sum + question.fit[dimension.id].score, 0);
assert.deepEqual(Array.from(fitDimensions, dimension => dimension.max), [6, 6, 5, 3]);
const roundFits = Array.from(shortRounds, round => {
  bilingual(round.title, `round ${round.id}`);
  assert.deepEqual(Array.from(round.questions, question => question.chapter), [5, 6, 6, 7, 8]);
  const roundFit = round.questions.reduce((sum, question) => sum + scoreFit(question), 0);
  assert(roundFit > 95 && roundFit <= 100, `round ${round.id} fit: ${roundFit}/100`);
  return roundFit;
});
for (const question of shortQuestions) {
  for (const field of ['topic', 'stem', 'model', 'choice', 'design', 'commonMiss']) bilingual(question[field], `${question.id} ${field}`);
  checkPageReferences(question.pages, pagesByChapter[question.chapter - 1], question.id);
  assert(question.model.en.split(/(?<=[.!?])\s+/).length >= 2 && question.model.en.split(/(?<=[.!?])\s+/).length <= 3, question.id);
  assert.equal(question.points.length, 3, question.id);
  assert.equal(new Set(question.points.map(point => point.id)).size, 3, question.id);
  question.points.forEach(point => bilingual(point, question.id));
  for (const dimension of fitDimensions) {
    const assessment = question.fit[dimension.id];
    bilingual(assessment, `${question.id} fit ${dimension.id}`);
    assert([0, dimension.max / 2, dimension.max].includes(assessment.score), question.id);
  }
}
const priorQuestion = shortRounds[0].questions.find(question => question.id === fitRevision.question);
assert(priorQuestion, 'revision belongs to the original round');
for (const revisionScores of [fitRevision.scores, fitRevision.baselineScores]) {
  for (const {id, max} of fitDimensions) {
    assert([0, max / 2, max].includes(revisionScores[id]), `revision score ${id}`);
  }
}
const fitWithRevision = scores => roundFits[0] - scoreFit(priorQuestion) +
  fitDimensions.reduce((sum, dimension) => sum + scores[dimension.id], 0);
assert.equal(fitWithRevision(fitRevision.scores), 88);
assert.equal(fitWithRevision(fitRevision.baselineScores), 94);
assert.equal(roundFits[0], 97);
bilingual(fitRevision.improvement, 'round 1 improvement rationale');
for (const observations of Object.values(test2.audit)) {
  assert.equal(observations.length, 20);
  observations.forEach(entry => {
    assert(['definition', 'purpose', 'distinction', 'scenario'].includes(entry.demand));
    bilingual(entry.observation, 'Test 1 item observation');
  });
}
for (const comparison of test2.comparisons) {
  bilingual(comparison.title, 'paired evidence title');
  bilingual(comparison.body, 'paired evidence text');
  for (const paper of ['june', 'actual']) assert(comparison[paper].every(n => n >= 1 && n <= 20));
}

const test2Data = new Map();
context.localStorage = {
  getItem: key => test2Data.get(key) ?? null,
  setItem: (key, value) => test2Data.set(key, value)
};
const shortTest = context.window.inquiryTest2;
assert(shortTest.entry().includes('href="#/test2"'));
function assertShortPaper(html, round) {
  assert(html.includes(`data-test2-round-id="${round.id}"`));
  assert.equal((html.match(/<textarea\b/g) || []).length, 5);
  assert(!html.includes('Bilingual model answer'));
  for (const question of round.questions) assert(html.includes(`data-test2-answer="${question.id}"`));
}
const legacyKey = 'inquiry-3192-test2-november-v1';
const roundKey = 'inquiry-3192-test2-november-v2';
const [firstRound, secondRound] = shortRounds;
const firstShort = firstRound.questions[0];
const secondShort = secondRound.questions[0];

// 新用户直接打开旧复盘链接时仍需作答，所有新轮次都只展示各自的五题。
assertShortPaper(shortTest.render('review'), firstRound);
for (const round of shortRounds) {
  const html = shortTest.render(round.id);
  assertShortPaper(html, round);
  for (const other of shortQuestions.filter(question => !round.questions.includes(question))) {
    assert(!html.includes(`data-test2-answer="${other.id}"`));
  }
}
test2Data.set(legacyKey, '{malformed');
assertShortPaper(shortTest.render(), firstRound);

// 旧记录恢复到第一轮，排除无效题目、无效采分点和重复勾选。
test2Data.set(legacyKey, JSON.stringify({
  reviewed: true,
  answers: {[firstShort.id]: '<my response>', [secondShort.id]: 'foreign legacy answer'},
  checked: {
    [firstShort.id]: [firstShort.points[0].id, firstShort.points[0].id, 'unknown'],
    [firstRound.questions[1].id]: [firstRound.questions[1].points[0].id]
  }
}));
const goodShortReview = shortTest.render('review');
assert.match(goodShortReview, /data-test2-score>1 \/ 15/);
assert(goodShortReview.includes('&lt;my response&gt;') && !goodShortReview.includes('<my response>'));
assert(!goodShortReview.includes('foreign legacy answer'));
assert.equal((goodShortReview.match(/test2-checklist" disabled/g) || []).length, 4);
assertShortPaper(shortTest.render('2', 'review'), secondRound);

// 默认入口继续上次练习。新版按轮恢复，第一轮旧入口仍能定位第一轮。
test2Data.set(roundKey, JSON.stringify({
  activeRound: '2',
  rounds: {
    '1': {
      reviewed: true,
      answers: {[firstShort.id]: 'first round restored response'},
      checked: {[firstShort.id]: [firstShort.points[0].id]}
    },
    '2': {
      reviewed: true,
      answers: {[secondShort.id]: 'second round restored response', [firstShort.id]: 'foreign second round answer'},
      checked: {
        [secondShort.id]: secondShort.points.slice(0, 2).map(point => point.id),
        [firstShort.id]: [firstShort.points[0].id]
      }
    }
  }
}));
const resumedRound = shortTest.render();
assertShortPaper(resumedRound, secondRound);
assert(resumedRound.includes('second round restored response'));
const secondReview = shortTest.render('2', 'review');
assert(secondReview.includes('data-test2-round-id="2"'));
assert.match(secondReview, /data-test2-score>2 \/ 15/);
assert(secondReview.includes('second round restored response'));
assert(!secondReview.includes('foreign second round answer') && !secondReview.includes('first round restored response'));
const firstReview = shortTest.render('review');
assert(firstReview.includes('data-test2-round-id="1"'));
assert.match(firstReview, /data-test2-score>1 \/ 15/);
assert(firstReview.includes('first round restored response'));
assert(!firstReview.includes('second round restored response') && !firstReview.includes('&lt;my response&gt;'));

const analysisPage = shortTest.render('analysis');
assert.equal((analysisPage.match(/data-test2-round=/g) || []).length, 3);
assert.equal((analysisPage.match(/data-test2-fit-round\b/g) || []).length, 5);
assert.equal((analysisPage.match(/data-test2-fit-item\b/g) || []).length, 25);
console.log(`Test 2 verified: 25 questions across 5 rounds, 15 marking points per round, 40 audit entries, and fits ${roundFits.join(', ')}/100.`);
