import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Send, Loader2, Layers } from "lucide-react";
import { askCoach, getLocalProfile } from "../lib/api";
import { Markdown } from "../lib/markdown";

const PROMPTS = [
  "Build me a nutrition plan for muscle growth",
  "Help me improve my sleep",
  "How can I increase my protein intake?",
  "What supplements are actually worth taking?",
  "Design a simple routine to lose fat and keep muscle",
  "How should I structure my training week as a beginner?",
];

const TIERS = [
  { t: "Tier 1 — Foundations", d: "Sleep · Nutrition · Hydration · Movement", c: "#00F0FF" },
  { t: "Tier 2 — Training & Recovery", d: "Training · Macros · Recovery · Stress", c: "#00E676" },
  { t: "Tier 3 — Supplements", d: "Optional, only after foundations", c: "#FFEA00" },
];

export default function Coach() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    const history = messages.map((m) => ({ role: m.role, content: m.content }));
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setLoading(true);
    try {
      const { answer } = await askCoach({ question: q, history, profile: getLocalProfile() });
      setMessages((m) => [...m, { role: "assistant", content: answer }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "I couldn't reach the coaching engine. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-9rem)] max-w-3xl flex-col">
      <div className="mb-5">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-cyan-400"><Dumbbell className="h-3.5 w-3.5" /> Keval Coach</div>
        <h1 className="mt-2 font-display text-4xl font-light tracking-tight sm:text-5xl">Your Coach</h1>
        <p className="mt-2 text-sm text-white/50">Practical, personalized routines built foundations-first. Supplements come last, never as a replacement for the basics.</p>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto pr-1">
        {messages.length === 0 && (
          <div className="space-y-5">
            <div className="grid gap-2 sm:grid-cols-3">
              {TIERS.map((tier) => (
                <div key={tier.t} className="border border-white/10 bg-white/[0.02] p-4">
                  <div className="mb-1 flex items-center gap-2 text-xs font-medium" style={{ color: tier.c }}>
                    <Layers className="h-3.5 w-3.5" />{tier.t}
                  </div>
                  <p className="text-xs text-white/50">{tier.d}</p>
                </div>
              ))}
            </div>
            <div>
              <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-white/40">Try asking</div>
              <div className="flex flex-col gap-2">
                {PROMPTS.map((p) => (
                  <button key={p} data-testid={`coach-prompt-${p.slice(0, 10).replace(/\W/g, "")}`} onClick={() => send(p)}
                    className="rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-left text-sm text-white/70 transition-colors hover:border-cyan-400/40 hover:text-white">
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className={`max-w-[90%] rounded-2xl px-4 py-3 ${m.role === "user" ? "bg-cyan-400 text-sm text-black" : "border border-white/10 bg-[#0A0A0A]"}`}>
              {m.role === "user" ? m.content : <Markdown text={m.content} />}
            </motion.div>
          </div>
        ))}
        {loading && <div className="flex items-center gap-2 text-sm text-white/50"><Loader2 className="h-4 w-4 animate-spin text-cyan-400" /> Building your plan…</div>}
      </div>

      <div className="mt-4 flex items-center gap-2 border border-white/10 bg-black px-4 py-3">
        <input data-testid="coach-input" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask your coach anything…" className="w-full bg-transparent text-sm focus:outline-none" />
        <button data-testid="coach-send" onClick={() => send()} disabled={loading} className="text-cyan-400 disabled:opacity-40"><Send className="h-4 w-4" /></button>
      </div>
    </div>
  );
}
