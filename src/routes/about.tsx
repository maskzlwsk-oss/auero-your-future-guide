import { createFileRoute } from "@tanstack/react-router";
import { Heart, Eye, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Auero" },
      { name: "description", content: "Auero is a student-driven platform built to make college and career guidance accessible to every high school student." },
      { property: "og:title", content: "About Auero" },
      { property: "og:description", content: "Making education guidance accessible to everyone." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold">About <span className="text-primary">Auero</span></h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          A student-driven platform built to make the path through high school — and into college and career — clear, encouraging, and within reach for everyone.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 mb-16">
        <div className="rounded-2xl bg-card border border-border p-8 shadow-[var(--shadow-card)]">
          <Heart className="h-10 w-10 text-accent" />
          <h2 className="mt-4 text-2xl font-bold">Our Mission</h2>
          <p className="mt-3 text-muted-foreground">
            Help every high school student succeed academically, plan their future, and explore careers with confidence — no expensive counselor required.
          </p>
        </div>
        <div className="rounded-2xl bg-card border border-border p-8 shadow-[var(--shadow-card)]">
          <Eye className="h-10 w-10 text-primary" />
          <h2 className="mt-4 text-2xl font-bold">Our Vision</h2>
          <p className="mt-3 text-muted-foreground">
            A world where every student — regardless of zip code or background — has access to clear, modern guidance for their future.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-border p-10 text-center" style={{ background: "var(--gradient-hero)" }}>
        <Users className="h-12 w-12 mx-auto text-accent" />
        <h2 className="mt-4 text-3xl font-bold">The Auero Team</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Built by students, for students. We're a small team of high schoolers and recent grads who wished a guide like this existed when we started — so we built it.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {["Founder", "Engineer", "Designer"].map((r) => (
            <div key={r} className="rounded-2xl bg-background/60 border border-border p-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent mx-auto" />
              <div className="mt-3 font-semibold">Team Member</div>
              <div className="text-xs text-muted-foreground">{r}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}