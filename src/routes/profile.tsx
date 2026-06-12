import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Pathway" },
      { name: "description", content: "Your career profile and saved paths." },
    ],
  }),
  component: Profile,
});

function Profile() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Profile
      </h1>
      <p className="mt-3 text-muted-foreground">
        View your results, saved careers, and progress. Coming soon.
      </p>
    </div>
  );
}
