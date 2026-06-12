import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  head: () => ({
    meta: [
      { title: "Career Test — Pathway" },
      { name: "description", content: "Take the career orientation test." },
    ],
  }),
  component: Test,
});

function Test() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Career Orientation Test
      </h1>
      <p className="mt-3 text-muted-foreground">
        Answer a few questions and discover careers that match your profile. Coming soon.
      </p>
    </div>
  );
}
