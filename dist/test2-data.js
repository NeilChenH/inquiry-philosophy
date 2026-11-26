(() => {
  'use strict';

  const text = (zh, en) => ({zh, en});
  const point = (id, zh, en) => ({id, zh, en});
  const fitted = (score, zh, en) => ({score, zh, en});

  // 采分点衡量个人作答。命题拟合度采用独立的比较标准，依据两份 Test 1 和课件记录。
  const questions = [
    {
      id: 'materialism-idealism', chapter: 5, pages: [13, 14, 16, 18, 19],
      topic: text('唯物主义与唯心主义', 'Materialism and idealism'),
      stem: text(
        '唯物主义与唯心主义的主要区别是什么？给一个简单例子说明区别。',
        'What is the main difference between materialism and idealism? Give one simple example to illustrate the difference.'
      ),
      model: text(
        '唯物主义认为物理实在是基础。唯心主义赋予心灵或观念基础地位。比如，唯物主义者把桌子理解为物质对象，贝克莱则通过被感知的性质来理解这张桌子。',
        'Materialism treats physical reality as fundamental. Idealism gives mind or ideas a fundamental role. For example, a materialist explains a desk as a physical object, while Berkeley understands it through perceived qualities.'
      ),
      points: [
        point('material', '说明唯物主义以物质或物理实在为基础。', 'State that matter or physical reality is fundamental in materialism.'),
        point('ideal', '说明唯心主义赋予心灵或观念基础地位。', 'State that idealism gives mind or ideas a fundamental role.'),
        point('example', '用同一物件或情境展示两种立场怎样作出不同解释。', 'Use the same object or situation to show how the two views explain it differently.')
      ],
      choice: text(
        '第 19 页直接并列两种立场。两者对实在基础的不同回答，适合考查能否区分一组相近的课件术语。',
        'Page 19 compares the two views directly. Their different accounts of what is fundamental make a focused test of conceptual distinction.'
      ),
      design: text(
        '六月 Q13 要从数个描述中辨认演绎推理，十月 Q9 要同时检查演绎和归纳。这里把「主要区别」放在句首，再用十月 Q12 式的例子检验理解。用同一对象举例即可写清楚。',
        'June Q13 asks students to identify a definition of deduction, while October Q9 checks two kinds of reasoning together. This item asks for the main difference up front, then uses an example like October Q12. One object is enough to illustrate the difference.'
      ),
      commonMiss: text(
        '只说两者都在研究实在，仍缺少两边各自的主张。例子要指出同一个对象怎样被解释。日常所说的追求金钱和这里讨论的唯物主义属于不同问题。',
        'Saying that both views study reality leaves both core claims unstated. Show how each view explains the same object. Everyday concern with money is a different use of the word materialism.'
      ),
      fit: {
        wording: fitted(6, '十月 Q1、Q13 都直接要求找主要目的或核心特征，本题用 main difference 保持同样的聚焦。', 'October Q1 and Q13 directly ask for a central purpose or feature. “Main difference” keeps the same focus.'),
        structure: fitted(6, '六月 Q13、十月 Q9 支持区分相近概念，十月 Q12 支持用一个实例判断。', 'June Q13 and October Q9 support distinguishing related concepts. October Q12 supports using one example.'),
        coverage: fitted(5, '第 5 章第 19 页直接比较两种立场，第 14、16、18 页补足定义及差异。', 'Chapter 5, p. 19 directly compares both views, with definitions and distinctions on pp. 14, 16 and 18.'),
        brevity: fitted(3, '两句定义和一句对照例子即可展示三个采分点。', 'Two definition sentences and one comparison example can cover the three points.')
      }
    },
    {
      id: 'reason-and-experience', chapter: 6, pages: [12, 13, 15, 17, 26],
      topic: text('理性主义与经验主义', 'Rationalism and empiricism'),
      stem: text(
        '理性主义和经验主义各自强调什么知识来源？举一个通过经验获得知识的日常例子。',
        'What source of knowledge does rationalism emphasise, and what does empiricism emphasise? Give one everyday example of gaining knowledge through experience.'
      ),
      model: text(
        '理性主义强调理性。经验主义强调经验和观察。比如，我可以看温度计来知道教室里有多暖。',
        'Rationalism emphasises reason. Empiricism emphasises experience and observation. I can learn how warm a classroom is by reading a thermometer.'
      ),
      points: [
        point('reason', '说明理性主义强调理性、推导或先验根据。', 'Identify reason, inference or a priori grounds as a focus of rationalism.'),
        point('experience', '说明经验主义强调经验或观察。', 'Identify experience or observation as a focus of empiricism.'),
        point('example', '给出一个日常观察或测量，并说出靠它知道什么。', 'Give an everyday observation or measurement and say what it lets someone know.')
      ],
      choice: text(
        '比较两者是第 26 页的第一道章末题。第 17 页的对照图也把知识来源放在首要位置。',
        'Comparing the two views is the first end-of-chapter question on p. 26. The chart on p. 17 also foregrounds sources of knowledge.'
      ),
      design: text(
        '六月 Q3、Q18 用框架限定回答，十月 Q9 逐条检验两种推理的区别。这里各写一个侧重点，再用一个可观察的日常例子说明经验如何支持判断。',
        'June Q3 and Q18 frame the question within a stated perspective. October Q9 checks distinctions between two kinds of reasoning. Here learners state one emphasis for each view and use an everyday observation to show how experience supports a claim.'
      ),
      commonMiss: text(
        '只写「理性」与「经验」时，记得把词分别配给对应的理论。举例时要说从观察中得到了哪项信息。两种思想都可以在探究时使用推理。',
        'Match each source to its theory when using the words “reason” and “experience”. In the example, name the information the observation gives you. Both approaches can use reasoning in inquiry.'
      ),
      fit: {
        wording: fitted(6, '六月 Q3、Q18 先界定框架，再问核心内容。这里也限定两种观点与知识来源。', 'June Q3 and Q18 name a framework before asking for its core content. This question likewise names two views and one dimension to compare.'),
        structure: fitted(6, '十月 Q9 检查成对区别，第 6 章第 26 页直接要求比较并举例。', 'October Q9 checks a paired distinction. Chapter 6, p. 26 explicitly asks for comparison and examples.'),
        coverage: fitted(5, '第 13、15、17 页提供两种知识来源的对照，第 26 页列作复习题。', 'Pages 13, 15 and 17 contrast the sources of knowledge, and p. 26 includes a review question on them.'),
        brevity: fitted(3, '两项知识来源各一句，另外一句写观察及获得的信息。', 'One sentence per source and one short measurement example cover the task.')
      }
    },
    {
      id: 'correspondence', chapter: 6, pages: [19, 20, 21, 26],
      topic: text('真理符合论', 'Correspondence theory of truth'),
      stem: text(
        '一则通知写着「阅览室现在开放」。当时阅览室实际关闭。根据真理符合论，这句陈述为真还是为假？简述理由。',
        'A notice says, “The reading room is open now.” At that moment, the room is closed. According to the correspondence theory of truth, is the statement true or false? Explain briefly.'
      ),
      model: text(
        '真理符合论认为，陈述与事实相符时才为真。阅览室实际关闭。这句陈述为假，因为它说阅览室开放。',
        'The correspondence theory says a statement is true when it matches the facts. The reading room is closed. The statement is false because it says the room is open.'
      ),
      points: [
        point('criterion', '说明符合论用陈述与实际事实是否相符判断真假。', 'Explain that correspondence judges truth by whether a statement matches the facts.'),
        point('fact', '识别题目给出的实际事实是阅览室关闭。', 'Identify that the room is actually closed.'),
        point('judgment', '判定陈述为假，并把判断连到「开放」和「关闭」的不一致。', 'Judge the statement false and connect that judgement to the conflict between “open” and “closed”.')
      ],
      choice: text(
        '第 6 章第 21 页用天气给出符合论例子，第 26 页明确把真理论列为复习题。另出一题可同时覆盖知识来源和真理标准。',
        'Chapter 6, p. 21 illustrates correspondence through a weather case, and p. 26 lists truth theories for review. A second item in this chapter covers a truth criterion alongside sources of knowledge.'
      ),
      design: text(
        '十月 Q8 用同理心和应对压力给出可观察线索，十月 Q12 让学生从实例识别归纳。这里明确给出陈述与事实，要求写出判断及原因，可用一句话说明为何不相符。',
        'October Q8 supplies observable clues about empathy and stress, and Q12 asks learners to recognise induction from an example. Here the statement and fact are given, so a brief explanation can show exactly why they fail to match.'
      ),
      commonMiss: text(
        '只写 false 会漏掉判准和理由。要核对题干中的「当时」，避免用其他营业时段推断现在的真假。',
        '“False” alone leaves the criterion and reason unstated. Pay attention to the time in the question. Opening at a different hour would address a different proposition.'
      ),
      fit: {
        wording: fitted(6, '六月 Q11、Q12 先交代材料再问结论，十月 Q8 用同样的顺序给出观察线索。', 'June Q11 and Q12 give material before the question, and October Q8 uses the same order for case clues.'),
        structure: fitted(6, '十月 Q8、Q12 都要求用给定线索完成一次概念判断。本题把选项换成一句理由。', 'October Q8 and Q12 use given clues for a single conceptual judgement. This item elicits a short reason for the judgement.'),
        coverage: fitted(5, '第 20 页给出判准，第 21 页有等价的陈述与事实对照，第 26 页要求举例。', 'Page 20 gives the criterion, p. 21 supplies an equivalent claim-and-fact pattern, and p. 26 asks for examples.'),
        brevity: fitted(3, '事实已给出，学习者写判准、事实和判断即可。', 'The fact is provided; the learner writes a criterion, the fact and a judgement.')
      }
    },
    {
      id: 'relativism-rule', chapter: 7, pages: [2, 29, 30, 31, 32, 43],
      topic: text('后现代相对主义', 'Postmodern relativism'),
      stem: text(
        '两个小组为课堂定规则。一组习惯有问题就发言，另一组习惯等老师点名。这个情境体现了后现代相对主义的哪项特点？简述两组为什么可能难以达成一致。',
        'Two groups are setting a classroom rule. One group speaks up when they have a question. The other waits to be called on. What feature of postmodern relativism does this illustrate? Briefly explain why the groups may struggle to agree.'
      ),
      model: text(
        '判断可能依赖某个文化或思想框架的标准。一组习惯直接发言，另一组认为应该等老师点名。因为他们判断什么做法合适时采用的标准不同，所以可能难以同意一条共同规则。',
        'Judgements can depend on the standards of a culture or framework. One group sees speaking up as appropriate, while the other expects students to wait. Their different standards can make it hard to agree on one rule.'
      ),
      points: [
        point('feature', '说明判断可能相对于文化、视角或思想框架。', 'State that a judgement can be relative to a culture, perspective or framework.'),
        point('challenge', '指出一项实际挑战，例如不同群体对公平有不同标准。', 'Identify one practical challenge, such as different standards of fairness.'),
        point('reason', '把这种差异与共同规则难以协商或适用联系起来。', 'Explain how the difference can make agreement on or application of a shared rule difficult.')
      ],
      choice: text(
        '第 2 页把相对主义的特点和影响都列为学习目标，第 43 页把两者放在同一章末问答中。',
        'Page 2 lists the features and effects of relativism as learning aims. The end-of-chapter prompt on p. 43 puts those aims together.'
      ),
      design: text(
        '十月 Q13 只问核心特征，Q8 用可观察的行为让考生辨认概念。本题先给出两种发言习惯，再问它们体现哪项特点及怎样影响协商。考生可以直接使用题干线索作答。',
        'October Q13 asks for one central feature, and Q8 uses observable behaviour to identify a concept. This question gives two speaking customs and asks which feature they illustrate and how they affect agreement. The learner can reason from the given clues.'
      ),
      commonMiss: text(
        '只写「大家有不同意见」还没有说明相对主义的特点。补出判断依据随框架变化，以及这种变化为何使共用标准更难形成。用「可能」准确描述这个挑战。',
        'Saying that people disagree leaves the relativist feature unstated. State how grounds for judgement can vary by framework and connect that variation to reaching a shared standard. “Can” reflects the scope of the challenge.'
      ),
      fit: {
        wording: fitted(6, '十月 Q13 的 primary characteristic 只问核心特征，本题也只问一项。', 'October Q13 asks for a primary characteristic. This item likewise asks for a single main feature.'),
        structure: fitted(6, '十月 Q8 从行为线索辨认一个维度，六月 Q12 从一段行为识别谬误。本题也用给定行为辨认特点。第 43 页要求联系挑战，简答用一句话说明题干里两种标准怎样影响协商。', 'October Q8 identifies a dimension from behaviour, and June Q12 identifies a fallacy from a response. This item also uses given behaviour to identify a concept. The review prompt on p. 43 asks about challenges, here expressed as one consequence of the given differences.'),
        coverage: fitted(5, '第 2 页学习目标和第 43 页题目直接并列特点与影响，第 29–32 页提供定义与辨析。', 'The aims on p. 2 and the prompt on p. 43 explicitly pair features and effects. Pages 29–32 give the definition and distinctions.'),
        brevity: fitted(3, '答案用三句话完成识别特点、提取案例线索和解释一项困难。', 'Three sentences identify the feature, cite the case clue and explain one difficulty.')
      }
    },
    {
      id: 'sejahtera-river', chapter: 8, pages: [2, 32, 33, 34, 35, 36, 37, 38, 39, 40],
      topic: text('本土智慧与 Sejahtera', 'Local wisdom and Sejahtera'),
      stem: text(
        '一个社区希望保护河岸。举一个居民运用本土智慧参与保护的例子，说明它如何体现 Sejahtera 整体福祉。',
        'A community wants to protect a riverbank. Give one example of how residents can use local wisdom to help. Explain how this reflects Sejahtera.'
      ),
      model: text(
        '居民知道哪些本地植物适合在河边种植。社区可以用这些知识在修复河岸时选种。这些植物有助于减少河岸侵蚀，保护附近房屋，也给野生动物提供栖息处，体现了 Sejahtera。',
        'Residents know which native plants grow well by the river. They can use this knowledge to choose plants for the riverbank. These plants help protect nearby homes from erosion and give wildlife a place to live, which reflects Sejahtera.'
      ),
      points: [
        point('wisdom', '指出一项当地居民积累的具体知识，例如河水水位或本地植物。', 'Name one specific kind of locally developed knowledge, such as water levels or native plants.'),
        point('action', '给出一项依靠该知识的实际护河行动。', 'Give one practical action that uses that knowledge to care for the river.'),
        point('wellbeing', '说明行动如何同时有益于社区和自然，联系 Sejahtera 整体福祉。', 'Explain how the action benefits the community and nature and reflects Sejahtera.')
      ],
      choice: text(
        '第 2 页把 Sejahtera 的去殖民化路线列为学习目标。第 34–35 页讨论本土智慧和生态做法，第 36–39 页连回人与自然、社区福祉。',
        'Page 2 lists Sejahtera’s approach to decolonisation as an aim. Pages 34–35 discuss local wisdom and ecological practice. Pages 36–39 connect nature with community well-being.'
      ),
      design: text(
        '六月 Q9 检查 Sejahtera 的外部维度，十月 Q4 改为选出达到整体福祉的方法。本题沿用这个变化，要求从一个地方知识出发，提出行动并说明它的好处。',
        'June Q9 checks external dimensions of Sejahtera, and October Q4 asks about methods for achieving holistic well-being. This question continues that shift by asking learners to use local knowledge in one action and state its benefit.'
      ),
      commonMiss: text(
        '「请居民参与清理」说明了做法，还需要写居民知道什么、知识怎么改变行动。结尾至少把一个社区好处和一个生态好处联系起来。',
        '“Ask residents to help clean up” gives an action. Add what residents know and how that knowledge guides the action. Connect one benefit for the community and one for the river ecosystem.'
      ),
      fit: {
        wording: fitted(6, '六月 Q5 与十月 Q5 都把方法放入日常公共生活，本题用一个短社区场景提出任务。', 'June Q5 and October Q5 situate an idea in civic life. Here one short community case sets up the task.'),
        structure: fitted(3, '十月 Q4 支持问福祉的做法。自行说明本土知识、行动和后果的联系属于迁移。', 'October Q4 supports asking about a method for well-being. Explaining links between local knowledge, action and effects is an additional transfer.'),
        coverage: fitted(5, '第 8 章第 34–35 页明确提出本土智慧与可持续行动，第 36–39 页给出整体福祉关系。', 'Chapter 8, pp. 34–35 explicitly connect local wisdom with sustainability. Pages 36–39 develop holistic well-being.'),
        brevity: fitted(3, '场景给足背景，一句写知识、一句写行动、一句写两类好处。', 'The situation supplies the context. One sentence each about knowledge, action and effects is sufficient.')
      }
    }
  ];

  // 原卷题型和题名由 Test 1 数据读取，这里只记录逐题观察，顺序与印刷题号一致。
  const auditRow = (demand, zh, en) => ({demand, observation: text(zh, en)});
  const audit = {
    june: [
      auditRow('definition', '词源后留空，要求把 sophia 与智慧相联。', 'Uses a blank after an etymological cue to identify sophia as wisdom.'),
      auditRow('distinction', '给出研究描述，用 best characterizes 问属哪一哲学分支。', 'Gives a description and asks which field best characterises it.'),
      auditRow('definition', '先限定教育哲学框架，再问完整四维。', 'Names the education framework first, then asks for all four dimensions.'),
      auditRow('purpose', '用 CONTRARY 反问一项与国家原则目标冲突的说法。', 'Uses CONTRARY to test which claim falls outside the aims of Rukun Negara.'),
      auditRow('scenario', '用职业和公共生活中的多个情境来辨识应用伦理。', 'Uses several workplace and civic situations to test applied ethics.'),
      auditRow('purpose', '交代当代问题与旧框架的冲突，再问哪些条件支持新兴哲学。', 'Gives a reason for new philosophies to arise and asks which conditions support it.'),
      auditRow('definition', 'ACCURATELY 限定要选最完整的国家教育哲学表述。', 'ACCURATELY signals the need for the best statement of the education philosophy.'),
      auditRow('distinction', '用 form、harmony 和 beauty 等线索区分美学与其他分支。', 'Uses cues such as form, harmony and beauty to distinguish aesthetics.'),
      auditRow('distinction', '用 EXTERNAL 限定只选福祉的外部维度。', 'Uses EXTERNAL to restrict a set of well-being dimensions.'),
      auditRow('distinction', '用引述和术语判断理性人观对应的传统，分类范围需看课件。', 'Uses a quotation and terms to classify a view of humanity. The category depends on the course context.'),
      auditRow('scenario', '列出两个前提，用 MUST 判断哪项结论必然成立。', 'Gives two premises and uses MUST to ask what follows necessarily.'),
      auditRow('scenario', '以超速司机转移警员注意的例子识别谬误。', 'Asks students to identify a fallacy in a stopped driver’s reply.'),
      auditRow('distinction', '用 best defines 让学生在相近描述中辨认演绎推理。', 'Uses best defines to distinguish deduction from nearby descriptions.'),
      auditRow('scenario', '给出多个短论证，选择能体现滑坡的一项。', 'Asks which brief argument exemplifies a slippery slope.'),
      auditRow('definition', '直接问何种推理错误构成逻辑谬误。', 'Asks directly what constitutes a logical fallacy.'),
      auditRow('definition', '用填空辨识人类心智的主要能力。', 'Uses a blank to identify a principal capacity of the human mind.'),
      auditRow('definition', '以准确表述为要求，识别课件里的基督教人观。', 'Uses accuracy wording to identify a Christian account of humanity taught in class.'),
      auditRow('purpose', '明示 Islamic worldview，直接问人在地上的首要职责。', 'Names the Islamic worldview and asks for a primary responsibility on Earth.'),
      auditRow('distinction', '用 BEST 限定对现代西方人观特征的组合判断。', 'Uses BEST to ask for a combination of modern Western characteristics.'),
      auditRow('purpose', '以填空问比较不同文化人观有什么用。', 'Uses a blank to ask why comparing views of humanity across cultures matters.')
    ],
    actual: [
      auditRow('purpose', '直接问国家原则的 main purpose。', 'Directly asks for the main purpose of Rukun Negara.'),
      auditRow('distinction', '从国家治理的对象区分实践哲学与其他分支。', 'Uses governance to distinguish practical philosophy from other fields.'),
      auditRow('definition', '逐条检查教育哲学目标，注意题干称 National Education Policy。', 'Checks education aims statement by statement. The stem uses National Education Policy.'),
      auditRow('scenario', '从多个实际做法中辨认可实现整体福祉的方法。', 'Distinguishes practical methods that support holistic well-being.'),
      auditRow('scenario', '用 best demonstrates 从职业场景中找到应用伦理。', 'Uses best demonstrates to connect a professional case to applied ethics.'),
      auditRow('purpose', '用 Why 问学习哲学对思想和社会的价值。', 'Uses Why to ask about the value of philosophy for thought and society.'),
      auditRow('definition', '直接问宪法至上原则意味着什么。', 'Directly asks what constitutional supremacy implies.'),
      auditRow('scenario', '用同理心与应付考场压力定位 PESI 的一个维度。', 'Uses empathy and coping with exam stress to identify a PESI component.'),
      auditRow('distinction', '用准确描述关系来考演绎/归纳的方向和确定性。', 'Asks students to distinguish direction and certainty in deduction and induction.'),
      auditRow('distinction', '从数项描述中辨认课件采用的西方哲学方法特征。', 'Uses several statements to identify features of Western methods described in class.'),
      auditRow('purpose', '用 primary goal 聚焦启发式推理的首要目标。', 'Uses primary goal to isolate the central aim of heuristic reasoning.'),
      auditRow('scenario', '给出若干小例子辨认归纳推理。', 'Uses a set of examples to test recognition of induction.'),
      auditRow('definition', '用 primary characteristic 问溯因推理的关键特征。', 'Uses primary characteristic to ask what abduction centrally does.'),
      auditRow('definition', '用 best describes 选择 ad hominem 的合适定义。', 'Uses best describes to identify the definition of ad hominem.'),
      auditRow('scenario', '用论证实例区别草率概括与相近谬误。', 'Distinguishes hasty generalisation from related fallacies through examples.'),
      auditRow('distinction', '识别课件中的西方人观特征，选项缺少可核对的完整组合。', 'Tests identification of Western views in the slides. The options lack a complete supported combination.'),
      auditRow('distinction', '把东方思想传统与解脱或和谐的目标词配对。', 'Matches Eastern traditions with terms for liberation or harmony.'),
      auditRow('distinction', '从组合中区分伊斯兰人观的职责与不合适的表述。', 'Distinguishes duties in an Islamic account of humanity from unsuitable statements.'),
      auditRow('purpose', '询问哲学对文化和社会有何更广意义。', 'Asks about the broader importance of philosophy to culture and society.'),
      auditRow('definition', '限定佛教语境，问人的本质与苦、欲求、解脱的关联。', 'Sets a Buddhist context and asks which account links humanity, suffering, desire and liberation.')
    ]
  };

  const comparisons = [
    {
      title: text('应用伦理从多情境变成单情境', 'Applied ethics moves from several cases to one'),
      june: [5], actual: [5],
      body: text(
        '六月要求检查多个职业或公共情境。十月改用 best demonstrates，要求挑一个最吻合的职业行为。核心仍是从行为中认出伦理原则。简答题若用一个社区场景，应请学生指出行动如何体现原则。',
        'June asks learners to check several professional or civic cases. October uses best demonstrates to select one suitable professional action. Both test recognition of a principle through behaviour. In a short answer, ask learners to connect one action to a stated principle.'
      )
    },
    {
      title: text('推理概念换材料继续考', 'Reasoning concepts return with new material'),
      june: [11, 13], actual: [9, 12],
      body: text(
        '六月 Q11 用两个前提检查必然性，Q13 直接辨认演绎定义。十月 Q9 把演绎与归纳并列，Q12 用新的例子辨认归纳。迁移给第 6 章时，让学习者用一句理由说出判断的关键区别。',
        'June Q11 tests necessity from two premises and Q13 asks for the definition of deduction. October Q9 contrasts deduction with induction and Q12 tests induction through examples. In Chapter 6, a short answer should state the difference that supports its judgement.'
      )
    },
    {
      title: text('Sejahtera 从维度表转向做法', 'Sejahtera moves from dimensions to practice'),
      june: [9], actual: [4],
      body: text(
        '六月考外部维度的归类，十月考哪些做法能达成整体福祉。两题都让学生把部分与框架相联。模拟卷第 5 题用河岸保护情境，把「行动」与「社区和生态都受益」配起来。',
        'June classifies external dimensions. October asks which methods lead to holistic well-being. Both link a part to the wider framework. Mock Q5 links a riverbank action with benefits to people and nature.'
      )
    },
    {
      title: text('国家原则可问目标，也可缩到单一原则', 'A national framework can be tested at two scales'),
      june: [4], actual: [1, 7],
      body: text(
        '六月用 CONTRARY 划定国家原则目标的边界。十月分别直接问主要目的和宪法至上含义。两种粒度都常见于卷面。第 4 题取较小的粒度，请学生具体说明一项特点。',
        'June uses CONTRARY to test the boundary of the national aims. October asks directly about the overall aim and constitutional supremacy. The mock takes the narrower scale in Q4 by asking for one feature.'
      )
    },
    {
      title: text('教育哲学从四维记忆变成线索匹配', 'Education moves from recalling dimensions to matching clues'),
      june: [3, 7], actual: [3, 8],
      body: text(
        '六月问四维全称和教育哲学的核心含义。十月再查教育目标，并用同理心与压力管理考情绪维度。第 3 题采用同样的线索设计，把「通知说开放」和「当时关闭」摆在题干。',
        'June asks for all four dimensions and the core education philosophy. October revisits the aims and uses empathy and stress as clues to the emotional dimension. Mock Q3 provides similarly explicit clues: an open-room notice and the room’s actual closure.'
      )
    }
  ];

  const dimensions = [
    {id: 'wording', max: 6, title: text('措辞', 'Wording'),
      standard: text('核心提问清楚，能从原卷的问法或语气定位依据。', 'The command is clear and can be traced to wording or tone in the papers.')},
    {id: 'structure', max: 6, title: text('提问结构', 'Question structure'),
      standard: text('保留有据的辨识、比较或应用任务，步骤适合简答。', 'The item preserves a supported recognition, comparison or application task suited to a short answer.')},
    {id: 'coverage', max: 5, title: text('课件选点', 'Course coverage'),
      standard: text('主考点可在范围内的课件页直接核对，最好有学习目标或章末题支持。', 'The tested idea is directly supported by an in-scope slide, preferably a learning outcome or review prompt.')},
    {id: 'brevity', max: 3, title: text('难度与短答', 'Difficulty and brevity'),
      standard: text('三个采分点可用两三句简单英文答出，无需额外背景。', 'Two or three simple English sentences can cover the three points without outside knowledge.')}
  ];

  const revision = {
    question: 'relativism-rule',
    draft: text(
      '论述后现代相对主义思维的特征，以及它给社会带来的挑战。',
      'Elaborate on the characteristics of postmodern relativist thinking and the challenges it poses to society.'
    ),
    scores: {wording: 3, structure: 3, coverage: 5, brevity: 0},
    baselineScores: {wording: 6, structure: 3, coverage: 5, brevity: 3},
    reason: text(
      '初稿的章末依据直接，但范围太宽，无法知道要写几项特点和后果。复核十月 Q13 围绕一个主要特征的句式后，收窄为一项特点和一个规则协商情境。解释影响这一步仍是向主观题的迁移。',
      'The draft was grounded in the review prompt but left the number of features and effects open. October Q13 centres on one feature, so the revised item asks for one feature and one shared-rule consequence. Explaining the consequence remains a short-answer adaptation.'
    ),
    improvement: text(
      '扩库版再次比照十月 Q8 和六月 Q12，加入可直接使用的两种课堂发言习惯。学生从给定行为辨认概念，再解释协商困难。第 4 题提问结构从 3 分升到 6 分，四项权重沿用原量表。',
      'The bank revision uses the observable clues of October Q8 and June Q12. Two classroom customs let learners identify the feature and explain one obstacle to agreement. Q4’s structure moves from 3 to 6 on the same four-part rubric.'
    )
  };

  const rounds = [
    {id: '1', title: text('核心概念与生活应用', 'Core concepts and everyday applications'), questions},
    ...window.inquiryTest2MoreRounds({text, point, fitted})
  ];
  window.INQUIRY_TEST2 = {rounds, audit, comparisons, dimensions, revision};
})();
