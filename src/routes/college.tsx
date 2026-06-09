import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, GraduationCap, MapPin, Plus, X, Send } from "lucide-react";

export const Route = createFileRoute("/college")({
  head: () => ({
    meta: [
      { title: "College Planning — Auero" },
      { name: "description", content: "Year-by-year college planning roadmap, GPA tips, SAT/ACT prep, and a college list builder for high school students." },
      { property: "og:title", content: "College Planning — Auero" },
      { property: "og:description", content: "Your step-by-step roadmap from freshman year to college acceptance." },
    ],
  }),
  component: CollegePage,
});

const roadmap = [
  { year: "Freshman", color: "text-accent", items: ["Build strong study habits", "Explore 2–3 extracurriculars", "Aim for a 3.5+ GPA", "Start a brag sheet of achievements"] },
  { year: "Sophomore", color: "text-primary", items: ["Take the PSAT for practice", "Pick honors/AP classes wisely", "Deepen leadership in clubs", "Start visiting nearby colleges"] },
  { year: "Junior", color: "text-accent", items: ["Take SAT/ACT (and retake!)", "Build your college list (10–15)", "Ask teachers for recs early", "Plan summer programs"] },
  { year: "Senior", color: "text-primary", items: ["Polish your essays", "Apply Early Action/ED if right", "Submit FAFSA in October", "Compare offers, commit by May 1"] },
];

const northeastColleges = [
  "Harvard University", "Yale University", "Princeton University", "Columbia University",
  "MIT", "Brown University", "Cornell University", "Dartmouth", "UPenn",
  "Vanderbilt University", "Boston University", "NYU", "Northeastern", "Tufts",
];

function CollegePage() {
  const [list, setList] = useState<string[]>(["Vanderbilt University", "Brown University"]);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hi! I'm your AI College Advisor. Ask me anything — essays, school fit, financial aid, anything." },
  ]);
  const [msg, setMsg] = useState("");

  const add = () => {
    if (input.trim() && !list.includes(input.trim())) {
      setList([...list, input.trim()]);
      setInput("");
    }
  };

  const send = () => {
    if (!msg.trim()) return;
    const userMsg = msg.trim();
    setChat((c) => [...c, { role: "user", text: userMsg }]);
    setMsg("");
    setTimeout(() => {
      setChat((c) => [...c, {
        role: "ai",
        text: `Great question about "${userMsg}". Here's my take: focus on what makes you uniquely you — colleges admit students, not stats. Want me to break it down further?`
      }]);
    }, 700);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <header className="text-center mb-16">
        <GraduationCap className="h-12 w-12 mx-auto text-primary" />
        <h1 className="mt-4 text-4xl md:text-5xl font-bold">College Planning</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          A clear, year-by-year roadmap — from your first day of freshman year to your college acceptance letter.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-20">
        {roadmap.map((y, i) => (
          <div key={y.year} className="rounded-2xl bg-card border border-border p-6 hover:border-primary/50 transition-all shadow-[var(--shadow-card)]">
            <div className="text-xs text-muted-foreground">Year {i + 1}</div>
            <h3 className={`text-2xl font-bold ${y.color}`}>{y.year}</h3>
            <ul className="mt-4 space-y-2">
              {y.items.map((it) => (
                <li key={it} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-2 mb-20">
        <div className="rounded-2xl bg-card border border-border p-8">
          <h3 className="text-xl font-bold text-primary">GPA Tracking Tips</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>• Track both weighted and unweighted GPA every semester.</li>
            <li>• Don't burn out — choose AP courses you can actually ace.</li>
            <li>• A rising trend matters more than a flat 4.0 in easy classes.</li>
            <li>• Office hours = free grade boost.</li>
          </ul>
        </div>
        <div className="rounded-2xl bg-card border border-border p-8">
          <h3 className="text-xl font-bold text-accent">SAT / ACT Prep</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>• Take a free Khan Academy diagnostic first.</li>
            <li>• Practice 30 minutes a day beats cramming every time.</li>
            <li>• Most students improve 100+ points on a retake.</li>
            <li>• Many top schools are still test-optional — know your odds.</li>
          </ul>
        </div>
      </section>

      <section className="rounded-3xl bg-card border border-border p-8 md:p-10 mb-20">
        <h3 className="text-2xl font-bold flex items-center gap-2"><MapPin className="h-6 w-6 text-primary" /> College List Builder</h3>
        <p className="mt-2 text-sm text-muted-foreground">Build your list of reach, target, and safety schools. Focus on Northeast & top-tier options.</p>
        <div className="mt-6 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Add a college (e.g. Cornell University)"
            className="flex-1 px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button onClick={add} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium inline-flex items-center gap-1 hover:opacity-90">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {list.map((c) => (
            <span key={c} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-sm">
              {c}
              <button onClick={() => setList(list.filter((x) => x !== c))} aria-label="Remove">
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </span>
          ))}
        </div>
        <div className="mt-8">
          <h4 className="text-sm font-semibold text-muted-foreground mb-3">Popular Northeast picks:</h4>
          <div className="flex flex-wrap gap-2">
            {northeastColleges.map((c) => (
              <button
                key={c}
                onClick={() => !list.includes(c) && setList([...list, c])}
                className="px-3 py-1 text-xs rounded-full bg-secondary border border-border hover:border-primary/50 hover:text-primary transition-colors"
              >
                + {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-border p-8 md:p-10" style={{ background: "var(--gradient-hero)" }}>
        <h3 className="text-2xl font-bold">AI College Advisor</h3>
        <p className="mt-1 text-sm text-muted-foreground">Get instant guidance on schools, essays, and applications.</p>
        <div className="mt-6 rounded-2xl bg-background/80 border border-border p-4 h-72 overflow-y-auto flex flex-col gap-3">
          {chat.map((m, i) => (
            <div key={i} className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${m.role === "user" ? "self-end bg-primary text-primary-foreground" : "self-start bg-secondary"}`}>
              {m.text}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask about a school, essay topic, scholarship..."
            className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button onClick={send} className="px-4 py-3 rounded-lg bg-primary text-primary-foreground inline-flex items-center gap-1 hover:opacity-90">
            <Send className="h-4 w-4" /> Send
          </button>
        </div>
      </section>
    </div>
  );
}