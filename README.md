# 观问 INQUIRY

观问是一个中英双语哲学学习站。八章包含 66 个学习单元、200 个术语、八组互动图解、80 道选择题和 16 道思考题。阅读时可展开知识点与课件页码，切换四种主题、舒适阅读和动效。

INQUIRY is an interactive bilingual philosophy learning site. Its eight chapters include 66 learning units, 200 terms, eight visualizations, 80 multiple-choice questions and 16 reflection prompts. Expand concepts and page references, switch between four themes and enable a focused reading mode.

## 打开学习站 / Open the site

1. 在 GitHub 点 **Code → Download ZIP**，解压后双击 `打开学习站.html` 或 `dist/index.html`。页面、练习和内置配图可离线使用。
2. 打开知识点下方的 **展开课件页码** 或章节的 **课件索引**，选择 PDF 物理页码后点链接，即可在完整在线版查看原页、英文原文与中文译文。在线版无需登录。 [完整在线学习站](https://inquiry-philosophy.pages.dev/)
3. 从 **学习档案** 导出或导入 JSON，可以跨设备或网址转移章节阅读进度、练习答案和已交卷的 Test 1 成绩。

1. Select **Code → Download ZIP**, extract it and open `打开学习站.html` or `dist/index.html`. Lessons, practice and artwork work offline.
2. Select a PDF page from **Expand page references** or **Page Index** and follow the link to the original slide, English text and Chinese translation. [Full online site](https://inquiry-philosophy.pages.dev/)
3. Open **Progress** to transfer chapter progress, practice answers and submitted Test 1 results between devices or site addresses as a JSON file.

## Test 1 测验专区 / Test 1 practice

在 **综合复习 → Test 1 测验专区** 打开六月学期原卷或十月自编模拟卷。每套卷各有 30 分钟计时和独立的双语答案解析。测验尝试保存在当前浏览器。

Open **Review → Test 1 practice** for the June Trimester paper or the site-authored October mock. Each paper has its own 30-minute timer and bilingual answer review. Attempts stay in the current browser.

## 源码与开发记录 / Source and development

- `dist/index.html` 是静态入口。界面与交互由 `styles.css`、`app.js` 和 `visualizations.js` 提供。 / The static entry point loads the styles, application and interactive diagrams.
- `dist/chapters/` 提供双语讲解、术语、练习和索引。页码与八份课件的 285 个物理页一一对应。 / Chapter data includes the study material and references to all 285 source pages.
- `node tools/verify.cjs` 核验章节、双语内容、页码和资源。 / Run the verifier with Node.js.
- 按需求、内容整理、实现、发布及后续升级查看历史。 / Follow the original release and later improvements in the development log and commit history. [开发记录 / Development log](docs/DEVELOPMENT.md) · [提交历史 / Commits](https://github.com/NeilChenH/inquiry-philosophy/commits/main/)

## 许可 / License

项目原创代码、文档与自编学习材料采用 MIT 许可证。章节配图遵循图片署名所列许可。课件 PDF、课件截图及逐页译文在完整学习站中提供。 / The MIT license covers the original code, documentation and authored learning materials. Image terms are listed separately. The lecture PDFs, slide images and full translations are available on the full course site.

六月卷题目与答案表来源为 Universiti Tunku Abdul Rahman 的 MPU3192 June 2026 Trimester Test 1，保留原作品署名。解析与十月模拟卷由本站编写。 / The June questions and answer key are credited to Universiti Tunku Abdul Rahman, MPU3192 June 2026 Trimester Test 1. The explanations and the October mock are authored for this site.

[MIT License](LICENSE) · [图片署名 / Image credits](docs/IMAGE-CREDITS.md) · [GSAP 许可 / GSAP license](dist/assets/vendor/gsap-3.13.0/NOTICE.md)


## 2026 十月真题与复盘 / October actual paper and review

在 Test 1 测验专区选择「2026 十月学期真题」。20 题采用本站核实的参考答案，Q16 暂缓计分，参考满分 19 分。30 分钟是本站练习时长。第 8 题保留原印字母 A、B、D、C，按具体选项判分。

个人纸卷作答从「纸卷作答复盘」导入 JSON 草稿，逐题确认后生成个人参考复盘。姓名、学号、原照片及个人草稿归档在网站仓库外的本地资料目录。学习档案版本 3 同时备份章节、已交卷计时测验和纸卷复盘，继续支持版本 1、2。

Open **October 2026 Test 1** in the test hub. The site-verified reference key scores 19 questions, with Q16 under review. The 30-minute limit is a site practice duration. Q8 retains the printed A, B, D, C labels. Use **Paper review** to import and confirm a private answer draft. Progress archive v3 transfers chapters, submitted timed tests and separate paper reviews, and accepts v1/v2 archives.
