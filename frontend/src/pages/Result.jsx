import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Bookmark, BookmarkCheck, Share2, AlertOctagon, ArrowLeft, Copy, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { analyzeQuery, saveTopic, getDeviceId, getLocalProfile } from "../lib/api";
import { ScoreGauge, SafetyIndicator } from "../components/primitives";
import ResultTopic from "../components/ResultTopic";
import { ResultSymptom, ResultComparison, ResultLab } from "../components/ResultSpecial";
import AskApex from "../components/AskApex";
import IntelligentLoader from "../components/IntelligentLoader";

const LEVELS = ["beginner", "intermediate", "advanced"];

export default function Result() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const query = params.get("q") || "";
  const level = params.get("level") || "intermediate";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [triggerQuestion, setTriggerQuestion] = useState(null);

  const fetchData = useCallback(async (lvl) => {
    setLoading(true); setError(null);
    try {
      const res = await analyzeQuery(query, lvl, null, getLocalProfile());
      setData(res);
      const savedList = JSON.parse(localStorage.getItem("apex_saved_local") || "[]");
      setSaved(savedList.includes(res.subject));
    } catch (e) {
      setError("Something went wrong while researching this.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => { if (query) fetchData(level); }, [query, level, fetchData]);

  const changeLevel = (l) => setParams({ q: query, level: l });

  const handleSave = async () => {
    if (!data) return;
    try {
      await saveTopic({
        device_id: getDeviceId(), subject: data.subject, category: data.category || "",
        query, query_type: data.query_type || "topic", one_liner: data.one_liner || "",
      });
      const list = JSON.parse(localStorage.getItem("apex_saved_local") || "[]");
      if (!list.includes(data.subject)) list.push(data.subject);
      localStorage.setItem("apex_saved_local", JSON.stringify(list));
      setSaved(true);
      toast.success(`Saved "${data.subject}" to My KEVALBIO`);
    } catch { toast.error("Could not save."); }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true); toast.success("Link copied");
    setTimeout(() => setCopied(false), 1500);
  };

  if (loading) {
    return <IntelligentLoader query={query} />;
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-4">
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-8 max-w-md space-y-3 shadow-sm">
          <div className="text-sm font-bold text-slate-900 dark:text-white">{error}</div>
          <p className="text-xs text-slate-600 dark:text-white/50">Please try rephrasing or check our library.</p>
          <div className="flex justify-center gap-3 pt-2">
            <button data-testid="result-retry" onClick={() => fetchData(level)} className="rounded-xl border border-slate-200 dark:border-white/15 px-4 py-2 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-white/5">Try again</button>
            <button onClick={() => navigate("/")} className="rounded-xl bg-cyan-500 dark:bg-cyan-400 px-4 py-2 text-xs text-white dark:text-black font-bold shadow">Back home</button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;
  const qt = data.query_type;
  const isSymptom = qt === "symptom";
  const isComparison = qt === "comparison";
  const isLab = qt === "lab";

  return (
    <div className="pb-16 text-slate-900 dark:text-white">
      <button data-testid="result-back" onClick={() => navigate("/")} className="mb-4 flex items-center gap-1.5 text-xs text-slate-500 dark:text-white/45 hover:text-slate-900 dark:hover:text-white font-medium font-mono">
        <ArrowLeft className="h-3.5 w-3.5" /> New search
      </button>

      {data.emergency && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/40 bg-red-50 dark:bg-red-500/[0.06] p-4 shadow-sm">
          <AlertOctagon className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
          <div className="text-sm text-red-900 dark:text-red-200">These may be emergency symptoms. Please seek immediate medical care or contact emergency services now.</div>
        </div>
      )}

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col gap-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E141D] p-6 sm:flex-row sm:items-center sm:justify-between shadow-sm">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full border border-cyan-500/30 dark:border-cyan-400/30 bg-cyan-50 dark:bg-cyan-400/10 px-3 py-1 text-[10px] uppercase font-bold tracking-[0.2em] text-cyan-700 dark:text-cyan-400 font-mono">{data.category || qt}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">{data.subject}</h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-white/60 font-normal leading-relaxed">{data.one_liner}</p>
          {data.safety_level && <div className="mt-4"><SafetyIndicator level={data.safety_level} testId="header-safety" /></div>}
        </div>
        <div className="flex shrink-0 items-center gap-6">
          <div className="text-center">
            <ScoreGauge score={data.science_score} />
          </div>
          <div className="flex flex-col gap-2">
            <button data-testid="save-topic-btn" onClick={handleSave}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${saved ? "border-cyan-500 dark:border-cyan-400/40 text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-400/10" : "border-slate-200 dark:border-white/15 text-slate-600 dark:text-white/60 hover:bg-slate-50 dark:hover:bg-white/5"}`}>
              {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}{saved ? "Saved" : "Save"}
            </button>
            <button data-testid="share-btn" onClick={handleShare} className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/15 px-3 py-2 text-xs text-slate-600 dark:text-white/60 hover:bg-slate-50 dark:hover:bg-white/5 font-semibold">
              {copied ? <Check className="h-4 w-4 text-emerald-600 dark:text-cyan-400" /> : <Share2 className="h-4 w-4" />}Share
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick answer + level */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {data.quick_answer && !isSymptom && !isComparison && !isLab && (
          <div className="rounded-2xl border-l-4 border-cyan-500 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-5 sm:max-w-2xl shadow-sm">
            <div className="mb-2 text-[10px] uppercase font-bold tracking-[0.25em] text-cyan-700 dark:text-cyan-400 font-mono">Quick answer</div>
            <p className="text-sm leading-relaxed text-slate-800 dark:text-white/80 font-normal">{data.quick_answer}</p>
          </div>
        )}
        <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
          <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 dark:text-white/40 font-mono">Learning level</div>
          <div className="flex gap-1 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.02] p-1 text-xs shadow-sm">
            {LEVELS.map((l) => (
              <button key={l} data-testid={`result-level-${l}`} onClick={() => changeLevel(l)}
                className={`relative rounded-full px-3.5 py-1.5 capitalize font-bold transition-all ${level === l ? "text-white dark:text-black" : "text-slate-600 dark:text-white/50 hover:text-slate-950 dark:hover:text-white"}`}>
                {level === l && <motion.span layoutId="result-level" className="absolute inset-0 rounded-full bg-cyan-500 dark:bg-cyan-400 shadow" />}
                <span className="relative">{l}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {data.science_score_rationale && (
        <div className="mb-8 flex items-start gap-2 text-xs text-slate-600 dark:text-white/45">
          <span className="mt-0.5 rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-2 py-0.5 uppercase tracking-wider font-mono font-bold">Score rationale</span>
          <span className="max-w-3xl leading-relaxed font-normal">{data.science_score_rationale}</span>
        </div>
      )}

      {data.personalized && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          data-testid="personalized-callout"
          className="mb-8 flex gap-3 rounded-2xl border border-cyan-300 dark:border-cyan-400/30 bg-cyan-50/70 dark:bg-cyan-400/[0.05] p-5 shadow-sm">
          <Sparkles className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-400" />
          <div>
            <div className="mb-1 text-[10px] uppercase font-bold tracking-[0.25em] text-cyan-700 dark:text-cyan-400 font-mono">Tailored for you</div>
            <p className="text-sm leading-relaxed text-slate-800 dark:text-white/85 font-normal">{data.personalized}</p>
          </div>
        </motion.div>
      )}

      {/* Body */}
      {isSymptom ? <ResultSymptom data={data} />
        : isComparison ? <ResultComparison data={data} />
        : isLab ? <ResultLab data={data} />
        : <ResultTopic data={data} onAskFollowup={(fq) => setTriggerQuestion({ question: fq, id: Date.now() })} />}

      {/* Followups */}
      {data.followups?.length > 0 && (
        <div className="mt-10 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6 shadow-sm">
          <div className="mb-3 text-[10px] uppercase font-bold tracking-[0.25em] text-cyan-700 dark:text-cyan-400 font-mono">Related Questions to Explore</div>
          <div className="flex flex-wrap gap-2">
            {data.followups.map((f, i) => (
              <button
                key={i}
                data-testid={`followup-${i}`}
                onClick={() => setTriggerQuestion({ question: f, id: Date.now() })}
                className="rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] px-3.5 py-1.5 text-xs text-slate-800 dark:text-white/70 hover:border-cyan-500 hover:bg-cyan-50 dark:hover:border-cyan-400/40 dark:hover:text-white transition-all shadow-sm font-medium"
              >
                {f} →
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Ask KevalBio Drawer */}
      <AskApex
        subject={data.subject}
        category={data.category || qt}
        level={level}
        triggerQuestion={triggerQuestion}
      />
    </div>
  );
}
