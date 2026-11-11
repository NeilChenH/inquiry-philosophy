# 开发记录 / Development log

这份提交历史按项目的实际开发步骤重建。每次提交收录该阶段的交付文件，提交日期为开源整理日期。

This history reconstructs the stages of the completed project. Each commit adds the files for one stage and is dated when the repository was prepared for publication.

## 01 确认需求 / Define the learning experience

用户要逐章学习，也要能快速复习和练习。界面与正文始终中英同屏。知识主线按概念重组，课件层按 PDF 物理页码定位。发现来源疑点时附上下文与补充辨析。网站支持离线学习，并提供跨设备无需登录的完整在线入口。

The interface and study content show both languages together. Learners can follow concepts in order, open their slide references, or review with practice questions. Context notes document ambiguous claims. The full site has both a local copy and a public, no-sign-in edition.

视觉采用电影感首页与四种主题，参考影视飓风官网的影像尺度和留白。舒适阅读与动效开关分别调整。考试题型尚未确认，因此按学习内容编写综合自测。 [影视飓风 / MEDIASTORM](https://www.ysjf.com/)

The cinematic homepage, four themes, reading mode and independent motion control support different study settings. The practice questions were written from the course material to test understanding.

## 02 整理课件与内容 / Map the course and write study material

按第 1 至第 8 章整理原 PDF，提取英文文本并生成原页图像，逐页翻译并核对重点图中文字。把概念、术语、自测、辨析和来源页码写入结构化章节文件。开源版发布知识主线、术语、自编题与页码索引。原课件与逐页译文通过完整学习站提供。

The original project extracted text, rendered each PDF page and checked translations against the slides. The open repository contains the authored study materials and page index. Each page points to its original and translation on the full course site.

| 章节 / Chapter | PDF 页数 / Pages |
| --- | ---: |
| 哲学导论 / Introduction to Philosophy | 41 |
| 人生哲学 / Philosophy of Life | 25 |
| 逻辑与方法论 / Logic and Methodology | 32 |
| 人的概念 / Concept of Man | 32 |
| 形而上学 / Metaphysics | 43 |
| 认识论 / Epistemology | 27 |
| 意识形态 / Ideology | 44 |
| 去殖民化 / Decolonisation | 41 |

文件 / Files · `dist/chapters/`, `dist/sources.js`, `dist/supplements.js`

## 03 查找与核对配图 / Source and credit chapter artwork

每章选择与概念相关的图片。开源版保留六张配图，并选用 ESA/Hubble 提供的超深场版本和丹迪食盐进军纪念馆照片。网站的图片来源面板与仓库的图片署名文件列出来源、作者和许可。

Six covers carry over from the full site. The open edition uses ESA/Hubble’s version of the deep field and a Salt March memorial photo for Chapters 5 and 8. The site credits and repository attribution file list their sources and licenses.

文件 / Files · `dist/assets/`, [图片署名 / Image credits](IMAGE-CREDITS.md)

## 04 实现页面与交互 / Build the interface and interactions

以静态 HTML、CSS 和 JavaScript 实现电影感首页、四种主题与舒适阅读模式。支持按知识点展开、按页码切换来源、术语卡、双语搜索与八章互动图解。复习区支持章节筛选、随机十题和错题订正。学习进度存于浏览器，可导入和导出。

The buildless site includes expandable sections and references, bilingual search, eight interactive visualizations, themed reading, review rounds and browser-local progress with import and export.

文件 / Files · `dist/index.html`, `dist/styles.css`, `dist/app.js`, `dist/visualizations.js`, `打开学习站.html`

## 05 验收 / Verify

核对数据结构、覆盖量、页码链接和图片署名。使用仓库中的验证脚本检查下载后的副本。

Check bilingual coverage, page references and image credits with the included verifier.

```sh
node tools/verify.cjs
```

## 06 发布 / Publish

完整在线版用于逐页阅读。GitHub 公开仓库用于下载、运行和阅读源码，以及查看分阶段提交历史。 [完整在线版 / Full course](https://philosophy-3192-cinema-20261111.chencanhongcch.chatgpt.site/) · [开源提交 / Commits](https://github.com/NeilChenH/inquiry-philosophy/commits/main/)

The full site hosts the original-slide reader. The GitHub repository publishes the open edition, its run instructions and this development history.
