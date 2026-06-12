import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  X,
  Check,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import {
  QUESTIONS,
  TRAITS,
  CATEGORIES,
  matchCareers,
  toScores,
  BACHELORS,
  MASTERS,
  getHybridCareer,
  type Scores,
  type Trait,
  type Career,
  type Category,
} from "@/lib/careers";

export const Route = createFileRoute("/test")({
  head: () => ({
    meta: [
      { title: "Career Test — Pathway" },
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
  const [finished, setFinished] = useState(false);

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
      else setFinished(true);
    }, 180);
  };

  const restart = () => {
    setStep(0);
    setCounts(emptyScores);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setFinished(false);
  };

  if (finished) {
    return <Results scores={toScores(counts)} onRestart={restart} />;
  }

  const q = QUESTIONS[step];
  const progress = ((step + (answers[step] ? 1 : 0)) / QUESTIONS.length) * 100;

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 md:py-28">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Personality Test
      </p>
      <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Question {step + 1} of {QUESTIONS.length}
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

function Results({ scores, onRestart }: { scores: Scores; onRestart: () => void }) {
  const [filter, setFilter] = useState<Category | "All">("All");
  const [active, setActive] = useState<Career | null>(null);

  const ranked = useMemo(() => matchCareers(scores), [scores]);
  const matchMap = useMemo(
    () => Object.fromEntries(ranked.map((r) => [r.career.id, r.match])),
    [ranked],
  );
  const visible = ranked.filter(
    (r) => filter === "All" || r.career.category === filter,
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Your Results
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        Careers that match your profile
      </h1>

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
        {visible.map(({ career, match }) => (
          <CareerCard
            key={career.id}
            career={career}
            match={match}
            onOpen={() => setActive(career)}
          />
        ))}
      </div>

      {/* Hybrid paths */}
      <HybridPaths matchMap={matchMap} onOpen={setActive} />

      {active && <CareerDetail career={active} match={matchMap[active.id]} onClose={() => setActive(null)} />}
    </div>
  );
}

function CareerCard({
  career,
  match,
  onOpen,
  hybrid,
}: {
  career: Career;
  match: number;
  onOpen: () => void;
  hybrid?: boolean;
}) {
  return (
    <div className="group flex flex-col rounded-xl border border-border/60 bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-block rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
            {career.category}
          </span>
          {hybrid && (
            <span className="ml-2 inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" />
              Hybrid Path
            </span>
          )}
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

function HybridPaths({
  matchMap,
  onOpen,
}: {
  matchMap: Record<string, number>;
  onOpen: (c: Career) => void;
}) {
  const [bachelor, setBachelor] = useState(BACHELORS[0]);
  const [master, setMaster] = useState(MASTERS[0]);
  const hybrid = getHybridCareer(bachelor, master);

  return (
    <section className="mt-16 rounded-2xl border border-border/60 bg-card p-6 md:p-8">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        Explore hybrid paths
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Combine your bachelor's and master's to uncover blended career options.
      </p>

      <div className="mt-6 flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Bachelor
          </label>
          <select
            value={bachelor}
            onChange={(e) => setBachelor(e.target.value)}
            className="rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground transition-colors hover:border-primary/30 focus:border-primary focus:outline-none"
          >
            {BACHELORS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        <span className="pb-2 text-lg text-muted-foreground">+</span>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Master
          </label>
          <select
            value={master}
            onChange={(e) => setMaster(e.target.value)}
            className="rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground transition-colors hover:border-primary/30 focus:border-primary focus:outline-none"
          >
            {MASTERS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        {hybrid ? (
          <div className="max-w-sm">
            <CareerCard
              career={hybrid}
              match={matchMap[hybrid.id] ?? 0}
              onOpen={() => onOpen(hybrid)}
              hybrid
            />
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-border/60 px-4 py-6 text-center text-sm text-muted-foreground">
            No strong hybrid match for this combination yet. Try Design + Business.
          </p>
        )}
      </div>
    </section>
  );
}

function CareerDetail({
  career,
  match,
  onClose,
}: {
  career: Career;
  match: number;
  onClose: () => void;
}) {
  const allSkills = [...career.hardSkills, ...career.softSkills];
  const [have, setHave] = useState<Set<string>>(new Set());
  const missing = allSkills.filter((s) => !have.has(s));

  const toggle = (skill: string) => {
    const next = new Set(have);
    if (next.has(skill)) next.delete(skill);
    else next.add(skill);
    setHave(next);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/30 p-4 backdrop-blur-sm md:p-8"
      onClick={onClose}
    >
      <div
        className="my-auto w-full max-w-2xl rounded-2xl border border-border/60 bg-card p-6 shadow-xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-block rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
              {career.category}
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              {career.title}
            </h2>
            <p className="mt-1 text-sm font-medium text-primary">{match}% match</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          {career.description}
        </p>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-foreground">Daily tasks</h3>
          <ul className="mt-3 space-y-2">
            {career.dailyTasks.map((task) => (
              <li key={task} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" />
                {task}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Skills checklist
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Check the skills you already have.
            </p>
            <div className="mt-3 space-y-2">
              {allSkills.map((skill) => {
                const checked = have.has(skill);
                const isHard = career.hardSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => toggle(skill)}
                    className="flex w-full items-center gap-2.5 rounded-lg border border-border/60 px-3 py-2 text-left text-sm transition-colors hover:border-primary/30"
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                        checked
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border"
                      }`}
                    >
                      {checked && <Check className="h-3 w-3" />}
                    </span>
                    <span className={checked ? "text-muted-foreground line-through" : "text-foreground"}>
                      {skill}
                    </span>
                    <span className="ml-auto text-[10px] uppercase tracking-wide text-muted-foreground">
                      {isHard ? "Hard" : "Soft"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Missing skills ({missing.length})
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Focus your learning here.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {missing.length ? (
                missing.map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {s}
                  </span>
                ))
              ) : (
                <p className="text-sm text-primary">You're all set! 🎉</p>
              )}
            </div>

            <h3 className="mt-6 text-sm font-semibold text-foreground">
              Learning resources
            </h3>
            <div className="mt-3 space-y-2">
              {career.resources.map((r) => (
                <a
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-2 rounded-lg border border-border/60 px-3 py-2 text-sm transition-colors hover:border-primary/30 hover:bg-accent"
                >
                  <span>
                    <span className="font-medium text-foreground">{r.name}</span>
                    <span className="ml-1.5 text-xs text-muted-foreground">{r.provider}</span>
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
