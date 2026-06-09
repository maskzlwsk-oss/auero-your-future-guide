import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Bot, User } from "lucide-react";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: "Ask Auero AI — Your High School Assistant" },
      { name: "description", content: "Chat with Auero AI for college advice, career guidance, and study help — anytime." },
      { property: "og:title", content: "Ask Auero AI" },
      { property: "og:description", content: "Your AI assistant for college, careers, and studying." },
    ],
  }),
  component: AIPage,
});

const suggestions = [
  "What colleges should I apply to?",
  "How do I get into finance?",
  "Help me study for biology",
  "Build me a senior-year timeline",
];

function AIPage() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hey! I'm Auero AI 👋 Ask me anything about college, careers, study habits, or your future plans." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const respond = (q: string) => {
    const lower = q.toLowerCase();
    if (lower.includes("college")) return "Start with a wishlist of 10–15 schools split into reaches, targets, and safeties. Tell me your GPA and interests and I'll suggest specific schools — including Northeast favorites like Vanderbilt or Brown.";
    if (lower.includes("finance")) return "Finance is a great path. Lock in AP Calc + AP Stats, join DECA or an investing club, learn Excel, and grab a summer internship at a local bank or fintech. Want a year-by-year plan?";
    if (lower.includes("biology") || lower.includes("bio")) return "For bio, focus on active recall — Anki flashcards crush rote memorization. Diagram processes by hand and watch Crash Course Bio between chapters. Want a study schedule?";
    if (lower.includes("forensic") || lower.includes("anthropolog")) return "Forensic and biological anthropology paths start with AP Bio + AP Chem and any anthropology elective. Look at NYU, Boston University, and Mercyhurst. Read Stiff by Mary Roach for fun.";
    if (lower.includes("study")) return "Top students use 25-min Pomodoro blocks with phones in another room. Use active recall, not rereading. Teach the concept out loud — if you can explain it, you know it.";
    if (lower.includes("senior")) return "Senior year: Aug–Oct → essays + FAFSA, Nov 1 → ED/EA deadlines, Jan 1 → most RD deadlines, Feb–Mar → scholarships, Apr → compare offers, May 1 → commit. Want me to map it out by week?";
    return `Great question. Here's the short version: break "${q}" into the smallest first step, do that today, and we'll iterate from there. Want me to go deeper on any part?`;
  };

  const send = (text?: string) => {
    const q = (text ?? input).trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: respond(q) }]);
      setTyping(false);
    }, 900);
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <header className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-xs text-primary mb-4">
          <Sparkles className="h-3 w-3" /> Powered by Auero AI
        </div>
        <h1 className="text-4xl md:text-5xl font-bold">Ask Auero AI</h1>
        <p className="mt-3 text-muted-foreground">Your 24/7 advisor for high school, college, and beyond.</p>
      </header>

      <div className="rounded-3xl bg-card border border-border shadow-[var(--shadow-card)] overflow-hidden">
        <div className="h-[480px] overflow-y-auto p-6 flex flex-col gap-4 bg-gradient-to-b from-background/30 to-transparent">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "ai" && (
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${m.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-secondary rounded-bl-sm"}`}>
                {m.text}
              </div>
              {m.role === "user" && (
                <div className="h-8 w-8 rounded-full bg-secondary grid place-items-center flex-shrink-0 border border-border">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          {typing && (
            <div className="flex gap-3 justify-start">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center"><Bot className="h-4 w-4 text-primary-foreground" /></div>
              <div className="px-4 py-3 rounded-2xl bg-secondary text-sm">
                <span className="inline-flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-border p-4 bg-background/40">
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestions.map((s) => (
                <button key={s} onClick={() => send(s)} className="px-3 py-1.5 text-xs rounded-full bg-secondary border border-border hover:border-primary/50 hover:text-primary transition-colors">
                  {s}
                </button>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask Auero anything..."
              className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <button onClick={() => send()} className="px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold inline-flex items-center gap-2 hover:opacity-90 shadow-[var(--shadow-glow)]">
              <Send className="h-4 w-4" /> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}