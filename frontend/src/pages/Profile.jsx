import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserRound, Save, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { saveProfile, getProfile, getDeviceId } from "../lib/api";

const GOALS = [
  "Muscle growth", "Fat loss", "Energy", "Sleep", "Cognitive performance",
  "General health", "Athletic performance", "Longevity", "Correct a deficiency", "Understand my labs",
];
const ACTIVITY = ["Sedentary", "Lightly active", "Moderately active", "Very active", "Athlete"];
const DIETS = ["Omnivore", "Vegetarian", "Vegan", "Pescatarian", "Keto / low-carb", "Mediterranean", "No preference"];
const SEX = ["Male", "Female", "Prefer not to say"];

const EMPTY = { goal: "", age: "", sex: "", height: "", weight: "", activity_level: "", training_days: "", diet: "" };

export default function Profile() {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProfile(getDeviceId()).then((p) => { if (p && Object.keys(p).length) setForm({ ...EMPTY, ...p, device_id: undefined }); }).catch(() => {});
  }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    try {
      const payload = { device_id: getDeviceId(), ...form };
      delete payload.device_id2;
      await saveProfile(payload);
      localStorage.setItem("apex_profile", JSON.stringify(form));
      toast.success("Profile saved — your topics and coach are now tailored");
    } catch { toast.error("Could not save profile"); } finally { setSaving(false); }
  };

  const Select = ({ label, k, options, testId }) => (
    <div>
      <label className="mb-1.5 block text-xs text-white/50">{label}</label>
      <select data-testid={testId} value={form[k] || ""} onChange={(e) => set(k, e.target.value)}
        className="w-full appearance-none border border-white/10 bg-black px-3 py-2.5 text-sm text-white focus:border-cyan-400/50 focus:outline-none">
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-cyan-400"><UserRound className="h-3.5 w-3.5" /> Goal profile</div>
        <h1 className="mt-2 font-display text-4xl font-light tracking-tight sm:text-5xl">Your Profile</h1>
        <p className="mt-2 text-sm text-white/50">Optional. When set, KevalBio adds a "Tailored for you" note to every topic and personalizes your coach routines.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="border border-white/10 bg-[#0A0A0A] p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Select label="Primary goal" k="goal" options={GOALS} testId="profile-goal" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-white/50">Age</label>
            <input data-testid="profile-age" type="number" min="0" value={form.age} onChange={(e) => set("age", e.target.value)}
              placeholder="e.g. 28" className="w-full border border-white/10 bg-black px-3 py-2.5 text-sm focus:border-cyan-400/50 focus:outline-none" />
          </div>
          <Select label="Sex" k="sex" options={SEX} testId="profile-sex" />
          <div>
            <label className="mb-1.5 block text-xs text-white/50">Height (cm)</label>
            <input data-testid="profile-height" type="number" min="0" value={form.height} onChange={(e) => set("height", e.target.value)}
              placeholder="e.g. 178" className="w-full border border-white/10 bg-black px-3 py-2.5 text-sm focus:border-cyan-400/50 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-white/50">Weight (kg)</label>
            <input data-testid="profile-weight" type="number" min="0" value={form.weight} onChange={(e) => set("weight", e.target.value)}
              placeholder="e.g. 75" className="w-full border border-white/10 bg-black px-3 py-2.5 text-sm focus:border-cyan-400/50 focus:outline-none" />
          </div>
          <Select label="Activity level" k="activity_level" options={ACTIVITY} testId="profile-activity" />
          <div>
            <label className="mb-1.5 block text-xs text-white/50">Training days / week</label>
            <input data-testid="profile-training-days" type="number" min="0" max="7" value={form.training_days} onChange={(e) => set("training_days", e.target.value)}
              placeholder="e.g. 4" className="w-full border border-white/10 bg-black px-3 py-2.5 text-sm focus:border-cyan-400/50 focus:outline-none" />
          </div>
          <div className="sm:col-span-2">
            <Select label="Dietary pattern" k="diet" options={DIETS} testId="profile-diet" />
          </div>
        </div>

        <button data-testid="profile-save" onClick={save} disabled={saving}
          className="mt-6 flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50">
          <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save profile"}
        </button>
      </motion.div>

      <div className="mt-4 flex items-start gap-2 text-xs text-white/40">
        <Sparkles className="mt-0.5 h-3.5 w-3.5 text-cyan-400" />
        We never use this for diagnosis. It only tailors educational framing and coaching suggestions.
      </div>
    </div>
  );
}
