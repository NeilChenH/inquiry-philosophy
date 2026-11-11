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
  if (!['app.js', 'visualizations.js', 'cinema-hero.js', 'cinema-motion.js'].includes(script)) {
    code.runInContext(context, {timeout: 3000});
  }
}

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
