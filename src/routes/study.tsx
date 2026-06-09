import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Clock, Sun, Download, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/study")({
  head: () => ({
    meta: [
      { title: "Study Help & Productivity — Auero" },
      { name: "description", content: "Study tips, a homework planner, time management, and a morning routine builder for high school students." },
      { property: "og:title", content: "Study Help & Productivity — Auero" },
      { property: "og:description", content: "Productivity tools and routines built for high school life." },
    ],
  }),
  component: StudyPage,
});

function StudyPage() {
  const [tasks, setTasks] = useState<{ id: number; text: string; done: boolean }[]>([
    { id: 1, text: "Bio Ch. 7 review", done: false },
    { id: 2, text: "AP Lang essay outline", done: false },
  ]);
  const [t, setT] = useState("");
  const add = () => { if (t.trim()) { setTasks([...tasks, { id: Date.now(), text: t.trim(), done: false }]); setT(""); } };

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <header className="text-center mb-16">
        <BookOpen className="h-12 w-12 mx-auto text-primary" />
        <h1 className="mt-4 text-4xl md:text-5xl font-bold">Study Help & Productivity</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Real tools and routines that fit the chaos of high school life.</p>
      </header>

      <section className="grid gap-6 md:grid-cols-3 mb-16">
        {[
          { title: "Study Smarter", tips: ["Active recall > rereading", "Use spaced repetition (Anki)", "Teach the concept out loud", "Study in 25-min focused blocks"] },
          { title: "Time Management", tips: ["Use a weekly time-block calendar", "Eat the frog: hardest task first", "Batch similar tasks together", "Protect a screen-free hour daily"] },
          { title: "Stay Sharp", tips: ["8 hours of sleep, every night", "Hydrate before caffeine", "Exercise = better grades", "Take real breaks (no phone)"] },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl bg-card border border-border p-6">
            <h3 className="text-lg font-bold text-primary">{c.title}</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {c.tips.map((x) => <li key={x}>• {x}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="rounded-3xl bg-card border border-border p-8 md:p-10 mb-16">
        <h3 className="text-2xl font-bold flex items-center gap-2"><Clock className="h-6 w-6 text-accent" /> Homework Planner</h3>
        <p className="mt-2 text-sm text-muted-foreground">A quick today-list. Add tasks, knock them out.</p>
        <div className="mt-6 flex gap-2">
          <input value={t} onChange={(e) => setT(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Add a task..." className="flex-1 px-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <button onClick={add} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium inline-flex items-center gap-1"><Plus className="h-4 w-4" /> Add</button>
        </div>
        <ul className="mt-6 space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
              <input type="checkbox" checked={task.done} onChange={() => setTasks(tasks.map(x => x.id === task.id ? { ...x, done: !x.done } : x))} className="h-4 w-4 accent-primary" />
              <span className={`flex-1 text-sm ${task.done ? "line-through text-muted-foreground" : ""}`}>{task.text}</span>
              <button onClick={() => setTasks(tasks.filter(x => x.id !== task.id))} className="p-1 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </li>
          ))}
          {tasks.length === 0 && <p className="text-sm text-center text-muted-foreground py-6">All clear. Go enjoy your day.</p>}
        </ul>
      </section>

      <section className="rounded-3xl border border-border p-8 md:p-10 mb-16" style={{ background: "var(--gradient-hero)" }}>
        <h3 className="text-2xl font-bold flex items-center gap-2"><Sun className="h-6 w-6 text-accent" /> Morning Routine Builder</h3>
        <p className="mt-2 text-sm text-muted-foreground">A balanced template for school + workouts + work + sports.</p>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {[
            ["5:30 AM", "Wake up + hydrate"],
            ["5:45 AM", "Workout (lift / run / yoga)"],
            ["6:45 AM", "Shower + breakfast"],
            ["7:15 AM", "Review goals + commute"],
            ["8:00 AM", "School day starts"],
            ["3:30 PM", "Practice / sports / work"],
            ["6:00 PM", "Dinner + family time"],
            ["7:00 PM", "Homework block (90 min)"],
            ["9:00 PM", "Wind down — read, no screens"],
            ["10:00 PM", "Lights out"],
          ].map(([time, what]) => (
            <div key={time} className="flex items-center gap-4 rounded-xl bg-background/60 border border-border p-4">
              <div className="text-primary font-bold w-20 text-sm">{time}</div>
              <div className="text-sm">{what}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {["Weekly Planner", "Study Tracker", "College App Checklist"].map((n) => (
          <a key={n} href="#" onClick={(e) => { e.preventDefault(); alert("Template coming soon!"); }}
            className="rounded-2xl bg-card border border-border p-6 hover:border-primary/50 transition-all flex items-center justify-between">
            <span className="font-semibold">{n}</span>
            <Download className="h-5 w-5 text-primary" />
          </a>
        ))}
      </section>
    </div>
  );
}