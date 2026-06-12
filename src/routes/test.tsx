import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { CareerDetailModal } from "@/components/CareerDetailModal";
import {
  QUESTIONS,
  TRAITS,
  CATEGORIES,
  matchCareers,
  toScores,
  BACHELORS,
  MASTERS,
  HYBRID_PATHS,
  type Scores,
  type Trait,
  type Career,
  type Category,
} from "@/lib/careers";

export const Route = createFileRoute("/test")({
  head: () => ({
    meta: [
      { title: "Career Test — PoliMiPathways" },
      { name: "description", content: "Take the personality test and discover matching careers." },
    ],
  }),
  component: Test,
});

const emptyScores: Scores = { Analytical: 0, Creative: 0, Social: 0, Risk: 0 };

function Test() {
  const [step, setStep] = useState(0);
  const [counts, setCounts] = useState<Scores>(emptyScores);
  const [answers, setAnswers] = useState<(Trait | null)[]>(
    Array(QUESTIONS.length).fill(null),
  );
  const [phase, setPhase] = useState<"intro" | "quiz" | "degree" | "results">("intro");
  const [bachelor, setBachelor] = useState("");
  const [master, setMaster] = useState("");

  const answer = (trait: Trait) => {
    const prev = answers[step];
    const nextCounts = { ...counts };
    if (prev) nextCounts[prev] -= 1;
    nextCounts[trait] += 1;
    setCounts(nextCounts);
    const nextAnswers = [...answers];
    nextAnswers[step] = trait;
    setAnswers(nextAnswers);
    setTimeout(() => {
      if (step < QUESTIONS.length - 1) setStep(step + 1);
      else setPhase("degree");
    }, 180);
  };

  const restart = () => {
    setStep(0);
    setCounts(emptyScores);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setBachelor("");
    setMaster("");
    setPhase("intro");
  };

  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Career test
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Discover the jobs for you
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          Answer {QUESTIONS.length} quick questions about how you think and work. We'll match you with the design careers that fit your personality best.
        </p>
        <button
          onClick={() => setPhase("quiz")}
          className="mt-10 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
        >
          Start the test
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (phase === "degree") {
    return (
      <DegreeStep
        bachelor={bachelor}
        master={master}
        onChangeBachelor={setBachelor}
        onChangeMaster={setMaster}
        onContinue={() => setPhase("results")}
        onSkip={() => setPhase("results")}
      />
    );
  }

  if (phase === "results") {
    return (
      <Results
        scores={toScores(counts)}
        bachelor={bachelor}
        master={master}
        onRestart={restart}
      />
    );
  }

  const q = QUESTIONS[step];
  const sectionStart = QUESTIONS.findIndex((qn) => qn.section === q.section);
  const sectionTotal = QUESTIONS.filter((qn) => qn.section === q.section).length;
  const sectionStep = step - sectionStart + (answers[step] ? 1 : 0);
  const progress = ((step + (answers[step] ? 1 : 0)) / QUESTIONS.length) * 100;

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 md:py-28">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          {q.section}
        </p>
        <p className="text-sm text-muted-foreground">
          {step + 1} / {QUESTIONS.length}
        </p>
      </div>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {q.section} · {sectionStep} of {sectionTotal}
      </p>

      <h1 className="mt-8 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        {q.question}
      </h1>

      <div className="mt-8 grid gap-3">
        {q.options.map((opt) => {
          const selected = answers[step] === opt.trait;
          return (
            <button
              key={opt.label}
              onClick={() => answer(opt.trait)}
              className={`group flex items-center justify-between rounded-xl border px-5 py-4 text-left text-sm font-medium transition-all duration-200 ${
                selected
                  ? "border-primary bg-primary/5 text-foreground"
                  : "border-border/60 bg-card text-foreground hover:border-primary/30 hover:bg-accent"
              }`}
            >
              {opt.label}
              <ArrowRight
                className={`h-4 w-4 text-primary transition-all duration-200 ${
                  selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              />
            </button>
          );
        })}
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      )}
    </div>
  );
}

function DegreeStep({
  bachelor,
  master,
  onChangeBachelor,
  onChangeMaster,
  onContinue,
  onSkip,
}: {
  bachelor: string;
  master: string;
  onChangeBachelor: (v: string) => void;
  onChangeMaster: (v: string) => void;
  onContinue: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 md:py-28">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Almost there
      </p>
      <h1 className="mt-5 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        What's your degree path?
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Sharing your degrees helps us surface careers that match your academic background.
        This is completely optional — skip if you prefer.
      </p>

      <div className="mt-10 space-y-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Bachelor's degree</label>
          <select
            value={bachelor}
            onChange={(e) => onChangeBachelor(e.target.value)}
            className="rounded-xl border border-border/60 bg-background px-4 py-3 text-sm text-foreground transition-colors hover:border-primary/30 focus:border-primary focus:outline-none"
          >
            <option value="">Select your BSc degree…</option>
            {BACHELORS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Master's degree</label>
          <select
            value={master}
            onChange={(e) => onChangeMaster(e.target.value)}
            className="rounded-xl border border-border/60 bg-background px-4 py-3 text-sm text-foreground transition-colors hover:border-primary/30 focus:border-primary focus:outline-none"
          >
            <option value="">Select your MSc degree…</option>
            {MASTERS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-10 flex items-center gap-4">
        <button
          onClick={onContinue}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
        >
          See my results
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          onClick={onSkip}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Skip
        </button>
      </div>
    </div>
  );
}

function Results({
  scores,
  bachelor,
  master,
  onRestart,
}: {
  scores: Scores;
  bachelor: string;
  master: string;
  onRestart: () => void;
}) {
  const [filter, setFilter] = useState<Category | "All">("All");
  const [active, setActive] = useState<Career | null>(null);

  const ranked = useMemo(() => matchCareers(scores), [scores]);
  const matchMap = useMemo(
    () => Object.fromEntries(ranked.map((r) => [r.career.id, r.match])),
    [ranked],
  );

  const hasDegree = bachelor || master;

  const visible = useMemo(() => {
    let list = ranked.filter((r) => filter === "All" || r.career.category === filter);
    if (hasDegree) {
      list = [
        ...list.filter((r) =>
          (!bachelor || r.career.bachelor.includes(bachelor)) &&
          (!master || r.career.master.includes(master))
        ),
        ...list.filter((r) =>
          !((!bachelor || r.career.bachelor.includes(bachelor)) &&
            (!master || r.career.master.includes(master)))
        ),
      ];
    }
    return list;
  }, [ranked, filter, bachelor, master, hasDegree]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Your Results
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        Careers that match your profile
      </h1>
      {hasDegree && (
        <p className="mt-2 text-sm text-muted-foreground">
          Careers matching your degree path are shown first.{" "}
          {bachelor && <span className="font-medium text-foreground">{bachelor}</span>}
          {bachelor && master && <span className="text-muted-foreground"> + </span>}
          {master && <span className="font-medium text-foreground">{master}</span>}
        </p>
      )}

      {/* Trait summary */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {TRAITS.map((t) => (
          <div key={t} className="rounded-xl border border-border/60 bg-card p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t}
            </p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{scores[t]}%</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="mt-10 flex flex-wrap items-center gap-2">
        {(["All", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-lg border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
              filter === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/60 bg-card text-foreground hover:border-primary/30 hover:bg-accent"
            }`}
          >
            {c}
          </button>
        ))}
        <button
          onClick={onRestart}
          className="ml-auto inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card px-4 py-1.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-accent"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Retake test
        </button>
      </div>

      {/* Career grid */}
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map(({ career, match }) => {
          const degreeMatch = !!hasDegree &&
            (!bachelor || career.bachelor.includes(bachelor)) &&
            (!master || career.master.includes(master));
          return (
            <CareerCard
              key={career.id}
              career={career}
              match={match}
              onOpen={() => setActive(career)}
              degreeMatch={degreeMatch}
            />
          );
        })}
      </div>

      {/* Hybrid paths */}
      <HybridPaths />

      {active && <CareerDetailModal career={active} match={matchMap[active.id]} onClose={() => setActive(null)} />}
    </div>
  );
}

