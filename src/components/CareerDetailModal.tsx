import { useState } from "react";
import { X, Check, CheckCircle2, ArrowRight, Wrench, GitBranch, BookOpen, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import type { Career } from "@/lib/careers";
import { getSkillResources } from "@/lib/learningResources";

const RESOURCE_ICONS: Record<string, string> = {
  course: "Course",
  book: "Book",
  video: "Video",
  platform: "Platform",
  article: "Article",
  mooc: "MOOC",
};

const LEVEL_COLORS: Record<string, string> = {
  CORE: "bg-blue-500/10 text-blue-600",
  ADVANCED: "bg-purple-500/10 text-purple-600",
  FRONTIER: "bg-amber-500/10 text-amber-600",
};

type Tab = "overview" | "skills" | "tools" | "transitions";

export function CareerDetailModal({
  career,
  match,
  onClose,
}: {
  career: Career;
  match?: number;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("overview");
  const [have, setHave] = useState<Set<string>>(new Set());
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const skillList = [...career.hardSkills, ...career.softSkills];
  const missing = skillList.filter((s) => !have.has(s));

  const toggle = (skill: string) => {
    const next = new Set(have);
    if (next.has(skill)) next.delete(skill);
    else next.add(skill);
    setHave(next);
  };

  const toolsByCategory = career.allSkills.reduce<Record<string, string[]>>((acc, s) => {
    if (s.tools && s.category) {
      if (!acc[s.category]) acc[s.category] = [];
      s.tools.split(",").forEach((t) => {
        const tool = t.trim();
        if (tool && !acc[s.category].includes(tool)) acc[s.category].push(tool);
      });
    }
    return acc;
  }, {});
  const toolCategories = Object.entries(toolsByCategory);

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "overview", label: "Overview" },
    { id: "skills", label: "Skills", count: skillList.length },
    { id: "tools", label: "Tools", count: toolCategories.length },
    ...(career.transitions.length > 0
      ? [{ id: "transitions" as Tab, label: "Transitions", count: career.transitions.length }]
      : []),
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/30 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-3xl flex-col rounded-t-2xl border border-border/60 bg-card shadow-2xl sm:rounded-2xl"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — fixed, never scrolls */}
        <div className="flex-shrink-0 border-b border-border/60 px-6 pt-6 pb-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${LEVEL_COLORS[career.level] ?? "bg-secondary text-secondary-foreground"}`}>
                  {career.level}
                </span>
                {match !== undefined && (
                  <span className="text-sm font-medium text-primary">{match}% match</span>
                )}
              </div>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {career.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {career.description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="mt-1 flex-shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-5 flex gap-1 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 px-3 pb-3 pt-1 text-sm font-medium transition-colors ${
                  tab === t.id
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
                {t.count !== undefined && (
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                    tab === t.id ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"
                  }`}>
                    {t.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === "overview" && (
            <div className="space-y-8">
              {/* Degree path */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Degree path</h3>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex-1 rounded-xl border border-border/60 bg-secondary/30 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Bachelor</p>
                    <p className="mt-1 text-sm font-medium text-foreground">{career.bachelor}</p>
                  </div>
                  <ArrowRight className="hidden h-4 w-4 flex-shrink-0 text-muted-foreground sm:block" />
                  <div className="flex-1 rounded-xl border border-border/60 bg-secondary/30 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Master</p>
                    <p className="mt-1 text-sm font-medium text-foreground">{career.master}</p>
                  </div>
                </div>
              </div>

              {/* What you'll do */}
              {career.dailyTasks.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">What you'll do</h3>
                  <ul className="mt-4 space-y-3">
                    {career.dailyTasks.map((task) => (
                      <li key={task} className="flex items-start gap-3">
                        <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                        </span>
                        <span className="text-sm leading-relaxed text-foreground">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skill snapshot */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Key skills</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {career.hardSkills.slice(0, 6).map((s) => (
                    <span key={s} className="rounded-lg border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "skills" && (
            <div className="space-y-8">
              {/* Checklist */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Skills checklist</h3>
                  <span className="text-xs text-muted-foreground">
                    {have.size} / {skillList.length} checked
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Tap a skill to mark it as yours.</p>
                <div className="mt-4 space-y-2">
                  {skillList.map((skill) => {
                    const checked = have.has(skill);
                    const isHard = career.hardSkills.includes(skill);
                    const resources = getSkillResources(skill);
                    const isExpanded = expandedSkill === skill;
                    return (
                      <div key={skill} className={`rounded-xl border transition-all duration-150 ${
                        checked ? "border-primary/20 bg-primary/5" : "border-border/60 bg-background"
                      }`}>
                        <div className="flex items-center gap-3 px-4 py-3">
                          <button
                            onClick={() => toggle(skill)}
                            className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors ${
                              checked ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/40"
                            }`}
                          >
                            {checked && <Check className="h-3 w-3" />}
                          </button>
                          <span className={`flex-1 text-sm ${checked ? "text-muted-foreground line-through" : "text-foreground"}`}>
                            {skill}
                          </span>
                          <span className={`rounded-md px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                            isHard ? "bg-blue-500/10 text-blue-600" : "bg-secondary text-secondary-foreground"
                          }`}>
                            {isHard ? "Technical" : "Soft"}
                          </span>
                          {resources && (
                            <button
                              onClick={() => setExpandedSkill(isExpanded ? null : skill)}
                              className="ml-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                              title="Learning resources"
                            >
                              {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <BookOpen className="h-3.5 w-3.5" />}
                            </button>
                          )}
                        </div>

                        {isExpanded && resources && (
                          <div className="border-t border-border/60 px-4 pb-4 pt-3">
                            {resources.tip && (
                              <p className="mb-3 text-xs leading-relaxed text-muted-foreground italic">
                                💡 {resources.tip}
                              </p>
                            )}
                            <div className="space-y-2">
                              {resources.resources.map((r, i) => (
                                <a
                                  key={i}
                                  href={r.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-start gap-2.5 rounded-lg border border-border/60 bg-card px-3 py-2.5 text-sm transition-colors hover:border-primary/30 hover:bg-accent/50"
                                >
                                  <span className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                                    r.type === "book" ? "bg-amber-500/10 text-amber-600" :
                                    r.type === "course" || r.type === "mooc" ? "bg-blue-500/10 text-blue-600" :
                                    r.type === "video" ? "bg-red-500/10 text-red-600" :
                                    "bg-secondary text-secondary-foreground"
                                  }`}>
                                    {RESOURCE_ICONS[r.type]}
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <p className="font-medium text-foreground leading-snug">{r.title}</p>
                                    <p className="mt-0.5 text-xs text-muted-foreground">{r.source}</p>
                                  </div>
                                  <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Missing skills */}
              {missing.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Still to develop ({missing.length})
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {missing.map((s) => (
                      <span key={s} className="rounded-lg border border-dashed border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {have.size === skillList.length && skillList.length > 0 && (
                <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  You have all the skills for this role!
                </p>
              )}
            </div>
          )}

          {tab === "tools" && (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">Tools and software used in this role, grouped by skill area.</p>
              {toolCategories.length > 0 ? (
                toolCategories.map(([cat, tools]) => (
                  <div key={cat}>
                    <div className="flex items-center gap-2">
                      <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
                      <h3 className="text-sm font-semibold text-foreground">{cat}</h3>
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {tools.map((t) => (
                        <span key={t} className="rounded-lg border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No tools listed for this role.</p>
              )}
            </div>
          )}

          {tab === "transitions" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Common career moves into or out of this role.</p>
              {career.transitions.map((t) => (
                <div key={t.from + t.to} className="rounded-xl border border-border/60 bg-background p-5">
                  <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
                    <span className="rounded-md bg-secondary px-2.5 py-1">{t.from}</span>
                    <GitBranch className="h-4 w-4 text-muted-foreground" />
                    <span className="rounded-md bg-primary/10 px-2.5 py-1 text-primary">{t.to}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.how}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
