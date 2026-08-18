import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, Check, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { submitFeedback, getDeviceId } from "../lib/api";

const REASONS = [
  "Too complicated",
  "Too much information",
  "Not personalized enough",
  "I wanted practical advice",
  "I wanted more scientific detail",
  "Something else"
];

export default function FeedbackWidget({ query }) {
  const [voted, setVoted] = useState(null); // true | false
  const [selectedReason, setSelectedReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleVote = async (helpful) => {
    setVoted(helpful);
    if (helpful) {
      setSubmitted(true);
      await submitFeedback({ device_id: getDeviceId(), helpful: true, query });
      toast.success("Thank you for your feedback!");
    }
  };

  const handleReasonSubmit = async (reason) => {
    setSelectedReason(reason);
    setSubmitted(true);
    await submitFeedback({
      device_id: getDeviceId(),
      helpful: false,
      query,
      reason
    });
    toast.success("Thank you! We'll use this to improve.");
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/[0.01] p-4 text-xs text-white/50">
        <Check className="h-4 w-4 text-emerald-400" />
        <span>Thank you for helping make KEVALBIO better.</span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-3 text-center sm:text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <span className="text-xs font-medium text-white/90">Was this helpful?</span>
          <span className="block text-[11px] text-white/40">Your feedback keeps KEVALBIO honest and clear.</span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handleVote(true)}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-white/70 hover:border-emerald-400/50 hover:bg-emerald-400/10 hover:text-emerald-300 transition-all"
          >
            <ThumbsUp className="h-3.5 w-3.5" /> Yes
          </button>
          <button
            onClick={() => handleVote(false)}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-white/70 hover:border-yellow-400/50 hover:bg-yellow-400/10 hover:text-yellow-300 transition-all"
          >
            <ThumbsDown className="h-3.5 w-3.5" /> Not really
          </button>
        </div>
      </div>

      {voted === false && (
        <div className="pt-3 border-t border-white/10 space-y-2">
          <div className="text-xs text-white/60">What was missing?</div>
          <div className="flex flex-wrap gap-1.5">
            {REASONS.map((r) => (
              <button
                key={r}
                onClick={() => handleReasonSubmit(r)}
                className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] text-white/70 hover:border-cyan-400/40 hover:text-white transition-colors"
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
