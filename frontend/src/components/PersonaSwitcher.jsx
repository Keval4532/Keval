import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Baby, Microscope, Sparkles, Loader2 } from "lucide-react";
import { getPersonaExplain } from "../lib/api";

const PERSONAS = [
  {
    id: "coach",
    label: "Coach Mode",
    icon: Dumbbell,
    desc: "Practical, motivating, action-focused",
    colorClass: "border-emerald-500 bg-emerald-500/10 text-emerald-300 shadow-lg shadow-emerald-500/10",
    iconColor: "text-emerald-400",
    headerColor: "text-emerald-400"
  },
  {
    id: "five_year_old",
    label: "5-Year-Old Mode",
    icon: Baby,
    desc: "Zero jargon, simple analogies only",
    colorClass: "border-amber-500 bg-amber-500/10 text-amber-300 shadow-lg shadow-amber-500/10",
    iconColor: "text-amber-400",
    headerColor: "text-amber-400"
  },
  {
    id: "biochemist",
    label: "Biochemist Mode",
    icon: Microscope,
    desc: "Receptors, pathways & molecular kinetics",
    colorClass: "border-violet-500 bg-violet-500/10 text-violet-300 shadow-lg shadow-violet-500/10",
    iconColor: "text-violet-400",
    headerColor: "text-violet-400"
  }
];

