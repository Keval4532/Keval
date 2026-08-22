import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Sparkles, Loader2, Bot } from "lucide-react";
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
  if (!text) return null;
  let clean = text;
  if (typeof clean === "string" && clean.trim().startsWith("{")) {
    try {
      const obj = JSON.parse(clean);
      clean = obj.response || obj.answer || obj.explanation || clean;
    } catch { /* ignore */ }
  }
  const lines = String(clean).split("\n").filter((l) => l.trim() !== "");
  return lines.map((line, i) => {
    const isBullet = /^\s*[-*]\s+/.test(line);
    const content = line.replace(/^\s*[-*]\s+/, "");
    const parts = content.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
      p.startsWith("**") ? <strong key={j} className="text-cyan-300 font-bold">{p.slice(2, -2)}</strong> : p
    );
    return isBullet ? (
      <li key={i} className="ml-4 list-disc text-[#CBD5E1] font-normal leading-relaxed">{parts}</li>
    ) : (
      <p key={i} className="text-[#CBD5E1] font-normal leading-relaxed">{parts}</p>
    );
  });
}

export default function AskApex({ subject, category, level, triggerQuestion }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (triggerQuestion?.question) {
      setOpen(true);
      send(triggerQuestion.question);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerQuestion]);

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
          className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-extrabold text-sm shadow-xl shadow-cyan-500/30 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 font-mono"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Ask KevalBio</span>
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full flex-col border-l border-[#1E293B] bg-[#0E141D] text-[#F8FAFC] shadow-2xl sm:w-[420px]"
            data-testid="ask-apex-panel"
          >
            <div className="flex items-center justify-between border-b border-[#1E293B] px-5 py-4 bg-[#0E141D]">
              <div className="flex items-center gap-2.5">
                <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/30 p-2">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Ask KevalBio Intelligence</div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-cyan-400 font-mono">Topic: {subject}</div>
                </div>
              </div>
              <button
                data-testid="ask-apex-close"
                onClick={() => setOpen(false)}
                className="rounded-xl p-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5 text-sm">
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-[#1E293B] bg-[#141C28] p-4 text-xs text-[#CBD5E1] leading-relaxed shadow-inner">
                    <strong className="text-cyan-300 block mb-1 font-mono uppercase text-[10px] tracking-wider">
                      Interactive Follow-Up Assistant
                    </strong>
                    Ask any question about dosage, whole food sources, contraindications, or human biology mechanisms for <strong className="text-white">{subject}</strong>.
                  </div>
                  <div className="space-y-2">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#64748B] font-mono">Suggested Questions:</div>
                    <div className="flex flex-col gap-1.5">
                      {SUGGESTIONS.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => send(s)}
                          className="rounded-xl border border-[#1E293B] bg-[#141C28]/80 px-3 py-2 text-left text-xs text-slate-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white transition-all shadow-sm"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-cyan-500 text-zinc-950 font-semibold shadow-md shadow-cyan-500/20"
                        : "border border-[#1E293B] bg-[#141C28] text-[#CBD5E1] shadow-md"
                    }`}
                  >
                    {m.role === "user" ? m.content : renderText(m.content)}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Synthesizing physiological response...</span>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="border-t border-[#1E293B] bg-[#0E141D] p-4"
            >
              <div className="flex items-center gap-2 rounded-2xl border border-[#1E293B] bg-[#141C28] px-3 py-2 focus-within:border-cyan-400 focus-within:ring-1 focus-within:ring-cyan-400/30 transition-all">
                <input
                  data-testid="ask-apex-input"
                  type="text"
                  placeholder={`Ask about ${subject}...`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none"
                />
                <button
                  data-testid="ask-apex-send"
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="rounded-xl bg-cyan-500 p-2 text-zinc-950 disabled:opacity-30 hover:bg-cyan-400 transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
