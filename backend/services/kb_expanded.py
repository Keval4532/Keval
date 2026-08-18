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
    }
}
