(() => {
  'use strict';

  const text = (zh, en) => ({zh, en});
  const example = (zhTitle, enTitle, zh, en) => ({title: text(zhTitle, enTitle), zh, en});

  // 课件页码为 PDF 的物理页。例子由本站编写，条目归类依据其教学用途。
  const items = [
    {
      id: 'socratic-inquiry', kind: 'method', source: [[1, 3, 4, 9, 13], [4, 14, 15]],
      name: text('苏格拉底式追问', 'Socratic inquiry'), aliases: ['反诘', 'dialectic', 'examined life'],
      intro: text('通过反问和反例，让未经检验的理由露出破绽。', 'Use questions and counterexamples to test unexamined reasons.'),
      explanation: text('先请对方清楚说明主张，再追问理由和关键词的含义。接着寻找一个双方都能判断的例子，检查它是否与主张冲突。发现冲突时，保留有支持的部分，修改过宽的定义，或承认还需研究。课件用对话说明哲学如何练习反思和自我审视。', 'Ask someone to state a claim clearly and explain its reasons and key terms. Look for a case that both of you can judge and check whether it conflicts with the claim. If it does, keep what the reasons support and revise the definition or leave the question open. The course uses dialogue to connect philosophy with reflective life.'),
      examples: [
        example('友谊等于赞同？', 'Must friends agree?', '如果朋友永远赞同你，他也会支持你作出明知有害的决定。接受这个反例以后，可以把定义改成“在乎对方，并诚实提出理由”。', 'If friends must always agree, a friend should endorse a knowingly harmful decision. Accepting that counterexample suggests revising friendship to include care and honest disagreement.'),
        example('检验自己的主张', 'Testing your own claim', '你认为规则公平，因为人人都能报名。追问“没有网络的人也能报名吗”，会把形式上相同的机会与实际可及性分开。', 'You call a rule fair because anyone may apply. Asking whether people without internet access can apply distinguishes an equal rule on paper from practical access.')
      ],
      misconception: text('追问的目标是检查理由。批评时说明哪条理由出了问题，并允许对方修正。', 'The aim is to test reasons. Name the reason at issue and give the other person room to revise it.'),
      related: ['deduction', 'political-philosophy', 'examined-good-life']
    },
    {
      id: 'theoretical-philosophy', kind: 'branch', source: [[1, 14], [2, 10, 12, 13, 14]],
      name: text('理论哲学', 'Theoretical philosophy'),
      intro: text('追问存在、知识和推理的基本结构。', 'Ask foundational questions about reality, knowledge and reasoning.'),
      explanation: text('理论哲学关注一项说法依赖什么概念与前提。形而上学问什么存在，认识论问凭什么知道，逻辑问结论怎样从理由得出。课程结构图也把部分价值研究归在理论侧。遇到跨分支问题，可以先说清正在处理存在、证据、价值或行动中的哪一层。', 'Theoretical philosophy asks which concepts and assumptions a claim depends on. Metaphysics concerns what exists, epistemology concerns what warrants knowledge, and logic concerns what follows from reasons. The course map also groups some inquiries into value on the theoretical side. For a cross-branch question, identify whether the issue is reality, evidence, value or action.'),
      examples: [
        example('更换零件后还是同一辆车？', 'Is it still the same bike?', '接连更换轮胎、车架和把手之后，追问同一辆车的依据是什么。你可以检验“同一材料”和“连续历史”两种判准。', 'After replacing tyres, frame and handlebars, ask what still makes it the same bike. Material identity and continuous history offer different criteria to test.'),
        example('记忆能证明什么？', 'What can memory establish?', '两位同学对同次讨论记忆不同。分开问事情怎样发生和记忆是否可靠，就能看出事实问题与知识依据的问题。', 'Two classmates remember a discussion differently. Separate what happened from whether memory is reliable to distinguish the fact from the grounds for believing it.')
      ],
      misconception: text('理论问题能用生活情境来检验。课件的分支图按主要问题归类，实际研究常跨分支。', 'Everyday cases can test theoretical claims. The course map groups inquiries by their main question, and actual investigations often cross those boundaries.'),
      related: ['practical-philosophy', 'metaphysics', 'epistemology', 'axiology']
    },
    {
      id: 'practical-philosophy', kind: 'branch', source: [[1, 15, 16], [2, 15, 16, 17, 18, 19, 23]],
      name: text('实践哲学', 'Practical philosophy'), aliases: ['治理', '文明哲学', '组织哲学', 'governance', 'civilisation', 'organisational philosophy'],
      intro: text('把可说明的价值和理由用到行为、制度与公共生活。', 'Use reasons and values to evaluate actions, institutions and civic life.'),
      explanation: text('课件将政治、经济、伦理和文明等问题归到实践哲学。它先识别冲突的价值，再比较可以执行的方案所依赖的事实、代价和责任。文明哲学可以追问制度与文化实践体现何种价值，组织哲学则把共同目的转化为可检查的工作原则。', 'The course includes political, economic, ethical and civilisational questions under practical philosophy. Identify the values in tension, then compare the evidence, costs and obligations behind possible actions. Philosophy of civilisation can examine the values expressed by institutions and practices. Organisational philosophy connects a stated purpose with rules that can be evaluated in practice.'),
      examples: [
        example('有限的图书馆经费', 'A limited library budget', '讨论是延长夜间开放还是购买教材。分别核对谁得到便利、谁承担成本，再说明依据的是需求、平等或效率。', 'Compare extending library hours with buying textbooks. Check who benefits and who bears the cost, then explain whether need, equality or efficiency guides the choice.'),
        example('从价值宣言到申诉制度', 'From values to an appeals process', '社团说重视包容。让被拒的成员获得理由、有机会申诉，并检查实际使用情况，才能评估制度是否体现该价值。', 'A club says it values inclusion. Give rejected applicants reasons and a chance to appeal, then check who uses the process to assess whether the policy reflects that value.')
      ],
      misconception: text('某项政策由组织采纳，只能说明它已经实行。评估它还需要原则、资料和受影响者的观点。', 'Adoption shows that a policy is in force. Evaluating it also requires principles, evidence and the views of those affected.'),
      related: ['political-philosophy', 'applied-ethics', 'economic-justice', 'axiology']
    },
    {
      id: 'political-philosophy', kind: 'branch', source: [[2, 15, 16], [1, 17, 21, 22, 23]],
      name: text('政治哲学', 'Political philosophy'),
      intro: text('研究公共权力的正当性，以及制度怎样体现公正。', 'Study what justifies public power and what makes institutions fair.'),
      explanation: text('治理问题可以先描述官方权力、程序和结果，再问权力凭何具有约束力。当自由、安全、公平相互冲突时，政治哲学要求说明哪些限制可以向受影响的人交代。课件以柏拉图《理想国》说明理想制度可以作为评估实际治理的思想材料。', 'Start a governance question by describing powers, procedures and outcomes. Then ask what entitles authorities to impose a rule. When freedom, safety and fairness conflict, explain how a restriction can be justified to people affected by it. The slides use Plato’s Republic to show how an ideal institution can help us assess existing governance.'),
      examples: [
        example('宿舍门禁', 'Residence hall curfews', '检查门禁能解决哪类安全问题、限制是否适度，以及夜班学生能否申请合理例外。', 'Ask which safety problem a curfew addresses, whether it is proportionate, and whether students on evening shifts can obtain a reasonable exception.'),
        example('多数票之后', 'After the majority votes', '学生会通过一项禁用特定语言的规则。多数支持说明表决结果，仍需检验规则与平等参与是否相容。', 'A student council votes to exclude a language. The vote explains how the rule passed. Equal participation remains a separate question for justification.')
      ],
      misconception: text('一项制度可以同时涉及描述性事实和规范性判断。可以先复述规则，再说明评估规则所用的原则。', 'Institutions raise both descriptive and normative questions. State the rule first and then the principle used to evaluate it.'),
      related: ['practical-philosophy', 'economic-justice', 'rukun-negara']
    },
    {
      id: 'economic-justice', kind: 'framework', source: [[2, 15, 17]],
      name: text('经济正义与分配原则', 'Economic justice and distribution'),
      intro: text('追问怎样分配资源、机会和负担才算公平。', 'Ask how to distribute resources, opportunities and burdens fairly.'),
      explanation: text('经济哲学中的分配问题常在平等、需求、贡献和机会之间作权衡。一份相同的资源未必带来相同的实际机会。比较政策时说明为什么当下优先某项原则、它会怎样影响不同处境的人，以及怎样查验后果。课件把经济正义与不同社会群体的分配相联系。', 'Distributive questions involve equality, need, contribution and opportunity. Equal shares can yield different practical opportunities. Explain why one principle takes priority in a given case, how it affects differently situated people and how you would check the consequences. The course connects economic justice with distribution across social groups.'),
      examples: [
        example('奖学金怎样给？', 'How should a scholarship be allocated?', '按成绩奖励表现，按经济困难扩大实际机会。两种制度的分歧可以通过先确定奖学金目标来厘清。', 'A merit award rewards performance. A needs-based award expands access. Clarify the aim of the scholarship before deciding between the two rules.'),
        example('共同承担维护费', 'Sharing maintenance costs', '自习楼收费可按使用时长，也可每人同额。看每种办法怎样影响常用者、低收入同学与维持公共资源的需要。', 'A study hall could charge by hours used or set a uniform fee. Compare how each affects frequent users, students on low incomes and the upkeep of the common resource.')
      ],
      misconception: text('“人人拿一样多”是一个明确原则。还可以用同一组事实检验需求、机会与贡献原则。', 'Equal shares are one clear principle. The same facts can also be used to test principles of need, opportunity and contribution.'),
      related: ['political-philosophy', 'applied-ethics', 'sejahtera']
    },
    {
      id: 'applied-ethics', kind: 'branch', source: [[2, 14, 18], [1, 15, 34]],
      name: text('应用伦理学', 'Applied ethics'), aliases: ['职业伦理', '知情同意', 'informed consent', 'privacy'],
      intro: text('用伦理原则判断具体处境里应当怎样行动。', 'Bring ethical principles to concrete choices.'),
      explanation: text('应对一个伦理情境时，先确认事实和受影响者，再找出责任与价值冲突。例如尊重自主意味着让当事人了解选项并自由决定，避免伤害要求思考可预见的风险。最后说明选择为何合适，并找一个变化条件测试理由是否需要调整。', 'Start with the facts and the people affected, then identify the obligations and values in tension. Respect for autonomy can require giving a person enough information to choose freely. Avoiding harm requires attention to foreseeable risks. Explain your decision and test how it would change if a relevant fact changed.'),
      examples: [
        example('先征求患者意见', 'Seeking a patient’s consent', '医生解释程序、风险和替代方案，保护隐私并给患者提问时间。这个行动落实了知情同意和对自主的尊重。', 'A doctor explains the procedure, risks and options, protects privacy and allows questions. This puts informed consent and respect for autonomy into practice.'),
        example('发不发一张照片？', 'Should you share a photograph?', '活动照片可能宣传社团，也可能暴露未同意者的身份。可先征求同意或使用无人可识别的照片，再衡量宣传需要。', 'An event photo could promote a club and identify people who did not agree to share it. Seek consent or choose a non-identifying photo before weighing the publicity benefit.')
      ],
      misconception: text('背诵伦理术语能帮助识别问题。判断一个具体行动，还要把术语与事实、责任和后果连起来。', 'Knowing ethical terms helps identify an issue. Judging a concrete choice requires connecting those terms with facts, duties and consequences.'),
      related: ['practical-philosophy', 'axiology', 'aristotle-virtue', 'technology-ethics']
    },
    {
      id: 'axiology', kind: 'branch', source: [[1, 14], [2, 14, 18]],
      name: text('价值论', 'Axiology'), aliases: ['value theory', 'intrinsic value', 'instrumental value'],
      intro: text('研究何谓有价值，以及不同价值凭什么值得追求。', 'Examine what has value and why different goods matter.'),
      explanation: text('价值论关心道德、审美及其他评价的理由。一个常见区分是工具价值和内在价值：前者因为它帮助实现目的，后者因为它自身值得珍视。课件把伦理与美学问题放在相近的价值维度。学习时先写清谁在评价什么，为什么重视它，遇到冲突怎样权衡。', 'Axiology examines reasons for moral, aesthetic and other evaluations. A familiar distinction is instrumental value, which helps achieve a goal, and intrinsic value, which is valued for its own sake. The course connects ethical and aesthetic evaluation. Identify who values what, their reasons and how conflicts between values might be resolved.'),
      examples: [
        example('散步的两种价值', 'Two values of a walk', '散步让人赶上公交，也可能因为观察街景和与朋友交谈而值得。后一种价值即使没有交通目的也成立。', 'A walk can get you to a bus and can also be worth taking for conversation and attention to the neighbourhood. Its second value can persist without the transport goal.'),
        example('同一建筑，不同判断', 'Evaluating the same building', '一座建筑外观好看却难以让轮椅进入。把审美判断和可及性的伦理判断写开，才看得见改造的理由。', 'A building may look beautiful while being hard to enter in a wheelchair. Distinguishing the aesthetic and access judgments clarifies the reason to change it.')
      ],
      misconception: text('同一件事可以有多种价值。评估时说明哪个价值与当下的决定最相关。', 'A single object or activity can have several values. Explain which matters most to the decision at hand.'),
      related: ['applied-ethics', 'aesthetics', 'practical-philosophy']
    },
    {
      id: 'aesthetics', kind: 'branch', source: [[1, 5, 14], [2, 14]],
      name: text('美学', 'Aesthetics'),
      intro: text('研究审美经验、艺术，以及评价美丑的理由。', 'Study aesthetic experience, art and the reasons behind aesthetic judgments.'),
      explanation: text('美学研究形式、感受和艺术评价，也问评价能否得到说明。可以先比较个人喜好，再指出作品的构图、节奏、材质和文化语境怎样支持判断。课件以感知、平衡和形式等概念引导判断。不同观众可以提出可讨论的理由，意见分歧是检视标准的机会。', 'Aesthetics asks how form, experience and judgments of art are connected. Compare personal preferences, then point to composition, rhythm, material and cultural context as reasons for a judgment. The slides use perception, balance and form as entry points. Disagreement gives viewers a chance to examine their standards.'),
      examples: [
        example('海报为何显得安静？', 'Why does a poster feel calm?', '对称的构图、大块留白和低对比色都可能支持这个判断。把颜色换亮后，再看原先的理由是否仍成立。', 'Symmetry, open space and low contrast may account for a poster’s calm effect. Try imagining brighter colours to see which reasons still apply.'),
        example('美与市场价格', 'Beauty and market price', '两版印刷品画面相同，稀有版本价格更高。收藏价格解释稀缺性的价值，美学评价还需援引作品或观看体验。', 'Two prints show the same image and the rarer version costs more. Scarcity explains the price difference. An aesthetic judgment still needs reasons about the work or the viewing experience.')
      ],
      misconception: text('审美会涉及感受，也可以给出能够讨论、质疑和改进的理由。', 'Aesthetic experience includes feeling and can be discussed through reasons that others can challenge or refine.'),
      related: ['axiology', 'theoretical-philosophy']
    },
    {
      id: 'technology-ethics', kind: 'branch', source: [[1, 16], [2, 20, 21]],
      name: text('技术哲学', 'Philosophy of technology'), aliases: ['技术伦理', 'emerging philosophy', 'algorithm'],
      intro: text('追问技术如何改变人的选择、关系、责任和生活方式。', 'Ask how technology changes choices, relationships, responsibility and ways of living.'),
      explanation: text('技术哲学从工具能做什么进一步问工具怎样引导我们行动。设计会改变哪些选择最容易被看到，哪些风险由使用者或其他人承担。课程把机器人等实例放入新兴哲学语境。讨论新情境时，先找出受影响的人，再检验效率、安全、公平等目标怎样发生冲突。', 'Philosophy of technology moves from what a tool can do to how it shapes action. Design can make some choices easier to notice and place risks on users or other people. The course uses examples such as robots to introduce emerging questions. Start with who is affected and examine tensions among efficiency, safety and fairness.'),
      examples: [
        example('导航应用怎样推荐路线？', 'How does a navigation app choose routes?', '为司机节省时间可能让安静街区承担堵车和噪音。效率指标要加上谁受益、谁承担影响这一步。', 'Saving drivers time can shift traffic and noise into quiet streets. An efficiency calculation should therefore ask who benefits and who absorbs the cost.'),
        example('自动给作业建议', 'Automatic feedback on assignments', '如果工具给出原因含糊的判断，学生需要怎样的解释和复核机会？把改善速度和保障申诉分开评估。', 'If a tool gives a judgment with unclear reasons, ask what explanation and appeal process a student needs. Evaluate the gains in speed alongside the protection of appeals.')
      ],
      misconception: text('同一技术在不同制度中的影响可能不同。实例用来定位责任和设计选择，预测需要另外核实。', 'A technology can have different effects in different institutions. Examples help locate responsibilities and design choices, while predictions require separate evidence.'),
      related: ['applied-ethics', 'environmental-philosophy', 'social-constructivism']
    },
    {
      id: 'environmental-philosophy', kind: 'branch', source: [[2, 20, 22], [8, 25, 26, 37]],
      name: text('环境哲学', 'Environmental philosophy'), aliases: ['生态哲学', 'ecological philosophy', 'environmental ethics'],
      intro: text('研究人怎样理解自然，以及对生物、环境和后代负有什么责任。', 'Examine ideas about nature and obligations to living things, ecosystems and future people.'),
      explanation: text('环境哲学将经验问题与价值问题放在一起。科学能够评估取水、开垦或污染带来的变化，伦理讨论进一步问应当保护哪些关系、谁承担代价、后代利益怎样计算。课件同时讨论人类中心取向和整体福祉。清楚说明标准，才能比较保护、利用与补偿方案。', 'Environmental philosophy connects empirical and normative questions. Science can assess changes caused by water extraction, clearing or pollution. Ethics asks which relationships to protect, who bears costs and how to consider future generations. The course brings an anthropocentric orientation and holistic well-being into view. Explicit criteria make options comparable.'),
      examples: [
        example('河流取水', 'Taking water from a river', '测量枯水期的水量与鱼类栖息地，再决定限额怎样兼顾农户生计、下游居民和生态恢复。', 'Measure dry-season flows and fish habitat, then weigh the needs of farmers, downstream residents and ecosystem recovery when setting a limit.'),
        example('一棵树的价值', 'The value of a tree', '树既有遮阴和降温作用，也可能因维持其他生物的栖息地而值得保护。两类理由可以并列评估。', 'A tree offers shade and cooling and may deserve protection as habitat for other species. Both sets of reasons can inform the same decision.')
      ],
      misconception: text('生态事实能缩小方案范围。还需要说明为什么某些后果和义务应当优先。', 'Ecological evidence narrows the options. The decision also needs reasons for prioritising certain consequences and obligations.'),
      related: ['anthropocentrism', 'applied-ethics', 'sejahtera', 'daoism']
    },
    {
      id: 'rukun-negara', kind: 'framework', source: [[1, 19, 20, 21, 22, 23], [8, 36]],
      name: text('马来西亚国家原则', 'Rukun Negara'), aliases: ['宪法至上', 'rule of law', 'supremacy of the constitution'],
      intro: text('以共同目标和五项原则讨论团结、治理与公民责任。', 'Use national aims and five principles to discuss unity, governance and civic responsibility.'),
      explanation: text('课件把国家原则分成社会目标与践行目标的原则。目标包括团结、民主、公正、文化包容与进步。原则涉及宗教信仰、忠于国家与君主、宪法至上、法治、礼貌与道德。学习时把“想建设什么社会”和“用什么原则约束行为”配对。', 'The course distinguishes social aims from principles used to pursue them. Aims include unity, democracy, justice, cultural openness and progress. The principles concern belief, loyalty, constitutional supremacy, the rule of law, and courtesy and morality. Match the society being sought with the standards for conduct and institutions.'),
      examples: [
        example('做社区节日活动', 'Planning a community festival', '为不同语言的家庭准备可理解的活动说明，并听取少数参与者意见，能把团结和文化包容转化为具体安排。', 'Accessible information across languages and opportunities for minority participants to be heard put unity and cultural openness into practice.'),
        example('投诉处理的两个标准', 'Two standards for complaints', '学校判断规则是否符合上位章程，类似核对基础规范的优先地位。对每个人按同一程序处理，则凸显规则的一致适用。', 'Checking a school rule against its governing charter illustrates the priority of a higher standard. Applying a consistent procedure to each person illustrates how the rule is used.')
      ],
      misconception: text('宪法至上着重基础规范的地位，法治着重权力和个人都受法约束。课程把两者列为相关原则。', 'Constitutional supremacy concerns the standing of the fundamental norm. The rule of law concerns how law binds people and power. The course treats them as related principles.'),
      related: ['political-philosophy', 'national-education', 'sejahtera']
    },
    {
      id: 'national-education', kind: 'framework', source: [[1, 26, 27, 29, 30], [4, 26, 27], [8, 38]],
      name: text('国家教育哲学与 PESI', 'National Education Philosophy and PESI'), aliases: ['NEP', 'FPK', '教育政策', '平衡之人', 'emotional'],
      intro: text('用身体、情绪、精神和智力四个维度理解全面发展。', 'Understand balanced development through physical, emotional, spiritual and intellectual dimensions.'),
      explanation: text('国家教育哲学强调持续而全面地发展个人潜能，并把个人福祉与家庭、社会贡献相连。在课件中，PESI 是便于理解平衡的标记。身体关心健康与行动，情绪关心识别和调节情感，精神联系信仰、价值或意义，智力涉及理解、判断与求知。一个场景可能涉及多个维度，可以据主要线索判断。', 'The National Education Philosophy connects continuing, holistic personal development with well-being and contributions to family and society. PESI is the course’s shorthand for physical health and activity, emotional recognition and regulation, spiritual belief and meaning, and intellectual understanding and judgment. Several dimensions can occur in one case. Identify the one most directly supported by the clues.'),
      examples: [
        example('考前的同理心与压力', 'Empathy and exam stress', '察觉同伴焦虑并调整自己的紧张，主要体现情绪维度。制定每天训练计划则更直接表现身体维度。', 'Noticing a classmate’s anxiety and regulating your own stress mainly illustrates the emotional dimension. A regular exercise plan relates more directly to the physical dimension.'),
        example('同一个志愿活动', 'One volunteer activity', '设计问卷运用智力，倾听居民的担忧练习情绪能力，思考为什么持续服务涉及精神与意义。不要用活动名称代替线索。', 'Designing a survey uses intellectual skills. Listening to residents exercises emotional skills. Reflecting on why service matters connects with values and meaning. Use the specific action as evidence.')
      ],
      misconception: text('十月真题 Q3 保留原印 National Education Policy。它考查的平衡指标和培养目标对应课件的 National Education Philosophy。', 'October Q3 retains the printed wording National Education Policy. Its development goals match the National Education Philosophy presented in the slides.'),
      related: ['sejahtera', 'rukun-negara']
    },
    {
      id: 'sejahtera', kind: 'framework', source: [[1, 32, 33, 34, 35, 37], [4, 29, 31], [8, 36, 37, 38, 39]],
      name: text('Sejahtera 整体福祉', 'Sejahtera and holistic well-being'), aliases: ['microcosm', 'macrocosm', '内在', '外在'],
      intro: text('同时观察个体内在平衡与其社会、经济和生态关系。', 'Consider personal balance in relation to social, economic and ecological conditions.'),
      explanation: text('课件用微观层面描述个体的身体、情绪、精神和认知等方面，用宏观层面关注人所处的社会、经济和环境关系。两层可以相互作用。判断生活或项目是否增进福祉时，要看收益在谁身上、代价是否转移到别处，以及结果能否持续。不同章节的图表各有侧重。', 'The slides describe a microcosm of bodily, emotional, spiritual and cognitive development and a macrocosm of wider social, economic and environmental relations. These layers can influence each other. In a project, ask who gains, where costs are shifted and whether gains can last. Different chapter diagrams emphasise different dimensions.'),
      examples: [
        example('校园安静空间', 'A quiet campus space', '安静空间可以帮助专注和情绪恢复。还要看残障同学能否进入、维护费用由谁承担、绿地是否被破坏。', 'A quiet space can support focus and emotional recovery. Also ask who can access it, who pays for maintenance and how the project affects the green space.'),
        example('在题目中分层', 'Distinguishing layers on a test', '睡眠和情绪管理主要反映个人层面。社区资源分配、生态保护和工作条件更接近外部关系，具体分类以题目所指课件框架为准。', 'Sleep and emotional regulation primarily concern the individual. Resource distribution, ecological protection and working conditions concern outward relationships. Use the diagram named in the question for particular labels.')
      ],
      misconception: text('Sejahtera 可译为福祉或安康。课件在这个词上发展出整体关系框架，复习时保留原词便于对应题目。', 'Sejahtera can be glossed as well-being. The course develops it as a relational framework. Keeping the original term helps when reading an exam question.'),
      related: ['national-education', 'environmental-philosophy', 'local-wisdom']
    },
    {
      id: 'analytic-philosophy', kind: 'tradition', source: [[2, 4, 6]],
      name: text('分析哲学', 'Analytic philosophy'), aliases: ['逻辑分析', 'language analysis', '西方哲学'],
      intro: text('以概念澄清和可检验的论证处理哲学问题。', 'Address philosophical problems through conceptual clarity and testable arguments.'),
      explanation: text('分析传统中常见的做法是辨析概念和语言，明确列出前提，评价结论是否得到支持。课件将现代西方的一些方法概括为理性论证和解决问题。这个说法可以帮助识别部分传统，学习者还需从实际文本判断具体作者的方法。自然、生命和社会也都是西方哲学关注的问题。', 'Analytic work often clarifies concepts and language, states premises explicitly and asks whether they support the conclusion. The course highlights rational argument and problem-solving in some modern Western approaches. This identifies an important strand. Individual texts and arguments still need to be examined on their own terms.'),
      examples: [
        example('什么叫“隐私被侵犯”？', 'What counts as an invasion of privacy?', '把未经同意收集、公开敏感内容和观察公共行为分开，用反例检验一个定义能否处理不同情形。', 'Distinguish collection without consent, publication of sensitive content and observation of public behaviour. Test one definition against all three cases.'),
        example('两个“可以”', 'Two meanings of “can”', '“我可以进入”可能指门未锁，也可能指我有权限。区分实际能力与规范许可，可避免把第一种说法推成第二种。', '“I can enter” could mean the door is unlocked or that I have permission. Distinguishing ability from permission blocks an inference from the first meaning to the second.')
      ],
      misconception: text('逻辑实证主义与部分分析传统有历史联系。分析哲学还包含许多哲学主题和研究方法。', 'Logical positivism has historical ties to some analytic work. Analytic philosophy includes a wider range of topics and methods.'),
      related: ['logical-positivism', 'socratic-inquiry', 'deduction', 'language-games']
    },
    {
      id: 'logical-positivism', kind: 'theory', source: [[2, 4], [5, 38, 39, 40], [7, 13]],
      name: text('逻辑实证主义', 'Logical positivism'), aliases: ['verification', '可证实性', 'Vienna Circle'],
      intro: text('以逻辑分析和经验检验讨论陈述的认知意义。', 'Use logical analysis and empirical testing to ask what gives statements cognitive meaning.'),
      explanation: text('不同版本的检验原则有差异。入门时可区分通过逻辑或定义处理的陈述，以及能够诉诸经验检验的事实主张。课件以此讨论形而上学陈述的地位。该原则也遭遇难题，例如怎样检验普遍规律，以及原则自身的地位。', 'Verification principles differ in their details. A useful starting distinction is between statements settled through logic or definition and factual claims open to empirical testing. The course uses this distinction to discuss metaphysical statements. The programme faces questions about universal laws and the status of its own criterion.'),
      examples: [
        example('电池电压', 'Battery voltage', '“这节电池两端电压是 1.5 伏”可说明测量条件和仪表，测量也可能推翻这个主张。', 'A claim that a battery has a terminal voltage of 1.5 volts specifies a measurement that could also show the claim is mistaken.'),
        example('所有乌鸦都是黑色', 'All ravens are black', '观察许多乌鸦有助于检验说法，但有限次数无法逐一检查所有个体。这显示严格证实标准面对普遍陈述的困难。', 'Observing many ravens tests the claim, but finite observations do not exhaust all birds. This illustrates a challenge for strict verification of universal statements.')
      ],
      misconception: text('讨论的是命题的认知意义与检验方式。价值表达仍可有引导行动和沟通态度的作用。', 'The question concerns cognitive meaning and testing. Value statements can still guide action and communicate attitudes.'),
      related: ['analytic-philosophy', 'empiricism', 'positivism', 'operationalism']
    },
    {
      id: 'argument', kind: 'method', source: [[3, 3, 7, 8, 9], [2, 14]],
      name: text('逻辑与论证', 'Logic and argument'), aliases: ['命题', '前提', '结论', 'proposition', 'premise', 'conclusion'],
      intro: text('分清一个人想让你相信什么，以及他给了哪些理由。', 'Identify the claim you are asked to accept and the reasons offered for it.'),
      explanation: text('能够说真或假的陈述可以表达命题。在论证中，前提为结论提供支持。阅读时可用自己的话重写前提和结论，再检查它们是否可接受、与结论有关，以及支持是否充分。结论在文章中的位置由写法决定。', 'A statement that can be true or false can express a proposition. In an argument, premises support a conclusion. Restate both in your own words, then check whether the premises are acceptable, relevant and sufficient. The conclusion can appear anywhere in the text.'),
      examples: [
        example('先说结论', 'A conclusion put first', '“今晚早点走吧，末班车十点就开。”前提是车在十点开走，结论是早点出发，还隐含着希望赶上车的目标。', '“Let’s leave early. The last bus departs at ten.” The departure time is a premise. Leaving early is the conclusion. Catching the bus is an unstated goal.'),
        example('补出隐含前提', 'An unstated premise', '“这项规定给我们带来便利，所以应该保留。”还需说明便利能否抵过成本或对他人的影响。', '“This rule makes life easier for us, so we should keep it.” Ask whether that convenience outweighs the costs and effects on other people.')
      ],
      misconception: text('“我喜欢这项规定”是一项可以表达的判断。把它当作结论或证据之前，先找出它在这段话里扮演的角色。', '“I like this rule” expresses a judgement. Look at the role it plays in the passage before treating it as evidence or a conclusion.'),
      related: ['deduction', 'induction', 'fallacies']
    },
    {
      id: 'deduction', kind: 'method', source: [[3, 7, 8, 10, 11, 12, 15]],
      name: text('演绎推理', 'Deductive reasoning'), aliases: ['演绎逻辑', 'deduction', 'validity', 'soundness', '有效性', '健全性', '三段论'],
      intro: text('在有效的演绎中，前提若全真，结论一定真。', 'In a valid deduction, true premises guarantee a true conclusion.'),
      explanation: text('检验有效性时，设想是否存在前提全真而结论假的情形。有这样的反例，推理就无效。健全性还要求前提实际上为真。课件常用一般规则推出个别结论来教学，决定性判准是前提能否保证结论。', 'To test validity, ask whether the premises could all be true while the conclusion is false. A counterexample shows invalidity. Soundness requires validity and true premises. The slides often move from a general rule to a case. The decisive test is whether the premises guarantee the conclusion.'),
      examples: [
        example('规则应用于个案', 'Applying a rule', '所有长方形有四条边，卡片是长方形，所以卡片有四条边。接受前两条也就必须接受结论。', 'All rectangles have four sides. This card is a rectangle. It follows that the card has four sides.'),
        example('形式有效，前提待核', 'Valid form with a premise to check', '“所有夜班巴士都免费，这辆车是夜班巴士，所以它免费。”结构有效。若第一条不实，整个论证就不健全。', '“All night buses are free. This is a night bus, so it is free.” The form is valid. If the first premise is false, the argument is unsound.')
      ],
      misconception: text('结论碰巧正确也需要检查推理。比较“有票就能入场”和“能入场便一定有票”，后者还可能漏掉免票情形。', 'A true conclusion still needs a check on how it follows. “A ticket lets you enter” and “If you can enter, you have a ticket” differ when a guest may enter free.'),
      related: ['argument', 'induction', 'abduction', 'fallacies']
    },
    {
      id: 'induction', kind: 'method', source: [[3, 13, 14, 15]],
      name: text('归纳推理', 'Inductive reasoning'), aliases: ['归纳逻辑', 'induction', '概括', 'generalisation'],
      intro: text('从观察到的样本或规律，推出有支持但仍可修正的结论。', 'Generalise from observed patterns or samples to a conclusion that may be revised.'),
      explanation: text('常见归纳从多个实例推断总体规律，或用过去的记录预测新情形。样本的数量、代表性、测量质量和反例决定支持有多强。结论的范围应该贴近证据的范围。', 'Induction often generalises from several instances or predicts a new case from past records. Sample size, representativeness, measurement quality and counterexamples affect its strength. Match the scope of the conclusion to the scope of the evidence.'),
      examples: [
        example('校园巴士准点率', 'Campus bus reliability', '连续两周分早中晚记录到站，发现多数在五分钟内到达，可以估计平日准点情况。考试周变化应另行调查。', 'Record arrivals at different times for two weeks. If most arrive within five minutes, estimate regular weekday reliability. Collect separate evidence for exam week.'),
        example('从样本推回总体', 'Generalising from a sample', '从每个年级随机抽取一些学生调查图书借阅，比只问图书馆里的学生更有根据。两种样本都应报告误差和限制。', 'Randomly sampling students from each year gives a better basis for estimating borrowing than surveying only library users. Report uncertainty and limits for either sample.')
      ],
      misconception: text('“多数时候如此”与“所有时候都如此”需要不同强度的证据。一个反例足以推翻后者。', '“Usually” and “always” require different levels of evidence. A single counterexample defeats “always”.'),
      related: ['deduction', 'abduction', 'hasty-generalisation', 'empiricism']
    },
    {
      id: 'abduction', kind: 'method', source: [[3, 16, 17]],
      name: text('溯因推理', 'Abductive reasoning'), aliases: ['abduction', '最佳解释', 'IBE', 'inference to the best explanation'],
      intro: text('对已经观察到的线索寻找目前解释力最强的假说。', 'Look for the hypothesis that best explains the clues currently available.'),
      explanation: text('先提出若干可能原因，再比较它们覆盖了多少线索，需要多少额外假设，以及可以作何预测。最合适的解释是可修正的工作假说。新证据可让候选解释重新排序。', 'Generate alternative hypotheses. Compare how many clues they explain, how many extra assumptions they need and what they predict. The leading explanation is a working hypothesis. New evidence can change the ranking.'),
      examples: [
        example('窗边积水', 'A puddle by the window', '刚下大雨，水从窗沿向内扩散。漏雨比杯子打翻能解释更多线索。检查窗缝或在下一场雨时观察，能继续检验。', 'It rained heavily and the water trails inward from the sill. A window leak fits more clues than a spilled cup. Inspect the seal or observe the next rain to test the theory.'),
        example('麦克风没有声音', 'A silent microphone', '只有某一应用收不到声音，系统录音正常，优先检查该应用权限。若系统录音也失败，就重新考虑设备或连接。', 'If only one app loses audio and the system recorder works, check that app’s permissions. If the recorder also fails, reconsider the device or connection.')
      ],
      misconception: text('可解释现象只是第一步。要称得上最佳，还需要比较其他解释并找可区分它们的证据。', 'An explanation that fits is a starting point. Calling it the best requires alternatives and evidence that can distinguish them.'),
      related: ['induction', 'deduction', 'heuristics']
    },
    {
      id: 'intuition', kind: 'method', source: [[3, 18]],
      name: text('直觉', 'Intuition'), aliases: ['直觉推理', 'intuitive reasoning'],
      intro: text('在说得出完整理由之前出现的判断或感受。', 'A judgement or impression that occurs before you can state a full line of reasoning.'),
      explanation: text('经验、习惯和情境都可能影响直觉。它能提示哪里值得多看一眼，也可能受熟悉度或刻板印象影响。把第一反应当作可检查的假设，再寻找能支持或推翻它的理由。', 'Experience, habits and context can shape intuition. It can flag something to investigate and can also be shaped by familiarity or stereotypes. Treat a first impression as a hypothesis to check with reasons.'),
      examples: [
        example('熟悉的错音', 'A familiar wrong note', '乐手立刻听出和弦有问题，随后逐个核对音高，说明哪一个音触发了判断。', 'A musician hears a wrong chord immediately, then checks the pitches to explain which note caused the impression.'),
        example('下意识信任', 'Immediate trust', '说话流利的人让你直觉上觉得可靠。比较可查事实、利益关系和对出错的回应，检验这个印象。', 'Fluent speech can create immediate trust. Check verifiable claims, incentives and responses to mistakes to test the impression.')
      ],
      misconception: text('在熟悉而反馈清楚的环境中，练出的直觉可较可靠。换到新领域时，重新检查支撑判断的经验。', 'Practised intuition may be reliable in settings with clear feedback. In a new domain, check whether the experience behind it applies.'),
      related: ['heuristics', 'epistemology', 'skepticism']
    },
    {
      id: 'heuristics', kind: 'method', source: [[3, 19, 20]],
      name: text('启发式方法', 'Heuristics'), aliases: ['heuristic reasoning', '试错', '横向思维', 'trial and error', 'lateral thinking'],
      intro: text('用可执行的简化策略，在有限时间里找到够用的方案。', 'Use a workable shortcut to find a satisfactory solution under constraints.'),
      explanation: text('启发式根据经验或线索缩小搜索范围。课件举出试错与横向思维，前者小步试验并利用反馈，后者检查问题里被当作理所当然的限制。选择策略时考虑时间、试错成本和后果。', 'A heuristic narrows a search using experience or clues. The slides include trial and error, where small experiments provide feedback, and lateral thinking, where you reconsider a constraint taken for granted. Consider time, cost and consequences.'),
      examples: [
        example('找一条能赶上的路', 'Find a route that works', '时间紧时先看两个熟悉的换乘点，选一条在截止前能到的路。方案够用，之后仍可比较更快路线。', 'With little time, check two familiar connections and take one that arrives before the deadline. You can compare faster routes later.'),
        example('换一种安排', 'Reframe the arrangement', '四人找不到连续一小时，先检查“必须同时讨论整份文件”的假设。异步批注加十五分钟决策会可能解决僵局。', 'Four people cannot find a shared hour. Question whether they need to discuss the entire document together. Comments plus a short decision meeting may resolve the problem.')
      ],
      misconception: text('判断启发式是否合适，要看它是否高效取得可接受的结果。安全或后果严重的问题需要进一步检验。', 'Judge a heuristic by whether it reaches an acceptable result efficiently. In high-stakes cases, check the result more thoroughly.'),
      related: ['abduction', 'intuition', 'pragmatism']
    },
    {
      id: 'fallacies', kind: 'method', source: [[3, 22, 23, 24, 25, 26, 27, 28, 29, 30]],
      name: text('形式与非形式谬误', 'Formal and informal fallacies'), aliases: ['逻辑谬误', 'formal fallacy', 'informal fallacy'],
      intro: text('定位推理哪里失去支持。先看结构，再看用词、证据和语境。', 'Locate a failure of support by checking form, wording, evidence and context.'),
      explanation: text('形式谬误的缺陷可从结构识别，例如肯定后件。非形式谬误通常要了解具体语境，例如样本的代表性、理由的相关性或对对手观点的转述。点出原因和缺失证据，比背诵名称更能帮助修正论证。', 'A formal fallacy can be identified from the logical form, as in affirming the consequent. Informal fallacies often depend on context, such as sample quality, relevance or how an opponent’s view is reported. Describe the failure and missing evidence to repair the argument.'),
      examples: [
        example('湿地面与下雨', 'A wet pavement', '下雨会打湿地面，地面湿了，所以一定下过雨。洒水车可以让前两句成立而结论为假，说明形式无效。', 'Rain makes the pavement wet. It is wet, so it must have rained. A sprinkler can make both premises true and the conclusion false, exposing a problem in form.'),
        example('两条差评', 'Two bad reviews', '两条差评可作为继续调查的线索。若据此断定所有批次都有问题，就需要检查样本和结论的范围。', 'Two bad reviews are leads for investigation. If they are used to condemn every batch, check whether the sample supports that scope.')
      ],
      misconception: text('有谬误的论证仍可能碰巧得出真结论。可以保留结论作为待检验主张，再寻找可靠支持。', 'An argument containing a fallacy may happen to reach a true conclusion. Keep the claim open and look for sounder support.'),
      related: ['argument', 'ad-hominem', 'hasty-generalisation', 'slippery-slope']
    },
    {
      id: 'ad-hominem', kind: 'method', source: [[3, 24, 25]],
      name: text('人身攻击谬误', 'Ad hominem'), aliases: ['攻击个人', 'personal attack'],
      intro: text('用针对说话者的攻击代替对论证的检验。', 'Dismiss an argument by attacking its speaker without examining their reasons.'),
      explanation: text('把攻击句删掉，检查对方提出的数据和推理是否仍有待回答。可信度、资格和利益关系有时关系到证言的权重。需要说明它们如何影响这份具体证据。', 'Remove the personal comment and see whether the reasons and evidence still stand unanswered. Credibility, expertise and incentives can affect the weight of testimony. Show how they bear on this particular evidence.'),
      examples: [
        example('谁发现了算错？', 'Who spotted the error?', '“她只是新生，她说算错肯定不对。”复算可直接判断错误，入学时间没有回答计算问题。', '“She is a first-year student, so her correction must be wrong.” Rechecking the arithmetic addresses the claim directly.'),
        example('利益相关的评价', 'A reviewer with an interest', '发现评价者收了报酬，应把可能偏向纳入考量，并核查独立记录。评论者个人性格与产品能否完成测试无直接关系。', 'A paid reviewer may have an incentive to be favourable. Check independent records. Remarks about the reviewer’s personality do not resolve whether the product passed the test.')
      ],
      misconception: text('可核实的利益冲突会影响某些证言的权重。把证言的可靠性与结论本身的其他证据一同检查。', 'A documented conflict of interest can affect testimony. Check its reliability alongside any other evidence for the claim.'),
      related: ['fallacies', 'appeal-to-authority']
    },
    {
      id: 'post-hoc', kind: 'method', source: [[3, 24, 25], [5, 8, 10]],
      name: text('事后归因谬误', 'Post hoc fallacy'), aliases: ['后此因彼', 'post hoc ergo propter hoc', 'correlation', '因果'],
      intro: text('只凭两件事的先后顺序，就断定前者造成了后者。', 'Treat sequence alone as proof of causation.'),
      explanation: text('在因果推断中还要考虑共同原因、原有趋势、比较对象和作用机制。时间顺序能帮助排除某些解释，也可能给出待研究的线索。', 'Causal inference also considers common causes, earlier trends, comparison cases and mechanisms. Timing can rule out some explanations and give you a lead to investigate.'),
      examples: [
        example('换笔后分数上涨', 'A new pen and a higher mark', '这次考试分数较高，但题目和复习时间也不同。单凭前后分数，无法分离换笔的作用。', 'The score rose after a pen change. The questions and study time also changed. The before-and-after scores cannot isolate the effect of the pen.'),
        example('新开放时间与客流', 'Opening hours and attendance', '延长开放后人变多可作为线索。比较同期其他校区、往年趋势及新增时段的人流，才能更具体地解释变化。', 'Attendance rose after longer hours. Compare other campuses, past trends and visits in the newly open hours to develop a stronger explanation.')
      ],
      misconception: text('时间顺序相关。把它与机制、对照和排除其他解释一起用，才有更有力的因果论证。', 'Timing matters. Pair it with mechanisms, comparisons and tests of alternative explanations to build a stronger causal argument.'),
      related: ['fallacies', 'abduction', 'causality']
    },
    {
      id: 'hasty-generalisation', kind: 'method', source: [[3, 13, 14, 24, 26]],
      name: text('草率概括谬误', 'Hasty generalisation'), aliases: ['以偏概全', 'hasty generalization', '小样本'],
      intro: text('根据过少或偏置的实例，对更大范围作出过强判断。', 'Make a broad claim from too few or unrepresentative cases.'),
      explanation: text('指出样本是什么、结论指向哪个总体，再问研究对象有何差异，以及有没有反例。可以把结论改为描述实际观察到的对象，或补充能代表总体的样本。', 'Identify the sample and the population mentioned in the conclusion. Ask how cases vary and whether there are counterexamples. Narrow the conclusion to the actual observations or obtain a more representative sample.'),
      examples: [
        example('两个坏充电器', 'Two broken chargers', '同一家店买到两件坏产品，足以支持报告这批货的问题。要判断整个品牌，还须看其他批次和对照数据。', 'Two defective chargers from one shop support reporting an issue with that batch. Assessing the whole brand takes other batches and comparative data.'),
        example('用餐时间的问卷', 'A lunchtime survey', '只在午餐时问排队者学校有没有足够的餐位，会漏掉错峰用餐的体验。样本规模大也可能偏置。', 'A lunch queue survey misses those who eat at quieter times. Even a large sample can be biased.')
      ],
      misconception: text('一个真实反例能推翻带“所有”的断言。用几个例子建立总体趋势时，则需要检验它们的代表性。', 'One real counterexample can refute an “all” claim. Establishing a population trend from examples requires a check on representativeness.'),
      related: ['fallacies', 'induction']
    },
    {
      id: 'straw-man', kind: 'method', source: [[3, 24, 26]],
      name: text('稻草人谬误', 'Straw man'), aliases: ['歪曲观点', 'strawman'],
      intro: text('先把别人的主张改得更极端或更弱，再反驳改过的版本。', 'Replace an argument with a weaker or more extreme version and attack that version.'),
      explanation: text('把原主张和批评者复述的版本并排，检查范围、强度和限定条件是否变了。最好请对方确认复述准确，再就真正存在的分歧展开论证。', 'Put the original claim next to the critic’s restatement. Check for changes in scope, strength or conditions. Ask the speaker whether the restatement is fair before responding.'),
      examples: [
        example('从限时到禁用', 'From a time limit to a ban', '甲提议考试时手机静音。乙反驳“禁止所有人使用手机不切实际”。乙没有回应只限考试期间的提议。', 'A proposes silencing phones during exams. B argues that banning all phone use is impractical. B has changed the scope of the proposal.'),
        example('准确复述再反驳', 'Restate before objecting', '对方主张“先试行两周”。合理批评可以具体说明试行样本为什么太小，并提供可比较的期限。', 'The proposal is a two-week trial. A fair objection explains why that trial may be too small and proposes a different period for comparison.')
      ],
      misconception: text('准确复述可以缩短句子。保留原来的条件、范围和程度，才能真正回应对方。', 'An accurate restatement may be shorter. Preserve the original conditions, scope and strength so the reply addresses the real point.'),
      related: ['fallacies', 'red-herring']
    },
    {
      id: 'red-herring', kind: 'method', source: [[3, 24, 27]],
      name: text('转移话题谬误', 'Red herring'), aliases: ['转移论题', 'diversion'],
      intro: text('引入吸引注意但无法回答原问题的内容。', 'Introduce a distracting issue that leaves the original question unanswered.'),
      explanation: text('写下最初要解决的问题，再问新内容如何改变答案。若缺少这条关系，需要先回到原问题，之后再处理第二个议题。', 'Write down the original question and ask how the new point changes its answer. If no connection is given, return to the original issue and discuss the other topic separately.'),
      examples: [
        example('食堂卫生与价格', 'Canteen hygiene and price', '询问厨房清洁记录，负责人谈套餐便宜。价格可以另聊，清洁记录的问题仍待回答。', 'Asked about cleaning records, a manager talks about low meal prices. The price is a separate issue and the cleaning question remains.'),
        example('相关的追问', 'A relevant follow-up', '若问清洁经费是否足够，采购价格可能相关。还要说明支出如何影响清洁频率或质量。', 'Supply costs may matter when the question is whether the cleaning budget is sufficient. Explain how spending affects cleaning frequency or quality.')
      ],
      misconception: text('换角度有时能解决原问题。判断是否偏题，要看是否能补出一条清楚的相关理由。', 'A change of perspective may help solve a problem. Look for a clear connection to tell whether a new point is relevant.'),
      related: ['fallacies', 'straw-man']
    },
    {
      id: 'appeal-to-emotion', kind: 'method', source: [[3, 24, 27]],
      name: text('诉诸情感谬误', 'Fallacious appeal to emotion'), aliases: ['情绪操纵', 'appeal to pity', 'appeal to fear'],
      intro: text('用害怕、同情或愤怒填补事实或论证缺失。', 'Use fear, pity or anger to fill a gap in evidence or reasoning.'),
      explanation: text('情绪能揭示问题对人的影响。区分“这个情境值得关心”和“这项事实或政策主张得到支持”。后者还需核实影响、比较方案并呈现相关理由。', 'Emotions can reveal how an issue affects people. Distinguish why a situation matters from what supports a factual or policy claim. Evidence and comparisons still matter for the claim.'),
      examples: [
        example('同情与评分', 'Sympathy and grading', '学生遇到困难，有理由讨论补交机会。若题目本身答错，单凭同情无法证明答案正确。', 'A student’s hardship can justify discussing an extension. Sympathy alone cannot show that an incorrect answer is correct.'),
        example('恐惧与安全决策', 'Fear and a safety decision', '居民害怕走黑暗路段。把恐惧与照明、交通和事故资料结合，可以评估改造方案。', 'Residents fear walking on a dark route. Lighting, traffic and incident records add a basis for comparing improvements.')
      ],
      misconception: text('遇到道德问题时，情绪能提示值得关注的人和代价。把提示转化为可讨论的证据与原则。', 'In ethical questions, emotions can draw attention to people and costs. Turn those observations into evidence and principles others can discuss.'),
      related: ['fallacies', 'applied-ethics']
    },
    {
      id: 'appeal-to-authority', kind: 'method', source: [[3, 24, 28]],
      name: text('诉诸权威谬误', 'Fallacious appeal to authority'), aliases: ['权威背书', 'appeal to expertise'],
      intro: text('引用名声或身份来支持超出其专长和证据范围的判断。', 'Use status or fame as support beyond the person’s expertise and evidence.'),
      explanation: text('评价专家证言时，要看专长是否贴合问题，结论依据是什么，以及其他合格专家能否复核。有依据的相关专业意见能作为证据，其权重取决于这些条件。', 'Check whether expertise is relevant, what evidence supports the opinion and whether qualified peers can review it. Relevant, evidence-based testimony can carry weight according to these conditions.'),
      examples: [
        example('名人推荐充电器', 'A celebrity endorses a charger', '演员的知名度无法证明电气安全。查相关标准下的检验报告，更能回答这个问题。', 'An actor’s fame does not establish electrical safety. Test reports under relevant standards address the claim.'),
        example('真正相关的技术意见', 'Relevant technical advice', '工程师提供具体检测读数和可重复步骤，其他专业人士能复测。这些资料提高了意见的可信度。', 'An engineer gives readings and a repeatable procedure. Other qualified people can repeat the test, which strengthens the testimony.')
      ],
      misconception: text('单凭头衔难以评价一项断言。优先了解专长、证据及它们与问题的关联。', 'A title alone tells you little about a claim. Check the expertise, evidence and their relevance to the question.'),
      related: ['fallacies', 'ad-hominem', 'bandwagon']
    },
    {
      id: 'slippery-slope', kind: 'method', source: [[3, 24, 28]],
      name: text('滑坡谬误', 'Slippery slope'), aliases: ['滑坡论证', 'domino effect'],
      intro: text('从小变化一路推到严重后果，跳过了中间环节的证据。', 'Predict a severe consequence from a small step without supporting the intervening links.'),
      explanation: text('把这条链按步骤写开。问每一步需要什么机制，发生概率有多大，中间能否设置限制。能用明确机制和证据支撑的风险链值得认真评估。', 'Write out the chain. Ask what mechanism connects each step, how likely it is and what safeguards could interrupt it. A well-supported chain is worth taking seriously as a risk.'),
      examples: [
        example('一次延期', 'A single extension', '“给一次合理延期，今后就没有任何截止日期。”中间缺少如何从个案变成常规的依据，明确的条件可以阻断推断。', '“Grant one justified extension and deadlines will disappear.” This skips the transition from a specific case to a general policy. Clear conditions can interrupt the chain.'),
        example('有证据的风险', 'A risk with evidence', '若预算超支会自动触发借贷，合同又规定利息，说明规则和计算可建立一条有根据的风险链。', 'If a budget overrun triggers a loan and the contract sets interest, the rules and figures can support a credible warning.')
      ],
      misconception: text('出现多个后果的论证可成立。要检查的是每个关键环节是否有独立支持。', 'A chain of consequences can be sound. Check that each key link has independent support.'),
      related: ['fallacies', 'post-hoc', 'causality']
    },
    {
      id: 'bandwagon', kind: 'method', source: [[3, 24, 29]],
      name: text('从众谬误', 'Bandwagon fallacy'), aliases: ['诉诸大众', 'appeal to popularity', 'ad populum'],
      intro: text('把多数人的喜欢、相信或选择，当成断言为真的充分理由。', 'Treat widespread preference or belief as enough to prove a claim.'),
      explanation: text('统计选择可以回答“谁喜欢”或“何者流行”。若主张是疗效、性能或公平性，需要另外找到适合评估它的证据。还要分清独立判断形成的共识和互相模仿的流行。', 'A count of choices can answer what is popular. Efficacy, performance and fairness require evidence suited to those claims. Ask whether agreement comes from independent checks or imitation.'),
      examples: [
        example('下载量与可靠性', 'Downloads and reliability', '下载量可以反映流行度。要判断资料是否可靠，应抽查来源及事实准确性。', 'Downloads indicate popularity. To judge reliability, check sources and factual accuracy.'),
        example('人数正好与问题相关', 'When popularity answers the question', '若在选择晚会歌曲，多数票直接提供偏好资料。评价音乐创作水平还要选择其他标准。', 'A majority vote provides relevant preference data when choosing a song for an event. Judging its composition requires other criteria.')
      ],
      misconception: text('多数人的偏好在集体决策里可能有关。先说清要回答的是偏好、事实还是质量。', 'Majority preference can matter in group decisions. First establish whether the question is about preference, fact or quality.'),
      related: ['fallacies', 'appeal-to-authority']
    },
    {
      id: 'false-dilemma', kind: 'method', source: [[3, 24, 30]],
      name: text('虚假两难谬误', 'False dilemma'), aliases: ['非黑即白', 'false dichotomy', 'either or'],
      intro: text('把有其他可行选项的决定，说成只能二选一。', 'Present a decision as a choice between two options when other options remain.'),
      explanation: text('将已列选项与实际限制分开。寻找能同时满足部分要求的折中、不同时间的组合，或需要重新定义的问题。若两项确实穷尽可能，也可以说明它们为什么覆盖全部。', 'Separate the listed options from real constraints. Look for compromises, combinations over time or a better framing. If two choices exhaust the possibilities, explain why.'),
      examples: [
        example('图书馆预算', 'The library budget', '“要么全买书，要么全延长开放。”还可按测试需求分配预算，或试行特定日期。', '“Spend everything on books or everything on longer hours.” The library could split funds based on demand or pilot selected days.'),
        example('真正完整的两类', 'A genuine two-way distinction', '按固定截止时间，记录要么已提交，要么当时尚未提交。这两个状态覆盖了该时点的全部情况。', 'At a fixed deadline, a form had been submitted or it had not. These two states exhaust the question at that point in time.')
      ],
      misconception: text('题目出现两个选项不足以诊断谬误。检查是否有被排除的真实可能。', 'Two options by themselves do not establish a fallacy. Look for a real possibility that has been excluded.'),
      related: ['fallacies', 'heuristics']
    },
    {
      id: 'examined-good-life', kind: 'tradition', source: [[1, 9], [2, 3, 5], [4, 13, 14, 15]],
      name: text('反思的人生与美好生活', 'The examined life and the good life'), aliases: ['苏格拉底', 'Socrates', 'happiness', 'eudaimonia'],
      intro: text('检验一个目标为何值得追求，再看日常选择如何体现它。', 'Test why a goal is worth pursuing and how daily choices reflect it.'),
      explanation: text('苏格拉底式自省把注意力放在选择背后的理由上。希腊的美好生活讨论进一步追问幸福与正义、品格、快乐或友谊的关系。课件用这些分歧说明，同一个“幸福”可能指当下感受，也可能指一段生活整体过得如何。', 'Socratic self-examination asks what reasons stand behind a choice. Greek inquiries into the good life ask how happiness relates to justice, character, pleasure or friendship. “Happiness” can refer to a feeling right now or to how well a life goes over time.'),
      examples: [
        example('高分和合作', 'High marks and cooperation', '追求高分时，检查是在学习、比较名次还是寻求肯定。知道目的以后，可以判断帮助同伴是否与自己的目标冲突。', 'When pursuing high marks, ask whether you want to learn, rank above others or gain approval. The answer helps you judge whether helping a peer conflicts with your goal.'),
        example('周末如何度过', 'How to spend a weekend', '休息、陪伴家人和完成承诺各有价值。用“如果每周都这样过，我会认可这段生活吗”检验短期选择。', 'Rest, time with family and keeping promises can all matter. Test a short-term choice by asking whether you would endorse a life that follows this pattern every week.')
      ],
      misconception: text('对人生选择的审视需要考虑具体理由和代价。课件中的不同学派给出了可以比较的回答。', 'Examining a life calls for particular reasons and trade-offs. The traditions in the slides offer answers you can compare.'),
      related: ['socratic-inquiry', 'plato-justice', 'aristotle-virtue', 'epicureanism', 'cynicism', 'existentialism']
    },
    {
      id: 'natural-philosophy', kind: 'branch', source: [[2, 3, 4, 5], [5, 3, 8, 11, 12]],
      name: text('自然哲学', 'Natural philosophy'), aliases: ['nature', '自然研究', 'cosmology'],
      intro: text('系统追问自然怎样运作、变化依据什么，以及我们怎样解释它。', 'Investigate how nature works, what accounts for change and how to explain it.'),
      explanation: text('自然哲学曾把观察、数学与关于原因和存在的推理放在一起。现代专业科学承担了许多原来在此讨论的经验问题，关于什么算解释和规律的哲学问题仍可继续追问。第二章把它与美好生活及哲学的学术分析并列。', 'Natural philosophy historically combined observation and mathematics with reasoning about causes and reality. Modern sciences investigate many of the empirical questions it once covered. Philosophy can still ask what counts as an explanation or a law. Chapter 2 places it alongside inquiry into the good life and academic analysis.'),
      examples: [
        example('日影的变化', 'A changing shadow', '先记录日影移动，再比较太阳移动与地球自转等模型各自预测什么。哲学提问涉及什么证据能区分模型。', 'Record a shadow’s movement and compare what different models predict. The philosophical question asks what observations would distinguish the models.'),
        example('为什么说是规律？', 'What makes it a law?', '反复观测到同种变化后，问它在哪些条件下成立，是否能把观察结果推广到尚未试过的情形。', 'After repeatedly observing a change, ask under which conditions it occurs and what warrants extending it to untested cases.')
      ],
      misconception: text('自然在这里是被解释的对象。环境哲学还进一步问人如何对待自然以及理由是什么。', 'Nature is what is being explained here. Environmental philosophy also asks how humans should treat it and for what reasons.'),
      related: ['environmental-philosophy', 'metaphysics', 'causality', 'empiricism']
    },
    {
      id: 'plato-justice', kind: 'theory', source: [[1, 9], [2, 5, 16]],
      name: text('柏拉图的正义与秩序', 'Plato on justice and order'), aliases: ['Republic', '理想国', '柏拉图', 'Plato'],
      intro: text('将个人品格与共同体的正义放在一起考察。', 'Examine individual character alongside justice in a community.'),
      explanation: text('《理想国》把正义放在城邦和灵魂两个尺度上讨论。在该对话的一种分析里，个人的理性、意气与欲望应有恰当秩序，公共生活也涉及不同角色的协调。该框架可用于检验“正义只是强者利益”等对立主张，也引出权力与角色分配如何被纠正的问题。', 'The Republic examines justice at the scale of both city and soul. One account in the dialogue gives reason, spirit and appetite an ordered relation and considers coordination among roles in a city. It tests rival claims about justice, including the advantage of the stronger, and raises questions about how power and roles can be revised.'),
      examples: [
        example('团队谁能分配任务？', 'Who assigns work in a team?', '让承担不同工作的人协调配合，看起来能提升秩序。进一步问分工由谁决定、何时能更换，便可检验这种秩序是否公正。', 'Coordinating different roles may improve order. Ask who assigns those roles and when they can change to test whether the order is just.'),
        example('愿望与判断', 'Desire and judgement', '你想快速花掉预算，也在乎月底能否履行承诺。反思哪些愿望该受长远判断调节，能体会城邦与个人的比喻。', 'You want to spend quickly and also meet a promise at the end of the month. Asking which desires should answer to longer-term judgement illustrates the analogy.')
      ],
      misconception: text('秩序给出了课件讨论的一条线索。判断一种秩序正义与否，还需要检验权威、分工和公民利益的理由。', 'Order provides a way into the course discussion. Judging its justice also calls for reasons about authority, roles and people’s interests.'),
      related: ['examined-good-life', 'political-philosophy', 'aristotle-virtue']
    },
    {
      id: 'aristotle-virtue', kind: 'theory', source: [[1, 9], [2, 5], [4, 14, 16]],
      name: text('亚里士多德的德性与理性', 'Aristotle on virtue and reason'), aliases: ['virtue ethics', '德性伦理学', 'rational animal', '理性的动物', '中道'],
      intro: text('通过实践和判断培养稳定品格，使一段人生过得更好。', 'Build stable character through practice and judgement so that life can flourish.'),
      explanation: text('理性能力使人能够思考怎样行动。亚里士多德式德性伦理关心反复实践形成的习惯，以及面对具体情境的判断。某些德性可理解为恰当的尺度，例如勇敢涉及判断风险和责任。这个尺度取决于情境和行动者的理由。', 'Reason enables people to deliberate about action. Aristotelian virtue ethics examines stable habits built in practice and the judgement needed in particular cases. Some virtues involve finding a fitting measure. Courage, for example, requires judging risk and responsibility.'),
      examples: [
        example('勇敢地提出问题', 'Courage to raise a concern', '看见项目数据有误，可准备证据，在适当会议上清楚指出。既练习承担风险，也照顾他人理解与修正的机会。', 'If a project’s data look wrong, gather evidence and raise it clearly at a suitable meeting. This practices taking a risk responsibly and gives others a chance to respond.'),
        example('一次慷慨与稳定品格', 'One gift and a stable virtue', '一次捐赠有价值，长时间按自身能力并回应受助者实际需要，能进一步说明慷慨成为一种习惯。', 'One gift has value. Repeated giving that fits your means and responds to actual needs gives stronger evidence of generosity as a habit.')
      ],
      misconception: text('恰当的尺度由重要事实和理由决定。严重不公发生时，恰当的勇气可能要求非常坚定地行动。', 'The fitting measure depends on the reasons and stakes. Where injustice is severe, courage may require a firm response.'),
      related: ['examined-good-life', 'applied-ethics', 'plato-justice']
    },
    {
      id: 'epicureanism', kind: 'tradition', source: [[2, 5]],
      name: text('伊壁鸠鲁主义', 'Epicureanism'), aliases: ['Epicurus', '快乐', 'pleasure', '心灵安宁'],
      intro: text('权衡快乐与焦虑的长远影响，重视节制、友谊和安宁。', 'Weigh the lasting effects of pleasures and worries, with attention to moderation, friendship and calm.'),
      explanation: text('伊壁鸠鲁把快乐与美好生活相联，也重视身体不受痛苦和心灵不受扰动。学会分辨基本需要和难以满足的欲望，可以帮助判断哪些快乐值得选择。可能带来更大痛苦的选择需要重新权衡。', 'Epicurus connects pleasure with living well and values freedom from bodily pain and mental disturbance. Distinguishing basic needs from hard-to-satisfy desires helps identify pleasures worth choosing. Weigh any later pain created by a present enjoyment.'),
      examples: [
        example('一顿安稳的饭', 'A simple meal with friends', '在承受得起的预算里和朋友吃饭，可以同时满足需要、交流和安心。为了让别人羡慕而欠债，可能带来持续烦恼。', 'An affordable meal with friends meets a need, supports friendship and preserves peace of mind. Debt taken on to impress others may cause lasting worry.'),
        example('睡眠与即时娱乐', 'Sleep and immediate entertainment', '深夜继续刷视频能提供即时快乐。比较第二天的疲倦和现有休息需求，可决定何时停止。', 'Late-night videos offer immediate enjoyment. Compare that enjoyment with next-day fatigue and your need for rest.')
      ],
      misconception: text('课件将它放入快乐与幸福的讨论。判断欲望时要算入友谊、安宁和长远代价。', 'The slides place Epicureanism in the discussion of pleasure and happiness. Include friendship, calm and long-term costs when judging desires.'),
      related: ['examined-good-life', 'cynicism']
    },
    {
      id: 'cynicism', kind: 'tradition', source: [[2, 5]],
      name: text('古希腊犬儒学派', 'Ancient Cynicism'), aliases: ['Diogenes', '第欧根尼', '自足', 'self-sufficiency'],
      intro: text('用简朴、自足和坦率反思名望及习俗的支配。', 'Use simplicity, self-sufficiency and frankness to question the authority of reputation and convention.'),
      explanation: text('古代犬儒传统以特定的生活方式批评社会习俗及对财富、名声的依赖。它将德性与独立判断放在生活实践中。课件把它与其他希腊生活理想一起列出，理解时可单独辨认它对习俗与欲望的批评。', 'Ancient Cynics used a way of living to criticise social convention and dependence on wealth and reputation. They practised virtue and independence of judgement in everyday life. The slides group them with other Greek ideals. Their distinctive criticism of convention and desire is worth identifying.'),
      examples: [
        example('毕业一定要昂贵宴会？', 'Must a graduation dinner be expensive?', '检查昂贵庆祝的社会期待，问更简单的仪式能否表达同样的谢意。', 'Question the pressure to pay for an expensive celebration. Ask whether a simpler event can express the same thanks.'),
        example('在群体压力下直言', 'Speaking under social pressure', '大家为保面子不提计划中的困难。坦率指出具体问题，并承担不受欢迎的风险，体现把判断带到行动中。', 'People avoid raising problems to save face. Naming a real problem despite social pressure puts independent judgement into practice.')
      ],
      misconception: text('当代“犬儒”常指普遍不信任动机。古代学派更关注德性、自足和社会习俗。', 'Today “cynical” often describes distrust of people’s motives. The ancient school centred on virtue, self-sufficiency and convention.'),
      related: ['examined-good-life', 'epicureanism']
    },
    {
      id: 'nietzsche', kind: 'theory', source: [[4, 16, 18]],
      name: text('尼采的价值批判', 'Nietzsche’s critique of values'), aliases: ['Nietzsche', '情感与直觉', 'genealogy', '谱系学'],
      intro: text('追问价值判断怎样形成、受到什么力量推动，以及它如何影响生活。', 'Ask how value judgements emerged, what shaped them and how they affect life.'),
      explanation: text('第四章把尼采与对理性中心的人性观的挑战相联。进一步学习时，可以比较一种道德评价的由来、它对不同人造成的影响，以及支撑它的理由。情感和驱力是理解价值的线索，对论证和历史证据的检查仍有意义。', 'Chapter 4 links Nietzsche with a challenge to a reason-centred picture of humanity. A next step is to examine where a judgement came from, whom it affects and what reasons support it. Emotions and drives are clues to how values form. Arguments and historical evidence still need examination.'),
      examples: [
        example('什么算成功？', 'What counts as success?', '一个群体把忙碌当成成功，追问这种标准如何变得有说服力，以及它奖励了哪些行为、忽略了哪些贡献。', 'A group treats busyness as success. Ask how this became persuasive, what behaviour it rewards and which contributions it overlooks.'),
        example('谴责的动机', 'A motive for condemnation', '小组把某位同学的质疑称为“不合群”。分开检查质疑是否有理，以及这个称呼是否在保护既有地位。', 'A group calls a member disloyal for raising doubts. Examine both the merits of the doubts and whether the label protects an existing position.')
      ],
      misconception: text('“用情感或直觉界定人”是课件在比较框架中的简写。系统读尼采还需区分其历史诊断、批评对象和写作语境。', 'The appeal to emotion and intuition is shorthand in the course comparison. Reading Nietzsche closely requires distinguishing his historical diagnoses, targets and contexts.'),
      related: ['existentialism', 'ideology', 'aristotle-virtue']
    },
    {
      id: 'existentialism', kind: 'tradition', source: [[4, 18]],
      name: text('萨特式存在主义', 'Sartrean existentialism'), aliases: ['Sartre', '存在先于本质', 'existence precedes essence', 'bad faith', '自欺'],
      intro: text('人在既有处境中作选择，并为选择赋予的生活方向承担责任。', 'People choose within given circumstances and take responsibility for the direction their choices give to life.'),
      explanation: text('萨特的“存在先于本质”强调，人在出生时没有一份规定自己必须成为什么的角色说明。处境会限制可以采取的行动，行动者仍可以审视自己如何回应这些限制。把决定全推给一个固定身份，可能掩盖仍可选择的部分。', 'Sartre’s “existence precedes essence” holds that a predetermined role does not give someone their identity at birth. Circumstances constrain action, and a person can still examine how they respond to those constraints. Explaining a decision entirely through a fixed role can obscure choices that remain.'),
      examples: [
        example('重新考虑所学专业', 'Reconsidering a degree', '家人期待是一项真实压力。列出可选行动及代价，再检验“我只能这样做”究竟描述了什么真实限制。', 'Family expectations create real pressure. List available actions and their costs, then ask what actual constraints your claim of having no choice describes.'),
        example('团队角色和责任', 'A team role and responsibility', '“我只是记录员”能说明职责分工。当你发现记录有错，仍须决定是否提醒成员或纠正文字。', '“I’m only the recorder” describes a division of duties. If the notes contain an error, you still face decisions about reporting or fixing it.')
      ],
      misconception: text('萨特是一种存在主义的代表。其他存在主义作家对信仰、自由和责任有不同解释。', 'Sartre represents one form of existentialism. Other existentialist writers give different accounts of faith, freedom and responsibility.'),
      related: ['nietzsche', 'free-will', 'examined-good-life']
    },
    {
      id: 'islamic-stewardship', kind: 'tradition', source: [[1, 10], [2, 7], [4, 5, 19], [8, 36, 37]],
      name: text('伊斯兰人观与受托责任', 'Islamic personhood and stewardship'), aliases: ['khalifah', '哈里发', '代治者', '受托者', 'servant of Allah', 'abd'],
      intro: text('课件将人的受造、敬主与在人群和自然中的受托责任联系起来。', 'The course links being created and serving God with responsibilities toward people and nature.'),
      explanation: text('第四章用“真主的仆人”与 khalifah 表达两面责任。纵向关系涉及信仰与敬奉，横向关系涉及正义地对待他人与管理自然资源。第八章用该框架说明，拥有用水、用地等权力伴随着对既有关系的义务。', 'Chapter 4 presents the servant of Allah and khalifah as connected responsibilities. The vertical relation concerns faith and worship. The horizontal relation concerns justice toward others and care for natural resources. Chapter 8 uses this framework to connect powers over resources with obligations.'),
      examples: [
        example('用水和受托责任', 'Water use and stewardship', '掌管公共水源的人按需求分配并避免浪费。这种做法把治理权力与公平、保护资源的责任相联。', 'Someone managing a shared water supply allocates it according to need and limits waste. Authority is exercised together with fairness and care for the resource.'),
        example('保管公物', 'Caring for shared goods', '把社团器材公开登记、可公平借用，并维修损坏部件，可用受托责任解释为何这些行动重要。', 'Registering and maintaining shared equipment and making borrowing fair can illustrate duties of stewardship.')
      ],
      misconception: text('在本章，khalifah 用于讲受托责任。政治史中同一词可以指不同的称衔和制度。', 'This chapter uses khalifah for stewardship. In political history, the term may refer to offices and institutions.'),
      related: ['christian-humanity', 'revelation-tradition', 'environmental-philosophy', 'sejahtera']
    },
    {
      id: 'christian-humanity', kind: 'tradition', source: [[4, 9, 10, 17]],
      name: text('基督宗教的人观', 'Christian accounts of humanity'), aliases: ['Genesis', '创世记', '神的形象', 'imago Dei', 'original sin', '原罪'],
      intro: text('从受造、神的形象、道德责任等概念理解人的尊严与限度。', 'Use creation, the image of God and moral responsibility to consider dignity and human limitations.'),
      explanation: text('第四章援引《创世记》，将受造和按神的形象理解人与其他受造物的关系。原罪和悔改是课件中讨论道德失序的概念。各传统对这些概念及告解的解释不同。作答时可以说明是哪一条经文或哪一种传统支撑具体说法。', 'Chapter 4 draws on Genesis to discuss creaturehood and the image of God. It introduces original sin and repentance in discussing moral disorder. Christian traditions interpret these concepts and practices of confession differently. Identify which text or tradition supports a particular claim.'),
      examples: [
        example('尊严与成就', 'Dignity and achievement', '按神的形象理解尊严的人，可以据此要求平等关怀捐助者、求助者和工作人员。财富及成绩无需决定谁获得尊重。', 'Someone grounding dignity in the image of God can argue for equal care toward donors, clients and workers regardless of wealth or achievement.'),
        example('承认伤害', 'Acknowledging harm', '做错事之后承认行动、向受影响者求和解并改变行为，可以用来说明悔改涉及实际方向的改变。', 'Acknowledging harm, seeking reconciliation and changing conduct illustrate how repentance can involve a change of direction.')
      ],
      misconception: text('“神的形象”在信仰传统中有关于责任、关系与尊严等不同解释。第 10 页的特定告解方式只对应部分教派。', 'The image of God has been interpreted through responsibility, relation and dignity, among other ideas. The practice of confession on p. 10 represents some denominations.'),
      related: ['islamic-stewardship', 'revelation-tradition']
    },
    {
      id: 'hinduism', kind: 'tradition', source: [[1, 11], [2, 8], [4, 20]],
      name: text('印度教的业、轮回与解脱', 'Hindu accounts of karma, samsara and moksha'), aliases: ['Hinduism', 'moksha', '解脱', 'karma', '业', 'atman', '我', 'brahman', '梵'],
      intro: text('理解行动、轮回及解脱，并分辨个体自身与终极实在如何相联。', 'Explore action, rebirth and liberation, and how self and ultimate reality may relate.'),
      explanation: text('课件用 karma 讨论行动及后果，samsara 指轮回，moksha 指解脱。atman 和 Brahman 指涉自身与终极实在的问题。关于两者关系以及知识、奉爱和行动如何通向解脱，印度教内部有多种解释。', 'The course connects karma with action and consequences, samsara with rebirth and moksha with liberation. Atman and Brahman raise questions about self and ultimate reality. Hindu traditions differ on their relation and on the roles of knowledge, devotion and action in liberation.'),
      examples: [
        example('为责任行动', 'Action and duty', '学生可以检查自己照顾家人的目的，是履行责任还是只在意被赞扬。借此讨论行动、意图与执著的关系。', 'A student can ask whether family care is undertaken as a duty or for praise. The case opens discussion of action, intention and attachment.'),
        example('配对题先找关键词', 'Match the concepts', '题面同时给出 samsara、Brahman 和解脱。先分别识别轮回、终极实在和 moksha，再比较佛教常用的 nirvana。', 'If a question includes samsara, Brahman and liberation, identify rebirth, ultimate reality and moksha before comparing nirvana in Buddhist teaching.')
      ],
      misconception: text('课件给的是常见考试配对。个体与梵同一是一些学派的解释，不能自动推广给整个印度教。', 'The slides give a useful exam pairing. Identity between the self and Brahman is a view found in some schools.'),
      related: ['buddhism', 'revelation-tradition', 'metaphysics']
    },
    {
      id: 'buddhism', kind: 'tradition', source: [[1, 11, 12], [2, 8], [4, 21, 22]],
      name: text('佛教的苦、无常与觉悟', 'Buddhist accounts of suffering and awakening'), aliases: ['Buddhism', '无我', 'anatta', 'nirvana', '涅槃', 'Four Noble Truths', '四圣谛', '八正道'],
      intro: text('从无常和执著理解苦，通过八正道等实践寻求止息。', 'Understand suffering through impermanence and attachment, with practices such as the Eightfold Path aimed at its cessation.'),
      explanation: text('四圣谛依次说明苦、苦的根源、苦的止息与通往止息的道路。课件用无常和无我讨论对稳定自我的执著。无我针对永恒独立的自我观，日常相续的经验和人物关系仍可讨论。八正道涵盖见解、行为与心智训练。', 'The Four Noble Truths diagnose suffering, its origin, its cessation and a path to cessation. The slides use impermanence and no-self to discuss attachment to a fixed self. No-self challenges an eternal, independent self. Ordinary experience and relations can still be discussed. The Eightfold Path covers understanding, conduct and mental cultivation.'),
      examples: [
        example('一次失利与自我', 'A setback and personal identity', '考差后认定“我永远学不会”，把一时经验变成固定身份。观察条件变化并练习新的回应，有助于理解无常和执著。', '“I’ll never learn this” turns a setback into a fixed identity. Observing changing conditions and practising a different response illustrates impermanence and clinging.'),
        example('从诊断到实践', 'From diagnosis to practice', '发现比较成绩带来烦恼，可追踪自己对名次的执著，再观察注意力、言语及行为如何变化。例子展示从识别根源到练习的过程。', 'If comparing grades creates distress, examine attachment to rank and notice how attention, words and actions can change. The case moves from diagnosis toward practice.')
      ],
      misconception: text('“苦”也指不稳定条件下经验难以带来持久满足。课件的考试配对常以涅槃说明止息及解脱。', 'Dukkha includes the unsatisfactoriness of unstable conditions. The course commonly pairs nirvana with cessation and liberation.'),
      related: ['hinduism', 'confucianism', 'examined-good-life']
    },
    {
      id: 'confucianism', kind: 'tradition', source: [[1, 12], [2, 9], [4, 23]],
      name: text('儒家修身与社会和谐', 'Confucian cultivation and social harmony'), aliases: ['Confucianism', 'Confucius', '孔子', 'Five Constant Virtues', '仁义礼智信', '孝'],
      intro: text('从具体角色和关系练习德行，由修身推及公共秩序。', 'Develop virtues in concrete relationships and extend self-cultivation to public life.'),
      explanation: text('课件介绍仁、义、礼、智、信，将关切他人、恰当行动、礼节、判断和守信结合起来。礼为关系提供可学习的做法，仁和义帮助检验做法是否恰当。孝关注家庭关系中的责任。', 'The slides introduce benevolence, righteousness, ritual propriety, wisdom and trustworthiness. Ritual gives people forms of conduct they can learn. Benevolence and rightness help evaluate those forms. Filial piety concerns responsibilities in family relations.'),
      examples: [
        example('如何劝告长辈', 'Advising an elder', '发现长辈误解一个同学，先了解双方，再选择尊重而清楚的措辞。礼和仁同时影响如何开口。', 'If an elder misunderstands a classmate, listen to both and choose respectful, clear words. Propriety and care both affect how you speak.'),
        example('社团承诺', 'A promise to a club', '发现无法按时完成工作，尽早说明并协商补救，练习信与对具体关系的责任。', 'If you cannot finish club work on time, say so early and agree on a remedy. This exercises trustworthiness and responsibility in a relationship.')
      ],
      misconception: text('礼（li）包含礼节和恰当行为，孝（xiao）是家庭责任中的一个概念。两者相关且各有范围。', 'Li encompasses ritual and appropriate conduct. Xiao concerns filial responsibility. The ideas are connected and have different scopes.'),
      related: ['daoism', 'aristotle-virtue', 'local-wisdom']
    },
    {
      id: 'daoism', kind: 'tradition', source: [[1, 12], [2, 9], [4, 24], [8, 36]],
      name: text('道家的道与无为', 'Dao, naturalness and wu wei'), aliases: ['Taoism', 'Daoism', 'Tao', 'Wu Wei', '老子', 'Laozi'],
      intro: text('观察事物自身的变化，减少强迫性的干预。', 'Attend to how things develop and reduce forced intervention.'),
      explanation: text('道是课件用来解释自然秩序及其变化的核心概念。无为常被理解为顺势而行，避免因执意控制而加重问题。先判断系统本身怎样运作，再决定在哪些时机行动、应留下多少空间。', 'Dao is central to the course account of natural order and change. Wu wei is often understood as action that works with tendencies and avoids making problems worse through force. Study how a situation develops before choosing when and how much to intervene.'),
      examples: [
        example('让菜苗生长', 'Letting seedlings grow', '观察光照和土壤湿度，有需要时调整，给苗留出自然变化的时间。这个案例用于理解何时减少干预。', 'Observe light and soil moisture, adjust conditions when needed and allow seedlings time to develop. The case illustrates restraint in intervention.'),
        example('小组自己找节奏', 'A group finds its pace', '成员意见分歧时，先让各方陈述来由，选择少量有用的协作规则。经验有所累积以后，再判断还需什么协调。', 'When group members disagree, hear their reasons and set a few useful ground rules. After some experience, reassess what coordination is needed.')
      ],
      misconception: text('无为可涉及主动改变条件，行动方式应与情境相称。道家思想和道教传统内部也各有发展。', 'Wu wei can involve changing conditions. The action should fit the situation. Daoist thought and religious traditions have developed in varied ways.'),
      related: ['confucianism', 'environmental-philosophy', 'sejahtera']
    },
    {
      id: 'metaphysics', kind: 'branch', source: [[5, 3, 5, 6, 8, 11, 12], [2, 13]],
      name: text('形而上学与本体论', 'Metaphysics and ontology'), aliases: ['substance', '实体', '本体论', 'material and form', '质料与形式', 'cosmogony', '宇宙起源论'],
      intro: text('追问什么存在、以什么方式存在，以及何种关系最基本。', 'Ask what exists, how it exists and which relations are fundamental.'),
      explanation: text('本体论梳理存在的类型。课件用椅子区分质料、形式和可变化的属性，还列出因果、身心、宇宙结构和起源等领域。先明确问题落在实体、属性、起源还是关系层面，接着比较不同答案需要承认什么。', 'Ontology examines categories of being. The slides use a chair to distinguish matter, form and changeable properties, and also cover causation, mind, the cosmos and origins. Identify whether a question concerns entities, properties, origins or relations, then compare what different answers commit you to.'),
      examples: [
        example('木料与椅子的身份', 'Wood and the chair', '把椅子拆成木板后，材料仍在。是否还有一把椅子，取决于怎样理解形态、用途及物件延续。', 'The wood remains after disassembly. Whether a chair remains depends on how form, function and persistence are understood.'),
        example('宇宙的来路与结构', 'Cosmic origins and structure', '问宇宙如何开始偏向起源论。问宇宙有哪些结构和规律偏向宇宙论。用物理证据说明一段演化也可引出更基本的原因问题。', 'How the universe began is cosmogony. Its large-scale structure and laws concern cosmology. Evidence for a stage of development can also prompt more fundamental questions about causation.')
      ],
      misconception: text('课件也讨论宗教和灵性意义上的形而上学。哲学意义覆盖更广，还涉及身份、因果、实体与心灵。', 'The slides also discuss religious and spiritual uses of metaphysics. Philosophical metaphysics covers identity, causation, substance and mind as well.'),
      related: ['causality', 'realism', 'materialism', 'idealism', 'dualism']
    },
    {
      id: 'causality', kind: 'branch', source: [[5, 8, 10, 32], [3, 25]],
      name: text('因果关系', 'Causation'), aliases: ['causality', '因果性', 'counterfactual', '反事实'],
      intro: text('追问什么使结果发生，以及证据何时足以判断因果。', 'Ask what produces an outcome and when evidence warrants a causal judgement.'),
      explanation: text('有些因果分析比较“若条件不同，结果会怎样”，有些强调连接事件的机制。实际问题可同时考虑机制、对照和共同原因。找原因和找谁该负责是相关但各有条件的任务。', 'Some accounts compare what would happen under different conditions. Others focus on mechanisms linking events. In practice, examine mechanisms, comparisons and common causes together. Identifying a cause and assigning responsibility require different kinds of reasoning.'),
      examples: [
        example('教室窗户与噪声', 'A classroom window and noise', '上课时关窗后更安静。比较同样车流下窗户开关的情况，并找声音传播路径，可检验关窗的作用。', 'The classroom becomes quieter after closing a window. Compare open and closed conditions with similar traffic and identify the path sound takes.'),
        example('谁造成停电？', 'What caused the outage?', '暴雨和未维护设备可能共同造成停电。找出必要条件之后，再追问维护方是否有机会预防。', 'A storm and poor maintenance can both contribute to an outage. After identifying contributing conditions, ask what the maintenance team could reasonably have prevented.')
      ],
      misconception: text('统计相关可以提示因果研究。结论还取决于测量、研究设计和有没有排除其他解释。', 'Correlation can guide causal inquiry. Conclusions depend on measurements, study design and the treatment of alternative explanations.'),
      related: ['metaphysics', 'post-hoc', 'abduction', 'determinism']
    },
    {
      id: 'materialism', kind: 'theory', source: [[5, 13, 14, 15, 19], [8, 24, 27]],
      name: text('唯物主义与物理主义', 'Materialism and physicalism'), aliases: ['唯物论', 'materialism', 'physicalism', '心物问题'],
      intro: text('将物质或物理实在视为基本层面，并追问心灵如何依存于它。', 'Treat material or physical reality as fundamental and ask how mind depends on it.'),
      explanation: text('形而上学中的唯物主义关注实在由什么构成，现代物理主义的涵义可涵盖物理理论中的场与关系。不同版本对心理状态能否完全化约为脑状态有分歧。课件提出宗教及伦理批评，可以逐条把本体论主张与道德推论分开。', 'Metaphysical materialism asks what reality consists of. Contemporary physicalism may include fields and relations in physics. Versions differ about whether mental states reduce fully to brain states. Evaluate the ethical and religious criticisms in the slides by identifying the extra premises needed for each conclusion.'),
      examples: [
        example('记忆与脑部变化', 'Memory and changes in the brain', '记忆随脑部状况变化，为心理过程的物理依存提供线索。比较不同理论对这一依存关系的解释。', 'Changes in memory with brain changes are evidence of physical dependence. Compare how different positions explain that dependence.'),
        example('温度的两个描述层次', 'Two levels of a temperature description', '用日常温度与微观运动来说明同一现象可有不同层次的描述。再问心理与脑能否建立类似联系。', 'Everyday temperature and microscopic motion illustrate different descriptions of a phenomenon. Ask whether a similar relation can be established between mind and brain.')
      ],
      misconception: text('哲学里的“唯物”讨论实在的本质。“追求金钱”是日常用语中的另一种含义。', 'Philosophical materialism concerns the nature of reality. Pursuit of wealth is another everyday meaning of the word.'),
      related: ['idealism', 'dualism', 'monism', 'scientism']
    },
    {
      id: 'idealism', kind: 'theory', source: [[5, 13, 16, 17, 18, 19]],
      name: text('唯心主义', 'Idealism'), aliases: ['贝克莱', 'Berkeley', '康德', 'Kant', '黑格尔', 'Hegel', 'transcendental idealism', '先验唯心主义'],
      intro: text('探究心灵、观念或认识条件在经验与实在中起什么作用。', 'Ask what role mind, ideas or conditions of knowing play in experience and reality.'),
      explanation: text('课件并列贝克莱、康德和黑格尔。贝克莱挑战脱离一切感知者的物质实体观。康德区分可经验的现象与物自体，说明认识条件如何组织经验。黑格尔所讨论的观念及其发展有更广的体系背景。先弄清论点在谈实在本身还是我们认识它的条件。', 'The slides compare Berkeley, Kant and Hegel. Berkeley challenges material substance understood as independent of all perception. Kant distinguishes possible experience from things in themselves and examines how our cognitive conditions structure experience. Hegel’s account of ideas has a broader systematic context. Identify whether a claim concerns reality or conditions of knowing.'),
      examples: [
        example('无人看见的桌子', 'An unseen table', '用贝克莱的问题追问桌子的存在如何与感知相联。课上还可讨论持久性如何解释，以及为什么一位观察者离开并不能结束全部经验。', 'Use Berkeley’s question to ask how the table’s existence relates to perception. Then ask how stability is explained when one observer leaves.'),
        example('经验如何被组织', 'How experience is structured', '同一串声响被听成先后事件或节奏。借这个有限类比想一想，经验的组织条件会改变我们能怎样描述对象。', 'The same sequence of sounds can be heard as ordered events and as a rhythm. Use this limited analogy to consider how conditions of experience shape descriptions.')
      ],
      misconception: text('先验唯心主义与贝克莱的论证有不同问题和推理。看到 idealism 时先确认课件指哪位思想家或哪种立场。', 'Transcendental idealism and Berkeley’s arguments address different questions. When you see “idealism”, identify the thinker or position at issue.'),
      related: ['materialism', 'realism', 'rationalism', 'metaphysics']
    },
    {
      id: 'dualism', kind: 'theory', source: [[5, 8, 23], [7, 41], [8, 22, 23, 24, 27, 28]],
      name: text('身心二元论', 'Mind–body dualism'), aliases: ['Cartesian dualism', '笛卡尔二元论', 'Descartes', '心身二元论'],
      intro: text('把心灵与身体视为基本上不同的层面，并追问两者如何关联。', 'Treat mind and body as fundamentally distinct and ask how they relate.'),
      explanation: text('笛卡尔式实体二元论区分思维实体与有广延的物质实体。由此引出相互作用问题，例如有意识的意愿怎样影响物理动作。“我思”的论证提供自我存在的一条理由，心身区分还需要进一步论证。第八章把这种区分放入生态批评中。', 'Cartesian substance dualism distinguishes thinking substance from extended material substance. It raises the interaction problem: how can a conscious intention affect physical movement? The cogito gives a reason for self-existence. A distinction between mind and body needs further argument. Chapter 8 places it in an ecological critique.'),
      examples: [
        example('从意愿到举手', 'From intention to movement', '先有发言意愿，随后手臂移动。如果心与身是不同的实体，需要解释二者怎样相联。', 'You intend to speak and your arm rises. If mind and body are different substances, explain what connects the two events.'),
        example('自然是否只是对象？', 'Is nature only an object?', '沿第八章例子追问，若把价值集中在人类思维上，自然可能怎样被评价。还可比较法律、产业和其他思想对结果的独立作用。', 'Following Chapter 8, ask how nature might be valued if value is centred in human thought. Compare the roles of law, industry and other ideas as well.')
      ],
      misconception: text('本体论争论和生态史是两种分析任务。课件第 27 页提出解释路线，历史因果还需独立证据。', 'Metaphysical debate and ecological history are separate inquiries. Chapter 8, p. 27 offers an interpretive route. Historical causation also needs independent evidence.'),
      externalReferences: [{title: '笛卡尔《沉思集》英译原文 / Descartes, Meditations', url: 'https://www.gutenberg.org/files/70091/70091-h/70091-h.htm'}],
      related: ['materialism', 'monism', 'anthropocentrism', 'decolonisation']
    },
    {
      id: 'realism', kind: 'theory', source: [[5, 32, 36], [7, 18, 19, 27]],
      name: text('实在论与反实在论', 'Realism and anti-realism'), aliases: ['mind-independent', '独立实在', '反实在论'],
      intro: text('问某一类对象或事实以什么方式独立于我们的看法或实践。', 'Ask in what sense entities or facts in a domain are independent of our beliefs or practices.'),
      explanation: text('实在论通常主张某个研究领域存在独立于判断的事实。反实在论有多种版本，有的强调我们能证成的说法，有的强调对象类别依赖概念或社会规则。辨析时先说清是在谈物体、道德、数学还是制度，再判断独立性怎样理解。', 'Realism typically holds that facts in a domain are independent of our judgements. Anti-realisms vary. Some focus on what can be warranted, while others emphasise dependence on concepts or practices. Identify the domain and specify what independence would mean there.'),
      examples: [
        example('地图与山', 'Maps and a mountain', '两张地图的分类可以不同。山的坡度与海拔在测量前已有确定的物理条件，可约束两个描述。', 'Two maps can classify a mountain differently. Physical conditions such as slope constrain both descriptions before measurement.'),
        example('谁是社团会员？', 'Who counts as a club member?', '会员标准依赖制定的规则。规则成立之后，记录和缴费情况仍可用来判断某人的具体资格。', 'Membership rules depend on agreement. Once in force, records and payments can establish a person’s status under them.')
      ],
      misconception: text('对某领域持实在论可同时承认测量及用词不完美。同一个人在另一领域也可持不同立场。', 'Realism about a domain allows measurement and language to be imperfect. A person can take a different position in another domain.'),
      related: ['idealism', 'correspondence', 'social-constructivism', 'relativism']
    },
    {
      id: 'monism', kind: 'theory', source: [[5, 13, 36, 37], [7, 32], [8, 24]],
      name: text('一元论、二元论与多元论', 'Monism, dualism and pluralism'), aliases: ['monism', 'dualism', 'pluralism', '多元论', '一元论'],
      intro: text('比较一种理论承认几个基本类型、原则或不可约的立场。', 'Compare how many fundamental kinds, principles or irreducible positions a theory accepts.'),
      explanation: text('一元论在指定问题上承认一个基本层面，二元论承认两个，多元论承认更多或允许多个不可化约的解释。先明确在给什么计数，例如实体类型、基本价值或哲学视角。宗教多元主义关注传统的地位，是另一层问题。', 'Monism starts from one fundamental kind in a given inquiry, dualism from two, and pluralism from more than one irreducible position or kind. Say what is being counted: kinds of substance, basic values or ways of understanding. Religious pluralism concerns the status of traditions.'),
      examples: [
        example('心灵与物理类型', 'Mind and physical kinds', '若理论认为心理过程依赖同一种物理实在，可是一种本体论一元论。若另承认独立的思维实体，就进入二元论。', 'If mental processes depend on the same fundamental physical reality, the view may be ontologically monist. Adding an independent thinking substance gives a dualist position.'),
        example('价值为什么有冲突？', 'Why do values conflict?', '开放空间与保护安静都可能是独立价值。一个多元观点允许它们冲突，并继续寻找在具体方案中怎样权衡。', 'Access to a shared space and protection of quiet may be independent values. A pluralist can allow genuine conflict and still deliberate about a policy.')
      ],
      misconception: text('在一种问题上一元和在另一种问题上多元可以并存。第 5 章表格里的宗教与本体论术语需要按语境读。', 'Monism in one inquiry can coexist with pluralism in another. Read the religious and ontological terms in Chapter 5 according to context.'),
      related: ['dualism', 'materialism', 'theism', 'relativism']
    },
    {
      id: 'nominalism', kind: 'theory', source: [[5, 9, 37]],
      name: text('唯名论', 'Nominalism'), aliases: ['universals', '共相', '殊相', 'particulars'],
      intro: text('解释共用名称和分类，同时质疑是否需要把共相当作独立实体。', 'Explain shared names and classifications while questioning the need for independently existing universals.'),
      explanation: text('唯名论的不同版本对共相或抽象对象持保留态度。面对“许多东西都是红的”，它会问具体对象、相似关系和用词规则是否足以解释。共相实在论则可认为多个对象例示同一个性质。', 'Versions of nominalism resist some universals or abstract objects. Faced with many things being red, ask whether individual objects, resemblance and rules of use suffice. A realist about universals can say that many objects instantiate the same property.'),
      examples: [
        example('红色标签', 'The label “red”', '红书包和红花是个别对象。可以比较用具体颜色的相似性解释分类，或用共同例示的性质解释分类。', 'A red bag and a red flower are individual objects. Compare an explanation through resemblance with one through a property they instantiate.'),
        example('同一旋律的演奏', 'Performances of a melody', '同一旋律的多次演奏，可理解为共有一个抽象作品，也可讨论乐谱、相似关系和演奏实践能否充分解释。', 'Repeated performances could be instances of one abstract work. Consider whether scores, resemblances and performance practices might explain the pattern instead.')
      ],
      misconception: text('唯名论可以承认词语有规则、有用处。争点在解释这些规律时要承认哪些对象。', 'Nominalism can allow words to have rules and uses. The dispute concerns what entities are needed to explain them.'),
      related: ['metaphysics', 'realism', 'conventionalism']
    },
    {
      id: 'theism', kind: 'theory', source: [[5, 20, 21, 22, 24, 25, 34, 35]],
      name: text('有神论、一神论与多神论', 'Theism, monotheism and polytheism'), aliases: ['theism', '有神论', 'monotheism', '一神论', 'polytheism', '多神论'],
      intro: text('有神论承认神的存在。一神论与多神论关注神的数目及地位。', 'Theism affirms divine existence. Monotheism and polytheism concern the number and status of deities.'),
      explanation: text('课堂框架中，有神论包括相信一位神的立场，也包括承认多位神的立场。关于神与世界的关系、证据和宗教实践，不同传统有各自解释。课件的纵向关系是象征性的，涉及敬奉与责任。', 'The course framework includes belief in one deity and belief in multiple deities. Traditions give distinct accounts of the divine relation to the world, evidence and practice. The vertical relation in the slides is symbolic and concerns worship and duty.'),
      examples: [
        example('解释起源的论证', 'An argument about origins', '有人由宇宙的存在追问第一因。先把支持“有第一因”的前提和支持“该原因是神”的前提分别列出。', 'Someone asks whether the existence of the universe points to a first cause. Distinguish the premises for a first cause from those identifying it as divine.'),
        example('同一个节日的不同理解', 'Different readings of a festival', '观察仪式时，可分别询问参与者相信怎样的神、仪式表达什么责任，以及不同角色是否有相同信念。', 'When studying a ritual, ask participants what they believe about the divine, what duties the ritual expresses and whether people in different roles hold the same beliefs.')
      ],
      misconception: text('有神论的基本分类只给出起点。对具体宗教的理解需要依据其自身文本、信念与实践。', 'The broad categories of theism give a starting point. Understand individual religions through their own texts, beliefs and practices.'),
      related: ['atheism', 'agnosticism', 'revelation-tradition']
    },
    {
      id: 'atheism', kind: 'theory', source: [[5, 21, 25, 34]],
      name: text('无神论', 'Atheism'), aliases: ['atheist', '不信有神', 'disbelief'],
      intro: text('围绕神的存在，提出否定或不持有有神信念的立场。', 'An answer to divine existence that denies it or lacks theistic belief, depending on usage.'),
      explanation: text('在狭义哲学用法中，无神论指至少对所讨论的神主张其不存在。较广用法也包括不持有有神信念。区分是在提出关于存在的断言、批评特定论证，还是描述一个人的信念状态。', 'In a narrower philosophical use, atheism claims that the deity or deities in question do not exist. Wider usage includes absence of theistic belief. Distinguish an existence claim, a critique of a particular argument and a description of someone’s beliefs.'),
      examples: [
        example('限定论证对象', 'Specify the claim', '对具有某几项属性的神提出逻辑反驳时，应先列清具体属性，避免把结论未经论证推广到所有神概念。', 'If an objection targets a deity with particular attributes, specify them. Extending the objection to every concept of deity takes further work.'),
        example('听完论证后的判断', 'After hearing an argument', '觉得某一项证据力度不足，直接支持“这个论证不充分”。进一步推断不存在时，需要提出更强的理由。', 'Finding one piece of evidence weak directly supports rejecting that argument. Inferring non-existence requires further reasoning.')
      ],
      misconception: text('有关神的立场与具体伦理理论是不同问题。一个人仍须说明哪些原则支撑其道德判断。', 'A position about divine existence and an ethical theory address different questions. People still need to give reasons for their ethical judgements.'),
      related: ['theism', 'agnosticism', 'skepticism']
    },
    {
      id: 'agnosticism', kind: 'theory', source: [[5, 21, 25, 34]],
      name: text('不可知论', 'Agnosticism'), aliases: ['agnostic', '悬置判断', 'suspension of judgement'],
      intro: text('关注神的存在能否被知道，或现有理由是否足以判断。', 'Ask whether divine existence can be known or whether existing reasons warrant a judgement.'),
      explanation: text('不可知论可以表现为“目前证据不足”，也可以主张该问题原则上超出人类知识。第一种允许随证据变化调整，第二种还需要说明知识的边界为何如此。判断时把相信与知道分开。', 'Agnosticism can mean that current evidence is insufficient or that the question in principle exceeds human knowledge. The former can change with evidence. The latter requires an argument about the limits of knowing. Distinguish belief from knowledge.'),
      examples: [
        example('暂缓判断的理由', 'Why suspend judgement?', '两项论证依赖不同的前提，而目前无法判定哪些前提成立。说明需要何种证据，是对暂缓判断给出积极理由。', 'Two arguments rely on incompatible assumptions you cannot presently assess. Specify what evidence would help to justify suspension.'),
        example('信念与把握程度', 'Belief and confidence', '某人参加宗教实践，同时表示无法公开证成神存在。这个情形可用来分辨信仰、知识主张及证据标准。', 'Someone participates in religious practice while acknowledging that they cannot publicly establish divine existence. The case separates faith, knowledge claims and evidence standards.')
      ],
      misconception: text('“我尚未知道”和“没有人可能知道”力度不同。分别检查各自的证据与理由。', '“I do not yet know” and “No one can know” have different strengths. Examine the evidence and reasoning for each.'),
      related: ['theism', 'atheism', 'skepticism']
    },
    {
      id: 'mechanism', kind: 'theory', source: [[5, 21, 32, 36], [8, 22, 27]],
      name: text('机械论', 'Mechanism'), aliases: ['mechanistic explanation', '机制解释', '机械观'],
      intro: text('通过组成部分、相互作用和规则解释一个系统如何运作。', 'Explain how a system works through its parts, interactions and rules.'),
      explanation: text('课件从自然规律和机械式运作导入机械论。研究中可以先提出一个可追踪机制，再利用干预或预测检验其作用。历史上的世界机械观范围更广，将自然整体理解为类似机器的秩序。', 'The course introduces mechanism through laws and machine-like operation. In inquiry, specify a mechanism and test its effects through intervention or prediction. Historical mechanical philosophies applied a machine-like picture more broadly to nature.'),
      examples: [
        example('自行车变速', 'How bicycle gears work', '分别说明齿轮比、链条和踏频怎样改变轮子转速，再用一次换档检验解释。', 'Explain how gear ratios, chain and cadence affect wheel speed. Test the account by changing a gear.'),
        example('排队越来越长', 'A growing queue', '记录客流、服务速度和窗口数，找出瓶颈。再考察改变流程后，对等待时间和公平有什么不同影响。', 'Measure arrivals, service rates and available desks to identify a bottleneck. Check how a process change affects waiting and fairness.')
      ],
      misconception: text('描述机制揭示系统怎样工作。评价系统是否公平或值得采用，需要另列价值和成本。', 'A mechanism shows how a system works. Fairness and desirability also require reasoning about values and costs.'),
      related: ['causality', 'determinism', 'scientism']
    },
    {
      id: 'determinism', kind: 'theory', source: [[5, 8, 21, 32, 36]],
      name: text('决定论与非决定论', 'Determinism and indeterminism'), aliases: ['determinism', 'indeterminism', 'causal determinism', 'non-determinism'],
      intro: text('问给定完全相同的过去与规律，未来是否只能有一种。', 'Ask whether an identical past and identical laws allow only one future.'),
      explanation: text('因果决定论把一个完整状态与规律看作固定后续状态。非决定论允许在相同先前条件下有多个后续结果。预测的难易与是否唯一决定属于不同问题。自由和责任还需要讨论行动者的控制与理由。', 'Causal determinism holds that a complete state and the laws fix subsequent states. Indeterminism allows more than one outcome from identical prior conditions. Predictability is a separate issue. Free will and responsibility also involve agency and reasons.'),
      examples: [
        example('复杂摆动难预测', 'A difficult-to-predict pendulum', '物理模型可在给定精确初态时决定轨迹，但对实测初态的小误差十分敏感。难预测和有多个可能未来需要分别论证。', 'A physical model can fix a trajectory for a precise initial state while being highly sensitive to measurement errors. Unpredictability and multiple possible futures require separate arguments.'),
        example('决定论下的预防行动', 'Taking precautions in a deterministic model', '下雨时带伞可影响会不会淋湿。你的行动及天气等条件一起进入决定结果的因果链。', 'Taking an umbrella can affect whether you get wet. The action and the weather are both part of the causal chain that fixes the outcome.')
      ],
      misconception: text('认为决定论成立，仍可承认努力和选择能造成后果。“无论做什么结果都一样”是不同的断言。', 'Determinism is consistent with actions and effort affecting outcomes. Fatalism claims that the outcome is the same regardless of what you do.'),
      related: ['free-will', 'mechanism', 'causality']
    },
    {
      id: 'free-will', kind: 'theory', source: [[5, 8, 32, 36], [4, 18]],
      name: text('自由意志与相容论', 'Free will and compatibilism'), aliases: ['相容主义', 'agency', 'compatibilism', 'moral responsibility'],
      intro: text('考察何时一项行动属于自己，以及这与因果决定有何关系。', 'Examine when an action counts as one’s own and how that relates to causal determination.'),
      explanation: text('一些立场把自由与可作其他选择相联，并认为决定论构成挑战。相容论认为，若行为反映自己的理由、意愿和控制，即使有原因也可能自由。加入随机性后，还需要解释为何结果属于行动者。', 'Some accounts connect freedom with the ability to do otherwise and take determinism as a challenge. Compatibilists allow freedom when an action expresses the agent’s reasons and control even if it has causes. Randomness alone leaves agency to be explained.'),
      examples: [
        example('帮助与被强迫', 'Helping and being coerced', '两人都捐了一本书，一人出于认可，一人因威胁。相容论比较行动的理由、控制与强迫，而不是只看外部结果。', 'Two people donate a book. One wants to help and the other is threatened. A compatibilist tests reasons, control and coercion across the same outward action.'),
        example('掷硬币选专业', 'Choosing a degree with a coin', '硬币使结果难料，但由它替你决定，能否体现对选择承担的责任？这个例子把随机与自主分开。', 'A coin can make an outcome unpredictable. Ask whether leaving a degree choice to a coin expresses your responsibility. The example separates randomness and agency.')
      ],
      misconception: text('心理、社会和物理因素可同时影响行动。明确自由所需的控制标准后，再判断这些因素怎样影响自由。', 'Psychological, social and physical factors can all affect action. State the kind of control freedom requires before deciding what threatens it.'),
      related: ['determinism', 'existentialism', 'applied-ethics']
    },
    {
      id: 'scientism', kind: 'theory', source: [[5, 38, 39], [7, 26], [8, 27]],
      name: text('科学主义', 'Scientism'), aliases: ['科学万能论', 'scientism', 'science and values'],
      intro: text('对科学方法的能力提出较强主张，也引出它能处理哪些问题的争论。', 'Make a strong claim for the scope of scientific methods and invite debate about their limits.'),
      explanation: text('科学研究能使用可检查证据回答许多事实问题。科学主义通常指进一步主张科学是唯一或压倒性的认识方式。评价该主张时，可区分实证结果、概念问题与如何使用结果的价值判断。', 'Scientific inquiry uses checkable evidence to answer many factual questions. “Scientism” usually names the stronger claim that science is the only or overwhelmingly privileged form of inquiry. Distinguish empirical results, conceptual questions and value judgements about using those results.'),
      examples: [
        example('政策的风险与取舍', 'Risk and trade-offs in policy', '数据可以比较道路风险及预算。还要公开讨论愿意由谁承担何种代价、怎样分配收益。', 'Data can compare road risks and budgets. The decision also involves who bears costs and how benefits are shared.'),
        example('阅读测验分数', 'Reading a test score', '测验能测量特定题目的表现。定义“值得学习”还需要说明课程目标和评分覆盖了哪些能力。', 'A test measures performance on certain questions. Deciding what is worth learning also involves course aims and what the test measures.')
      ],
      misconception: text('质疑科学能否解决某类哲学问题，仍可肯定它对事实判断的贡献。', 'Debating the reach of scientific methods is compatible with recognising their contribution to factual judgements.'),
      related: ['positivism', 'mechanism', 'axiology', 'modernism']
    },
    {
      id: 'positivism', kind: 'tradition', source: [[5, 38, 39, 40], [7, 13], [8, 27]],
      name: text('实证主义', 'Positivism'), aliases: ['Comte', '孔德', 'empirical observation'],
      intro: text('重视可观察事实和能被检验的规律来组织知识。', 'Organise inquiry around observable facts and testable regularities.'),
      explanation: text('课程从孔德及后续实证主义者讨论经验检验。历史上的不同方案对科学解释、社会研究及形而上学评价各有立场。逻辑实证主义在这个广泛主题上加入更专门的语言、逻辑和可证实性问题。', 'The course links Auguste Comte and later positivists to empirical tests. Historical programmes differ in their account of science, social explanation and metaphysics. Logical positivism adds more specific concerns about language, logic and verification.'),
      examples: [
        example('可以检验的规律', 'A testable regularity', '要检验“定期发通知提高出席率”，可明确出席率定义，比较时段及条件相近的班级，并报告结果。', 'To test whether reminders improve attendance, define attendance, compare similar classes and time periods, and report the results.'),
        example('事实测量和制度评价', 'Measurement and evaluation', '调查问卷可统计有多少人使用申诉机制。若要判断程序公平，还需说明评价标准。', 'A survey can measure how many people use an appeal process. Judging fairness also needs an explicit standard.')
      ],
      misconception: text('以观察为主要证据涉及研究方法。进一步宣称一切有意义的问题都要按同一标准研究，需要额外论证。', 'Using observation as primary evidence is a methodological choice. Applying one criterion to every meaningful question requires further argument.'),
      related: ['logical-positivism', 'empiricism', 'scientism', 'operationalism']
    },
    {
      id: 'conventionalism', kind: 'theory', source: [[5, 40, 41]],
      name: text('约定论', 'Conventionalism'), aliases: ['convention', 'conventionalism', '约定主义'],
      intro: text('追问经验判断里哪些成分来自共同采用的定义、标准或描述系统。', 'Identify the role of shared definitions, standards and description systems in empirical judgements.'),
      explanation: text('一些科学或哲学论证区分所采用的框架和用它测得的事实。共同采用一种单位、记法或规则能提高协调性。约定的选取常受便利性、经验适合度及研究任务约束。', 'Some philosophies of science distinguish a framework from the facts measured within it. Shared units, notation and rules support coordination. Choices of convention can be constrained by convenience, empirical fit and purpose.'),
      examples: [
        example('用米或厘米量桌子', 'Measuring in metres or centimetres', '换单位会改变数字。两个人依照各自标准都能得到可换算的测量结果，并检验桌子是否放得进房间。', 'Changing the unit changes the number. Results can be converted and still answer whether the desk fits in a room.'),
        example('把何时算迟到说清楚', 'Defining when arrival is late', '规则可定在九点或加五分钟缓冲。制定后，实际入场时间决定该人是否达到标准。', 'A group can set nine o’clock or allow five minutes of grace. With a rule in place, the actual arrival time determines how it applies.')
      ],
      misconception: text('在有约定的框架里仍可区分准确测量和错误报告。说明每项主张依赖的是规则还是事实。', 'A conventional framework still allows accurate measurements and mistaken reports. State which part of a claim depends on rules and which on facts.'),
      related: ['nominalism', 'operationalism', 'realism']
    },
    {
      id: 'operationalism', kind: 'theory', source: [[5, 40, 41]],
      name: text('操作主义', 'Operationalism'), aliases: ['操作论', 'operational definition', '操作性定义'],
      intro: text('通过明确的观测或测量步骤说明概念如何用于实际研究。', 'Specify operations of observation or measurement that give a concept a practical use.'),
      explanation: text('操作性定义写出条件、工具和计量方法，便于别人理解或复核结果。严格的操作主义把概念与操作绑定，实践中同一概念往往有多种指标。要检查每个指标测到了什么以及遗漏了什么。', 'An operational definition specifies the conditions, instruments and procedure so results can be reviewed. Strict operationalism ties a concept to its operations. In practice a concept may have several indicators, each covering a different part of it.'),
      examples: [
        example('本周参与度', 'Participation this week', '给参与度规定发言、提交小组反馈等可记录行为。只统计发言会漏掉书面贡献，需要说明指标范围。', 'Define participation through observable acts, such as speaking or submitting comments. Speaking counts miss written contributions, so state the measure’s scope.'),
        example('两种阅读速度', 'Two measures of reading speed', '计时读完一页得到速度。加上理解测试得到另一种指标。两者分开报告，可解释为何同一人结果不同。', 'Timing one page measures speed. Adding a comprehension task measures something else. Separate results explain why one person can score differently.')
      ],
      misconception: text('把一项指标写清楚能提高可重复性。评价指标能否代表复杂概念，仍需额外论证。', 'A clear indicator improves reproducibility. Showing that it represents a complex concept takes further evidence.'),
      related: ['positivism', 'conventionalism', 'epistemology']
    },
    {
      id: 'epistemology', kind: 'branch', source: [[6, 3, 4, 5, 8, 9, 24], [2, 13]],
      name: text('认识论与知识的来源', 'Epistemology and sources of knowledge'), aliases: ['知识论', 'knowledge', 'testimony', '证言', 'certainty', '确信'],
      intro: text('追问我们凭什么知道，以及感觉、推理、见证各自能支持到哪里。', 'Ask what warrants knowledge and how far perception, reason and testimony can take us.'),
      explanation: text('认识论同时研究知识的定义、证据的可靠性和认识的边界。课件把健康感官、健全推理和有据的见证作为知识来源。面对一个断言，可先确认内容，再检查证据是否可靠、足够及与结论相称。', 'Epistemology examines what knowledge is, how evidence works and what limits knowing. The slides discuss reliable perception, sound reasoning and well-supported testimony. For a particular claim, identify its content and test the reliability, amount and relevance of its evidence.'),
      examples: [
        example('老师真的改时间了吗？', 'Did the class time change?', '同学转述、原始通知和任课者再次确认，是不同强度的证据。看它们是否来自同一条未证实消息。', 'A classmate’s report, the posted announcement and a confirmation from the instructor have different evidential weight. Check whether they ultimately cite the same unverified message.'),
        example('隔着窗看颜色', 'Colour through a window', '玻璃色调与照明可能影响观察。换无色玻璃、比较多人判断和调整光照，可以检查同一说法。', 'Tint and lighting may affect perception. Change the viewing conditions and compare independent observers to test the claim.')
      ],
      misconception: text('确信是一种态度。判断一个人是否有知识，还须看事实是否成立和证据是否足够。', 'Confidence is an attitude. Judging whether someone knows something also requires considering the fact and the quality of the evidence.'),
      related: ['jtb', 'rationalism', 'empiricism', 'skepticism', 'revelation-tradition']
    },
    {
      id: 'jtb', kind: 'theory', source: [[6, 6, 7, 8, 9]],
      name: text('有证成的真信念', 'Justified true belief'), aliases: ['JTB', 'Gettier', '盖梯尔问题', 'justification', '有根据的真信念'],
      intro: text('经典知识模型的三个条件是相信、真实以及有足够根据。', 'A classic model of knowledge asks for belief, truth and justification.'),
      explanation: text('要说某人知道一个命题，先问他是否相信它、命题是否真的成立、理由是否充分。盖梯尔案例质疑这三项是否总能排除侥幸：一个人可能有良好理由，最终却因为意外碰巧得到真信念。', 'To say someone knows a proposition, check whether they believe it, whether it is true and whether their belief is justified. Gettier cases ask whether these conditions always rule out luck. Someone might have reasonable grounds and reach the truth only through coincidence.'),
      examples: [
        example('根据和猜测', 'Evidence and guessing', '你通过两次可靠测量知道瓶中有水。若从未检测，只凭猜测碰巧说中，真实和相信虽然成立，证成条件仍缺。', 'Two reliable checks support knowing that the bottle contains water. A lucky guess may be believed and true while lacking justification.'),
        example('碰巧看对的钟', 'A stopped clock that is right', '你看了一面通常很可靠的钟，读到三点。钟早已停住而眼下恰好三点。这个案例展示证据和真实之间可能存在运气。', 'You trust a usually reliable clock that says three. It has stopped and it happens to be three. The example shows how apparent justification and truth may come together by luck.')
      ],
      misconception: text('课件三条件图适合辨认每个条件。三项都满足以后，知识是否还需额外条件属于开放讨论。', 'The three switches in the course model help identify each condition. Whether knowledge needs a further condition remains a philosophical question.'),
      externalReferences: [{title: '盖梯尔原文 / Gettier, Is Justified True Belief Knowledge?', url: 'https://academic.oup.com/analysis/article-abstract/23/6/121/109949'}],
      related: ['epistemology', 'skepticism', 'correspondence']
    },
    {
      id: 'rationalism', kind: 'theory', source: [[6, 12, 13, 14, 17], [5, 23]],
      name: text('理性主义', 'Rationalism'), aliases: ['先验', 'a priori', '理性论', 'reason', 'Descartes', 'Leibniz', 'Spinoza'],
      intro: text('强调理性、推导和部分独立于观察的知识根据。', 'Emphasise reason, inference and some grounds for knowledge independent of observation.'),
      explanation: text('课程从先天观念、先验真理和演绎认识理性主义。核心问题是：我们能否纯凭思考证成某类判断，以及范围有多大。理性主义者可接受观察的价值，并对知识根据来自何处给出不同答案。', 'The slides introduce rationalism through innate ideas, a priori knowledge and deduction. The question is what kinds of claims reason can justify independently of particular observations. Rationalists can value observation while giving reason a distinctive role in justification.'),
      examples: [
        example('一个定义的后果', 'What follows from a definition', '接受“偶数是二的整数倍”和“四等于二乘二”后，可推导四是偶数。无需观察每组四个物件以反复核对。', 'Once an even integer is defined as a multiple of two and four equals two times two, four follows as even without repeated observation of groups of four objects.'),
        example('水中的汤匙', 'A spoon in water', '汤匙看起来弯了。对光和位置的推理提供其他解释，用取出汤匙的观察还可检验解释。', 'A spoon looks bent in water. Reasoning about viewing conditions suggests another explanation, and taking the spoon out offers an empirical check.')
      ],
      misconception: text('先验讲的是证成方式。“想得很清楚”仍要分辨推理结构与前提是否可接受。', 'A priori concerns how a belief is warranted. Clear thinking still requires checking the reasoning and its premises.'),
      related: ['empiricism', 'deduction', 'epistemology', 'dualism']
    },
    {
      id: 'empiricism', kind: 'theory', source: [[6, 12, 15, 17, 24]],
      name: text('经验主义', 'Empiricism'), aliases: ['经验论', 'a posteriori', '后验', '白板说', 'tabula rasa', 'Locke', 'Hume'],
      intro: text('强调观察与经验在形成概念和证成事实判断中的作用。', 'Emphasise experience and observation in forming ideas and supporting factual claims.'),
      explanation: text('经验主义通常认为，关于实际世界的许多主张须回到经验检验。后验知识的根据依赖观察。课件用洛克等人和白板说介绍此路线。具体论证仍需要理性比较样本、误差、假说和证据。', 'Empiricism typically requires experience to warrant many claims about the world. A posteriori knowledge relies on observation for its justification. The course introduces this approach through Locke and others. In practice, reasoning compares samples, errors, hypotheses and evidence.'),
      examples: [
        example('桌面是否平整', 'Is the table level?', '可以用水平仪在几个位置测量，换角度重复，再报告读数怎样支持结论。', 'Take level readings at several positions, repeat from another orientation and report how the observations support the claim.'),
        example('两种复习方法', 'Two ways of studying', '比较练习和重读的效果，可记录起点、花费时间和延时测验。数据补足对方法效果的直觉。', 'Compare practice and rereading by recording starting performance, time spent and a delayed quiz. The observations add evidence to initial impressions.')
      ],
      misconception: text('可疑的单次观察需要校验。经验主义可以通过仪器、重复和交叉验证提升证据质量。', 'A doubtful observation calls for checks. Instruments, repetition and independent verification can improve empirical evidence.'),
      related: ['rationalism', 'induction', 'positivism', 'epistemology']
    },
    {
      id: 'skepticism', kind: 'theory', source: [[6, 12, 14, 16], [5, 23], [7, 6]],
      name: text('哲学怀疑主义', 'Philosophical scepticism'), aliases: ['skepticism', 'scepticism', '方法性怀疑', 'methodic doubt'],
      intro: text('系统询问某个信念如何获得证成，以及我们该何时暂缓判断。', 'Test how a belief is justified and when it is reasonable to suspend judgement.'),
      explanation: text('怀疑可以针对某个来源、领域或整个知识主张。方法性怀疑把暂缓接受当作寻找可靠根据的步骤。评价时要说明某个可能出错的情形是否真的削弱当前证成，或需要更明确的证据标准。', 'Doubt can target a source, a domain or knowledge more broadly. Methodic doubt temporarily withholds assent to find better grounds. Ask whether a possibility of error defeats current warrant or points to a different standard of evidence.'),
      examples: [
        example('社交媒体的转发', 'Multiple shares of one post', '许多转发来自同一张未经核实的截图。找独立记录，有助于分辨转发数量和证据数量。', 'Many shares may trace back to one unverified screenshot. Look for independent records to distinguish repetition from corroboration.'),
        example('被感官误导以后怎么办？', 'What follows from a perceptual error?', '水中物体看似变形提示一定条件下会误导。可以调整条件重复观察，也可追问这种经验能否推广成总体怀疑。', 'An object may look distorted in water. Repeat under different conditions and ask how far this case supports a broader sceptical claim.')
      ],
      misconception: text('怀疑强度可以随证据改变。说明需要达到哪个标准，以及为什么该标准适合这个问题。', 'Degrees of doubt can change with evidence. Explain which standard is needed and why it is appropriate to the question.'),
      related: ['epistemology', 'jtb', 'rationalism', 'agnosticism']
    },
    {
      id: 'correspondence', kind: 'theory', source: [[6, 19, 20, 21, 26]],
      name: text('真理符合论', 'Correspondence theory of truth'), aliases: ['对应论', 'correspondence', 'truth'],
      intro: text('一句陈述为真，取决于相关事实是否如它所说。', 'A statement is true when the relevant facts are as it says.'),
      explanation: text('符合论关心命题与实际情形的对应。观察、档案或测量能帮助检验这种对应，证据的好坏仍要另行评价。比较事实和命题时须明确时间、地点与词语含义。', 'Correspondence concerns the relation between a proposition and how things are. Observation, records and measurement can help test that relation. The evidence still needs assessment. Specify time, place and meanings before comparing a claim with the facts.'),
      examples: [
        example('图书馆周五开放吗？', 'Is the library open on Friday?', '说明具体哪一个周五、几点以及哪间馆。去现场或读已核实的记录，就有望检查陈述对应的事实。', 'Specify the Friday, hour and library. Visit or check a reliable record for the state of affairs the statement describes.'),
        example('记录可能写错', 'A record can be wrong', '系统记载一件物品已归还。核对保管处实物后发现物品仍在借用中，说明记录与事实出现差异。', 'The system lists an item as returned, but the inventory check shows it is still out. The record and the state of affairs diverge.')
      ],
      misconception: text('检验方法可能失灵。符合论对真理的解释仍可以要求区分一个事实与我们知道它的方式。', 'A test can fail. A correspondence account allows the fact and our means of knowing it to come apart.'),
      related: ['coherence', 'pragmatism', 'epistemology', 'realism']
    },
    {
      id: 'coherence', kind: 'theory', source: [[6, 19, 20, 21, 26]],
      name: text('真理融贯论', 'Coherence theory of truth'), aliases: ['融贯论', '一致论', 'coherentism', 'coherence'],
      intro: text('从一个判断能否与相互支持的整套信念融为一体理解真理。', 'Understand truth through a judgement’s fit in an explanatory, mutually supporting system of beliefs.'),
      explanation: text('融贯涉及一致性、相互解释和整套信念的组织。发现一处冲突时，可考虑调整新判断，也可检查原有系统。多个叙事都能内部融贯的问题，是理论要处理的挑战。', 'Coherence involves consistency, explanatory support and the organisation of a whole system. When a conflict appears, check both the new judgement and the existing system. A challenge is how to deal with competing systems that are internally coherent.'),
      examples: [
        example('谁改了讨论时间', 'Who changed the meeting time?', '一个说法同时解释日历更新、邮件和实际出席情况，另一说法需要多项临时假设。比较这些解释与已有记录的融贯程度。', 'One account explains the calendar, emails and attendance while another needs several ad hoc assumptions. Compare how well each account fits the full set of records.'),
        example('两套自洽的故事', 'Two coherent stories', '两部小说都可内部一致，谈论同一真实事件时还要问哪套故事更能得到独立证据支持。', 'Two novels can both be internally consistent. When accounts concern the same actual event, ask which is better supported by independent evidence.')
      ],
      misconception: text('没有矛盾只是融贯的一部分。信念之间是否相互解释和支撑同样重要。', 'Consistency is one part of coherence. Mutual explanation and support also matter.'),
      related: ['correspondence', 'pragmatism', 'epistemology']
    },
    {
      id: 'pragmatism', kind: 'theory', source: [[6, 19, 20, 21, 26]],
      name: text('实用主义真理论', 'Pragmatic theories of truth'), aliases: ['实用论', 'pragmatic', 'pragmatism', 'Peirce', 'James', 'Dewey'],
      intro: text('关注一个判断如何指导实践、在经验中受检验并在探究中保持可靠。', 'Consider how a claim guides action, is tested in experience and holds up in inquiry.'),
      explanation: text('课件用理论的实际效果和原子理论切入。实用主义内部有不同解释，包括强调长期探究的趋向、可验证的后果或在经验中经受检验。读题时可问采纳一项主张会如何改变预期，且改变能否反复被检验。', 'The slides introduce practical consequences and use atomic theory as an example. Pragmatic accounts differ, with emphases on long-run inquiry, verifiable consequences and claims holding up in experience. Ask what accepting a claim would lead you to expect and how that expectation could be tested.'),
      examples: [
        example('学习方法能否重复奏效', 'Does a study method keep working?', '练习提取若在不同单元、不同时间都帮助回忆，可作为支持。改变材料和测验形式，检验效果是否来自方法本身。', 'If retrieval practice supports recall across topics and time intervals, that supports the claim. Change the materials and test formats to check whether the method drives it.'),
        example('短期管用的假设', 'A shortcut that works for now', '按一张简化路线图能找到校门。若图漏掉无障碍坡道，适用条件便需要说明，之后也能根据新场景修订。', 'A simplified map gets you to the gate. If it omits an accessible ramp, specify the scope of its usefulness and revise it for new conditions.')
      ],
      misconception: text('“暂时对我方便”只是很弱的实践线索。检验长期结果、不同情境、可复核性和反例，才有更强理由。', 'Short-term convenience is weak evidence. Check longer-term results, different contexts, reproducibility and counterexamples.'),
      related: ['correspondence', 'coherence', 'empiricism', 'heuristics']
    },
    {
      id: 'revelation-tradition', kind: 'framework', source: [[4, 5, 6], [5, 6, 7], [6, 16, 18, 20, 22, 24]],
      name: text('启示、传统与证言', 'Revelation, tradition and testimony'), aliases: ['dogmatism', '课件教条主义', 'religion and tradition', 'revelation', '传统'],
      intro: text('理解知识如何经由经典、共同体与传承传递，以及如何评价根据。', 'Understand how scripture, communities and transmission can inform belief, and assess their grounds.'),
      explanation: text('第六章以宗教与传统讨论知识和人生意义，并呈现启示在伊斯兰认识论中的地位。通用的证言评估还可问见证者接触事实的方式、传承是否有记录，以及解释有没有异议。要区分传统内部的权威、公共证据与外部比较标准。', 'Chapter 6 examines religion and tradition in relation to knowledge and purpose, and presents the role of revelation in Islamic epistemology. Assessing testimony also involves access to facts, records of transmission and disagreements about interpretation. Distinguish authority within a tradition, public evidence and criteria for comparing claims across traditions.'),
      examples: [
        example('一条传承的解释', 'Interpreting a transmitted teaching', '看到一项宗教义务的转述，可以查原文、解释传统和应用情境，分别核对来源与解释。', 'When someone reports a religious duty, check the text, its commentarial tradition and the situation of use. Evaluate both source and interpretation.'),
        example('地方故事的多个版本', 'Versions of a local account', '一项习俗起源有两种口述。比较最早记录、传述链和讲述者的目的，可分别说明哪些事实较可确定。', 'Two oral accounts offer different origins for a custom. Compare early records, transmission chains and purposes to judge what can be established.')
      ],
      misconception: text('课件把宗教与传统与三种真理理论并列。学习时可把它当作讨论知识来源及解释框架的一条路线。', 'The slides list religion and tradition alongside three theories of truth. Study it as a route for examining sources and interpretive frameworks.'),
      related: ['epistemology', 'theism', 'islamic-stewardship', 'local-wisdom']
    },
    {
      id: 'ideology', kind: 'framework', source: [[7, 4, 5, 6, 42]],
      name: text('意识形态', 'Ideology'), aliases: ['political ideas', '社会思想', '价值框架'],
      intro: text('从一组相联的观念理解社会，也思考社会应该怎样改变。', 'Use a system of ideas to explain society and consider how it ought to change.'),
      explanation: text('第七章把意识形态描述为解释世界并指导行动的思想体系。分析时可问它怎样描述问题、重视哪些价值、希望靠什么制度达到目标。分别检查事实主张与价值原则，还可比较不同立场是否在回答同一个问题。', 'Chapter 7 treats an ideology as a system that explains the world and guides action. Ask what it defines as the problem, which values it prioritises and what institutions it proposes. Test factual claims and value principles separately, then check whether different positions address the same question.'),
      examples: [
        example('住房成本', 'The cost of housing', '制度立场可能分别强调供给、保障和产权。列出解释和政策，再比较需要什么数据、哪些群体承担代价。', 'Different views may prioritise supply, social provision or property rights. Set out the explanations and proposals, then ask for evidence and identify who bears the costs.'),
        example('学生会的方案', 'Plans for a student union', '一项方案主张多数决，另一项为少数团体设置申诉。它们对代表性和程序公平的权重不同，均可接受检验。', 'One plan stresses majority voting and another adds appeals for smaller groups. Their priorities for representation and procedural fairness can be examined.')
      ],
      misconception: text('意识形态可以公开包含事实与规范主张。“有意识形态”这个标签没有评价某个主张的理由。', 'An ideology can openly include both factual and normative claims. Labelling an idea ideological leaves its reasons to be evaluated.'),
      related: ['secularism', 'modernism', 'postmodernism', 'social-constructivism']
    },
    {
      id: 'secularism', kind: 'theory', source: [[7, 6, 7, 8, 9, 10]],
      name: text('世俗主义', 'Secularism'), aliases: ['secularisation', '世俗化', '祛魅', 'disenchantment', 'state and religion'],
      intro: text('讨论公共权力、宗教制度与个人信仰之间的边界。', 'Examine boundaries between public authority, religious institutions and personal belief.'),
      explanation: text('世俗主义可指限制公共权力以宗教身份差别对待人的制度主张。世俗化是描述宗教在社会生活中角色变化的过程。课件从政治、知识与价值分离等角度讨论，两词的含义及不同国家的实践需要分开分析。', 'Secularism can describe an institutional position that limits differential treatment by public authority based on religion. Secularisation describes changes in religion’s social role. The slides discuss divisions in politics, knowledge and values. Distinguish the two terms and compare actual institutional arrangements.'),
      examples: [
        example('公共服务准入', 'Access to public services', '一间公共图书馆依据居住和借阅规则受理办证，不要求特定信仰。可用这个例子讨论公共权力怎样处理公民资格。', 'A public library uses residence and borrowing rules without requiring a religious affiliation. This illustrates how public institutions can handle eligibility.'),
        example('个人信仰与公共理由', 'Private belief and public reasons', '参与者可从自身信念出发，讨论共用空间时再说明时间、便利和相互尊重等各方可检查的理由。', 'Participants may start from their beliefs. For shared space, they can also explain reasons concerning time, access and mutual respect that others can assess.')
      ],
      misconception: text('世俗主义与无神论回答不同问题。关于国家制度的立场可以与个人有神信念同时存在。', 'Secularism and atheism address different questions. A position on state institutions can coexist with personal religious belief.'),
      related: ['ideology', 'modernism', 'theism', 'political-philosophy']
    },
    {
      id: 'modernism', kind: 'tradition', source: [[7, 5, 6, 11, 12, 13, 16, 17], [8, 9]],
      name: text('现代性、现代主义与现代化', 'Modernity, modernism and modernisation'), aliases: ['Enlightenment', '启蒙', 'modernity', 'modernism', 'modernization', '进步'],
      intro: text('区别现代社会条件、促进改变的过程，以及以理性和进步为特征的思想。', 'Distinguish modern social conditions, processes of change and ideas centred on reason and progress.'),
      explanation: text('课堂将物质或制度状况与现代性、思想取向与现代主义、转变过程与现代化相联。第七章借启蒙传统讨论理性、公开批评与科学。历史上“现代主义”跨艺术和思想还有其他用法，应根据文本确定所指。', 'The course links modernity with material and institutional conditions, modernism with an outlook and modernisation with processes of change. Chapter 7 uses the Enlightenment to discuss reason, criticism and science. “Modernism” has other meanings in intellectual and artistic contexts. Identify the sense in use.'),
      examples: [
        example('同一所学校的三个层面', 'Three dimensions of one school', '有数码网络是条件。逐步安装、培训和改变流程是现代化。以理性和技术进步指导改造，是一种思想判断。', 'Having a digital network is a condition. Installation, training and process change are modernisation. A commitment to rational and technological progress is an intellectual position.'),
        example('用公开理由评价改革', 'Giving public reasons for reform', '改革选课制度时公开候选方案、数据和申诉，体现可质疑的理由与制度改进。仍要检查公平和实际后果。', 'Publishing plans, data and appeals for a registration reform illustrates revisable public reasons. Fairness and actual outcomes remain open to evaluation.')
      ],
      misconception: text('现代社会常同时包含传统实践。第二组概念的作用是分辨设施、变化过程与判断依据。', 'Modern societies often include established traditions. This distinction helps separate conditions, processes and intellectual commitments.'),
      related: ['humanism', 'scientism', 'postmodernism', 'secularism']
    },
    {
      id: 'humanism', kind: 'tradition', source: [[7, 6, 15, 16], [8, 9, 25]],
      name: text('人文主义', 'Humanism'), aliases: ['humanism', 'human dignity', '人类尊严', '人的能动性'],
      intro: text('以人的尊严、能力和责任为思考教育与公共生活的重要起点。', 'Begin from human dignity, capacities and responsibilities when thinking about education and public life.'),
      explanation: text('人文主义一词包括不同历史阶段和宗教语境的传统。课件在现代思想脉络中突出人的理性和行动能力。讨论这些价值时，仍可批评狭隘的人类中心，也可问制度如何促进被忽视者发挥能力。', 'Humanism names varied traditions across periods and religious settings. The course foregrounds human reason and agency in modern thought. These commitments leave room to criticise narrow anthropocentrism and ask whose capacities institutions enable.'),
      examples: [
        example('让更多学习者参与', 'Making learning accessible', '为行动或阅读受限者提供可参与的设计，体现对尊严与能力的重视，也需要听取受影响者的经验。', 'Accessible teaching expresses concern for dignity and agency. Designing it well requires hearing the people who face barriers.'),
        example('技术进步如何评价', 'Judging technological progress', '一项自动化提高效率，仍要问它怎样影响工作能力、责任分配和人的选择。', 'Automation increases efficiency. A humanist analysis also asks what it does to skills, responsibilities and choices.')
      ],
      misconception: text('重视人的能力可与关心自然共存。“人类中心主义”进一步讨论所有价值是否以人类利益衡量。', 'Concern for human capacities can coexist with concern for nature. Anthropocentrism asks more specifically how human interests figure in value.'),
      related: ['modernism', 'anthropocentrism', 'national-education']
    },
    {
      id: 'liberalism', kind: 'tradition', source: [[7, 6, 27, 28], [2, 16]],
      name: text('政治自由主义', 'Political liberalism'), aliases: ['自由主义', 'liberalism', 'liberty', 'rights', '权利'],
      intro: text('将个人自由与平等公民地位作为评价政治制度的重要理由。', 'Use individual liberty and equal civic status as important reasons for judging political institutions.'),
      explanation: text('自由主义是一个有内部分歧的政治传统，常讨论个体权利、同意和公共权力的限制。争论包括怎样防止干涉、如何提供行使自由的实际条件以及平等分配的范围。第七章把它列在课程的现代思想时间线上。', 'Liberalism is a diverse political tradition concerned with rights, consent and limits on power. It includes debates about interference, practical conditions for exercising freedom and the scope of equality. Chapter 7 places it on the course timeline of modern ideas.'),
      examples: [
        example('保证有不同意见的机会', 'Allowing disagreement', '学生组织应说明批评政策的渠道与程序，并明确为何某些隐私或安全限制对所有人适用。', 'A student group can protect opportunities to criticise policy and explain why particular privacy or safety rules apply to all.'),
        example('同等服务的实际条件', 'Practical conditions of access', '纸面上所有人能报名。讨论信息获取、费用与交通怎样影响实际选择，可对照只关注规则相同和也关注机会的方案。', 'Everyone can apply on paper. Comparing information, cost and transport can reveal different accounts of what equal opportunity requires.')
      ],
      misconception: text('多数决、个人自由和经济政策各有理论。读比较表时注意具体语境和各主张的理由。', 'Majority rule, individual freedom and economic policy raise distinct questions. Read course comparisons with their context and reasons in view.'),
      related: ['political-philosophy', 'ideology', 'economic-justice', 'modernism']
    },
    {
      id: 'postmodernism', kind: 'tradition', source: [[7, 18, 19, 20, 21, 22, 23, 26, 27]],
      name: text('后现代主义与宏大叙事批判', 'Postmodernism and critique of metanarratives'), aliases: ['元叙事', 'metanarrative', 'Lyotard', '利奥塔', 'postmodernism'],
      intro: text('追问声称能解释每个人的同一套理论如何处理地方差异与权力。', 'Ask how claims to explain everyone through one account handle local differences and power.'),
      explanation: text('课程用理性进步、统一历史等宏大叙事来介绍后现代批判。利奥塔提醒读者注意知识正当化所依赖的故事。福柯与德里达相关讨论各有问题和方法。检验批判时，可以问叙事遗漏了谁、描述靠什么标准、例外对原主张有何影响。', 'The course introduces postmodern critique through comprehensive narratives of rational progress or history. Lyotard directs attention to the narratives that legitimate knowledge. Foucault and Derrida pursued distinct inquiries. Ask whose experience a narrative omits, what standards set its terms and how exceptions affect it.'),
      examples: [
        example('同一段现代化的经验', 'Different experiences of one reform', '某项城市建设被描述为人人受益。检验受搬迁影响的人、不同社区及部门的资料，重新评价整个叙事。', 'A city project is presented as progress for everyone. Examine people who were relocated, different communities and agency records to reassess the story.'),
        example('目录如何命名', 'Naming categories in a catalogue', '博物馆用“技术进步”排列物件，可能不易看见劳动、交流和使用者。尝试另一组分类能使被忽略的问题进入视野。', 'A museum catalogue based on technological progress may obscure labour, exchange and use. A different arrangement can bring those questions into view.')
      ],
      misconception: text('后现代主义是范围较大的标签。具体作者对事实、科学和现代社会的主张需逐项查证。', 'Postmodernism is a broad label. Judge particular authors’ claims about facts, science and modern society individually.'),
      related: ['modernism', 'deconstruction', 'language-games', 'discourse-power', 'relativism']
    },
    {
      id: 'deconstruction', kind: 'method', source: [[7, 23, 24, 27]],
      name: text('解构', 'Deconstruction'), aliases: ['Derrida', '德里达', '二元对立', 'binary opposition'],
      intro: text('细读文本中的对立关系，检查被置于次要地位的一项怎样支撑主要一项。', 'Read a text closely to test how a subordinated term helps constitute the privileged one.'),
      explanation: text('以德里达相关讨论为例，先找文本中被稳定区分的词，如中心与边缘、原本与补充。再回到细节，检查论证是否要借助它试图排除的项，以及词的意义如何随语境变化。讲清依据出现在文本何处。', 'In an inquiry associated with Derrida, locate a stable-looking contrast such as centre and margin or original and supplement. Return to details and check whether the privileged term depends on what the text sidelines. Trace shifts of meaning to particular passages.'),
      examples: [
        example('课堂里的“正式与补充”', 'The “formal” and the “supplementary”', '课程说明称讨论只是补充，但又用讨论来判断规则含义。这个细节可检验正式内容怎样依赖补充活动。', 'A course calls discussion a supplement, then relies on it to determine what rules mean. The detail tests how formal content depends on the supplementary practice.'),
        example('标准与例外', 'Standards and exceptions', '文件定义“正常使用者”，用一长条例外说明标准。细读哪些情境依赖被排除的使用方式才有意义。', 'A document defines a “normal user” with a long list of exceptions. Examine where the standard makes sense only in relation to the excluded uses.')
      ],
      misconception: text('解构依赖仔细阅读及文本证据。指出张力后，还可以说明原有分类在哪些场合有用。', 'Deconstruction relies on close reading and textual evidence. After exposing a tension, you can still state where a classification is useful.'),
      related: ['postmodernism', 'language-games', 'discourse-power']
    },
    {
      id: 'language-games', kind: 'method', source: [[2, 4, 6], [7, 19, 20]],
      name: text('语言哲学与语言游戏', 'Philosophy of language and language games'), aliases: ['language philosophy', 'Wittgenstein', '维特根斯坦', 'meaning as use', '意义即用法'],
      intro: text('从活动、场合与共同规则理解词语在做什么。', 'Understand what words do by examining activities, situations and shared rules.'),
      explanation: text('维特根斯坦的语言游戏关注词语在具体活动中的使用。一个表达可以在不同场合起到提问、通知、承诺或命令的作用。第七章借语言游戏讨论多样的说法和知识方式，读题时要先确认在讲语境差异还是更强的相对主义主张。', 'Wittgenstein’s language games focus on use in particular activities. An expression can ask, report, promise or direct depending on the setting. Chapter 7 draws on language games in discussing diversity. Distinguish that observation about context from any stronger relativist conclusion.'),
      examples: [
        example('“可以开始了”做了什么？', 'What does “You can start” do?', '考场里是开卷指令，师生讨论中是邀请，在设备手册里可能是条件满足的判断。判断功能要读使用情境。', 'In an exam this may be a direction, in a discussion an invitation and in a manual a statement that conditions are met. Determine its function from the setting.'),
        example('比赛中的“失误”', 'An “error” in different games', '同一个动作在不同规则下可能得分或犯规。词的含义取决于正在参与哪种共同活动。', 'The same move can score or violate a rule in different games. Its description depends on the shared practice.')
      ],
      misconception: text('语境有共享规则和纠错方式。认识用法的多样性仍允许说明某个用词为何不恰当。', 'Contexts have shared criteria and ways to correct mistakes. Diversity of use still allows us to explain an inappropriate use.'),
      related: ['analytic-philosophy', 'deconstruction', 'social-constructivism', 'relativism']
    },
    {
      id: 'discourse-power', kind: 'framework', source: [[7, 23, 24, 25], [8, 29, 31]],
      name: text('话语、知识与权力', 'Discourse, knowledge and power'), aliases: ['Foucault', '福柯', 'power knowledge', 'discourse'],
      intro: text('追问谁能建立知识类别，制度如何让它们取得权威。', 'Ask who defines categories of knowledge and how institutions give them authority.'),
      explanation: text('课件以福柯引入话语与权力。可把话语理解为反复使用的说法、分类与实践，它们会决定哪些问题可说、什么记录被承认为证据。应用时同时观察文件、职业规则和人受何种实际约束。', 'The slides use Foucault to introduce discourse and power. Repeated patterns of speaking, classification and practice shape what can be said and what records count as evidence. Examine documents, professional rules and the practical constraints people face.'),
      examples: [
        example('怎样定义学习困难', 'Defining learning difficulties', '谁能确立评价规则，哪些经历会进入记录？比较规则能带来的支持，以及一种指标怎样使某些困难被忽略。', 'Who sets the criteria, and which experiences make it into a record? Compare support a rule provides with the difficulties an indicator can overlook.'),
        example('工作评价的词汇', 'Language in workplace evaluation', '记录只统计可计数任务，经验分享和维护工作不被算入。可以追问评价词汇如何引导安排工作和分配资源。', 'If records count assignments but omit mentoring and maintenance, ask how assessment language directs work and resource decisions.')
      ],
      misconception: text('分析知识的制度条件可以与证据检验并行。给出权力关系之后，还应核对具体事实和机制。', 'Analysis of institutional conditions can coexist with testing evidence. After identifying power relations, check concrete facts and mechanisms.'),
      related: ['social-constructivism', 'postmodernism', 'orientalism']
    },
    {
      id: 'social-constructivism', kind: 'theory', source: [[7, 23, 24, 25]],
      name: text('社会建构论', 'Social construction'), aliases: ['社会建构主义', 'social constructivism', 'social constructionism'],
      intro: text('考察主要由规则、制度与共同实践塑造的类别或事实。', 'Examine categories and facts shaped by rules, institutions and collective practices.'),
      explanation: text('先明确被建构的是一个类别的界线、它的意义，还是制度事实本身。物质条件和社会分类可以共同起作用。通过比较不同制度怎样划界，能够发现哪些看似必然的规则有实际的历史与社会来路。', 'Specify whether what is constructed is a category boundary, its meaning or an institutional fact. Material conditions and social classifications can both matter. Comparing institutions helps reveal how apparently inevitable rules came to exist.'),
      examples: [
        example('纸为何有货币用途？', 'How paper takes on a monetary role', '材料属性回答一部分问题。它为何能作购物凭证，需要制度、信任和使用规则共同解释。', 'Material properties explain part of the object. Its use in exchange depends on institutions, trust and practices.'),
        example('迟到的边界', 'The boundary of lateness', '到达时刻可测量。“迟到”还需要开始时间和宽限规则。改变这些规则会改变分类，却不改变到达时刻。', 'Arrival time can be measured. Lateness also requires a scheduled start and a grace rule. A rule change alters classification without altering arrival time.')
      ],
      misconception: text('由实践建构的规则能对人产生真实后果。课件第 25 页的相关人物图像需要结合文字区分其历史主张。', 'Constructed rules can have real consequences. Read the figures on the course’s p. 25 in context before attributing historical claims.'),
      related: ['realism', 'language-games', 'discourse-power', 'deconstruction']
    },
    {
      id: 'relativism', kind: 'theory', source: [[7, 27, 29, 30, 31, 32, 37]],
      name: text('相对主义', 'Relativism'), aliases: ['道德相对主义', 'moral relativism', 'epistemic relativism', '主观主义', 'subjectivism'],
      intro: text('问评价或证成在何种意义上依赖文化、个人或概念框架。', 'Ask in what sense evaluation or justification depends on a culture, person or conceptual framework.'),
      explanation: text('相对主义有关于道德、知识及真理等不同版本。先分清描述上有人不同意和规范上判断是否依赖标准。课件用“没有绝对真理”追问命题能否适用于自身。评估该反驳时须弄清被讨论的相对主张范围。', 'Relativisms about morality, knowledge and truth vary. Separate the fact of disagreement from a claim that judgements depend on a standard. The slides test self-reference with the claim that there is no absolute truth. Identify the scope of the relativist claim before applying the objection.'),
      examples: [
        example('礼貌如何判断', 'Judging politeness', '直呼名字在某场合体现亲近，换场合可能被认为不敬。例子支持态度和习惯可依场合，进一步的道德结论需要理由。', 'Using a first name can be friendly in one setting and disrespectful in another. This supports contextual etiquette. A broader moral conclusion needs an argument.'),
        example('证据标准能否比较', 'Comparing standards of evidence', '小组对证言与实验的权重不同。先问不同标准能否同样解释反例，以及各自适用于哪些问题。', 'Groups may weigh testimony and experiments differently. Test how their standards handle counterexamples and what questions each is suited to answer.')
      ],
      misconception: text('记录文化差异与主张所有真理都相对，论证范围相差很大。先限定究竟是哪类判断、相对于什么。', 'Recording cultural differences and claiming all truth is relative require different arguments. Specify the kind of judgement and what it would be relative to.'),
      related: ['universalism', 'postmodernism', 'social-constructivism', 'skepticism']
    },
    {
      id: 'universalism', kind: 'theory', source: [[7, 27, 28, 30, 31, 32]],
      name: text('普遍主义、绝对主义与客观主义', 'Universalism, absolutism and objectivism'), aliases: ['universalism', 'absolutism', 'objectivism', '普遍性', '客观性'],
      intro: text('分别问原则适用到哪里、有无例外，以及真或对是否取决于赞同。', 'Separate three questions: scope, exceptions and dependence on approval.'),
      explanation: text('普遍主义讨论一个标准能否适用于所有相关对象，绝对主义关注是否允许例外，客观主义强调正确性并非由个人或群体认同决定。第七章将它们用于相对主义比较。一个有普遍范围的原则仍可包含对情境的说明。', 'Universalism concerns whether a standard applies to all the relevant cases. Absolutism concerns whether it admits exceptions. Objectivism holds that correctness does not depend on approval. The slides contrast these with relativism. A principle with universal scope can still take circumstances into account.'),
      examples: [
        example('资格都需要公平解释', 'Fair reasons for eligibility', '要求所有申请者获同样程序保障，是一项普遍主张。具体语言及地点安排可以根据需要调整。', 'Providing procedural safeguards to every applicant is a universal requirement. Language and location can still be adapted to circumstances.'),
        example('陈述真实与承诺', 'Truthfulness and promises', '可分别讨论诚实是否有客观理由、对谁适用、遇到隐私冲突时有无例外。三问可能得到不同回答。', 'Ask whether honesty has objective grounds, whom it applies to and whether privacy can justify an exception. The three questions can have different answers.')
      ],
      misconception: text('制度用同一标准处理案例，还可以依据相关差异作调整。判断是否客观时要检查调整所凭的理由。', 'A common standard can allow differences that are relevant to the case. Assess whether the adjustment is supported by reasons.'),
      related: ['relativism', 'realism', 'applied-ethics', 'political-philosophy']
    },
    {
      id: 'decolonisation', kind: 'framework', source: [[8, 4, 5, 7, 14, 15, 20, 21, 32, 33]],
      name: text('殖民主义与去殖民化', 'Colonialism and decolonisation'), aliases: ['殖民化', 'colonisation', 'decolonization', '政治独立', 'colonialism'],
      intro: text('从主权、制度、语言、经济和知识等层面追踪殖民与独立过程。', 'Trace colonial rule and independence through sovereignty, institutions, language, economy and knowledge.'),
      explanation: text('殖民化通常涉及外来权力对土地、劳动力、制度或资源的支配。去殖民化可指政治独立的过程，也可继续检验独立后语言、教育、经济等领域怎样延续旧关系。先说明支配方式和历史证据，再判断改革的目标。', 'Colonisation involves external domination of land, labour, institutions or resources. Decolonisation can refer to gaining political independence and to examining what patterns endure after it in language, education and the economy. Identify the form of domination and historical evidence before evaluating reforms.'),
      examples: [
        example('独立后的课程', 'A curriculum after independence', '一个地区取得政治独立后，学校仍只用殖民时代的教材。比较师资、语言、历史材料及读者需求，可规划怎样增补现有课程。', 'A region becomes independent but schools still use only colonial-era texts. Compare language needs, teacher preparation and local materials before redesigning the curriculum.'),
        example('档案里的工人', 'Workers in an archive', '贸易档案详细记录出口，却少有工人的叙述。可并用契约、口述和当地报刊，检查不同记录覆盖了哪些生活经验。', 'Trade records document exports but rarely workers’ accounts. Contracts, oral histories and local newspapers can show different aspects of their experience.')
      ],
      misconception: text('某种制度来自殖民历史是一项来源判断。决定保留、调整或替换时，还需比较当下作用和选择权。', 'Colonial origin is a historical claim. Decisions to retain, redesign or replace an institution also involve its current effects and who can decide.'),
      related: ['epistemic-decolonisation', 'eurocentrism', 'local-wisdom']
    },
    {
      id: 'anthropocentrism', kind: 'theory', source: [[8, 25, 26, 28, 32, 35], [2, 22], [5, 28, 29, 30, 31]],
      name: text('人类中心主义与生态中心观', 'Anthropocentrism and ecocentric perspectives'), aliases: ['anthropocentrism', 'ecocentrism', '固有价值', 'intrinsic value', 'anthropogenic', '人为影响'],
      intro: text('对照以人类利益和以生态整体价值评估环境行动的不同理由。', 'Compare reasons based on human interests with reasons based on the value of ecological systems.'),
      explanation: text('人类中心主义会依据人类利益、需求或价值来评价行为。生态中心取向可进一步把生态系统的连贯、恢复力和生命多样性视为独立理由。课件强调人的活动造成的影响，要把这种经验描述与价值立场分开。', 'Anthropocentrism evaluates actions through human interests and values. Ecocentric views can give independent weight to ecological integrity, resilience and diversity. The slides also discuss human-caused impacts. Distinguish that descriptive claim from a value position.'),
      examples: [
        example('保护了一片湿地', 'Protecting a wetland', '可以为了减低人类洪灾风险而保护，也可以为了栖息地本身和生物多样性。政策相同，支持它的理由不同。', 'One case for conservation is reducing human flood risk. Another gives weight to habitats and diversity in their own right. Both reasons can support the same policy.'),
        example('比较两种开发方案', 'Comparing two developments', '先画出收益、居住影响及物种栖息地。若两案给人的收益相同，生态理由可能让排序不同。', 'Map benefits, housing impacts and habitats. If human benefits are similar, ecological reasons may change how the plans are ranked.')
      ],
      misconception: text('以长远人类利益为依据也能支持保护政策。“人类活动所致”描述原因，和“人类利益优先”是两项判断。', 'Long-term human interests can support conservation. “Human-caused” describes a cause. Giving priority to human interests makes a value judgement.'),
      related: ['environmental-philosophy', 'humanism', 'dualism', 'sejahtera']
    },
    {
      id: 'eurocentrism', kind: 'framework', source: [[8, 27, 29, 30, 31, 35]],
      name: text('欧洲中心主义', 'Eurocentrism'), aliases: ['Eurocentric', '西方中心主义', 'European-centred'],
      intro: text('考察是否把某些欧洲经验当作评价全世界的默认尺度。', 'Check whether certain European experiences are treated as the default measure for the world.'),
      explanation: text('课件关注欧洲中心尺度如何影响叙事、知识分类和发展评估。研究者可找出基准、它形成的历史和被省略的经验。要评价一项原则能否普遍应用，既要检查来历，也要看其可论证性和各地证据。', 'The course examines how European-centred assumptions shape histories, knowledge categories and measures of development. Identify the baseline, its history and omitted experiences. Evaluating whether a principle travels well requires reasons and evidence across settings as well as provenance.'),
      examples: [
        example('谁决定“进入现代”的年份？', 'Who sets the date for becoming modern?', '用欧洲工业化阶段为所有地区定时间线，可能隐藏其他地区的技术、贸易和政策变化。比较不同指标会展示不同轨迹。', 'Dating every region by European industrialisation can hide local changes in technology, trade and policy. Compare multiple indicators to reveal distinct trajectories.'),
        example('比较两份历史大纲', 'Comparing two history outlines', '一份只写殖民当局的决定，另一份加入商人、工人和社区组织。比较两份解释如何使用证据和分配行动角色。', 'One outline lists decisions of colonial authorities. Another also includes traders, workers and local organisations. Compare how the accounts use evidence and assign agency.')
      ],
      misconception: text('欧洲出身的观念仍可经比较和讨论应用到其他地方。需要识别的是把地域经验未经论证地变成普遍标准。', 'An idea from Europe may apply elsewhere after comparison and deliberation. The concern is treating a regional experience as universal without supporting reasons.'),
      related: ['epistemic-decolonisation', 'orientalism', 'local-wisdom', 'universalism']
    },
    {
      id: 'epistemic-decolonisation', kind: 'framework', source: [[8, 25, 26, 27, 28, 29, 31, 33, 35]],
      name: text('认识论去殖民化', 'Epistemic decolonisation'), aliases: ['知识殖民', 'epistemological colonisation', 'epistemic arrogance', '认识上的傲慢', 'epistemic decolonization'],
      intro: text('检查谁能生产、分类和承认知识，重建知识评价中的参与和证据条件。', 'Examine who produces, classifies and recognises knowledge, and rebuild the terms of participation and evidence.'),
      explanation: text('课程批评把某些外来知识默认放在更高地位的做法。可以从课程材料、研究问题、语言及数据归属入手，问被研究者能否共同定义问题和检验结论。把不同知识连起来也需要保留来源和适用条件。', 'The course criticises automatically ranking some outside knowledge higher. Examine teaching materials, research questions, languages and data ownership. Ask whether people involved can help define the questions and test the results. Combining sources calls for preserving provenance and scope.'),
      examples: [
        example('共同设计水灾研究', 'Designing flood research together', '由当地居民标出历史积水点，再与地形、降雨和历年记录比较。居民参与解释结果并保有资料使用权。', 'Residents identify historical flood locations. Compare them with terrain, rainfall and records. Residents can help interpret results and control how their contributions are used.'),
        example('两种语言的分类', 'Classifications in two languages', '一种植物在册上只有单一外来分类。添加当地分类时，同时记录使用场景和当地人与研究者使用的不同判准。', 'A catalogue uses one outside classification for a plant. When adding local terms, record contexts and explain the criteria used by local experts and researchers.')
      ],
      misconception: text('加强本地参与可以提高研究质量。不同来源的主张仍要按各自证据与适用性检查。', 'Local participation can improve inquiry. Claims from different sources still need to be checked for evidence and scope.'),
      related: ['decolonisation', 'orientalism', 'local-wisdom', 'discourse-power']
    },
    {
      id: 'orientalism', kind: 'framework', source: [[8, 29, 30, 31], [7, 23, 24]],
      name: text('东方主义与西方主义', 'Orientalism and Occidentalism'), aliases: ['Edward Said', '萨义德', 'Occidentalism', '东方式想象', '西方研究'],
      intro: text('检查谁在描述“东方”或“西方”，用了什么分类，这些分类服务于什么关系。', 'Ask who represents “East” or “West”, what categories they use and what those categories do.'),
      explanation: text('课件借萨义德的东方主义分析表述与权力怎样联系，把多种地方经验塑造成固定的对象。西方主义在课件第 31 页涵盖研究、刻画乃至刻板印象等用法。先获取实际叙述与情境，再做比较。', 'The chapter uses Said’s Orientalism to examine how representation and power can turn diverse experiences into a fixed object. The term Occidentalism has several uses on p. 31, including study, representation and stereotyping. Identify the account and context before comparing them.'),
      examples: [
        example('旅游短片里的“永恒东方”', 'The “timeless East” in a travel film', '如果短片只拍仪式和古建筑，追问城市劳动、政治争论和普通居民在影片里有没有位置。', 'If a film shows only ceremonies and monuments, ask whether it includes work, political debate and ordinary residents.'),
        example('笼统的“西方人都一样”', 'An unvarying picture of “the West”', '并列不同地区、阶层和历史的材料，可以检验这种描述忽略了什么，避免用刻板印象回应另一种刻板印象。', 'Compare evidence across places, social groups and periods to find what a single picture misses and avoid answering one stereotype with another.')
      ],
      misconception: text('讨论跨文化表述时，要看观点、证据和历史关系。地理词汇本身不足以判断一个研究是否构成刻板化。', 'Judge cross-cultural writing by its claims, evidence and historical relations. Geographical language alone does not establish stereotyping.'),
      related: ['eurocentrism', 'epistemic-decolonisation', 'discourse-power']
    },
    {
      id: 'local-wisdom', kind: 'framework', source: [[6, 16], [8, 32, 33, 34, 35, 36, 37, 38, 39]],
      name: text('本土智慧与自身参照', 'Local wisdom and self-defined frameworks'), aliases: ['本地知识', 'Indigenous knowledge', 'Watan', 'own mould', '地方知识', '本土知识'],
      intro: text('理解一个地方由长期实践累积的知识，并让使用者参与判断怎样传承和调整。', 'Learn from knowledge developed in place over time and include its holders in decisions about transmission and change.'),
      explanation: text('课件将地方知识、身份和 Watan 联系，并以生态可持续与福祉检验自己的发展尺度。实践中先记录知识的来源、限制、传承与许可，再和可比较的观察或其他方法对证。建立自己的参照也可以通过对话跨地区学习。', 'The slides connect local knowledge, identity and Watan and judge development through sustainability and well-being. Record origins, conditions, transmission and permissions, then compare with other observations or methods. A self-defined framework can still learn across places.'),
      examples: [
        example('种植的季节指标', 'Seasonal signs for planting', '让有经验的人解释他们观察的云、河流和土壤条件，并将预测与实际收成及新气候资料比较。记录原来适用的范围。', 'Ask growers to explain the cloud, river and soil conditions they observe. Compare predictions with harvests and newer climate records, recording the conditions under which the signs worked.'),
        example('社区项目的成绩单', 'A community project scorecard', '除经济收入，还让居民选水质、可及性、文化场所和互助等指标，几年后共同检查变化。', 'Track income alongside measures residents choose, such as water quality, access, cultural spaces and mutual aid, then review changes together over time.')
      ],
      misconception: text('传承来源说明知识的来路。应用到新情境时，仍要确认社区意愿、适用条件和可用证据。', 'Transmission tells you where knowledge comes from. Applying it in a new setting still calls for community consent, conditions of use and evidence.'),
      related: ['sejahtera', 'revelation-tradition', 'epistemic-decolonisation', 'environmental-philosophy']
    },
    {
      id: 'egoism', kind: 'theory', source: [[8, 25, 26, 27, 35], [2, 17, 18]],
      name: text('利己主义', 'Egoism'), aliases: ['ethical egoism', 'psychological egoism', 'self-interest', '自利'],
      intro: text('分别检验“人总受自利驱动”和“人应优先自己的利益”。', 'Test separately whether people are always motivated by self-interest and whether they ought to prioritise it.'),
      explanation: text('心理利己主义是关于动机的描述，伦理利己主义给出应如何行动的原则。自利动机可以和同情、规范、责任等理由共同出现。第八章从环境与社会关系讨论狭窄自利，并以谦逊提出调整方式。', 'Psychological egoism makes a descriptive claim about motivation. Ethical egoism proposes a principle of action. Self-interest can occur alongside empathy, norms and duties. Chapter 8 discusses narrow self-interest in environmental and social relations and introduces humility as a response.'),
      examples: [
        example('默默帮助的动机', 'Helping without recognition', '某人匿名归还遗失物。若主张他只是为了自我满足，就要说明可观察到什么会区分自利与关心失主。', 'Someone returns a lost item anonymously. If the claim is that they only sought satisfaction, ask what would distinguish that from concern for the owner.'),
        example('共用地点的成本', 'Costs in a shared space', '独占公共座位使自己方便，却让别人失去机会。比较自利原则与公平原则各自怎么解释这一选择。', 'Taking an entire shared bench is convenient for one person and limits access for others. Compare what self-interest and fairness say about the choice.')
      ],
      misconception: text('照顾自己的需要可以是合理决定。把自利视作所有动机或所有义务，需要更强论证。', 'Looking after your own needs can be reasonable. Taking self-interest to be the basis of every motive or duty requires stronger arguments.'),
      related: ['applied-ethics', 'anthropocentrism', 'sejahtera']
    },
    {
      id: 'reductionism', kind: 'theory', source: [[5, 14, 15, 39], [7, 28, 41], [8, 24, 27]],
      name: text('还原论与解释层次', 'Reductionism and levels of explanation'), aliases: ['reduction', 'reductionism', 'explanatory levels', '还原主义'],
      intro: text('问高层现象能否用较基本的组成、规律或机制完整解释。', 'Ask whether higher-level phenomena can be fully explained by more basic components, laws or mechanisms.'),
      explanation: text('还原可以指研究方法，也可以是更强的理论主张，说高层现象完全可用较低层的规律解释。研究可以先分解部分取得证据，再检查结构、情境及互动是否仍提供独立的解释。', 'Reduction can be a method or a stronger claim that lower-level laws fully explain a higher-level phenomenon. A study can begin with components and then test whether organisation, context and interaction explain anything further.'),
      examples: [
        example('零件与乐器的音色', 'Parts and the sound of an instrument', '量出不同部件材料能解释部分声音。装配形状、演奏方式和环境仍可能改变结果，需要进一步测试。', 'Materials explain some aspects of an instrument’s sound. Assembly, playing technique and surrounding acoustics can also affect the result.'),
        example('解释小组合作', 'Explaining a team’s cooperation', '用个人能力解释一部分表现，同时测试工作分配、互信和反馈怎样改变组内结果。比较两种层次的解释是否互补。', 'Individual skill explains part of a team’s performance. Test how assigned roles, trust and feedback affect results to see whether levels of explanation complement each other.')
      ],
      misconception: text('分步骤或分部件研究是一种有用做法。主张整体现象完全可还原，需要另外说明已解释哪些关系。', 'Breaking a problem into parts can be useful. A full reduction additionally requires an account of the relations among those parts.'),
      related: ['mechanism', 'materialism', 'scientism', 'dualism']
    },
  ];

  window.INQUIRY_THEORIES = {items: items.map(({source, ...item}) => ({
    ...item,
    chapters: source.map(([chapter]) => chapter),
    references: source.flatMap(([chapter, ...pages]) => pages.map(page => ({chapter, page})))
  }))};
})();
