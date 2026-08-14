import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Sparkles, Loader2 } from "lucide-react";
import { askApex } from "../lib/api";

const SUGGESTIONS = [
  "What happens if I take too much?",
  "What foods contain this?",
  "Does this help muscle growth?",
  "What blood test checks this?",
  "Can I take this at night?",
  "Explain the mechanism like I'm a beginner.",
];

function renderText(text) {
  const lines = text.split("\n").filter((l) => l.trim() !== "");
  return lines.map((line, i) => {
    const isBullet = /^\s*[-*]\s+/.test(line);
    const content = line.replace(/^\s*[-*]\s+/, "");
    const parts = content.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
      p.startsWith("**") ? <strong key={j} className="text-cyan-300">{p.slice(2, -2)}</strong> : p
    );
    return isBullet ? (
      <li key={i} className="ml-4 list-disc text-white/80">{parts}</li>
    ) : (
      <p key={i} className="text-white/80">{parts}</p>
    );
  });
}

export default function AskApex({ subject, category, level }) {
  const [open, setOpen] = useState(false);
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
      const { answer } = await askApex({ subject, category, question: q, level, history });
      setMessages((m) => [...m, { role: "assistant", content: answer }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: "I couldn't reach the engine. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!open && (
        <button
          data-testid="ask-apex-fab"
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-4 z-50 flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-3 text-sm font-medium text-black shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-transform hover:scale-105 md:bottom-6 md:right-6"
        >
          <MessageCircle className="h-4 w-4" /> Ask ApexBio
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="glass fixed bottom-0 right-0 top-0 z-50 flex w-full flex-col border-l border-white/10 sm:w-[420px]"
            data-testid="ask-apex-panel"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <div>
                  <div className="text-sm font-medium">Ask ApexBio</div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/40">About {subject}</div>
                </div>
              </div>
              <button data-testid="ask-apex-close" onClick={() => setOpen(false)} className="text-white/50 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-white/50">Ask a follow-up. I'll keep the context of <span className="text-cyan-300">{subject}</span>.</p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        data-testid={`ask-suggestion-${s.slice(0, 10).replace(/\W/g, "")}`}
                        onClick={() => send(s)}
                        className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-left text-xs text-white/70 transition-colors hover:border-cyan-400/40 hover:text-white"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user" ? "bg-cyan-400 text-black" : "border border-white/10 bg-white/[0.03] space-y-2"
                    }`}
                  >
                    {m.role === "user" ? m.content : renderText(m.content)}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <Loader2 className="h-4 w-4 animate-spin text-cyan-400" /> Thinking…
                </div>
              )}
            </div>

            <div className="border-t border-white/10 p-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black px-3 py-2">
                <input
                  data-testid="ask-apex-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask anything…"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
                />
                <button data-testid="ask-apex-send" onClick={() => send()} disabled={loading} className="text-cyan-400 disabled:opacity-40">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
