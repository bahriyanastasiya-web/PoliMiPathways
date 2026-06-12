export interface LearningResource {
  type: "course" | "book" | "video" | "platform" | "article" | "mooc";
  title: string;
  source: string;
  url: string;
}

export interface SkillResources {
  resources: LearningResource[];
  tip: string;
}

const RESOURCE_MAP: Array<{ keywords: string[]; data: SkillResources }> = [
  {
    keywords: ["figma"],
    data: {
      tip: "Start with Figma's own learning path, then move to community files to study how professionals structure components.",
      resources: [
        { type: "platform", title: "Figma Learn — official tutorials & courses", source: "Figma", url: "https://help.figma.com/hc/en-us/categories/360002051613" },
        { type: "course", title: "UI Design with Figma", source: "Coursera / CalArts", url: "https://www.coursera.org/learn/ui-design" },
        { type: "video", title: "Figma YouTube channel — tips, features, best practices", source: "YouTube / Figma", url: "https://www.youtube.com/@Figma" },
      ],
    },
  },
  {
    keywords: ["framer"],
    data: {
      tip: "Framer is best learned by remixing existing community templates and reverse-engineering interactions.",
      resources: [
        { type: "platform", title: "Framer Academy — official course library", source: "Framer", url: "https://www.framer.com/academy" },
        { type: "video", title: "Framer crash course & advanced interactions", source: "YouTube / Framer", url: "https://www.youtube.com/@Framer" },
        { type: "platform", title: "Framer Community templates", source: "Framer", url: "https://www.framer.com/community" },
      ],
    },
  },
  {
    keywords: ["webflow"],
    data: {
      tip: "Complete Webflow University's full curriculum — it's free and one of the best no-code design educations available.",
      resources: [
        { type: "platform", title: "Webflow University — full curriculum", source: "Webflow", url: "https://university.webflow.com" },
        { type: "video", title: "Webflow tips and builds", source: "YouTube / Webflow", url: "https://www.youtube.com/@Webflow" },
        { type: "platform", title: "Webflow showcase — study real sites", source: "Webflow", url: "https://webflow.com/made-in-webflow" },
      ],
    },
  },
  {
    keywords: ["design system", "component library", "token", "design token", "component api"],
    data: {
      tip: "Build a small system from scratch before joining an existing one — you'll understand every trade-off much better.",
      resources: [
        { type: "article", title: "Design Systems — the comprehensive guide", source: "Smashing Magazine", url: "https://www.smashingmagazine.com/design-systems-book/" },
        { type: "platform", title: "Storybook docs — the industry standard for component documentation", source: "Storybook", url: "https://storybook.js.org/docs" },
        { type: "platform", title: "Design Systems Repo — curated real-world systems", source: "design.systems", url: "https://designsystems.surf" },
      ],
    },
  },
  {
    keywords: ["usability test", "moderated", "unmoderated", "think-aloud", "task metric"],
    data: {
      tip: "Run at least 5 sessions before analysing — patterns only emerge with repetition. Always pilot-test your script.",
      resources: [
        { type: "course", title: "Usability Testing — IxDF full course", source: "Interaction Design Foundation", url: "https://www.interaction-design.org/courses/conducting-usability-testing" },
        { type: "book", title: "Rocket Surgery Made Easy — Steve Krug", source: "Book", url: "https://www.goodreads.com/book/show/6487786-rocket-surgery-made-easy" },
        { type: "article", title: "User Testing: A Practical Guide — NNGroup", source: "Nielsen Norman Group", url: "https://www.nngroup.com/articles/ux-research-cheat-sheet/" },
      ],
    },
  },
  {
    keywords: ["user research", "ux research", "contextual inquiry", "diary study", "ethnograph", "qualitative interview", "semi-structured", "in-depth interview", "research method"],
    data: {
      tip: "The Mom Test by Rob Fitzpatrick is a fast read that will immediately improve every user interview you run.",
      resources: [
        { type: "course", title: "User Research Methods and Best Practices", source: "Interaction Design Foundation", url: "https://www.interaction-design.org/courses/user-research-methods-and-best-practices" },
        { type: "book", title: "Just Enough Research — Erika Hall", source: "Book", url: "https://www.goodreads.com/book/show/17236175-just-enough-research" },
        { type: "article", title: "UX Research Cheat Sheet", source: "Nielsen Norman Group", url: "https://www.nngroup.com/articles/ux-research-cheat-sheet/" },
      ],
    },
  },
  {
    keywords: ["survey", "questionnaire", "screener", "sus", "umux", "nps"],
    data: {
      tip: "Use validated scales (SUS, UMUX-Lite) rather than writing your own — they're benchmarkable and psychometrically tested.",
      resources: [
        { type: "article", title: "Survey Design Guidelines", source: "Nielsen Norman Group", url: "https://www.nngroup.com/articles/keep-online-surveys-short/" },
        { type: "course", title: "Conducting Surveys and Questionnaires", source: "Interaction Design Foundation", url: "https://www.interaction-design.org/courses/conducting-your-first-interview-with-users" },
        { type: "book", title: "Quantifying the User Experience — Sauro & Lewis", source: "Book", url: "https://www.goodreads.com/book/show/11730009-quantifying-the-user-experience" },
      ],
    },
  },
  {
    keywords: ["journey map", "service blueprint", "customer journey", "experience map", "touchpoint"],
    data: {
      tip: "Always co-create journey maps with actual customers — a map built only from internal assumptions misses 60% of reality.",
      resources: [
        { type: "article", title: "Journey Mapping 101", source: "Nielsen Norman Group", url: "https://www.nngroup.com/articles/journey-mapping-101/" },
        { type: "course", title: "Service Design: From Insight to Implementation", source: "Interaction Design Foundation", url: "https://www.interaction-design.org/courses/service-design-from-insight-to-implementation" },
        { type: "book", title: "This is Service Design Doing — Stickdorn et al.", source: "Book", url: "https://www.goodreads.com/book/show/32493607-this-is-service-design-doing" },
      ],
    },
  },
  {
    keywords: ["service design", "service prototype", "service blueprinting", "wizard-of-oz", "desktop walkthrough"],
    data: {
      tip: "Service design is learned by doing. Join the Service Design Network community for access to real case studies.",
      resources: [
        { type: "platform", title: "Service Design Network — global community & resources", source: "SDN", url: "https://www.service-design-network.org" },
        { type: "book", title: "This is Service Design Thinking — Stickdorn & Schneider", source: "Book", url: "https://www.goodreads.com/book/show/13236552-this-is-service-design-thinking" },
        { type: "course", title: "Service Design — IxDF full course", source: "Interaction Design Foundation", url: "https://www.interaction-design.org/courses/service-design-from-insight-to-implementation" },
      ],
    },
  },
  {
    keywords: ["information architecture", "sitemap", "card sort", "tree test", "navigation design"],
    data: {
      tip: "Card sorting reveals your users' mental model, not yours. Always run it before finalising navigation structure.",
      resources: [
        { type: "book", title: "Information Architecture for the World Wide Web — Morville & Rosenfeld", source: "Book", url: "https://www.goodreads.com/book/show/70132.Information_Architecture_for_the_World_Wide_Web" },
        { type: "course", title: "Information Architecture — IxDF course", source: "Interaction Design Foundation", url: "https://www.interaction-design.org/courses/information-architecture-the-basics" },
        { type: "platform", title: "Optimal Workshop — card sorting & tree testing tool", source: "Optimal Workshop", url: "https://www.optimalworkshop.com" },
      ],
    },
  },
  {
    keywords: ["accessibility", "wcag", "aria", "screen reader", "a11y", "european accessibility"],
    data: {
      tip: "Use a screen reader yourself for 30 minutes on your own product — it will change how you design forever.",
      resources: [
        { type: "platform", title: "The A11Y Project — practical accessibility checklist", source: "A11Y Project", url: "https://www.a11yproject.com" },
        { type: "article", title: "Accessibility fundamentals — Google web.dev", source: "web.dev / Google", url: "https://web.dev/accessibility" },
        { type: "course", title: "Accessibility of Web Design — IxDF course", source: "Interaction Design Foundation", url: "https://www.interaction-design.org/courses/accessibility-how-to-design-for-all" },
      ],
    },
  },
  {
    keywords: ["typography", "type", "editorial type", "variable font", "web typography"],
    data: {
      tip: "Set a reading text at body size before anything else — if it's unreadable, your hierarchy decisions are built on sand.",
      resources: [
        { type: "platform", title: "Practical Typography — Matthew Butterick", source: "Practical Typography", url: "https://practicaltypography.com" },
        { type: "book", title: "Thinking With Type — Ellen Lupton", source: "Book", url: "https://www.goodreads.com/book/show/69736.Thinking_with_Type" },
        { type: "platform", title: "Google Fonts Knowledge — type fundamentals", source: "Google Fonts", url: "https://fonts.google.com/knowledge" },
      ],
    },
  },
  {
    keywords: ["color", "colour", "cmf", "colorway", "pantone", "ral", "ncs", "color management"],
    data: {
      tip: "Spend time with physical Pantone swatches early — screen-to-print colour shifts can completely change a design outcome.",
      resources: [
        { type: "course", title: "Color Theory for Designers", source: "Interaction Design Foundation", url: "https://www.interaction-design.org/courses/the-basics-of-user-experience-design" },
        { type: "book", title: "Interaction of Color — Josef Albers", source: "Book", url: "https://www.goodreads.com/book/show/111113.Interaction_of_Color" },
        { type: "platform", title: "Pantone Color Institute — colour education resources", source: "Pantone", url: "https://www.pantone.com/color-intelligence/color-education" },
      ],
    },
  },
  {
    keywords: ["brand strategy", "brand positioning", "brand architect", "brand audit", "distinctive brand", "verbal identity", "brand guideline"],
    data: {
      tip: "Brand strategy is always upstream of visual identity — understand the business model before touching aesthetics.",
      resources: [
        { type: "book", title: "Building a StoryBrand — Donald Miller", source: "Book", url: "https://www.goodreads.com/book/show/34460583-building-a-storybrand" },
        { type: "course", title: "Brand Identity Design — Coursera / CalArts", source: "Coursera", url: "https://www.coursera.org/learn/brand-identity-design" },
        { type: "platform", title: "Distinctive brand assets research — Jenni Romaniuk / Ehrenberg-Bass", source: "Marketing Science", url: "https://www.marketingscience.info" },
      ],
    },
  },
  {
    keywords: ["logo", "visual identity", "identity system"],
    data: {
      tip: "Design the mark last — start with brand strategy, tone of voice and values, then let the visual form follow.",
      resources: [
        { type: "video", title: "Identity design process videos — The Futur", source: "YouTube / The Futur", url: "https://www.youtube.com/@thefutur" },
        { type: "book", title: "Logo Design Love — David Airey", source: "Book", url: "https://www.goodreads.com/book/show/6814191-logo-design-love" },
        { type: "platform", title: "Brand New — identity design criticism & inspiration", source: "UnderConsideration", url: "https://www.underconsideration.com/brandnew/" },
      ],
    },
  },
  {
    keywords: ["data visualization", "data viz", "d3.js", "d3 ", "chart", "visual encoding", "dataset visualization", "decision-grade", "data journalism", "information visualization"],
    data: {
      tip: "Memorise the Visual Encoding Effectiveness hierarchy — position > length > area > colour > angle. It will fix 90% of bad charts.",
      resources: [
        { type: "book", title: "The Functional Art — Alberto Cairo", source: "Book", url: "https://www.goodreads.com/book/show/13647847-the-functional-art" },
        { type: "platform", title: "Observable — D3.js notebooks and learning community", source: "Observable", url: "https://observablehq.com" },
        { type: "course", title: "Information Visualization — IxDF course", source: "Interaction Design Foundation", url: "https://www.interaction-design.org/courses/information-visualization" },
      ],
    },
  },
  {
    keywords: ["motion", "animation", "after effects", "lottie", "easing", "timing", "2d motion", "3d motion", "animated"],
    data: {
      tip: "Study Disney's 12 principles of animation — they apply just as much to UI transitions as to character work.",
      resources: [
        { type: "video", title: "Motion design tutorials — School of Motion", source: "School of Motion", url: "https://www.schoolofmotion.com/blog" },
        { type: "course", title: "Animation for Interface Designers — IxDF", source: "Interaction Design Foundation", url: "https://www.interaction-design.org/courses/web-design-for-usability" },
        { type: "book", title: "The Animator's Survival Kit — Richard Williams", source: "Book", url: "https://www.goodreads.com/book/show/101571.The_Animator_s_Survival_Kit" },
      ],
    },
  },
  {
    keywords: ["illustration", "vector illustration", "character design", "conceptual illustration", "sequential storytelling", "digital illustration"],
    data: {
      tip: "Keep a daily sketchbook — your illustration style develops through volume, not through studying others' work alone.",
      resources: [
        { type: "video", title: "Illustration process & tutorials — Proko", source: "YouTube / Proko", url: "https://www.youtube.com/@ProkoTV" },
        { type: "course", title: "Graphic Design Specialization", source: "Coursera / CalArts", url: "https://www.coursera.org/specializations/graphic-design" },
        { type: "platform", title: "Skillshare illustration classes", source: "Skillshare", url: "https://www.skillshare.com/en/browse/illustration" },
      ],
    },
  },
  {
    keywords: ["3d ", "3d asset", "3d motion", "3d garment", "3d pack", "blender", "rhino", "3ds max", "cinema 4d", "rendering", "render", "pbr", "photorealistic", "look development", "archviz", "interior render"],
    data: {
      tip: "Lighting is more important than modelling — a simple model with good lighting always beats a complex model badly lit.",
      resources: [
        { type: "platform", title: "Blender tutorials — Blender Guru (Andrew Price)", source: "YouTube / Blender Guru", url: "https://www.youtube.com/@blenderguru" },
        { type: "mooc", title: "3D Design & Visualization — Polimi POK", source: "Polimi POK", url: "https://pok.polimi.it" },
        { type: "platform", title: "CGCookie — structured Blender learning paths", source: "CGCookie", url: "https://cgcookie.com" },
      ],
    },
  },
  {
    keywords: ["grasshopper", "parametric", "generative design", "computational", "rhino", "scripting", "creative coding", "data-driven geometry"],
    data: {
      tip: "Start with 'The Grasshopper Primer' (free PDF) before any video courses — the mental model matters more than the software.",
      resources: [
        { type: "platform", title: "Mode Lab — Grasshopper learning resources", source: "Mode Lab", url: "https://modelab.is/grasshopper-primer/" },
        { type: "video", title: "Parametric design tutorials — Parametric Architecture", source: "YouTube / Parametric Architecture", url: "https://www.youtube.com/@parametricarchitecture" },
        { type: "platform", title: "p5.js — creative coding for designers", source: "p5.js", url: "https://p5js.org/learn/" },
      ],
    },
  },
  {
    keywords: ["css", "html", "web animation", "front-end", "frontend", "modern css", "responsive", "react", "typescript", "component development"],
    data: {
      tip: "CSS is best learned by breaking and fixing layout — use browser DevTools as your primary classroom.",
      resources: [
        { type: "platform", title: "CSS Tricks — the essential CSS reference", source: "CSS-Tricks", url: "https://css-tricks.com" },
        { type: "platform", title: "MDN Web Docs — authoritative HTML/CSS/JS reference", source: "MDN / Mozilla", url: "https://developer.mozilla.org/en-US/docs/Learn" },
        { type: "course", title: "The Odin Project — free full-stack web dev curriculum", source: "The Odin Project", url: "https://www.theodinproject.com" },
      ],
    },
  },
  {
    keywords: ["sql", "analytics", "funnel", "cohort", "retention", "product analytics", "event taxonomy", "a/b test"],
    data: {
      tip: "Learn SQL before any BI tool — every analytics platform is just SQL with a GUI on top.",
      resources: [
        { type: "platform", title: "Mode Analytics SQL Tutorial — hands-on practice", source: "Mode", url: "https://mode.com/sql-tutorial/" },
        { type: "course", title: "Google Data Analytics Professional Certificate", source: "Coursera", url: "https://www.coursera.org/professional-certificates/google-data-analytics" },
        { type: "book", title: "Lean Analytics — Croll & Yoskovitz", source: "Book", url: "https://www.goodreads.com/book/show/16033602-lean-analytics" },
      ],
    },
  },
  {
    keywords: ["behavioral", "behaviour", "nudge", "habit", "com-b", "fogg", "mindspace", "intervention", "default"],
    data: {
      tip: "Ethical behavioural design starts with 'autonomy preservation' — always ask whether the nudge serves the user or the business.",
      resources: [
        { type: "book", title: "Nudge — Thaler & Sunstein", source: "Book", url: "https://www.goodreads.com/book/show/3450744-nudge" },
        { type: "book", title: "Hooked — Nir Eyal", source: "Book", url: "https://www.goodreads.com/book/show/22668729-hooked" },
        { type: "article", title: "Behavioral design toolkit — ideas42", source: "ideas42", url: "https://www.ideas42.org/blog/project/ideas42-behavioral-design-toolkit/" },
      ],
    },
  },
  {
    keywords: ["business model", "unit economics", "ltv", "cac", "p&l", "pricing", "market sizing", "tam", "venture"],
    data: {
      tip: "The Business Model Canvas is a starting framework, not an answer — test every assumption in it as early as possible.",
      resources: [
        { type: "book", title: "Business Model Generation — Osterwalder & Pigneur", source: "Book", url: "https://www.goodreads.com/book/show/7723797-business-model-generation" },
        { type: "mooc", title: "Business Model Innovation — Polimi POK", source: "Polimi POK", url: "https://pok.polimi.it" },
        { type: "course", title: "Entrepreneurship Specialization", source: "Coursera / Wharton", url: "https://www.coursera.org/specializations/wharton-entrepreneurship" },
      ],
    },
  },
  {
    keywords: ["product strategy", "roadmap", "prioritization", "rice", "north-star", "okr", "product discovery", "opportunity map", "jobs-to-be-done"],
    data: {
      tip: "Continuous Discovery Habits by Teresa Torres is the single best book on modern product discovery — read it cover to cover.",
      resources: [
        { type: "book", title: "Continuous Discovery Habits — Teresa Torres", source: "Book", url: "https://www.goodreads.com/book/show/58046715-continuous-discovery-habits" },
        { type: "book", title: "Inspired — Marty Cagan", source: "Book", url: "https://www.goodreads.com/book/show/35249663-inspired" },
        { type: "article", title: "Product strategy resources — Lenny's Newsletter", source: "Lenny's Newsletter", url: "https://www.lennysnewsletter.com" },
      ],
    },
  },
  {
    keywords: ["growth", "activation", "funnel", "retention", "aarrr", "growth loop", "a/b test", "experiment design"],
    data: {
      tip: "Growth design is mostly learning what NOT to build — most experiments fail. Ship fast, measure rigorously, kill early.",
      resources: [
        { type: "book", title: "Hacking Growth — Sean Ellis & Morgan Brown", source: "Book", url: "https://www.goodreads.com/book/show/31625067-hacking-growth" },
        { type: "platform", title: "Reforge — advanced growth and product programmes", source: "Reforge", url: "https://www.reforge.com" },
        { type: "article", title: "GrowthHackers community — experiments and case studies", source: "GrowthHackers", url: "https://growthhackers.com" },
      ],
    },
  },
  {
    keywords: ["sustainability", "circular", "lifecycle", "lca", "recyclability", "repair", "bio-based", "biofabrication", "green"],
    data: {
      tip: "Run a hotspot LCA on your material choices early — the biggest environmental impact is almost always upstream in raw materials.",
      resources: [
        { type: "mooc", title: "Sustainable Fashion — Polimi POK", source: "Polimi POK", url: "https://pok.polimi.it" },
        { type: "platform", title: "Ellen MacArthur Foundation — circular economy resources", source: "Ellen MacArthur Foundation", url: "https://ellenmacarthurfoundation.org/resources/learn" },
        { type: "course", title: "Sustainable Development and Society — Coursera", source: "Coursera", url: "https://www.coursera.org/learn/sustainable-development" },
      ],
    },
  },
  {
    keywords: ["packaging", "structural packaging", "dieline", "substrate", "prepress", "pack graphic"],
    data: {
      tip: "Always prototype packaging at 1:1 in the intended material — proportions that look great on screen often feel wrong in hand.",
      resources: [
        { type: "platform", title: "Packaging Digest — industry news and technical resources", source: "Packaging Digest", url: "https://www.packagingdigest.com" },
        { type: "book", title: "Structural Packaging — Paul Jackson", source: "Book", url: "https://www.goodreads.com/book/show/7937067-structural-packaging" },
        { type: "platform", title: "Dieline — packaging design inspiration and case studies", source: "The Dieline", url: "https://thedieline.com" },
      ],
    },
  },
  {
    keywords: ["fashion", "garment", "textile", "pattern making", "draping", "tech pack", "collection", "colorway", "fabric", "flat pattern"],
    data: {
      tip: "Learn to read a tech pack before you write one — spend time with production files from existing collections to understand the format.",
      resources: [
        { type: "mooc", title: "Fashion as Design — Polimi POK", source: "Polimi POK", url: "https://pok.polimi.it" },
        { type: "course", title: "Fashion Design — Coursera / Parsons", source: "Coursera", url: "https://www.coursera.org/learn/fashion-design" },
        { type: "platform", title: "CLO3D Academy — digital garment simulation", source: "CLO3D", url: "https://learn.clo3d.com" },
      ],
    },
  },
  {
    keywords: ["material", "material-driven", "bio-material", "smart material", "material scouting", "polymer", "plastics", "metal", "wood"],
    data: {
      tip: "Visit Materioteca in Milan — hands-on material libraries change how designers think about materiality far more than books.",
      resources: [
        { type: "platform", title: "Materia — material innovation database", source: "Materia", url: "https://www.materia.nl" },
        { type: "book", title: "Materials and Design — Mike Ashby & Kara Johnson", source: "Book", url: "https://www.goodreads.com/book/show/2572506-materials-and-design" },
        { type: "mooc", title: "Advanced Materials and Processes — Polimi POK", source: "Polimi POK", url: "https://pok.polimi.it" },
      ],
    },
  },
  {
    keywords: ["interior", "spatial", "space planning", "revit", "construction document", "furniture", "upholstery", "lighting concept"],
    data: {
      tip: "Measure and draw spaces by hand before modeling them — developing spatial intuition is what separates great interior designers.",
      resources: [
        { type: "mooc", title: "Interior Design — Polimi POK", source: "Polimi POK", url: "https://pok.polimi.it" },
        { type: "platform", title: "Architizer — interior and architecture inspiration", source: "Architizer", url: "https://architizer.com" },
        { type: "book", title: "Interior Design Illustrated — Francis Ching", source: "Book", url: "https://www.goodreads.com/book/show/25744.Interior_Design_Illustrated" },
      ],
    },
  },
  {
    keywords: ["lighting", "daylight", "photometric", "ies", "cri", "cct", "dali", "casambi", "circadian"],
    data: {
      tip: "Always verify your photometric calculations with real fixtures on site — simulation and reality diverge more than you expect.",
      resources: [
        { type: "platform", title: "DIALux — free professional lighting simulation software", source: "DIAL", url: "https://www.dialux.com" },
        { type: "book", title: "Architectural Lighting Design — Janet Turner", source: "Book", url: "https://www.goodreads.com/book/show/3429375-architectural-lighting-design" },
        { type: "platform", title: "Lighting Research Center — human-centric lighting resources", source: "LRC / RPI", url: "https://www.lrc.rpi.edu" },
      ],
    },
  },
  {
    keywords: ["workshop", "facilitation", "co-design", "kickoff", "design sprint", "retrospective"],
    data: {
      tip: "Time-box everything and over-prepare the first 10 minutes — if a workshop starts well, it usually ends well.",
      resources: [
        { type: "book", title: "The Design Sprint — Jake Knapp", source: "Book", url: "https://www.goodreads.com/book/show/25814544-sprint" },
        { type: "platform", title: "MURAL — templates and facilitation guides", source: "MURAL", url: "https://www.mural.co/templates" },
        { type: "platform", title: "Liberating Structures — facilitation techniques", source: "Liberating Structures", url: "https://www.liberatingstructures.com" },
      ],
    },
  },
  {
    keywords: ["prototype", "prototyping", "proof of concept", "mock-up", "high-fidelity"],
    data: {
      tip: "Prototype at the fidelity needed to answer your specific question — higher fidelity costs more time and often answers the wrong question.",
      resources: [
        { type: "article", title: "Prototyping guide — what fidelity to use when", source: "Nielsen Norman Group", url: "https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/" },
        { type: "course", title: "Design Thinking: Ideation, Prototyping & Testing", source: "Interaction Design Foundation", url: "https://www.interaction-design.org/courses/design-thinking-the-intermediate-level" },
        { type: "platform", title: "Marvel — quick prototyping tool for beginners", source: "Marvel", url: "https://marvelapp.com" },
      ],
    },
  },
  {
    keywords: ["ai ", "llm", "machine learning", "human-ai", "agent", "prompt engineer", "generative ai", "trust calibration", "error", "hallucination"],
    data: {
      tip: "Designing for AI means designing for non-determinism — your component states and error patterns need to be rethought from scratch.",
      resources: [
        { type: "article", title: "Human-AI Interaction Guidelines — Microsoft Research", source: "Microsoft Research", url: "https://www.microsoft.com/en-us/research/project/guidelines-for-human-ai-interaction/" },
        { type: "course", title: "AI for Everyone — Andrew Ng", source: "Coursera", url: "https://www.coursera.org/learn/ai-for-everyone" },
        { type: "platform", title: "People + AI Research (PAIR) Guidebook — Google", source: "Google PAIR", url: "https://pair.withgoogle.com/guidebook" },
      ],
    },
  },
  {
    keywords: ["ar/vr", "ar ", "vr ", "spatial computing", "xr ", "mixed reality", "visionos", "locomotion", "world-anchored"],
    data: {
      tip: "Design for comfort first — motion sickness is the most common reason users abandon VR experiences entirely.",
      resources: [
        { type: "article", title: "VR Design best practices — Meta Quest Developer", source: "Meta", url: "https://developer.oculus.com/design/intro-usability/" },
        { type: "course", title: "AR/VR design fundamentals — Unity Learn", source: "Unity", url: "https://learn.unity.com" },
        { type: "platform", title: "Apple Human Interface Guidelines — visionOS", source: "Apple", url: "https://developer.apple.com/design/human-interface-guidelines/spatial-ui" },
      ],
    },
  },
  {
    keywords: ["healthcare", "medical", "clinical", "patient", "ehr", "mdr", "iec 62366", "usability engineer"],
    data: {
      tip: "IEC 62366 is the standard for medical device usability engineering — understanding it separates specialist healthcare designers from generalists.",
      resources: [
        { type: "article", title: "Designing for Healthcare — NNGroup reports", source: "Nielsen Norman Group", url: "https://www.nngroup.com/topic/healthcare/" },
        { type: "book", title: "Design for Health — Laura Marcial et al.", source: "Book", url: "https://www.goodreads.com/book/show/35215888-design-for-health" },
        { type: "platform", title: "HIMSS — health IT and digital health resources", source: "HIMSS", url: "https://www.himss.org" },
      ],
    },
  },
  {
    keywords: ["automotive", "hmi", "hud", "instrument cluster", "infotainment", "adas", "driver distraction", "carplay", "android auto"],
    data: {
      tip: "Driver distraction is the killer constraint — every extra glance you require increases crash risk. Study NHTSA guidelines before designing.",
      resources: [
        { type: "article", title: "NHTSA Visual-Manual NHTSA Driver Distraction Guidelines", source: "NHTSA", url: "https://www.nhtsa.gov/staticfiles/nvs/pdf/812006_DriverDistraction_Guidelines.pdf" },
        { type: "platform", title: "AUTOCUI conference — automotive conversation UI research", source: "ACM SIGCHI", url: "https://dl.acm.org/conference/autocui" },
        { type: "book", title: "Automotive UX Design — Andreas Haller", source: "Book", url: "https://www.goodreads.com/book/show/59765741-automotive-ux" },
      ],
    },
  },
  {
    keywords: ["voice ui", "voice assistant", "conversational", "dialogue", "chatbot", "speech", "ssml", "conversation design", "prompt-flow"],
    data: {
      tip: "Write every conversation as if it's spoken aloud by a human — read it out loud, and if it sounds robotic you'll catch it immediately.",
      resources: [
        { type: "platform", title: "Conversation Design Institute — full curriculum", source: "CDI", url: "https://www.conversationdesigninstitute.com" },
        { type: "book", title: "Designing Voice User Interfaces — Cathy Pearl", source: "Book", url: "https://www.goodreads.com/book/show/33276232-designing-voice-user-interfaces" },
        { type: "article", title: "Conversation Design guidelines — Google Developers", source: "Google", url: "https://developers.google.com/assistant/conversation-design/welcome" },
      ],
    },
  },
  {
    keywords: ["ux writing", "content design", "microcopy", "plain language", "flow writing", "onboarding", "error message"],
    data: {
      tip: "Read every piece of copy aloud — if it sounds corporate or robotic, the user will feel it. Conversational always beats formal.",
      resources: [
        { type: "book", title: "Strategic Writing for UX — Torrey Podmajersky", source: "Book", url: "https://www.goodreads.com/book/show/43726576-strategic-writing-for-ux" },
        { type: "platform", title: "UX Writing Hub — free resources and certification", source: "UX Writing Hub", url: "https://uxwritinghub.com" },
        { type: "article", title: "The UX Copywriter's Field Guide", source: "Nielsen Norman Group", url: "https://www.nngroup.com/articles/writing-for-ux/" },
      ],
    },
  },
  {
    keywords: ["photo", "photography", "art direction", "camera", "retouch", "post-production", "compositing", "shoot brief"],
    data: {
      tip: "Brief the photographer with mood boards, not just words — 10 reference images communicate more precisely than a page of copy.",
      resources: [
        { type: "video", title: "Cinematography & lighting theory — Film Riot", source: "YouTube / Film Riot", url: "https://www.youtube.com/@filmriot" },
        { type: "platform", title: "Adobe Lightroom tutorials — official channel", source: "Adobe", url: "https://www.adobe.com/learn/lightroom" },
        { type: "course", title: "Photography Basics and Beyond — Michigan State / Coursera", source: "Coursera", url: "https://www.coursera.org/specializations/photography-basics" },
      ],
    },
  },
  {
    keywords: ["game", "gaming", "playtest", "game economy", "menu system", "controller", "game accessibility"],
    data: {
      tip: "Playtesting is the core skill in game design — run sessions early and often, and prioritise feeling over looking good.",
      resources: [
        { type: "platform", title: "Game Accessibility Guidelines — comprehensive checklist", source: "Game Accessibility Guidelines", url: "https://gameaccessibilityguidelines.com" },
        { type: "course", title: "Game Design and Development Specialization", source: "Coursera / Michigan State", url: "https://www.coursera.org/specializations/game-development" },
        { type: "book", title: "The Art of Game Design — Jesse Schell", source: "Book", url: "https://www.goodreads.com/book/show/3396933-the-art-of-game-design" },
      ],
    },
  },
  {
    keywords: ["exhibition", "retail design", "wayfinding", "visitor journey", "environmental graphic", "museum", "stand", "temporary structure"],
    data: {
      tip: "Observe how visitors actually move through a space before you design — people rarely follow the intended path.",
      resources: [
        { type: "book", title: "Exhibit Design That Works — Martin Goldberg", source: "Book", url: "https://www.goodreads.com/book/show/55407097-exhibit-design-that-works" },
        { type: "platform", title: "SEGD — environmental graphic design community", source: "SEGD", url: "https://segd.org/resources" },
        { type: "platform", title: "Rethinking the Museum — design case studies", source: "Museum Next", url: "https://www.museumnext.com" },
      ],
    },
  },
  {
    keywords: ["project management", "milestone", "critical path", "capacity", "stakeholder", "roadmap", "agile", "scrum", "dependency"],
    data: {
      tip: "The biggest project management skill is saying no clearly and early — a well-reasoned no saves more time than any process tool.",
      resources: [
        { type: "course", title: "Google Project Management Certificate", source: "Coursera", url: "https://www.coursera.org/professional-certificates/google-project-management" },
        { type: "book", title: "Making Things Happen — Scott Berkun", source: "Book", url: "https://www.goodreads.com/book/show/13835.Making_Things_Happen" },
        { type: "platform", title: "Linear — modern PM tool used by design teams", source: "Linear", url: "https://linear.app/resources" },
      ],
    },
  },
  {
    keywords: ["design ops", "designops", "design team", "hiring", "career laddering", "design tooling", "velocity", "quality bar"],
    data: {
      tip: "DesignOps is about multiplying design impact — instrument what matters (time, quality, adoption) before optimising anything.",
      resources: [
        { type: "platform", title: "Design Operations Network — community and resources", source: "DesignOps Network", url: "https://www.designops.network" },
        { type: "book", title: "Org Design for Design Orgs — Merholz & Skinner", source: "Book", url: "https://www.goodreads.com/book/show/31028282-org-design-for-design-orgs" },
        { type: "article", title: "DesignOps 101 — InVision", source: "InVision", url: "https://www.invisionapp.com/inside-design/design-operations/" },
      ],
    },
  },
  {
    keywords: ["insight synthesis", "affinity mapping", "opportunity framing", "research repository", "research ops", "reops"],
    data: {
      tip: "Affinity mapping is not the goal — it's the start. Always push to extract 'so what?' opportunity statements from your clusters.",
      resources: [
        { type: "article", title: "Affinity Diagramming — NNGroup guide", source: "Nielsen Norman Group", url: "https://www.nngroup.com/articles/affinity-diagram/" },
        { type: "platform", title: "Dovetail — the standard research repository platform", source: "Dovetail", url: "https://dovetail.com/learn-ux-research/" },
        { type: "book", title: "The User Experience Team of One — Leah Buley", source: "Book", url: "https://www.goodreads.com/book/show/15812070-the-user-experience-team-of-one" },
      ],
    },
  },
  {
    keywords: ["fintech", "financial", "payment", "banking", "kyc", "psd2", "regulatory", "eu financial"],
    data: {
      tip: "In fintech, regulatory constraint is a design input, not a blocker — the best fintech design teams treat compliance as a UX problem.",
      resources: [
        { type: "article", title: "Designing for Financial Services — NNGroup", source: "Nielsen Norman Group", url: "https://www.nngroup.com/articles/financial-ux/" },
        { type: "platform", title: "Plaid Design — fintech UX writing and patterns", source: "Plaid", url: "https://plaid.com/documents/consumer-report-ux.pdf" },
        { type: "book", title: "The Art of Money — Bari Tessler", source: "Book", url: "https://www.goodreads.com/book/show/22929382-the-art-of-money" },
      ],
    },
  },
  {
    keywords: ["robotics", "robot", "hri", "ros", "embodied", "morphology", "proxemics", "physical safety", "cobots"],
    data: {
      tip: "Legibility — the robot making its intention visible before acting — is the single most important principle in human-robot interaction design.",
      resources: [
        { type: "platform", title: "HRI Conference proceedings — ACM/IEEE", source: "ACM Digital Library", url: "https://dl.acm.org/conference/hri" },
        { type: "course", title: "Human-Robot Interaction — Coursera", source: "Coursera", url: "https://www.coursera.org/learn/human-robot-interaction" },
        { type: "book", title: "Wired for Culture — Mark Pagel (for the social context)", source: "Book", url: "https://www.goodreads.com/book/show/13059872-wired-for-culture" },
      ],
    },
  },
  {
    keywords: ["foresight", "trend", "scenario planning", "signals", "innovation", "horizon"],
    data: {
      tip: "Weak signals are more valuable than confirmed trends — by the time a trend is obvious, it's too late to act on it.",
      resources: [
        { type: "book", title: "The Signals Are Talking — Amy Webb", source: "Book", url: "https://www.goodreads.com/book/show/29780043-the-signals-are-talking" },
        { type: "platform", title: "IFTF — Institute for the Future resources", source: "IFTF", url: "https://www.iftf.org/our-work/people-technology/tools-practices/" },
        { type: "mooc", title: "Design Futures — Polimi POK", source: "Polimi POK", url: "https://pok.polimi.it" },
      ],
    },
  },
  {
    keywords: ["physical computing", "iot", "connected product", "microcontroller", "sensors", "actuator", "matter", "thread", "zigbee"],
    data: {
      tip: "Prototype with Arduino or a Raspberry Pi before specifying production firmware — the interaction feeling is impossible to judge from code alone.",
      resources: [
        { type: "platform", title: "Arduino tutorials — official getting started guide", source: "Arduino", url: "https://www.arduino.cc/en/Tutorial/HomePage" },
        { type: "platform", title: "Adafruit Learning System — practical electronics for designers", source: "Adafruit", url: "https://learn.adafruit.com" },
        { type: "book", title: "Make: Electronics — Charles Platt", source: "Book", url: "https://www.goodreads.com/book/show/6820192-make" },
      ],
    },
  },
];

export function getSkillResources(skillName: string): SkillResources | null {
  const lower = skillName.toLowerCase();
  for (const entry of RESOURCE_MAP) {
    if (entry.keywords.some((k) => lower.includes(k))) {
      return entry.data;
    }
  }
  return null;
}