// Curated high-quality transformations for top topics
const TOPIC_PRESETS = {
  coq10: {
    coach: "CoQ10 is your cellular battery charger. It powers your heart muscles and fights fatigue. If you take statins or train intensely, maintaining optimal levels through sardines, beef, or targeted supplements is key.",
    five_year_old: "Imagine your body has tiny power plants that make energy. CoQ10 is the fuel truck that keeps the lights on!",
    biochemist: "Lipophilic benzoquinone acting as a mobile electron carrier within the inner mitochondrial membrane (Complex I/II to Complex III), driving oxidative phosphorylation."
  },
  "coenzyme q10": {
    coach: "CoQ10 is your cellular battery charger. It powers your heart muscles and fights fatigue. If you take statins or train intensely, maintaining optimal levels through sardines, beef, or targeted supplements is key.",
    five_year_old: "Imagine your body has tiny power plants that make energy. CoQ10 is the fuel truck that keeps the lights on!",
    biochemist: "Lipophilic benzoquinone acting as a mobile electron carrier within the inner mitochondrial membrane (Complex I/II to Complex III), driving oxidative phosphorylation."
  },
  ubiquinol: {
    coach: "Ubiquinol is the active, ready-to-use antioxidant form of CoQ10. It directly recharges mitochondrial energy production, protects your cardiovascular system, and speeds up cellular recovery.",
    five_year_old: "Ubiquinol is the extra-fast superpower version of the fuel truck that helps your heart pump strong and gives you zoom-around energy!",
    biochemist: "Two-electron reduced form of coenzyme Q10 (CoQH2) that acts as a potent chain-breaking antioxidant in biological membranes and lipoproteins, directly scavenging lipid peroxyl radicals."
  },
  creatine: {
    coach: "Creatine is your muscles' high-speed recharge battery. When you're lifting heavy, sprinting, or pushing through intense brainwork, it rapidly regenerates cellular energy (ATP) so you can do more reps and recover faster. Focus on daily consistency (3–5g), stay well-hydrated, and build your base with whole foods like beef or fish.",
    five_year_old: "Imagine your body has tiny rechargeable batteries in your muscles. When you run, jump, or play tag, they run out of juice. Creatine is the super-fast charger that plugs them right back in so you don't feel tired!",
    biochemist: "Intracellular phosphocreatine (PCr) acts as a high-energy phosphate reservoir. Creatine kinase transfers phosphate from PCr to ADP, regenerating ATP in milliseconds during anaerobic glycolytic flux without generating lactate, while increasing cell volumization."
  },
  "vitamin d": {
    coach: "Think of Vitamin D3 as your master hormonal control switch. It directs calcium into your bones, supercharges your immune defense, and keeps your mood stable. Get 15–20 minutes of morning sunlight, eat egg yolks and fatty fish, and test your 25(OH)D levels annually.",
    five_year_old: "Sunshine gives your skin magical sun-power called Vitamin D! It tells your tummy to take strong superhero calcium from your food and build unbreakable bones and teeth.",
    biochemist: "Secosteroid prohormone that undergoes 25-hydroxylation in the liver and 1-alpha-hydroxylation in kidneys to form calcitriol [1,25(OH)2D3], which binds nuclear VDR receptors to regulate over 1,000 genomic transcriptional pathways."
  },
  "vitamin c": {
    coach: "Vitamin C is your body's master repair crew. It drives collagen production for tough joints, skin, and tendons, while protecting cells from everyday stress and helping you absorb iron from whole plant foods. Eat citrus, amla, guava, and bell peppers daily.",
    five_year_old: "Vitamin C is like a shield for your body that fights off bad bugs and helps glue your scrapes and bumps back together when you fall down playing!",
    biochemist: "Water-soluble antioxidant and obligate electron-donor cofactor for prolyl and lysyl hydroxylases in collagen triple-helix biosynthesis and dopamine beta-hydroxylase in catecholamine synthesis."
  },
  iron: {
    coach: "Iron is your body's oxygen delivery truck. Without enough iron, your muscles and brain can't get the oxygen they need to make energy, leaving you wiped out. Focus on real foods—grass-fed meat, lentils, pumpkin seeds, and dark greens paired with vitamin C.",
    five_year_old: "Iron is like tiny red delivery wagons floating in your blood, carrying fresh air from your lungs all the way down to your toes so you can run fast!",
    biochemist: "Central transition metal coordinator within protoporphyrin IX of hemoglobin and myoglobin, and critical redox cofactor in mitochondrial electron transport chain iron-sulfur clusters and cytochromes."
  },
  magnesium: {
    coach: "Magnesium is your biological master relaxer. It powers over 300 enzyme reactions, relaxes tense muscles, soothes your nervous system for deep restorative sleep, and keeps heart rhythm steady. Load up on pumpkin seeds, spinach, dark chocolate, and almonds.",
    five_year_old: "When your muscles are super tight like wound-up rubber bands, magnesium is the gentle helper that tells them to untie, relax, and go to sleep peacefully.",
    biochemist: "Obligate divalent counter-ion (Mg2+) chelated to ATP (Mg-ATP) required for all ATP-dependent phosphotransferase and ATPase enzymes, and natural physiological blocker of NMDA receptor channels."
  },
  ashwagandha: {
    coach: "Ashwagandha is your nervous system's stress shock-absorber. It downregulates cortisol, promotes restful sleep, and supports physical resilience under heavy training or work stress. Take it consistently with dinner.",
    five_year_old: "When your brain and tummy feel worried or super busy, Ashwagandha is like a calm cozy blanket that helps you relax and have sweet dreams.",
    biochemist: "Withanolide glycoside adaptogen modulating hypothalamic-pituitary-adrenal (HPA) axis signaling, downregulating serum cortisol, and enhancing GABAergic neurotransmission."
  }
};

