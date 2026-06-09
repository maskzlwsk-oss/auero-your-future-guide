import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Briefcase, Microscope, Stethoscope, Cpu, TrendingUp, Lightbulb, X } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Career Exploration — Auero" },
      { name: "description", content: "Explore finance, biology, forensics, engineering, medicine, and entrepreneurship careers — and learn the high school steps to get there." },
      { property: "og:title", content: "Career Exploration — Auero" },
      { property: "og:description", content: "Discover the high school steps to launch your dream career." },
    ],
  }),
  component: CareersPage,
});

type Career = {
  title: string; icon: typeof Briefcase; color: string;
  what: string; education: string; salary: string; steps: string[];
};

const careers: Career[] = [
  { title: "Finance", icon: TrendingUp, color: "text-primary",
    what: "Managing money, investments, and capital for individuals, companies, and markets.",
    education: "Bachelor's in Finance, Economics, or Math. MBA or CFA for advanced roles.",
    salary: "$70k–$300k+",
    steps: ["Take AP Calculus & AP Statistics", "Join DECA or an investing club", "Learn Excel & basic Python", "Intern at a local bank or fintech"] },
  { title: "Biology & Forensic Science", icon: Microscope, color: "text-accent",
    what: "Investigating crime scenes, studying human origins, and applying biology to legal questions — includes biological anthropology.",
    education: "Bachelor's in Biology, Forensic Science, or Anthropology. Often a Master's or PhD.",
    salary: "$55k–$120k",
    steps: ["Take AP Bio & AP Chem", "Join a science research club", "Read Mary Roach's Stiff", "Shadow a forensic lab or museum"] },
  { title: "Engineering", icon: Cpu, color: "text-primary",
    what: "Designing and building everything from bridges to apps to spacecraft.",
    education: "Bachelor's in Engineering (Mechanical, Electrical, Software, Civil, etc.).",
    salary: "$75k–$180k",
    steps: ["Take Physics + AP Calc", "Build personal projects (coding, robotics)", "Join FIRST Robotics", "Attend a summer engineering camp"] },
  { title: "Medicine", icon: Stethoscope, color: "text-accent",
    what: "Diagnosing, treating, and preventing illness — from family doctors to surgeons.",
    education: "Bachelor's + Medical School (MD/DO) + Residency. 10+ years total.",
    salary: "$200k–$500k+",
    steps: ["Volunteer at a hospital", "Take AP Bio & AP Chem", "Get healthcare exposure (EMT, CNA)", "Build a strong GPA — 3.8+"] },
  { title: "Business & Entrepreneurship", icon: Briefcase, color: "text-primary",
    what: "Starting and running companies — from solo founders to corporate leaders.",
    education: "Often a Bachelor's in Business; many founders skip or take alternate paths.",
    salary: "Variable — $50k to multi-millions",
    steps: ["Start a side hustle now", "Take economics & marketing courses", "Read founder biographies", "Join YEA! or a startup program"] },
  { title: "Tech & Innovation", icon: Lightbulb, color: "text-accent",
    what: "Building products, designing AI systems, and creating the digital tools of tomorrow.",
    education: "Bachelor's in CS, Design, or self-taught with a portfolio.",
    salary: "$90k–$300k+",
    steps: ["Learn to code (Python or JS)", "Build a portfolio on GitHub", "Compete in hackathons", "Take AP CS"] },
];

function CareersPage() {
  const [open, setOpen] = useState<Career | null>(null);
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <header className="text-center mb-16">
        <Briefcase className="h-12 w-12 mx-auto text-primary" />
        <h1 className="mt-4 text-4xl md:text-5xl font-bold">Career Exploration</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Click any path to see what it really takes — education, salary, and the steps you can start in high school.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {careers.map((c) => (
          <button key={c.title} onClick={() => setOpen(c)}
            className="text-left rounded-2xl bg-card border border-border p-6 hover:border-primary/50 hover:-translate-y-1 transition-all shadow-[var(--shadow-card)]">
            <c.icon className={`h-10 w-10 ${c.color}`} />
            <h3 className="mt-4 text-xl font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{c.what}</p>
            <div className="mt-4 text-xs text-primary">Click to explore →</div>
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <div onClick={(e) => e.stopPropagation()} className="max-w-2xl w-full rounded-2xl bg-card border border-border p-8 shadow-[var(--shadow-glow)] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <open.icon className={`h-8 w-8 ${open.color}`} />
                <h2 className="text-2xl font-bold">{open.title}</h2>
              </div>
              <button onClick={() => setOpen(null)} className="p-1 rounded-lg hover:bg-secondary"><X className="h-5 w-5" /></button>
            </div>
            <dl className="mt-6 space-y-4 text-sm">
              <div><dt className="text-xs uppercase text-muted-foreground">What it is</dt><dd className="mt-1">{open.what}</dd></div>
              <div><dt className="text-xs uppercase text-muted-foreground">Education required</dt><dd className="mt-1">{open.education}</dd></div>
              <div><dt className="text-xs uppercase text-muted-foreground">Salary range</dt><dd className="mt-1 text-accent font-semibold">{open.salary}</dd></div>
              <div>
                <dt className="text-xs uppercase text-muted-foreground mb-2">High school steps</dt>
                <ul className="space-y-1">
                  {open.steps.map((s) => <li key={s} className="flex gap-2"><span className="text-primary">→</span> {s}</li>)}
                </ul>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}