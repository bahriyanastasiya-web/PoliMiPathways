export type Trait = "Analytical" | "Creative" | "Social" | "Risk";

export type Scores = Record<Trait, number>;

export type Category = "Tech" | "Business" | "Creative";

export interface Resource {
  name: string;
  provider: string;
  url: string;
}

export interface Career {
  id: string;
  title: string;
  category: Category;
  tags: string[];
  description: string;
  dailyTasks: string[];
  hardSkills: string[];
  softSkills: string[];
  resources: Resource[];
  /** Ideal trait profile used by the matching algorithm (0-100). */
  profile: Scores;
}

export const QUESTIONS: {
  id: string;
  question: string;
  options: { label: string; trait: Trait }[];
}[] = [
  {
    id: "q1",
    question: "When tackling a new problem, you naturally start by…",
    options: [
      { label: "Breaking it down into data and logic", trait: "Analytical" },
      { label: "Imagining bold, original solutions", trait: "Creative" },
      { label: "Talking it through with other people", trait: "Social" },
      { label: "Diving in and experimenting fast", trait: "Risk" },
    ],
  },
  {
    id: "q2",
    question: "Your ideal project would let you…",
    options: [
      { label: "Find patterns in complex information", trait: "Analytical" },
      { label: "Design something beautiful from scratch", trait: "Creative" },
      { label: "Bring a team together toward a goal", trait: "Social" },
      { label: "Launch something untested and see what happens", trait: "Risk" },
    ],
  },
  {
    id: "q3",
    question: "Friends would describe you as someone who…",
    options: [
      { label: "Thinks carefully before deciding", trait: "Analytical" },
      { label: "Always has fresh ideas", trait: "Creative" },
      { label: "Connects easily with anyone", trait: "Social" },
      { label: "Isn't afraid to take chances", trait: "Risk" },
    ],
  },
  {
    id: "q4",
    question: "At work, you feel most energized when…",
    options: [
      { label: "Optimizing a process with numbers", trait: "Analytical" },
      { label: "Crafting a story or visual", trait: "Creative" },
      { label: "Mentoring or persuading others", trait: "Social" },
      { label: "Betting on a new opportunity", trait: "Risk" },
    ],
  },
  {
    id: "q5",
    question: "Success, to you, mostly means…",
    options: [
      { label: "Getting the analysis exactly right", trait: "Analytical" },
      { label: "Making something people admire", trait: "Creative" },
      { label: "Building strong relationships", trait: "Social" },
      { label: "Achieving big, ambitious outcomes", trait: "Risk" },
    ],
  },
];

export const TRAITS: Trait[] = ["Analytical", "Creative", "Social", "Risk"];

