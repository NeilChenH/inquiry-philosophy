# 开源版验收 / Open edition verification

## 自动检查 / Automated checks

运行 `node tools/verify.cjs`，核对 8 章、285 页索引、66 个学习单元、200 个术语、80 道选择题、16 道思考题和 8 张配图。检查静态入口引用、双语字段、页码范围、题目选项和图片署名。

The verifier checks the static entry points, bilingual content, source page references, practice data and image credits. All checks passed for the published source.

## 浏览器实测 / Browser checks

- 首页展示八章。第一章的来源面板可展开、切换第 3 和第 4 页，再折叠。 / The first chapter’s reference panel opened, switched between pages 3 and 4, and closed.
- 独立索引中，第 41 页和第 40 页随前后翻页更新地址、选中状态和来源链接。 / The page 41 and page 40 selections updated the URL, active state and source link.
- “演绎”和“deduction”均返回结果。选择题作答后显示解析并可返回来源页。 / Both Chinese and English searches returned results. Answering a question exposed feedback and a source-page link.
- 纸白主题、舒适阅读和关闭动效可同时启用。来源面板显示八条配图署名。 / Paper theme, reading mode and reduced motion worked together. The source panel displayed eight image credits.
- 浏览器打开索引第 3 页的完整在线链接，显示对应课件图像、英文原文和中文译文。 / The full-site link for page 3 displayed the matching slide, English text and Chinese translation.

实测使用本机 HTTP 预览。双击入口通过静态检查核对了目标路径。

The interactive checks used a local HTTP preview. The local HTML launcher's target was checked separately.

## 动效升级实测 / Motion upgrade

- 首页滚动时触发卡片入场，顶部进度线随位置变化。首屏离开视口后，粒子停止绘制。 / The cards revealed on scroll and the header tracked scroll position. Hero particles paused outside the viewport.
- 切换到第二章时触发短入场。打开课件索引并翻至第 2 页后，在线来源链接仍指向第二章第 2 页。 / Chapter 2 entered with a short animation. The source link still matched the selected chapter and page.
- 舒适阅读和页脚动效开关都可暂停效果。窄屏预览没有出现横向溢出。 / Reading mode and the footer motion control both paused the effects. The narrow viewport had no horizontal overflow.

## 首次访问实测 / First-visit walkthrough

用两个独立的本机预览入口测试完整本地版和开源版。从默认影院黑首页开始，使用空白进度。

Both editions were exercised from a fresh browser origin, starting at the homepage with the default Cinema theme and empty progress.

- 开源版的「进入学习」直达第一章。展开知识单元的课件索引后，来源链接对应第一章第 3 页。完整本地版从八章目录进入第一章，可以读到第 3 页原图和中英正文。 / The primary link opened Chapter 1 and its reference pointed to page 3. The full local edition displayed the original slide and both languages for that page.
- 两版都能通过「演绎推理」搜索结果直接打开并聚焦第三章对应术语卡。键盘作答后，焦点移到解析。 / Both editions opened and focused the matching Deduction card. A keyboard answer moved focus to the explanation.
- 开源版标记 1 个单元并作答 1 题后，刷新仍显示相同进度。完整本地版可抽出十题并从零作答开始。 / The open edition retained one completed unit and one answer after a reload. The full edition started a ten-question round with no answers.
- 桌面首屏验证了光环和磁吸，按钮点击范围保持稳定。390 像素窄屏的两项首页入口均完整可用。舒适阅读停用首屏指针效果。 / Desktop pointer feedback kept both links in place. Both homepage links fit the 390px viewport. Reading mode disabled the pointer effects.

## 五幕电影版首次访问 / Five-act first visit

- 使用独立浏览入口从默认影院黑首页开始。确认八扇章门都显示初始进度，滚动后第一扇门点亮，今日思考提交后可以重读。 / The fresh Cinema homepage showed eight doors with empty progress. Scrolling activated the first door, and the submitted question could be reread.
- 从「走入哲学」进入第一章，键盘展开和收起知识单元，切换到术语卡后焦点保留在标签。第三页索引匹配完整站的原页入口。 / Keyboard disclosure and tab focus worked in Chapter 1. The page 3 link matched the full reader.
- 搜索演绎推理直达术语。归纳节点切换到乌鸦例子。JTB 从 0 项切到 3 项后点亮知识节点，取消一项后回到 2 项。 / Search opened Deduction. The induction node showed its crow example. JTB moved from zero to three conditions and back to two.
- 标记一个单元并作答一题，刷新后仍为 1/66 与 1/80。390 像素窗口无横向溢出，首屏入口可点击。深夜蓝和舒适阅读可以同时开启。 / Progress survived reload. The 390px viewport fit the homepage link. Midnight and reading mode could be enabled together.

