/* INQUIRY — buildless, local-file compatible learning experience. */
(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  window.inquiryEscape = escape;
  const bi = (v, labels = false) => `<div class="pair"><div class="zh" lang="zh-CN">${labels ? '<span class="pair-label">中文 / CHINESE</span>' : ''}${escape(v?.zh || '')}</div><div class="en" lang="en">${labels ? '<span class="pair-label">ENGLISH / 英文</span>' : ''}${escape(v?.en || '')}</div></div>`;
  const title = v => `${escape(v?.zh)}<small lang="en">${escape(v?.en)}</small>`;
  const chapters = Object.values(window.COURSE_CHAPTERS || {}).sort((a,b) => a.id-b.id);
  const chapterMap = Object.fromEntries(chapters.map(c=>[c.id,c]));
  const allSections = chapters.flatMap(c=>c.sections || []);
  const allQuizzes = chapters.flatMap(c=>(c.quiz || []).map(q=>({...q,chapter:c.id})));
  const quizMap = Object.fromEntries(allQuizzes.map(q=>[q.id,q]));
  const termId = (chapterId, term) => `term-${chapterId}-${encodeURIComponent(term.en.trim().toLowerCase())}`;
  const themes = ['cinema', 'paper', 'night', 'sand'];
  // 兼容旧版的深林主题设置和已经导出的学习档案。
  const themeValue = value => value === 'forest' ? 'night' : themes.includes(value) ? value : 'cinema';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let stored = {};
  try { stored = JSON.parse(localStorage.getItem('inquiry-3192') || '{}'); } catch {}
  const state = {
    theme: themeValue(stored.theme),
    reading: !!stored.reading,
    motion: stored.motion !== false,
    completed: Array.isArray(stored.completed) ? stored.completed.filter(id=>allSections.some(s=>s.id===id)) : [],
    answers: stored.answers && typeof stored.answers==='object' && !Array.isArray(stored.answers) ? stored.answers : {},
    lastChapter: Number(stored.lastChapter) || 1
  };
  let route = {}, previousRoute = {}, toastTimer = 0, searchTimer = 0, focusTab = '';
  let activeTransition = null;
  let reviewFilter = {chapter:'all',wrong:false,round:false};
  let roundIds = [];
  const words = ['ASK.','LIVE.','REASON.','BE HUMAN.','EXIST.','KNOW.','QUESTION.','REIMAGINE.'];
  const credit = id => (window.IMAGE_CREDITS || []).find(c=>c.chapter===id);
  const image = id => credit(id)?.image || `assets/chapter-${id}.jpg`;
  const pageCount = c => window.SOURCE_PAGES?.[c.id]?.length || c.pages?.length || 0;
  const fullCourse = window.FULL_COURSE_SITE;
  const sourceUrl = (id, page = 1) => new URL(`#/chapter/${id}/slides/${page}`, fullCourse).href;
  const hasOriginalSlides = c => Boolean(window.SOURCE_PAGES?.[c.id]?.[0]?.image && c.pages?.[0]?.zh);
  function save(){ try { localStorage.setItem('inquiry-3192',JSON.stringify(state)); } catch {} }
  function notify(zh,en){ const box=$('#toast');box.textContent=`${zh} / ${en}`;box.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>box.classList.remove('visible'),2400); }
  const motionAllowed = () => state.motion && !state.reading && !reducedMotion.matches;
  function syncSettings(){
    const animate = motionAllowed();
    if (!animate) activeTransition?.skipTransition();
    document.documentElement.dataset.theme=state.theme;
    document.documentElement.classList.toggle('reading',state.reading);
    document.documentElement.classList.toggle('reduced-motion', reducedMotion.matches);
    document.documentElement.classList.toggle('no-motion', !animate);
    document.documentElement.classList.toggle('motion-opt-in', animate);
    $('#theme').value=state.theme;
    const b=$('[data-action="reading"]');b.setAttribute('aria-pressed',String(state.reading));b.innerHTML=`<span>${state.reading?'沉浸浏览':'舒适阅读'}</span><small>${state.reading?'CINEMATIC MODE':'READING MODE'}</small>`;
    const motionText = animate ? '动效 开 / Motion on'
      : state.motion ? '动效 暂停 / Motion paused' : '动效 关 / Motion off';
    for (const button of $$('[data-action="motion"]')) {
      button.setAttribute('aria-pressed', String(state.motion));
      if (button.hasAttribute('data-motion-short')) button.setAttribute('aria-label', motionText);
      else button.textContent = motionText;
    }
    window.inquiryHero?.sync(animate);
    window.inquiryMotion?.sync(animate);
    window.inquiryHome?.sync(animate);
    window.inquiryChapter?.sync(animate);
  }
  function navigate(hash){ if(location.hash===hash){render();}else location.hash=hash; }
  function parseRoute(){const parts=(location.hash.replace(/^#\/?/,'') || '').split('/');return {type:parts[0]||'home',id:Number(parts[1])||1,tab:parts[2]||'learn',target:parts[3]||''};}
  function chapterCard(c){
    const done=(c.sections||[]).filter(s=>state.completed.includes(s.id)).length;
    const art = credit(c.id);
    const artCredit = art?.licenseUrl
      ? `<span class="card-art-credit">图片 / Image: ${escape(art.creator)} · ${escape(art.license)}</span>`
      : '';
    return `<a class="chapter-card" href="#/chapter/${c.id}"><div class="card-image"><img src="${image(c.id)}" alt="${escape(credit(c.id)?.title || c.title.en)}" loading="lazy" decoding="async"><span class="card-number">CH. ${String(c.id).padStart(2,'0')}</span><span class="card-word">${words[c.id-1]}</span></div><div class="card-meta"><h3>${title(c.title)}</h3><span class="card-arrow" aria-hidden="true">↗</span></div><div class="card-stats">${pageCount(c)} 页 PAGES · ${c.sections.length} 单元 UNITS${done?` · ${done}/${c.sections.length} ✓`:''}</div>${artCredit}</a>`;
  }
  function curriculum(){return `<section class="section-wrap" id="curriculum"><div class="section-heading"><div><div class="eyebrow">THE COURSE / 课程全景</div><h2>八章，重新看世界。<small class="muted" style="display:block;font-size:.4em;margin-top:12px;letter-spacing:.02em">Eight chapters. A different way to see.</small></h2></div><p>从“什么是哲学”，走向“如何理解当下”。<span>From the meaning of philosophy to making sense of the world we live in.</span></p></div><div class="curriculum-grid">${chapters.map(chapterCard).join('')}</div></section>`;}
  function home() {
    return window.inquiryHome.render({
      chapters, pageCount, image, credit, completed: state.completed,
      lastChapter: chapterMap[state.lastChapter] ? state.lastChapter : 1,
      fullSlides: chapters.some(hasOriginalSlides),
    });
  }
  function sidebar(c){return `<aside class="chapter-sidebar" aria-label="章节 / Chapters"><div class="sidebar-label">COURSE INDEX / 章节目录</div>${chapters.map(x=>`<a class="${x.id===c.id?'active':''}" href="#/chapter/${x.id}" ${x.id===c.id?'aria-current="page"':''}><span class="num">${String(x.id).padStart(2,'0')}</span><span><strong>${escape(x.title.zh)}</strong><small lang="en">${escape(x.title.en)}</small></span></a>`).join('')}<div class="sidebar-progress"><span id="side-progress">${state.completed.length} / ${allSections.length} 单元 UNITS</span><div class="progress-track"><span id="side-progress-bar" style="width:${allSections.length?state.completed.length/allSections.length*100:0}%"></span></div></div></aside>`;}
  function chapter(c){
    if(!c)return `<div class="page-intro"><h1>找不到这一章 / Chapter not found</h1><p><a href="#/chapters">返回课程 / Back to chapters</a></p></div>`;
    state.lastChapter=c.id;save();
    return `<div class="learning-layout">${sidebar(c)}<article class="chapter-main"><header class="chapter-hero"><img src="${image(c.id)}" alt="${escape(credit(c.id)?.title)}"><div class="eyebrow">CHAPTER ${String(c.id).padStart(2,'0')} / 第 ${c.id} 章</div><h1>${title(c.title)}</h1><p class="chapter-subtitle">${escape(c.subtitle.zh)}<span lang="en">${escape(c.subtitle.en)}</span></p><div class="chapter-info"><span>${pageCount(c)} 页 PAGES · ${c.sections.length} 学习单元 UNITS · ${(c.quiz||[]).length} 自测题 PRACTICE</span><a href="${escape(credit(c.id)?.source||'#')}" target="_blank" rel="noopener noreferrer">图片 / IMAGE: ${escape(credit(c.id)?.creator || '')} ↗</a></div></header><div class="chapter-tabs" role="tablist" aria-label="学习方式 / Learning views">${[['learn','知识主线','LEARN'],['slides',hasOriginalSlides(c) ? '逐页对照' : '课件索引',hasOriginalSlides(c) ? 'SLIDES' : 'PAGE INDEX'],['terms','术语卡','TERMS'],['quiz','综合自测','PRACTICE']].map(([v,z,e])=>`<button role="tab" id="tab-${v}" aria-controls="chapter-inner" aria-selected="${route.tab===v}" class="${route.tab===v?'active':''}" data-action="tab" data-value="${v}">${z}<small>${e}</small></button>`).join('')}</div><div id="chapter-inner" class="chapter-content" role="tabpanel" aria-labelledby="tab-${['learn','slides','terms','quiz'].includes(route.tab)?route.tab:'learn'}">${chapterContent(c)}</div></article></div>`;
  }
  function chapterContent(c){
    let output='';
    if(route.tab==='slides')output=slidesTab(c);
    else if(route.tab==='terms')output=termsTab(c);
    else if(route.tab==='quiz')output=quizTab(c);
    else output=learnTab(c);
    return output+`<nav class="chapter-pager" aria-label="章节翻页 / Chapter navigation">${c.id>1?`<a href="#/chapter/${c.id-1}">← 上一章<small>PREVIOUS · ${escape(chapterMap[c.id-1]?.title.en)}</small></a>`:''}${c.id<8?`<a href="#/chapter/${c.id+1}">下一章 →<small>NEXT · ${escape(chapterMap[c.id+1]?.title.en)}</small></a>`:`<a href="#/review">进入综合复习 →<small>CONTINUE TO REVIEW</small></a>`}</nav>`;
  }
  function notesFor(c,pages){return [...(c.notes||[]),...(window.COURSE_SUPPLEMENTS?.[c.id]||[])].filter(n=>!pages || (n.pages||[]).some(p=>pages.includes(p)));}
  function noteMarkup(n){return `<aside class="source-note"><div class="note-label">${n.kind==='verified'?'补充辨析 / VERIFIED CLARIFICATION':'课程语境与原文提示 / SOURCE & CONTEXT'}</div><h4>${title(n.title)}</h4>${bi({zh:n.zh,en:n.en})}${n.references?.length?`<div style="margin-top:10px">${n.references.map(r=>`<a href="${escape(r.url)}" target="_blank" rel="noopener noreferrer">${escape(r.label)} ↗</a>`).join('')}</div>`:''}</aside>`;}
  // 只用本单元来源页对应的术语做高亮。每种语言最多标出一个词。
  function markConcept(text, terms, language) {
    const candidates = terms.map(term => term[language]).filter(word => word.length >= (language === 'zh' ? 2 : 3));
    for (const word of candidates.sort((a, b) => b.length - a.length)) {
      const pattern = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const match = language === 'en'
        ? new RegExp(`\\b${pattern}\\b`, 'i').exec(text)
        : text.includes(word) ? {0: word, index: text.indexOf(word)} : null;
      if (!match) continue;
      const start = match.index;
      return `${escape(text.slice(0, start))}<mark class="concept-mark">${escape(match[0])}</mark>${escape(text.slice(start + match[0].length))}`;
    }
    return escape(text);
  }

  function studyPair(value, terms) {
    return `<div class="pair"><div class="zh" lang="zh-CN">${markConcept(value.zh, terms, 'zh')}</div><div class="en" lang="en">${markConcept(value.en, terms, 'en')}</div></div>`;
  }
  function studyUnit(chapter, unit, index) {
    const pages = unit.pages || [];
    const relatedTerms = chapter.terms.filter(term => term.pages?.some(page => pages.includes(page)));
    const complete = state.completed.includes(unit.id);
    const sourceLabel = hasOriginalSlides(chapter)
      ? '展开原课件逐页对照 / Expand original slides' : '展开课件页码 / Expand page references';
    return `<details class="section-accordion" id="${escape(unit.id)}" ${index === 0 ? 'open' : ''}>
      <summary>
        <span class="module-number">${String(index + 1).padStart(2, '0')}</span>
        <div class="unit-heading">
          <h3 class="module-title">${title(unit.title)}</h3>
          <span class="unit-teaser"><span lang="zh-CN">${escape(unit.lead.zh)}</span><span lang="en">${escape(unit.lead.en)}</span></span>
        </div>
        <span class="expand-icon" aria-hidden="true"></span>
      </summary>
      <div class="section-body">
        <div class="section-lead">${bi(unit.lead)}</div>
        ${(unit.blocks || []).map(block => studyPair(block, relatedTerms)).join('')}
        ${unit.example ? `<div class="example-box"><div class="box-label">用一个例子想清楚 / A CONCRETE EXAMPLE</div>${bi(unit.example)}</div>` : ''}
        ${unit.takeaway ? `<div class="takeaway"><div class="box-label">记住这个关系 / TAKE THIS WITH YOU</div>${bi(unit.takeaway)}</div>` : ''}
        <details class="source-fold" data-source-fold="true" data-ch="${chapter.id}" data-pages="${pages.join(',')}">
          <summary><span>${sourceLabel} · P${pages.join(', ')}</span><span class="expand-icon" aria-hidden="true"></span></summary>
          <div class="source-pages-container"></div>
        </details>
        <div class="module-footer">
          <span class="source-tag">课件 / SOURCE: CH.${chapter.id} · P${pages.join(', ')}</span>
          <button class="complete-button ${complete ? 'completed' : ''}" data-action="complete" data-value="${escape(unit.id)}" aria-pressed="${complete}">${complete ? '✓ 已理解 / Understood' : '标记已理解 / Mark understood'}</button>
        </div>
      </div>
    </details>`;
  }

  function learnTab(chapter) {
    const units = chapter.sections.map((unit, index) => studyUnit(chapter, unit, index));
    const visualization = window.renderVisualization?.(chapter.id) || '';
    return `<div class="overview">${bi(chapter.overview, true)}</div>
      <div class="toolbar">
        <h2>知识主线<small>THE LEARNING PATH</small></h2>
        <div><button class="text-button" data-action="expand-all">全部展开 / Expand all</button>
          <button class="text-button" data-action="collapse-all">全部折叠 / Collapse all</button></div>
      </div>
      ${units.slice(0, 1).join('')}
      ${visualization}
      ${units.slice(1).join('')}
      <div class="notes-list"><h3>带着语境阅读 <small class="muted">READ WITH CONTEXT</small></h3>${notesFor(chapter).map(noteMarkup).join('')}</div>`;
  }
  function reader(c, pages, index = 0) {
    const safePages = pages.filter(n => Number.isInteger(n) && n >= 1 && n <= pageCount(c));
    if (!safePages.length) return '';
    index = Math.max(0, Math.min(Math.trunc(index) || 0, safePages.length - 1));
    const n = safePages[index];
    const page = c.pages[n - 1];
    const raw = window.SOURCE_PAGES?.[c.id]?.[n - 1];
    const hasSlide = Boolean(raw?.image && page?.zh);
    const heading = page?.title || {zh: `第 ${n} 页`, en: `Page ${n}`};
    const link = hasSlide
      ? {url: `originals/chapter-${c.id}.pdf#page=${n}`, label: '打开原 PDF / Original PDF'}
      : {url: sourceUrl(c.id, n), label: '在线查看原页与译文 / View the slide and translation'};
    const options = safePages.map((number, i) =>
      `<option value="${i}" ${i === index ? 'selected' : ''}>第 ${number} 页 / Page ${number}</option>`
    ).join('');
    let figure = '';
    let transcript = bi({
      zh: `第 ${c.id} 章 · PDF 第 ${n} 页。上方链接直达完整在线版的对应课件。`,
      en: `Chapter ${c.id} · PDF page ${n}. Use the link above to open this page in the full online edition.`,
    });
    if (hasSlide) {
      const english = [
        raw.en,
        page.enImageText && `[Image text transcription / 图中文字补录]\n${page.enImageText}`,
      ].filter(Boolean).join('\n\n') || 'This slide is image-based; see the original image above.';
      figure = `<button class="source-image-button" data-action="zoom" data-image="${escape(raw.image)}" aria-label="放大第 ${n} 页 / Enlarge page ${n}">
        <img src="${escape(raw.image)}" alt="第 ${c.id} 章第 ${n} 页原图 / Chapter ${c.id}, original slide ${n}" loading="lazy" decoding="async">
      </button>`;
      transcript = bi({zh: page.zh, en: english}, true);
    }
    return `<div class="slide-reader" data-ch="${c.id}" data-pages="${safePages.join(',')}" data-index="${index}">
      <div class="reader-toolbar">
        <div class="reader-controls">
          <button data-action="reader-prev" ${index === 0 ? 'disabled' : ''} aria-label="上一页 / Previous page">←</button>
          <select class="reader-page-select" aria-label="选择课件页 / Select slide">${options}</select>
          <button data-action="reader-next" ${index === safePages.length - 1 ? 'disabled' : ''} aria-label="下一页 / Next page">→</button>
        </div>
        <a href="${escape(link.url)}" target="_blank" rel="noopener noreferrer">${link.label} ↗</a>
      </div>
      ${figure}
      <div class="slide-transcript">
        <h3 class="slide-title">${title(heading)}</h3>
        ${transcript}
        ${notesFor(c, [n]).map(noteMarkup).join('')}
      </div>
    </div>`;
  }
  function slidesTab(c) {
    const pages = c.pages.map(p => p.n);
    const n = Math.min(pages.length, Math.max(1, Math.trunc(Number(route.target)) || 1));
    const full = hasOriginalSlides(c);
    const heading = full ? '逐页完整对照<small>THE COMPLETE SLIDE READER</small>' : '课件页码索引<small>SLIDE PAGE INDEX</small>';
    const description = full
      ? ['原图保留课件的图表与版式，正文可对照阅读。', 'Compare the English transcript with the Chinese translation below the original image.']
      : ['按 PDF 物理页码定位知识点对应的课件，点击链接在线查看原图、英文原文和中文译文。', 'Select a PDF page and follow the link to the original slide, English transcript and Chinese translation.'];
    const links = pages.map(p => `<button data-action="source-page" data-ch="${c.id}" data-page="${p}" class="${n === p ? 'active' : ''}" ${n === p ? 'aria-current="page"' : ''}>${p}</button>`).join('');
    return `<div class="toolbar" style="margin-top:0"><h2>${heading}</h2><span class="source-tag">PDF 物理页码 / PDF page numbers</span></div>
      <p class="quiz-intro">${description[0]}<br><span lang="en">${description[1]}</span></p>
      <div class="page-grid" aria-label="课件页码 / Slide pages">${links}</div>
      <div class="standalone-reader">${reader(c, pages, n - 1)}</div>`;
  }
  function termsTab(c){return `<div class="toolbar" style="margin-top:0"><h2>术语，连同它的意思<small>TERMS IN CONTEXT</small></h2><span class="source-tag">点击展开解释 / Click to reveal</span></div><div class="terms-grid">${c.terms.map(t=>`<details class="term-card" id="${escape(termId(c.id,t))}"><summary><span><strong lang="en">${escape(t.en)}</strong><small>${escape(t.zh)}</small></span><span class="expand-icon" aria-hidden="true"></span></summary><div class="term-body">${bi(t.note)}<span class="source-tag">CH.${c.id} · P${(t.pages||[]).join(', ')}</span></div></details>`).join('')}</div>`;}
  function showTerm(target) {
    const card = document.getElementById(target);
    if (!card?.matches('.term-card')) return;
    card.open = true;
    const summary = $('summary', card);
    summary.focus({preventScroll: true});
    summary.scrollIntoView({block: 'center', behavior: 'instant'});
  }
  function quizMarkup(q,index){
    const answer=state.answers[q.id];const answered=Number.isInteger(answer)&&answer>=0&&answer<(q.options?.length||0);const correct=answer===q.answer;
    return `<article class="quiz-card" id="${escape(q.id)}"><div class="question-head"><span>${String(index+1).padStart(2,'0')} / ${q.type==='reflection'?'思考题 REFLECTION':'选择题 MULTIPLE CHOICE'}</span><span>CH.${q.chapter||route.id} · P${(q.pages||[]).join(', ')}</span></div><h3>${bi(q.question)}</h3>${q.type==='reflection'?`<details class="quiz-reflection"><summary>展开参考要点 / Reveal suggested points ＋</summary>${bi(q.modelAnswer)}<div class="quiz-footer">开放讨论题，可有其他合理论证。 / Other well-supported answers are possible.</div></details>`:`<div class="quiz-options">${(q.options||[]).map((o,i)=>`<button class="quiz-option ${answered&&i===answer?'selected':''} ${answered&&i===q.answer?'correct':''} ${answered&&i===answer&&!correct?'incorrect':''}" data-action="answer" data-qid="${escape(q.id)}" data-value="${i}" aria-pressed="${answered&&i===answer}"><span class="option-letter">${String.fromCharCode(65+i)}</span><span class="option-copy"><span class="zh" lang="zh-CN">${escape(o.zh)}</span><span class="en" lang="en">${escape(o.en)}</span></span></button>`).join('')}</div>${answered?`<div class="quiz-feedback ${correct?'':'wrong'}" tabindex="-1"><strong>${correct?'✓ 理解正确 / Correct':'再辨析一下 / Let’s reconsider'} · ${String.fromCharCode(65+q.answer)}</strong>${bi(q.explanation)}<div class="quiz-footer"><button class="text-button" data-action="open-page" data-ch="${q.chapter||route.id}" data-page="${q.pages?.[0]||1}">回看来源页 / Revisit source ↗</button><button class="text-button" data-action="retry" data-qid="${escape(q.id)}">重新作答 / Try again</button></div></div>`:''}`}</article>`;
  }
  function quizIntro(){return `<p class="quiz-intro">依据课件自编的理解练习，包含补充解释；不是历年真题或缺失的原配套讲义。思考题提供参考要点。<br><span lang="en">Original practice based on the slides, with explanatory notes. These are not past exam papers or the missing original handouts. Reflection prompts include suggested points.</span></p>`;}
  function quizTab(c){return `<div class="toolbar" style="margin-top:0;margin-bottom:22px"><h2>理解之后，再测一次<small>TEST YOUR UNDERSTANDING</small></h2></div>${quizIntro()}${c.quiz.map((q,i)=>quizMarkup({...q,chapter:c.id},i)).join('')}`;}
  function filteredQuizzes(){let qs=allQuizzes.filter(q=>q.type!=='reflection');if(reviewFilter.chapter!=='all')qs=qs.filter(q=>q.chapter===Number(reviewFilter.chapter));if(reviewFilter.wrong)qs=qs.filter(q=>Number.isInteger(state.answers[q.id])&&state.answers[q.id]!==q.answer);if(reviewFilter.round)qs=qs.filter(q=>roundIds.includes(q.id));return qs;}
  function review(){const qs=filteredQuizzes();const attempted=qs.filter(q=>Number.isInteger(state.answers[q.id]));const correct=attempted.filter(q=>state.answers[q.id]===q.answer);return `<div class="page-intro"><div class="eyebrow">REVISIT & REFLECT / 综合复习</div><h1 class="bilingual-title">把概念，变成自己的理解。<small>Make the ideas your own.</small></h1><p>重新追问容易混淆的地方。选择一个章节，或抽取十题做一轮混合练习。<br><span lang="en">Revisit distinctions that are easy to miss. Choose a chapter or draw ten questions for a mixed round.</span></p></div><div class="review-page"><div class="review-filters"><label class="sr-only" for="review-chapter">选择章节 / Choose chapter</label><select id="review-chapter"><option value="all">全部章节 / All chapters</option>${chapters.map(c=>`<option value="${c.id}" ${reviewFilter.chapter===String(c.id)?'selected':''}>${c.id}. ${escape(c.title.zh)} / ${escape(c.title.en)}</option>`).join('')}</select><label><input type="checkbox" id="wrong-only" ${reviewFilter.wrong?'checked':''}> 仅错题 / Mistakes only</label><button class="button" data-action="new-round">随机十题 / Draw 10 ↗</button>${reviewFilter.round?'<button class="text-button" data-action="all-questions">显示全部 / Show all</button>':''}</div>${quizIntro()}<div class="round-summary" aria-live="polite">本组 ${qs.length} 题 · 已答 ${attempted.length} · 正确 ${correct.length} / ${qs.length} questions · ${attempted.length} answered · ${correct.length} correct</div>${qs.length?qs.map(quizMarkup).join(''):`<div class="empty-state">这里暂时没有题目 / No questions here<p>选择其他章节，或先完成几道题，再回看错题。<br>Choose another chapter, or answer some questions before reviewing mistakes.</p><a class="button" href="#/chapters">浏览章节 / Explore chapters ↗</a></div>`}</div>`;}
  function progress(){const answered=allQuizzes.filter(q=>q.type!=='reflection'&&Number.isInteger(state.answers[q.id]));const right=answered.filter(q=>state.answers[q.id]===q.answer);return `<div class="page-intro"><div class="eyebrow">YOUR LEARNING JOURNEY / 学习档案</div><h1 class="bilingual-title">一点一点，想得更清楚。<small>Clarity grows one idea at a time.</small></h1><p>主动标记已经理解的单元，留下自己的学习足迹。<br><span lang="en">Mark the units you understand and follow your progress.</span></p></div><div class="progress-page"><div class="stats-grid"><div class="stat"><strong><b data-count="${state.completed.length}">${state.completed.length}</b><span style="display:inline;font:normal 14px Arial;color:var(--muted)"> / ${allSections.length}</span></strong><span>已理解单元</span><small>UNITS UNDERSTOOD</small></div><div class="stat"><strong><b data-count="${answered.length}">${answered.length}</b><span style="display:inline;font:normal 14px Arial;color:var(--muted)"> / ${allQuizzes.filter(q=>q.type!=='reflection').length}</span></strong><span>已答选择题</span><small>QUESTIONS ANSWERED</small></div><div class="stat"><strong>${answered.length?`<b data-count="${Math.round(right.length/answered.length*100)}" data-suffix="%">${Math.round(right.length/answered.length*100)}%</b>`:'—'}</strong><span>当前答案正确率</span><small>ACCURACY OF SAVED ANSWERS</small></div></div>${chapters.map(c=>{const n=c.sections.filter(s=>state.completed.includes(s.id)).length;const tried=c.quiz.filter(q=>q.type!=='reflection'&&Number.isInteger(state.answers[q.id])).length;return `<a class="progress-row" href="#/chapter/${c.id}"><span class="num">${String(c.id).padStart(2,'0')}</span><span><h3>${escape(c.title.zh)}</h3><small lang="en">${escape(c.title.en)}</small><div class="progress-track"><span style="width:${n/c.sections.length*100}%"></span></div></span><span class="row-data">${n}/${c.sections.length} 单元<small>${tried} 题已答<br>QUESTIONS TRIED ↗</small></span></a>`}).join('')}<div class="progress-actions"><p>进度保存在当前设备的当前浏览器；本地版与在线版分别保存。换设备时，可导出学习档案，再在另一设备导入。<br><span lang="en">Progress stays in this browser on this device. Local and online copies store it separately. Export and import your learning file to transfer progress.</span></p><div><button class="button" data-action="export">导出学习档案 / Export progress ↓</button><button class="button" data-action="import">导入学习档案 / Import progress ↑</button></div></div></div>`;}
  function render(){
    previousRoute=route;route=parseRoute();if(!['learn','slides','terms','quiz'].includes(route.tab))route.tab='learn';
    const main = $('#main');
    const routeChanged = previousRoute.type !== route.type || previousRoute.id !== route.id;
    const tabChanged = !routeChanged && route.type === 'chapter' && previousRoute.tab !== route.tab;
    document.documentElement.dataset.view = route.type;
    $$('.main-nav a').forEach(a=>a.classList.toggle('active',route.type===a.getAttribute('href').split('/')[1]||(a.getAttribute('href')==='#/chapters'&&route.type==='chapter')));
    document.title=route.type==='chapter'&&chapterMap[route.id]?`${chapterMap[route.id].title.zh} · 观问 INQUIRY`:'观问 INQUIRY — 从一个问题开始';
    main.innerHTML=route.type==='home'?home():route.type==='chapters'?curriculum():route.type==='chapter'?chapter(chapterMap[route.id]):route.type==='review'?review():route.type==='progress'?progress():home();
    if(routeChanged){window.scrollTo({top:0,behavior:'instant'});}else if(route.type==='chapter'&&route.tab!==previousRoute.tab){$('.chapter-tabs')?.scrollIntoView({block:'start',behavior:'instant'});}
    if(route.type==='chapter'&&route.tab==='learn'&&route.target){const target=document.getElementById(route.target);if(target){target.open=true;requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'instant'}));}}
    window.inquiryHero?.mount($('.hero', main));
    window.inquiryHome?.mount(main);
    syncSettings();
    if(focusTab){$(`[role="tab"][data-value="${focusTab}"]`)?.focus();focusTab='';}
    if(route.type === 'chapter' && route.tab === 'terms' && route.target) showTerm(route.target);
    window.inquiryMotion?.mount(main, {routeChanged: Boolean(previousRoute.type) && routeChanged});
    window.inquiryChapter?.mount(main, {tabChanged});
    if (routeChanged && route.type === 'progress' && motionAllowed()) animateProgress(main);
    document.documentElement.classList.add('app-ready');
  }
  function animateProgress(main) {
    const digits = $$('[data-count]', main).filter(el => Number(el.dataset.count) > 0);
    if (!digits.length) return;
    const start = performance.now();
    function tick(now) {
      const progress = motionAllowed() ? Math.min(1, (now - start) / 580) : 1;
      for (const el of digits) {
        if (!el.isConnected) return;
        const value = Math.round(Number(el.dataset.count) * (1 - (1 - progress) ** 3));
        el.textContent = value + (el.dataset.suffix || '');
      }
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function changeRoute() {
    const next = parseRoute();
    const transitionNeeded = next.type !== route.type || next.id !== route.id;
    activeTransition?.skipTransition();
    if (!transitionNeeded || !motionAllowed() || !document.startViewTransition) {
      render();
      return;
    }

    // 只捕捉学习内容，导航与焦点控件留在原位。快速切换时跳过过期的动画。
    const requestedHash = location.hash;
    const transition = document.startViewTransition(() => {
      if (location.hash === requestedHash) render();
    });
    activeTransition = transition;
    transition.finished.catch(() => {}).finally(() => {
      if (activeTransition === transition) activeTransition = null;
    });
  }

  function openSources() {
    const courseLinks = (window.SOURCE_INVENTORY || []).map(item => `<p class="course-credit">
      <a href="${escape(sourceUrl(item.id))}" target="_blank" rel="noopener noreferrer">${escape(item.file)} ↗</a>
      · ${item.pages} 页 / pages
    </p>`).join('');
    const imageCredits = (window.IMAGE_CREDITS || []).map(art => `<div class="credit-item">
      <img src="${escape(art.image)}" alt="${escape(art.title)}" loading="lazy">
      <div>
        <strong>${escape(art.title)}</strong>
        <small>${escape(art.creator)}</small>
        <small>${art.licenseUrl
          ? `<a href="${escape(art.licenseUrl)}" target="_blank" rel="noopener noreferrer">${escape(art.license)}</a>`
          : escape(art.license)}</small>
        <small>${escape(art.modifications)}</small>
        <small>${escape(art.caption)}</small>
        <a href="${escape(art.source)}" target="_blank" rel="noopener noreferrer">查看图片来源 / Image source ↗</a>
      </div>
    </div>`).join('');
    const references = Object.values(window.COURSE_SUPPLEMENTS || {}).flat()
      .filter(note => note.references?.length)
      .map(note => `<p>${escape(note.title.zh)} / ${escape(note.title.en)}<br>
        ${note.references.map(ref => `<a href="${escape(ref.url)}" target="_blank" rel="noopener noreferrer">${escape(ref.label)} ↗</a>`).join(' · ')}
      </p>`).join('');
    $('#info-title').innerHTML = '内容与图像的来处<small>SOURCES & CREDITS</small>';
    $('#info-content').innerHTML = `<p>知识主线与自测依据八份课件编写。页码索引覆盖 285 页，链接通向含原图、英文原文和中文译文的完整在线版。<br>
      <span lang="en">The learning path and practice draw on eight course PDFs. The 285-page index links to the original images, English text and Chinese translations in the full online edition.</span></p>
      <h3>课件来源 / Course sources</h3>${courseLinks}
      <h3>图片来源 / Image credits</h3>${imageCredits}
      <h3>补充辨析来源 / Clarification sources</h3>${references}
      <p class="muted">大幅影像与排版参考影视飓风官网。<br><span lang="en">Visual reference for the large-scale imagery and typography.</span>
      <a href="https://www.ysjf.com/" target="_blank" rel="noopener noreferrer">影视飓风 / MEDIASTORM ↗</a></p>`;
    $('#info-dialog').showModal();
  }
  function search(query){
    const q=query.trim().toLocaleLowerCase();const box=$('#search-results');if(!q){box.innerHTML='<p class="muted">输入中英文关键词 / Enter a Chinese or English keyword.</p>';return;}
    const hits=[];
    for(const c of chapters){
      for(const s of c.sections){const text=[s.title.zh,s.title.en,s.lead.zh,s.lead.en,...s.blocks.flatMap(b=>[b.zh,b.en])].join(' ');if(text.toLocaleLowerCase().includes(q))hits.push({chapter:c.id,label:s.title.zh+' / '+s.title.en,kind:'知识点 / CONCEPT',text,hash:`#/chapter/${c.id}/learn/${s.id}`});}
      for(const t of c.terms){const text=[t.zh,t.en,t.note.zh,t.note.en].join(' ');if(text.toLocaleLowerCase().includes(q))hits.push({chapter:c.id,label:t.zh+' / '+t.en,kind:'术语 / TERM',text,hash:`#/chapter/${c.id}/terms/${termId(c.id,t)}`});}
      for (const page of c.pages) {
        const raw = window.SOURCE_PAGES?.[c.id]?.[page.n - 1];
        const text = [page.title.zh, page.title.en, page.zh, raw?.en, page.enImageText].filter(Boolean).join(' ');
        if (text.toLocaleLowerCase().includes(q)) {
          hits.push({
            chapter: c.id,
            label: `P${page.n} · ${page.title.zh} / ${page.title.en}`,
            kind: raw?.en ? '原课件 / SLIDE' : '课件页码 / PAGE INDEX',
            text,
            hash: `#/chapter/${c.id}/slides/${page.n}`,
          });
        }
      }
    }
    box.innerHTML=`<p class="search-count">找到 ${hits.length} 个结果，显示前 40 项 / ${hits.length} results, showing up to 40</p>${hits.slice(0,40).map(h=>{const offset=Math.max(0,h.text.toLocaleLowerCase().indexOf(q)-30);return `<button class="search-result" data-action="search-go" data-hash="${escape(h.hash)}"><small>CH.${h.chapter} · ${h.kind}</small><strong>${escape(h.label)}</strong><p>…${escape(h.text.slice(offset,offset+170))}…</p></button>`;}).join('')}${hits.length?'':'<p class="no-results">没有匹配结果。试试更短的关键词。<br>No matches. Try a shorter keyword.</p>'}`;
  }
  document.addEventListener('toggle',event=>{
    const d=event.target;if(d.matches?.('[data-source-fold]')&&d.open&&!d.dataset.loaded){const c=chapterMap[Number(d.dataset.ch)];const pages=d.dataset.pages.split(',').map(Number);$('.source-pages-container',d).innerHTML=reader(c,pages);d.dataset.loaded='true';}
  },true);
  document.addEventListener('click',event=>{
    if (event.target.closest('.brand') && route.type === 'home') {
      event.preventDefault();
      window.scrollTo({top:0,behavior:'instant'});
      return;
    }
    const b=event.target.closest('[data-action]');if(!b)return;const action=b.dataset.action;
    if(action==='skip'){event.preventDefault();$('#main').focus();$('#main').scrollIntoView({block:'start',behavior:'instant'});}
    else if(action==='search'){$('#search-dialog').showModal();$('#search-input').focus();}
    else if(action==='close-dialog')b.closest('dialog').close();
    else if(action==='sources')openSources();
    else if(action==='reading'){state.reading=!state.reading;save();syncSettings();notify(state.reading?'已切换舒适阅读':'已切换沉浸浏览',state.reading?'Reading mode enabled':'Cinematic mode enabled');}
    else if(action==='motion'){state.motion=!state.motion;save();syncSettings();}
    else if(action==='tab'){
      if (event.detail === 0) focusTab = b.dataset.value;
      navigate(`#/chapter/${route.id}/${b.dataset.value}`);
    }
    else if(action==='expand-all')$$('.section-accordion').forEach(d=>d.open=true);
    else if(action==='collapse-all')$$('.section-accordion').forEach(d=>d.open=false);
    else if(action==='complete'){
      const id=b.dataset.value;state.completed=state.completed.includes(id)?state.completed.filter(x=>x!==id):[...state.completed,id];save();const done=state.completed.includes(id);b.classList.toggle('completed',done);b.setAttribute('aria-pressed',String(done));b.textContent=done?'✓ 已理解 / Understood':'标记已理解 / Mark understood';if($('#side-progress'))$('#side-progress').textContent=`${state.completed.length} / ${allSections.length} 单元 UNITS`;if($('#side-progress-bar'))$('#side-progress-bar').style.width=`${state.completed.length/allSections.length*100}%`;
    }
    else if(action==='reader-prev'||action==='reader-next'){const r=b.closest('.slide-reader');const ix=Number(r.dataset.index)+(action==='reader-next'?1:-1);const pages=r.dataset.pages.split(',').map(Number);if(r.closest('.standalone-reader'))navigate(`#/chapter/${r.dataset.ch}/slides/${pages[ix]}`);else r.outerHTML=reader(chapterMap[Number(r.dataset.ch)],pages,ix);}
    else if(action==='zoom'){$('#image-dialog img').src=b.dataset.image;$('#image-dialog').showModal();}
    else if(action==='source-page'||action==='open-page'){b.closest('dialog')?.close();navigate(`#/chapter/${b.dataset.ch}/slides/${b.dataset.page}`);}
    else if(action==='answer'){
      const q=quizMap[b.dataset.qid];if(!q)return;state.answers[q.id]=Number(b.dataset.value);save();
      if(route.type==='review'&&reviewFilter.wrong&&state.answers[q.id]===q.answer){render();$('#info-title').innerHTML='✓ 已订正<small>CORRECTED · EXPLANATION</small>';$('#info-content').innerHTML=`<p>${bi(q.question)}</p><p>正确选项 / Correct option: ${String.fromCharCode(65+q.answer)}</p>${bi(q.explanation)}<p><button class="button" data-action="open-page" data-ch="${q.chapter}" data-page="${q.pages[0]}">回看来源 / Revisit source ↗</button></p><p class="muted">此题已从错题列表移出。 / This question has been removed from the mistakes list.</p>`;$('#info-dialog').showModal();}
      else {
        const card = b.closest('.quiz-card');
        const index = Number($('.question-head', card).textContent.trim().split('/')[0]) - 1;
        card.outerHTML = quizMarkup(q, Math.max(0, index));
        if (event.detail === 0) document.getElementById(q.id)?.querySelector('.quiz-feedback')?.focus();
        updateReviewSummary();
      }
    }
    else if(action==='retry'){const q=quizMap[b.dataset.qid];delete state.answers[q.id];save();if(route.type==='review'&&reviewFilter.wrong)render();else{const card=b.closest('.quiz-card');const idx=Number($('.question-head',card).textContent.trim().split('/')[0])-1;card.outerHTML=quizMarkup(q,Math.max(0,idx));updateReviewSummary();}}
    else if(action==='new-round'){const qs=allQuizzes.filter(q=>q.type!=='reflection'&&(reviewFilter.chapter==='all'||q.chapter===Number(reviewFilter.chapter))&&(!reviewFilter.wrong||(Number.isInteger(state.answers[q.id])&&state.answers[q.id]!==q.answer)));for(let i=qs.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[qs[i],qs[j]]=[qs[j],qs[i]];}roundIds=qs.slice(0,10).map(q=>q.id);reviewFilter.round=true;render();}
    else if(action==='all-questions'){reviewFilter.round=false;render();}
    else if(action==='search-go'){$('#search-dialog').close();navigate(b.dataset.hash);}
    else if(action==='export'){const blob=new Blob([JSON.stringify({app:'inquiry-3192',version:1,exportedAt:new Date().toISOString(),progress:state},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='观问_学习档案.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
    else if(action==='import')$('#import-progress').click();
    else if(action==='viz'&&window.inquiryVizAction)window.inquiryVizAction(b);
  });
  document.addEventListener('change',async event=>{
    const el=event.target;
    if(el.id==='theme'){state.theme=el.value;save();syncSettings();}
    else if(el.matches('.reader-page-select')){const r=el.closest('.slide-reader'),pages=r.dataset.pages.split(',').map(Number);if(r.closest('.standalone-reader'))navigate(`#/chapter/${r.dataset.ch}/slides/${pages[Number(el.value)]}`);else r.outerHTML=reader(chapterMap[Number(r.dataset.ch)],pages,Number(el.value));}
    else if(el.id==='review-chapter'){reviewFilter.chapter=el.value;reviewFilter.round=false;render();}
    else if(el.id==='wrong-only'){reviewFilter.wrong=el.checked;reviewFilter.round=false;render();}
    else if(el.matches('[data-viz-input]')&&window.inquiryVizInput)window.inquiryVizInput(el);
    else if(el.id==='import-progress'&&el.files[0]){
      try{if(el.files[0].size>2000000)throw Error('large');const imported=JSON.parse(await el.files[0].text());if(imported.app!=='inquiry-3192'||imported.version!==1||!imported.progress)throw Error('format');const p=imported.progress;if(!Array.isArray(p.completed)||!p.answers||typeof p.answers!=='object')throw Error('data');state.completed=[...new Set(p.completed.filter(id=>allSections.some(s=>s.id===id)))];state.answers={};for(const [id,n] of Object.entries(p.answers)){if(quizMap[id]&&Number.isInteger(n)&&n>=0&&n<4)state.answers[id]=n;}if(themes.includes(p.theme)||p.theme==='forest')state.theme=themeValue(p.theme);if(typeof p.reading==='boolean')state.reading=p.reading;if(typeof p.motion==='boolean')state.motion=p.motion;if(chapterMap[Number(p.lastChapter)])state.lastChapter=Number(p.lastChapter);save();render();notify('学习档案已导入','Progress imported');}catch{notify('文件格式不正确，未修改进度','Invalid file; progress unchanged');}el.value='';
    }
  });
  document.addEventListener('input',event=>{if(event.target.id==='search-input'){clearTimeout(searchTimer);searchTimer=setTimeout(()=>search(event.target.value),120);}else if(event.target.matches('[data-viz-input]')&&window.inquiryVizInput)window.inquiryVizInput(event.target);});
  function updateReviewSummary(){if(route.type!=='review'||!$('.round-summary'))return;const qs=filteredQuizzes(),tried=qs.filter(q=>Number.isInteger(state.answers[q.id])),correct=tried.filter(q=>state.answers[q.id]===q.answer);$('.round-summary').textContent=`本组 ${qs.length} 题 · 已答 ${tried.length} · 正确 ${correct.length} / ${qs.length} questions · ${tried.length} answered · ${correct.length} correct`;}
  document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();$('#search-dialog').showModal();$('#search-input').focus();}if(event.target.matches('[role="tab"]')&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const tabs=$$('[role="tab"]');let i=tabs.indexOf(event.target);i=event.key==='Home'?0:event.key==='End'?tabs.length-1:(i+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;focusTab=tabs[i].dataset.value;tabs[i].click();}});
  window.addEventListener('hashchange',changeRoute);
  reducedMotion.addEventListener('change', syncSettings);
  render();
})();
