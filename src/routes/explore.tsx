import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Paths — Pathway" },
      { name: "description", content: "Explore career paths by degree and interest." },
    ],
  }),
  component: Explore,
});

function Explore() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Explore Paths
      </h1>
      <p className="mt-3 text-muted-foreground">
        Browse careers by degree, industry, and skill set. Coming soon.
      </p>
    </div>
  );
}
