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
