import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, ArrowRight } from "lucide-react";
import { CareerDetailModal } from "@/components/CareerDetailModal";
import { CAREERS, MASTERS, masterMatches, type Career } from "@/lib/careers";

export const Route = createFileRoute("/masters")({
  head: () => ({
    meta: [
      { title: "Masters — PoliMiPathways" },
      { name: "description", content: "Choose your master's degree and explore the careers it unlocks." },
    ],
  }),
  component: Masters,
});

const LEVEL_COLORS: Record<string, string> = {
  CORE: "bg-blue-500/10 text-blue-600",
  ADVANCED: "bg-purple-500/10 text-purple-600",
  FRONTIER: "bg-amber-500/10 text-amber-600",
};

function Masters() {
  const [selected, setSelected] = useState<string | null>(null);
  const [active, setActive] = useState<Career | null>(null);

  const careers = selected
    ? CAREERS.filter((c) => masterMatches(c.master, selected))
    : [];

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Choose your master's degree
      </h1>
      <p className="mt-2 text-muted-foreground">
        Select a programme to see the careers it can lead to.
      </p>

      {/* Master grid */}
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MASTERS.filter((m) => m !== "Any Design MSc").map((m) => {
          const count = CAREERS.filter((c) => masterMatches(c.master, m)).length;
          const isSelected = selected === m;
          return (
            <button
              key={m}
              onClick={() => setSelected(isSelected ? null : m)}
              className={`flex items-start gap-3 rounded-xl border p-5 text-left transition-all duration-200 ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border/60 bg-card hover:border-primary/30 hover:shadow-sm"
              }`}
            >
              <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                isSelected
                  ? "border-primary/20 bg-primary/10 text-primary"
                  : "border-border/60 bg-secondary text-secondary-foreground"
              }`}>
                <GraduationCap className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold leading-snug ${isSelected ? "text-primary" : "text-foreground"}`}>
                  {m}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{count} career{count !== 1 ? "s" : ""}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Careers for selected master */}
      {selected && (
        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Careers for{" "}
            <span className="text-primary">{selected}</span>
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {careers.length} role{careers.length !== 1 ? "s" : ""} available
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {careers.map((career) => (
              <MasterCareerCard
                key={career.id}
                career={career}
                onOpen={() => setActive(career)}
              />
            ))}
          </div>
        </section>
      )}

      {active && <CareerDetailModal career={active} onClose={() => setActive(null)} />}
    </div>
  );
}

function MasterCareerCard({ career, onOpen }: { career: Career; onOpen: () => void }) {
  return (
    <div className="group flex flex-col rounded-xl border border-border/60 bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm">
      <span className={`inline-block self-start rounded-md px-2 py-0.5 text-xs font-medium ${LEVEL_COLORS[career.level] ?? "bg-secondary text-secondary-foreground"}`}>
        {career.level}
      </span>
      <h3 className="mt-3 text-base font-semibold tracking-tight text-foreground">{career.title}</h3>
      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{career.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {career.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-md border border-border/60 px-2 py-0.5 text-xs text-muted-foreground">
            {tag}
          </span>
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
