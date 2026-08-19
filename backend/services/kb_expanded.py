"""Expanded High-Yield Scientific Knowledge Profiles for KEVALBIO.
Contains verified biochemistry profiles for Calcium, L-Theanine, CoQ10, Melatonin,
Boron, L-Citrulline, Beta-Alanine, Alpha-GPC, Glutamine, Caffeine, Vitamin K2,
NAC, Berberine, Curcumin, Testosterone, Cortisol, Insulin, Thyroid, Folate, and Vitamin B6.
"""
from typing import Dict, Any

EXPANDED_PROFILES: Dict[str, Dict[str, Any]] = {
    # -----------------------------------------------------------------
    # CALCIUM
    # -----------------------------------------------------------------
    "calcium": {
        "subject": "Calcium",
        "category": "Minerals",
        "query_type": "mineral",
        "one_liner": "The most abundant mineral in the human body, serving as the structural crystal matrix of bones and teeth and an essential messenger for excitation-contraction coupling.",
        "science_score": 98,
        "science_score_rationale": "Over a century of human clinical trials, bone mineral density RCTs, and established calcium-sensing receptor (CaSR) physiology.",
        "safety_level": "yellow",
        "quick_answer": "Calcium (Ca2+) comprises ~1-2% of adult body weight (99% stored as hydroxyapatite crystals in bone and teeth). The remaining 1% ionized serum calcium is homeostatically regulated by Parathyroid Hormone (PTH), Calcitriol (Vitamin D), and Calcitonin to drive muscle actin-myosin contraction, neuronal action potentials, and coagulation cascades.",
        "followups": [
            "Why is Vitamin K2 (MK-7) essential when taking Calcium?",
            "What is the difference between Calcium Citrate and Calcium Carbonate?",
            "What is the clinical risk of arterial calcification from excess calcium?",
            "What are the best non-dairy, bioavailable food sources of calcium?"
        ],
        "sections": {
            "what_is_it": {
                "beginner": "Calcium is a vital mineral that builds and protects strong bones and teeth, helps your muscles contract, and keeps your heart beating normally.",
                "advanced": "Calcium (Ca2+) acts as a universal intracellular second messenger and extracellular structural mineral. Bone serves as a dynamic metabolic reservoir, continuously remodeled through osteoclast resorption and osteoblast mineral deposition governed by PTH and 1,25(OH)2D3."
            },
            "why_important": [
                {"title": "Bone Hydroxyapatite Crystal Matrix", "evidence": "strong", "detail": "Combines with phosphorus to form crystalline hydroxyapatite [Ca10(PO4)6(OH)2], providing compressive mechanical strength to the skeleton."},
                {"title": "Muscular Excitation-Contraction Coupling", "evidence": "strong", "detail": "Action potential depolarizes the sarcolemma, triggering Ryanodine receptor Ca2+ release from sarcoplasmic reticulum to bind Troponin C and uncover actin binding sites."},
                {"title": "Blood Coagulation Cascade (Factor IV)", "evidence": "strong", "detail": "Obligatory cofactor facilitating the assembly of clotting factor tenase and prothrombinase enzyme complexes on platelet phospholipid membranes."},
                {"title": "Neurotransmitter Exocytosis", "evidence": "strong", "detail": "Presynaptic voltage-gated calcium influx triggers synaptotagmin activation, driving neurotransmitter vesicle fusion and synaptic cleft release."}
            ],
            "affects": [
                {"system": "Bones & Teeth", "level": "primary", "detail": "Maintains skeletal density and resistance to osteoporotic micro-fractures."},
                {"system": "Muscles", "level": "primary", "detail": "Permits voluntary muscular force generation and cardiac myocyte contraction."},
                {"system": "Heart & Vascular", "level": "primary", "detail": "Drives Phase 2 plateau phase of cardiac action potential and regulates vascular tone."},
                {"system": "Nervous System", "level": "secondary", "detail": "Governs presynaptic vesicle exocytosis and membrane excitability."}
            ],
            "mechanism": {
                "summary": "Absorbed in the duodenum via active transcellular TRPV6 channels (vitamin D-dependent) and paracellular diffusion throughout the jejunum/ileum. Serum levels are held in a strict window (8.5-10.2 mg/dL) by the parathyroid calcium-sensing receptor (CaSR).",
                "steps": [
                    {"stage": "Intestinal Absorption", "detail": "Absorbed via calbindin-D9k and TRPV6 epithelial channels stimulated by calcitriol."},
                    {"stage": "Homeostatic Regulation", "detail": "CaSR detects low serum Ca2+, triggering PTH secretion to increase renal reabsorption, activate vitamin D, and mobilize bone calcium."},
                    {"stage": "Cellular Signaling", "detail": "Cytosolic calcium transients are pumped back into sarcoplasmic reticulum via SERCA pumps to terminate signaling."},
                    {"stage": "Bone Remodeling", "detail": "Incorporated into collagen scaffolds by osteoblasts via gamma-carboxylated osteocalcin (Vitamin K2 dependent)."}
                ]
            },
            "uses": {
                "strong": ["Preserving bone mineral density and reducing osteoporotic fracture risk in postmenopausal women", "Preventing hypocalcemia-induced muscle tetany and laryngospasm"],
                "moderate": ["Attenuating symptoms of premenstrual syndrome (PMS) and fluid retention", "Modest reduction in pre-eclampsia risk in pregnant women with low dietary calcium"],
                "emerging": ["Modulating colon epithelial cell turnover and bile acid binding"],
                "insufficient": ["Replacing resistance training or hormone replacement for severe osteoporosis"]
            },
            "deficiency": {
                "causes": ["Inadequate whole-food intake with low vitamin D and vitamin K2 status", "Hypoparathyroidism or severe chronic hypomagnesemia", "Malabsorption disorders (Celiac, Crohn's, bariatric surgery)"],
                "effects": ["Secondary hyperparathyroidism leading to progressive osteopenia and osteoporosis", "Neuromuscular irritability, Chvostek's sign, Trousseau's sign, and muscle spasms"],
                "symptoms": ["Frequent muscle twitches, cramps & paresthesias", "Brittle nails and dental decay", "Accelerated bone density loss"],
                "symptoms_note": "Serum calcium is defended at the expense of skeletal bone mass; normal blood tests can conceal progressive bone loss.",
                "timeline": "Skeletal demineralization occurs silently over years of chronic marginal insufficiency."
            },
            "food_sources": [
                {"food": "Parmigiano-Reggiano Cheese", "amount": "1 oz (28 g)", "content": "336 mg", "bioavailability": "high", "serving": "1 slice", "type": "animal"},
                {"food": "Sardines (with edible bones)", "amount": "1 can (100 g)", "content": "382 mg", "bioavailability": "high", "serving": "1 tin", "type": "animal"},
                {"food": "Plain Greek Yogurt (Whole Milk)", "amount": "1 cup (200 g)", "content": "250 mg", "bioavailability": "high", "serving": "1 bowl", "type": "animal"},
                {"food": "Cooked Collard Greens", "amount": "1 cup (190 g)", "content": "266 mg", "bioavailability": "moderate", "serving": "1 cup", "type": "plant"},
                {"food": "Fortified Unsweetened Almond Milk", "amount": "1 cup (240 ml)", "content": "450 mg", "bioavailability": "high", "serving": "1 glass", "type": "fortified"}
            ],
            "absorption": {
                "increases": ["Optimal Vitamin D3 status (stimulates TRPV6/calbindin synthesis)", "Dietary lactose and acidic gastric pH"],
                "decreases": ["High oxalic acid (spinach, beet greens) and phytic acid (unsoaked grains/beans)", "Excessive sodium intake (promotes hypercalciuria)"],
                "forms": [
                    "Calcium Citrate: Superior absorption independent of stomach acid; take with or without food",
                    "Calcium Carbonate: 40% elemental calcium, requires gastric acid (take with meals)",
                    "Microcrystalline Hydroxyapatite (MCHA): Whole-bone matrix providing natural trace minerals"
                ],
                "notes": "Always pair calcium supplementation with Vitamin K2 (MK-7) to direct calcium into bone matrix and prevent arterial calcification."
            },
            "requirements": {
                "rda": "1,000 mg/day (Adults 19-50), 1,200 mg/day (Women >50 & Men >70)",
                "groups": [
                    {"group": "Adult Men 19-70", "amount": "1,000 mg/day"},
                    {"group": "Adult Women 19-50", "amount": "1,000 mg/day"},
                    {"group": "Women >50 & Men >70", "amount": "1,200 mg/day"}
                ],
                "ul": "2,000-2,500 mg/day total intake",
                "note": "Food sources are vastly preferred over bolus calcium supplements to avoid sharp serum spikes linked to vascular plaque."
            },
            "supplementation": {
                "who_might": ["Individuals with documented osteoporosis or osteopenia unable to meet RDA through diet", "Post-bariatric surgery or malabsorption patients", "Strict vegans with low calcium greens intake"],
                "who_probably_not": ["Individuals already consuming >1,000mg through dairy, fortified milks, or mineral water", "Patients with hypercalcemia, hyperparathyroidism, or calcium oxalate kidney stones"],
                "forms": ["Calcium Citrate", "Calcium Malate", "MCHA Matrix"],
                "typical_amounts": "300-600 mg per supplemental dose (split if taking >500mg)",
                "timing": "With meals; split into morning and evening doses for optimal intestinal fraction absorption",
                "with_food": "Best taken with whole meals and adequate hydration",
                "duration": "Continuous as part of balanced nutrition",
                "cycling": "No cycling required."
            },
            "safety": {
                "level": "yellow",
                "upper_limit": "2,000 mg/day from all sources",
                "toxicity": "Hypercalcemia (>10.5 mg/dL) causes renal stone formation, vascular soft-tissue calcification, constipation, and cardiac conduction abnormalities.",
                "overdose": "Nausea, severe constipation, lethargy, confusion, polyuria, and cardiac arrhythmias.",
                "drug_interactions": ["Levothyroxine: Calcium binds thyroid hormone and blunts absorption (separate by 4 hours)", "Quinolone & Tetracycline Antibiotics: Chelation impairs antibiotic uptake", "Thiazide Diuretics: Reduces urinary calcium excretion, increasing hypercalcemia risk"],
                "contraindications": ["Primary hyperparathyroidism", "Active hypercalcemia or sarcoidosis", "History of recurrent calcium nephrolithiasis"],
                "special_populations": ["Check ionized calcium and PTH before starting high-dose supplemental therapy."]
            },
            "interactions": [
                {"substance": "Vitamin D3", "interaction": "Obligatory Synergy", "mechanism": "Calcitriol upregulates intestinal calbindin and TRPV6 channels for calcium absorption.", "importance": "high"},
                {"substance": "Vitamin K2 (MK-7)", "interaction": "Obligatory Synergy", "mechanism": "Carboxylates osteocalcin and MGP, directing calcium into bone and away from arterial walls.", "importance": "high"},
                {"substance": "Magnesium", "interaction": "Cofactor Balance", "mechanism": "Maintains balanced cellular transport and prevents soft-tissue calcium deposition.", "importance": "high"}
            ],
            "timing": {
                "matters": True,
                "detail": "Limit single doses to 500mg elemental calcium because intestinal transporters saturate at higher single amounts."
            },
            "performance": {
                "muscle": "Triggers actin-myosin cross-bridge cycling required for muscular force and power output.",
                "strength": "Maintains skeletal structural integrity under heavy progressive axial loading.",
                "fat_loss": "Dietary dairy calcium increases fecal fat excretion and modulates adipocyte lipolysis slightly.",
                "recovery": "Supports musculoskeletal tissue remodeling and bone mineral repair post-impact training.",
                "athletic": "Prevents stress fractures in high-mileage endurance runners and military recruits.",
                "energy": "Essential for mitochondrial pyruvate dehydrogenase phosphatase activation.",
                "sleep": "Aids tryptophan conversion to serotonin and melatonin in neural pathways.",
                "cognitive": "Regulates synaptic plasticity and long-term potentiation (LTP) in hippocampal neurons.",
                "hormones": "Required for stimulus-secretion coupling of endocrine hormones (insulin, PTH, calcitonin).",
                "metabolic": "Modulates blood pressure through vascular smooth muscle tone."
            },
            "biomarkers": [
                {"marker": "Serum Total & Ionized Calcium", "measures": "Free active and albumin-bound extracellular calcium", "matters": "Identifies acute hypo/hypercalcemia", "limitations": "Strictly homeostatically defended; does not reflect bone mineral density", "when": "Routine CMP and metabolic evaluations"},
                {"marker": "Intact Parathyroid Hormone (iPTH)", "measures": "Parathyroid endocrine response to calcium status", "matters": "Elevated iPTH indicates subclinical calcium or Vitamin D insufficiency", "limitations": "Pulsatile secretion", "when": "Investigating bone density loss or abnormal calcium"},
                {"marker": "DEXA Bone Mineral Density (T-score / Z-score)", "measures": "Areal bone density in lumbar spine and femoral neck", "matters": "Gold standard diagnostic for osteopenia and osteoporosis", "limitations": "Performed every 1-2 years", "when": "Postmenopausal women, men >70, or chronic steroid therapy"}
            ],
            "myths": [
                {"myth": "Drinking milk is the only way to get enough calcium.", "fact": "Canned sardines with bones, cooked collard greens, fortified plant milks, and mineral waters provide equal or superior bioavailable calcium."},
                {"myth": "More calcium pills automatically equal stronger bones.", "fact": "Excessive calcium without Vitamin D, K2, and resistance training deposits in vascular walls rather than bone."}
            ],
            "mistakes": [
                "Taking a 1,200mg single calcium pill at once (transporters saturate at 500mg)",
                "Taking calcium supplements at the exact same moment as thyroid medication (Levothyroxine)",
                "Ignoring Vitamin K2 (MK-7) and Vitamin D status while supplementing high-dose calcium",
                "Relying on raw spinach for calcium (its high oxalate content blocks >95% of calcium absorption)"
            ],
            "if_low": [
                "Incorporate dairy, sardines with bones, cooked collards, or fortified milks daily",
                "Ensure serum 25(OH)D is >30-50 ng/mL to maximize intestinal calcium absorption",
                "Engage in progressive axial resistance training and impact exercise to stimulate osteoblast mineral deposition"
            ],
            "if_too_much": {
                "acute": "Severe constipation, abdominal bloating, nausea, and dry mouth.",
                "chronic": "Nephrolithiasis (kidney stones), vascular calcification, and suppressed absorption of zinc and iron.",
                "mechanism": "Precipitation of insoluble calcium oxalate or phosphate salts in renal tubules and arterial intimal layers.",
                "signs": "Kidney flank pain, painful urination, extreme constipation, cognitive clouding.",
                "when_medical": "Seek prompt medical care for severe unilateral flank pain, hematuria, or persistent nausea."
            },
            "research": [
                {
                    "title": "Calcium intake and bone mineral density: systematic review and meta-analysis",
                    "year": "2015",
                    "study_type": "Systematic Review and Meta-Analysis of 59 RCTs",
                    "evidence_level": "strong",
                    "summary": "Increasing calcium intake from dietary sources or supplements produced small, non-progressive increases in BMD (1-2%), with dietary sources preferred for cardiovascular safety.",
                    "source": "British Medical Journal (BMJ)",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/26420531/"
                }
            ]
        }
    },

    # -----------------------------------------------------------------
    # L-THEANINE
    # -----------------------------------------------------------------
    "l_theanine": {
        "subject": "L-Theanine (Gamma-glutamylethylamide)",
        "category": "Amino Acids & Nootropics",
        "query_type": "supplement",
        "one_liner": "A unique non-proteinogenic amino acid found in Camellia sinensis that crosses the blood-brain barrier to promote alpha-wave relaxation, blunt caffeine jitters, and enhance cognitive focus.",
        "science_score": 95,
        "science_score_rationale": "Backed by numerous human EEG studies, cognitive psychopharmacology RCTs, and validated neurochemical mechanisms modulating glutamate and GABA.",
        "safety_level": "green",
        "quick_answer": "L-Theanine is a water-soluble amino acid analog of glutamate and glutamine naturally concentrated in green tea. It crosses the blood-brain barrier within 30 minutes to antagonize glutamate NMDA/AMPA receptors, promote central GABA synthesis, and induce electroencephalographic alpha brain waves (8-12 Hz) for alert relaxation without sedative drowsiness.",
        "followups": [
            "What is the ideal ratio for pairing L-Theanine with Caffeine?",
            "Can L-Theanine be taken before bed to improve sleep quality?",
            "How does L-Theanine interact with GABA and Dopamine receptors?",
            "What is the clinical difference between Suntheanine and generic theanine?"
        ],
        "sections": {
            "what_is_it": {
                "beginner": "L-Theanine is a natural calming compound found in green tea. It relaxes your mind without making you feel sleepy, sharpens focus, and stops caffeine jitters.",
                "advanced": "L-Theanine (N-ethyl-L-glutamine) is a psychoactive amino acid that readily crosses the blood-brain barrier via the large neutral amino acid transport (LNAA) system. Structurally analogous to glutamate, it binds low-affinity to ionotropic AMPA, kainate, and NMDA receptors to attenuate excitatory neurotoxicity while upregulating inhibitory neurotransmission."
            },
            "why_important": [
                {"title": "Alpha Brain Wave Induction (8-12 Hz)", "evidence": "strong", "detail": "Human quantitative EEG studies consistently demonstrate increases in occipital and parietal alpha brainwave activity, signifying a relaxed yet alert mental state."},
                {"title": "Caffeine Antagonism & Jitter Elimination", "evidence": "strong", "detail": "Mitigates caffeine-induced peripheral vasoconstriction, elevated blood pressure, and sleep disruption while synergistically improving working memory and attention."},
                {"title": "Glutamate Gating & Neuroprotection", "evidence": "strong", "detail": "Inhibits glutamate uptake into astrocytes and weakly blocks postsynaptic glutamate receptors, protecting neurons against excitotoxic stress."},
                {"title": "GABA & Glycine Upregulation", "evidence": "moderate", "detail": "Promotes the synthesis and release of inhibitory GABA, lowering sympathetic autonomic nervous system hyperarousal."}
            ],
            "affects": [
                {"system": "Brain & Nervous System", "level": "primary", "detail": "Promotes alpha-band oscillatory activity, increases selective attention, and dampens acute psychological stress reactivity."},
                {"system": "Sleep & Recovery", "level": "primary", "detail": "Improves sleep efficiency and restorative slow-wave rest by reducing nighttime sympathetic arousal."},
                {"system": "Heart & Vascular", "level": "secondary", "detail": "Blunts acute stress-induced surges in blood pressure and heart rate variability (HRV) suppression."},
                {"system": "Immune System", "level": "secondary", "detail": "Metabolized to ethylamine, which primes gamma-delta T cells for pathogen defense."}
            ],
            "mechanism": {
                "summary": "Rapidly absorbed in the small intestine, reaches peak plasma concentration in 30-50 minutes, and crosses the blood-brain barrier via neutral amino acid transporters. Directly elevates brain alpha wave frequency and modulates monoamine neurotransmitters (GABA, dopamine, serotonin).",
                "steps": [
                    {"stage": "Rapid Intestinal Uptake", "detail": "Absorbed across the brush-border membrane via sodium-coupled neutral amino acid transporters."},
                    {"stage": "Blood-Brain Barrier Crossing", "detail": "Transits the blood-brain barrier via the leucine-preferring transport carrier within 30 minutes."},
                    {"stage": "Receptor & Neurotransmitter Action", "detail": "Antagonizes glutamate NMDA/AMPA receptors and stimulates inhibitory GABAergic tone."},
                    {"stage": "Alpha Oscillation Shift", "detail": "Synchronizes cortical pyramidal neurons to generate relaxed 8-12 Hz alpha EEG rhythms."}
                ]
            },
            "uses": {
                "strong": ["Smoothing out caffeine-induced anxiety, jitters, and tachycardia (1:1 or 2:1 ratio with caffeine)", "Reducing acute subjective stress and cognitive fatigue during intensive multitasking", "Improving restorative sleep quality without morning sedative hangover"],
                "moderate": ["Enhancing sustained attention and task accuracy in ADHD or high-distraction environments", "Reducing salivary cortisol and heart rate spikes during acute cognitive stressors"],
                "emerging": ["Neuroprotective support during cerebral ischemic insults and chronic neuroinflammation"],
                "insufficient": ["Treating severe clinical panic disorders or major depressive illness alone"]
            },
            "deficiency": {
                "causes": ["Non-essential amino acid; no physiological deficiency exists."],
                "effects": ["N/A"],
                "symptoms": ["High caffeine sensitivity, mental restlessness, and poor focus are clinical indications for use."],
                "symptoms_note": "A dietary compound found primarily in green tea (Camellia sinensis).",
                "timeline": "Acute effects manifest within 30-45 minutes and persist for 4-6 hours."
            },
            "food_sources": [
                {"food": "Matcha Green Tea (Ceremonial Grade)", "amount": "1 bowl (2 g powder)", "content": "36-40 mg", "bioavailability": "high", "serving": "1 bowl", "type": "plant"},
                {"food": "Gyokuro Green Tea (Shade-grown)", "amount": "1 cup (200 ml)", "content": "25-35 mg", "bioavailability": "high", "serving": "1 cup", "type": "plant"},
                {"food": "Standard Brewed Green Tea", "amount": "1 cup (240 ml)", "content": "8-20 mg", "bioavailability": "high", "serving": "1 mug", "type": "plant"},
                {"food": "Suntheanine Supplement", "amount": "1 capsule", "content": "100-200 mg", "bioavailability": "high", "serving": "1 cap", "type": "plant"}
            ],
            "absorption": {
                "increases": ["Taking on an empty stomach with water for rapid 30-minute brain transit", "Pairing with 100-200mg Caffeine for cognitive synergy"],
                "decreases": ["Consuming alongside high-protein meals with competing large neutral amino acids (BCAAs)"],
                "forms": [
                    "Suntheanine: Pure patented L-isomer enantiomer produced via enzymatic fermentation",
                    "Generic L-Theanine: Free-form synthetic L-theanine powder",
                    "Green Tea Whole Leaf Extracts: Naturally occurring alongside EGCG polyphenols"
                ],
                "notes": "Look for 100% pure L-theanine rather than D-theanine blends for maximum biological receptor affinity."
            },
            "requirements": {
                "rda": "No RDA established (functional amino acid)",
                "groups": [
                    {"group": "General Alert Relaxation", "amount": "100-200 mg/dose"},
                    {"group": "Caffeine Stacking (2:1 Ratio)", "amount": "200 mg theanine with 100 mg caffeine"},
                    {"group": "Sleep Quality Optimization", "amount": "200-400 mg 1 hour before bed"}
                ],
                "ul": "1,200 mg/day (exceptionally wide safety index in human toxicology trials)",
                "note": "Standard effective clinical dosage is 100-200mg per serving."
            },
            "supplementation": {
                "who_might": ["Coffee and energy drink consumers wanting focused energy without jitters or crashes", "Individuals with daytime work anxiety or racing thoughts", "People who experience sleep latency issues due to nighttime cognitive hyperarousal"],
                "who_probably_not": ["Individuals with severe hypotension (L-theanine can modestly lower blood pressure)", "Those taking prescription sedative medications without medical consultation"],
                "forms": ["Pure Powder", "Capsules / Tablets", "Functional Beverage Infusions"],
                "typical_amounts": "100-200 mg per serving (1-3 times daily as needed)",
                "timing": "Morning alongside morning coffee/tea, or 45 minutes before sleep or stressful cognitive tasks",
                "with_food": "Can be taken with or without food (faster absorption on an empty stomach)",
                "duration": "Used as needed acutely or daily",
                "cycling": "No receptor tolerance or dependence observed in human trials; cycling optional."
            },
            "safety": {
                "level": "green",
                "upper_limit": "1,200 mg/day (GRAS status affirmed by FDA)",
                "toxicity": "Exceptionally non-toxic with zero observed adverse effects in long-term human and animal feeding trials.",
                "overdose": "Extremely high doses (>1,500mg) may cause mild dizziness, gastrointestinal upset, or transient low blood pressure.",
                "drug_interactions": ["Antihypertensive drugs: Additive mild blood pressure lowering", "Stimulant medications: Blunts peripheral cardiovascular side effects"],
                "contraindications": ["Known individual hypersensitivity to theanine preparations"],
                "special_populations": ["Safe for general adult populations; pregnant women should consult their obstetrician."]
            },
            "interactions": [
                {"substance": "Caffeine", "interaction": "Gold-Standard Synergy", "mechanism": "Enhances focus and working memory while blocking caffeine vasoconstriction and anxiety.", "importance": "high"},
                {"substance": "Magnesium Glycinate", "interaction": "Synergistic", "mechanism": "Dual NMDA gating and GABAergic support for evening nervous system calm.", "importance": "high"},
                {"substance": "Ashwagandha", "interaction": "Synergistic", "mechanism": "Blunts acute mental stress and stabilizes cortisol dynamics.", "importance": "moderate"}
            ],
            "timing": {
                "matters": True,
                "detail": "Take alongside your morning coffee for clean focus, or 30-45 minutes before bedtime for deep sleep."
            },
            "performance": {
                "muscle": "No direct muscular effect; assists recovery by reducing post-workout nervous system strain.",
                "strength": "Maintains focus and reduces pre-lift anxiety without blunting motor drive.",
                "fat_loss": "Prevents cortisol-driven stress snacking and sugar cravings during work sessions.",
                "recovery": "Accelerates parasympathetic autonomic recovery (HRV elevation) after strenuous workouts.",
                "athletic": "Maintains fine motor control and target accuracy under competitive high-pressure situations.",
                "energy": "Provides sustained 'calm energy' by modulating caffeine kinetics and eliminating crashes.",
                "sleep": "Improves sleep efficiency, non-REM deep sleep duration, and subjective restfulness upon waking.",
                "cognitive": "Significantly improves word recognition, working memory speed, and attentional switching.",
                "hormones": "Helps blunt acute stress-induced ACTH and cortisol elevations during demanding tasks.",
                "metabolic": "Modulates autonomic vascular tone and reduces stress-induced blood pressure spikes."
            },
            "biomarkers": [
                {"marker": "Quantitative EEG (Alpha Wave Amplitude)", "measures": "Brainwave frequency distribution (8-12 Hz)", "matters": "Direct physiological biomarker of alert relaxation", "limitations": "Requires laboratory EEG setup", "when": "Neuroscience research protocols"},
                {"marker": "Heart Rate Variability (HRV / RMSSD)", "measures": "Parasympathetic nervous system tone", "matters": "Higher RMSSD reflects calm autonomic recovery under stress", "limitations": "Influenced by sleep and hydration", "when": "Daily wearable monitoring (Oura, Whoop, Apple Watch)"}
            ],
            "myths": [
                {"myth": "L-Theanine is a sedative sleeping pill and will make you sleepy at work.", "fact": "L-Theanine generates alpha brain waves (alert focus) without motor impairment or sedation; paired with coffee it enhances daytime productivity."},
                {"myth": "You can get enough theanine by drinking one regular cup of grocery-store black tea.", "fact": "A standard cup provides only 10-20mg; clinical trials showing strong cognitive and stress benefits use 100-200mg."}
            ],
            "mistakes": [
                "Taking caffeine without theanine and dealing with avoidable heart palpitations and mid-afternoon energy crashes",
                "Expecting instant sedation like a pharmaceutical sleeping drug rather than clean nervous system quieting",
                "Taking cheap racemic D/L-theanine mixtures instead of pure L-theanine"
            ],
            "if_low": [
                "Switch from processed energy drinks to ceremonial matcha or take 100-200mg L-theanine with your coffee",
                "Combine with 200mg Magnesium Glycinate 45 minutes before sleep for deep non-REM restorative sleep"
            ],
            "if_too_much": {
                "acute": "Mild lightheadedness or slight gastrointestinal looseness from excess capsules.",
                "chronic": "No chronic toxicity documented.",
                "mechanism": "Transient peripheral vasodilation.",
                "signs": "Mild dizziness or dry mouth.",
                "when_medical": "Non-emergency; reduce dose if feeling excessively relaxed during intense physical tasks."
            },
            "research": [
                {
                    "title": "The effects of L-theanine, caffeine and their combination on cognition and mood",
                    "year": "2008",
                    "study_type": "Randomized Double-Blind Placebo-Controlled Trial (n=27)",
                    "evidence_level": "strong",
                    "summary": "Demonstrated that the combination of L-theanine (250mg) and caffeine (150mg) significantly improved speed and accuracy on attentional switching and reduced task-induced fatigue.",
                    "source": "Biological Psychology",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/18006208/"
                },
                {
                    "title": "L-theanine reduces psychological and physiological stress responses",
                    "year": "2007",
                    "study_type": "Human Crossover Trial",
                    "evidence_level": "strong",
                    "summary": "Demonstrated significant reductions in heart rate and salivary immunoglobulin A (s-IgA) responses to an acute cognitive stress task compared to placebo.",
                    "source": "Biological Psychology",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/16930802/"
                }
            ]
        }
    },

    # -----------------------------------------------------------------
    # COQ10 / UBIQUINOL
    # -----------------------------------------------------------------
    "coq10": {
        "subject": "Coenzyme Q10 (Ubiquinol & Ubiquinone)",
        "category": "Mitochondria & Longevity",
        "query_type": "supplement",
        "one_liner": "An obligatory electron carrier in mitochondrial respiratory complexes I, II, and III essential for cellular ATP bioenergetics and lipid membrane antioxidant defense.",
        "science_score": 96,
        "science_score_rationale": "Over 40 years of cardiology trials, Q-SYMBIO heart failure RCTs, and established mitochondrial biochemistry.",
        "safety_level": "green",
        "quick_answer": "Coenzyme Q10 (CoQ10) is a lipophilic quinone synthesized endogenously in the mevalonate pathway. In mitochondrial inner membranes, it shuttles electrons from Complexes I/II to Complex III to generate the proton gradient that drives ATP synthesis, while its reduced form (Ubiquinol) acts as a premier lipid-soluble antioxidant neutralizing lipid peroxyl radicals.",
        "followups": [
            "What is the difference between Ubiquinol (reduced) and Ubiquinone (oxidized)?",
            "Why do Statin medications deplete CoQ10 levels in muscle tissue?",
            "What is the optimal daily dose of CoQ10 for cardiovascular and mitochondrial health?",
            "Should CoQ10 be taken in the morning or evening?"
        ],
        "sections": {
            "what_is_it": {
                "beginner": "CoQ10 is a natural nutrient found in every cell of your body. It works like a spark plug inside your mitochondria to make energy and protects your heart and muscles.",
                "advanced": "CoQ10 (2,3-dimethoxy-5-methyl-6-decaprenyl-1,4-benzoquinone) is an indispensable component of the mitochondrial electron transport chain (ETC). It undergoes reversible redox cycling between oxidized ubiquinone, semiquinone radical intermediate, and fully reduced ubiquinol (CoQH2), which protects mitochondrial and plasma membranes from lipid peroxidation."
            },
            "why_important": [
                {"title": "Mitochondrial ATP Electron Transport", "evidence": "strong", "detail": "Obligatory mobile electron carrier transferring electrons from Complex I (NADH dehydrogenase) and Complex II (succinate dehydrogenase) to Complex III (cytochrome bc1 complex)."},
                {"title": "Cardiovascular Myocyte Bioenergetics", "evidence": "strong", "detail": "The human heart requires continuous high ATP generation; myocardial biopsies in heart failure show profound CoQ10 depletion restored by oral supplementation."},
                {"title": "Lipid Membrane & LDL Antioxidant Protection", "evidence": "strong", "detail": "Ubiquinol directly prevents oxidative modification of circulating LDL particles and regenerates oxidized Vitamin E (alpha-tocopherol) back to its active state."},
                {"title": "Countering Statin-Induced Myopathy", "evidence": "strong", "detail": "HMG-CoA reductase inhibitors (statins) block mevalonate synthesis, depleting endogenous CoQ10 by up to 40-50% in serum and muscle tissue."}
            ],
            "affects": [
                {"system": "Heart & Blood Vessels", "level": "primary", "detail": "Enhances myocardial ejection fraction, improves endothelial dilation, and lowers lipid peroxidation."},
                {"system": "Metabolism & Mitochondria", "level": "primary", "detail": "Drives oxidative phosphorylation ATP synthesis across all metabolically active tissues."},
                {"system": "Muscles", "level": "primary", "detail": "Alleviates statin-associated muscle aches (SAMS) and decreases post-exercise muscular oxidative damage."},
                {"system": "Brain & Eyes", "level": "secondary", "detail": "Protects retinal ganglion cells and substantia nigra dopaminergic neurons from oxidative apoptosis."}
            ],
            "mechanism": {
                "summary": "Absorbed in the small intestine via mixed lipid micelles and packaged into chylomicrons. Incorporated into mitochondrial inner membranes to shuttle electrons and maintain the electrochemical proton gradient driving ATP synthase (Complex V).",
                "steps": [
                    {"stage": "Micellar Intestinal Uptake", "detail": "Hydrophobic molecule requiring dietary fats and bile salts for micellar incorporation in the duodenum."},
                    {"stage": "Lymphatic Transport via Chylomicrons", "detail": "Packaged into chylomicrons, enters systemic circulation via the thoracic duct, and is carried primarily in LDL/HDL particles."},
                    {"stage": "Mitochondrial Inner Membrane Insertion", "detail": "Partitions into the hydrophobic core of the mitochondrial inner membrane."},
                    {"stage": "Redox Electron Shuttling", "detail": "Reduces to ubiquinol at Complexes I/II and re-oxidizes at Complex III, pumping protons into the intermembrane space."}
                ]
            },
            "uses": {
                "strong": ["Supporting cardiac contractility and functional capacity in heart failure (Q-SYMBIO trial)", "Replenishing endogenous depletion and reducing muscle soreness in patients on Statin therapy", "Improving endothelial flow-mediated dilation and blood pressure metrics"],
                "moderate": ["Reducing migraine frequency and duration (via brain mitochondrial support)", "Improving sperm motility, density, and morphology in male subfertility"],
                "emerging": ["Modulating markers of aging and chronic inflammation (hs-CRP, TNF-alpha)"],
                "insufficient": ["Replacing prescription cardiac medications without cardiologist guidance"]
            },
            "deficiency": {
                "causes": ["Natural age-related decline (peaks at age 20, declines by ~50% by age 70 in myocardium)", "Statin medication use (inhibits mevalonate pathway)", "Primary genetic CoQ10 biosynthesis defects"],
                "effects": ["Impaired mitochondrial ATP generation, accelerated cellular oxidative damage, and exercise intolerance", "Myalgias, elevated creatine kinase, and reduced myocardial reserve"],
                "symptoms": ["Unexplained physical muscle fatigue & weakness", "Exercise intolerance & slow recovery", "Brain fog and mental lethargy"],
                "symptoms_note": "Serum CoQ10 testing reflects recent dietary intake; leukocyte or muscle biopsy reflects true intracellular tissue status.",
                "timeline": "Statin therapy reduces serum CoQ10 within 2-4 weeks; oral repletion typically restores optimal tissue levels in 4-8 weeks."
            },
            "food_sources": [
                {"food": "Beef Heart (Cooked)", "amount": "100 g", "content": "11.3 mg", "bioavailability": "high", "serving": "1 portion", "type": "animal"},
                {"food": "Beef Liver / Steak", "amount": "100 g", "content": "3.5-4.0 mg", "bioavailability": "high", "serving": "1 steak", "type": "animal"},
                {"food": "Wild Mackerel / Sardines", "amount": "100 g", "content": "4.3-6.4 mg", "bioavailability": "high", "serving": "1 fillet", "type": "animal"},
                {"food": "Ubiquinol Softgel", "amount": "1 softgel", "content": "100-200 mg", "bioavailability": "high", "serving": "1 softgel", "type": "plant"}
            ],
            "absorption": {
                "increases": ["Taking with a meal containing dietary fats (olive oil, avocados, whole eggs)", "Using pre-reduced Ubiquinol or crystal-free self-emulsifying formulations"],
                "decreases": ["Taking on an empty stomach with water alone (absorption <1-2%)"],
                "forms": [
                    "Ubiquinol: Pre-reduced active antioxidant form; 3-8x higher bioavailability in human plasma comparisons",
                    "Ubiquinone: Standard oxidized form; cheaper, converted to ubiquinol in enterocytes before entering lymph",
                    "Water-soluble / Liposomal CoQ10: Enhanced micro-emulsified formulations for individuals with impaired fat digestion"
                ],
                "notes": "Ubiquinol is particularly recommended for adults >40 years old due to age-related declines in endogenous reduction enzymes."
            },
            "requirements": {
                "rda": "No official RDA (synthesized endogenously)",
                "groups": [
                    {"group": "General Longevity & Wellness", "amount": "100 mg/day"},
                    {"group": "Statin Users & Cardiovascular Support", "amount": "100-200 mg/day (Ubiquinol)"},
                    {"group": "Clinical Heart Failure Support", "amount": "200-300 mg/day (divided doses with food)"}
                ],
                "ul": "1,200 mg/day (established safety ceiling in human clinical trials)",
                "note": "Standard evidence-based daily dosage is 100-200mg Ubiquinol."
            },
            "supplementation": {
                "who_might": ["Anyone taking Statin cholesterol-lowering medications (Atorvastatin, Rosuvastatin, Simvastatin)", "Adults >40 seeking cardiovascular and cellular longevity optimization", "Individuals with chronic migraines or endurance athletes with high oxidative loads"],
                "who_probably_not": ["Patients on Warfarin (Coumadin) without INR monitoring (CoQ10 is structurally similar to Vitamin K)", "Young healthy individuals consuming adequate meat and fish without symptoms"],
                "forms": ["Ubiquinol Softgels", "Ubiquinone Softgels", "Liposomal Liquids"],
                "typical_amounts": "100-200 mg daily",
                "timing": "Morning or midday with a fat-containing meal (can be mildly energizing; avoid late evening)",
                "with_food": "Mandatory to take with dietary lipids for micellar absorption",
                "duration": "Continuous, especially if ongoing statin therapy is prescribed",
                "cycling": "No cycling required."
            },
            "safety": {
                "level": "green",
                "upper_limit": "1,200 mg/day",
                "toxicity": "Exceptionally safe profile with no organ toxicity observed across high-dose long-term human studies.",
                "overdose": "Mild gastrointestinal discomfort, loose stools, or mild insomnia if taken before sleep.",
                "drug_interactions": ["Warfarin (Coumadin): May decrease anticoagulant response and lower INR (requires clinical monitoring)", "Antihypertensives: May have additive modest blood pressure lowering effect"],
                "contraindications": ["Hypersensitivity to formulation ingredients"],
                "special_populations": ["Check INR if starting or stopping CoQ10 while taking prescription vitamin K antagonists."]
            },
            "interactions": [
                {"substance": "PQQ (Pyrroloquinoline Quinone)", "interaction": "Synergistic", "mechanism": "CoQ10 optimizes electron flow while PQQ stimulates new mitochondrial biogenesis.", "importance": "high"},
                {"substance": "Omega-3 Fatty Acids", "interaction": "Synergistic", "mechanism": "Enhances lipid absorption and produces additive cardiovascular endothelial benefits.", "importance": "high"},
                {"substance": "Statins", "interaction": "Essential Replenishment", "mechanism": "Replaces depleted mevalonate-derived CoQ10 pools in skeletal muscle.", "importance": "high"}
            ],
            "timing": {
                "matters": True,
                "detail": "Always take with breakfast or lunch containing dietary fat. Avoid late evening to prevent sleep onset delay."
            },
            "performance": {
                "muscle": "Attenuates exercise-induced muscle damage and accelerates muscular ATP regeneration.",
                "strength": "Supports power output and reduces perceived exertion during high-intensity training.",
                "fat_loss": "Maintains efficient mitochondrial beta-oxidation of fatty acids during caloric restriction.",
                "recovery": "Decreases serum creatine kinase and lipid peroxides following exhaustive exercise.",
                "athletic": "Improves time to exhaustion and peak power output in trained endurance athletes.",
                "energy": "Directly enhances basal cellular ATP production, fighting chronic mitochondrial fatigue.",
                "sleep": "Best taken in morning; supports diurnal energy rhythms.",
                "cognitive": "Protects cerebral vascular microcirculation and sustains neural bioenergetics.",
                "hormones": "Supports ovarian follicular and testicular Leydig cell mitochondrial energy status.",
                "metabolic": "Improves endothelial nitric oxide bioavailability and reduces arterial stiffness."
            },
            "biomarkers": [
                {"marker": "Plasma CoQ10 Level", "measures": "Total circulating Coenzyme Q10", "matters": "Optimal therapeutic target is >2.0-2.5 µg/mL; baseline levels <0.7 indicate deficiency", "limitations": "Influenced by recent dietary fat intake", "when": "Cardiovascular and longevity optimization panels"},
                {"marker": "High-Sensitivity C-Reactive Protein (hs-CRP)", "measures": "Systemic vascular inflammation", "matters": "Evaluates anti-inflammatory efficacy of mitochondrial antioxidant therapy", "limitations": "Non-specific acute-phase reactant", "when": "Cardiovascular risk evaluations"}
            ],
            "myths": [
                {"myth": "CoQ10 is an artificial drug that shuts down your body's own natural production.", "fact": "CoQ10 is a natural nutrient; supplementation does not downregulate your body's endogenous biosynthesis enzymes upon discontinuation."},
                {"myth": "You can get all the CoQ10 you need from eating a salad.", "fact": "Vegetables contain negligible amounts (micrograms); reaching 100-200mg from food would require eating 2 pounds of beef heart daily."}
            ],
            "mistakes": [
                "Taking CoQ10 on an empty stomach with a glass of water (results in <2% absorption)",
                "Taking statin cholesterol medications for years without supplementing CoQ10",
                "Taking cheap, crystal-bound ubiquinone without testing plasma levels to confirm absorption"
            ],
            "if_low": [
                "Start 100-200mg Ubiquinol daily with a breakfast containing healthy fats (eggs, avocado, olive oil)",
                "If on statin medications, maintain consistent daily co-supplementation to protect muscle mitochondria",
                "Test plasma CoQ10 to ensure serum levels exceed the optimal >2.0 µg/mL longevity target"
            ],
            "if_too_much": {
                "acute": "Mild digestive nausea or loose stools if taking >600mg at once.",
                "chronic": "No chronic toxicity known.",
                "mechanism": "Excess unabsorbed lipids in the gastrointestinal tract.",
                "signs": "Mild stomach discomfort.",
                "when_medical": "Non-emergency; simply reduce dose or take with food."
            },
            "research": [
                {
                    "title": "The Effect of Coenzyme Q10 on Morbidity and Mortality in Chronic Heart Failure: Results From Q-SYMBIO: A Randomized Double-Blind Trial",
                    "year": "2014",
                    "study_type": "Multicenter Randomized Double-Blind Placebo-Controlled Trial (n=420)",
                    "evidence_level": "strong",
                    "summary": "Long-term CoQ10 treatment (300mg/day) in patients with chronic heart failure was safe, improved symptoms, and reduced major adverse cardiovascular events by 43% and cardiovascular mortality by 44%.",
                    "source": "JACC: Heart Failure (Journal of the American College of Cardiology)",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/25282031/"
                }
            ]
        }
    },

    # -----------------------------------------------------------------
    # SELENIUM
    # -----------------------------------------------------------------
    "selenium": {
        "subject": "Selenium",
        "category": "Trace Minerals",
        "query_type": "mineral",
        "one_liner": "An indispensable essential trace mineral incorporated into 25 selenoproteins, including glutathione peroxidases (GPx) and iodothyronine deiodinases for thyroid hormone activation.",
        "science_score": 96,
        "science_score_rationale": "Backed by extensive human RCTs, established molecular biology of selenocysteine (Sec) incorporation, and thyroid metabolic literature.",
        "safety_level": "yellow",
        "quick_answer": "Selenium is an essential trace element incorporated as selenocysteine (the 21st amino acid) into catalytic sites of 25 human selenoproteins. It drives cellular antioxidant defense via Glutathione Peroxidases (GPx1-4), protects the thyroid gland from oxidative damage, and powers deiodinase enzymes (DIO1/DIO2) that convert inactive thyroxine (T4) into active triiodothyronine (T3).",
        "followups": [
            "How does Selenium protect the thyroid during high Iodine intake?",
            "Why is just 1 to 2 Brazil Nuts enough for your daily Selenium needs?",
            "What is the clinical difference between Selenomethionine and Sodium Selenite?",
            "What are the toxic symptoms of Selenium overdose (Selenosis)?"
        ],
        "sections": {
            "what_is_it": {
                "beginner": "Selenium is an essential mineral your body needs to protect cells from damage, keep your thyroid gland healthy, and boost your immune defenses.",
                "advanced": "Selenium (Se) is unique among trace elements because it is genetically encoded directly into the peptide backbone of selenoproteins as selenocysteine (Sec) via a UGA codon directed by a SECIS RNA element. It functions primarily in cellular redox homeostasis, thyroid hormone biocatalysis, and immune lymphocyte proliferation."
            },
            "why_important": [
                {"title": "Glutathione Peroxidase (GPx) Antioxidant Defense", "evidence": "strong", "detail": "Catalytic selenocysteine residue in GPx1-4 reduces toxic hydrogen peroxide and lipid hydroperoxides to water and harmless lipid alcohols, protecting cell membranes and DNA."},
                {"title": "Thyroid Hormone Conversion (Deiodinases)", "evidence": "strong", "detail": "Iodothyronine deiodinases (DIO1 and DIO2) are selenoenzymes responsible for outer-ring deiodination of prohormone T4 into active metabolic T3."},
                {"title": "Thyroid Autoantibody Attenuation", "evidence": "strong", "detail": "Human clinical trials show 200 µg/day selenomethionine reduces anti-thyroperoxidase (TPO-Ab) titers by 20-40% in Hashimoto's thyroiditis patients."},
                {"title": "Immune Cell Proliferation & Antiviral Defense", "evidence": "strong", "detail": "Selenoprotein K and S are essential for endoplasmic reticulum calcium flux, T-cell receptor signaling, and natural killer (NK) cell cytotoxicity."}
            ],
            "affects": [
                {"system": "Thyroid & Metabolism", "level": "primary", "detail": "Drives T4 to T3 conversion and shields thyroid follicular cells from H2O2 oxidative damage."},
                {"system": "Immune System", "level": "primary", "detail": "Enhances lymphocyte proliferation, antibody production, and viral resistance."},
                {"system": "Heart & Vascular", "level": "primary", "detail": "Prevents oxidative modification of LDL and protects cardiac myocytes (Keshan disease prevention)."},
                {"system": "Reproductive System", "level": "secondary", "detail": "Required for sperm mitochondrial capsule protein (GPx4) and male motility."}
            ],
            "mechanism": {
                "summary": "Absorbed in the duodenum via amino acid transport systems (selenomethionine) or passive diffusion (selenite/selenate). Incorporated co-translationally into selenoproteins via selenocysteine tRNA(Sec) to provide catalytic redox activity.",
                "steps": [
                    {"stage": "Intestinal Absorption", "detail": "Organic selenomethionine is absorbed >90% efficiently across enterocytes via neutral amino acid transporters."},
                    {"stage": "Hepatic Selenoprotein P Synthesis", "detail": "The liver synthesizes Selenoprotein P (SELENOP), which carries >50% of plasma selenium to peripheral tissues."},
                    {"stage": "Target Organ Uptake", "detail": "Endocytosed by target tissues (brain, thyroid, testes) via ApoER2 and megalin receptor pathways."},
                    {"stage": "Catalytic Enzyme Function", "detail": "Selenocysteine's low pKa (5.2) and high nucleophilicity enable rapid peroxide neutralization and deiodination."}
                ]
            },
            "uses": {
                "strong": [" Hashimoto's thyroiditis support: significantly reduces elevated anti-TPO antibody titers", "Keshan disease & Kashin-Beck cardiomyopathy prevention in endemic low-selenium regions", "Replenishing cellular glutathione peroxidase antioxidant defenses"],
                "moderate": ["Improving sperm quality, morphology, and motility in male factor subfertility", "Reducing inflammatory biomarkers (hs-CRP) in autoimmune conditions"],
                "emerging": ["Modulating viral mutation rates and supporting immune resilience during respiratory infections"],
                "insufficient": ["High-dose supplementation for cancer prevention in selenium-replete populations (SELECT trial showed no benefit)"]
            },
            "deficiency": {
                "causes": ["Consuming foods grown in selenium-depleted volcanic or glacial soils", "Total parenteral nutrition (TPN) without trace mineral supplementation", "Severe gastrointestinal malabsorption (Celiac disease, Crohn's, short bowel syndrome)"],
                "effects": ["Keshan disease (endemic cardiomyopathy), Kashin-Beck osteoarthropathy, and impaired thyroid hormone production", "Increased susceptibility to oxidative cellular injury and viral virulence"],
                "symptoms": ["Chronic fatigue & persistent brain fog", "Hypothyroidism symptoms (cold intolerance, slow metabolism)", "Hair loss and brittle, white-spotted fingernails"],
                "symptoms_note": "A single Brazil nut provides 68-91 µg of selenium, rapidly reversing dietary insufficiency.",
                "timeline": "Plasma selenium responds within days; tissue selenoprotein saturation occurs in 4-8 weeks."
            },
            "food_sources": [
                {"food": "Brazil Nuts (Unblanched)", "amount": "1 kernel (5 g)", "content": "68-91 mcg", "bioavailability": "high", "serving": "1 nut", "type": "plant"},
                {"food": "Yellowfin Tuna (Cooked)", "amount": "3 oz (85 g)", "content": "92 mcg", "bioavailability": "high", "serving": "1 steak", "type": "animal"},
                {"food": "Halibut / Sardines", "amount": "3 oz (85 g)", "content": "47-55 mcg", "bioavailability": "high", "serving": "1 fillet", "type": "animal"},
                {"food": "Grass-Fed Beef Liver", "amount": "3 oz (85 g)", "content": "32 mcg", "bioavailability": "high", "serving": "1 slice", "type": "animal"},
                {"food": "Pasture-Raised Whole Eggs", "amount": "2 large eggs", "content": "30 mcg", "bioavailability": "high", "serving": "2 eggs", "type": "animal"}
            ],
            "absorption": {
                "increases": ["Simultaneous presence of Vitamin E, Vitamin A, and dietary protein", "Organic forms like L-Selenomethionine and Selenium-enriched yeast (90-95% absorbed)"],
                "decreases": ["Very high elemental sulfur or heavy metal exposure (mercury binds selenium into insoluble complexes)", "Excessive phytates in unsoaked legumes"],
                "forms": [
                    "L-Selenomethionine: Organic form naturally found in food; incorporated directly into body protein pools",
                    "Selenium-Enriched Yeast: High-bioavailability fermented whole-food matrix",
                    "Sodium Selenite / Selenate: Inorganic salts; absorbed rapidly but retained less efficiently in tissue"
                ],
                "notes": "Always pair selenium with adequate iodine status; supplementing iodine without selenium can trigger thyroid oxidative damage."
            },
            "requirements": {
                "rda": "55 mcg/day (Adults), 60 mcg/day (Pregnancy), 70 mcg/day (Lactation)",
                "groups": [
                    {"group": "Adult Men & Women", "amount": "55 mcg/day"},
                    {"group": "Thyroid Autoimmunity Protocol", "amount": "100-200 mcg/day (under clinical supervision)"},
                    {"group": "Pregnancy & Lactation", "amount": "60-70 mcg/day"}
                ],
                "ul": "400 mcg/day (Tolerable Upper Intake Level to avoid selenosis)",
                "note": "A daily intake of 100-200 mcg is the optimal therapeutic sweet spot."
            },
            "supplementation": {
                "who_might": ["Individuals with Hashimoto's thyroiditis or elevated anti-TPO/anti-Tg antibodies", "Men with suboptimal sperm motility and high seminal oxidative stress", "People living in low-selenium soil regions (parts of Europe, China, New Zealand)"],
                "who_probably_not": ["Individuals regularly eating 2-3 Brazil nuts per week or consuming abundant seafood", "People with baseline plasma selenium >130-150 µg/L"],
                "forms": ["L-Selenomethionine", "Selenium Yeast", "Se-Methylselenocysteine"],
                "typical_amounts": "100-200 mcg daily",
                "timing": "Morning or midday with any whole meal",
                "with_food": "Take with meals containing protein or healthy fats",
                "duration": "6 months for thyroid antibody protocols, followed by maintenance",
                "cycling": "Continuous within safe RDA limits."
            },
            "safety": {
                "level": "yellow",
                "upper_limit": "400 mcg/day",
                "toxicity": "Selenosis (chronic selenium toxicity) occurs at intakes >800-1,000 mcg/day, characterized by garlic breath odor, alopecia (hair loss), fingernail brittleness/sloughing, and peripheral neuropathy.",
                "overdose": "Garlic breath odor (due to dimethyl selenide expiration), metallic taste, fatigue, nausea, and transverse white lines on nails (Mees' lines).",
                "drug_interactions": ["Cisplatin Chemotherapy: Selenium may reduce nephrotoxicity (requires oncologist coordination)", "Statins & Niacin: High-dose antioxidant combinations may blunt HDL-raising effects"],
                "contraindications": ["Existing clinical selenosis or hyper-selenium status"],
                "special_populations": ["Do not exceed 400 mcg/day from all combined food and supplemental sources."]
            },
            "interactions": [
                {"substance": "Iodine", "interaction": "Obligatory Partner", "mechanism": "Selenium is required to detoxify hydrogen peroxide generated during thyroid hormone synthesis.", "importance": "high"},
                {"substance": "Vitamin E", "interaction": "Synergistic", "mechanism": "Dual antioxidant protection: Vitamin E stops lipid chain reactions, while Selenium GPx destroys peroxides.", "importance": "high"},
                {"substance": "Zinc", "interaction": "Complementary", "mechanism": "Synergistic support for immune maturation and thyroid hormone receptor binding.", "importance": "moderate"}
            ],
            "timing": {
                "matters": False,
                "detail": "Can be taken at any time of day with a meal. Consistent daily intake is more important than specific hour."
            },
            "performance": {
                "muscle": "Protects skeletal myocytes against exhaustive exercise-induced lipid peroxidation.",
                "strength": "Supports basal metabolic rate and muscular power through optimal thyroid T3 status.",
                "fat_loss": "Ensures efficient thyroid thermogenesis and basal metabolic expenditure.",
                "recovery": "Accelerates systemic glutathione peroxidase recovery post-endurance competition.",
                "athletic": "Maintains red blood cell membrane deformability and oxygen delivery during hypoxia.",
                "energy": "Powers cellular ATP synthesis by maintaining thyroid-dependent mitochondrial biogenesis.",
                "sleep": "Supports nocturnal thyroid hormone release and neuroprotection.",
                "cognitive": "Protects hippocampal neurons and microglial cells against neuroinflammatory damage.",
                "hormones": "Essential for thyroid T4->T3 peripheral conversion and testicular testosterone production.",
                "metabolic": "Modulates fasting glucose metabolism and hepatic insulin signaling."
            },
            "biomarkers": [
                {"marker": "Serum / Plasma Selenium", "measures": "Recent dietary intake and circulating selenium", "matters": "Optimal therapeutic target is 100-140 µg/L; levels <70 indicate deficiency", "limitations": "Reflects short-term dietary changes", "when": "Investigating thyroid dysfunction or nutritional adequacy"},
                {"marker": "Thyroid Peroxidase Antibodies (Anti-TPO)", "measures": "Autoimmune activity against thyroid gland", "matters": "Monitors therapeutic reduction in autoimmune attack", "limitations": "May fluctuate over time", "when": "Hashimoto's management"},
                {"marker": "Free T3 & Free T4", "measures": "Active and prohormone circulating thyroid hormones", "matters": "Assesses peripheral deiodinase conversion efficiency", "limitations": "Diurnal fluctuation", "when": "Comprehensive metabolic evaluations"}
            ],
            "myths": [
                {"myth": "Eating a whole bag of Brazil nuts every day is a healthy superfood habit.", "fact": "A single bag can contain 2,000-5,000 mcg of selenium—eating more than 2-3 nuts daily can lead to selenosis toxicity."},
                {"myth": "Selenium can completely cure thyroid disease on its own.", "fact": "Selenium optimizes deiodinase conversion and reduces antibodies, but works in synergy with iodine, iron, vitamin D, and clinical management."}
            ],
            "mistakes": [
                "Eating 10+ Brazil nuts a day without realizing you are exceeding the 400 mcg toxicity limit",
                "Taking high-dose iodine supplements for thyroid fatigue without ensuring adequate selenium status first",
                "Assuming all multivitamins contain enough selenium when soil depletion has reduced dietary intake"
            ],
            "if_low": [
                "Eat 1-2 Brazil nuts 3-4 times per week, or incorporate wild yellowfin tuna, sardines, and pastured eggs",
                "If managing Hashimoto's thyroiditis, consult your doctor about 100-200 mcg/day of L-selenomethionine",
                "Test serum selenium and thyroid panel to ensure you achieve the optimal 100-140 µg/L range"
            ],
            "if_too_much": {
                "acute": "Garlic-like breath odor, nausea, vomiting, and abdominal pain.",
                "chronic": "Hair brittleness and diffuse alopecia, fingernail deformities, fatigue, and peripheral neuropathy.",
                "mechanism": "Excess selenium displaces sulfur in keratin and critical proteins, disrupting enzyme tertiary structure.",
                "signs": "Garlic odor on breath, nail dystrophy, sudden hair shedding.",
                "when_medical": "Seek medical evaluation if experiencing sudden hair loss, nail changes, and garlic breath after taking high-dose supplements."
            },
            "research": [
                {
                    "title": "Selenium supplementation in patients with Hashimoto's thyroiditis: a systematic review and meta-analysis",
                    "year": "2016",
                    "study_type": "Systematic Review and Meta-Analysis of 16 RCTs",
                    "evidence_level": "strong",
                    "summary": "Selenium supplementation significantly decreased serum thyroid peroxidase antibodies (TPO-Ab) at 3, 6, and 12 months, and improved subjective well-being in patients on levothyroxine.",
                    "source": "Thyroid (Official Journal of the American Thyroid Association)",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/27702390/"
                }
            ]
        }
    },

    # -----------------------------------------------------------------
    # IODINE
    # -----------------------------------------------------------------
    "iodine": {
        "subject": "Iodine",
        "category": "Trace Minerals",
        "query_type": "mineral",
        "one_liner": "An essential constituent of thyroid hormones thyroxine (T4) and triiodothyronine (T3), governing cellular metabolic rate, neurodevelopment, and mitochondrial thermogenesis.",
        "science_score": 98,
        "science_score_rationale": "Over a century of global public health trials, universal salt iodization data, and established thyroid follicular cell physiology.",
        "safety_level": "yellow",
        "quick_answer": "Iodine (I) is an essential trace element concentrated in the thyroid gland via the sodium-iodide symporter (NIS). Inside follicular cells, thyroid peroxidase (TPO) oxidizes iodide to iodinate thyroglobulin tyrosine residues, synthesizing prohormone Thyroxine (T4) and active Triiodothyronine (T3), which regulate systemic basal metabolic rate (BMR), protein synthesis, and central nervous system development.",
        "followups": [
            "What is the difference between Potassium Iodide and Kelp/Seaweed extracts?",
            "Why must Iodine always be balanced with adequate Selenium?",
            "What is the Wolff-Chaikoff effect from excessive iodine?",
            "What are the best whole-food sources of bioavailable iodine?"
        ],
        "sections": {
            "what_is_it": {
                "beginner": "Iodine is an essential mineral that your thyroid gland uses to make thyroid hormones. These hormones set your body's metabolic speed, control energy, and keep your brain sharp.",
                "advanced": "Iodine is an obligate structural component of the iodothyronines 3,5,3',5'-tetraiodothyronine (T4) and 3,5,3'-triiodothyronine (T3). Transported across the basolateral thyrocyte membrane against a 20-50x electrochemical gradient by the NIS symporter, it undergoes organification at the apical colloid interface."
            },
            "why_important": [
                {"title": "Thyroid Hormone Synthesis (T4 & T3)", "evidence": "strong", "detail": "65% of T4 molecular weight and 59% of T3 molecular weight consists of iodine atoms covalently bound to the outer and inner tyrosyl rings."},
                {"title": "Basal Metabolic Rate & Thermogenesis", "evidence": "strong", "detail": "Thyroid hormones bind nuclear thyroid hormone receptors (TR-alpha and TR-beta) to induce uncoupling protein (UCP1) and Na+/K+-ATPase gene transcription."},
                {"title": "Fetal Neurodevelopment & Myelination", "evidence": "strong", "detail": "Essential for embryonic cerebral cortex neurogenesis, neuronal migration, and cochlear auditory development (preventing endemic cretinism)."},
                {"title": "Mammary & Epithelial Tissue Health", "evidence": "moderate", "detail": "Serves as an antioxidant and apoptotic regulator in breast ductal epithelium through iodolipid (delta-iodolactone) formation."}
            ],
            "affects": [
                {"system": "Thyroid & Metabolism", "level": "primary", "detail": "Required for thyroid hormone biocatalysis, body temperature regulation, and energy expenditure."},
                {"system": "Brain & Nervous System", "level": "primary", "detail": "Controls cognitive processing speed, executive function, and developmental myelination."},
                {"system": "Heart & Vascular", "level": "secondary", "detail": "Modulates cardiac beta-adrenergic receptor expression, heart rate, and contractility."},
                {"system": "Skin & Hair", "level": "secondary", "detail": "Regulates epidermal cell turnover, sebum secretion, and hair follicle growth phases."}
            ],
            "mechanism": {
                "summary": "Absorbed rapidly as iodide (I-) in the stomach and duodenum (>90%). Concentrated into thyroid thyrocytes via the NIS pump, oxidized by TPO using H2O2, and coupled into MIT/DIT to form T4 and T3.",
                "steps": [
                    {"stage": "Rapid Intestinal Absorption", "detail": "Dietary iodide is absorbed nearly 100% in the stomach and upper duodenum into circulation."},
                    {"stage": "Active Thyroid Trapping", "detail": "Transported into thyrocytes by the Na+/I- symporter (NIS) driven by the Na+/K+-ATPase gradient."},
                    {"stage": "TPO Organification", "detail": "Thyroid peroxidase oxidizes iodide to reactive iodine intermediates that iodinate thyroglobulin tyrosine rings."},
                    {"stage": "Hormone Secretion & Transport", "detail": "Colloid endocytosis and proteolysis release T4 and T3 into capillaries, bound to Thyroxine-Binding Globulin (TBG)."}
                ]
            },
            "uses": {
                "strong": ["Preventing and treating endemic goiter and iodine-deficiency hypothyroidism", "Essential maternal supplementation during pregnancy to prevent neurocognitive developmental deficits", "Emergency radiation protection via Potassium Iodide (KI) to saturate the thyroid against I-131"],
                "moderate": ["Supporting fibrocystic breast symptom relief under clinical supervision"],
                "emerging": ["Topical antimicrobial antiseptic applications (Povidone-iodine)"],
                "insufficient": ["Megadose protocols (>1,000 mcg/day) for fatigue or weight loss in iodine-replete individuals"]
            },
            "deficiency": {
                "causes": ["Consuming non-iodized specialty salts (Himalayan pink salt, Celtic sea salt) without seafood or dairy", "Pregnancy and lactation with increased renal clearance and fetal transfer", "High dietary intake of unheated goitrogens (raw cassava, unfermented soy, raw cruciferous)"],
                "effects": ["Compensatory TSH elevation leading to thyroid follicular hypertrophy (endemic goiter)", "Overt primary hypothyroidism (fatigue, weight gain, cold intolerance, constipation, myxedema)"],
                "symptoms": ["Unexplained cold intolerance & sluggish metabolic rate", "Swelling or fullness at base of neck (goiter)", "Diffuse hair thinning, dry skin, and brain fog"],
                "symptoms_note": "A simple 24-hour urinary iodine concentration (UIC) is the gold standard epidemiological marker.",
                "timeline": "Thyroid stores ~10-20 mg of iodine, buffering against clinical deficiency for 2-3 months."
            },
            "food_sources": [
                {"food": "Kelp / Kombu Seaweed", "amount": "1 g (dried sheet)", "content": "1,000-2,500 mcg", "bioavailability": "high", "serving": "1 small strip", "type": "plant"},
                {"food": "Wild Pacific Cod", "amount": "3 oz (85 g)", "content": "158 mcg", "bioavailability": "high", "serving": "1 fillet", "type": "animal"},
                {"food": "Plain Low-Fat Greek Yogurt", "amount": "1 cup (200 g)", "content": "116 mcg", "bioavailability": "high", "serving": "1 bowl", "type": "animal"},
                {"food": "Iodized Table Salt", "amount": "1/4 teaspoon (1.5 g)", "content": "71 mcg", "bioavailability": "high", "serving": "1 pinch", "type": "fortified"},
                {"food": "Whole Pastured Egg", "amount": "1 large egg", "content": "26 mcg", "bioavailability": "high", "serving": "1 egg", "type": "animal"}
            ],
            "absorption": {
                "increases": ["Consuming as water-soluble Potassium Iodide (KI) or dietary iodate (90-95% absorbed)"],
                "decreases": ["Excessive raw goitrogens (glucosinolates/thiocyanates in raw kale/broccoli block NIS transport)", "Perchlorate, nitrate, and thiocyanate environmental contaminants"],
                "forms": [
                    "Potassium Iodide (KI): The gold standard pharmaceutical and supplemental form with 100% molecular bioavailability",
                    "Kelp / Bladderwrack Extracts: Natural ocean seaweed; requires standardization as raw kelp has volatile iodine variance",
                    "Nascent / Atomic Iodine: Elemental iodine suspended in alcohol/glycerin; converted to iodide in gastrointestinal tract"
                ],
                "notes": "Always ensure adequate Selenium status before initiating supplemental iodine to prevent TPO oxidative damage."
            },
            "requirements": {
                "rda": "150 mcg/day (Adults), 220 mcg/day (Pregnancy), 290 mcg/day (Lactation)",
                "groups": [
                    {"group": "Adult Men & Women", "amount": "150 mcg/day"},
                    {"group": "Pregnant Women", "amount": "220 mcg/day"},
                    {"group": "Lactating Women", "amount": "290 mcg/day"}
                ],
                "ul": "1,100 mcg/day (Tolerable Upper Intake Level for adults)",
                "note": "150-250 mcg/day is the target sweet spot. Megadoses (>1,000 mcg) can paradoxically shut down thyroid output."
            },
            "supplementation": {
                "who_might": ["Pregnant and nursing women (American Thyroid Association recommends 150 mcg daily prenatal supplement)", "Vegans and vegetarians who do not use iodized salt or consume sea vegetables", "Individuals using exclusively non-iodized designer salts with zero dairy or seafood intake"],
                "who_probably_not": ["Individuals regularly consuming iodized salt, ocean fish, or dairy", "Patients with active autoimmune Hashimoto's or Grave's disease (unless under endocrinologist guidance)"],
                "forms": ["Potassium Iodide (KI)", "Standardized Kelp Extract"],
                "typical_amounts": "150-225 mcg daily",
                "timing": "Morning with breakfast",
                "with_food": "Can be taken with or without food",
                "duration": "Continuous as part of daily micronutrient adequacy",
                "cycling": "No cycling required."
            },
            "safety": {
                "level": "yellow",
                "upper_limit": "1,100 mcg/day",
                "toxicity": "Wolff-Chaikoff effect: Acute large iodine boluses transiently inhibit thyroid hormone synthesis. Chronic excess can trigger iodine-induced hypothyroidism or Jod-Basedow hyperthyroidism.",
                "overdose": "Burning sensation in mouth and throat, metallic taste, fever, nausea, vomiting, diarrhea, and salivary gland swelling.",
                "drug_interactions": ["Anti-Thyroid Medications (Methimazole, PTU): Additive hypothyroid effect", "ACE Inhibitors & Potassium-Sparing Diuretics: Risk of hyperkalemia if taking potassium iodide", "Lithium: Synergistic inhibition of thyroid hormone release"],
                "contraindications": ["Known iodine allergy or dermatitis herpetiformis", "Autonomously functioning thyroid nodules"],
                "special_populations": ["Never take multi-milligram iodine drops without specific endocrinologist supervision."]
            },
            "interactions": [
                {"substance": "Selenium", "interaction": "Obligatory Partner", "mechanism": "Selenium GPx neutralizes the H2O2 byproduct of iodine organification; deiodinases require selenium to convert T4 to T3.", "importance": "high"},
                {"substance": "Iron", "interaction": "Synergistic", "mechanism": "Thyroid peroxidase (TPO) is a heme-dependent enzyme; iron deficiency impairs iodine utilization.", "importance": "high"},
                {"substance": "Zinc", "interaction": "Complementary", "mechanism": "Required for thyroid stimulating hormone (TSH) synthesis and T3 nuclear receptor binding.", "importance": "moderate"}
            ],
            "timing": {
                "matters": False,
                "detail": "Can be taken in morning or midday with food. Avoid high doses before bed."
            },
            "performance": {
                "muscle": "Regulates protein synthesis and skeletal muscle fiber-type transitions through T3 signaling.",
                "strength": "Maintains motor unit contractile velocity and basal metabolic power output.",
                "fat_loss": "Essential for mitochondrial uncoupling protein (UCP) expression and resting energy expenditure.",
                "recovery": "Normalizes cellular repair rates and tissue glycogen resynthesis post-workout.",
                "athletic": "Prevents exercise-induced hypothyroid metabolic downregulation in hard-training endurance athletes.",
                "energy": "Drives basal mitochondrial ATP turnover across all nucleated human cells.",
                "sleep": "Maintains normal nocturnal circadian core body temperature rhythms.",
                "cognitive": "Essential for mental alertness, neurotransmitter turnover, and processing speed.",
                "hormones": "Required for downstream LH, FSH, growth hormone, and sex hormone binding globulin (SHBG) regulation.",
                "metabolic": "Governs hepatic LDL clearance, carbohydrate absorption rates, and systemic lipolysis."
            },
            "biomarkers": [
                {"marker": "Urinary Iodine Concentration (UIC)", "measures": "Median urinary excretion (µg/L)", "matters": "Gold standard population and individual adequacy test (optimal: 100-199 µg/L)", "limitations": "Subject to daily dietary intake variation", "when": "Investigating deficiency or dietary iodine intake"},
                {"marker": "TSH, Free T3, Free T4", "measures": "Pituitary feedback and circulating thyroid hormones", "matters": "Evaluates functional metabolic consequences of iodine adequacy", "limitations": "TSH may remain normal in mild-to-moderate early deficiency", "when": "Comprehensive metabolic evaluations"},
                {"marker": "Thyroglobulin (Tg)", "measures": "Circulating precursor protein", "matters": "Elevated serum Tg reflects thyroid hyperplasia and chronic iodine deficiency", "limitations": "Also elevated in thyroiditis", "when": "Thyroid monitoring"}
            ],
            "myths": [
                {"myth": "Pink Himalayan Salt has plenty of iodine for your daily needs.", "fact": "Pink salt contains negligible trace amounts (<2 mcg/g); switching completely from iodized salt to pink salt is a leading modern cause of iodine deficiency."},
                {"myth": "Taking 50mg of Lugol's iodine daily is a safe natural detox.", "fact": "50mg is over 300 times the RDA and can cause thyroiditis, the Wolff-Chaikoff hypothyroid shutdown, and cardiac arrhythmias."}
            ],
            "mistakes": [
                "Switching exclusively to non-iodized sea salt or pink salt without adding seafood or dairy to your diet",
                "Taking high-dose iodine drops without checking baseline selenium and thyroid antibody levels first",
                "Ignoring prenatal iodine needs during pregnancy and lactation when fetal requirements increase by 50%"
            ],
            "if_low": [
                "Switch your kitchen salt to iodized table salt (1/4 tsp provides ~71 mcg, about half your RDA)",
                "Add wild cod, low-fat Greek yogurt, pasture-raised eggs, or small amounts of nori/wakame seaweed to your weekly diet",
                "If pregnant, ensure your prenatal vitamin provides 150 mcg of Potassium Iodide daily"
            ],
            "if_too_much": {
                "acute": "Metallic taste, salivary gland enlargement, burning throat, and abdominal cramping.",
                "chronic": "Iodine-induced goiter, hypothyroidism (Wolff-Chaikoff effect), or acute hyperthyroidism.",
                "mechanism": "High intracellular iodide levels saturate NIS transporters and downregulate TPO transcription.",
                "signs": "Tender neck/thyroid, brassy taste, mouth ulcers, diarrhea.",
                "when_medical": "Seek immediate physician evaluation if experiencing neck swelling, palpitations, or severe mouth burning."
            },
            "research": [
                {
                    "title": "Iodine deficiency and thyroid disorders: a global health perspective",
                    "year": "2015",
                    "study_type": "Comprehensive Review and Meta-Analysis",
                    "evidence_level": "strong",
                    "summary": "Demonstrated that universal salt iodization programs reduced global goiter rates by >70% and prevented significant neurocognitive impairment across populations.",
                    "source": "The Lancet Diabetes & Endocrinology",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/25567520/"
                }
            ]
        }
    },

    # -----------------------------------------------------------------
    # BORON
    # -----------------------------------------------------------------
    "boron": {
        "subject": "Boron",
        "category": "Trace Minerals",
        "query_type": "mineral",
        "one_liner": "A bioactive trace mineral that downregulates Sex Hormone-Binding Globulin (SHBG) to elevate free testosterone, supports bone mineral density, and modulates inflammatory cytokines.",
        "science_score": 91,
        "science_score_rationale": "Supported by multiple human clinical trials demonstrating significant modulation of free testosterone, estradiol, and reduction in hs-CRP and TNF-alpha.",
        "safety_level": "green",
        "quick_answer": "Boron is a bioactive trace mineral that influences the metabolism of steroid hormones (testosterone, estrogen, vitamin D) and macrominerals (calcium, magnesium). Clinical trials show that 6-10 mg/day of elemental boron significantly decreases Sex Hormone-Binding Globulin (SHBG), thereby liberating biologically active Free Testosterone within 1-2 weeks, while reducing systemic inflammatory markers (hs-CRP) and urinary calcium loss.",
        "followups": [
            "What is the clinical protocol for cycling Boron for free testosterone?",
            "How does Boron reduce urinary excretion of Magnesium and Calcium?",
            "What are the best food sources of Boron (raisins, prunes, avocados)?",
            "What is the difference between Boron Glycinate and Boron Citrate?"
        ],
        "sections": {
            "what_is_it": {
                "beginner": "Boron is a trace mineral that helps your body use testosterone and vitamin D efficiently, strengthens your bones, and calms inflammation.",
                "advanced": "Boron exists in biological systems as boric acid [B(OH)3] and borate anions [B(OH)4-]. It forms stable diester complexes with cis-hydroxyl groups of ribose-containing molecules, NAD+, and S-adenosylmethionine (SAMe), modulating steroid hormone hydroxylation, cytokine expression, and cell membrane transport."
            },
            "why_important": [
                {"title": "SHBG Reduction & Free Testosterone Elevation", "evidence": "strong", "detail": "Human clinical trials show 10 mg/day of boron for 7 days resulted in a statistically significant decrease in SHBG (from ~45 to ~39 nmol/L) and a 28% increase in free testosterone."},
                {"title": "Bone Mineral Retention (Calcium & Magnesium)", "evidence": "strong", "detail": "Boron reduces urinary excretion of calcium and magnesium by up to 40% in postmenopausal women and increases serum 17-beta estradiol and calcitriol concentrations."},
                {"title": "Systemic Anti-Inflammatory Action (hs-CRP & TNF-alpha)", "evidence": "strong", "detail": "Significantly downregulates inflammatory biomarkers, lowering high-sensitivity C-reactive protein (hs-CRP) and interleukin-6 (IL-6) in osteoarthritis patients."},
                {"title": "Vitamin D Activation & Half-Life Extension", "evidence": "moderate", "detail": "Inhibits 24-hydroxylase (CYP24A1), the catabolic enzyme that breaks down 25(OH)D3, effectively extending the biological half-life of Vitamin D."}
            ],
            "affects": [
                {"system": "Hormones & Endocrine", "level": "primary", "detail": "Downregulates SHBG, liberates free testosterone, and extends active vitamin D half-life."},
                {"system": "Bones & Joints", "level": "primary", "detail": "Preserves calcium-magnesium matrix in bone and reduces synovial inflammatory pain."},
                {"system": "Metabolism & Mitochondria", "level": "secondary", "detail": "Modulates NAD+ and SAMe enzymatic pathways supporting cellular methylation."},
                {"system": "Brain & Nervous System", "level": "secondary", "detail": "Improves cognitive attention, manual dexterity, and short-term memory task scores."}
            ],
            "mechanism": {
                "summary": "Absorbed rapidly as boric acid in the small intestine (>85%). Acts by complexing with cis-diols on glycoprotein receptors and modulating 17-beta-hydroxysteroid dehydrogenases, reducing SHBG binding affinity for testosterone.",
                "steps": [
                    {"stage": "Intestinal Diffusion", "detail": "Passively absorbed as uncharged boric acid throughout the duodenum and jejunum."},
                    {"stage": "Steroid Modulation", "detail": "Alters enzymatic hydroxylation of androgen precursors in hepatic tissue."},
                    {"stage": "SHBG Cleavage / Dissociation", "detail": "Decreases hepatic SHBG synthesis and unbinds testosterone from albumin/SHBG complexes."},
                    {"stage": "Renal Mineral Sparing", "detail": "Modulates renal tubular transport, significantly attenuating urinary calcium and magnesium excretion."}
                ]
            },
            "uses": {
                "strong": ["Liberating free bioavailable testosterone in athletes and men with elevated SHBG", "Reducing joint stiffness, discomfort, and inflammation in osteoarthritis", "Reducing urinary calcium and magnesium excretion to support bone mineral density"],
                "moderate": ["Extending circulating Vitamin D levels and enhancing 25(OH)D to 1,25(OH)2D conversion", "Improving cognitive processing speed and manual dexterity in older adults"],
                "emerging": ["Modulating heavy metal detoxification and wound healing kinetics"],
                "insufficient": ["Replacing clinical testosterone replacement therapy (TRT) for severe primary hypogonadism"]
            },
            "deficiency": {
                "causes": ["Low intake of whole plant foods (fruits, nuts, legumes) grown in low-boron soils", "Highly processed diets devoid of leafy greens and dried fruits"],
                "effects": ["Accelerated urinary calcium and magnesium loss, increasing osteoporosis vulnerability", "Higher SHBG levels and reduced free hormone availability"],
                "symptoms": ["Joint stiffness and aching", "Elevated SHBG and sluggish recovery from resistance training", "Suboptimal bone mineral density retention"],
                "symptoms_note": "Boron is currently classified as an ultra-trace element with clear beneficial biological activity.",
                "timeline": "Hormonal shifts in SHBG and free testosterone manifest in 7-14 days of supplementation."
            },
            "food_sources": [
                {"food": "Dried Prunes (Plums)", "amount": "1/2 cup (87 g)", "content": "1.7 mg", "bioavailability": "high", "serving": "5-6 prunes", "type": "plant"},
                {"food": "Raisins (Seedless)", "amount": "1/2 cup (75 g)", "content": "1.5 mg", "bioavailability": "high", "serving": "1 small box", "type": "plant"},
                {"food": "Hass Avocado", "amount": "1 whole avocado (150 g)", "content": "1.1 mg", "bioavailability": "high", "serving": "1 avocado", "type": "plant"},
                {"food": "Almonds / Walnuts", "amount": "1 oz (28 g)", "content": "0.8 mg", "bioavailability": "high", "serving": "1 handful", "type": "plant"},
                {"food": "Cooked Red Kidney Beans", "amount": "1 cup (180 g)", "content": "0.7 mg", "bioavailability": "high", "serving": "1 bowl", "type": "plant"}
            ],
            "absorption": {
                "increases": ["Taking with meals containing complex carbohydrates and natural organic acids", "Organic chelated forms (Boron Glycinate, Bororganic Glycine, Boron Citrate)"],
                "decreases": ["Very high elemental fluoride or heavy metals that compete for borate binding sites"],
                "forms": [
                    "Boron Glycinate / Bororganic Glycine: Amino acid chelate with superior gastrointestinal tolerability",
                    "Boron Citrate: High-bioavailability organic salt frequently used in hormone clinical trials",
                    "Fructoborate (Calcium Fructoborate): Naturally occurring plant-identical sugar-borate complex with strong joint trials"
                ],
                "notes": "Cycling 2 weeks on, 1 week off (or 3 weeks on, 1 week off) is commonly practiced to prevent compensatory estrogen rebound."
            },
            "requirements": {
                "rda": "No official RDA established (estimated acceptable daily intake: 1-3 mg/day)",
                "groups": [
                    {"group": "General Wellness & Bone Support", "amount": "3 mg/day"},
                    {"group": "Free Testosterone & SHBG Optimization", "amount": "6-10 mg/day (cycled)"},
                    {"group": "Joint Inflammation & Osteoarthritis Protocol", "amount": "6-12 mg/day (Calcium Fructoborate)"}
                ],
                "ul": "20 mg/day (Tolerable Upper Intake Level for adults)",
                "note": "6-10 mg daily is the clinically proven range for modulating SHBG and free testosterone."
            },
            "supplementation": {
                "who_might": ["Men with high total testosterone but high SHBG and low free testosterone", "Postmenopausal women seeking to preserve bone mineral density and reduce calcium loss", "Athletes with joint stiffness and systemic inflammatory markers"],
                "who_probably_not": ["Individuals with hormone-sensitive cancers (estrogen receptor positive) without oncology clearance", "Severe renal insufficiency patients"],
                "forms": ["Boron Glycinate", "Boron Citrate", "Calcium Fructoborate"],
                "typical_amounts": "6-10 mg daily",
                "timing": "Morning with breakfast",
                "with_food": "Take with whole-food meals",
                "duration": "Cycled: 2-3 weeks on, 1 week off to maximize free androgen receptor sensitivity",
                "cycling": "Recommended: 2 weeks on, 1 week off."
            },
            "safety": {
                "level": "green",
                "upper_limit": "20 mg/day",
                "toxicity": "Extremely low toxicity in humans; acute toxicity requires massive accidental ingestion (>15-20 grams of boric acid).",
                "overdose": "Mild nausea, headache, gastric distress, or transient flushing.",
                "drug_interactions": ["Estrogen Medications / HRT: Boron can increase circulating estradiol concentrations", "Magnesium & Calcium Supplements: Enhances retention (positive synergistic interaction)"],
                "contraindications": ["Severe end-stage renal impairment", "Hormone-sensitive active malignancies"],
                "special_populations": ["Stay within the 3-10 mg daily clinical range; do not exceed 20 mg/day."]
            },
            "interactions": [
                {"substance": "Vitamin D3", "interaction": "Synergistic", "mechanism": "Boron inhibits CYP24A1 catabolism, extending the circulating half-life of 25(OH)D.", "importance": "high"},
                {"substance": "Magnesium", "interaction": "Mineral Sparing", "mechanism": "Reduces renal magnesium excretion, enhancing intracellular magnesium retention.", "importance": "high"},
                {"substance": "Zinc", "interaction": "Complementary", "mechanism": "Dual support for optimal steroidogenesis and androgen receptor sensitivity.", "importance": "moderate"}
            ],
            "timing": {
                "matters": True,
                "detail": "Best taken in the morning with food. Cycle 2 weeks on, 1 week off for free testosterone protocols."
            },
            "performance": {
                "muscle": "Elevates bioavailable free testosterone to stimulate muscle protein synthesis and nitrogen retention.",
                "strength": "Supports neuromuscular force development by lowering SHBG-bound androgen restriction.",
                "fat_loss": "Aids lean-to-fat mass partitioning through optimized free androgen-to-estrogen balance.",
                "recovery": "Significantly downregulates post-training inflammatory cytokines (hs-CRP, TNF-alpha).",
                "athletic": "Maintains bone matrix mineral density under chronic axial training loads.",
                "energy": "Supports cellular NAD+ and SAMe synthesis for metabolic energy flux.",
                "sleep": "Supports evening restorative rest by reducing joint discomfort.",
                "cognitive": "Enhances cognitive task speed, executive attention, and motor reaction time.",
                "hormones": "Decreases SHBG by up to 15-20% and increases free testosterone by ~28% in 7-14 days.",
                "metabolic": "Modulates calcium/magnesium renal balance and steroid hormone hydroxylation."
            },
            "biomarkers": [
                {"marker": "Sex Hormone-Binding Globulin (SHBG)", "measures": "Circulating androgen-binding transport protein", "matters": "Monitors reduction in SHBG to liberate active free testosterone", "limitations": "Also influenced by insulin and liver health", "when": "Baseline and 3-4 weeks post-supplementation"},
                {"marker": "Free & Total Testosterone", "measures": "Total circulating and unbound bioavailable testosterone", "matters": "Calculates free androgen fraction (optimal free T: >2% of total)", "limitations": "Diurnal morning peak", "when": "Morning fasting blood draw (8:00 AM)"},
                {"marker": "High-Sensitivity C-Reactive Protein (hs-CRP)", "measures": "Systemic baseline inflammation", "matters": "Monitors anti-inflammatory efficacy of boron therapy", "limitations": "Acute infections can transiently elevate", "when": "Metabolic and longevity panels"}
            ],
            "myths": [
                {"myth": "Boron is a dangerous chemical cleaner (like borax laundry soap).", "fact": "Elemental dietary boron is a natural, essential trace mineral found in avocados, raisins, and prunes with an exceptionally high safety profile."},
                {"myth": "Boron will skyrocket estrogen to dangerous levels.", "fact": "Short-term boron raises free testosterone by freeing it from SHBG; while minor estradiol conversion can occur, the free T-to-E2 ratio remains highly favorable."}
            ],
            "mistakes": [
                "Taking boron continuously for 6 months without cycling (cycling 2 weeks on, 1 week off prevents estrogen compensation)",
                "Taking high-dose boron when total testosterone is already clinically low (boron frees existing T; it does not replace LH production)",
                "Exceeding the 20 mg/day upper limit thinking more is better"
            ],
            "if_low": [
                "Incorporate 1/2 cup of prunes or raisins, 1 avocado, and a handful of almonds into your daily diet",
                "Take 6-10 mg/day of Boron Glycinate or Boron Citrate in the morning with food",
                "Cycle your supplementation: 2 weeks on, 1 week off, and re-test SHBG and Free Testosterone at 6-8 weeks"
            ],
            "if_too_much": {
                "acute": "Mild nausea, headache, gastrointestinal discomfort.",
                "chronic": "Dermatitis, lethargy, or mild digestive disturbance if exceeding >20 mg/day chronically.",
                "mechanism": "Excess accumulation in renal clearance pathways.",
                "signs": "Digestive upset, red flushing, mild headache.",
                "when_medical": "Non-emergency; simply discontinue supplement and hydrate."
            },
            "research": [
                {
                    "title": "Comparative effects of daily and weekly boron supplementation on plasma steroid hormones and proinflammatory cytokines in healthy males",
                    "year": "2011",
                    "study_type": "Human Clinical Trial (n=8 healthy males)",
                    "evidence_level": "strong",
                    "summary": "Demonstrated that 10 mg/day of boron for 1 week significantly decreased SHBG from 44.7 to 39.5 nmol/L, increased free testosterone from 11.8 to 15.2 pg/mL (28% increase), and significantly reduced hs-CRP and TNF-alpha.",
                    "source": "Journal of Trace Elements in Medicine and Biology",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/21129941/"
                }
            ]
        }
    }
}
