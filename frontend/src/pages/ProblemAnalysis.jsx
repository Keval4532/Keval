import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, Share2, Sparkles, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { analyzeProblem, getLocalProfile } from "../lib/api";
import SignatureFlow from "../components/SignatureFlow";
import AskApex from "../components/AskApex";

import IntelligentLoader from "../components/IntelligentLoader";

export default function ProblemAnalysis() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const query = params.get("q") || "";
  const region = params.get("region") || "";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalysis = useCallback(async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const res = await analyzeProblem(query, getLocalProfile(), region);
      setData(res);
    } catch (e) {
      setError("Something went wrong while researching this.");
    } finally {
      setLoading(false);
    }
  }, [query, region]);

  useEffect(() => {
    fetchAnalysis();
  }, [fetchAnalysis]);

  const handleFollowupClick = (question) => {
    const el = document.getElementById("ask-kevalbio-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Search
        </button>
      </div>

      {loading ? (
        <IntelligentLoader query={query} />
      ) : error ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center space-y-4 max-w-md mx-auto">
          <div className="text-sm font-medium text-white">{error}</div>
          <p className="text-xs text-white/45">
            Please try rephrasing your question or explore related topics.
          </p>
          <button
            onClick={() => navigate("/")}
            className="rounded-xl bg-cyan-400 px-5 py-2.5 text-xs font-semibold text-black hover:scale-105 transition-all"
          >
            Ask another question →
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          <SignatureFlow data={data} onAskFollowup={handleFollowupClick} />

          {/* Ask KevalBio Section */}
          <div id="ask-kevalbio-section" className="pt-6">
            <AskApex
              subject={data.title || query}
              category="Problem Investigation"
              level="intermediate"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
