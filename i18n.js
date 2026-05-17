// daomar.dev shared i18n
// Lightweight: no framework. Translates [data-i18n], [data-i18n-attr-*],
// auto-detects browser language, persists choice, exposes window.applyI18n().

(function () {
  const DICT = {
    en: {
      'html.lang': 'en',
      'nav.vision': 'Vision',
      'nav.projects': 'Projects',
      'nav.pulse': 'Pulse',
      'nav.updates': 'Updates',
      'nav.faq': 'FAQ',
      'nav.sources': 'Sources',
      'nav.home': 'Home',

      'hero.eyebrow': 'An independent AI venture studio',
      'hero.title.a': 'Practical AI products,',
      'hero.title.b': 'shipped with care.',
      'hero.lede': 'daomar.dev incubates AI-native software for real workflows — from multi-device coding agents to small, delightful web utilities. We pick problems we use ourselves, then ship products that stay simple to understand, easy to operate, and honest about what they do.',
      'hero.cta.primary': 'See what we ship',
      'hero.cta.secondary': 'Latest updates',
      'hero.panel.title': 'What we believe',
      'hero.panel.body': 'The best AI products are not the loudest. They quietly fit into a workflow, respect user data, and earn their place by being genuinely useful — week after week.',

      'principles.title': 'How we build',
      'principles.lede': 'Three principles guide every product that ships under daomar.dev.',
      'principles.p1.title': 'Real workflows first',
      'principles.p1.body': 'We start from concrete pain — developers comparing AI agents, hosts running fair draws — not from abstract demos.',
      'principles.p2.title': 'Calm by default',
      'principles.p2.body': 'Clean surfaces, predictable behavior, minimal noise. The product should explain itself in seconds.',
      'principles.p3.title': 'Built to last',
      'principles.p3.body': 'Low-ops architectures, portable data, mobile-friendly UIs. We optimize for years, not launch week.',

      'projects.title': 'Currently shipping',
      'projects.lede': 'Two products in active development, each solving a real, narrow problem well.',
      'projects.agentfleet.tag': 'One prompt, every AI coding agent, every machine.',
      'projects.agentfleet.body': 'AgentFleet orchestrates AI coding agents across multiple devices. Send one prompt; let each enrolled machine run its local agent — Claude Code, Copilot CLI, Cursor, Aider — then compare the outputs side by side. No hosted backend, no SSH mesh, no control plane to babysit.',
      'projects.agentfleet.tag1': 'Developer tool',
      'projects.agentfleet.tag2': 'Local-first',
      'projects.agentfleet.b1': 'Compare Claude Code, Copilot CLI, Cursor, Aider and others on the same task.',
      'projects.agentfleet.b2': 'Sync prompts and results via OneDrive — no server, no SSH mesh.',
      'projects.agentfleet.b3': 'Use the CLI or the web dashboard, whichever fits your flow.',
      'projects.agentfleet.cta': 'Open the GitHub repo →',
      'projects.luckydraw.tag': 'Fair, fast, frictionless random draws.',
      'projects.luckydraw.body': 'Lucky Draw is a clean web app for fair random selection — giveaways, classroom picks, community gifts, conference raffles. Paste your candidates, draw a winner in one click, and trust the result.',
      'projects.luckydraw.tag1': 'Web app',
      'projects.luckydraw.tag2': 'Fair random',
      'projects.luckydraw.tag3': 'Mobile-ready',
      'projects.luckydraw.b1': 'Paste candidates, draw winners instantly — no setup, no signup.',
      'projects.luckydraw.b2': 'Transparent randomness, designed to feel fair to every participant.',
      'projects.luckydraw.b3': 'Repo is private; this page only summarizes public website content.',
      'projects.luckydraw.cta': 'Open Lucky Draw →',

      'pulse.title': 'The pulse',
      'pulse.lede': "A live feed of what's moving inside daomar.dev — refreshed daily from public repos and sites.",
      'pulse.empty': 'Loading the latest activity…',
      'pulse.fallback': 'Daily activity feed is being prepared. In the meantime, follow github.com/daomar-dev.',
      'pulse.more': 'See all updates →',

      'footer.faq': 'FAQ',
      'footer.updates': 'Updates',
      'footer.sources': 'Sources',

      // FAQ page
      'faq.page.title': 'FAQ — daomar.dev',
      'faq.h1': 'Questions, answered.',
      'faq.lede': 'Everything you might want to know about daomar.dev, its products, and how this site is kept fresh — for humans, search engines, and AI assistants.',

      // Updates page
      'updates.page.title': 'Updates — daomar.dev',
      'updates.h1': 'What changed, lately.',
      'updates.lede': 'A daily-refreshed log of public activity across daomar.dev projects: commits, releases, public site posts, and notable changes. Built automatically from public sources.',
      'updates.lastBuilt': 'Last refreshed',
      'updates.empty': 'No updates yet. The daily build will populate this page shortly.',
      'updates.byRepo': 'By project',
      'updates.recent': 'Recent activity',

      // Sources page
      'sources.page.title': 'Sources — daomar.dev',
      'sources.h1': 'Where this site gets its content.',
      'sources.lede': 'daomar.dev pulls from public, machine-readable sources so search engines and AI agents can verify and cite our work. This page is generated daily and refined live in your browser.',
    },
    zh: {
      'html.lang': 'zh-CN',
      'nav.vision': '愿景',
      'nav.projects': '产品',
      'nav.pulse': '动态',
      'nav.updates': '更新',
      'nav.faq': '常见问题',
      'nav.sources': '内容来源',
      'nav.home': '首页',

      'hero.eyebrow': '一家独立的 AI 创业工作室',
      'hero.title.a': '把 AI 做成',
      'hero.title.b': '真正有用的产品。',
      'hero.lede': 'daomar.dev 孵化贴近真实工作流的 AI 原生应用——从多设备 AI 编程代理，到小而美的 Web 工具。我们只做自己也会用的产品：简单易懂、便于运维，把"AI"放进静悄悄、靠得住的体验里。',
      'hero.cta.primary': '看看我们的产品',
      'hero.cta.secondary': '最新动态',
      'hero.panel.title': '我们相信',
      'hero.panel.body': '最好的 AI 产品并不喧哗。它安静地嵌入工作流，尊重用户数据，靠"周复一周都好用"赢得位置。',

      'principles.title': '我们怎么做产品',
      'principles.lede': 'daomar.dev 旗下每一款产品都遵循这三条原则。',
      'principles.p1.title': '真实场景优先',
      'principles.p1.body': '从具体痛点出发——开发者要对比 AI 代理、主办方要做公平抽奖——而不是从抽象 Demo 出发。',
      'principles.p2.title': '默认从容',
      'principles.p2.body': '界面干净、行为可预期、信息密度克制。产品应该几秒钟就能说清自己是干嘛的。',
      'principles.p3.title': '为长期设计',
      'principles.p3.body': '低运维架构、可迁移的数据、移动端友好。我们为"用很多年"做优化，而不是为"上线那一周"。',

      'projects.title': '当前在做的产品',
      'projects.lede': '两款正在积极开发的产品，各自把一个细分问题做透。',
      'projects.agentfleet.tag': '一条 prompt，跑遍所有 AI 编程代理与设备。',
      'projects.agentfleet.body': 'AgentFleet 让多台设备围绕同一条 prompt 各自运行本地 AI 编程代理——Claude Code、Copilot CLI、Cursor、Aider 等——然后把结果摆在一起对比。没有托管后端、没有 SSH mesh、没有需要伺候的控制平面。',
      'projects.agentfleet.tag1': '开发者工具',
      'projects.agentfleet.tag2': '本地优先',
      'projects.agentfleet.b1': '在同一任务上对比 Claude Code、Copilot CLI、Cursor、Aider 等代理的输出。',
      'projects.agentfleet.b2': '通过 OneDrive 同步 prompt 与结果，不需要服务器或 SSH mesh。',
      'projects.agentfleet.b3': '命令行和 Web Dashboard 都能用，按你的习惯来。',
      'projects.agentfleet.cta': '查看 GitHub 仓库 →',
      'projects.luckydraw.tag': '公平、快、零门槛的随机抽取。',
      'projects.luckydraw.body': 'Lucky Draw 是一款简洁的随机抽选 Web 应用——适合抽奖、课堂点名、社群送礼、活动抽签。粘贴候选名单，一键抽取，结果公开透明。',
      'projects.luckydraw.tag1': 'Web 应用',
      'projects.luckydraw.tag2': '公平随机',
      'projects.luckydraw.tag3': '移动友好',
      'projects.luckydraw.b1': '粘贴名单即可抽奖，无需注册、无需配置。',
      'projects.luckydraw.b2': '随机过程透明，让每位参与者都觉得公平。',
      'projects.luckydraw.b3': '仓库未公开，本页仅展示公开网页可见信息。',
      'projects.luckydraw.cta': '打开 Lucky Draw →',

      'pulse.title': '最近动态',
      'pulse.lede': 'daomar.dev 旗下的实时活动，每天从公开仓库与公开网站自动汇总一次。',
      'pulse.empty': '正在加载最近动态……',
      'pulse.fallback': '每日动态正在准备中。在此期间，可关注 github.com/daomar-dev。',
      'pulse.more': '查看全部更新 →',

      'footer.faq': '常见问题',
      'footer.updates': '更新',
      'footer.sources': '来源',

      'faq.page.title': '常见问题 — daomar.dev',
      'faq.h1': '常见问题，逐个解答。',
      'faq.lede': '关于 daomar.dev、旗下产品，以及本站如何保持每日更新——为人、为搜索引擎、也为 AI 助手准备的回答。',

      'updates.page.title': '更新日志 — daomar.dev',
      'updates.h1': '最近发生了什么。',
      'updates.lede': 'daomar.dev 旗下项目的公开活动每日合并：commits、release、公开网站文章、值得关注的变更。全部由公开来源自动构建。',
      'updates.lastBuilt': '最近更新于',
      'updates.empty': '暂无更新，每日构建任务很快会写入数据。',
      'updates.byRepo': '按项目',
      'updates.recent': '近期动态',

      'sources.page.title': '内容来源 — daomar.dev',
      'sources.h1': '本站的内容从哪里来。',
      'sources.lede': 'daomar.dev 从公开、可被机器阅读的来源汇总内容，便于搜索引擎和 AI 代理验证并引用我们的工作。本页每日自动生成，并在浏览器中实时补充。',
    },
  };

  const FAQ_DATA = [
    {
      q: { en: 'What is daomar.dev?', zh: 'daomar.dev 是什么？' },
      a: {
        en: 'daomar.dev is an independent AI venture studio. It incubates practical, AI-native products — currently AgentFleet (multi-device AI coding agent orchestration) and Lucky Draw (fair online random draws). The brand is intentionally lowercase.',
        zh: 'daomar.dev 是一家独立的 AI 创业工作室，专注孵化贴近真实场景的 AI 原生产品。目前的产品包括 AgentFleet（多设备 AI 编程代理编排）和 Lucky Draw（公平在线抽奖）。品牌名固定使用小写。',
      },
    },
    {
      q: { en: 'Why is the brand always written in lowercase?', zh: '为什么品牌名总是用小写？' },
      a: {
        en: 'daomar.dev is a developer-first brand. Lowercase mirrors the way URLs, package names, and CLI tools are written — quiet, precise, and consistent across every surface.',
        zh: 'daomar.dev 是一个面向开发者的品牌。小写写法贴近 URL、包名、CLI 工具的习惯——安静、精确，并在所有场景下保持一致。',
      },
    },
    {
      q: { en: 'What products is daomar.dev currently shipping?', zh: 'daomar.dev 目前在做哪些产品？' },
      a: {
        en: 'Two: AgentFleet, an open-source tool that orchestrates AI coding agents across multiple machines without a hosted backend; and Lucky Draw, a clean web app for fair random draws.',
        zh: '两款：AgentFleet 是一个开源的多设备 AI 编程代理编排工具，无需托管后端；Lucky Draw 是一个简洁的公平随机抽选 Web 应用。',
      },
    },
    {
      q: { en: 'What problem does AgentFleet solve?', zh: 'AgentFleet 解决什么问题？' },
      a: {
        en: 'AI coding agents — Claude Code, Copilot CLI, Cursor, Aider — each have strengths. AgentFleet lets you send one prompt to many machines, let each one run its local agent, and compare results side by side. No SSH mesh, no servers, no control plane.',
        zh: '不同的 AI 编程代理——Claude Code、Copilot CLI、Cursor、Aider——各有特点。AgentFleet 让你把同一条 prompt 发给多台设备，每台机器用本地代理执行任务，再把结果集中对比。无需 SSH mesh、无需服务器、无需控制平面。',
      },
    },
    {
      q: { en: 'What is Lucky Draw and who is it for?', zh: 'Lucky Draw 是什么？给谁用？' },
      a: {
        en: 'Lucky Draw is a web app for fair, transparent random selection — giveaways, classroom picks, conference raffles, community gifts. Paste your candidates, draw a winner in one click. The repository is private; only the public web app and content are referenced here.',
        zh: 'Lucky Draw 是一个用于公平、透明随机抽选的 Web 应用——适合抽奖、课堂点名、活动抽签、社群送礼。粘贴候选名单，一键抽取结果。仓库未公开，本站仅引用 Lucky Draw 公开网站上的内容。',
      },
    },
    {
      q: { en: 'How does daomar.dev keep content fresh?', zh: 'daomar.dev 的内容如何保持新鲜？' },
      a: {
        en: 'A daily GitHub Actions workflow queries the public github.com/daomar-dev org — README, releases, recent commits — and pulls public feeds (sitemap, llms.txt, RSS) from sites such as luckydraw.daomar.dev. The output is committed back as JSON and rendered on the Updates and Sources pages.',
        zh: '一个每日运行的 GitHub Actions 工作流会查询公开的 github.com/daomar-dev 组织——README、release、最近的 commits——并抓取 luckydraw.daomar.dev 等站点的公开 feed（sitemap、llms.txt、RSS）。结果以 JSON 形式提交回仓库，供"更新"和"来源"页面渲染。',
      },
    },
    {
      q: { en: 'What SEO and GEO optimizations does this site use?', zh: '本站做了哪些 SEO 和 GEO 优化？' },
      a: {
        en: 'Semantic HTML; descriptive titles and meta descriptions; hreflang for English and Simplified Chinese; canonical URLs; Open Graph and Twitter cards; Organization, WebSite, SoftwareApplication, FAQPage JSON-LD; sitemap.xml; robots.txt; a curated llms.txt; a JSON feed (/data/updates.json) discoverable via <link rel="alternate">; and daily-refreshed content so search engines and AI assistants see signs of life.',
        zh: '语义化 HTML；精准的 title 与 description；为英语和简体中文配置 hreflang；canonical URL；Open Graph 与 Twitter Card；Organization、WebSite、SoftwareApplication、FAQPage 的 JSON-LD；sitemap.xml；robots.txt；专门撰写的 llms.txt；通过 <link rel="alternate"> 暴露的 JSON feed（/data/updates.json）；以及每日自动刷新的内容，让搜索引擎和 AI 助手能持续看到站点活跃度。',
      },
    },
    {
      q: { en: 'Does daomar.dev support both English and Simplified Chinese?', zh: 'daomar.dev 支持双语吗？' },
      a: {
        en: 'Yes. The site detects your browser language on first visit (English or 简体中文) and remembers your choice. Both languages live on the same URLs to keep things simple, while hreflang signals each variant to search engines.',
        zh: '是的。首次访问时会根据浏览器语言（英语或简体中文）自动选择语言，并记住你的选择。两种语言共用同一组 URL 以保持简洁，并通过 hreflang 把每个语言版本告知搜索引擎。',
      },
    },
    {
      q: { en: 'How can AI assistants cite daomar.dev?', zh: 'AI 助手该如何引用 daomar.dev？' },
      a: {
        en: 'Use https://daomar.dev/ as the canonical homepage, /llms.txt for a curated summary, /data/updates.json as a machine-readable feed, and /sources.html as the manifest of public sources. AgentFleet lives at github.com/daomar-dev/agentfleet; Lucky Draw at luckydraw.daomar.dev.',
        zh: '请使用 https://daomar.dev/ 作为规范主页，/llms.txt 提供精炼摘要，/data/updates.json 提供机器可读的数据流，/sources.html 列出公开来源清单。AgentFleet 位于 github.com/daomar-dev/agentfleet；Lucky Draw 位于 luckydraw.daomar.dev。',
      },
    },
    {
      q: { en: 'Is there a way to follow updates?', zh: '怎样持续关注更新？' },
      a: {
        en: 'Follow github.com/daomar-dev for code and releases, watch the Updates page on this site, or subscribe programmatically to /data/updates.json (linked from the homepage as a JSON alternate).',
        zh: '关注 github.com/daomar-dev 获取代码与版本发布；定期访问本站的"更新"页面；或者通过程序订阅 /data/updates.json（主页已用 JSON alternate 暴露）。',
      },
    },
  ];

  function detectLang() {
    const saved = (() => { try { return localStorage.getItem('daomar.lang'); } catch (_) { return null; } })();
    if (saved === 'en' || saved === 'zh') return saved;
    const params = new URLSearchParams(location.search);
    const qp = params.get('lang');
    if (qp === 'en' || qp === 'zh') return qp;
    const nav = (navigator.language || 'en').toLowerCase();
    return nav.startsWith('zh') ? 'zh' : 'en';
  }

  let current = detectLang();

  function t(key) {
    return (DICT[current] && DICT[current][key]) || (DICT.en && DICT.en[key]) || key;
  }

  function applyI18n() {
    document.documentElement.lang = t('html.lang');
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = t(key);
      // Preserve inner HTML if the source contains tags? Keep simple: setText.
      el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      el.innerHTML = t(key);
    });
    // Attribute translations: data-i18n-attr="title:key,placeholder:key"
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const pairs = el.getAttribute('data-i18n-attr').split(',');
      pairs.forEach((p) => {
        const [attr, key] = p.split(':').map((s) => s.trim());
        if (attr && key) el.setAttribute(attr, t(key));
      });
    });
    // Title tag
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) document.title = t(titleEl.getAttribute('data-i18n'));
    // Lang toggle buttons
    document.querySelectorAll('.lang-toggle button[data-lang]').forEach((btn) => {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === current ? 'true' : 'false');
    });
    // Notify listeners (FAQ renderer etc.)
    document.dispatchEvent(new CustomEvent('daomar:i18n', { detail: { lang: current } }));
  }

  function setLang(lang) {
    if (lang !== 'en' && lang !== 'zh') return;
    current = lang;
    try { localStorage.setItem('daomar.lang', lang); } catch (_) {}
    applyI18n();
  }

  function bindToggles() {
    document.querySelectorAll('.lang-toggle button[data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
    });
  }

  function init() {
    applyI18n();
    bindToggles();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  window.daomarI18n = {
    get lang() { return current; },
    set: setLang,
    t,
    apply: applyI18n,
    faq: FAQ_DATA,
  };
  window.applyI18n = applyI18n;
})();
