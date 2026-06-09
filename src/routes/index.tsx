import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap, Compass, BookOpen, Sparkles, Target, Brain, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Auero — Your High School Success AI Guide" },
      { name: "description", content: "Plan your future, improve your grades, and discover your path with Auero, the AI guide built for high school students." },
      { property: "og:title", content: "Auero — Your High School Success AI Guide" },
      { property: "og:description", content: "Plan your future, improve your grades, and discover your path." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden>
          <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-accent blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/60 border border-border text-xs text-muted-foreground mb-6">
            <Sparkles className="h-3 w-3 text-accent" /> AI-powered guidance for high schoolers
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05]">
            Welcome to <span className="text-primary">Auero</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Your High School Success AI Guide
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Plan your future. Improve your grades. Discover your path.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/ai" className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-[var(--shadow-glow)] hover:scale-[1.03] transition-transform">
              Get Started <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/careers" className="px-6 py-3 rounded-xl bg-secondary border border-border font-semibold hover:bg-secondary/70 transition-colors">
              Explore Careers
            </Link>
            <Link to="/college" className="px-6 py-3 rounded-xl bg-secondary border border-border font-semibold hover:bg-secondary/70 transition-colors">
              College Guide
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-6 -mt-16 relative z-10">
        <div className="rounded-3xl bg-card border border-border p-8 md:p-12 shadow-[var(--shadow-card)]">
          <h2 className="text-2xl md:text-3xl font-bold">What is Auero?</h2>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            Auero helps high school students plan their future, improve academics, and explore careers — from picking the right
            classes today to landing at a dream college tomorrow. Think of it as a personal counselor that never sleeps.
          </p>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Everything you need, in one place</h2>
          <p className="mt-3 text-muted-foreground">Built specifically for the high school journey.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: GraduationCap, title: "College Planning", desc: "Year-by-year roadmap from freshman to senior year.", to: "/college", color: "text-primary" },
            { icon: Compass, title: "Career Exploration", desc: "Finance, biology, forensics, engineering, and more.", to: "/careers", color: "text-accent" },
            { icon: BookOpen, title: "Study Help", desc: "Tips, planners, and routines to crush your classes.", to: "/study", color: "text-primary" },
            { icon: Brain, title: "Ask Auero AI", desc: "Chat with your AI advisor anytime.", to: "/ai", color: "text-accent" },
          ].map((f) => (
            <Link
              key={f.title}
              to={f.to}
              className="group rounded-2xl bg-card border border-border p-6 hover:border-primary/50 hover:-translate-y-1 transition-all shadow-[var(--shadow-card)]"
            >
              <f.icon className={`h-10 w-10 ${f.color}`} />
              <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              <div className="mt-4 inline-flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ArrowRight className="ml-1 h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-3xl border border-border p-10 md:p-16 grid gap-8 md:grid-cols-3 text-center" style={{ background: "var(--gradient-hero)" }}>
          {[
            { icon: Target, num: "4 yrs", label: "Of guided high school planning" },
            { icon: TrendingUp, num: "100+", label: "Career paths to explore" },
            { icon: Sparkles, num: "24/7", label: "AI advisor at your fingertips" },
          ].map((s) => (
            <div key={s.label}>
              <s.icon className="h-8 w-8 mx-auto text-accent" />
              <div className="mt-3 text-4xl font-black text-primary">{s.num}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
