import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Map,
  Compass,
  BookOpen,
  HelpCircle,
  GraduationCap,
  ListChecks,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PoliMiPathways — Find your career path after university" },
      {
        name: "description",
        content:
          "Discover jobs, required skills, and how to get there after graduation.",
      },
      {
        property: "og:title",
        content: "PoliMiPathways — Find your career path after university",
      },
      {
        property: "og:description",
        content:
          "Discover jobs, required skills, and how to get there after graduation.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-20 text-center md:pt-32 md:pb-28">
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Find your career path after university
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Discover jobs, required skills, and how to get there — all in one
          place.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/test"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
          >
            Take the test
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/explore"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:bg-accent hover:text-accent-foreground active:scale-[0.98]"
          >
            Explore by degree
          </Link>
        </div>
      </section>

      {/* How it works Section */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <p className="text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            How it works
          </p>
          <div className="mt-12 flex flex-col items-start gap-8 sm:flex-row sm:items-start">
            <RoadmapStep
              step="01"
              icon={<Map className="h-5 w-5" />}
              title="Choose your path"
              description="Select your degree or field of study to get started."
            />
            <div className="hidden h-px w-full flex-1 translate-y-5 bg-border/60 sm:block" />
            <RoadmapStep
              step="02"
              icon={<Compass className="h-5 w-5" />}
              title="Discover careers"
              description="Explore roles that match your background and interests."
            />
            <div className="hidden h-px w-full flex-1 translate-y-5 bg-border/60 sm:block" />
            <RoadmapStep
              step="03"
              icon={<BookOpen className="h-5 w-5" />}
              title="Learn the skills"
              description="See what skills you need and how to develop them."
            />
            <div className="hidden h-px w-full flex-1 translate-y-5 bg-border/60 sm:block" />
            <RoadmapStep
              step="04"
              icon={<ArrowRight className="h-5 w-5" />}
              title="Ready to apply"
              description="Step into the job market with confidence and a clear plan."
            />
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Built for every step of your journey
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            <UseCaseCard
              icon={<HelpCircle className="h-5 w-5" />}
              title="I don't know what to do after graduation"
              description="Get clarity with a personalized career test and curated recommendations."
              to="/test"
            />
            <UseCaseCard
              icon={<GraduationCap className="h-5 w-5" />}
              title="I'm choosing my master's degree"
              description="Compare how different degrees open doors to specific career paths."
              to="/masters"
            />
            <UseCaseCard
              icon={<ListChecks className="h-5 w-5" />}
              title="I want to understand which skills I need"
              description="Map your current skills to job requirements and close the gaps."
              to="/explore"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-5xl px-6 py-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} PoliMiPathways. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

function RoadmapStep({
  step,
  icon,
  title,
  description,
}: {
  step: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex w-full flex-col items-center text-center sm:w-48 sm:shrink-0">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-secondary text-secondary-foreground">
        {icon}
      </div>
      <span className="mt-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
        {step}
      </span>
      <h3 className="mt-1 text-base font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function UseCaseCard({
  icon,
  title,
  description,
  to,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group flex flex-col rounded-xl border border-border/60 bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-secondary text-secondary-foreground transition-colors duration-200 group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary">
        {icon}
      </div>
      <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Learn more
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