## GSAP 升级首次访问 / GSAP first-visit checks

- 用空白 Chrome 会话打开 HTTP 预览及断网本地入口。桌面和 390 像素窄屏均看到首屏时间轴播放并停在清晰状态，键盘可通过「走入哲学」进入双语章节。 / Fresh desktop and 390px sessions exercised the opening timeline, keyboard entry and offline launcher.
- 逐一滚过八扇章门，核对当前高亮及桌面配图视差。学习路径的 SVG 偏移逐帧变化，今日思考可重读且不写入学习进度。 / All eight doors activated in order, with parallax on wide screens. The path drew progressively and the reflection remained in the page.
- 切章、关闭动效、开启舒适阅读或启用系统减少动态效果后，首页触发器和行内动效样式得到清理。返回首页时重新建立当前视口需要的触发器。 / Navigation and all three motion controls cleared the active homepage motion. Returning home restored the appropriate triggers.
- 在 320 至 1440 像素的八种宽度核对页头、双语正文、四主题和舒适阅读。键盘可收展知识单元、切换学习标签、答题并阅读解析，刷新后保留学习进度。 / Eight widths covered header controls, bilingual reading, all themes and reading mode. Keyboard navigation, quiz feedback and progress persistence passed.
- 阻断 GSAP 文件后，本地站仍能通过原生动效高亮章门，进入章节并展开双语单元。 / With GSAP scripts blocked, the native fallback still highlighted doors and supported chapter navigation and keyboard disclosures.
- 同步完整本地版后，从断网的 HTML 入口打开第一章第 3 页，核对原图、双语内容和翻页，并从来源面板打开本地 PDF。完整课件通过 3,339 项校验，324 个受保护文件的哈希与同步前一致。 / The full local edition passed an offline walkthrough covering the slide image, both languages, page navigation and a local PDF. The full course passed 3,339 validation checks and all 324 protected files retained their hashes.

## 内容改进首次访问 / Content update first visit

- 两版均从断网本地入口在全新 Chrome 会话实测桌面和 390px 窗口。通过中英搜索打开 Sejahtera 术语卡，第 1、4、8 章主译名一致，能查看词典释义、课程用法及 NEP／FPK 对照。 / Fresh offline sessions verified bilingual search, consistent glossary labels, the dictionary and course senses, and the NEP/FPK cross-reference.
- 96 张章节题卡及综合复习的 80 道选择题均显示双语自编标记，两道辨析题另有类别标记。键盘作答、解析、刷新和重试通过，已有答案与学习进度可继续使用。 / All chapter and review cards show bilingual authorship labels. Both clarification questions have an additional label. Keyboard answers, feedback, reload, retry and existing progress passed.
- 第 7、8 章各三项目标可用键盘或触屏打开对应知识单元及第 2 页。完整版断网显示原图、双语课件正文及对应 PDF 链接，开源版显示对应页码索引。 / Each chapter's three outcomes link to the matching study units and slide 2. Keyboard and touch navigation passed. The full edition loaded the original slide and both languages offline, and the open edition selected the matching index page.
- 两版核对第 5 章第 18 页与第 7 章第 38 页的编号提示，以及第 7 章第 25 页图卡小结。同步前后，304 项课件、原图、来源数据及逐页内容校验值一致。 / Both editions showed the course code notes and the note about the Chapter 7 figure cards. All 304 source assets and page data checksums matched the baseline.

## Test 1 测验专区 / Test 1 practice

- 对照两份原 PDF，六月卷 20 道题的英文题干、组合陈述、选项顺序和答案一致。十月卷复做及数据检查通过，前四章题量为 5／4／5／6。 / The June text and answer key matched the original PDFs. An independent walkthrough checked the October answers and 5/4/5/6 chapter distribution.
- 两版在全新 Chrome 的桌面与 390px 窗口断网实测。覆盖两卷独立计时、换页与刷新、键盘改选、手机跳转至第 20 题、未答提醒、超时交卷、重做及直接打开双语解析。原有学习进度保持可用。 / Both editions passed fresh offline desktop and mobile walkthroughs covering the two timers, navigation, reloads, keyboard and touch, manual and automatic submission, retakes, bilingual review and existing course progress.

## 学习档案迁移 / Learning archive transfer

全新桌面和 390px 浏览器会话使用两个独立测试网址，验证一次导出、导入可恢复阅读、练习和两套已交卷测验。旧格式仍可导入，已开始的测验及较新的交卷记录得到保留，错误文件不会导入部分进度。两版本地文件断网也可导出新版档案。

Fresh desktop and 390px sessions used two distinct test origins to verify transfer of chapter progress, practice answers and submitted records for both papers. Legacy files import, active and newer attempts are retained, and invalid files are rejected before storing any changes. Offline export works in both editions.
