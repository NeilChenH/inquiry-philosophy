// 第二至第五轮各自成卷，首轮题目与命题分析保存在 test2-data.js。
window.inquiryTest2MoreRounds = ({text, point, fitted}) => [
  {
    id: '2',
    title: text('核心概念与制度变化', 'Core concepts and institutional change'),
    questions: [
      {
        id: 'choice-and-causes', chapter: 5, pages: [32, 36],
        topic: text('决定论与自由意志', 'Determinism and free will'),
        stem: text(
          '按课件的对照，决定论和自由意志观点怎样理解人的决定？以一名学生选课为例，展示两种看法。',
          'According to the chapter, how do determinism and the free-will view explain decisions? Use a student’s choice of course to show both views.'
        ),
        model: text(
          '决定论认为，重要的决定由先前的原因决定。课件中的自由意志观点认为，人能够自主作决定。例如，决定论会从学生过去的经历等原因解释选课，自由意志观点则着重于学生自己决定选哪门课。',
          'Determinism says that earlier causes determine major decisions. The free-will view presented here says that people can make their own decisions. For example, a determinist traces a student’s course choice to earlier causes such as past experiences, while the free-will view stresses the student’s power to decide.'
        ),
        points: [
          point('determined', '指出决定论认为，先前的原因决定人的决定。', 'State that determinism treats decisions as determined by earlier causes.'),
          point('free-choice', '指出课件所列的自由意志观点强调自主选择。', 'State that the free-will view presented in the chapter emphasises the ability to choose.'),
          point('shared-case', '用同一次选课说明两种看法怎样解释决定。', 'Apply both views to the same course choice.')
        ],
        choice: text(
          '第 32、36 页直接讨论决定、自由与责任。选课让同一个日常决定可以从两种立场解释。',
          'Pages 32 and 36 directly discuss decisions, freedom and responsibility. Choosing a course lets students explain one everyday decision from both positions.'
        ),
        design: text(
          '六月 Q18 先限定判断所依据的观点，十月 Q9 再把相近概念放在同一题里对照。这题先给比较框架，再用一个日常决定说明区别。',
          'June Q18 specifies the perspective to use, and October Q9 puts related concepts side by side. This item sets the scope and uses one everyday decision to show the distinction.'
        ),
        commonMiss: text(
          '只说「有自由」会漏掉决定论对原因的解释。举例时，用同一个选课决定说明各自关注什么。',
          'Saying only that people are free leaves out the determinist account of causes. Use the same course choice to show what each view emphasises.'
        ),
        fit: {
          wording: fitted(6, '六月 Q18 先指定答题视角。本题也在开头限定按本章的对照回答。', 'June Q18 frames the answer within a stated perspective. This item specifies the chapter’s comparison up front.'),
          structure: fitted(6, '十月 Q9 支持两类概念对照，十月 Q12 支持用一个具体例子检验区分。', 'October Q9 supports comparing two categories, and October Q12 supports testing the distinction with a concrete example.'),
          coverage: fitted(5, '第 5 章第 32、36 页均直接讨论决定论、自由和个人责任。', 'Chapter 5, pp. 32 and 36 directly discuss determinism, freedom and personal responsibility.'),
          brevity: fitted(3, '两句概念和一句同例对照就能覆盖全部采分点。', 'Two definition sentences and one shared example cover all three points.')
        }
      },
      {
        id: 'three-conditions-of-knowledge', chapter: 6, pages: [6, 7],
        topic: text('有根据的真信念', 'Justified true belief'),
        stem: text(
          '丽娜读了可靠的图书馆通知，相信图书馆六点关闭，图书馆确实六点关闭。根据有根据的真信念模型，情境中的哪些信息分别体现信念、证成和真？',
          'Lina reads a reliable library notice and believes the library closes at six. It really closes at six. In the justified true belief model, which facts show belief, justification and truth?'
        ),
        model: text(
          '丽娜相信图书馆六点关闭，这体现信念。可靠的通知为这个信念提供证成。图书馆确实六点关闭，这体现真。',
          'Lina’s belief is that the library closes at six. The reliable notice gives her justification for that belief. The library actually closes at six, so the belief is true.'
        ),
        points: [
          point('belief', '把丽娜相信六点关门对应到信念。', 'Match belief to Lina thinking that the library closes at six.'),
          point('justification', '把可靠通知对应到证成或相信的根据。', 'Match justification to the reliable notice as evidence for the belief.'),
          point('truth', '把实际在六点关门对应到真。', 'Match truth to the library actually closing at six.')
        ],
        choice: text(
          '第 6、7 页给出知识的三个条件。这个例子呈现同一命题的三个不同方面，可以检查学习者能否区分相信、根据与实际情况。',
          'Pages 6 and 7 present the three conditions of knowledge. This example makes it possible to distinguish belief, evidence and what actually happens for one claim.'
        ),
        design: text(
          '六月 Q3 要按已知框架认出组成部分，十月 Q8 要从学生行为中认出对应维度。这里先给三个清晰事实，再把事实与三个条件逐一配对。',
          'June Q3 asks which parts belong to a stated framework, and October Q8 asks which dimension appears in a student’s behaviour. This item gives three facts to match with three conditions.'
        ),
        commonMiss: text(
          '「她看过通知」说明她有什么根据。要解释真，须另写图书馆实际六点关闭。',
          'Reading the notice supplies evidence for Lina’s belief. For truth, separately identify the actual closing time.'
        ),
        fit: {
          wording: fitted(6, '与十月 Q8 同样采用「给定情境，哪项信息对应这个概念」的直接问法。', 'Like October Q8, the item gives a situation and asks which information matches a named concept.'),
          structure: fitted(6, '六月 Q3 支持从指定框架判断多个要素，十月 Q17 支持逐项配对。', 'June Q3 supports identifying elements in a stated framework, and October Q17 supports matching concepts one by one.'),
          coverage: fitted(5, '第 6 章第 6、7 页明确列出信念、证成和真三个条件。', 'Chapter 6, pp. 6 and 7 identify belief, justification and truth as conditions.'),
          brevity: fitted(3, '每句匹配一个条件，共三句。', 'Three short sentences match one condition each.')
        }
      },
      {
        id: 'coherence-timetable', chapter: 6, pages: [20, 21, 26],
        topic: text('真理融贯论', 'Coherence theory of truth'),
        stem: text(
          '课表写着十点上课，另有通知说课程长一小时。「课程十一点结束」与这些陈述融贯吗？简述融贯论的判断标准，再应用于这个例子。',
          'A timetable says a class starts at ten. A notice says it lasts one hour. Does the claim that it ends at eleven fit those statements? State the coherence test and apply it here.'
        ),
        model: text(
          '融贯论看一项主张能否与相关陈述一致。课表说十点开始，通知说课程长一小时。因此，十一点结束与两条陈述一致。',
          'Coherence checks whether a claim fits with related statements. The timetable gives a ten o’clock start and the notice gives a length of one hour. So an eleven o’clock finish fits both statements.'
        ),
        points: [
          point('criterion', '写出融贯论以相关陈述之间相容、一致为标准。', 'State that coherence looks for consistency with related statements.'),
          point('premises', '用到十点开始和课程长一小时两个条件。', 'Use both the ten o’clock start and the one-hour length.'),
          point('application', '说明十一点结束与两条陈述相容。', 'Explain why an eleven o’clock finish is consistent with the two statements.')
        ],
        choice: text(
          '第 20、21 页用陈述之间的关联解释融贯，第 26 页要求给真理论举例。课表的陈述之间是否一致可以直接检查。',
          'Pages 20 and 21 explain coherence through relationships among statements, and p. 26 asks for examples of truth theories. The timetable provides a simple consistency check.'
        ),
        design: text(
          '六月 Q11 先给两条前提，再问结论。沿用这个形式，让学生根据资料判断陈述是否融贯，并说明使用的标准。',
          'June Q11 gives two premises before asking for a conclusion. This item uses the same order and asks students to name the criterion they apply.'
        ),
        commonMiss: text(
          '只写「是」遗漏判断依据。这里检查的是陈述之间的一致性，即使它们相容，课程的实际时间仍可另行核实。',
          'A bare yes leaves out the reason. This exercise checks consistency among statements. The actual class time can be checked separately.'
        ),
        fit: {
          wording: fitted(6, '六月 Q11 以短事实引出结论判断，本题在简答中保留这一直接问法。', 'June Q11 leads from short factual premises to a judgement. This item preserves that direct prompt in short-answer form.'),
          structure: fitted(6, '六月 Q11 用多条给定信息形成一个结论，十月 Q8 在情境中找证据。本题结合两条现成信息完成一次判断。', 'June Q11 uses given premises for one conclusion, and October Q8 identifies clues in a situation. This item joins two stated facts for one judgement.'),
          coverage: fitted(5, '第 6 章第 20、21 页给出概念和例子，第 26 页要求用实例表述真理论。', 'Chapter 6, pp. 20 and 21 cover the idea and an example, and p. 26 asks for an illustration of a truth theory.'),
          brevity: fitted(3, '标准、材料和判断各一句即可。', 'One sentence each for the criterion, evidence and judgement is enough.')
        }
      },
      {
        id: 'secularism-library', chapter: 7, pages: [2, 7, 8, 9, 10],
        topic: text('世俗主义与公共规则', 'Secularism and public rules'),
        stem: text(
          '按课件所讲的世俗主义，在制定公共规则时，宗教权威和政府机构有什么区别？市议会按公共程序决定图书馆开放时间。请指出谁定规则，以及居民能否保留自己的宗教信仰。',
          'According to the chapter, what distinction does secularism make between religious authority and government? A council sets library hours through a civil process. Say who makes the public rule and whether residents may keep their own beliefs.'
        ),
        model: text(
          '世俗主义把宗教权威与公共治理分开。这里由市议会按公共程序定规则。居民仍可以拥有自己的宗教信仰。',
          'Secularism separates religious authority from public government. Here the council makes the rule through a civil process. Residents may still hold their own religious beliefs.'
        ),
        points: [
          point('distinction', '指出世俗主义将宗教权威与政府的公共治理分开。', 'Identify the separation of religious authority and public government.'),
          point('council', '指出这个例子的公共规则由市议会制定。', 'Identify the council as the body that sets the rule in this case.'),
          point('belief', '说明这种公共规则仍允许居民保有个人宗教信仰。', 'Explain that residents may still keep their personal religious beliefs.')
        ],
        choice: text(
          '第 2 页把世俗主义列为本章内容，第 7–10 页讨论世俗主义及公共治理。本题用日常公共服务放大这一项制度区分。',
          'Page 2 lists secularism in the chapter scope, and pp. 7–10 discuss secularism and public governance. A routine public service illustrates that institutional distinction.'
        ),
        design: text(
          '十月 Q7 要把国家原则解释成公共治理的含义。这里同样先点明原则，用简短情境确认学生能把公共机构的规则与个人信仰分清楚。',
          'October Q7 asks what a stated principle means for public government. This item likewise names the principle and uses a short case to distinguish a public rule from personal beliefs.'
        ),
        commonMiss: text(
          '只写「宗教与政治分开」遗漏例子里的决策者。也要说明居民自己的信仰仍属于个人层面。',
          'Writing only that religion and politics are separate misses who decides in the example. Also identify where personal belief fits.'
        ),
        fit: {
          wording: fitted(6, '六月 Q18 指定观点，十月 Q7 直接询问制度原则的含义。本题同时保留两种措辞特征。', 'June Q18 specifies a perspective, and October Q7 directly asks what an institutional principle means. The prompt retains both features.'),
          structure: fitted(6, '十月 Q7 从原则判断公共权力归属，同卷 Q5 将概念落在一个清楚的实际行为上。', 'October Q7 links a principle to public authority, and Q5 in the same paper applies a concept to a clear action.'),
          coverage: fitted(5, '第 7 章第 2、7–10 页支持在本章的世俗主义框架中区分宗教权威与公共治理。', 'Chapter 7, pp. 2 and 7–10 ground the distinction between religious authority and public government in the chapter’s account of secularism.'),
          brevity: fitted(3, '一条原则与两条情境判断可各写一句。', 'One principle and two observations take one short sentence each.')
        }
      },
      {
        id: 'colonisation-and-decolonisation', chapter: 8, pages: [2, 4, 5],
        topic: text('殖民与去殖民化', 'Colonisation and decolonisation'),
        stem: text(
          '某地曾受外国政权统治，后来恢复自治，也重新审查殖民时期留下的学校规则。哪个阶段体现殖民，哪个阶段体现政治上的去殖民化？为什么去殖民化还可能包括修改这些规则？',
          'A territory was ruled by a foreign power. It later governs itself and reviews school rules left from that period. Which stage shows colonisation, which shows political decolonisation, and why might decolonisation also include changing these rules?'
        ),
        model: text(
          '外国政权的统治体现殖民。恢复自治体现政治上的去殖民化。审查并按需要修改学校规则，可以处理殖民统治延续下来的制度影响。',
          'Rule by a foreign power shows colonisation. Taking back self-government shows political decolonisation. Reviewing and updating old school rules can address effects of colonial rule that remain in institutions.'
        ),
        points: [
          point('foreign-rule', '把外国政权统治对应到殖民。', 'Match foreign rule with colonisation.'),
          point('self-rule', '把恢复自治对应到政治上的去殖民化。', 'Match regaining self-government with political decolonisation.'),
          point('institutions', '说明审查或修改学校规则有助于处理殖民制度遗留的影响。', 'Explain that reviewing or changing inherited school rules can address lingering institutional effects.')
        ],
        choice: text(
          '第 2 页要求区分两个过程，第 4、5 页可用来理解外国统治、恢复自治和后续制度变化。教育规则是帮助理解的情境。',
          'Page 2 asks students to distinguish the two processes. Pages 4 and 5 ground foreign rule, recovery of self-government and changes that may follow. School rules provide an accessible example.'
        ),
        design: text(
          '十月 Q9 对照两个概念，十月 Q8 给出线索后要求判断。这里先用同一个地方的两个阶段做匹配，再让学生多写一句说明制度影响。',
          'October Q9 compares two concepts, and October Q8 asks for a judgement from clues. Here students match two stages in the same place and add one sentence about the institutional effect.'
        ),
        commonMiss: text(
          '写到自治就停会漏掉第三点。应说清为什么殖民时期留下的规则还会影响独立后的学校。',
          'Stopping at self-government leaves out the third point. Explain why rules inherited from colonial rule can still matter to schools after independence.'
        ),
        fit: {
          wording: fitted(6, '十月 Q8 直接问情境对应哪个概念，Q17 问哪些配对正确。本题把同类措辞用于两个时间阶段。', 'October Q8 directly asks which concept fits a scenario, and Q17 asks for accurate pairings. This item applies those forms to two stages.'),
          structure: fitted(3, '两阶段配对类似十月 Q9、Q17。解释自治后仍须处理的制度影响多了一步，故提问结构给半分。', 'Matching stages resembles October Q9 and Q17. Explaining lingering institutional effects adds a step, so the structure earns half credit.'),
          coverage: fitted(5, '第 8 章第 2、4、5 页覆盖殖民、政治去殖民化及更长的制度变化。', 'Chapter 8, pp. 2, 4 and 5 cover colonisation, political decolonisation and longer institutional change.'),
          brevity: fitted(3, '每个阶段一句，制度影响一句。', 'One sentence per stage and one on the institutional effect are enough.')
        }
      }
    ]
  },
  {
    id: '3',
    title: text('证据运用与环境视角', 'Using evidence and viewing nature'),
    questions: [
      {
        id: 'vertical-horizontal-relations', chapter: 5, pages: [21, 22, 26, 28],
        topic: text('人与神、他人和自然的关系', 'Relations with God, other people and nature'),
        stem: text(
          '按课件的划分，纵向关系和横向关系的主要区别是什么？举一个与自然有关的横向关系例子。',
          'According to the chapter, what is the main difference between vertical and horizontal relationships? Give one example of a horizontal relationship with nature.'
        ),
        model: text(
          '纵向关系指人与神的关系。横向关系涉及其他人和自然。例如，一个人参与保护社区附近的森林，体现了与自然的横向关系。',
          'A vertical relationship is the relationship between a person and God. Horizontal relationships include ties with other people and nature. Protecting a nearby forest is an example of a horizontal relationship with nature.'
        ),
        points: [
          point('vertical', '把人与神的关系对应到纵向关系。', 'Identify the vertical relationship as a person’s relationship with God.'),
          point('horizontal', '说明横向关系涵盖人与其他人、人与自然的关系。', 'State that horizontal relationships cover ties with other people and nature.'),
          point('example', '举出一个具体的人与自然相处或照护环境的例子。', 'Give a concrete example of people relating to nature or caring for the environment.')
        ],
        choice: text(
          '第 21、22 页先说明纵向关系，第 26、28 页把学习范围延伸到他人和自然。同一组术语适合简短比较。',
          'Pages 21 and 22 explain the vertical relationship. Pages 26 and 28 extend the discussion to other people and nature. The two terms make a short comparison task.'
        ),
        design: text(
          '六月 Q18 从指定世界观提问人的角色，十月 Q9 要区分相近术语。这里在先限定课件用法的基础上，让学生用十月 Q12 式的简单例子展示一种关系。',
          'June Q18 asks about the human role from a stated worldview, and October Q9 distinguishes related terms. This item specifies the course framework and asks for one simple example, as October Q12 does.'
        ),
        commonMiss: text(
          '把「纵向」解释成现实中的高低会偏离课件用法。横向关系的定义应包括自然。',
          'Reading “vertical” as literal height misses the chapter’s usage. Include nature in the definition of horizontal relationships.'
        ),
        fit: {
          wording: fitted(6, '六月 Q18 先限定框架，十月 Q1 直接问主要目的。本题将同样的聚焦移到主要区别。', 'June Q18 sets a framework, and October Q1 asks directly for the main purpose. This item uses that focus for the main distinction.'),
          structure: fitted(6, '十月 Q9 将两个近邻概念并列，Q12 用一个例子检验理解，本题采用同样的两项任务。', 'October Q9 pairs related concepts and Q12 tests recognition through an example. The item uses both forms.'),
          coverage: fitted(5, '第 5 章第 21、22、26、28 页分别支撑两类关系及自然关系例子。', 'Chapter 5, pp. 21, 22, 26 and 28 support both relationships and the example involving nature.'),
          brevity: fitted(3, '两句概念和一句自然例子足够。', 'Two definitions and one example involving nature are enough.')
        }
      },
      {
        id: 'senses-reason-testimony', chapter: 6, pages: [24],
        topic: text('感官、推理与证言', 'Senses, reasoning and testimony'),
        stem: text(
          '一名学生查看温度计、算出距离开课还有几分钟，并听老师按正式课表说明教室在哪。哪些行动分别体现感官观察、推理和有根据的证言？',
          'A student looks at a thermometer, calculates how many minutes remain before class, and hears the teacher confirm the room using the official timetable. Which action shows sense observation, reasoning and supported testimony?'
        ),
        model: text(
          '查看温度计是感官观察。用已知时间算出还有几分钟是推理。老师有正式课表作为依据，其说明属于有根据的证言。',
          'Reading the thermometer uses sense observation. Working out the minutes from known times uses reasoning. The teacher’s statement is testimony supported by the official timetable.'
        ),
        points: [
          point('observation', '把看温度计对应到感官观察。', 'Match looking at the thermometer with sense observation.'),
          point('reasoning', '把用时间算出剩余分钟对应到推理。', 'Match calculating the time left with reasoning.'),
          point('testimony', '把老师根据正式课表给出的说明对应到有根据的证言。', 'Match the teacher’s timetable-based statement with supported testimony.')
        ],
        choice: text(
          '第 24 页把可靠的感官、健全的推理和有根据的消息放在一起。生活情境可以把三种认识途径分开识别。',
          'Page 24 discusses reliable senses, sound reasoning and well-supported messages together. The setting lets learners identify three ways of knowing.'
        ),
        design: text(
          '六月 Q3 让学习者确认框架包含哪些维度，十月 Q8 从行为判断一个对应项。本题沿用行为识别，再按十月 Q17 的方式逐项配对。',
          'June Q3 asks learners to identify elements in a framework, and October Q8 matches behaviour to a dimension. This item uses actions as clues and pairs each one with a category, as October Q17 does.'
        ),
        commonMiss: text(
          '以老师的身份为唯一理由，会漏掉课表提供的依据。计算剩余时间要用已知信息作推导。',
          'Relying on the teacher’s position alone misses the official timetable as evidence. Calculating the remaining time uses known information to reach a conclusion.'
        ),
        fit: {
          wording: fitted(6, '十月 Q8 先给行为，再直接问对应维度。本题以同样语气询问认识途径。', 'October Q8 presents behaviour and directly asks which dimension it shows. This question uses the same form for sources of knowledge.'),
          structure: fitted(6, '六月 Q3 支持按指定框架辨认多个要素，十月 Q17 支持逐项配对。', 'June Q3 supports using a stated framework to identify elements, and October Q17 supports matching one by one.'),
          coverage: fitted(5, '第 6 章第 24 页同时提供可靠感官、健全推理和有根据的证言。', 'Chapter 6, p. 24 supports reliable senses, sound reasoning and evidence-backed testimony.'),
          brevity: fitted(3, '三个行动各用一句匹配。', 'Three short sentences match the three actions.')
        }
      },
      {
        id: 'pragmatic-truth-park', chapter: 6, pages: [20, 21, 26],
        topic: text('实用主义真理论', 'Pragmatic theory of truth'),
        stem: text(
          '公园用模型预测雨后哪里会积水。多次核对后，预测结果帮助工作人员把步道设在较干的地方。依照课件的实用论，什么理由支持采用这个模型？说出判断标准和相关结果。',
          'A park uses a model to predict where water will pool after rain. After several checks, the predictions help staff plan paths on drier ground. How does the chapter’s pragmatic theory support accepting the model? State the test and use the results.'
        ),
        model: text(
          '实用论强调主张在实际运用中是否奏效。多次核对显示模型能预测积水位置。这个结果有用，因为它帮助工作人员把步道设在较干的地方。',
          'The pragmatic test asks whether the claim works in practice. Repeated checks show that the model predicts where water pools. That is useful because it helps staff plan paths on drier ground.'
        ),
        points: [
          point('criterion', '写出实用论重视在实际运用中能否奏效。', 'State that the pragmatic test looks at whether a claim works in practice.'),
          point('evidence', '用多次核对后模型仍能预测积水位置来说明其效果。', 'Use repeated checks of the pooling predictions as evidence that the model works.'),
          point('use', '具体指出有用的后果是能规划较干的步道。', 'Specify the useful consequence of being able to plan drier paths.')
        ],
        choice: text(
          '第 20、21 页用实际应用和结果解释实用论，第 26 页要求举例。这个模型给出了可观察结果和可说明的用途。',
          'Pages 20 and 21 explain the pragmatic account through application and results, and p. 26 asks for an example. The model has observable results and a practical use.'
        ),
        design: text(
          '六月 Q11 先给依据再问结论，十月 Q8、Q12 让学生从真实感较强的材料辨认概念。题干给出检验结果，让学生说明它为何支持采用模型。',
          'June Q11 gives the evidence before the conclusion, and October Q8 and Q12 use familiar situations to test recognition. Here the check results are supplied and students explain why they support using the model.'
        ),
        commonMiss: text(
          '一句「它有用」会漏掉模型具体做对了什么、帮助完成了什么。结论应限于这个实际用途。',
          'A bare “it is useful” leaves out what the model got right and what it helped staff do. Keep the judgement tied to this practical use.'
        ),
        fit: {
          wording: fitted(6, '十月 Q8、Q11 直接问情境中的关键线索或主要目的，本题直问采用模型的理由。', 'October Q8 and Q11 directly ask for a key clue or main goal. The prompt likewise asks directly why the model is worth using.'),
          structure: fitted(6, '六月 Q11 将已知依据用于一个结论，十月 Q12 用具体实例考概念。本题让学生从实例提取有用结果。', 'June Q11 uses available grounds for one conclusion, and October Q12 tests a concept with an example. This item asks students to draw on the practical result in a case.'),
          coverage: fitted(5, '第 6 章第 20、21 页明确讨论实用论与应用结果，第 26 页要求举例。', 'Chapter 6, pp. 20 and 21 discuss pragmatic truth and practical results, and p. 26 asks for examples.'),
          brevity: fitted(3, '标准、观察结果和具体用途可以分别用一句话交代。', 'The test, observed result and practical use each take one sentence.')
        }
      },
      {
        id: 'modernity-modernism-modernisation', chapter: 7, pages: [11, 12, 13],
        topic: text('现代性、现代主义与现代化', 'Modernity, modernism and modernisation'),
        stem: text(
          '村里开始安装电灯，电灯后来成为日常设施，规划者认为科学和理性能够改善生活。根据课件，哪部分体现现代化、现代性和现代主义？',
          'A village starts installing electric lights. The lights become part of daily life, and planners say science and reason can improve life. In the chapter’s terms, which part shows modernisation, modernity and modernism?'
        ),
        model: text(
          '安装电灯的变化过程体现现代化。电灯成为日常设施的生活状态体现现代性。相信科学和理性可以改善生活，体现了课件描述的现代主义观念。',
          'Installing the lights shows modernisation as a process of change. Having electric lights in daily life shows modernity as a condition. Trusting science and reason to improve life shows modernism as a set of ideas in this chapter.'
        ),
        points: [
          point('process', '把逐步安装电灯的过程对应到现代化。', 'Match the process of installing electric lights with modernisation.'),
          point('condition', '把电灯已融入日常的生活状态对应到现代性。', 'Match having electric lights as a daily condition with modernity.'),
          point('ideas', '把对科学和理性的信任对应到课件所讲的现代主义观念。', 'Match trust in science and reason with the modernist ideas described in the chapter.')
        ],
        choice: text(
          '第 11、12 页并列三词，第 13 页补充科学和理性等思想线索。用一种设施即可区分变化、状态和观念。',
          'Pages 11 and 12 compare the three terms, and p. 13 expands on science and reason. One example distinguishes a process, a condition and a set of ideas.'
        ),
        design: text(
          '十月 Q9 检查相近概念的区别，Q17 用配对检查术语和目标。这里改成直接把三个现成线索配给三个课件词语。',
          'October Q9 tests distinctions among related ideas, and Q17 tests pairings. This question turns that pattern into a direct match between three clues and three course terms.'
        ),
        commonMiss: text(
          '「正在安装」说的是变化过程，「已经日常使用」说的是生活状态。第三点要指出规划者持有的观念。',
          'Installing the lights describes a process. Already using the lights every day describes a condition. The third point concerns the planners’ view.'
        ),
        fit: {
          wording: fitted(6, '沿用十月 Q8、Q17 的直接配对措辞，并用六月 Q18 的方式限定按本章语境回答。', 'The question uses direct matching like October Q8 and Q17, and specifies the chapter’s perspective as June Q18 does.'),
          structure: fitted(6, '十月 Q9 支持区分近义术语，Q17 支持把多个实例与概念配对。', 'October Q9 supports distinguishing related concepts, and Q17 supports matching several examples to their categories.'),
          coverage: fitted(5, '第 7 章第 11–13 页支持三词及案例所用的科学、理性线索。', 'Chapter 7, pp. 11–13 ground all three terms and the clues about science and reason.'),
          brevity: fitted(3, '三个术语各配一句，可答完全部采分点。', 'One sentence per term covers the three points.')
        }
      },
      {
        id: 'cartesian-dualism-environment', chapter: 8, pages: [2, 24, 25, 26, 27, 28],
        topic: text('笛卡尔二元论与课件的生态批评', 'Cartesian dualism and the chapter’s ecological critique'),
        stem: text(
          '按课件，笛卡尔二元论区分什么？一名规划者把湿地只看成待出售土地。用课件的生态批评说明，这种态度可能给自然带来什么风险。',
          'According to the chapter, what does Cartesian dualism distinguish? A planner treats a wetland only as land to sell. Use the chapter’s ecological critique to explain one risk this attitude can pose to nature.'
        ),
        model: text(
          '笛卡尔二元论把心灵与身体视为不同的实体。课件的批评把这种区分与只从人的用途来看待自然的态度联系起来，规划者就是一个例子。若只问土地能卖多少钱，排干湿地时就可能忽略对野生动物栖息地的破坏。',
          'Cartesian dualism treats mind and body as distinct substances. The chapter links this distinction to attitudes like the planner’s, which value nature mainly for human use. If sale value is all that matters, draining the wetland may destroy habitats the planner has overlooked.'
        ),
        points: [
          point('mind-body', '说明笛卡尔二元论区分心灵与身体。', 'Identify the distinction between mind and body in Cartesian dualism.'),
          point('human-use', '说明课件的批评指向把自然主要视作供人利用的资源。', 'Identify the attitude criticised by the chapter of viewing nature mainly as a resource for people.'),
          point('ecological-risk', '给出湿地的一项具体风险，并说明为何只看人类收益可能忽视它。', 'Name one risk to the wetland and explain how focusing on human gains may lead to overlooking it.')
        ],
        choice: text(
          '第 2 页将这种联系放入学习目标，第 24–28 页由心身区分谈到以人类利益为中心的自然观及课程提出的生态问题。',
          'Page 2 includes the connection in the learning aims. Pages 24–28 move from the mind–body distinction to a human-centred view of nature and the ecological concerns discussed in the chapter.'
        ),
        design: text(
          '十月 Q13 直接问核心特征，Q5 用职业行为辨认概念。这里把定义和规划情境放在一起，并要求写出一项具体生态后果。',
          'October Q13 asks directly about a core feature, and Q5 tests a concept through a professional decision. This item combines a definition and a planning case, then asks for one concrete ecological risk.'
        ),
        commonMiss: text(
          '心身区分是术语定义。人与自然的疏离是课件讨论的解释，要结合例子说明可发生的风险。',
          'The mind–body distinction defines the term. The chapter discusses a possible link to how people view nature. Use the case to show a specific risk.'
        ),
        fit: {
          wording: fitted(6, '十月 Q13 直接追问核心特征，Q5 以短职业情境落地，本题沿用二者清楚的问法。', 'October Q13 directly asks about a core feature, and Q5 uses a short professional case. This item uses both styles of prompt.'),
          structure: fitted(3, '定义和情境有十月 Q13、Q5 可对照。学生还须解释定义以外的生态风险，故提问结构给半分。', 'The definition and case match patterns in October Q13 and Q5. Connecting the case to a further ecological risk goes beyond those formats, so structure earns half credit.'),
          coverage: fitted(5, '第 8 章第 2、24–28 页支撑定义和生态批评，湿地情境用于检验理解。', 'Chapter 8, pp. 2 and 24–28 ground the definition and critique. The wetland is a practice example.'),
          brevity: fitted(3, '定义、人类中心视角和一个具体后果可以各写一句。', 'The definition, human-centred view and one specific consequence each fit in a short sentence.')
        }
      }
    ]
  },
  {
    id: '4',
    title: text('判断与比较', 'Judgement and comparison'),
    questions: [
      {
        id: 'nominalism-red', chapter: 5, pages: [37],
        topic: text('唯名论与一般名称', 'Nominalism and general terms'),
        stem: text(
          '一位学生认为，几件不同的红色物品都可以叫作「红」，但这个名称并不指一个独立存在的共相。哪种形而上学立场最符合这种看法？说明「红」这个名称在例子里的作用。',
          'A student says that different objects can all be called red, but the word does not refer to a separately existing universal. Which metaphysical view best fits this claim? Explain the role of the word red in this example.'
        ),
        model: text(
          '这符合唯名论。红色的物品是具体事物。「红」是用来给这些事物归类的名称，并不指一个单独存在的共相。',
          'This fits nominalism. The red objects are particular things. Red is a name used to group them and does not refer to a universal existing separately.'
        ),
        points: [
          point('name', '指出这是唯名论。', 'Identify nominalism.'),
          point('particulars', '认出题中不同的红色物品是具体事物。', 'Recognise that the different red objects are particulars.'),
          point('label', '说明「红」是这些事物的一般标签，并不指独立存在的共相。', 'Explain that red is a general label for the things rather than a separately existing universal.')
        ],
        choice: text('第 37 页用 cat 或 red 说明唯名论如何理解一般名称，足以支撑具体的课堂情境。', 'Page 37 uses cat or red to show how nominalism understands general names, giving a direct case for practice.'),
        design: text('六月 Q2 和十月 Q8 都先给线索，再让学生指出最贴切的概念。这里认出立场后，只需解释题里的一个名称。', 'June Q2 and October Q8 provide clues before asking for the best-fitting concept. After naming the view here, learners explain one term in the example.'),
        commonMiss: text('只写「红色是主观的」会漏掉唯名论的区分。要说清楚哪些东西是具体物品，哪些是一般名称。', 'Saying that red is subjective misses the nominalist distinction. Separate the particular objects from the general name.'),
        fit: {
          wording: fitted(6, '十月 Q14 用 best describes，六月 Q2 用 best characterizes，本题保留 best fits 的定向判断。', 'October Q14 uses best describes and June Q2 uses best characterizes. Best fits keeps the same focus.'),
          structure: fitted(6, '六月 Q2 从描述选概念，十月 Q8 从一段学生情境选类别。本题用同样的先线索、后命名结构，解释只需重述题中线索。', 'June Q2 moves from a description to a concept, and October Q8 from a brief student case to a category. This item follows the same path, with a short restatement of the clue.'),
          coverage: fitted(5, '第 37 页直接列出唯名论、具体事物和 red 的例子。', 'Page 37 directly gives nominalism, particulars and the red example.'),
          brevity: fitted(3, '三句分别写理论名称、具体事物与标签的作用。', 'Three sentences name the view, identify the particulars and explain the label.')
        }
      },
      {
        id: 'western-islamic-sources', chapter: 6, pages: [18],
        topic: text('西方与伊斯兰认识论的知识来源', 'Sources in Western and Islamic epistemology'),
        stem: text(
          '按课件对照表，西方与伊斯兰认识论都接受哪两种知识来源？表中伊斯兰认识论把哪一来源置于最高地位？',
          'According to the course comparison, which two sources of knowledge are accepted in both Western and Islamic epistemology? Which additional source does the Islamic account rank highest?'
        ),
        model: text(
          '课件中的两种认识论都接受理性和经验观察作为知识来源。课件中的伊斯兰认识论把启示置于最高地位。',
          'Both accounts accept reason and empirical observation as sources of knowledge. The Islamic account in the course ranks revelation highest.'
        ),
        points: [
          point('reason', '写出两者都接受理性或理性证据。', 'State that both accounts accept reason or rational evidence.'),
          point('experience', '写出两者都接受经验、观察或经验证据。', 'State that both accounts accept experience, observation or empirical evidence.'),
          point('revelation', '说明按课件对照表，启示是伊斯兰认识论中地位最高的来源。', 'Identify revelation as the highest source in the Islamic account shown in the course.')
        ],
        choice: text('第 18 页的并列表格明确写出共同来源和启示的特殊地位。题目范围限于表中的两种概括。', 'The comparison table on page 18 sets out the shared sources and the standing of revelation. The prompt is limited to the two accounts in that table.'),
        design: text('六月 Q3、Q9 根据明确框架问组成项，十月 Q9 对照两种立场。本题只查共同来源和一个差异。', 'June Q3 and Q9 ask for components within a specified framework, and October Q9 compares two positions. This item asks for common sources and one difference.'),
        commonMiss: text('写出启示时要标明它在表中伊斯兰认识论的地位。理性与经验观察是另外两个点。', 'Identify where revelation belongs in the course comparison. Reason and empirical observation are separate points.'),
        fit: {
          wording: fitted(6, '六月 Q3、Q18 以 According to 限定框架。本题同样先限定课件对照表。', 'June Q3 and Q18 use According to to identify a framework. This question does the same for the course comparison.'),
          structure: fitted(6, '六月 Q3、Q9 查给定组成项，十月 Q9 比较两个概念。本题要求从一个并列表中分辨两项共同点和一项特有来源。', 'June Q3 and Q9 check components, and October Q9 compares two concepts. This item checks two shared sources and one additional source in a single comparison.'),
          coverage: fitted(5, '第 18 页列出理性、经验证据和启示的层级，三点均可直接核对。', 'Page 18 lists rational and empirical evidence and the status of revelation. All three points can be checked directly.'),
          brevity: fitted(3, '第一句写出两个共同来源，第二句写启示的地位。', 'One sentence lists the two shared sources and a second gives the standing of revelation.')
        }
      },
      {
        id: 'correspondence-coherence-check', chapter: 6, pages: [20, 21, 26],
        topic: text('真理的符合论与融贯论', 'Correspondence and coherence theories of truth'),
        stem: text(
          '一位学生走到室外，查看「正在下雨」是否符合实际天气。另一位学生只检查这句话能否与其余天气记录保持一致。分别指出两种判断使用的真理理论，并说明它们检验的对象有何不同。',
          'One student looks outside to check whether the claim that it is raining matches the weather. Another only checks whether the claim is consistent with the other weather reports. Name the two theories of truth illustrated here and explain what each checks.'
        ),
        model: text(
          '第一位学生采用符合论。第二位学生采用融贯论。符合论比较陈述和实际情形，融贯论检查陈述能否与其他陈述保持一致。',
          'The first student uses correspondence theory. The second uses coherence theory. Correspondence checks a claim against reality, while coherence checks its consistency with other claims.'
        ),
        points: [
          point('correspondence', '把查看实际天气的第一种做法归为符合论。', 'Match checking the actual weather to correspondence theory.'),
          point('coherence', '把检查其他记录能否一致的第二种做法归为融贯论。', 'Match the consistency check against other reports to coherence theory.'),
          point('criteria', '明确区分与事实相符、与其他陈述一致这两种标准。', 'Distinguish agreement with reality from consistency with other claims.')
        ],
        choice: text('第 20 页直接比较两种判准，第 21 页给例子，第 26 页要求说明真理理论并举例。', 'Page 20 compares the criteria, page 21 illustrates them and page 26 asks about the theories and examples.'),
        design: text('六月 Q13 与十月 Q9 都要求辨认容易混淆的推理表述。这里沿用十月 Q12 的实例线索，把两种检验方式放在同一个天气判断里。', 'June Q13 and October Q9 distinguish related reasoning descriptions. This item uses the example cue from October Q12 and applies two checks to the same weather claim.'),
        commonMiss: text('把其他天气记录当作实际天气，会抹掉题目给出的差异。第一种直接查看事实，第二种的线索是记录相互一致。', 'Treating the reports as the weather itself loses the key difference. The first check is against the weather, and the second is about consistency among statements.'),
        fit: {
          wording: fitted(6, '十月 Q9 聚焦两个概念的关系，十月 Q12 要选出实例。本题明确要求对应两个实例并说明区别。', 'October Q9 focuses on two concepts and October Q12 on an example. This prompt asks for a direct match and a focused distinction.'),
          structure: fitted(6, '十月 Q17 用成对特征作匹配，十月 Q9 用同组题面对照两个概念。本题用同一天气陈述串起两个可独立命名的判准。', 'October Q17 matches paired characteristics and October Q9 contrasts two concepts. This item gives two checks that can be matched separately in one setting.'),
          coverage: fitted(5, '第 20 页提供两种判准，第 21 页有天气与融贯例，第 26 页要求说明并举例。', 'Page 20 gives both criteria, page 21 supplies illustrations and page 26 asks for explanations and examples.'),
          brevity: fitted(3, '两句指出对应理论，第三句写出判准差异。', 'Two sentences name the theories and a third gives the difference.')
        }
      },
      {
        id: 'modernism-postmodernism-reason', chapter: 7, pages: [2, 13, 18, 26, 27, 43],
        topic: text('现代主义、后现代主义与科学', 'Modernism, postmodernism and science'),
        stem: text(
          '按课件，现代主义和后现代主义对理性与科学持怎样的态度？简述后现代主义对现代主义的一项批评。',
          'According to the course, how do modernism and postmodernism differ in their attitude to reason and science? Briefly state one postmodern criticism of modernism.'
        ),
        model: text(
          '现代主义重视理性思考和科学方法。后现代主义质疑只靠理性和科学就能解决所有问题的主张。一项批评是科学进步本身并不能保证人的生活会变好。',
          'Modernism values rational thinking and scientific methods. Postmodernism questions the idea that reason and science alone can solve every problem. One criticism is that scientific progress alone does not guarantee better lives.'
        ),
        points: [
          point('modern', '说明现代主义重视理性和科学方法。', 'State that modernism values reason and scientific methods.'),
          point('postmodern', '说明后现代主义质疑理性与科学的绝对权威或万能性。', 'State that postmodernism questions the universal authority or sufficiency of reason and science.'),
          point('criticism', '说出一个具体的课件批评，例如科学进步不能保证生活变得更好。', 'Give one specific criticism from the course, such as scientific progress offering no guarantee of a better life.')
        ],
        choice: text('第 13 页谈现代理性与科学，第 26 页提出后现代批评，第 27 页给比较表。第 43 页把现代与后现代论述列为章末题。', 'Page 13 covers modern reason and science, page 26 gives criticisms, and page 27 compares the approaches. Page 43 includes an end-of-chapter contrast.'),
        design: text('十月 Q9 提供两种概念对照的原型。课件章末的大题增加了论述，本题只取其中一种比较尺度和一项批评。', 'October Q9 models a contrast between two views. The broader course exercise invites discussion, so this item narrows it to one comparison and one criticism.'),
        commonMiss: text('只说「后现代主义和现代主义不同」缺少态度区别。写出对理性与科学的具体分歧，并补一个课堂上的批评。', 'Saying the approaches differ leaves the contrast unnamed. Give each attitude to reason and science and add one specific course criticism.'),
        fit: {
          wording: fitted(6, '六月 Q3 用 According to 限定依据，十月 Q9 直接要求比较。本题沿用这两种问法。', 'June Q3 limits the basis with According to, and October Q9 directly asks for a comparison. This prompt uses both cues.'),
          structure: fitted(3, '十月 Q9 支持两种立场的对照，但要求自行补一项批评，比原题的选项判断多一步。', 'October Q9 supports the contrast, but supplying a criticism adds a step beyond recognising the options.'),
          coverage: fitted(5, '第 13、26、27 页明确支撑两种态度和批评，第 43 页另有章末问题。', 'Pages 13, 26 and 27 support the two attitudes and criticisms directly, and page 43 has a review question.'),
          brevity: fitted(3, '两种态度和一项批评可分别用三句各写一项。', 'The two attitudes and one criticism take one short sentence each.')
        }
      },
      {
        id: 'eurocentrism-textbook', chapter: 8, pages: [30, 33, 35],
        topic: text('欧洲中心主义的标准', 'The standard in Eurocentrism'),
        stem: text(
          '一本教材用欧洲历史当作唯一进步标准来评价亚洲社会，忽略当地社会自己的发展标准。哪种思维最符合这个情境？指出教材采用的标准和它忽略的视角。',
          'A textbook judges Asian societies using European history as the only standard of progress and leaves out local standards of development. Which way of thinking best fits this case? Identify the standard used and the perspective left out.'
        ),
        model: text(
          '这符合欧洲中心主义。教材以欧洲历史作为判断其他社会进步的唯一标准。它忽略了当地社会理解自身发展的视角。',
          'This fits Eurocentrism. The textbook takes European history as the sole benchmark for other societies. It leaves out how local societies understand their own development.'
        ),
        points: [
          point('name', '认出欧洲中心主义。', 'Identify Eurocentrism.'),
          point('standard', '说明教材用欧洲价值或欧洲历史作为评价非欧洲社会的准绳。', 'Explain that European values or history are used to judge non-European societies.'),
          point('local', '指出当地社会自身的历史、评价标准或知识视角被忽视。', 'Identify local history, standards or knowledge as the perspective being overlooked.')
        ],
        choice: text('第 30 页给出欧洲中心主义的定义，第 33、35 页讨论本土知识被忽略及重新重视本土智慧。', 'Page 30 defines Eurocentrism. Pages 33 and 35 discuss the neglect of local knowledge and the value of bringing it back into view.'),
        design: text('六月 Q2 和十月 Q8 先描述特征再问最符合的概念。本题用教材例子呈现同一结构，理由就是辨认题干中的标准和视角。', 'June Q2 and October Q8 describe characteristics before asking for the best-fitting concept. This item uses the same pattern and asks learners to point out the standard and missing perspective.'),
        commonMiss: text('只写「教材提到欧洲」不足以说明这种思维。关键是它怎样把一种历史标准用来评判其他社会，以及因此忽视了什么。', 'Simply mentioning Europe is not enough. Explain how one historical standard is used to judge other societies and what this overlooks.'),
        fit: {
          wording: fitted(6, 'Which … best fits 延续六月 Q2 的最吻合描述及十月 Q8 的情境归类。', 'Which … best fits follows the focused descriptions in June Q2 and the case classification in October Q8.'),
          structure: fitted(6, '十月 Q8 由简短情境辨认类别，六月 Q12 由短材料识别概念。本题的解释直接取自已给的两条线索。', 'October Q8 uses a brief case to identify a category, and June Q12 uses a short example to identify a concept. The explanation here uses the two clues supplied.'),
          coverage: fitted(5, '第 30 页明确说到以西方或欧洲价值衡量非欧洲文明，第 33、35 页支撑本土视角。', 'Page 30 directly discusses judging non-European societies by European or Western standards. Pages 33 and 35 support the local perspective.'),
          brevity: fitted(3, '一句命名，一句写评价标准，一句写遗漏的本土视角。', 'One sentence names the view, one gives the benchmark and one identifies the local perspective.')
        }
      }
    ]
  },
  {
    id: '5',
    title: text('方法与应用', 'Methods and applications'),
    questions: [
      {
        id: 'operationalism-convention', chapter: 5, pages: [39, 41],
        topic: text('操作主义与约定主义', 'Operationalism and conventionalism'),
        stem: text(
          '一位研究者用运动后一分钟的脉搏测值来界定体能测试的一个指标。哪种立场最符合这个做法？简述它与课件中的约定主义有何不同。',
          'A researcher defines a fitness indicator by measuring a person’s pulse one minute after exercise. Which approach best fits this case? State how it differs from conventionalism in the course.'
        ),
        model: text(
          '这个例子符合操作主义。操作主义把体能指标连到一个具体的测量步骤上。按课件的概括，约定主义强调科学表述可以依赖共同约定。',
          'This example fits operationalism. Operationalism links the fitness indicator to a specific way of measuring it. The course account of conventionalism gives shared conventions a role in framing scientific statements.'
        ),
        points: [
          point('view', '把测量脉搏的做法认作操作主义。', 'Identify operationalism in the pulse-measurement case.'),
          point('procedure', '说明这个立场以具体操作、实验或测量办法来界定概念。', 'Explain that an operation, experiment or measurement procedure defines the concept.'),
          point('agreement', '说明课件中的约定主义强调共同约定在科学表述中的作用。', 'State that conventionalism gives shared conventions a role in framing scientific statements.')
        ],
        choice: text('第 39 页列出两种立场，第 41 页并列约定主义与操作主义，分别突出约定和清楚的实验步骤。', 'Page 39 lists both approaches. Page 41 contrasts the role of conventions with the use of specified experimental procedures.'),
        design: text('用十月 Q8 式短情境辨认立场，再用十月 Q9 式对照指出区别。体能例子仅用于说明一个可测的指标。', 'A short case like October Q8 identifies the approach, followed by a one-point contrast like October Q9. Fitness is used only to illustrate a measurable indicator.'),
        commonMiss: text('只写「研究者对指标达成共识」会错过测量步骤这一关键线索。具体是怎样测量，才是本题识别操作主义的依据。', 'Saying the researchers agree on an indicator misses the key cue. Identify how the indicator is measured.'),
        fit: {
          wording: fitted(6, '十月 Q8 用短情境问最贴切类别，十月 Q14 用 best describes，本题用 best fits 聚焦一项识别。', 'October Q8 identifies a category from a case and October Q14 uses best describes. Best fits keeps this recognition task focused.'),
          structure: fitted(6, '十月 Q8 的情境辨认和十月 Q9 的概念对照都留在题中，解释限于给定测量办法。', 'The case recognition of October Q8 and the contrast of October Q9 are both retained, with the explanation limited to the method given.'),
          coverage: fitted(5, '第 41 页并列定义和实验条件说明，可直接支撑全部采分点。', 'Page 41 provides the paired definitions and the role of experimental procedures, directly supporting all three points.'),
          brevity: fitted(3, '三句分别写出名称、测量方式的作用和约定主义的重点。', 'Three short sentences name the approach, explain the measurement and state the role of convention.')
        }
      },
      {
        id: 'reliable-sense-observation', chapter: 6, pages: [13, 24],
        topic: text('可靠的感官证据', 'Reliable evidence from the senses'),
        stem: text(
          '一位学生试着在暗处阅读教室公告。按课件，感官证据要可靠需要满足哪两个条件？给出一个改善这次观察的办法。',
          'A student tries to read a classroom notice in dim light. According to the course, what two conditions make evidence from the senses reliable? Give one way to improve this observation.'
        ),
        model: text(
          '相关感官必须能正常发挥作用。观察时不能有干扰感觉信息的因素。学生可以打开灯再看公告。',
          'The relevant senses need to work properly. The observation should be free of interference. The student can turn on a light and read the notice again.'
        ),
        points: [
          point('senses', '写出相关的感官应正常发挥作用。', 'State that the relevant senses need to work properly.'),
          point('conditions', '写出观察条件应避免干扰或扭曲感官信息。', 'State that the conditions should be free of interference that distorts the observation.'),
          point('action', '给出针对光线不足的改进，例如开灯后再观察。', 'Give a relevant improvement for the dim lighting, such as reading again with a light on.')
        ],
        choice: text('第 24 页逐项列出感官正常和信息免受干扰两个条件，第 13 页也说明感官所见可能与现实不同。', 'Page 24 lists two conditions: healthy senses and evidence free of interference. Page 13 explains that perception can differ from reality.'),
        design: text('六月 Q3 用框架限定组成项，十月 Q8 用日常线索考察应用。这里固定数量为两项，并把做法限制在照明这一明显干扰。', 'June Q3 limits the requested components by naming a framework, and October Q8 tests a concept with an everyday cue. Here the number is fixed at two and the action addresses the lighting.'),
        commonMiss: text('回答「再看一次」仍留着光线干扰。除了感官自身状态，也要指出外界观察条件。', 'Looking again in the same conditions leaves the lighting problem. Address both the senses themselves and the circumstances of observation.'),
        fit: {
          wording: fitted(6, '六月 Q3 的 According to 加明确数量与本题相同，实际情境沿用十月 Q8 的短句。', 'June Q3 uses According to and specifies the number of items. The short case follows the style of October Q8.'),
          structure: fitted(6, '六月 Q3 查明列因素，十月 Q8 由情境线索作判断。本题用同样两部分，并将措施限制在一个已给的干扰因素。', 'June Q3 checks stated factors, and October Q8 applies a case clue. This question does the same, limiting the action to the single issue already given.'),
          coverage: fitted(5, '第 24 页直接写出所问的两个条件，光线是干扰观察的具体例子。', 'Page 24 directly provides the two conditions. Lighting is a concrete example of interference.'),
          brevity: fitted(3, '每个条件一句，改进办法一句。', 'Each condition and the practical action take one short sentence.')
        }
      },
      {
        id: 'pragmatic-coherence-criterion', chapter: 6, pages: [19, 20, 21, 26],
        topic: text('实用论与融贯论的判断方式', 'Pragmatic and coherence criteria'),
        stem: text(
          '两位学生分别判断一个学习建议。一人试用它并关注它有没有实际帮助，另一人只检查它能否与其他已接受的陈述保持一致。哪位学生使用实用论的判准？说明理由，并指出另一位使用的真理理论。',
          'Two students assess a study tip. One tries it and looks for practical benefits, while the other checks only whether it fits other accepted statements. Which student uses the pragmatic criterion? Explain why and name the other theory.'
        ),
        model: text(
          '第一位学生采用实用论的判准。他关注这条建议在实际使用中有没有帮助。第二位学生检查与其他陈述是否一致，因此采用融贯论。',
          'The first student uses the pragmatic criterion. The focus is on whether the tip helps in practice. The second uses coherence theory by checking consistency with other statements.'
        ),
        points: [
          point('pragmatic', '识别第一位学生使用的是实用论。', 'Match the first student’s approach to the pragmatic criterion.'),
          point('practical', '把第一位学生的理由说清楚，关注实际效果或在实践中有没有帮助。', 'Explain that the first student judges by practical effects or benefits.'),
          point('coherence', '把对照其他陈述是否一致的第二种做法辨认为融贯论。', 'Match the second student’s consistency check to coherence theory.')
        ],
        choice: text('第 20 页并列实用效果和陈述间一致性，第 26 页要求解释理论并举例。', 'Page 20 places practical results alongside consistency between statements, and page 26 asks for theories with examples.'),
        design: text('十月 Q9 要区别两种推理方式，Q12 用实例检查认识。此处让两位学生判断同一建议，使两种判准的线索各自清楚。', 'October Q9 distinguishes two methods, and Q12 checks recognition through examples. Here two learners assess the same tip so that each criterion has a clear cue.'),
        commonMiss: text('实用论这一项要写实际效果。材料中的另一位学生只问能否与其他陈述相容，这正是融贯论的线索。', 'For the pragmatic criterion, name the practical result. The other student checks consistency with a set of statements, the cue for coherence.'),
        fit: {
          wording: fitted(6, '十月 Q12 和 Q15 直接问实例对应的概念，本题同样先问哪一例符合指定概念。', 'October Q12 and Q15 directly match examples to concepts. This item also starts by asking which case fits a named concept.'),
          structure: fitted(6, '十月 Q9 对照两个判断方式，十月 Q17 要逐对配合概念。这里同时辨认两段已给描述，理由只指出题干中的实际效果。', 'October Q9 contrasts two methods, and October Q17 pairs descriptions and concepts. Here both descriptions are supplied and the explanation points to the stated practical result.'),
          coverage: fitted(5, '第 20 页明确把可实践的益处和与其他陈述一致作为不同判准，第 26 页列三种真理理论练习。', 'Page 20 distinguishes practical benefits from consistency with other statements. Page 26 sets a related exercise.'),
          brevity: fitted(3, '用两三句分别判定两位学生及实用论的线索。', 'Two or three sentences give the two classifications and the pragmatic clue.')
        }
      },
      {
        id: 'ideology-definition-purpose', chapter: 7, pages: [4, 42],
        topic: text('意识形态的含义与作用', 'The meaning and purpose of ideology'),
        stem: text(
          '按课件，什么是意识形态？写出它如何帮助人们理解社会，以及怎样引导行动。',
          'According to the course, what is an ideology? State how it helps people understand society and how it guides action.'
        ),
        model: text(
          '意识形态是一组相互关联的观念和信念。它为人们解释社会提供一种框架。它也引导人们作决定，并采取希望改变社会的行动。',
          'An ideology is a system of ideas and beliefs. It gives people a way to explain society. It also guides decisions and actions that can change society.'
        ),
        points: [
          point('system', '说明意识形态是一套观念或信念。', 'Define ideology as a system of ideas or beliefs.'),
          point('explanation', '指出它提供理解或解释社会的框架。', 'Identify its role in understanding or explaining society.'),
          point('action', '指出它可以引导决定和行动，或指向社会改变。', 'Identify its role in guiding decisions and action or seeking social change.')
        ],
        choice: text('第 4 页直接将解释世界和改变世界并列为意识形态的两个作用，第 42 页进一步提到决定与行动。', 'Page 4 pairs explaining and changing the world. Page 42 also connects ideology with decisions and action.'),
        design: text('六月 Q13 直接查定义，十月 Q1 和 Q19 分别聚焦主要目的和社会意义。本题把定义和两个明确作用放在一题。', 'June Q13 checks a definition. October Q1 and Q19 focus on purpose and social significance. This item combines the definition with two specified roles.'),
        commonMiss: text('只说「一套信念」只答了定义。题目还要求分别写明解释社会与引导行动。', 'A system of beliefs answers the definition part. Include the roles in explaining society and guiding action.'),
        fit: {
          wording: fitted(6, '六月 Q3 以课件框架限定回答，六月 Q13 直接查定义，十月 Q1 查目的。本题使用同样的明确命令。', 'June Q3 sets a framework, June Q13 asks directly for a definition and October Q1 asks for purpose. This item uses similarly focused commands.'),
          structure: fitted(6, '六月 Q3 要列出可核对的组成项，十月 Q19 用概念表述解释社会意义。本题同样要求明确定义和逐项点出作用。', 'June Q3 requires identifiable components and October Q19 checks significance for society. This item asks for a definition and two separately identifiable roles.'),
          coverage: fitted(5, '第 4 页直接定义这套观念和两种功能，第 42 页补充决策及行动。', 'Page 4 directly defines the system and the two roles. Page 42 adds decisions and actions.'),
          brevity: fitted(3, '三句分别说明定义和两个作用。', 'Three short sentences cover the definition and the two roles.')
        }
      },
      {
        id: 'post-independence-impacts', chapter: 8, pages: [5, 20, 21],
        topic: text('独立后的国家建设与语言挑战', 'State-building and language after independence'),
        stem: text(
          '一个前殖民地在独立后建立自己的政府和法律，但学校仍沿用殖民时期的语言。指出课件中对应的两种去殖民化影响，并说明为何语言问题可能在政治独立后继续存在。',
          'A former colony makes its own government and laws after independence, but its schools still use the colonial language. Which two impacts of decolonisation does this illustrate? Explain why the language issue can continue after political independence.'
        ),
        model: text(
          '自建政府和法律体现了国家建设。学校沿用殖民时期的语言体现了语言挑战。政府可以换由当地人掌管，但原有学校制度和语言习惯仍可延续。',
          'Creating its own government and laws illustrates state-building. The use of the colonial language in schools illustrates a language challenge. Political control can change while school practices and language habits continue.'
        ),
        points: [
          point('state', '把建立政府和法律归为国家建设。', 'Match creating a government and laws to state-building.'),
          point('language', '把继续使用殖民时期的语言归为语言挑战。', 'Identify continued use of the colonial language as a language challenge.'),
          point('lasting', '解释政治管理权的变化与学校制度或语言习惯改变可以发生在不同时间。', 'Explain that control of government can change before educational practices or language habits change.')
        ],
        choice: text('第 21 页列出国家建设和语言影响，第 5 页把政治交接与语言等领域的长期调整区分开。', 'Page 21 lists state-building and language. Page 5 distinguishes political transfer from a longer process affecting language and other areas.'),
        design: text('用六月 Q2、十月 Q8 的情境归类方式找出两项影响，再按课件说出语言制度继续存在的理由。', 'The item follows case classification in June Q2 and October Q8 to identify two effects, then draws on the course to explain why language practices may persist.'),
        commonMiss: text('只写「国家已经独立」漏掉两种具体影响。要区分接管政府和改变学校中已经形成的语言习惯。', 'Saying only that the country is independent leaves out the two effects. Separate taking over government from changing established language practices in schools.'),
        fit: {
          wording: fitted(6, '十月 Q8 直接用实例要求辨认对应类别，十月 Q6 直接问原因。本题保留这两种问法。', 'October Q8 directly classifies a case, while October Q6 asks why. This item uses both forms of wording.'),
          structure: fitted(3, '情境归类和六月 Q9 的多项辨认有直接参照，另写语言为何延续是从客观选项迁移到简答的一步。', 'Case classification and identifying multiple elements in June Q9 provide a direct parallel. Explaining why language persists adds a transfer from selected options to a written reason.'),
          coverage: fitted(5, '第 5 页列出长期语言调整，第 21 页直接列国家建设和语言影响。', 'Page 5 explains longer-term language change and page 21 directly lists state-building and language effects.'),
          brevity: fitted(3, '两句作情境匹配，末句说明政府更换与语言习惯可能不同步。', 'Two sentences match the cases and the last explains why government and language practices can change at different rates.')
        }
      }
    ]
  }
];
