/* Purpose-built conceptual interactions. All scenarios are teaching examples. */
(() => {
  const E=x=>window.inquiryEscape(x);
  const pair=(zh,en)=>`<div class="pair"><div class="zh" lang="zh-CN">${E(zh)}</div><div class="en" lang="en">${E(en)}</div></div>`;
  const button=(key,zh,en,active=false)=>`<button data-action="viz" data-key="${key}" class="${active?'active':''}" aria-pressed="${active}">${E(zh)}<small lang="en">${E(en)}</small></button>`;
  const flow=nodes=>`<div class="flow">${nodes.map(([z,e],i)=>`${i?'<span class="flow-arrow" aria-hidden="true">→</span>':''}<div class="flow-node">${E(z)}<span lang="en">${E(e)}</span></div>`).join('')}</div>`;
  const sets={
    1:{title:['一个问题，通向哪门哲学？','Which branch does a question lead to?'],hint:['点击三条路径，展开它们关心的问题。','Choose a path to explore its central questions.'],options:[['theory','理论哲学','Theoretical'],['practice','实践哲学','Practical'],['emerging','新兴议题','Emerging']],items:{
      theory:['追问基础','Questions about foundations','形而上学追问“存在什么”；认识论追问“怎样知道”；逻辑学研究推理；价值论讨论什么值得追求。它们让日常判断的前提变得可见。','Metaphysics asks what exists; epistemology asks how we know; logic examines inference; axiology asks what is valuable. These fields make the foundations of everyday judgments visible.'],
      practice:['把问题带入共同生活','Questions for shared life','伦理学讨论应当如何行动；政治哲学讨论权力与正义；经济哲学讨论资源分配。一个公共政策问题往往同时牵涉多个分支。','Ethics considers how we should act; political philosophy examines power and justice; economic philosophy considers allocation. A public policy question often belongs to several branches.'],
      emerging:['把追问带到新处境','Questions for changing circumstances','技术、生态与组织哲学把基本问题带入新的现实：人工智能怎样改变人的选择？自然只有经济价值吗？组织为何存在？这些领域与传统分支相互联系。','Philosophy of technology, ecology and organisations applies fundamental questions to new circumstances: how does AI affect choice, is nature only an economic resource, and what are organisations for? These fields connect with established branches.']
    },source:'CH.1 · P13–16'},
    2:{title:['从生活问题，找到思想入口','From a daily dilemma to a philosophical question'],hint:['情境为补充教学例子，可同时涉及多个分支。','Supplementary examples may involve more than one branch.'],options:[['ai','校园人脸识别','Campus facial recognition'],['river','河流与水坝','A river and a dam'],['fair','如何分配名额','Allocating places']],items:{
      ai:['技术 × 伦理 × 政治','Technology × ethics × politics','提高便利与保障隐私，谁来权衡？技术哲学问工具如何改变生活；伦理学问同意与伤害；政治哲学问决策权、规则和监督。选中某一分支不意味着其他分支消失。','Who balances convenience against privacy? Philosophy of technology asks how tools reshape life; ethics examines consent and harm; political philosophy considers authority, rules and accountability. One lens does not exclude the others.'],
      river:['生态 × 经济 × 伦理','Ecology × economics × ethics','水坝可能提供能源，也可能影响生态与居民。生态哲学追问人和自然的关系；经济哲学考察利益如何分配；伦理学问谁承担代价，如何听见受影响者的声音。','A dam may supply energy while changing ecosystems and local lives. Ecological philosophy asks about humanity’s relation to nature; economic philosophy considers distribution; ethics asks who bears the costs and whose voices count.'],
      fair:['正义 × 组织 × 价值','Justice × organisation × value','有限的学习名额应按成绩、需要还是机会平等分配？先说明采用的标准，再检验理由是否一致。这是一个需要论证的选择，没有在这里预设唯一官方答案。','Should limited study places be allocated by attainment, need or equal opportunity? State the criterion, then examine whether the reasons are consistent. This requires argument; no single official answer is assumed here.']
    },source:'CH.2 · P15–23'},
    3:{title:['同样是推理，结论有多确定？','Different inferences, different kinds of support'],hint:['切换三种推理，沿着箭头读清前提与结论。','Switch methods and follow the premises to the conclusion.'],options:[['deduction','演绎','Deduction'],['induction','归纳','Induction'],['abduction','溯因','Abduction']],items:{
      deduction:['有效形式下的必然性','Necessity in a valid form',[['所有哺乳动物都用肺呼吸。','All mammals breathe with lungs.'],['鲸是哺乳动物。','Whales are mammals.'],['因此鲸用肺呼吸。','Therefore whales breathe with lungs.']],'如果形式有效且前提为真，结论不能为假。“有效”检查推理是否保真；“健全”还要求前提确实为真。这里使用预设例子，不评价任意输入的自然语言论证。','If the form is valid and the premises are true, the conclusion cannot be false. Validity concerns truth preservation; soundness also requires true premises. This is a preset illustration, not an evaluator of arbitrary language.'],
      induction:['从已观察，走向尚未观察','From observed to unobserved',[['观察到多只乌鸦。','Observe a number of crows.'],['这些乌鸦都是黑色。','Every observed crow is black.'],['推测其他乌鸦也可能是黑色。','Infer that other crows may also be black.']],'归纳的结论超出已观察样本，支持程度与样本范围和代表性有关。即使前提为真，概括仍可能遇到反例。增加观察不等于逻辑上的必然保证。','An induction goes beyond the observed sample. Its support depends on scope and representativeness. True observations may still lead to a generalisation with counterexamples; more observations do not create deductive necessity.'],
      abduction:['为观察寻找较好的解释','Seeking a good explanation',[['清晨看到地面湿了。','The ground is wet in the morning.'],['下雨可以解释这一现象。','Rain would explain the observation.'],['暂以“下过雨”为可能解释。','Tentatively infer that it rained.']],'“地面湿”也可能由洒水造成。溯因选择当前较好的解释，再寻求其他证据；它不是从结果唯一反推出原因。例子为补充教学情境。','A sprinkler could also explain wet ground. Abduction selects a currently promising explanation and seeks further evidence; the effect does not uniquely determine the cause. This is a supplementary teaching scenario.']
    },source:'CH.3 · P7–17；补充辨析见章末 / see clarifications'},
    5:{title:['同一把椅子，不同的存在解释','One chair, different accounts of reality'],hint:['这是概念对照，不是用按钮证明某种立场。','A comparison of positions, not a proof by button.'],options:[['material','唯物主义','Materialism'],['ideal','唯心主义','Idealism'],['domains','问题领域','Fields of inquiry']],items:{
      material:['把物质放在解释的基础','Matter as fundamental','这个视角把椅子的材料与物理过程作为解释基础，并尝试从物质活动理解感知与思想。不同唯物主义者并不共享所有具体主张；不能由这个本体论立场直接推出一个人的道德品质。','This view treats material constitution and physical processes as fundamental, and seeks to understand perception and thought through material activity. Materialists differ in detail; an ontological position does not by itself establish a person’s moral character.'],
      ideal:['追问心灵与经验的条件','Mind and the conditions of experience','“唯心主义”涵盖不同路线。贝克莱关注心灵与被感知的观念；康德关注经验如何被心灵的形式组织。不要把全部唯心主义压缩成“只要想象就能改变现实”。','Idealism covers different approaches. Berkeley focuses on minds and perceived ideas; Kant asks how the mind structures experience. It should not be reduced to the claim that imagining something changes physical reality.'],
      domains:['六个不同层次的问题','Six kinds of questions','本体论：什么存在？因果性：事件如何关联？宇宙论：宇宙的总体结构？宇宙起源论：宇宙如何起源？身心问题：心灵与身体是什么关系？自由意志与决定论：行动能否自由？','Ontology: what exists? Causality: how are events connected? Cosmology: what is the universe like as a whole? Cosmogony: how did it originate? Mind and body: how are they related? Free will and determinism: can action be free?']
    },source:'CH.5 · P8–19'},
    7:{title:['现代性、现代主义、现代化','Modernity, modernism, modernisation'],hint:['三个相近词，分别强调处境、思想和过程。','Similar words distinguish a condition, ideas and a process.'],options:[['condition','处境：现代性','Condition: modernity'],['ideas','思想：现代主义','Ideas: modernism'],['process','过程：现代化','Process: modernisation'],['post','后现代的追问','Postmodern questions']],items:{
      condition:['我们身处怎样的社会？','What kind of society do we inhabit?','现代性指一种社会历史处境。按课件的入门区分，可从城市、制度、科技与物质基础理解。它不是一个人“思想比较新潮”的简单标签。','Modernity names a social and historical condition. The slides introduce it through cities, institutions, technology and material foundations. It is not simply a label for someone with fashionable opinions.'],
      ideas:['我们如何理解进步与理性？','How do we think about progress and reason?','课件所说的现代主义强调理性、科学和人的能力。这是课程采用的思想史框架；“现代主义”在艺术等领域也有不同用法。对其优缺点的评价需要具体论证。','In the course framework, modernism emphasises reason, science and human capacities. The term has other uses in fields such as art. Evaluations of its strengths and weaknesses require specific arguments.'],
      process:['社会经历了怎样的变化？','What changes does a society undergo?','现代化强调从原有状态转向现代结构的过程，例如基础设施、行政组织和生产方式变化。描述一个变化过程，与认可其一切结果，是两件需要分别论证的事。','Modernisation emphasises a process of change, for example in infrastructure, administration and production. Describing a change and endorsing all its outcomes require separate arguments.'],
      post:['谁在定义知识与进步？','Who defines knowledge and progress?','课件的后现代主义单元关注宏大叙事、话语、权力与多重视角。它集合了不同思想家的观点，不能把“所有观点一样正确”当成所有后现代思想家的共同定论。','The course explores metanarratives, discourse, power and multiple perspectives. These involve different thinkers; “all views are equally correct” should not be treated as their universal shared conclusion.']
    },source:'CH.7 · P11–28；课程框架 / course framework'},
    8:{title:['去殖民化，发生在哪一层？','At what level does decolonisation happen?'],hint:['选择一个层面，比较政治独立与长期改变。','Choose a layer to distinguish independence from longer-term change.'],options:[['politics','01 政治与制度','Politics & institutions'],['knowledge','02 知识与尺度','Knowledge & standards'],['culture','03 文化与语言','Culture & language'],['ecology','04 人与自然','People & nature']],items:{
      politics:['独立是重要的制度转变','Independence is an institutional change','政治去殖民化涉及结束殖民统治、主权与制度变化。不同地区的历史、行动者和途径各不相同；正式独立后，国家建设与经济结构等问题仍会继续。','Political decolonisation concerns the end of colonial rule, sovereignty and institutions. Histories, actors and paths differ across regions; nation-building and economic questions may continue after formal independence.'],
      knowledge:['谁的知识被当作唯一尺度？','Whose knowledge is treated as the only standard?','课件要求检视欧洲中心主义与知识支配，也强调建立自己的参照框架。批判标准的权力来源，并不意味着可以免除事实核查、逻辑论证或对本土知识的反思。','The slides question Eurocentrism and the domination of knowledge, and call for locally grounded frames of reference. Examining the power behind standards does not remove the need for evidence, logic or reflection on local knowledge.'],
      culture:['语言、身份与地方智慧','Language, identity and local wisdom','文化与心理层面的去殖民化涉及语言地位、身份与自我理解。本土智慧可以成为重要资源，也需要在具体处境中检验其适用性。此处呈现课件的学习方向。','Cultural and psychological decolonisation concerns language, identity and self-understanding. Local wisdom can be a resource whose relevance should be examined in context. This reflects the course’s learning direction.'],
      ecology:['从支配，走向受托与共处','From domination to responsibility','课件通过 Sejahtera 与 khalifah 讨论人与自然的平衡关系。它把某些思想史路线与生态危机联系起来，这是需要分析的课程论证，并非由一个概念必然造成全部历史后果的证明。','The course uses Sejahtera and khalifah to discuss balanced relations with nature. Its proposed connections between intellectual history and ecological crises are arguments to examine, not proof that a single idea necessarily caused every historical outcome.']
    },source:'CH.8 · P4–5, 21–38'}
  };
  function regularOutput(id,key){const item=sets[id].items[key];if(id===3)return `<h4>${E(item[0])}<small class="muted" style="display:block;font-size:11px;margin-top:6px">${E(item[1])}</small></h4>${flow(item[2])}${pair(item[3],item[4])}`;return `<h4>${E(item[0])}<small class="muted" style="display:block;font-size:11px;margin-top:6px">${E(item[1])}</small></h4>${pair(item[2],item[3])}`;}
  function reasoning() {
    const model = sets[3];
    const nodes = model.options.map(([key, zh, en], index) => `
      ${index ? '<span class="reason-connector" aria-hidden="true">→</span>' : ''}
      ${button(key, zh, en, index === 0)}`).join('');
    return `<section class="viz-panel reasoning-model" data-viz-ch="3" aria-label="推理类型对照 / Compare reasoning methods">
      <div class="eyebrow">INTERACTIVE IDEAS / 推理类型对照</div>
      <h2 class="viz-title">${E(model.title[0])}<small lang="en">${E(model.title[1])}</small></h2>
      <p class="viz-hint">${E(model.hint[0])}<br><span lang="en">${E(model.hint[1])}</span></p>
      <div class="reason-nodes" data-selected="deduction">${nodes}</div>
      <div class="reason-output">
        <div class="viz-output" aria-live="polite">${regularOutput(3, 'deduction')}</div>
      </div>
      <div class="source-tag">${model.source}</div>
    </section>`;
  }
  function regular(id){const s=sets[id],first=s.options[0][0];return `<section class="viz-panel" data-viz-ch="${id}" aria-label="交互知识图解 / Interactive concept diagram"><div class="eyebrow">INTERACTIVE IDEAS / 点一下，想一步</div><h2 class="viz-title">${E(s.title[0])}<small lang="en">${E(s.title[1])}</small></h2><p class="viz-hint">${E(s.hint[0])}<br><span lang="en">${E(s.hint[1])}</span></p><div class="${id===8?'viz-columns':''}"><div class="viz-buttons ${id===8?'layer-buttons':''}">${s.options.map(([key,z,e],i)=>button(key,z,e,i===0)).join('')}</div><div class="viz-output" aria-live="polite">${regularOutput(id,first)}</div></div><div class="source-tag" style="margin-top:18px">${s.source}</div></section>`;}
  function pesi(){return `<section class="viz-panel" data-viz-ch="4"><div class="eyebrow">BALANCE IN PRACTICE / 把平衡带入生活</div><h2 class="viz-title">今天，给四个维度一点空间。<small>Make room for four dimensions of life.</small></h2><p class="viz-hint">拖动滑块，分配一次学习日的关注点。数值仅是个人反思，不是心理测评或健康分数。<br><span lang="en">Move the sliders to reflect on your attention. Values are personal prompts, not psychological or health scores.</span></p><div class="pesi-grid">${[['physical','身体','Physical'],['emotional','情绪','Emotional'],['spiritual','精神与灵性','Spiritual'],['intellectual','智力','Intellectual']].map(([key,z,e])=>`<div class="pesi-field"><label for="pesi-${key}"><span>${z} / ${e}</span><output id="out-${key}">3</output></label><input id="pesi-${key}" data-viz-input="pesi" data-key="${key}" type="range" min="1" max="5" value="3" aria-label="${z} / ${e}"></div>`).join('')}</div><div class="pesi-result" aria-hidden="true">${['physical','emotional','spiritual','intellectual'].map(k=>`<span class="pesi-bar" data-bar="${k}" style="height:60%"></span>`).join('')}</div><div class="viz-output" aria-live="polite">${pair('试着为每个维度写下一个可实践的小行动：走动、辨认情绪、反思价值、整理一个概念。四个维度并非互相隔绝。','Try a small action for each dimension: move your body, name an emotion, reflect on values, clarify a concept. These dimensions interact rather than existing in isolation.')}</div><div class="source-tag" style="margin-top:18px">PESI · CH.4 P25–30 / 补充反思练习 Supplementary reflection</div></section>`;}
  function jtb(){return `<section class="viz-panel jtb-model" data-viz-ch="6"><div class="eyebrow">BUILD A CONCEPT / 把条件拆开看</div><h2 class="viz-title">什么才算“知道”？<small>When do we say we know?</small></h2><p class="viz-hint">点选条件，检验课件采用的经典 JTB 模型。<br><span lang="en">Toggle conditions in the classical JTB model used in the slides.</span></p><div class="truth-toggles">${[['belief','我相信这个命题','I believe the proposition'],['truth','这个命题是真的','The proposition is true'],['justification','我有支持它的根据','I have justification']].map(([key,z,e])=>`<label><input type="checkbox" data-viz-input="jtb" data-key="${key}"><span>${z}</span><small lang="en">${e}</small></label>`).join('')}</div><div class="jtb-link" aria-hidden="true"></div><div class="jtb-core" data-jtb-count="0"><strong>知识</strong><small lang="en">KNOWLEDGE</small><span aria-hidden="true">0 / 3</span></div><div class="viz-result" aria-live="polite">${jtbResult(0)}</div><div class="viz-output">${pair('补充辨析：满足这三项并不自动解决“知识”的全部哲学问题；盖梯尔问题正是对该模型充分性的挑战。此交互只检查条件组合。','Clarification: meeting these conditions does not settle the philosophical analysis of knowledge. Gettier cases challenge their sufficiency. This interaction checks only the combination of conditions.')}<p style="margin-top:10px;font-size:10px"><a href="https://plato.stanford.edu/entries/knowledge-analysis/" target="_blank" rel="noopener noreferrer" style="text-decoration:underline">SEP · The Analysis of Knowledge ↗</a></p></div><div class="source-tag" style="margin-top:18px">CH.6 · P6–7 / 补充来源见链接 Supplementary source linked above</div></section>`;}
  function jtbResult(count) {
    return count === 3
      ? pair('三项都满足：符合经典“有根据的真信念”三条件。', 'All three conditions are met: the classical justified-true-belief requirements are satisfied.')
      : pair(`目前满足 ${count}/3 项。点选信念、真与证成，观察“知识”节点如何变化。`,
        `${count}/3 conditions met. Toggle belief, truth and justification to see how the knowledge node changes.`);
  }
  window.renderVisualization=id=>id===4?pesi():id===6?jtb():id===3?reasoning():sets[id]?regular(id):'';
  window.inquiryVizAction = button => {
    const panel = button.closest('.viz-panel');
    const id = Number(panel.dataset.vizCh);
    const key = button.dataset.key;
    if (!sets[id]?.items[key]) return;
    for (const control of panel.querySelectorAll('[data-action="viz"]')) {
      const active = control === button;
      control.classList.toggle('active', active);
      control.setAttribute('aria-pressed', String(active));
    }
    const nodes = panel.querySelector('.reason-nodes');
    if (nodes) nodes.dataset.selected = key;
    panel.querySelector('.viz-output').innerHTML = regularOutput(id, key);
  };
  window.inquiryVizInput = input => {
    const panel = input.closest('.viz-panel');
    if (input.dataset.vizInput === 'pesi') {
      panel.querySelector(`#out-${input.dataset.key}`).textContent = input.value;
      panel.querySelector(`[data-bar="${input.dataset.key}"]`).style.height = `${Number(input.value) * 20}%`;
    } else if (input.dataset.vizInput === 'jtb') {
      const selected = panel.querySelectorAll('input:checked').length;
      // 节点只呈现经典模型的条件组合。说明中的盖梯尔辨析保持可见。
      const core = panel.querySelector('.jtb-core');
      core.dataset.jtbCount = String(selected);
      core.querySelector('span').textContent = `${selected} / 3`;
      panel.querySelector('.viz-result').innerHTML = jtbResult(selected);
    }
  };
})();
