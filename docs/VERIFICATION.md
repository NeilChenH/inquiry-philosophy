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