function normalizeTopic(s) {
  return (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function findPreset(subject, persona) {
  const sNorm = normalizeTopic(subject);
  for (const [k, v] of Object.entries(TOPIC_PRESETS)) {
    const kNorm = normalizeTopic(k);
    if (sNorm.includes(kNorm) || kNorm.includes(sNorm)) {
      return v[persona];
    }
  }
  return null;
}

export default function PersonaSwitcher({ subject, context = "", data = null }) {
  const [activePersona, setActivePersona] = useState("coach");
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(false);

  const s = data?.sections || {};

  const getFallbackPersonaText = (pId) => {
    const preset = findPreset(subject, pId);
    if (preset) return preset;

    const topicTitle = subject || "This nutrient";

    if (pId === "five_year_old") {
      return `Imagine your body is like a superhero car. ${topicTitle} is like the special clean fuel that keeps your engine humming! When you eat healthy foods with ${topicTitle}, your body can zoom around all day and sleep happily at night.`;
    }

    if (pId === "biochemist") {
      if (s.what_is_it?.advanced) return s.what_is_it.advanced;
      if (s.mechanism?.summary) return s.mechanism.summary;
      return `${topicTitle} functions as a critical stoichiometric ligand and enzymatic cofactor, modulating receptor kinetics, intracellular signal transduction, and mitochondrial bioenergetics.`;
    }

    // Coach Mode: Practical, motivating, action-oriented plain English
    if (s.what_is_it?.beginner && !s.what_is_it.beginner.includes("lipophilic") && !s.what_is_it.beginner.includes("endogenously")) {
      return `${s.what_is_it.beginner} Focus on real whole foods first, stay consistent, and only supplement when your physical or training demands call for it.`;
    }
    return `${topicTitle} is a cornerstone of your daily energy, muscle recovery, and overall vitality. Keep it simple: anchor your intake with nutrient-dense whole foods, maintain consistent daily sleep and hydration, and only add targeted supplements if your training or diet demands it.`;
  };

  const handleSwitch = async (pId) => {
    setActivePersona(pId);
    if (cache[pId]) return;

    const preset = findPreset(subject, pId);
    if (preset) {
      setCache((prev) => ({ ...prev, [pId]: preset }));
      return;
    }

    setLoading(true);
    try {
      const res = await getPersonaExplain(
        subject,
        pId,
        context || s.what_is_it?.beginner || data?.quick_answer || ""
      );
      if (res && res.explanation && res.explanation.length > 20) {
        setCache((prev) => ({ ...prev, [pId]: res.explanation }));
      } else {
        setCache((prev) => ({ ...prev, [pId]: getFallbackPersonaText(pId) }));
      }
    } catch {
      setCache((prev) => ({ ...prev, [pId]: getFallbackPersonaText(pId) }));
    } finally {
      setLoading(false);
    }
  };

  // On initial mount or topic change, seed Coach mode properly
  useEffect(() => {
    const initialCoach = findPreset(subject, "coach") || getFallbackPersonaText("coach");
    setCache((prev) => ({ ...prev, coach: initialCoach }));
    setActivePersona("coach");
  }, [subject]);

  const currentPersonaConfig = PERSONAS.find((p) => p.id === activePersona) || PERSONAS[0];
  const displayedText = cache[activePersona] || getFallbackPersonaText(activePersona);

  return (
    <div className="rounded-3xl border border-[#1E293B] bg-[#0E141D] p-5 sm:p-6 space-y-4 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
          <Sparkles className="h-4 w-4" />
          <span>Explain It Like... (Adaptive Persona Switcher)</span>
        </div>
        <span className="text-[11px] text-[#64748B] font-mono font-medium">Switch perspective in real-time</span>
      </div>

      {/* Persona Toggle Buttons */}
      <div className="grid grid-cols-3 gap-2">
        {PERSONAS.map((p) => {
          const Icon = p.icon;
          const isAct = activePersona === p.id;
          return (
            <button
              key={p.id}
              onClick={() => handleSwitch(p.id)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 rounded-2xl p-2.5 sm:p-3 text-xs transition-all border ${
                isAct
                  ? `${p.colorClass} font-bold`
                  : "border-[#1E293B] bg-[#141C28] text-slate-400 hover:border-slate-600 hover:text-white"
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${isAct ? p.iconColor : "text-slate-500"}`} />
              <span className="truncate">{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Persona Explanation Box */}
      <div className="min-h-[75px] rounded-2xl border border-[#283548] bg-[#141C28] p-4 text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-normal shadow-inner">
        {loading ? (
          <div className="flex items-center gap-2 text-cyan-400 py-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Adapting explanation for {currentPersonaConfig.label}...</span>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activePersona}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <div className={`text-[10px] font-mono uppercase font-bold tracking-widest ${currentPersonaConfig.headerColor}`}>
                {currentPersonaConfig.desc}:
              </div>
              <p className="leading-relaxed text-[#F8FAFC]/90">{displayedText}</p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
