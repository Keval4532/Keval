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

  const fetchData = useCallback(async (lvl) => {
    setLoading(true); setError(null);
    try {
      const res = await analyzeQuery(query, lvl, null, getLocalProfile());
      setData(res);
      const savedList = JSON.parse(localStorage.getItem("apex_saved_local") || "[]");
      setSaved(savedList.includes(res.subject));
    } catch (e) {
      setError(e?.response?.data?.detail || "Something went wrong generating your answer.");
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
      toast.success(`Saved "${data.subject}"`);
    } catch { toast.error("Could not save."); }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true); toast.success("Link copied");
    setTimeout(() => setCopied(false), 1500);
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <div className="relative"><Loader2 className="h-10 w-10 animate-spin text-cyan-400" /></div>
        <div className="text-center">
          <div className="font-display text-lg">Analyzing "{query}"</div>
          <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/40">Classifying · Retrieving · Structuring · Safety check</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <AlertOctagon className="h-10 w-10 text-yellow-400" />
        <div className="max-w-md text-white/70">{error}</div>
        <div className="flex gap-3">
          <button data-testid="result-retry" onClick={() => fetchData(level)} className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:bg-white/5">Try again</button>
          <button onClick={() => navigate("/")} className="rounded-lg bg-cyan-400 px-4 py-2 text-sm text-black">Back home</button>
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
    <div className="pb-16">
      <button data-testid="result-back" onClick={() => navigate("/")} className="mb-4 flex items-center gap-1.5 text-xs text-white/45 hover:text-white">
        <ArrowLeft className="h-3.5 w-3.5" /> New search
      </button>

      {data.emergency && (
        <div className="mb-6 flex items-start gap-3 border border-red-500/40 bg-red-500/[0.06] p-4">
          <AlertOctagon className="h-5 w-5 shrink-0 text-red-400" />
          <div className="text-sm text-red-200">These may be emergency symptoms. Please seek immediate medical care or contact emergency services now.</div>
        </div>
      )}

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col gap-6 border border-white/10 bg-[#0A0A0A] p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full border border-cyan-400/30 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-400">{data.category || qt}</span>
          </div>
          <h1 className="font-display text-4xl font-light tracking-tight sm:text-5xl">{data.subject}</h1>
          <p className="mt-3 max-w-2xl text-base text-white/60">{data.one_liner}</p>
          {data.safety_level && <div className="mt-4"><SafetyIndicator level={data.safety_level} testId="header-safety" /></div>}
        </div>
        <div className="flex shrink-0 items-center gap-6">
          <div className="text-center">
            <ScoreGauge score={data.science_score} />
          </div>
          <div className="flex flex-col gap-2">
            <button data-testid="save-topic-btn" onClick={handleSave}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition-colors ${saved ? "border-cyan-400/40 text-cyan-400" : "border-white/15 text-white/60 hover:bg-white/5"}`}>
              {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}{saved ? "Saved" : "Save"}
            </button>
            <button data-testid="share-btn" onClick={handleShare} className="flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs text-white/60 hover:bg-white/5">
              {copied ? <Check className="h-4 w-4 text-cyan-400" /> : <Share2 className="h-4 w-4" />}Share
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick answer + level */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {data.quick_answer && !isSymptom && !isComparison && !isLab && (
          <div className="border-l-2 border-cyan-400 bg-white/[0.02] p-5 sm:max-w-2xl">
            <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-cyan-400">Quick answer</div>
            <p className="text-sm leading-relaxed text-white/80">{data.quick_answer}</p>
          </div>
        )}
        <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">Learning level</div>
          <div className="flex gap-1 rounded-full border border-white/10 bg-white/[0.02] p-1 text-xs">
            {LEVELS.map((l) => (
              <button key={l} data-testid={`result-level-${l}`} onClick={() => changeLevel(l)}
                className={`relative rounded-full px-3 py-1.5 capitalize ${level === l ? "text-black" : "text-white/50 hover:text-white"}`}>
                {level === l && <motion.span layoutId="result-level" className="absolute inset-0 rounded-full bg-cyan-400" />}
                <span className="relative">{l}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {data.science_score_rationale && (
        <div className="mb-8 flex items-start gap-2 text-xs text-white/45">
          <span className="mt-0.5 rounded border border-white/10 px-1.5 py-0.5 uppercase tracking-wider">Score rationale</span>
          <span className="max-w-3xl">{data.science_score_rationale}</span>
        </div>
      )}

      {data.personalized && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          data-testid="personalized-callout"
          className="mb-8 flex gap-3 border border-cyan-400/30 bg-cyan-400/[0.05] p-5">
          <Sparkles className="h-5 w-5 shrink-0 text-cyan-400" />
          <div>
            <div className="mb-1 text-[10px] uppercase tracking-[0.25em] text-cyan-400">Tailored for you</div>
            <p className="text-sm leading-relaxed text-white/85">{data.personalized}</p>
          </div>
        </motion.div>
      )}

      {/* Body */}
      {isSymptom ? <ResultSymptom data={data} />
        : isComparison ? <ResultComparison data={data} />
        : isLab ? <ResultLab data={data} />
        : <ResultTopic data={data} />}

      {/* Followups */}
      {data.followups?.length > 0 && (
        <div className="mt-10">
          <div className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/40">Keep exploring</div>
          <div className="flex flex-wrap gap-2">
            {data.followups.map((f, i) => (
              <button key={i} data-testid={`followup-${i}`} onClick={() => navigate(`/result?q=${encodeURIComponent(f)}&level=${level}`)}
                className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-xs text-white/65 hover:border-cyan-400/40 hover:text-white">
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/30">
        KevalBio provides educational information only and is not a substitute for professional medical advice, diagnosis, or treatment.
      </div>

      <AskApex subject={data.subject} category={data.category} level={level} />
    </div>
  );
}
