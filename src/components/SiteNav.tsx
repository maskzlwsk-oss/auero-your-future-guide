import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/college", label: "College" },
  { to: "/careers", label: "Careers" },
  { to: "/study", label: "Study Help" },
  { to: "/ai", label: "Ask Auero AI" },
  { to: "/about", label: "About" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-accent shadow-[var(--shadow-glow)] grid place-items-center font-black text-primary-foreground">
            A
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-primary">Auero</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/60 transition-colors"
              activeProps={{ className: "px-3 py-2 text-sm text-foreground rounded-lg bg-secondary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search..."
              className="pl-9 pr-3 py-2 text-sm rounded-lg bg-secondary/60 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 w-48"
            />
          </div>
        </div>

        <button className="md:hidden p-2 rounded-lg hover:bg-secondary" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 px-6 py-3 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="px-3 py-2 text-sm rounded-lg hover:bg-secondary"
              activeProps={{ className: "px-3 py-2 text-sm rounded-lg bg-secondary text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="text-2xl font-bold text-primary">Auero</div>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            Your AI guide through high school success — plan your future, improve your grades, discover your path.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/college" className="hover:text-primary">College Planning</Link></li>
            <li><Link to="/careers" className="hover:text-primary">Career Paths</Link></li>
            <li><Link to="/study" className="hover:text-primary">Study Help</Link></li>
            <li><Link to="/ai" className="hover:text-primary">Ask Auero AI</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Stay in the loop</h4>
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll keep you posted."); }}>
            <input
              type="email"
              required
              placeholder="you@school.edu"
              className="flex-1 px-3 py-2 text-sm rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Auero. Built for students, by students.
      </div>
    </footer>
  );
}