const LEVEL_COLORS: Record<string, string> = {
  CORE: "bg-blue-500/10 text-blue-600",
  ADVANCED: "bg-purple-500/10 text-purple-600",
  FRONTIER: "bg-amber-500/10 text-amber-600",
};

function CareerCard({
  career,
  match,
  onOpen,
  hybrid,
  degreeMatch,
}: {
  career: Career;
  match: number;
  onOpen: () => void;
  hybrid?: boolean;
  degreeMatch?: boolean;
}) {
  return (
    <div className={`group flex flex-col rounded-xl border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${degreeMatch ? "border-primary/40 hover:border-primary/60" : "border-border/60 hover:border-primary/30"}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-medium ${LEVEL_COLORS[career.level] ?? "bg-secondary text-secondary-foreground"}`}>
              {career.level}
            </span>
            {degreeMatch && (
              <span className="inline-flex items-center gap-1 rounded-md bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600">
                Matches your degree
              </span>
            )}
            {hybrid && (
              <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                <Sparkles className="h-3 w-3" />
                Hybrid Path
              </span>
            )}
          </div>
          <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
            {career.title}
          </h3>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-2xl font-semibold text-primary">{match}%</p>
          <p className="text-xs text-muted-foreground">match</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {career.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-border/60 px-2 py-0.5 text-xs text-muted-foreground"
          >
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

function HybridPaths() {
  const [selected, setSelected] = useState(0);
  const path = HYBRID_PATHS[selected];

  return (
    <section className="mt-16 rounded-2xl border border-border/60 bg-card p-6 md:p-8">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        Polimi hybrid degree paths
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Discover careers unlocked by specific BSc + MSc combinations at Politecnico di Milano.
      </p>

      <div className="mt-6 flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Degree combination
        </label>
        <select
          value={selected}
          onChange={(e) => setSelected(Number(e.target.value))}
          className="rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground transition-colors hover:border-primary/30 focus:border-primary focus:outline-none"
        >
          {HYBRID_PATHS.map((h, i) => (
            <option key={i} value={i}>{h.degrees}</option>
          ))}
        </select>
      </div>

      {path && (
        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-start gap-2">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">{path.role}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{path.why}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
