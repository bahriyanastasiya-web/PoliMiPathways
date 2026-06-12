import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { CareerDetailModal } from "@/components/CareerDetailModal";
import {
  CAREERS,
  BACHELORS,
  MASTERS,
  HYBRID_PATHS,
  masterMatches,
  bachelorMatches,
  type Career,
  type Category,
} from "@/lib/careers";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Paths — PoliMiPathways" },
      { name: "description", content: "Browse Polimi design careers by degree, level, and skills." },
    ],
  }),
  component: Explore,
});

const HYBRID_CAREER_IDS: string[][] = [
  ["ux-engineer-design-engineer", "uxui-designer"],
  ["industrial-product-designer"],
  ["circular-sustainable-design-specialist", "digital-fashion-fashion-tech-designer"],
  ["arvr-spatial-computing-designer"],
  ["service-designer"],
  ["design-strategist", "innovation-designer-new-business-design"],
  ["information-data-visualization-designer"],
  ["designled-product-manager"],
  ["fashion-product-manager-brand-coordinator"],
  ["humanai-interaction-designer"],
];

const LEVEL_COLORS: Record<string, string> = {
  CORE: "bg-blue-500/10 text-blue-600",
  ADVANCED: "bg-purple-500/10 text-purple-600",
  FRONTIER: "bg-amber-500/10 text-amber-600",
};

const LEVELS: (Category | "All")[] = ["All", "CORE", "ADVANCED", "FRONTIER"];

function Explore() {
  const [bachelor, setBachelor] = useState("All");
  const [master, setMaster] = useState("All");
  const [level, setLevel] = useState<Category | "All">("All");
  const [search, setSearch] = useState("");
  const [active, setActive] = useState<Career | null>(null);

  const filtered = useMemo(() => {
    return CAREERS.filter((c) => {
      if (level !== "All" && c.level !== level) return false;
      if (bachelor !== "All" && !bachelorMatches(c.bachelor, bachelor)) return false;
      if (master !== "All" && !masterMatches(c.master, master)) return false;
      if (search && !c.title.toLowerCase().includes(search.toLowerCase()) &&
          !c.description.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [bachelor, master, level, search]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Explore careers</h1>
      <p className="mt-2 text-muted-foreground">
        {CAREERS.length} Polimi design careers — filter by degree, level, or keyword.
      </p>

      {/* Filters */}
      <div className="mt-8 flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Bachelor</label>
          <select
            value={bachelor}
            onChange={(e) => setBachelor(e.target.value)}
            className="h-10 appearance-none rounded-lg border border-border/60 bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none"
          >
            <option value="All">All BSc degrees</option>
            {BACHELORS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Master</label>
          <select
            value={master}
            onChange={(e) => setMaster(e.target.value)}
            className="h-10 appearance-none rounded-lg border border-border/60 bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none"
          >
            <option value="All">All MSc degrees</option>
            {MASTERS.map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[160px]">
          <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Search</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g. UX, fashion, brand…"
            className="h-10 rounded-lg border border-border/60 bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Level tabs */}
      <div className="mt-5 flex flex-wrap gap-2">
        {LEVELS.map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={`rounded-lg border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
              level === l
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/60 bg-card text-foreground hover:border-primary/30 hover:bg-accent"
            }`}
          >
            {l}
          </button>
        ))}
        <span className="ml-auto self-center text-sm text-muted-foreground">{filtered.length} results</span>
      </div>

      {/* Career grid */}
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((career) => (
          <ExploreCard key={career.id} career={career} onOpen={() => setActive(career)} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-3 rounded-xl border border-dashed border-border/60 py-12 text-center text-sm text-muted-foreground">
            No careers match your filters. Try broadening the search.
          </p>
        )}
      </div>

      {/* Hybrid paths */}
      <section className="mt-16 rounded-2xl border border-border/60 bg-card p-6 md:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Polimi hybrid degree paths</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">Specific BSc + MSc combinations that unlock blended career opportunities.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {HYBRID_PATHS.map((h, i) => {
            const linkedCareers = (HYBRID_CAREER_IDS[i] ?? []).map((id) => CAREERS.find((c) => c.id === id)).filter(Boolean) as Career[];
            return (
              <div key={i} className="rounded-xl border border-border/60 bg-background p-4">
                <div className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">{h.degrees}</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {linkedCareers.map((career) => (
                        <button
                          key={career.id}
                          onClick={() => setActive(career)}
                          className="text-sm font-semibold text-foreground underline-offset-2 hover:text-primary hover:underline transition-colors"
                        >
                          {career.title}
                        </button>
                      ))}
                      {linkedCareers.length === 0 && (
                        <p className="text-sm font-semibold text-foreground">{h.role}</p>
                      )}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{h.why}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {active && <CareerDetailModal career={active} onClose={() => setActive(null)} />}
    </div>
  );
}

function ExploreCard({ career, onOpen }: { career: Career; onOpen: () => void }) {
  return (
    <div className="group flex flex-col rounded-xl border border-border/60 bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm">
      <div>
        <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-medium ${LEVEL_COLORS[career.level] ?? "bg-secondary text-secondary-foreground"}`}>
          {career.level}
        </span>
        <h3 className="mt-3 text-base font-semibold tracking-tight text-foreground">{career.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{career.description}</p>
      </div>
      <div className="mt-3 text-xs text-muted-foreground">
        <span className="font-medium">BSc:</span> {career.bachelor.split(' or ')[0]}
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {career.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-md border border-border/60 px-2 py-0.5 text-xs text-muted-foreground">{tag}</span>
        ))}
      </div>
      <button
        onClick={onOpen}
        className="mt-5 inline-flex items-center gap-1 self-start text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        View details
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