export const CAREERS: Career[] = [
  {
    id: "product-manager",
    title: "Product Manager",
    category: "Business",
    tags: ["Strategy", "Leadership", "Roadmapping"],
    description:
      "Product Managers sit at the intersection of business, technology, and design, guiding a product from idea to launch and beyond.",
    dailyTasks: [
      "Prioritize the product roadmap with stakeholders",
      "Write specs and user stories for the team",
      "Analyze metrics to decide what to build next",
      "Run cross-functional standups with design & engineering",
    ],
    hardSkills: ["Roadmapping", "Data Analysis", "A/B Testing", "SQL Basics"],
    softSkills: ["Communication", "Leadership", "Prioritization"],
    resources: [
      { name: "Digital Product Management", provider: "Coursera", url: "https://www.coursera.org" },
      { name: "Become a Product Manager", provider: "Udemy", url: "https://www.udemy.com" },
    ],
    profile: { Analytical: 70, Creative: 55, Social: 80, Risk: 65 },
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    category: "Tech",
    tags: ["SQL", "Visualization", "Statistics"],
    description:
      "Data Analysts turn raw data into clear insights that drive decisions, building dashboards and reports for the business.",
    dailyTasks: [
      "Query databases to answer business questions",
      "Build dashboards and visualizations",
      "Clean and validate datasets",
      "Present findings to stakeholders",
    ],
    hardSkills: ["SQL", "Python", "Data Visualization", "Statistics"],
    softSkills: ["Attention to Detail", "Storytelling", "Curiosity"],
    resources: [
      { name: "Google Data Analytics", provider: "Coursera", url: "https://www.coursera.org" },
      { name: "Data Analysis with Pandas", provider: "Udemy", url: "https://www.udemy.com" },
    ],
    profile: { Analytical: 95, Creative: 35, Social: 40, Risk: 30 },
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    category: "Creative",
    tags: ["Figma", "Research", "Prototyping"],
    description:
      "UX Designers craft intuitive, delightful experiences by researching users and prototyping interfaces.",
    dailyTasks: [
      "Conduct user research and interviews",
      "Design wireframes and prototypes in Figma",
      "Run usability tests",
      "Collaborate with engineers on handoff",
    ],
    hardSkills: ["Figma", "Prototyping", "User Research", "Design Systems"],
    softSkills: ["Empathy", "Communication", "Creativity"],
    resources: [
      { name: "Google UX Design", provider: "Coursera", url: "https://www.coursera.org" },
      { name: "UX & Web Design Master Course", provider: "Udemy", url: "https://www.udemy.com" },
    ],
    profile: { Analytical: 45, Creative: 95, Social: 65, Risk: 45 },
  },
  {
    id: "software-engineer",
    title: "Software Engineer",
    category: "Tech",
    tags: ["Coding", "Systems", "Problem Solving"],
    description:
      "Software Engineers design, build, and maintain the systems and applications that power modern products.",
    dailyTasks: [
      "Write and review code",
      "Debug and fix issues",
      "Design system architecture",
      "Collaborate on technical decisions",
    ],
    hardSkills: ["JavaScript", "Algorithms", "Git", "System Design"],
    softSkills: ["Problem Solving", "Teamwork", "Focus"],
    resources: [
      { name: "Meta Front-End Developer", provider: "Coursera", url: "https://www.coursera.org" },
      { name: "The Web Developer Bootcamp", provider: "Udemy", url: "https://www.udemy.com" },
    ],
    profile: { Analytical: 90, Creative: 50, Social: 35, Risk: 45 },
  },
  {
    id: "marketing-specialist",
    title: "Marketing Specialist",
    category: "Business",
    tags: ["Campaigns", "Content", "Analytics"],
    description:
      "Marketing Specialists plan and run campaigns that grow awareness, engagement, and revenue across channels.",
    dailyTasks: [
      "Plan and launch marketing campaigns",
      "Create content and copy",
      "Track campaign performance",
      "Coordinate with sales and design",
    ],
    hardSkills: ["SEO", "Content Strategy", "Google Analytics", "Copywriting"],
    softSkills: ["Creativity", "Communication", "Adaptability"],
    resources: [
      { name: "Digital Marketing Specialization", provider: "Coursera", url: "https://www.coursera.org" },
      { name: "The Complete Digital Marketing Course", provider: "Udemy", url: "https://www.udemy.com" },
    ],
    profile: { Analytical: 55, Creative: 80, Social: 85, Risk: 60 },
  },
  {
    id: "business-analyst",
    title: "Business Analyst",
    category: "Business",
    tags: ["Requirements", "Modeling", "Process"],
    description:
      "Business Analysts bridge business needs and technical solutions, mapping processes and defining requirements.",
    dailyTasks: [
      "Gather and document requirements",
      "Model business processes",
      "Analyze costs and benefits",
      "Liaise between business and IT teams",
    ],
    hardSkills: ["Requirements Analysis", "Process Modeling", "Excel", "SQL"],
    softSkills: ["Communication", "Critical Thinking", "Negotiation"],
    resources: [
      { name: "Business Analysis Fundamentals", provider: "Coursera", url: "https://www.coursera.org" },
      { name: "Business Analyst Bootcamp", provider: "Udemy", url: "https://www.udemy.com" },
    ],
    profile: { Analytical: 80, Creative: 40, Social: 70, Risk: 40 },
  },
];

export const CATEGORIES: Category[] = ["Tech", "Business", "Creative"];

/** Compares quiz scores to each career's ideal profile and returns a 0-100 match %. */
export function matchCareers(scores: Scores): { career: Career; match: number }[] {
  return CAREERS.map((career) => {
    let distance = 0;
    let maxDistance = 0;
    for (const trait of TRAITS) {
      distance += Math.abs(scores[trait] - career.profile[trait]);
      maxDistance += 100;
    }
    const match = Math.round((1 - distance / maxDistance) * 100);
    return { career, match: Math.max(0, Math.min(100, match)) };
  }).sort((a, b) => b.match - a.match);
}

/** Converts raw trait counts (from the quiz) into a 0-100 score per trait. */
export function toScores(counts: Scores): Scores {
  const total = TRAITS.reduce((sum, t) => sum + counts[t], 0) || 1;
  return {
    Analytical: Math.round((counts.Analytical / total) * 100),
    Creative: Math.round((counts.Creative / total) * 100),
    Social: Math.round((counts.Social / total) * 100),
    Risk: Math.round((counts.Risk / total) * 100),
  };
}

export const BACHELORS = ["Design", "Computer Science", "Business", "Psychology"];
export const MASTERS = ["Business", "Data Science", "Design", "Marketing"];

/** Hybrid path recommendations keyed by "bachelor+master". */
export const HYBRID_PATHS: Record<string, string> = {
  "Design+Business": "product-manager",
  "Computer Science+Business": "product-manager",
  "Business+Data Science": "data-analyst",
  "Psychology+Marketing": "marketing-specialist",
  "Computer Science+Data Science": "data-analyst",
  "Design+Marketing": "ux-designer",
  "Business+Data Science ": "business-analyst",
  "Psychology+Business": "business-analyst",
};

export function getHybridCareer(bachelor: string, master: string): Career | null {
  const id = HYBRID_PATHS[`${bachelor}+${master}`];
  return id ? CAREERS.find((c) => c.id === id) ?? null : null;
}
