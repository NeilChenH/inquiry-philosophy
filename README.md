# 观问 INQUIRY

观问是一个中英双语哲学学习站。八章包含 66 个学习单元、200 个术语、八组互动图解、80 道选择题和 16 道思考题。阅读时可展开知识点与课件页码，切换四种主题、舒适阅读和动效。

INQUIRY is an interactive bilingual philosophy learning site. Its eight chapters include 66 learning units, 200 terms, eight visualizations, 80 multiple-choice questions and 16 reflection prompts. Expand concepts and page references, switch between four themes and enable a focused reading mode.

## 打开学习站 / Open the site

1. 在 GitHub 点 **Code → Download ZIP**，解压后双击 `打开学习站.html` 或 `dist/index.html`。页面、练习和内置配图可离线使用。
2. 打开知识点下方的 **展开课件页码** 或章节的 **课件索引**，选择 PDF 物理页码后点链接，即可在完整在线版查看原页、英文原文与中文译文。在线版无需登录。 [完整在线学习站](https://philosophy-3192-cinema-20261111.chencanhongcch.chatgpt.site/)
3. 从 **学习档案** 导出或导入 JSON，可以在设备或站点之间转移答题和阅读进度。

1. Select **Code → Download ZIP**, extract it and open `打开学习站.html` or `dist/index.html`. Lessons, practice and artwork work offline.
2. Select a PDF page from **Expand page references** or **Page Index** and follow the link to the original slide, English text and Chinese translation. [Full online site](https://philosophy-3192-cinema-20261111.chencanhongcch.chatgpt.site/)
3. Open **Progress** to export or import your learning progress as JSON.

## 源码与开发记录 / Source and development

- `dist/index.html` 是静态入口。界面与交互由 `styles.css`、`app.js` 和 `visualizations.js` 提供。 / The static entry point loads the styles, application and interactive diagrams.
- `dist/chapters/` 提供双语讲解、术语、练习和索引。页码与八份课件的 285 个物理页一一对应。 / Chapter data includes the study material and references to all 285 source pages.
- `node tools/verify.cjs` 核验章节、双语内容、页码和资源。 / Run the verifier with Node.js.
- 按需求、内容整理、实现、发布及后续升级查看历史。 / Follow the original release and later improvements in the development log and commit history. [开发记录 / Development log](docs/DEVELOPMENT.md) · [提交历史 / Commits](https://github.com/NeilChenH/inquiry-philosophy/commits/main/)

## 许可 / License

项目原创代码、文档与自编学习材料采用 MIT 许可证。章节配图遵循图片署名所列许可。课件 PDF、课件截图及逐页译文在完整学习站中提供。 / The MIT license covers the original code, documentation and authored learning materials. Image terms are listed separately. The lecture PDFs, slide images and full translations are available on the full course site.

[MIT License](LICENSE) · [图片署名 / Image credits](docs/IMAGE-CREDITS.md) · [GSAP 许可 / GSAP license](dist/assets/vendor/gsap-3.13.0/NOTICE.md)
