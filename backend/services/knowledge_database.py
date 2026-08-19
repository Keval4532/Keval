"""Master Scientific Knowledge Database for KEVALBIO.
Provides deeply accurate, human-physiology-verified data profiles for vitamins, minerals,
supplements, hormones, foods, training, and longevity topics.
"""
from typing import Dict, Any, Optional, List
import re

# =====================================================================
# Comprehensive Database of Real-Life Scientific Profiles
# =====================================================================

TOPIC_PROFILES: Dict[str, Dict[str, Any]] = {
    # -----------------------------------------------------------------
    # MAGNESIUM
    # -----------------------------------------------------------------
    "magnesium": {
        "subject": "Magnesium",
        "category": "Minerals",
        "query_type": "mineral",
        "one_liner": "An obligatory intracellular mineral and enzyme cofactor required for ATP synthesis, neuromuscular relaxation, DNA replication, and cardiac rhythm stability.",
        "science_score": 96,
        "science_score_rationale": "Supported by extensive human clinical trials, biochemical literature, and established cellular mechanisms across >300 enzymatic reactions.",
        "safety_level": "green",
        "quick_answer": "Magnesium is an essential macromineral required as an obligatory cofactor for biologically active Mg-ATP. It stabilizes high-energy phosphate bonds, acts as a physiological calcium channel blocker in neuromuscular tissue, regulates vascular tone, and drives cellular DNA and RNA repair.",
        "followups": [
            "What is the difference between Magnesium Glycinate, Malate, and Citrate?",
            "How does Magnesium interact with Vitamin D activation?",
            "What are the earliest clinical signs of cellular Magnesium depletion?",
            "What is the optimal timing for taking Magnesium for sleep?"
        ],
        "sections": {
            "what_is_it": {
                "beginner": "Magnesium is a vital mineral your body needs for energy production, relaxing tense muscles, calming the nervous system, and building strong bones.",
                "advanced": "Magnesium (Mg2+) is the second most abundant intracellular cation. It acts as an indispensable cofactor in over 300 enzymatic systems, including hexokinase, phosphofructokinase, adenylate cyclase, and the Na+/K+-ATPase pump. Active ATP in cells exists almost exclusively as a chelate with Mg2+."
            },
            "why_important": [
                {"title": "Mitochondrial ATP Energy Synthesis", "evidence": "strong", "detail": "Biologically active ATP exists as an Mg-ATP chelate required by all cellular kinases for high-energy phosphate transfer."},
                {"title": "Neuromuscular Tone & Calcium Antagonism", "evidence": "strong", "detail": "Acts as a natural physiological calcium channel antagonist at NMDA receptors and sarcoplasmic reticulum channels, preventing muscle tetany and excitotoxicity."},
                {"title": "Vitamin D Activation & Parathyroid Regulation", "evidence": "strong", "detail": "Required as an essential cofactor for hepatic 25-hydroxylase (CYP2R1) and renal 1α-hydroxylase (CYP27B1) in converting Vitamin D to calcitriol."},
                {"title": "Cardiovascular & Endothelial Tone", "evidence": "strong", "detail": "Modulates vascular smooth muscle contractile tone, maintains endothelial nitric oxide release, and stabilizes cardiac myocyte membrane potential."}
            ],
            "affects": [
                {"system": "Muscles", "level": "primary", "detail": "Regulates excitation-contraction coupling and promotes actin-myosin relaxation."},
                {"system": "Brain & Nervous System", "level": "primary", "detail": "Blocks glutamate NMDA excitotoxicity and enhances GABAergic inhibitory neurotransmission."},
                {"system": "Heart & Blood Vessels", "level": "primary", "detail": "Stabilizes cardiac action potentials and reduces systemic vascular resistance."},
                {"system": "Metabolism & Mitochondria", "level": "primary", "detail": "Drives glycolysis, Krebs cycle oxidative phosphorylation, and insulin receptor sensitivity."}
            ],
            "mechanism": {
                "summary": "Magnesium is an obligatory cofactor for cellular ATP. Biologically active ATP exists as an Mg-ATP chelate required for >300 enzymatic reactions, including hexokinase, phosphofructokinase, and neuromuscular Na+/K+-ATPase pumps.",
                "steps": [
                    {"stage": "Intestinal Absorption", "detail": "Absorbed via active TRPM6 transporters and passive paracellular claudin channels in the ileum and colon."},
                    {"stage": "Circulation & Bone Reservoir", "detail": "60% stored in bone matrix hydroxyapatite, 39% intracellularly in muscle/soft tissue, and <1% in serum."},
                    {"stage": "ATP Cofactor Binding", "detail": "Chelates to high-energy triphosphate groups of ATP molecules to allow enzymatic transfer by kinases."},
                    {"stage": "Neuromuscular Action", "detail": "Acts as a physiological calcium channel blocker, facilitating sarcoplasmic reticulum relaxation and NMDA gating."}
                ]
            },
            "uses": {
                "strong": ["Relieving muscle cramps, fasciculations, and nocturnal leg spasms", "Improving sleep quality and parasympathetic heart rate variability (HRV)", "Supporting insulin sensitivity and blood pressure regulation"],
                "moderate": ["Reducing migraine frequency and severity", "Alleviating premenstrual syndrome (PMS) mood changes and water retention", "Preventing osteoporotic bone mineral density loss"],
                "emerging": ["Magnesium L-Threonate for crossing blood-brain barrier and enhancing synaptic plasticity", "Attenuating chronic systemic inflammatory markers (hs-CRP)"],
                "insufficient": ["Replacing clinical antihypertensive medications in severe medical hypertension"]
            },
            "deficiency": {
                "causes": ["High intake of ultra-processed foods stripped of whole grains", "Depleted agricultural soil magnesium concentrations", "Chronic gastrointestinal malabsorption or diarrhea", "Excessive alcohol consumption or loop/thiazide diuretic medications", "High chronic psychological stress elevating urinary magnesium excretion"],
                "effects": ["Neuromuscular hyper-excitability, muscle cramps, tremors, and eyelid twitches", "Insomnia, restless leg syndrome, and heightened anxiety", "Hypokalemia and secondary hypocalcemia refractory to replacement", "Elevated cardiovascular risk and cardiac arrhythmias"],
                "symptoms": ["Muscle twitches & cramps", "Restless sleep & fatigue", "Anxiety & irritability", "Brain fog & headaches", "Palpitations"],
                "symptoms_note": "Serum magnesium (<1.8 mg/dL) represents less than 1% of total body stores; significant tissue depletion can exist with normal serum levels.",
                "risk_groups": ["Individuals consuming standard refined Western diets", "Endurance athletes with heavy sweat rates", "Older adults with reduced gastrointestinal absorption", "People taking Proton Pump Inhibitors (PPIs) or Diuretics", "Type 2 diabetics with high renal glycosuric losses"],
                "testing": "RBC Magnesium (Red Blood Cell Magnesium, optimal 6.0 - 6.8 mg/dL) is far more accurate than standard serum magnesium."
            },
            "food_sources": [
                {"food": "Pumpkin Seeds (Pepitas)", "amount": "30g (1 oz)", "content": "156 mg elemental Mg (37% RDA)", "bioavailability": "high", "serving": "1 handful", "type": "plant"},
                {"food": "Cooked Spinach", "amount": "180g (1 cup)", "content": "157 mg elemental Mg (37% RDA)", "bioavailability": "moderate-high", "serving": "1 cup cooked", "type": "plant"},
                {"food": "Almonds", "amount": "30g (1 oz)", "content": "80 mg elemental Mg (19% RDA)", "bioavailability": "moderate", "serving": "23 almonds", "type": "plant"},
                {"food": "Black Beans / Cooked Lentils", "amount": "170g (1 cup)", "content": "120 mg elemental Mg (29% RDA)", "bioavailability": "moderate", "serving": "1 cup cooked", "type": "plant"},
                {"food": "Dark Chocolate (>70% Cacao)", "amount": "50g", "content": "115 mg elemental Mg (27% RDA)", "bioavailability": "moderate", "serving": "2 large squares", "type": "plant"},
                {"food": "Avocado", "amount": "1 medium", "content": "58 mg elemental Mg (14% RDA)", "bioavailability": "high", "serving": "1 whole fruit", "type": "plant"}
            ],
            "absorption": {
                "increases": ["Co-ingesting with fermentable dietary fiber and dietary protein", "Dividing total daily intake into 2-3 smaller doses"],
                "decreases": ["High phytic acid in unsoaked grains and legumes", "Excessive single-dose calcium (>500mg) competing for intestinal uptake", "Heavy alcohol consumption"],
                "forms": [
                    "Magnesium Glycinate: Highly bioavailable chelate bound to glycine; ideal for evening relaxation and neuromuscular calming.",
                    "Magnesium Citrate: High bioavailability with osmotic drawing action; effective for bowel regularity.",
                    "Magnesium Malate: Paired with malic acid to support daytime cellular Krebs cycle bioenergetics.",
                    "Magnesium L-Threonate: Unique ability to cross blood-brain barrier to support cognitive density.",
                    "Magnesium Oxide: Lower bioavailability (~4%); primarily acts as an osmotic laxative."
                ],
                "notes": "Glycinate and Malate forms minimize GI loose stools compared to inorganic oxide."
            },
            "requirements": {
                "rda": "400-420 mg/day for adult men, 310-320 mg/day for adult women (+40 mg in pregnancy)",
                "groups": [
                    {"group": "Sedentary Adults", "amount": "320 - 420 mg/day (meets baseline physiological turnover)"},
                    {"group": "Active Athletes", "amount": "450 - 600 mg/day (replaces sweat losses and supports elevated ATP turnover)"},
                    {"group": "High-Stress / Sleep Support", "amount": "400 - 500 mg/day (supports GABAergic neurotransmission)"}
                ],
                "ul": "350 mg/day elemental magnesium from supplemental sources (dietary food magnesium has no UL in individuals with normal renal function)",
                "note": "Supplemental UL is based on preventing osmotic diarrhea; healthy kidneys rapidly clear excess dietary magnesium."
            },
            "supplementation": {
                "who_might": ["Active individuals and athletes with heavy training loads", "People with poor sleep architecture, frequent cramps, or elevated stress", "Those eating minimal leafy greens, nuts, and seeds"],
                "who_probably_not": ["Patients with severe chronic kidney disease (CKD stage 4-5) without strict nephrologist supervision"],
                "forms": ["Magnesium Glycinate", "Magnesium Malate", "Magnesium L-Threonate", "Magnesium Citrate"],
                "typical_amounts": "200 - 400 mg elemental magnesium daily",
                "timing": "Evening 30-60 minutes before bedtime (Glycinate/Threonate) or Morning with breakfast (Malate)",
                "with_food": "Well-tolerated with or without food; take with water",
                "duration": "Safe for ongoing daily foundational use",
                "cycling": "No cycling required due to ongoing daily metabolic requirement"
            },
            "safety": {
                "level": "green",
                "upper_limit": "350 mg supplemental elemental Mg (Institute of Medicine UL)",
                "toxicity": "Hypermagnesemia is exceedingly rare with oral intake in individuals with intact kidney function; excess causes self-limiting diarrhea.",
                "overdose": "Extreme intravenous or massive oral overdose in renal failure causes hypotension, loss of deep tendon reflexes, and bradycardia.",
                "drug_interactions": [
                    "Tetracycline and Fluoroquinolone Antibiotics: Magnesium chelates and reduces antibiotic absorption (separate by 3 hours).",
                    "Bisphosphonates: Magnesium decreases absorption (separate by at least 2 hours).",
                    "Potassium-Sparing Diuretics: May increase systemic magnesium retention."
                ],
                "contraindications": ["Severe renal failure (eGFR < 30 mL/min) without medical monitoring", "Myasthenia gravis", "High-grade AV block"],
                "special_populations": ["Safe and highly beneficial during pregnancy to reduce preeclampsia and muscle cramp risk."]
            },
            "interactions": [
                {"substance": "Vitamin D3", "interaction": "Synergistic enzyme activation", "mechanism": "Magnesium is an obligatory cofactor for 25-hydroxylase and 1α-hydroxylase enzymes", "importance": "critical"},
                {"substance": "Calcium", "interaction": "Competitive receptor antagonism", "mechanism": "Balanced 2:1 or 1:1 ratio maintains optimal vascular and neuromuscular tone", "importance": "high"},
                {"substance": "Zinc", "interaction": "Synergistic mineral cofactors (ZMA)", "mechanism": "Supports protein synthesis and hormonal recovery when taken together", "importance": "moderate"}
            ],
            "timing": {
                "matters": True,
                "detail": "Taking Magnesium Glycinate 30-60 minutes before sleep enhances parasympathetic activation and slow-wave sleep. Taking Magnesium Malate in the morning supports daytime energy."
            },
            "performance": {
                "muscle": "Regulates sarcoplasmic reticulum calcium reuptake, preventing cramps and accelerating relaxation.",
                "strength": "Maintains intracellular Mg-ATP availability during maximal isometric and dynamic contractions.",
                "fat_loss": "Improves insulin receptor sensitivity, facilitating efficient glucose disposal into muscle cells.",
                "recovery": "Decreases systemic cortisol and muscle soreness post-exhaustive training.",
                "athletic": "Maintains electrolyte balance and prevents exercise-induced drop in red blood cell volume.",
                "energy": "Powers all key mitochondrial Krebs cycle enzymes and electron transport chain complexes.",
                "sleep": "Binds to GABA-A receptors and downregulates evening excitatory glutamate signaling.",
                "cognitive": "Promotes synaptic plasticity and long-term potentiation in hippocampal neurons.",
                "hormones": "Supports free testosterone availability by reducing sex hormone-binding globulin (SHBG) binding.",
                "metabolic": "Required for tyrosine kinase activity at the intracellular domain of insulin receptors."
            },
            "biomarkers": [
                {"marker": "RBC Magnesium (Red Blood Cell Magnesium)", "measures": "Intracellular magnesium concentration over the 120-day erythrocyte lifespan.", "matters": "Gold standard for assessing functional whole-body tissue stores (optimal: 6.0 - 6.8 mg/dL).", "limitations": "Requires specialized lab order.", "when": "Investigating chronic fatigue, muscle cramps, or refractory arrhythmia."},
                {"marker": "Serum Magnesium", "measures": "Extracellular circulating magnesium pool (<1% of total body content).", "matters": "Identifies severe acute hypomagnesemia (<1.8 mg/dL).", "limitations": "Tightly homeostatically guarded; normal levels do not exclude intracellular depletion.", "when": "Routine clinical chemistry panel."}
            ],
            "myths": [
                {"myth": "All magnesium supplements are basically the same", "fact": "Bioavailability differs drastically: Magnesium Glycinate and Malate have ~80-90% bioaccessibility, whereas inorganic Magnesium Oxide absorbs at only ~4% and acts mainly as a laxative."},
                {"myth": "A standard blood test is enough to know your magnesium status", "fact": "Serum magnesium accounts for less than 1% of total body magnesium. You can have completely normal blood tests while muscle and bone tissues are severely depleted."}
            ],
            "mistakes": [
                "Taking cheap Magnesium Oxide and wondering why you get loose stools instead of muscle relaxation",
                "Taking high-dose Vitamin D without magnesium, depleting magnesium reserves during conversion",
                "Taking all of your daily magnesium in a single giant bolus rather than splitting or taking with dinner"
            ],
            "if_low": [
                "1. Add pumpkin seeds (1 oz), cooked spinach (1 cup), and almonds daily to your diet.",
                "2. Switch to 200-400 mg elemental Magnesium Glycinate or Malate with your evening meal.",
                "3. Ensure adequate hydration and reduce excessive alcohol and refined sugar consumption."
            ],
            "if_too_much": {
                "acute": "Osmotic diarrhea, gastrointestinal cramping, and loose watery stools.",
                "chronic": "Excess oral magnesium is rapidly excreted in urine by healthy kidneys; no accumulation occurs.",
                "mechanism": "Unabsorbed magnesium salts draw water into the intestinal lumen via osmosis.",
                "signs": "Sudden watery diarrhea within 1-3 hours of taking high doses.",
                "when_medical": "Seek immediate evaluation if severe drowsiness, low blood pressure, or kidney failure is present."
            },
            "research": [
                {
                    "title": "Oral Magnesium Supplementation in Insulin Resistance and Type 2 Diabetes: A Systematic Review and Meta-Analysis",
                    "year": "2017",
                    "study_type": "Meta-Analysis of Randomized Controlled Trials",
                    "evidence_level": "strong",
                    "summary": "Meta-analysis of 28 RCTs found that magnesium supplementation significantly reduced fasting plasma glucose, 2-hour oral glucose tolerance test levels, and HOMA-IR insulin resistance scores.",
                    "source": "Diabetes & Metabolism",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/28724644/"
                },
                {
                    "title": "The Effect of Magnesium Supplementation on Primary Insomnia in Elderly: A Double-Blind Clinical Trial",
                    "year": "2012",
                    "study_type": "Double-Blind Placebo-Controlled RCT",
                    "evidence_level": "strong",
                    "summary": "500 mg daily magnesium supplementation for 8 weeks statistically significantly increased sleep time, sleep efficiency, and circulating melatonin, while decreasing sleep onset latency and serum cortisol.",
                    "source": "Journal of Research in Medical Sciences",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/23853635/"
                }
            ]
        }
    },

    # -----------------------------------------------------------------
    # IRON
    # -----------------------------------------------------------------
    "iron": {
        "subject": "Iron",
        "category": "Minerals",
        "query_type": "mineral",
        "one_liner": "An indispensable transition metal central to hemoglobin oxygen transport, myoglobin muscle oxygen storage, and mitochondrial cytochrome electron transport.",
        "science_score": 99,
        "science_score_rationale": "Unequivocal biochemical consensus across a century of hematology on iron's role in protoporphyrin IX heme groups, cellular respiration, and erythropoiesis.",
        "safety_level": "yellow",
        "quick_answer": "Iron is a vital trace mineral that forms the central catalytic atom in hemoglobin (which delivers oxygen from lungs to tissues) and myoglobin (which stores oxygen in muscle cells). It is also a core component of mitochondrial cytochromes that generate ATP. Because the human body has no active physiological pathway for iron excretion, absorption is tightly regulated by the liver hormone hepcidin.",
        "followups": [
            "What is the difference between Heme Iron and Non-Heme Iron?",
            "How does Vitamin C increase non-heme plant iron absorption?",
            "Why should tea and coffee be avoided within 1 hour of iron-rich meals?",
            "What is the difference between Serum Iron and Ferritin?"
        ],
        "sections": {
            "what_is_it": {
                "beginner": "Iron is an essential mineral that helps your red blood cells carry oxygen from your lungs to every muscle and organ in your body, keeping your energy high.",
                "advanced": "Iron is a redox-active transition metal (Fe2+ ferrous / Fe3+ ferric) incorporated into heme proteins (hemoglobin, myoglobin, cytochromes a/b/c) and non-heme iron-sulfur (Fe-S) cluster enzymes essential for mitochondrial oxidative phosphorylation, ribonucleotide reductase DNA synthesis, and hepatic xenobiotic detoxification via Cytochrome P450."
            },
            "why_important": [
                {"title": "Systemic Oxygen Transport (Hemoglobin)", "evidence": "strong", "detail": "Binds molecular O2 at four heme iron sites per hemoglobin tetramer, delivering oxygen from pulmonary capillaries to peripheral tissues."},
                {"title": "Intracellular Muscle Oxygen Reservoir (Myoglobin)", "evidence": "strong", "detail": "Supplies oxygen directly to exercising skeletal and cardiac muscle fibers during high metabolic exertion."},
                {"title": "Mitochondrial Electron Transport Chain Energetics", "evidence": "strong", "detail": "Core constituent of Cytochromes and Complexes I, II, and III, driving oxidative phosphorylation and ATP generation."},
                {"title": "DNA Replication & Neurotransmitter Synthesis", "evidence": "strong", "detail": "Required for ribonucleotide reductase and tyrosine hydroxylase (converting tyrosine to L-DOPA for dopamine synthesis)."}
            ],
            "affects": [
                {"system": "Blood & Bone Marrow", "level": "primary", "detail": "Directs erythropoiesis and determines mean corpuscular volume (MCV) and hemoglobin concentration."},
                {"system": "Muscles", "level": "primary", "detail": "Replenishes myoglobin oxygen reserves and powers mitochondrial oxidative enzymes for endurance."},
                {"system": "Brain & Cognition", "level": "primary", "detail": "Required for dopamine synthesis, oligodendrocyte myelinogenesis, and neurocognitive focus."},
                {"system": "Immune System", "level": "secondary", "detail": "Fuels leukocyte respiratory burst; tightly sequestered by lactoferrin during infection to starve pathogens."}
            ],
            "mechanism": {
                "summary": "Iron is the central coordination atom in heme groups of hemoglobin (oxygen transport) and myoglobin (muscle oxygen storage), as well as electron-transport cytochromes.",
                "steps": [
                    {"stage": "Duodenal Uptake (Heme vs Non-Heme)", "detail": "Heme iron is internalized intact via HCP1 (15-35% bioavailable); non-heme Fe3+ is reduced to Fe2+ by duodenal cytochrome b (DCYTB) and imported via DMT1 (2-12% bioavailable)."},
                    {"stage": "Mucosal Ferritin Storage & Hepcidin Gating", "detail": "Stored in enterocyte ferritin or exported to blood through basolateral ferroportin channels regulated by hepatic hepcidin."},
                    {"stage": "Transferrin Transport & Oxidation", "detail": "Ferroportin-exported Fe2+ is oxidized to Fe3+ by hephaestin and bound with high affinity to plasma Transferrin."},
                    {"stage": "Transferrin Receptor Endocytosis", "detail": "Internalized by target erythroblasts and muscle cells via CD71 (TfR1) receptor-mediated endocytosis for heme synthesis."}
                ]
            },
            "uses": {
                "strong": ["Treating and preventing Iron Deficiency Anemia (IDA) and microcytic anemia", "Restoring exercise work capacity, VO2 max, and thermoregulation in iron-depleted individuals", "Supporting healthy fetal neural development and maternal blood volume expansion during pregnancy"],
                "moderate": ["Alleviating Restless Leg Syndrome (RLS) in patients with low ferritin (<50 ng/mL)", "Improving cognitive attention and reducing fatigue in non-anemic iron-deficient females"],
                "emerging": ["Modulating thyroid peroxidase (TPO) activity for healthy T4 synthesis in hypothyroid cohorts"],
                "insufficient": ["Supplementing blindly without blood work (excess iron causes oxidative Fenton-reaction tissue damage)"]
            },
            "deficiency": {
                "causes": ["Chronic blood loss (heavy menstrual bleeding / menorrhagia, GI ulcers, frequent blood donations)", "Low dietary intake of bioavailable heme iron (strict vegan/vegetarian diets without strategic pairing)", "Impaired gastrointestinal absorption (Celiac disease, H. pylori, low stomach acid, gastric bypass)", "High athletic foot-strike hemolysis and heavy sweat loss in endurance runners"],
                "effects": ["Microcytic hypochromic anemia (low MCV, low MCH, low hemoglobin)", "Severe fatigue, exertional dyspnea (shortness of breath), and rapid heart rate / palpitations", "Pale conjunctiva, cold extremities, brittle spoon-shaped nails (koilonychia), and hair shedding", "Impaired dopamine synthesis causing Restless Leg Syndrome and brain fog"],
                "symptoms": ["Chronic exhaustion & weakness", "Shortness of breath on stairs", "Cold hands & feet", "Pale skin & dark under-eye circles", "Craving ice or starch (Pica)"],
                "symptoms_note": "Iron deficiency progresses in 3 distinct stages: 1) Storage depletion (low Ferritin), 2) Iron-deficient erythropoiesis (high TIBC, low Transferrin Saturation), 3) Overt Iron Deficiency Anemia (low Hemoglobin).",
                "risk_groups": ["Premenopausal menstruating females", "Pregnant and postpartum women", "Strict vegetarians and vegans", "Endurance athletes (runners, triathletes)", "Frequent blood donors"],
                "testing": "Complete Iron Panel: Serum Ferritin (<30 ng/mL indicates storage depletion; optimal 50-100 ng/mL), Serum Iron, TIBC, Transferrin Saturation (ideal >20%), and Complete Blood Count (CBC/Hemoglobin)."
            },
            "food_sources": [
                {"food": "Grass-Fed Beef & Organ Meats", "amount": "150g (5 oz)", "content": "3.5 - 5.5 mg bioavailable Heme Iron (30% RDA)", "bioavailability": "high (15-35%)", "serving": "1 palm-size cut", "type": "animal"},
                {"food": "Cooked Lentils (Dal)", "amount": "200g (1 cup)", "content": "6.6 mg Non-Heme Iron (37% RDA)", "bioavailability": "moderate (5-12%)", "serving": "1 bowl cooked", "type": "plant"},
                {"food": "Cooked Spinach / Palak", "amount": "180g (1 cup)", "content": "6.4 mg Non-Heme Iron (35% RDA)", "bioavailability": "moderate (enhanced by Vit C)", "serving": "1 cup cooked", "type": "plant"},
                {"food": "Roasted Pumpkin Seeds (Pepitas)", "amount": "30g (1 oz)", "content": "4.2 mg Non-Heme Iron (23% RDA)", "bioavailability": "moderate", "serving": "1/4 cup", "type": "plant"},
                {"food": "Black Chickpeas (Kala Chana) / Sattu", "amount": "100g", "content": "4.5 mg Non-Heme Iron (25% RDA)", "bioavailability": "moderate", "serving": "1 glass sattu / bowl", "type": "plant"},
                {"food": "Canned Sardines / Oysters", "amount": "85g (3 oz)", "content": "2.5 - 7.0 mg Heme Iron", "bioavailability": "high", "serving": "1 can / 6 oysters", "type": "animal"}
            ],
            "absorption": {
                "increases": [
                    "Pairing non-heme iron with Vitamin C (citrus, amla, bell peppers, tomatoes) converts insoluble Fe3+ to soluble Fe2+, boosting absorption 3-4x",
                    "Cooking in cast-iron skillets (leaches elemental dietary iron into acidic foods)",
                    "Co-ingesting with animal tissue proteins ('meat factor' peptides that protect iron in the gut lumen)"
                ],
                "decreases": [
                    "Polyphenols and tannins in black tea, green tea, and coffee consumed within 1 hour of meals (bind iron irreversibly)",
                    "Phytic acid in unsoaked raw grains and bran",
                    "High single-dose Calcium (>300mg) or high-dose Zinc competing directly at DMT1 enterocyte transporters",
                    "Proton Pump Inhibitors (PPIs) reducing gastric hydrochloric acid needed to solubilize iron"
                ],
                "forms": [
                    "Ferrous Bisglycinate: Chelate bound to two glycine molecules; superior gastrointestinal tolerability, higher absorption, and minimal constipation.",
                    "Heme Iron Polypeptide: Natural pre-formed heme extracted from bovine hemoglobin; absorbed intact via HCP1 without requiring stomach acid.",
                    "Ferrous Fumarate / Sulfate: Classic clinical pharmaceutical salts; high elemental density but commonly cause nausea, dark stools, and constipation."
                ],
                "notes": "Always confirm low Ferritin (<30 ng/mL) with a blood panel before beginning supplemental iron."
            },
            "requirements": {
                "rda": "8 mg/day for adult men and postmenopausal women; 18 mg/day for premenopausal women (27 mg/day during pregnancy)",
                "groups": [
                    {"group": "Adult Men & Postmenopausal Females", "amount": "8 mg/day (low baseline turnover; higher intake can lead to iron accumulation)"},
                    {"group": "Menstruating Women", "amount": "18 mg/day (offsets monthly menstrual blood losses)"},
                    {"group": "Strict Vegetarians & Vegans", "amount": "1.8x standard RDA (~14-32 mg/day due to lower non-heme bioavailability)"},
                    {"group": "Pregnant Women", "amount": "27 mg/day (fuels 40-50% plasma volume expansion and placental growth)"}
                ],
                "ul": "45 mg/day (Tolerable Upper Intake Level for adults to avoid gastrointestinal ulceration and systemic oxidative stress)",
                "note": "Unlike water-soluble vitamins, excess iron is NOT excreted in urine and accumulates in the liver, heart, and pancreas."
            },
            "supplementation": {
                "who_might": ["Individuals with clinically verified low Ferritin (<30 ng/mL) or iron deficiency anemia", "Women with heavy menstrual cycles", "Pregnant women under obstetric guidance"],
                "who_probably_not": ["Men and postmenopausal women with normal ferritin levels", "Individuals carrying HFE genetic mutations for Hereditary Hemochromatosis"],
                "forms": ["Ferrous Bisglycinate (gentle chelate)", "Heme Iron Polypeptide", "Ferrous Fumarate"],
                "typical_amounts": "25 - 65 mg elemental iron on alternate days (alternate-day dosing lowers hepcidin elevation and doubles fractional absorption)",
                "timing": "Morning on an empty stomach with a glass of water and 200mg Vitamin C (or with a light non-dairy, non-tea meal if sensitive)",
                "with_food": "Avoid dairy, calcium, eggs, tea, and coffee within 2 hours of taking iron",
                "duration": "3 to 6 months until Ferritin reaches >50-70 ng/mL, then retest",
                "cycling": "Stop once ferritin and hemoglobin are fully replete"
            },
            "safety": {
                "level": "yellow",
                "upper_limit": "45 mg/day elemental iron (IOM UL)",
                "toxicity": "Acute overdose (>20 mg/kg elemental iron) is a medical emergency causing corrosive GI mucosal necrosis, hepatic failure, and metabolic acidosis.",
                "overdose": "Chronic overload (Ferritin >300-500+ ng/mL) catalyzes Haber-Weiss and Fenton reactions generating toxic hydroxyl radicals (OH•), damaging hepatocytes and pancreatic beta cells (bronze diabetes).",
                "drug_interactions": [
                    "Levothyroxine (Thyroid Hormone): Iron binds T4, blunting absorption (must separate by at least 4 hours).",
                    "Quinolone and Tetracycline Antibiotics: Chelation reduces antibiotic bioavailability.",
                    "Antacids and PPIs: Inhibit iron dissolution by suppressing gastric acid."
                ],
                "contraindications": ["Hemochromatosis (HFE gene mutations)", "Thalassemia / Hemolytic Anemias (unless co-existing iron deficiency proven)", "Active systemic infections"],
                "special_populations": ["Never give adult iron supplements to young children (leading cause of pediatric poisonings; keep locked away)."]
            },
            "interactions": [
                {"substance": "Vitamin C (Ascorbic Acid)", "interaction": "Dramatically increases absorption", "mechanism": "Reduces Fe3+ to soluble Fe2+ and prevents insoluble chelate formation", "importance": "critical"},
                {"substance": "Tannins & Tea Polyphenols", "interaction": "Severely decreases absorption", "mechanism": "Forms insoluble iron-tannate precipitates that pass unabsorbed in feces", "importance": "critical"},
                {"substance": "Calcium", "interaction": "Competitive inhibition", "mechanism": "Competes directly for DMT1 and basolateral transport mechanisms", "importance": "high"},
                {"substance": "Copper", "interaction": "Essential cofactor for transport", "mechanism": "Ceruloplasmin and hephaestin are copper-dependent ferroxidases required to load iron onto transferrin", "importance": "high"}
            ],
            "timing": {
                "matters": True,
                "detail": "Take on alternate days (every other day) in the morning with Vitamin C. Alternate-day dosing prevents the post-dose hepcidin spike that blunts consecutive-day iron absorption."
            },
            "performance": {
                "muscle": "Replenishes myoglobin, preserving intramuscular oxygenation during repeated high-intensity muscular contractions.",
                "strength": "Supports neuromuscular force generation by maintaining cytochrome electron transport in motor units.",
                "fat_loss": "Maintains thyroid peroxidase activity and basal metabolic rate (hypothyroidism is worsened by low ferritin).",
                "recovery": "Accelerates lactic acid clearance and oxidative replenishment between hard interval bouts.",
                "athletic": "Directly determines maximal aerobic capacity (VO2 max) and power output at lactate threshold.",
                "energy": "Eliminates the profound cellular fatigue, heavy legs, and brain fog caused by oxygen delivery deficits.",
                "sleep": "Prevents dopaminergic dysfunction and leg restlessness (Restless Leg Syndrome) that disrupts deep sleep.",
                "cognitive": "Cofactor for tyrosine hydroxylase, supporting dopamine synthesis for executive focus and drive.",
                "hormones": "Essential for thyroid hormone T4-to-T3 peripheral conversion.",
                "metabolic": "Drives electron transport through Complexes I-IV in mitochondrial inner membranes."
            },
            "biomarkers": [
                {"marker": "Serum Ferritin", "measures": "Total body iron storage protein in hepatocytes and macrophages.", "matters": "Single most sensitive marker for iron deficiency (<30 ng/mL = depletion; optimal = 50-100 ng/mL).", "limitations": "Ferritin is an acute-phase reactant that falsely spikes during inflammation, infection, or liver disease.", "when": "Investigating fatigue, hair loss, heavy periods, or endurance decline."},
                {"marker": "Transferrin Saturation (TSAT)", "measures": "Percentage of iron-binding sites on transferrin occupied by iron (Serum Iron / TIBC x 100).", "matters": "Directly indicates iron supply available to bone marrow erythroblasts (optimal = 25 - 45%; <20% = iron deficiency; >50% = iron overload).", "limitations": "Fluctuates with recent meals.", "when": "Comprehensive iron deficiency or hemochromatosis workup."},
                {"marker": "Complete Blood Count (CBC) - Hemoglobin & MCV", "measures": "Total oxygen-carrying capacity and red blood cell physical size.", "matters": "Identifies overt anemia (Hemoglobin <12 g/dL women, <13.5 g/dL men; MCV <80 fL = microcytosis).", "limitations": "Changes only after long-standing chronic iron depletion.", "when": "Routine wellness check or anemia diagnosis."}
            ],
            "myths": [
                {"myth": "Spinach provides just as much bioavailable iron as red meat", "fact": "While raw spinach has non-heme iron, high concentrations of oxalates and phytates bind it, resulting in only ~2-5% absorption compared to 20-35% absorption from heme iron in beef."},
                {"myth": "If you are tired, you should start taking an iron supplement immediately", "fact": "Taking iron without a blood test is dangerous. Fatigue can be caused by sleep, thyroid, B12, or viral causes. Excess iron cannot be excreted and causes severe liver and cardiovascular oxidative damage."}
            ],
            "mistakes": [
                "Drinking hot tea or coffee with breakfast right after taking an iron supplement, completely neutralizing absorption",
                "Taking iron daily instead of alternate-day dosing, which triggers hepcidin and cuts absorption in half",
                "Taking iron with calcium or dairy products which block intestinal iron transporters"
            ],
            "if_low": [
                "1. Confirm with a Complete Iron Panel (Ferritin, Serum Iron, TIBC, TSAT, and CBC).",
                "2. Pair non-heme plant iron meals (lentils, beans, spinach) with fresh lemon juice, amla, or red bell peppers (Vitamin C).",
                "3. If supplementing under doctor guidance, take 25-65 mg Ferrous Bisglycinate on alternate days with Vitamin C on an empty stomach."
            ],
            "if_too_much": {
                "acute": "Severe gastrointestinal ulceration, bloody vomiting, abdominal pain, shock.",
                "chronic": "Hemochromatosis: iron accumulation in liver (cirrhosis), pancreas (diabetes), heart (cardiomyopathy), and skin (bronzing).",
                "mechanism": "Unbound free iron catalyzes hydroxyl free radical generation (Fenton reaction), destroying lipid membranes and cellular DNA.",
                "signs": "Unexplained joint pain, dark slate-gray skin pigmentation, elevated liver enzymes (AST/ALT), high ferritin (>400 ng/mL).",
                "when_medical": "Seek immediate medical evaluation if suspected accidental ingestion in children or elevated transferrin saturation >50%."
            },
            "research": [
                {
                    "title": "Iron Deficiency Anemia in Women: A Practical Guide to Diagnosis and Management",
                    "year": "2020",
                    "study_type": "Clinical Review & Guideline",
                    "evidence_level": "strong",
                    "summary": "Reviews clinical evidence that oral iron taken on alternate days (every 48 hours) optimizes fractional absorption by 33% and dramatically reduces gastrointestinal adverse events compared to consecutive daily dosing.",
                    "source": "The Lancet Haematology",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/32950073/"
                },
                {
                    "title": "Effect of Vitamin C on Non-Heme Iron Bioavailability",
                    "year": "2015",
                    "study_type": "Systematic Review of Stable Isotope Studies",
                    "evidence_level": "strong",
                    "summary": "Demonstrated that adding 50-100 mg ascorbic acid to high-phytate meals increased non-heme iron absorption by up to 300-400% by chelating iron at low gastric pH and preventing insoluble polyphenol-iron polymerization.",
                    "source": "American Journal of Clinical Nutrition",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/25501869/"
                }
            ]
        }
    },

    # -----------------------------------------------------------------
    # VITAMIN D
    # -----------------------------------------------------------------
    "vitamin_d": {
        "subject": "Vitamin D3 (Cholecalciferol)",
        "category": "Vitamins",
        "query_type": "vitamin",
        "one_liner": "A fat-soluble secosteroid prohormone essential for calcium-phosphorus homeostasis, immune macrophage cathelicidin production, and genomic transcription across >1,000 genes.",
        "science_score": 98,
        "science_score_rationale": "Extensive clinical literature detailing cutaneous synthesis, nuclear VDR receptor activation, bone mineralization, and innate immune modulation.",
        "safety_level": "green",
        "quick_answer": "Vitamin D is a potent nuclear secosteroid hormone rather than a simple vitamin. Synthesized in the skin via solar UV-B radiation (290-315 nm) from 7-dehydrocholesterol, it undergoes hepatic 25-hydroxylation to 25(OH)D and renal 1α-hydroxylation to active 1,25(OH)2D (calcitriol). Calcitriol binds the intracellular Vitamin D Receptor (VDR) to regulate intestinal calcium absorption, skeletal bone remodeling, and antimicrobial peptide synthesis in immune cells.",
        "followups": [
            "Why is Vitamin D3 (Cholecalciferol) superior to Vitamin D2 (Ergocalciferol)?",
            "Why must Vitamin D always be paired with Vitamin K2 and dietary fat?",
            "What is the optimal blood level of 25(OH)D for longevity and immune health?",
            "How does skin melanin density and latitude affect natural sun synthesis?"
        ],
        "sections": {
            "what_is_it": {
                "beginner": "Vitamin D (the 'sunshine vitamin') is an essential hormone that helps your body absorb calcium for strong bones, boosts your immune defenses against sickness, and supports mood and muscle strength.",
                "advanced": "Cholecalciferol (Vitamin D3) is a secosteroid that functions as a master transcriptional regulator. Upon binding the intracellular Vitamin D Receptor (VDR) and heterodimerizing with the Retinoid X Receptor (RXR), the VDR-RXR complex binds Vitamin D Response Elements (VDREs) in promoter regions, directly modulating the expression of >1,000 human genes."
            },
            "why_important": [
                {"title": "Intestinal Calcium & Phosphorus Absorption", "evidence": "strong", "detail": "Upregulates apical TRPV6 calcium channels and cytosolic calbindin-D9k in enterocytes, boosting calcium absorption from ~10% to 30-40%."},
                {"title": "Bone Matrix Remodeling & Mineralization", "evidence": "strong", "detail": "Prevents secondary hyperparathyroidism, osteomalacia in adults, and rickets in children by ensuring adequate calcium-phosphate solubility product."},
                {"title": "Innate & Adaptive Immune Regulation", "evidence": "strong", "detail": "Directly induces transcription of LL-37 cathelicidin and beta-defensin-2 in macrophages, driving intracellular pathogen clearance while suppressing inflammatory Th17 cytokines."},
                {"title": "Neuromuscular & Skeletal Muscle Contractility", "evidence": "strong", "detail": "Activates membrane VDRs in skeletal muscle myocytes, promoting calcium uptake into sarcoplasmic reticulum and maintaining fast-twitch Type II fiber cross-sectional area."}
            ],
            "affects": [
                {"system": "Immune System", "level": "primary", "detail": "Drives macrophage antimicrobial peptide (cathelicidin) expression and regulates dendritic cell tolerogenesis."},
                {"system": "Bones & Teeth", "level": "primary", "detail": "Maintains serum ionized calcium equilibrium and osteoblast/osteoclast mineral deposition."},
                {"system": "Endocrine & Parathyroid", "level": "primary", "detail": "Directly feeds back to parathyroid glands to suppress excessive parathyroid hormone (PTH) secretion."},
                {"system": "Muscles", "level": "primary", "detail": "Maintains fast-twitch Type II muscle fiber density and reduces fall risk in adults."}
            ],
            "mechanism": {
                "summary": "Vitamin D operates as a nuclear secosteroid hormone. Epidermal 7-dehydrocholesterol converts to D3 via solar UV-B, is hydroxylated in liver to 25(OH)D, and activated in kidneys to 1,25(OH)2D (calcitriol) to regulate >1000 genes.",
                "steps": [
                    {"stage": "Cutaneous Photolysis & Dietary Absorption", "detail": "Epidermal 7-dehydrocholesterol absorbs solar UV-B photons (290-315 nm) to form previtamin D3, which thermally isomerizes to Cholecalciferol (D3); dietary D3 is absorbed via lipid micellar uptake in the small intestine."},
                    {"stage": "Hepatic 25-Hydroxylation (CYP2R1)", "detail": "Transported by Vitamin D Binding Protein (DBP) to the liver, where microsomal 25-hydroxylase (CYP2R1) converts it to 25-hydroxyvitamin D3 [25(OH)D], the primary circulating storage biomarker (2-3 week half-life)."},
                    {"stage": "Renal & Tissue 1α-Hydroxylation (CYP27B1)", "detail": "In proximal renal tubules (stimulated by PTH) and target immune macrophages, 1α-hydroxylase (CYP27B1) converts 25(OH)D to active 1,25-dihydroxyvitamin D3 [1,25(OH)2D / Calcitriol]."},
                    {"stage": "Nuclear VDR-RXR Genomic Transcription", "detail": "Calcitriol binds the nuclear Vitamin D Receptor (VDR), pairs with RXR, and binds VDRE DNA sequences to alter transcription of calcium transporters and antimicrobial peptides."}
                ]
            },
            "uses": {
                "strong": ["Preventing and treating osteomalacia, rickets, and osteoporosis (when paired with calcium and Vitamin K2)", "Correcting clinical Vitamin D deficiency (25(OH)D < 20 ng/mL)", "Supporting respiratory immune defense and reducing acute respiratory tract infection risk"],
                "moderate": ["Improving muscular strength, balance, and reducing fall incidence in older adults", "Modulating autoimmune disease activity (Multiple Sclerosis, Hashimoto's thyroiditis, Psoriasis)"],
                "emerging": ["Modulating systemic inflammatory cytokines in metabolic syndrome", "Supporting testosterone synthesis and sperm motility in men with baseline deficiency"],
                "insufficient": ["Treating acute viral infections at mega-doses (>100,000 IU) without baseline deficiency"]
            },
            "deficiency": {
                "causes": ["Inadequate direct solar UV-B exposure (indoor lifestyles, living above 35° latitude during winter)", "Higher melanin skin pigmentation (melanin acts as a natural sunblock, requiring 3-5x longer sun exposure)", "Consistent sunscreen use (SPF 30 reduces cutaneous synthesis by >95%)", "Severe fat malabsorption (celiac, Crohn's, cystic fibrosis)", "Obesity (Vitamin D is sequestered into adipose tissue droplets, lowering circulating bioavailability)"],
                "effects": ["Secondary hyperparathyroidism, bone demineralization (osteopenia / osteoporosis / osteomalacia)", "Elevated susceptibility to upper respiratory infections and impaired wound healing", "Proximal muscle weakness, deep bone aching, and increased fatigue", "Impaired mood regulation and seasonal affective disorder (SAD)"],
                "symptoms": ["Frequent colds & infections", "Persistent deep bone or lower back ache", "Muscle weakness & fatigue", "Low mood / depression in winter", "Slow wound healing"],
                "symptoms_note": "Deficiency is exceptionally common globally (estimated >40-60% of adults in urban centers have insufficient levels).",
                "risk_groups": ["Individuals living at latitudes >35° (e.g. northern US, Europe, Canada, northern India in winter)", "People with dark skin tones living in low-sun regions", "Shift workers and office workers who stay indoors during solar noon", "Older adults with reduced epidermal 7-dehydrocholesterol synthesis", "Patients with obesity or bariatric surgery"],
                "testing": "Serum 25-Hydroxyvitamin D [25(OH)D]. Deficient: <20 ng/mL (<50 nmol/L); Insufficient: 21-29 ng/mL; Optimal: 40 - 70 ng/mL (100 - 175 nmol/L). Note: Never test 1,25(OH)2D to check deficiency."
            },
            "food_sources": [
                {"food": "Wild-Caught Salmon (Sockeye)", "amount": "150g fillet", "content": "600 - 1,000 IU Vitamin D3 (100-160% RDA)", "bioavailability": "high", "serving": "1 fillet", "type": "animal"},
                {"food": "Canned Sardines / Mackerel", "amount": "100g (1 can)", "content": "250 - 400 IU Vitamin D3 (40-65% RDA)", "bioavailability": "high", "serving": "1 can", "type": "animal"},
                {"food": "UV-Exposed Mushrooms", "amount": "100g", "content": "300 - 450 IU Vitamin D2 (50-75% RDA)", "bioavailability": "moderate", "serving": "1 cup sliced", "type": "plant"},
                {"food": "Pasture-Raised Egg Yolks", "amount": "2 whole eggs", "content": "80 - 120 IU Vitamin D3 (15-20% RDA)", "bioavailability": "high", "serving": "2 large eggs", "type": "animal"},
                {"food": "Fortified Milk / Plant Milks", "amount": "250 ml (1 glass)", "content": "100 - 120 IU D3/D2 (15-20% RDA)", "bioavailability": "moderate-high", "serving": "1 glass", "type": "plant"},
                {"food": "Cod Liver Oil", "amount": "1 teaspoon (5 ml)", "content": "400 - 500 IU Vitamin D3 + 4500 IU Vit A", "bioavailability": "very high", "serving": "1 tsp", "type": "animal"}
            ],
            "absorption": {
                "increases": [
                    "Consuming with a dietary fat-containing meal (avocado, eggs, olive oil, nuts) boosts intestinal micellar uptake by 30-50%",
                    "Adequate baseline magnesium status (magnesium is an obligatory cofactor for hepatic 25-hydroxylase and renal 1α-hydroxylase)"
                ],
                "decreases": ["Fat malabsorption syndromes (celiac, bile acid deficiency, pancreatitis)", "Weight loss medications (Orlistat / Xenical) that block fat absorption"],
                "forms": [
                    "Vitamin D3 (Cholecalciferol): Gold standard identical to human cutaneous synthesis; maintains circulating 25(OH)D levels ~87% more effectively than D2.",
                    "Vitamin D2 (Ergocalciferol): Plant/fungal form derived from yeast UV irradiation; clears more rapidly from circulation with lower affinity for DBP.",
                    "Calcifediol (25-Hydroxyvitamin D3): Pre-hydroxylated clinical form with ~3x faster absorption, used in severe malabsorption."
                ],
                "notes": "Always pair daily Vitamin D3 with Vitamin K2 (MK-7) to ensure absorbed calcium is directed into bones rather than arterial walls."
            },
            "requirements": {
                "rda": "600 IU/day (15 mcg) for adults up to age 70; 800 IU/day (20 mcg) for adults >70y",
                "groups": [
                    {"group": "Sedentary Adults with Regular Sun", "amount": "600 - 1,000 IU/day (maintains baseline adequacy)"},
                    {"group": "Adults with Minimal Sun / Winter", "amount": "2,000 - 4,000 IU/day (maintains optimal 40-60 ng/mL serum levels)"},
                    {"group": "Deficiency Repletion Protocol", "amount": "5,000 IU/day for 8-12 weeks under medical monitoring"}
                ],
                "ul": "4,000 IU/day (Institute of Medicine UL for adults; Endocrine Society notes up to 10,000 IU/day shows no toxicity in clinical trials without pre-existing hypercalcemia)",
                "note": "Baseline testing via 25(OH)D is essential to customize individual daily requirements."
            },
            "supplementation": {
                "who_might": ["Anyone living above 35° latitude during fall/winter months", "People who work indoors or wear full-coverage clothing", "Individuals with verified blood levels <30 ng/mL"],
                "who_probably_not": ["Individuals with active hypercalcemia, sarcoidosis, or hyperparathyroidism without endocrinologist oversight"],
                "forms": ["Vitamin D3 (Cholecalciferol) liquid drops or softgels", "D3 + K2 (MK-7) combinations"],
                "typical_amounts": "1,000 - 4,000 IU daily (adjusted based on blood test results)",
                "timing": "Morning or Lunch with your largest fat-containing meal (avoid taking late at night as it can suppress melatonin)",
                "with_food": "Always take with healthy dietary fats (olive oil, eggs, nuts)",
                "duration": "Ongoing daily maintenance in low-sun seasons; retest blood levels every 6 months",
                "cycling": "Reduce or pause in summer months if getting 20-30 minutes of midday full-body sun exposure"
            },
            "safety": {
                "level": "green",
                "upper_limit": "4,000 IU/day (IOM UL); Endocrine Society upper safe threshold is 10,000 IU/day",
                "toxicity": "Hypervitaminosis D occurs almost exclusively with chronic massive overdoses (>50,000-100,000 IU/day for months), causing hypercalcemia, hypercalciuria, and soft-tissue calcification.",
                "overdose": "Signs of hypercalcemia: nausea, vomiting, extreme thirst, polyuria, constipation, weakness, and confusion.",
                "drug_interactions": [
                    "Thiazide Diuretics: Concurrent high-dose Vitamin D can increase risk of hypercalcemia.",
                    "Corticosteroids (Prednisone): Reduce calcium absorption and impair Vitamin D metabolism.",
                    "Anticonvulsants (Phenytoin/Carbamazepine): Accelerate hepatic catabolism of Vitamin D to inactive metabolites."
                ],
                "contraindications": ["Pre-existing hypercalcemia or hypervitaminosis D", "Active Granulomatous disorders (Sarcoidosis, Tuberculosis) with unregulated extrarenal 1α-hydroxylase"],
                "special_populations": ["Vital during pregnancy and lactation for fetal skeletal development and reducing preeclampsia risk (2,000-4,000 IU/day recommended)."]
            },
            "interactions": [
                {"substance": "Vitamin K2 (MK-7)", "interaction": "Synergistic calcium routing", "mechanism": "Vitamin D drives calcium absorption; Vitamin K2 activates Osteocalcin (bone) and MGP (preventing arterial calcification)", "importance": "critical"},
                {"substance": "Magnesium", "interaction": "Obligatory enzymatic cofactor", "mechanism": "All enzymes that synthesize and activate Vitamin D (CYP2R1, CYP27B1) require magnesium", "importance": "critical"},
                {"substance": "Dietary Fat", "interaction": "Intestinal micellar absorption", "mechanism": "Fat stimulates bile acid secretion, increasing fat-soluble Vitamin D absorption by up to 50%", "importance": "high"}
            ],
            "timing": {
                "matters": True,
                "detail": "Take in the morning or early afternoon with a fat-containing meal. Some evidence suggests high doses taken late at night may interfere with pineal melatonin secretion and circadian rhythms."
            },
            "performance": {
                "muscle": "Maintains fast-twitch Type II fiber cross-sectional area and sarcoplasmic reticulum calcium handling.",
                "strength": "Supports maximal muscular force generation and reduces muscle weakness in deficient athletes.",
                "fat_loss": "Inversely associated with visceral adiposity; optimizes leptin sensitivity and metabolic flexibility.",
                "recovery": "Attenuates post-exercise muscle damage and accelerates structural repair.",
                "athletic": "Decreases stress fracture risk and reduces training days lost to upper respiratory viral infections.",
                "energy": "Improves mitochondrial oxidative capacity in skeletal muscle following repletion of deficient states.",
                "sleep": "VDR receptors in the anterior hypothalamus regulate circadian sleep-wake cycles and sleep depth.",
                "cognitive": "Neuroprotective antioxidant; promotes neurotrophin synthesis (NGF, GDNF) and regulates cerebral blood flow.",
                "hormones": "VDRs in Leydig cells support testicular steroidogenesis and maintain healthy circulating testosterone.",
                "metabolic": "Promotes pancreatic beta-cell insulin secretion via intracellular calcium flux regulation."
            },
            "biomarkers": [
                {"marker": "Serum 25-Hydroxyvitamin D [25(OH)D]", "measures": "Total circulating liver storage form (D2 + D3).", "matters": "Gold standard biomarker for whole-body Vitamin D status (optimal: 40 - 70 ng/mL or 100 - 175 nmol/L).", "limitations": "Has a 2-3 week half-life; does not reflect acute hour-to-hour fluctuations.", "when": "Annual blood test, post-winter screening, or investigating fatigue/bone pain."},
                {"marker": "Serum Calcium & Ionized Calcium", "measures": "Circulating calcium homeostasis.", "matters": "Monitors safety during high-dose Vitamin D therapy to rule out hypercalcemia (optimal: 8.8 - 10.2 mg/dL).", "limitations": "Tightly guarded by PTH.", "when": "Whenever monitoring high-dose Vitamin D supplementation."},
                {"marker": "Intact Parathyroid Hormone (iPTH)", "measures": "Parathyroid response to calcium and Vitamin D status.", "matters": "Elevated iPTH (>65 pg/mL) indicates functional cellular Vitamin D insufficiency.", "limitations": "Requires specialized handling.", "when": "Investigating metabolic bone disease or chronic kidney disease."}
            ],
            "myths": [
                {"myth": "Sitting in front of a sunny window provides Vitamin D", "fact": "Window glass blocks 100% of UV-B radiation (290-315 nm) needed to synthesize Vitamin D, while allowing UV-A through (which causes skin photoaging). You must be outdoors in direct sunlight."},
                {"myth": "Vitamin D is just a vitamin for bone health", "fact": "Vitamin D is a nuclear secosteroid hormone that regulates >1,000 genes affecting immune macrophage defenses, dopamine synthesis, cardiovascular tone, and muscular power."}
            ],
            "mistakes": [
                "Taking Vitamin D supplements on an empty stomach without fat, resulting in poor micellar absorption",
                "Taking Vitamin D3 without Magnesium, causing magnesium depletion as activation enzymes consume stored magnesium",
                "Taking high-dose Vitamin D without Vitamin K2, risking arterial and soft-tissue calcium deposition"
            ],
            "if_low": [
                "1. Get a baseline 25(OH)D blood test to determine your exact starting number.",
                "2. Supplement with 2,000 - 5,000 IU Vitamin D3 + 100 mcg Vitamin K2 (MK-7) daily with a fat-containing breakfast.",
                "3. Ensure 300-400 mg daily elemental Magnesium intake to provide cofactors for 25-hydroxylase activation.",
                "4. Retest 25(OH)D levels in 8-12 weeks to confirm you have reached the optimal 40-70 ng/mL range."
            ],
            "if_too_much": {
                "acute": "Nausea, vomiting, intense thirst, frequent urination, muscle weakness, confusion.",
                "chronic": "Hypercalcemia, calcification of renal parenchyma (nephrocalcinosis), and vascular arterial stiffening.",
                "mechanism": "Supra-physiological 25(OH)D overwhelms DBP and binds VDR directly, stimulating excessive bone resorption and hypercalcemia.",
                "signs": "Serum 25(OH)D > 150 ng/mL (>375 nmol/L) with elevated serum calcium > 10.5 mg/dL.",
                "when_medical": "Seek emergency medical care if severe confusion, cardiac arrhythmias, or intractable vomiting develops."
            },
            "research": [
                {
                    "title": "Vitamin D Supplementation to Prevent Acute Respiratory Tract Infections: Systematic Review and Meta-Analysis of Individual Participant Data",
                    "year": "2017",
                    "study_type": "Individual Participant Data Meta-Analysis of 25 RCTs",
                    "evidence_level": "strong",
                    "summary": "Meta-analysis of 11,321 participants across 25 randomized trials showed that daily or weekly Vitamin D supplementation was safe and protected against acute respiratory tract infections, with the greatest benefit in individuals with baseline 25(OH)D < 25 nmol/L (70% risk reduction).",
                    "source": "The BMJ (British Medical Journal)",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/28202713/"
                },
                {
                    "title": "Evaluation, Treatment, and Prevention of Vitamin D Deficiency: An Endocrine Society Clinical Practice Guideline",
                    "year": "2011",
                    "study_type": "Clinical Practice Guideline",
                    "evidence_level": "strong",
                    "summary": "Recommends maintaining serum 25(OH)D > 30 ng/mL (75 nmol/L) for optimal bone and non-skeletal health, and confirms that doses up to 10,000 IU/day in adults show no evidence of toxicity.",
                    "source": "Journal of Clinical Endocrinology & Metabolism",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/21646368/"
                }
            ]
        }
    },

    # -----------------------------------------------------------------
    # VITAMIN C
    # -----------------------------------------------------------------
    "vitamin_c": {
        "subject": "Vitamin C (Ascorbic Acid)",
        "category": "Vitamins",
        "query_type": "vitamin",
        "one_liner": "A vital water-soluble antioxidant and obligatory enzyme cofactor for collagen triple-helix synthesis, catecholamine production, and immune leukocyte function.",
        "science_score": 98,
        "science_score_rationale": "Over 70 years of clinical and biochemical research establishing ascorbic acid's electron-donating antioxidant mechanisms and collagen hydroxylation.",
        "safety_level": "green",
        "quick_answer": "Vitamin C (ascorbic acid) is an essential water-soluble micronutrient that humans cannot synthesize endogenously. It protects cells against reactive oxygen species (ROS), enables collagen prolyl-hydroxylation for connective tissue strength, and dramatically enhances non-heme iron absorption in the gut.",
        "followups": [
            "What is the difference between regular Ascorbic Acid and Liposomal Vitamin C?",
            "How much Vitamin C can the human body absorb in a single dose?",
            "Does Vitamin C actually prevent or shorten the common cold?",
            "Why does Vitamin C enhance non-heme plant iron absorption?"
        ],
        "sections": {
            "what_is_it": {
                "beginner": "Vitamin C is an essential vitamin found in fruits and vegetables that protects your cells from daily oxidative damage, strengthens skin and joints by making collagen, and supports your immune defenses.",
                "advanced": "L-Ascorbic acid is an essential electron donor (reducing agent) functioning as an enzyme cofactor for monooxygenases and dioxygenases involved in collagen biosynthesis (prolyl and lysyl hydroxylase), carnitine synthesis, and dopamine β-hydroxylase conversion to norepinephrine."
            },
            "why_important": [
                {"title": "Collagen Synthesis & Tissue Architecture", "evidence": "strong", "detail": "Cofactor for prolyl and lysyl hydroxylases required to cross-link collagen triple helices, essential for vascular integrity, wound healing, tendon tensile strength, and skin elasticity."},
                {"title": "Cellular Redox Defense & Radical Scavenging", "evidence": "strong", "detail": "Directly neutralizes superoxide, singlet oxygen, and lipid hydroperoxides, and recycles oxidized alpha-tocopherol (Vitamin E) back to its active antioxidant state."},
                {"title": "Immune Leukocyte & Phagocyte Function", "evidence": "strong", "detail": "Accumulates in neutrophils at 50-100x serum concentrations to fuel chemotaxis and respiratory burst, protecting host immune cells from self-induced oxidative lysis."},
                {"title": "Non-Heme Iron Bioavailability", "evidence": "strong", "detail": "Reduces dietary ferric iron (Fe3+) to soluble ferrous iron (Fe2+) in the duodenum, overcoming dietary phytate and tannin inhibition to boost absorption 3-4x."}
            ],
            "affects": [
                {"system": "Immune System", "level": "primary", "detail": "Concentrates in neutrophils and lymphocytes to enhance pathogen engulfment and oxidative burst."},
                {"system": "Skin & Connective Tissue", "level": "primary", "detail": "Obligatory for procollagen maturation, dermal extracellular matrix repair, and capillary strength."},
                {"system": "Heart & Blood Vessels", "level": "secondary", "detail": "Maintains endothelial nitric oxide synthase (eNOS) activity and preserves arterial elasticity."},
                {"system": "Metabolism & Mitochondria", "level": "secondary", "detail": "Required for carnitine-mediated mitochondrial fatty acid transport and adrenal hormone synthesis."}
            ],
            "mechanism": {
                "summary": "Ascorbic acid serves as a universal electron donor, transitioning to dehydroascorbic acid (DHA) while reducing transition metals (Fe2+/Cu+) at active enzymatic sites and regenerating intracellular antioxidants like glutathione and Vitamin E.",
                "steps": [
                    {"stage": "Intestinal Transport (SVCT1 & GLUT)", "detail": "Ascorbate is actively absorbed via sodium-dependent vitamin C transporter 1 (SVCT1) in the enterocyte membrane; oxidized DHA is imported via GLUT1/GLUT3 and immediately reduced back to ascorbate intracellularly."},
                    {"stage": "Plasma Saturation Kinetics", "detail": "Circulates unbound in plasma; renal threshold occurs around 70-80 µmol/L (roughly 200-400 mg daily intake), with fractional absorption dropping sharply above 500-1000 mg single boluses."},
                    {"stage": "Tissue Accumulation (SVCT2)", "detail": "Actively transported into adrenal glands, brain neurons, leukocytes, and eye lenses via SVCT2 against steep concentration gradients."},
                    {"stage": "Enzymatic Cofactor Action", "detail": "Keeps iron in the Fe2+ state for prolyl/lysyl hydroxylases (collagen) and copper in Cu+ for peptidylglycine α-amidating monooxygenase (neuropeptides)."}
                ]
            },
            "uses": {
                "strong": ["Preventing clinical scurvy and subclinical capillary fragility", "Enhancing gastrointestinal non-heme iron absorption from plant foods", "Supporting immune cell function and wound repair following physical trauma"],
                "moderate": ["Slightly reducing common cold duration and severity in high-stress/endurance athletes (~8-14%)", "Improving endothelial vasodilation in individuals with high oxidative stress"],
                "emerging": ["Topical photoprotection and dermal pigmentation modulation paired with Vitamin E", "Attenuating exercise-induced lipid peroxidation without blunting mitochondrial biogenesis at physiological doses"],
                "insufficient": ["Curing active viral infections or replacing standard oncological therapies at oral doses"]
            },
            "deficiency": {
                "causes": ["Low dietary intake of fresh fruits and vegetables", "Active smoking / nicotine exposure (increases metabolic turnover by ~35 mg/day)", "Severe malabsorption syndromes, chronic alcoholism, or extreme restrictive diets"],
                "effects": ["Impaired collagen cross-linking leading to bleeding gums (scorbutic gingivitis), petechiae, and poor wound healing", "Perifollicular hemorrhages and corkscrew hairs", "Chronic microcytic or normocytic anemia secondary to impaired iron absorption and blood loss"],
                "symptoms": ["Easy bruising & capillary rupture", "Bleeding, inflamed gums", "Slow wound recovery", "Lethargy & joint pain"],
                "symptoms_note": "Early marginal deficiency presents non-specifically as fatigue, irritability, and reduced infection resistance before overt scurvy develops.",
                "risk_groups": ["Cigarette smokers & chronic second-hand smoke exposure", "Individuals with restricted fruit/vegetable intake", "Patients on long-term restrictive feeding or severe GI disease"],
                "testing": "Plasma ascorbic acid concentration (<11.4 µmol/L indicates clinical deficiency; >50 µmol/L indicates tissue saturation)."
            },
            "food_sources": [
                {"food": "Guava (Amrood)", "amount": "1 medium (100g)", "content": "228 mg Vitamin C (250% RDA)", "bioavailability": "high", "serving": "1 whole fruit", "type": "plant"},
                {"food": "Red Bell Pepper (Capsicum)", "amount": "1 cup chopped (150g)", "content": "190 mg Vitamin C (211% RDA)", "bioavailability": "high", "serving": "1 cup raw/sautéed", "type": "plant"},
                {"food": "Amla (Indian Gooseberry)", "amount": "1 fruit (20g)", "content": "120 mg Vitamin C (133% RDA)", "bioavailability": "very high", "serving": "1 fresh fruit / juice", "type": "plant"},
                {"food": "Kiwi Fruit", "amount": "1 medium (75g)", "content": "70 mg Vitamin C (78% RDA)", "bioavailability": "high", "serving": "1 peeled fruit", "type": "plant"},
                {"food": "Oranges & Citrus", "amount": "1 medium orange (130g)", "content": "70 mg Vitamin C (78% RDA)", "bioavailability": "high", "serving": "1 whole orange", "type": "plant"},
                {"food": "Cooked Broccoli / Brussels Sprouts", "amount": "1 cup cooked (150g)", "content": "80 mg Vitamin C (89% RDA)", "bioavailability": "moderate-high", "serving": "1 cup steamed", "type": "plant"}
            ],
            "absorption": {
                "increases": ["Eating raw or lightly steamed produce (Vitamin C is heat-labile and degrades with prolonged boiling)", "Consuming in divided doses (e.g. 200 mg x 2 vs 1000 mg at once absorbs at ~80% vs ~40%)"],
                "decreases": ["Prolonged cooking in open water and high heat exposure", "Heavy alcohol consumption inhibiting SVCT1 transporters", "Supra-physiological single boluses (>1000 mg) saturating SVCT1 transporters"],
                "forms": [
                    "L-Ascorbic Acid: Gold standard identical to natural vitamin C; highest elemental density (~100%).",
                    "Sodium / Calcium Ascorbate (Buffered C): Mineral salts that are less acidic and gentler on sensitive stomachs.",
                    "Liposomal Vitamin C: Phospholipid-encapsulated form that partially bypasses SVCT1 via lymphatic micellar uptake, providing slightly higher peak plasma concentrations at very high single doses.",
                    "Ascorbyl Palmitate: Fat-soluble ester primarily used in topical skincare formulations."
                ],
                "notes": "At standard nutritional doses (100-200 mg), regular ascorbic acid achieves ~85-90% bioavailability, making expensive designer forms unnecessary for daily wellness."
            },
            "requirements": {
                "rda": "75 mg/day for adult females, 90 mg/day for adult males (+35 mg/day for active smokers)",
                "groups": [
                    {"group": "Sedentary Adults", "amount": "75 - 90 mg/day (prevents deficiency & maintains baseline tissue saturation)"},
                    {"group": "Active Athletes & High Stress", "amount": "200 - 500 mg/day (supports elevated turnover & connective tissue turnover)"},
                    {"group": "Smokers / Environmental Pollution", "amount": "120 - 150 mg/day (offsets accelerated metabolic depletion)"}
                ],
                "ul": "2,000 mg/day (Tolerable Upper Intake Level for adults to avoid osmotic diarrhea and GI cramps)",
                "note": "A daily intake of 200-400 mg from whole fruits and vegetables fully saturates plasma and leukocytes in healthy adults."
            },
            "supplementation": {
                "who_might": ["Individuals with low vegetable/fruit intake", "Endurance athletes during heavy training blocks", "People seeking to boost iron absorption from plant foods"],
                "who_probably_not": ["Individuals with hereditary hemochromatosis or recurrent calcium oxalate kidney stones"],
                "forms": ["L-Ascorbic Acid", "Sodium Ascorbate (Buffered)", "Liposomal Vitamin C"],
                "typical_amounts": "250 - 500 mg daily",
                "timing": "With meals containing non-heme iron (dal, beans, leafy greens) to multiply iron absorption",
                "with_food": "Take with food or a glass of water",
                "duration": "Safe for ongoing daily use",
                "cycling": "No cycling required"
            },
            "safety": {
                "level": "green",
                "upper_limit": "2,000 mg/day (IOM UL)",
                "toxicity": "Non-toxic; excess is cleared by renal excretion.",
                "overdose": "High single doses (>2,000 mg) cause osmotic diarrhea, stomach cramps, and increased urinary oxalate excretion.",
                "drug_interactions": [
                    "Warfarin: Very high doses (>10g/day) may shorten prothrombin time.",
                    "Statins/Niacin: Megadose antioxidants might blunt HDL increases from niacin therapy."
                ],
                "contraindications": ["History of calcium oxalate nephrolithiasis (kidney stones)", "G6PD deficiency (high IV doses can cause hemolysis)", "Hemochromatosis"],
                "special_populations": ["Safe and essential in pregnancy (85 mg/day) and lactation (120 mg/day)."]
            },
            "interactions": [
                {"substance": "Non-Heme Iron", "interaction": "Dramatically increases absorption", "mechanism": "Converts Fe3+ to soluble Fe2+ in duodenal lumen", "importance": "critical"},
                {"substance": "Vitamin E (Alpha-Tocopherol)", "interaction": "Antioxidant recycling synergy", "mechanism": "Ascorbate reduces tocopheroxyl radical back to active alpha-tocopherol", "importance": "high"},
                {"substance": "Glutathione", "interaction": "Redox cycling", "mechanism": "Glutathione regenerates reduced ascorbate from dehydroascorbic acid", "importance": "high"}
            ],
            "timing": {
                "matters": True,
                "detail": "Consume alongside plant-based iron meals (lentils, spinach, seeds) to maximize mineral uptake. Avoid massive antioxidant megadoses immediately post-workout to preserve training adaptations."
            },
            "performance": {
                "muscle": "Promotes collagen cross-linking in tendons, ligaments, and muscle fascial sheaths.",
                "strength": "Protects contractile proteins from severe oxidative degradation under extreme eccentric loads.",
                "fat_loss": "Obligatory cofactor for carnitine synthesis, facilitating fatty acid transport into mitochondria.",
                "recovery": "Accelerates soft-tissue repair and capillary revascularization after training micro-trauma.",
                "athletic": "Maintains leukocyte integrity and reduces incidence of post-race upper respiratory tract infections.",
                "energy": "Supports adrenal catecholamine synthesis (converting dopamine to norepinephrine).",
                "sleep": "Neutral; modulates central nervous system oxidative tone.",
                "cognitive": "Protects synaptic membranes and neurotransmitter vesicle storage.",
                "hormones": "Concentrated in adrenal cortex; involved in corticosteroid synthesis during acute stress.",
                "metabolic": "Recycles alpha-tocopherol to prevent lipid peroxidation in cellular membranes."
            },
            "biomarkers": [
                {"marker": "Plasma Ascorbic Acid", "measures": "Circulating Vitamin C level.", "matters": "Assesses adequacy (>50 µmol/L indicates tissue saturation; <11.4 µmol/L indicates deficiency).", "limitations": "Sensitive to recent dietary intake.", "when": "Investigating slow wound healing, bleeding gums, or severe fatigue."}
            ],
            "myths": [
                {"myth": "Synthetic ascorbic acid is inferior to 'natural' food-derived Vitamin C", "fact": "Chemically, L-ascorbic acid in supplements is molecularly identical to the ascorbic acid found in oranges and kiwis, with equivalent bioavailability."},
                {"myth": "Taking 5,000 mg of Vitamin C prevents you from ever catching a cold", "fact": "Studies show regular Vitamin C slightly reduces cold duration by ~8-14%, but does not prevent catching a virus in ordinary non-athlete populations."}
            ],
            "mistakes": [
                "Boiling vegetables for long periods, which leaches water-soluble Vitamin C into discard water",
                "Taking massive single doses (2000mg+) all at once instead of spreading intake across the day",
                "Taking megadoses immediately before or after endurance training, which can blunt physiological ROS signaling for mitochondrial biogenesis"
            ],
            "if_low": [
                "1. Add 1 fresh Amla, 1 cup guava, or 1 red bell pepper daily to your meals.",
                "2. Squeeze fresh lemon or lime juice over non-heme iron meals (dal, lentils, spinach) to multiply iron uptake.",
                "3. If supplementing, take 250-500 mg daily of standard ascorbic acid or buffered ascorbate with food."
            ],
            "if_too_much": {
                "acute": "Osmotic diarrhea, gastrointestinal cramping, abdominal bloating, and nausea from unabsorbed ascorbate in the colon.",
                "chronic": "Increased urinary excretion of oxalate and uric acid, which can elevate kidney stone risk in genetically susceptible individuals.",
                "mechanism": "Unabsorbed ascorbate exerts an osmotic draw in the bowel lumen; excessive metabolic conversion to oxalic acid.",
                "signs": "Watery loose stools and stomach gurgling within 2-4 hours of high bolus ingestion.",
                "when_medical": "Seek evaluation if severe flank pain, dysuria, or hematuria develops (indicative of nephrolithiasis)."
            },
            "research": [
                {
                    "title": "Vitamin C for Preventing and Treating the Common Cold",
                    "year": "2013",
                    "study_type": "Cochrane Systematic Review & Meta-Analysis",
                    "evidence_level": "strong",
                    "summary": "Regular supplementation (0.2-2g/day) in 11,306 participants reduced cold duration by 8% in adults and 14% in children, and halved cold incidence in marathoners and skiers exposed to extreme cold/physical stress.",
                    "source": "Cochrane Database of Systematic Reviews",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/23440782/"
                },
                {
                    "title": "Vitamin C and Immune Function",
                    "year": "2017",
                    "study_type": "Comprehensive Scientific Review",
                    "evidence_level": "strong",
                    "summary": "Demonstrates that vitamin C stimulates leukocyte migration to infection sites, enhances phagocytosis and ROS generation, and protects host tissue from collateral oxidative damage.",
                    "source": "Nutrients / MDPI",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/29099763/"
                }
            ]
        }
    },

    # -----------------------------------------------------------------
    # VITAMIN B12
    # -----------------------------------------------------------------
    "vitamin_b12": {
        "subject": "Vitamin B12 (Cobalamin)",
        "category": "Vitamins",
        "query_type": "vitamin",
        "one_liner": "An essential cobalt-containing organometallic cofactor indispensable for DNA synthesis, red blood cell erythropoiesis, and neurological myelin sheath maintenance.",
        "science_score": 99,
        "science_score_rationale": "Unequivocal biochemical consensus across 80+ years on B12's role in methionine synthase and L-methylmalonyl-CoA mutase.",
        "safety_level": "green",
        "quick_answer": "Vitamin B12 (cobalamin) is a complex water-soluble micronutrient synthesized exclusively by microorganisms. It is required for nerve myelin sheath synthesis, neurological neurotransmission, red blood cell maturation, and recycling homocysteine into methionine. Because plants do not produce B12, vegetarians and vegans must obtain it through fortified foods or supplementation.",
        "followups": [
            "What is the difference between Methylcobalamin and Cyanocobalamin?",
            "Why is intrinsic factor from the stomach essential for B12 absorption?",
            "What are the earliest neurological symptoms of Vitamin B12 deficiency?",
            "Why can high-dose Folate mask Vitamin B12 deficiency?"
        ],
        "sections": {
            "what_is_it": {
                "beginner": "Vitamin B12 is an essential vitamin found naturally in dairy, eggs, fish, and meat that keeps your nerves healthy, helps build red blood cells, and prevents fatigue and tingling in your hands and feet.",
                "advanced": "Cobalamin is a corrinoid coordination complex containing a central cobalt ion. It acts as an obligatory cofactor for two key human enzymes: Methionine Synthase (cytosolic, requiring methylcobalamin for homocysteine remethylation and folate recycling) and Methylmalonyl-CoA Mutase (mitochondrial, requiring adenosylcobalamin for odd-chain fatty acid and branched amino acid catabolism)."
            },
            "why_important": [
                {"title": "Neurological Integrity & Myelin Synthesis", "evidence": "strong", "detail": "Essential for synthesizing ethanolamine plasmalogens and sphingomyelin that form nerve insulating myelin sheaths. Deficiency leads to subacute combined degeneration of the spinal cord with peripheral neuropathy."},
                {"title": "Red Blood Cell Maturation (Erythropoiesis)", "evidence": "strong", "detail": "Required for thymidylate DNA synthesis during erythroblast cell division in the bone marrow. Deficiency arrests erythrocyte nuclear maturation, causing macrocytic (megaloblastic) anemia."},
                {"title": "Homocysteine Remethylation & Cardiovascular Health", "evidence": "strong", "detail": "Transfers a methyl group from 5-MTHF to homocysteine, generating methionine and preventing hyperhomocysteinemia, supporting SAMe production for cellular DNA methylation."},
                {"title": "Mitochondrial Energy & Succinyl-CoA Generation", "evidence": "strong", "detail": "Adenosylcobalamin converts methylmalonyl-CoA to succinyl-CoA for entry into the Krebs cycle, preventing accumulation of neurotoxic methylmalonic acid (MMA)."}
            ],
            "affects": [
                {"system": "Brain & Nervous System", "level": "primary", "detail": "Preserves myelin sheaths around peripheral nerves and spinal cord; supports cognitive speed and mood stability."},
                {"system": "Blood & Bone Marrow", "level": "primary", "detail": "Directs erythroblast division to prevent abnormally large, fragile macrocytic red blood cells."},
                {"system": "Heart & Blood Vessels", "level": "secondary", "detail": "Keeps vascular-damaging plasma homocysteine within healthy ranges."},
                {"system": "Metabolism & Mitochondria", "level": "secondary", "detail": "Facilitates mitochondrial odd-chain fatty acid combustion and cellular ATP production."}
            ],
            "mechanism": {
                "summary": "Cobalamin undergoes a highly specialized multi-step gastrointestinal journey requiring gastric acid, haptocorrin, pancreatic proteases, gastric intrinsic factor (IF), and cubam receptor-mediated endocytosis in the terminal ileum.",
                "steps": [
                    {"stage": "Gastric Release & Haptocorrin Binding", "detail": "Dietary B12 bound to animal protein is liberated by gastric hydrochloric acid and pepsin, then immediately bound to salivary haptocorrin (R-binder) to protect it from stomach acid."},
                    {"stage": "Pancreatic Cleavage & Intrinsic Factor Pairing", "detail": "In the duodenum, pancreatic proteases degrade haptocorrin; free B12 binds with high affinity to Gastric Intrinsic Factor (secreted by parietal cells)."},
                    {"stage": "Ileal Receptor Endocytosis", "detail": "The IF-B12 complex travels to the terminal ileum where it binds Cubam receptors and is internalized by active enterocyte endocytosis (saturating around 1.5-2 µg per meal; passive diffusion absorbs ~1% of massive oral doses)."},
                    {"stage": "Transcobalamin II Delivery", "detail": "Exported into portal blood bound to Transcobalamin II (TC-II), delivering cobalamin to liver stores (2-5 mg reserve) and peripheral tissues."}
                ]
            },
            "uses": {
                "strong": ["Treating and preventing megaloblastic anemia and subacute neurological degeneration", "Correcting elevated plasma homocysteine and methylmalonic acid", "Essential nutritional maintenance for strict vegetarians, vegans, and bariatric patients"],
                "moderate": ["Improving cognitive processing speed and peripheral nerve sensations in subclinical deficiency", "Reducing fatigue in individuals with verified low serum B12 (<300 pg/mL)"],
                "emerging": ["Adjunctive support in diabetic peripheral neuropathy paired with alpha-lipoic acid", "Modulating DNA methylation patterns in age-related cognitive decline"],
                "insufficient": ["Boosting energy or athletic performance in individuals with fully saturated baseline B12 status"]
            },
            "deficiency": {
                "causes": ["Vegan / vegetarian diets lacking animal products or fortified foods", "Autoimmune destruction of gastric parietal cells (Pernicious Anemia lacking Intrinsic Factor)", "Atrophic gastritis, low stomach acid, or chronic use of PPIs / Metformin", "Terminal ileum resection or Crohn's disease"],
                "effects": ["Peripheral neuropathy (bilateral stocking-glove numbness, tingling, vibration sense loss)", "Megaloblastic macrocytic anemia (elevated MCV > 100 fL)", "Neuropsychiatric manifestations (depression, memory loss, ataxia, psychosis 'megaloblastic madness')", "Elevated serum methylmalonic acid (MMA) and homocysteine"],
                "symptoms": ["Tingling or 'pins and needles' in feet/hands", "Extreme fatigue & weakness", "Brain fog & memory slips", "Smooth red tongue (glossitis)", "Unsteady gait / balance issues"],
                "symptoms_note": "CRITICAL: Neurological damage can become IRREVERSIBLE if left untreated for >6-12 months, even after hematological anemia is corrected.",
                "risk_groups": ["Vegetarians, vegans, and predominantly plant-based eaters", "Adults >60y (due to age-related atrophic gastritis and hypochlorhydria)", "People taking Metformin (depletes B12 over time) or Acid Blockers (PPIs/H2 blockers)", "Post-bariatric surgery patients"],
                "testing": "Serum Vitamin B12 (<200 pg/mL is deficient; 200-350 pg/mL is borderline/subclinical). Gold Standard: Serum Methylmalonic Acid (MMA) and Total Homocysteine."
            },
            "food_sources": [
                {"food": "Clams & Oysters", "amount": "85g (3 oz)", "content": "84 mcg (3,500% RDA)", "bioavailability": "very high", "serving": "1 small portion", "type": "animal"},
                {"food": "Wild Salmon / Mackerel", "amount": "150g fillet", "content": "4.8 mcg (200% RDA)", "bioavailability": "high", "serving": "1 fillet", "type": "animal"},
                {"food": "Grass-Fed Beef / Organ Meats", "amount": "100g", "content": "3.0 - 60 mcg (125-2,500% RDA)", "bioavailability": "high", "serving": "1 palm-size cut", "type": "animal"},
                {"food": "Pastured Whole Eggs", "amount": "2 whole eggs", "content": "1.2 mcg (50% RDA)", "bioavailability": "moderate (egg white ovotransferrin slightly binds B12)", "serving": "2 eggs", "type": "animal"},
                {"food": "Fortified Nutritional Yeast", "amount": "1 tablespoon (15g)", "content": "5.0 - 10.0 mcg (200-400% RDA)", "bioavailability": "high", "serving": "1 tbsp sprinkled", "type": "fortified"},
                {"food": "Greek Yogurt / Paneer / Dahi", "amount": "200g (1 cup)", "content": "1.0 - 1.4 mcg (45-60% RDA)", "bioavailability": "high", "serving": "1 bowl", "type": "animal"}
            ],
            "absorption": {
                "increases": ["Sufficient stomach acid to cleave B12 from dietary protein", "Sublingual lozenges or massive oral doses (1,000 mcg) allowing ~1% absorption via passive mucosal diffusion independently of intrinsic factor"],
                "decreases": ["Metformin medication (alters ileal membrane calcium-dependent uptake)", "Proton Pump Inhibitors (Omeprazole, Pantoprazole) and H2 blockers suppressing stomach acid", "Chronic alcohol consumption damaging gastric mucosa"],
                "forms": [
                    "Methylcobalamin: Naturally active methylated coenzyme form; preferred for neurological and methylation pathways.",
                    "Adenosylcobalamin (Dibencozide): Naturally active mitochondrial coenzyme form; required for cellular energy and odd-chain fatty acid metabolism.",
                    "Hydroxocobalamin: Natural bacterial form with high protein binding and prolonged half-life; also acts as a clinical antidote for cyanide toxicity.",
                    "Cyanocobalamin: Synthetic, highly stable form containing a cyanide molecule; converted in the liver to active forms by decyanation."
                ],
                "notes": "Individuals with MTHFR polymorphisms or kidney disease often benefit from active Methylcobalamin + Adenosylcobalamin combinations over Cyanocobalamin."
            },
            "requirements": {
                "rda": "2.4 mcg/day for adults (2.6 mcg in pregnancy, 2.8 mcg in lactation)",
                "groups": [
                    {"group": "Sedentary Adults (Omnivores)", "amount": "2.4 mcg/day (maintains body stores and prevents deficiency)"},
                    {"group": "Vegetarians & Vegans", "amount": "250 mcg/day (or 1,000-2,000 mcg 2x weekly to account for passive absorption rates)"},
                    {"group": "Adults >50y / Metformin Users", "amount": "500 - 1,000 mcg/day sublingual (bypasses reduced gastric intrinsic factor)"}
                ],
                "ul": "No Tolerable Upper Intake Level (UL) established by the Institute of Medicine due to extremely low toxicity and rapid renal clearance.",
                "note": "Human liver stores 2-5 mg of B12; deficiency takes 2-5 years of strict zero intake to manifest clinically."
            },
            "supplementation": {
                "who_might": ["Vegetarians, vegans, and plant-based eaters", "People taking Metformin or Acid Blockers (PPIs)", "Adults over age 50", "Individuals with unexplained neuropathy, fatigue, or high homocysteine"],
                "who_probably_not": ["Omnivores consuming beef, fish, eggs, and dairy regularly with normal B12/MMA levels"],
                "forms": ["Methylcobalamin Sublingual", "Adenosylcobalamin", "Hydroxocobalamin Injections (for severe malabsorption)"],
                "typical_amounts": "500 - 1,000 mcg daily sublingual",
                "timing": "Morning with breakfast (supports daytime neurological focus)",
                "with_food": "Take sublingually or with meals",
                "duration": "Ongoing lifelong supplementation for strict vegans",
                "cycling": "No cycling required"
            },
            "safety": {
                "level": "green",
                "upper_limit": "No Upper Limit established (exceptionally wide safety index)",
                "toxicity": "Non-toxic at oral doses up to 5,000 mcg/day; excess is excreted in urine (turning urine bright yellow-pink).",
                "overdose": "Extremely rare mild transient acneiform skin eruptions in genetically predisposed individuals at very high doses.",
                "drug_interactions": [
                    "Metformin: Decreases B12 absorption by 10-30% over long-term use (monitor levels annually).",
                    "Proton Pump Inhibitors (PPIs) & H2 Blockers: Impair acid-dependent protein cleavage.",
                    "Nitrous Oxide ('Laughing Gas'): Irreversibly oxidizes the cobalt atom in B12, causing rapid acute functional deficiency and severe neuropathy."
                ],
                "contraindications": ["Leber's hereditary optic neuropathy (cyanocobalamin can accelerate optic nerve atrophy; use hydroxocobalamin instead)"],
                "special_populations": ["CRITICAL: Exclusively breastfed infants of vegan mothers must receive B12 supplementation to prevent permanent brain damage."]
            },
            "interactions": [
                {"substance": "Folate (Vitamin B9)", "interaction": "Synergistic methylation & hematology", "mechanism": "B12 and folate work in tandem at methionine synthase; high folate without B12 masks anemia while allowing irreversible nerve damage to progress ('folate trap')", "importance": "critical"},
                {"substance": "Vitamin B6 & Choline", "interaction": "Homocysteine clearance pathway", "mechanism": "B6, B12, and folate convert homocysteine via transsulfuration and remethylation", "importance": "high"}
            ],
            "timing": {
                "matters": True,
                "detail": "Take in the morning. Sublingual lozenges should be dissolved under the tongue for 30-60 seconds to maximize mucosal passive diffusion."
            },
            "performance": {
                "muscle": "Supports motor neuron myelin sheath insulation, ensuring rapid neuromuscular action potential conduction.",
                "strength": "Maintains motor unit recruitment and prevents neuromuscular ataxia and muscle weakness.",
                "fat_loss": "Cofactor for mitochondrial odd-chain fatty acid and branched-chain amino acid catabolism.",
                "recovery": "Directs erythropoiesis, ensuring full oxygenation and nutrient delivery to recovering muscle beds.",
                "athletic": "Maintains healthy hemoglobin concentration and aerobic endurance capacity.",
                "energy": "Eliminates profound cellular fatigue caused by defective DNA synthesis and anemia.",
                "sleep": "Required for SAMe-mediated synthesis of melatonin from serotonin in the pineal gland.",
                "cognitive": "Essential for synthesizing dopamine, norepinephrine, and serotonin; prevents cognitive decline and brain atrophy.",
                "hormones": "Supports endocrine stability by facilitating methylation of adrenal and gonadal hormones.",
                "metabolic": "Converts methylmalonyl-CoA to succinyl-CoA for the mitochondrial Krebs cycle."
            },
            "biomarkers": [
                {"marker": "Serum Methylmalonic Acid (MMA)", "measures": "Metabolic accumulation of MMA resulting from inactive methylmalonyl-CoA mutase.", "matters": "Gold Standard functional test for cellular B12 deficiency (optimal: <0.28 µmol/L; elevated MMA proves tissue deficiency even if serum B12 is 'normal').", "limitations": "Elevated in renal insufficiency.", "when": "Investigating neuropathy, borderline B12, or vegan nutrition status."},
                {"marker": "Serum Vitamin B12", "measures": "Total circulating cobalamin (bound to haptocorrin and transcobalamin).", "matters": "Initial screening test (<200 pg/mL = deficient; 200-350 pg/mL = borderline; optimal = >500 pg/mL).", "limitations": "Can be falsely normal during acute inflammation or liver disease.", "when": "Routine wellness panel or fatigue investigation."},
                {"marker": "Plasma Total Homocysteine", "measures": "Circulating homocysteine levels.", "matters": "Elevated (>12 µmol/L) indicates impaired remethylation secondary to B12 or Folate insufficiency.", "limitations": "Elevated in both B12 and Folate deficiency.", "when": "Cardiovascular risk or cognitive assessment."}
            ],
            "myths": [
                {"myth": "Spirulina, chlorella, and fermented soy (tempeh) are reliable sources of Vitamin B12 for vegans", "fact": "Algae and fermented plants contain inactive pseudovitamin B12 (corrinoid analogues) that bind B12 receptors and can actually block real active B12 absorption. True B12 must be supplemented on a vegan diet."},
                {"myth": "Vitamin B12 supplements give you an instant caffeine-like energy burst", "fact": "B12 only increases energy if you are correcting a pre-existing deficiency. In people with normal B12 stores, supra-physiological doses do not produce stimulant energy."}
            ],
            "mistakes": [
                "Assuming a vegan or vegetarian diet provides enough B12 without supplementation",
                "Relying solely on standard serum B12 blood tests rather than checking Methylmalonic Acid (MMA)",
                "Taking high-dose folic acid without B12, which masks anemia while allowing neurological nerve damage to progress silently"
            ],
            "if_low": [
                "1. Confirm tissue status with a Serum Methylmalonic Acid (MMA) and Homocysteine test.",
                "2. Begin 1,000 mcg Methylcobalamin sublingual daily for 8-12 weeks.",
                "3. In cases of severe pernicious anemia or ileal malabsorption, consult a physician for intramuscular B12 injections."
            ],
            "if_too_much": {
                "acute": "No acute toxicity documented; excess water-soluble B12 is rapidly eliminated in urine.",
                "chronic": "Safe with no established adverse upper limit; rare mild acneiform eruptions.",
                "mechanism": "Cobalamin is safely handled by transcobalamin carriers and renal excretion.",
                "signs": "Bright pink-tinted or fluorescent urine.",
                "when_medical": "Unexplained sudden sky-high serum B12 (>1,500 pg/mL) without supplementation warrants evaluation for occult liver or hematological conditions."
            },
            "research": [
                {
                    "title": "Vitamin B12 Deficiency: Recognition and Management",
                    "year": "2017",
                    "study_type": "Clinical Practice Review",
                    "evidence_level": "strong",
                    "summary": "Demonstrates that oral high-dose Vitamin B12 (1,000-2,000 mcg/day) is as effective as intramuscular injections in achieving hematological and neurological remission in patients with food-cobalamin malabsorption.",
                    "source": "American Family Physician",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/28925645/"
                },
                {
                    "title": "Cobalamin (Vitamin B12) in Health and Disease",
                    "year": "2010",
                    "study_type": "Comprehensive Biochemical Review",
                    "evidence_level": "strong",
                    "summary": "Detailed biochemical analysis of the dual enzyme actions of cobalamin in cytoplasmic methionine remethylation and mitochondrial methylmalonyl-CoA isomerisation.",
                    "source": "Nutrients / MDPI",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/22254022/"
                }
            ]
        }
    },

    # -----------------------------------------------------------------
    # ZINC
    # -----------------------------------------------------------------
    "zinc": {
        "subject": "Zinc",
        "category": "Minerals",
        "query_type": "mineral",
        "one_liner": "An essential catalytic and structural trace mineral required for >300 enzymes, testosterone synthesis, immune thymulin activity, protein transcription, and wound epithelialization.",
        "science_score": 98,
        "science_score_rationale": "Over 6 decades of gold-standard clinical trials detailing zinc finger proteins, carbonic anhydrase, RNA polymerases, and immune homeostasis.",
        "safety_level": "green",
        "quick_answer": "Zinc is a foundational trace mineral second only to iron in human biological concentration. It functions as a catalytic cofactor for over 300 enzymes and a structural component in thousands of zinc-finger transcription factors that regulate gene expression, immune defense, testosterone production, and mucosal gut integrity.",
        "followups": [
            "What is the best form of Zinc (Picolinate, Bisglycinate, Gluconate, or Carnosine)?",
            "Why must high-dose Zinc always be balanced with Copper?",
            "How does Zinc support testosterone and male reproductive health?",
            "Can Zinc lozenges shorten the duration of cold symptoms?"
        ],
        "sections": {
            "what_is_it": {
                "beginner": "Zinc is an essential trace mineral that powers your immune system, boosts natural testosterone, heals skin and wounds, and supports healthy taste, smell, and thyroid function.",
                "advanced": "Zinc (Zn2+) is an indispensable divalent trace element that functions as a structural ion in zinc-finger DNA-binding motifs, a catalytic center in enzymes (superoxide dismutase, alkaline phosphatase, alcohol dehydrogenase), and an intracellular signaling messenger in immune lymphocytes and synaptic neurotransmission."
            },
            "why_important": [
                {"title": "Immune Cell Signaling & Antiviral Defense", "evidence": "strong", "detail": "Required for thymulin activity, which drives T-lymphocyte maturation and natural killer (NK) cell cytotoxicity. Directly inhibits viral RNA-dependent RNA polymerase elongation."},
                {"title": "Endocrine Function & Androgen Synthesis", "evidence": "strong", "detail": "Cofactor for 17β-hydroxysteroid dehydrogenase converting androstenedione to testosterone in Leydig cells, and inhibits excessive aromatase conversion of testosterone to estrogen."},
                {"title": "Protein Synthesis, Wound Healing & DNA Repair", "evidence": "strong", "detail": "Structural backbone of >2,000 zinc-finger transcription factors directing cellular division, RNA translation, and accelerating collagen deposition during wound repair."},
                {"title": "Gut Mucosal Integrity & Taste/Smell Receptor Acuity", "evidence": "strong", "detail": "Maintains tight junction proteins (claudin-1, occludin) to prevent intestinal hyperpermeability ('leaky gut'), and is a constituent of gustin/carbonic anhydrase VI for taste buds."}
            ],
            "affects": [
                {"system": "Immune System", "level": "primary", "detail": "Drives T-cell differentiation, phagocytosis, and cytokine regulation; blunts pathogen replication."},
                {"system": "Endocrine & Reproductive", "level": "primary", "detail": "Essential for Leydig cell testosterone production, sperm motility, and thyroid hormone T4-to-T3 conversion."},
                {"system": "Skin & Mucosal Barriers", "level": "primary", "detail": "Maintains gut barrier tight junctions, accelerates wound repair, and regulates sebaceous gland activity for clear skin."},
                {"system": "Brain & Sensory", "level": "secondary", "detail": "Concentrated in synaptic vesicles of glutamatergic neurons; essential for taste and smell receptor sensitivity."}
            ],
            "mechanism": {
                "summary": "Zinc is actively absorbed across the duodenal brush border via ZIP4 transporters, sequestered inside enterocytes by metallothionein, and exported into portal circulation by ZnT1, where it circulates primarily bound to serum albumin.",
                "steps": [
                    {"stage": "ZIP4 Transporter Uptake", "detail": "Dietary Zn2+ is internalized by Zrt- and Irt-like protein 4 (ZIP4) in the apical membrane of enterocytes (upregulated during low dietary intake)."},
                    {"stage": "Metallothionein Buffering", "detail": "Intracellular zinc stimulates metallothionein synthesis, which binds zinc and copper to protect against heavy metal toxicity and regulate release."},
                    {"stage": "Basolateral Export (ZnT1)", "detail": "Zinc Transporter 1 (ZnT1) exports Zn2+ across the basolateral membrane into portal blood, binding to albumin (60%) and alpha-2-macroglobulin (30%)."},
                    {"stage": "Cellular Gene Transcription & Catalysis", "detail": "Imported into target cells via ZIP transporters, stabilizing zinc-finger domains in DNA to initiate transcription and activating metalloenzymes."}
                ]
            },
            "uses": {
                "strong": ["Treating clinical zinc deficiency, childhood diarrhea, and acrodermatitis enteropathica", "Accelerating cutaneous wound healing and pressure ulcer recovery", "Reducing common cold symptom duration by ~33% when taken as ionic zinc acetate/gluconate lozenges within 24h of symptom onset"],
                "moderate": ["Restoring testosterone and luteinizing hormone in men with baseline marginal zinc deficiency", "Improving mucosal gut barrier integrity (specifically Zinc L-Carnosine) in gastritis and ulcers", "Adjunctive therapy for inflammatory acne vulgaris (reducing P. acnes and lipase activity)"],
                "emerging": ["Slowing age-related macular degeneration (AMD) progression in the AREDS / AREDS2 clinical trial formulation", "Supporting cognitive recovery and antidepressant response in treatment-resistant cohorts"],
                "insufficient": ["Supra-physiological megadoses do not continuously increase testosterone in men with already optimal baseline zinc levels"]
            },
            "deficiency": {
                "causes": ["High-phytate unfermented grain/legume diets without animal protein or soaking/sprounding", "Chronic alcohol intake (accelerates urinary zinc loss and impairs ZIP4 absorption)", "Severe gastrointestinal diseases (Crohn's, celiac, short bowel syndrome, bariatric surgery)", "Heavy chronic sweat loss in endurance athletes without electrolyte replacement"],
                "effects": ["Impaired immune response with recurrent infections and delayed recovery", "Hypogonadism, low libido, reduced sperm count, and dropped free testosterone in males", "Alopecia (hair thinning), brittle nails with white spots (leukonychia), and dry flaky skin", "Loss of taste (hypogeusia) and impaired night vision adaptation"],
                "symptoms": ["Frequent colds & slow recovery", "Delayed wound healing", "Blunted taste or smell", "Thinning hair & brittle nails", "Low sex drive & brain fog"],
                "symptoms_note": "Serum zinc is tightly homeostatically controlled; mild-to-moderate tissue deficiency can exist even with low-normal serum concentrations.",
                "risk_groups": ["Vegetarians and vegans with high unsoaked phytate consumption", "Endurance athletes with heavy sweat rates", "Older adults with decreased dietary intake and gastric acidity", "Patients with chronic inflammatory bowel disease or chronic kidney disease"],
                "testing": "Fasting Plasma / Serum Zinc (ideal reference: 70 - 120 µg/dL). Gold Standard tissue marker: RBC Zinc or Alkaline Phosphatase activity."
            },
            "food_sources": [
                {"food": "Raw Oysters", "amount": "6 medium (85g)", "content": "32 - 50 mg (300-450% RDA)", "bioavailability": "very high", "serving": "6 oysters", "type": "animal"},
                {"food": "Grass-Fed Beef (Chuck/Sirloin)", "amount": "150g (5 oz)", "content": "8.5 - 11.0 mg (100% RDA)", "bioavailability": "high", "serving": "1 steak / portion", "type": "animal"},
                {"food": "Pumpkin Seeds (Pepitas)", "amount": "40g (1/4 cup)", "content": "3.2 mg (30% RDA)", "bioavailability": "moderate (enhanced by roasting)", "serving": "1 handful", "type": "plant"},
                {"food": "Cooked Lentils & Chickpeas (Chole/Dal)", "amount": "200g (1 cup cooked)", "content": "2.5 mg (23% RDA)", "bioavailability": "moderate (inhibited by phytates)", "serving": "1 bowl", "type": "plant"},
                {"food": "Cashews & Hemp Hearts", "amount": "30g (1 oz)", "content": "1.8 - 2.8 mg (25% RDA)", "bioavailability": "moderate", "serving": "1 small handful", "type": "plant"},
                {"food": "Dark Chocolate (>70% Cacao)", "amount": "50g", "content": "1.6 mg (15% RDA)", "bioavailability": "moderate", "serving": "2 squares", "type": "plant"}
            ],
            "absorption": {
                "increases": ["Animal protein co-ingestion (amino acids like histidine and cysteine form soluble zinc chelates that bypass phytate inhibition)", "Soaking, sprouting, or sourdough fermenting grains and legumes to activate phytases"],
                "decreases": ["Phytic acid in unsoaked raw grains, bran, and legumes (binds zinc into insoluble complexes in the gut lumen)", "High single-dose iron (>25mg) or calcium (>800mg) competing for divalent metal transporters", "High alcohol consumption"],
                "forms": [
                    "Zinc Picolinate: Chelate bound to picolinic acid; demonstrates superior human bioavailability and tissue uptake in head-to-head trials.",
                    "Zinc Bisglycinate: Chelate bound to two glycine molecules; highly bioavailable, gentle on the stomach lining, and less inhibited by dietary phytates.",
                    "Zinc L-Carnosine: Specialized chelate with unique mucosal adhesion; specifically indicated for gastric lining repair, ulcers, and intestinal permeability.",
                    "Zinc Gluconate / Acetate: Classic clinical forms used in immune lozenges for ionic sublingual release in the pharynx.",
                    "Zinc Oxide / Sulfate: Inorganic forms with lower oral bioavailability (~10-15%) and higher incidence of nausea/gastric irritation."
                ],
                "notes": "Always take zinc supplements with a meal containing carbohydrates/protein to prevent transient gastric nausea caused by localized vagal irritation."
            },
            "requirements": {
                "rda": "11 mg/day for adult men, 8 mg/day for adult women (11 mg in pregnancy, 12 mg in lactation)",
                "groups": [
                    {"group": "Sedentary Adults", "amount": "8 - 11 mg/day (maintains baseline tissue saturation)"},
                    {"group": "Vegetarians & Vegans", "amount": "15 - 20 mg/day (up to 50% higher requirement due to phytate inhibition)"},
                    {"group": "Hard-Training Athletes", "amount": "15 - 25 mg/day (replaces 1-2 mg lost per liter of intense sweat)"}
                ],
                "ul": "40 mg/day (Tolerable Upper Intake Level for adults to avoid copper depletion and lipid alterations)",
                "note": "Chronic intake exceeding 40-50 mg/day over several months inevitably induces copper deficiency by over-stimulating intestinal metallothionein."
            },
            "supplementation": {
                "who_might": ["Vegetarians, vegans, or individuals with low meat/seafood intake", "Men seeking natural testosterone and fertility support", "Individuals experiencing frequent colds or acne breakouts", "Athletes with heavy daily training and sweat loss"],
                "who_probably_not": ["Individuals consuming oysters, red meat, or organ meats several times weekly with normal zinc levels"],
                "forms": ["Zinc Picolinate", "Zinc Bisglycinate", "Zinc L-Carnosine (for gut health)", "Zinc Acetate Lozenges (for colds)"],
                "typical_amounts": "15 - 30 mg elemental zinc daily (pair with 1 - 2 mg copper if taking >25mg daily for >6 weeks)",
                "timing": "With lunch or dinner (never on an empty stomach to avoid nausea)",
                "with_food": "Take with whole-food meals; avoid co-taking simultaneously with high-dose iron supplements or high-fiber bran",
                "duration": "Safe for ongoing maintenance at 15-25 mg/day with balanced copper",
                "cycling": "Not strictly necessary at low doses (<25mg), but cycling 5 days on / 2 days off is a popular biohacking safety strategy"
            },
            "safety": {
                "level": "green",
                "upper_limit": "40 mg/day (Institute of Medicine UL)",
                "toxicity": "Acute single oral doses >200-400 mg cause immediate emesis (vomiting), abdominal cramps, and diarrhea.",
                "overdose": "Chronic excessive supplementation (50-100+ mg/day for months) induces severe Copper Deficiency Microcytic Anemia, neutropenia, and blunted HDL cholesterol.",
                "drug_interactions": [
                    "Quinolone & Tetracycline Antibiotics: Zinc chelates antibiotics, reducing absorption (separate by at least 3-4 hours).",
                    "Thiazide Diuretics: Increase urinary zinc excretion by 60%.",
                    "Copper Supplements: Compete at intestinal metallothionein; always maintain a 10:1 or 15:1 Zinc-to-Copper ratio."
                ],
                "contraindications": ["Pre-existing copper deficiency", "Concurrent administration of penicillamine without physician scheduling"],
                "special_populations": ["Crucial during pregnancy for fetal brain and skeletal development; avoid exceeding 40mg UL."]
            },
            "interactions": [
                {"substance": "Copper", "interaction": "Competitive intestinal antagonism", "mechanism": "High zinc induces enterocyte metallothionein, which irreversibly binds copper and sloughs off in feces", "importance": "critical"},
                {"substance": "Iron (High Dose)", "interaction": "DMT1 competitive transport", "mechanism": "Molar ratios of Iron:Zinc > 3:1 inhibit zinc uptake if taken together on an empty stomach", "importance": "high"},
                {"substance": "Magnesium", "interaction": "Synergistic mineral cofactors (ZMA)", "mechanism": "Complementary neuro-muscular and endocrine support when dosed in balance", "importance": "moderate"}
            ],
            "timing": {
                "matters": True,
                "detail": "Always consume with a substantial meal to avoid immediate nausea. For acute cold support, dissolve zinc acetate lozenges slowly in the mouth every 2-3 hours for the first 48 hours."
            },
            "performance": {
                "muscle": "Promotes muscle protein synthesis via zinc-finger transcription factors and insulin-like growth factor (IGF-1) signaling.",
                "strength": "Supports maximal muscular force generation by maintaining androgen receptor density and testosterone synthesis.",
                "fat_loss": "Regulates leptin receptor sensitivity and thyroid hormone conversion (T4 to active T3) to maintain resting metabolic rate.",
                "recovery": "Accelerates micro-tear structural tissue repair and modulates systemic inflammatory cytokine spikes post-workout.",
                "athletic": "Maintains red blood cell carbonic anhydrase activity, optimizing CO2 clearance during high-intensity lactic exertion.",
                "energy": "Prevents lethargy associated with subclinical hypogonadism and thyroid downregulation.",
                "sleep": "Acts as an NMDA receptor antagonist and GABAergic modulator, promoting deeper restorative slow-wave sleep.",
                "cognitive": "Concentrated in mossy fibers of the hippocampus; regulates synaptic plasticity, spatial memory, and neurogenesis.",
                "hormones": "Essential for Leydig cell 17β-HSD activity, LH pulsatility, and inhibiting excessive aromatase activity.",
                "metabolic": "Constituent of crystalline insulin in pancreatic beta cells; required for proper insulin storage and secretion."
            },
            "biomarkers": [
                {"marker": "Serum / Plasma Zinc (Fasting)", "measures": "Exchangeable circulating zinc pool.", "matters": "Primary clinical screening test (optimal: 80 - 120 µg/dL).", "limitations": "Drops acutely during systemic inflammation or infection as an acute phase response.", "when": "Investigating low testosterone, hair thinning, or frequent infections."},
                {"marker": "RBC Zinc (Red Blood Cell Zinc)", "measures": "Intracellular zinc accumulation over the 120-day lifespan of erythrocytes.", "matters": "Gold standard for long-term chronic tissue stores.", "limitations": "Higher cost and specialized laboratory processing required.", "when": "Functional longevity and athlete micronutrient profiling."},
                {"marker": "Serum Alkaline Phosphatase (ALP)", "measures": "Zinc-dependent metalloenzyme activity.", "matters": "Low ALP (<50 IU/L) frequently indicates functional zinc or magnesium insufficiency.", "limitations": "Non-specific; can be elevated in liver or bone disease.", "when": "Comprehensive Metabolic Panel (CMP)."},
                {"marker": "Serum Copper & Ceruloplasmin", "measures": "Circulating copper status.", "matters": "Monitors copper balance in individuals taking zinc supplements >25 mg daily.", "limitations": "Ceruloplasmin is an acute phase reactant.", "when": "Long-term zinc supplementation monitoring."}
            ],
            "myths": [
                {"myth": "Taking 100 mg of Zinc daily will double your testosterone naturally", "fact": "Zinc only increases testosterone if you have a pre-existing baseline deficiency. In zinc-sufficient men, mega-dosing does not increase testosterone and will cause severe copper deficiency."},
                {"myth": "Zinc supplements should always be taken on an empty stomach for maximum absorption", "fact": "Taking zinc on an empty stomach stimulates vagal nerve afferents, causing intense nausea, cramps, and vomiting. Always take it with food."}
            ],
            "mistakes": [
                "Taking high-dose zinc (50mg+) daily for months without taking copper, inducing severe copper deficiency anemia",
                "Swallowing zinc pills without food and experiencing severe stomach cramps and nausea",
                "Eating unsoaked, unfermented grains and expecting full zinc bioavailability from plant sources"
            ],
            "if_low": [
                "1. Add 2-3 servings weekly of zinc-rich foods: oysters, grass-fed beef, roasted pumpkin seeds, or pastured eggs.",
                "2. Soak, sprout, or ferment beans and whole grains to deactivate phytic acid inhibitors.",
                "3. Supplement with 15-30 mg elemental Zinc Picolinate or Bisglycinate with dinner for 6-8 weeks, then retest blood levels."
            ],
            "if_too_much": {
                "acute": "Severe nausea, violent vomiting, abdominal pain, diarrhea, metallic taste in mouth.",
                "chronic": "Copper deficiency (leading to microcytic anemia and neutropenia), suppressed immune function, and reduced HDL cholesterol.",
                "mechanism": "Overexpression of intestinal metallothionein trapping copper; gastric mucosal irritation.",
                "signs": "Persistent metallic taste, numbness in fingers, unexplained low white blood cell count (neutropenia).",
                "when_medical": "Seek immediate care if persistent vomiting, fever, or severe neurological numbness develops."
            },
            "research": [
                {
                    "title": "Zinc Lozenges and the Common Cold: A Meta-Analysis",
                    "year": "2017",
                    "study_type": "Systematic Review & Meta-Analysis of RCTs",
                    "evidence_level": "strong",
                    "summary": "Meta-analysis of 7 randomized trials (575 participants) showed that zinc acetate lozenges (dosing >75mg/day of ionic zinc throughout the day) shortened cold duration by 33% (almost 3 full days).",
                    "source": "Journal of the Royal Society of Medicine / PubMed",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/28515951/"
                },
                {
                    "title": "Zinc Status and Serum Testosterone Levels of Healthy Adults",
                    "year": "1996",
                    "study_type": "Controlled Human Clinical Trial",
                    "evidence_level": "strong",
                    "summary": "Dietary zinc restriction in healthy young men for 20 weeks caused a 50% drop in serum testosterone; zinc supplementation for 6 months in marginally deficient older men doubled serum testosterone from 8.3 to 16.0 nmol/L.",
                    "source": "Nutrition / PubMed",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/8875519/"
                }
            ]
        }
    },

    # -----------------------------------------------------------------
    # CREATINE
    # -----------------------------------------------------------------
    "creatine": {
        "subject": "Creatine Monohydrate",
        "category": "Supplements",
        "query_type": "supplement",
        "one_liner": "An endogenous guanidino amino acid derivative that serves as a rapid phosphocreatine energy buffer for cellular ATP regeneration in muscle and brain tissue.",
        "science_score": 99,
        "science_score_rationale": "Over 500 peer-reviewed clinical trials establish creatine monohydrate as the single most effective, rigorously tested ergogenic aid for muscular power and cognitive energy.",
        "safety_level": "green",
        "quick_answer": "Creatine is an amino acid compound synthesized endogenously from arginine, glycine, and methionine, and stored primarily in skeletal muscle (95%) and brain tissue. It acts as a rapid phosphate donor: the enzyme creatine kinase transfers a high-energy phosphate group from phosphocreatine (PCr) to ADP, regenerating ATP in milliseconds during explosive anaerobic physical and mental exertion.",
        "followups": [
            "Do you need to do a loading phase (20g/day) with Creatine Monohydrate?",
            "Does Creatine cause kidney damage or hair loss?",
            "How does Creatine enhance cognitive processing speed under sleep deprivation?",
            "What is the difference between Creatine Monohydrate and Creatine HCL?"
        ],
        "sections": {
            "what_is_it": {
                "beginner": "Creatine is a natural compound stored in your muscles and brain that acts like a backup battery, rapidly recharging energy during hard workouts, sprints, and intense mental focus.",
                "advanced": "Creatine (methylguanidinoacetic acid) is a nitrogenous organic acid that operates via the cellular phosphagen energy system. In cytosol and mitochondria, mitochondrial and cytosolic creatine kinase isoenzymes maintain an energetic shuttle, transferring high-energy phosphate bonds between sites of ATP generation and ATP utilization (actin-myosin cross-bridges and ion pumps)."
            },
            "why_important": [
                {"title": "Rapid Anaerobic ATP Resynthesis", "evidence": "strong", "detail": "Phosphocreatine donates a high-energy phosphate to ADP via creatine kinase, regenerating ATP in <1 second during maximal explosive muscular power outputs (0-10 seconds)."},
                {"title": "Cellular Hydration & Protein Synthesis Signalling", "evidence": "strong", "detail": "Osmotically draws water into intracellular myocyte sarcoplasm, increasing cellular turgor which upregulates mTOR signaling and satellite cell mitotic activity."},
                {"title": "Neuro-Energetics & Cognitive Resilience Under Stress", "evidence": "strong", "detail": "Crosses the blood-brain barrier via SLC6A8 transporters, sustaining cerebral bioenergetics and reducing mental fatigue during hypoxia, sleep deprivation, and complex cognitive tasks."},
                {"title": "Glycogen Supercompensation & Muscle Preservation", "evidence": "strong", "detail": "Enhances GLUT4 transporter translocation, boosting post-exercise muscle glycogen storage by up to 20% and sparing lean mass during caloric deficits."}
            ],
            "affects": [
                {"system": "Muscles", "level": "primary", "detail": "Saturates phosphocreatine intramuscular stores by 20-40%, expanding work capacity and high-intensity power."},
                {"system": "Brain & Cognition", "level": "primary", "detail": "Enhances working memory, processing speed, and neuroprotection under sleep deprivation or mental fatigue."},
                {"system": "Mitochondria", "level": "secondary", "detail": "Maintains mitochondrial creatine kinase shuttle efficiency and reduces oxidative membrane stress."},
                {"system": "Metabolism", "level": "secondary", "detail": "Increases intracellular fluid volume and stimulates glycogen synthesis via GLUT4 activation."}
            ],
            "mechanism": {
                "summary": "Creatine operates through the phosphocreatine shuttle. Cytosolic and mitochondrial creatine kinase isoenzymes rapidly transfer high-energy phosphate bonds from phosphocreatine (PCr) to ADP, regenerating ATP in milliseconds.",
                "steps": [
                    {"stage": "Intestinal Absorption & SLC6A8 Transport", "detail": "Absorbed across the intestinal enterocyte border and actively transported into skeletal muscle and neurons via sodium/chloride-dependent SLC6A8 creatine transporters."},
                    {"stage": "Intracellular Phosphorylation", "detail": "Inside the cell, ~60-65% of free creatine is phosphorylated into Phosphocreatine (PCr) by Creatine Kinase using mitochondrial ATP."},
                    {"stage": "Rapid High-Energy Phosphate Transfer", "detail": "During intense contraction, PCr transfers its phosphate to ADP via Creatine Kinase: PCr + ADP + H+ ↔ Creatine + ATP, buffering ATP depletion and consuming local H+ ions."},
                    {"stage": "Myocellular Hydration & Anabolic Signaling", "detail": "Intracellular creatine accumulation exerts osmotic pressure, drawing water into the myocyte cytosol to activate osmotic stretch pathways and mTOR signaling."}
                ]
            },
            "uses": {
                "strong": ["Increasing maximal strength, power output, and repeated sprint capacity (5-15% performance gains)", "Increasing lean fat-free muscle mass when combined with progressive resistance training", "Enhancing cognitive working memory and reaction time during sleep deprivation"],
                "moderate": ["Accelerating rehabilitation and reducing muscle atrophy during limb immobilization following injury", "Enhancing muscle glycogen resynthesis when co-ingested with carbohydrates post-workout"],
                "emerging": ["Neuroprotection in mild traumatic brain injury (concussion) and neurodegenerative models", "Improving bone mineral density in postmenopausal women when combined with resistance exercise"],
                "insufficient": ["Pure long-distance aerobic endurance (>2 hours) where phosphagen kinetics are not rate-limiting"]
            },
            "deficiency": {
                "causes": ["Strict vegetarian or vegan diets (zero dietary creatine intake; rely 100% on endogenous synthesis from glycine, arginine, methionine)", "Inborn errors of creatine synthesis (AGAT or GAMT enzyme deficiencies) or SLC6A8 transporter defects"],
                "effects": ["Lower baseline muscle and brain creatine concentrations (~20-30% lower in strict vegans)", "Reduced peak anaerobic power output compared to omnivores with equal training", "Severe neurological delays in congenital genetic synthesis defects"],
                "symptoms": ["Sub-maximal muscular power endurance", "Reduced cognitive stamina under acute sleep deprivation"],
                "symptoms_note": "Vegetarians and vegans experience the most dramatic cognitive and physical performance enhancements upon initiating creatine supplementation.",
                "risk_groups": ["Vegetarians and vegans", "Athletes in power/sprint sports", "Older adults with sarcopenia and age-related muscle loss"],
                "testing": "Serum Creatinine reflects spontaneous non-enzymatic degradation (1-2% daily); Muscle biopsy or 31P Magnetic Resonance Spectroscopy (research settings)."
            },
            "food_sources": [
                {"food": "Raw / Lightly Cooked Herring", "amount": "150g (5 oz)", "content": "1.0 - 1.5g Creatine", "bioavailability": "high", "serving": "1 fillet", "type": "animal"},
                {"food": "Grass-Fed Beef (Chuck/Round)", "amount": "200g (7 oz)", "content": "0.9 - 1.1g Creatine", "bioavailability": "high", "serving": "1 steak portion", "type": "animal"},
                {"food": "Salmon & Tuna", "amount": "200g (7 oz)", "content": "0.8 - 1.0g Creatine", "bioavailability": "high", "serving": "1 portion", "type": "animal"},
                {"food": "Pork Tenderloin", "amount": "200g (7 oz)", "content": "0.7 - 0.9g Creatine", "bioavailability": "high", "serving": "1 cut", "type": "animal"},
                {"food": "Chicken Breast", "amount": "200g (7 oz)", "content": "0.6 - 0.8g Creatine", "bioavailability": "high", "serving": "1 breast", "type": "animal"}
            ],
            "absorption": {
                "increases": ["Co-ingesting with a carbohydrate and/or protein meal (insulin spikes stimulate SLC6A8 transporter translocation, increasing muscle retention by ~10-20%)", "Dissolving completely in warm water or tea"],
                "decreases": ["Consuming massive single doses (>10g) without sufficient fluid (causes transient osmotic gut cramping)"],
                "forms": [
                    "Creatine Monohydrate (Creapure®): Gold standard; 100% bioavailable, most clinically researched, cost-effective form in history.",
                    "Micronized Creatine Monohydrate: Monohydrate milled to ultra-fine mesh size; dissolves easily in liquid with zero grittiness.",
                    "Creatine Hydrochloride (HCL): Higher solubility in water; claims lower dose requirement but clinical efficacy equals monohydrate.",
                    "Buffered Creatine (Kre-Alkalyn) / Creatine Ethyl Ester: Head-to-head trials show no superiority over standard monohydrate."
                ],
                "notes": "100% of human performance and safety literature is based on Creatine Monohydrate. Expensive alternative salts offer no additional physiological advantage."
            },
            "requirements": {
                "rda": "No official RDA (body synthesizes ~1-2g daily and degrades ~2g daily into creatinine)",
                "groups": [
                    {"group": "Sedentary Non-Athletes", "amount": "1 - 2g/day (synthesized endogenously + dietary intake)"},
                    {"group": "Strength & Power Athletes", "amount": "3 - 5g/day (saturates myocellular phosphocreatine stores)"},
                    {"group": "Larger Athletes (>90kg / 200lbs)", "amount": "5 - 10g/day (accounts for greater total skeletal muscle mass)"}
                ],
                "ul": "No Tolerable Upper Intake Level established; chronic doses up to 30g/day for 5 years demonstrate complete safety in healthy adults",
                "note": "A daily maintenance dose of 3-5g fully saturates muscle tissue within 3-4 weeks without requiring a high-dose loading phase."
            },
            "supplementation": {
                "who_might": ["All resistance training athletes, sprinters, and team sport athletes", "Vegetarians and vegans seeking cognitive and physical parity", "Older adults combating sarcopenia and cognitive decline"],
                "who_probably_not": ["Individuals with pre-existing severe end-stage renal disease (eGFR < 30 mL/min) without nephrologist guidance"],
                "forms": ["Creatine Monohydrate powder (Creapure®)", "Micronized Monohydrate"],
                "typical_amounts": "3 - 5 grams daily (or 0.05 g/kg body weight)",
                "timing": "Post-workout with your recovery meal or any consistent time of day with whole food",
                "with_food": "Best taken with a meal containing carbohydrates or protein for insulin-mediated uptake",
                "duration": "Safe for indefinite continuous daily use",
                "cycling": "No cycling required (endogenous synthesis recovers completely within weeks upon cessation; no receptor downregulation)"
            },
            "safety": {
                "level": "green",
                "upper_limit": "No established Upper Limit (high therapeutic index with >30 years of clinical safety)",
                "toxicity": "Non-toxic; excess unabsorbed creatine is converted to creatinine and safely filtered by healthy renal glomeruli.",
                "overdose": "Taking >10-15g in a single unmixed dose can draw water into the bowel, causing temporary stomach cramping or diarrhea.",
                "drug_interactions": ["Non-Steroidal Anti-Inflammatory Drugs (NSAIDs like Ibuprofen): High-dose NSAIDs combined with high-dose creatine during dehydration may stress renal filtration."],
                "contraindications": ["Pre-existing chronic renal failure without medical monitoring"],
                "special_populations": ["Safe and well-tolerated across young athletes, women, and elderly populations."]
            },
            "interactions": [
                {"substance": "Carbohydrates & Protein", "interaction": "Enhanced muscle retention", "mechanism": "Insulin activates sodium-dependent SLC6A8 transporters, increasing creatine uptake into myocytes", "importance": "high"},
                {"substance": "Caffeine", "interaction": "Potential pharmacokinetic interference at high acute doses", "mechanism": "Massive acute co-ingestion (5mg/kg caffeine + creatine) may slightly blunt muscle relaxation time; separating them resolves this", "importance": "low"}
            ],
            "timing": {
                "matters": False,
                "detail": "Daily consistency and muscle saturation are 95% of the battle. Post-workout timing with food offers a slight theoretical advantage due to increased muscle blood flow and insulin sensitivity."
            },
            "performance": {
                "muscle": "Increases intracellular myocyte hydration, stimulating myogenic regulatory factors and muscle protein synthesis.",
                "strength": "Boosts 1-rep max and multi-set power output by 5-15% across bench press, squats, and Olympic lifts.",
                "fat_loss": "Preserves metabolically active lean tissue and resting metabolic rate during caloric deficits.",
                "recovery": "Decreases muscle cell damage and systemic inflammation (lowers creatine kinase and lactate dehydrogenase post-exercise).",
                "athletic": "Enhances repeated high-intensity sprint intervals, change-of-direction agility, and swim/track velocity.",
                "energy": "Prevents the dramatic drop in cellular ATP during short-burst maximal anaerobic exertion.",
                "sleep": "Maintains cognitive reaction time and executive focus during severe sleep deficits.",
                "cognitive": "Sustains brain bioenergetics during high-demand computational tasks and memory recall.",
                "hormones": "Supports healthy training volume without suppressing endocrine recovery.",
                "metabolic": "Upregulates GLUT4 glucose transporter expression, improving muscle glucose disposal."
            },
            "biomarkers": [
                {"marker": "Serum Creatinine", "measures": "Spontaneous breakdown product of muscle creatine.", "matters": "Will show a benign, non-pathological increase (e.g. 1.1 -> 1.4 mg/dL) due to higher whole-body creatine stores.", "limitations": "Automated eGFR calculations based on creatinine will falsely underestimate kidney function in creatine users.", "when": "Routine chemistry panel; alert doctor that you supplement with creatine."},
                {"marker": "Serum Cystatin-C", "measures": "Renal filtration marker independent of muscle mass or dietary creatine.", "matters": "Gold Standard test to confirm true, pristine kidney function in muscular individuals and creatine supplement users.", "limitations": "Slightly higher cost.", "when": "Whenever creatinine is flagged high and true kidney function must be verified."}
            ],
            "myths": [
                {"myth": "Creatine causes kidney damage and renal failure", "fact": "Completely debunked by dozens of long-term randomized trials lasting up to 5 years. Creatine slightly raises blood creatinine (its natural harmless breakdown product), which automated blood tests misinterpret as kidney stress. True kidney filtration (measured by Cystatin-C) remains completely normal."},
                {"myth": "Creatine causes hair loss and baldness", "fact": "A single 2009 study in 16 rugby players showed a temporary rise in DHT. Dozens of subsequent clinical trials failed to replicate this finding, and no clinical study has ever shown increased hair loss or follicle miniaturization from creatine."},
                {"myth": "Creatine causes fat gain and makes you look bloated", "fact": "Creatine causes intracellular water retention inside muscle cells (making muscles fuller, stronger, and more hydrated), NOT extracellular subcutaneous water under the skin."}
            ],
            "mistakes": [
                "Taking a massive 20g dose all at once without enough water and getting stomach cramps",
                "Worrying about a routine blood test showing slightly high creatinine without checking Cystatin-C",
                "Buying expensive 'designer' creatine formulations (HCL, liquid, buffered) that offer zero advantage over pure Creatine Monohydrate"
            ],
            "if_low": [
                "1. Take 3-5 grams of pure Creatine Monohydrate daily with a glass of water and a meal.",
                "2. Maintain adequate daily hydration (35-45 ml water per kg body weight).",
                "3. Continue for 3-4 weeks to reach full intramuscular saturation, then maintain indefinitely."
            ],
            "if_too_much": {
                "acute": "Transient stomach gurgling or loose stool if taken in huge unmixed single boluses (>10g).",
                "chronic": "Excess creatine is converted to creatinine and safely excreted by the kidneys.",
                "mechanism": "High unabsorbed single boluses draw water into the intestinal lumen via osmosis.",
                "signs": "Mild gastrointestinal discomfort.",
                "when_medical": "No medical intervention required; simply split larger doses into smaller 3g servings."
            },
            "research": [
                {
                    "title": "International Society of Sports Nutrition Position Stand: Safety and Efficacy of Creatine Supplementation in Exercise, Sport, and Medicine",
                    "year": "2017",
                    "study_type": "Position Stand & Comprehensive Meta-Review",
                    "evidence_level": "strong",
                    "summary": "The ISSN concluded that creatine monohydrate is the most effective ergogenic nutritional supplement currently available to athletes in terms of increasing high-intensity exercise capacity and lean body mass, with an outstanding safety profile across all age groups.",
                    "source": "Journal of the International Society of Sports Nutrition (JISSN)",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/28615996/"
                },
                {
                    "title": "Common Questions and Misconceptions About Creatine Supplementation: What Does the Scientific Evidence Really Show?",
                    "year": "2021",
                    "study_type": "Evidence-Based Systematic Review",
                    "evidence_level": "strong",
                    "summary": "Systematically debunked common myths: confirmed that creatine does not lead to dehydration, muscle cramping, kidney damage, hair loss, or fat accumulation.",
                    "source": "Journal of the International Society of Sports Nutrition (JISSN)",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/33557850/"
                }
            ]
        }
    },
    # -----------------------------------------------------------------
    # VITAMIN A
    # -----------------------------------------------------------------
    "vitamin_a": {
        "subject": "Vitamin A (Retinol & Provitamin A Carotenoids)",
        "category": "Vitamins",
        "query_type": "vitamin",
        "one_liner": "An essential fat-soluble micronutrient and nuclear receptor ligand crucial for retinal photoreception, mucosal epithelial barrier integrity, and cellular differentiation.",
        "science_score": 97,
        "science_score_rationale": "Backed by decades of human clinical trials, biochemical validation of retinal visual cycles, and nuclear RAR/RXR gene transcription pathways.",
        "safety_level": "yellow",
        "quick_answer": "Vitamin A is an essential fat-soluble nutrient existing as preformed retinoids (retinol, retinyl palmitate in animal foods) and provitamin A carotenoids (beta-carotene in plants). It forms rhodopsin for low-light vision, regulates genomic expression via RAR/RXR nuclear receptors for mucosal immunity, and maintains skin epidermal turnover.",
        "followups": [
            "What is the difference between preformed Retinol and Beta-Carotene?",
            "What are the clinical signs of Vitamin A toxicity vs deficiency?",
            "How does Vitamin A interact with Zinc and Thyroid function?",
            "What is the safe upper limit for Vitamin A in pregnancy?"
        ],
        "sections": {
            "what_is_it": {
                "beginner": "Vitamin A is a fat-soluble vitamin essential for sharp vision (especially at night), glowing skin, strong immunity, and healthy mucous membranes protecting your lungs and gut.",
                "advanced": "Vitamin A encompasses a group of lipid-soluble retinoids (retinol, retinal, retinoic acid) and provitamin carotenoids (notably beta-carotene). 11-cis-retinal serves as the chromophore for rhodopsin in retinal rods, while all-trans-retinoic acid acts as a potent nuclear hormone ligand for RAR and RXR transcription factor complexes."
            },
            "why_important": [
                {"title": "Visual Phototransduction & Rhodopsin", "evidence": "strong", "detail": "11-cis-retinal binds opsin to form rhodopsin in retinal rod cells; photon absorption triggers photoisomerization to all-trans-retinal, initiating optical nerve signaling."},
                {"title": "Mucosal Immunity & Epithelial Integrity", "evidence": "strong", "detail": "All-trans-retinoic acid governs epithelial cell differentiation, secretory IgA production, and goblet cell mucin synthesis across respiratory and GI tracts."},
                {"title": "Gene Expression via RAR/RXR", "evidence": "strong", "detail": "Binds retinoic acid receptors (RAR) and retinoid X receptors (RXR) to regulate over 500 gene networks involved in cell growth, embryogenesis, and hematopoiesis."},
                {"title": "Dermal Keratinocyte Differentiation", "evidence": "strong", "detail": "Normalizes follicular hyperkeratosis, decreases sebum production, and accelerates dermal wound re-epithelialization."}
            ],
            "affects": [
                {"system": "Eyes & Vision", "level": "primary", "detail": "Essential for rod and cone photoreceptor pigment regeneration and corneal surface maintenance."},
                {"system": "Immune System & Mucosa", "level": "primary", "detail": "Maintains physical epithelial barriers and regulates T-helper (Th1/Th2/Treg) cell differentiation."},
                {"system": "Skin & Epithelium", "level": "primary", "detail": "Governs epidermal cell turnover, keratin synthesis, and extracellular matrix remodeling."},
                {"system": "Reproduction & Development", "level": "secondary", "detail": "Required for spermatogenesis, placental development, and embryonic pattern formation."}
            ],
            "mechanism": {
                "summary": "Dietary retinyl esters and carotenoids are hydrolyzed in the gut lumen, incorporated into mixed micelles with dietary lipids, and absorbed into enterocytes. Converted to retinol, esterified, and packaged into chylomicrons for hepatic storage in stellate cells. In circulation, retinol binds Retinol-Binding Protein 4 (RBP4) and transthyretin (TTR). In target cells, it is oxidized to retinoic acid to activate nuclear RAR/RXR transcription factors.",
                "steps": [
                    {"stage": "Intestinal Micellar Absorption", "detail": "Requires dietary fat and bile salts; carotenoids are cleaved by BCO1 enzyme in enterocytes."},
                    {"stage": "Hepatic Stellate Storage", "detail": "Over 80-90% of total body Vitamin A is stored as retinyl palmitate in liver lipid droplets."},
                    {"stage": "RBP4-TTR Plasma Transport", "detail": "Mobilized as retinol complexed 1:1 with Retinol-Binding Protein 4 and transthyretin to prevent renal filtration."},
                    {"stage": "Target Cell Nuclear Activation", "detail": "Oxidized to all-trans-retinoic acid (ATRA), which translocates to nucleus and binds RAR/RXR heterodimers on RARE DNA elements."}
                ]
            },
            "uses": {
                "strong": ["Preventing night blindness (nyctalopia) and corneal xerophthalmia", "Treating clinical deficiency and supporting mucosal barrier recovery during childhood measles", "Topical and systemic dermatological therapy for acne vulgaris and photoaging"],
                "moderate": ["Supporting adaptive immune antibody response and mucosal IgA secretion", "Promoting wound healing in burn victims and post-surgical recovery"],
                "emerging": ["Modulating gut barrier permeability and regulatory T-cell induction in inflammatory bowel conditions"],
                "insufficient": ["High-dose supplementation for cancer prevention in smokers (beta-carotene supplements increase lung cancer risk in smokers)"]
            },
            "deficiency": {
                "causes": ["Inadequate intake of preformed retinol (animal liver, dairy, eggs) or carotenoids (carrots, sweet potatoes)", "Fat malabsorption (celiac disease, Crohn's, cystic fibrosis, pancreatic insufficiency)", "Severe zinc deficiency (zinc is required to synthesize RBP4 and activate retinol dehydrogenase)"],
                "effects": ["Impaired rhodopsin regeneration causing night blindness (nyctalopia)", "Bitot's spots, conjunctival xerosis, and progressive corneal keratomalacia", "Follicular hyperkeratosis (phrynoderma / 'goose-flesh' skin texture)", "Increased susceptibility to respiratory and diarrheal infections"],
                "symptoms": ["Poor night vision / delayed dark adaptation", "Dry, gritty eyes (xerophthalmia)", "Dry, bumpy skin (keratosis pilaris / follicular hyperkeratosis)", "Frequent respiratory or gastrointestinal infections"],
                "symptoms_note": "Night blindness and dry eyes are the hallmark early clinical indicators of tissue retinol depletion.",
                "timeline": "Liver stores typically protect against deficiency for 3 to 12 months in well-nourished adults before clinical signs emerge."
            },
            "food_sources": [
                {"food": "Beef Liver (Cooked)", "amount": "100 g", "content": "9,442 mcg RAE", "bioavailability": "high", "serving": "3.5 oz", "type": "animal"},
                {"food": "Sweet Potato (Baked with skin)", "amount": "1 medium", "content": "1,096 mcg RAE (Beta-Carotene)", "bioavailability": "medium", "serving": "1 potato", "type": "plant"},
                {"food": "Carrots (Cooked with olive oil)", "amount": "1 cup sliced", "content": "1,069 mcg RAE (Beta-Carotene)", "bioavailability": "medium", "serving": "1 cup (156g)", "type": "plant"},
                {"food": "Spinach (Cooked)", "amount": "1 cup", "content": "943 mcg RAE (Beta-Carotene)", "bioavailability": "medium", "serving": "1 cup (180g)", "type": "plant"},
                {"food": "Cod Liver Oil", "amount": "1 tsp (4.5g)", "content": "1,350 mcg RAE", "bioavailability": "high", "serving": "1 teaspoon", "type": "animal"},
                {"food": "Pasture-Raised Whole Eggs", "amount": "2 large eggs", "content": "160 mcg RAE", "bioavailability": "high", "serving": "2 eggs", "type": "animal"}
            ],
            "absorption": {
                "increases": ["Co-ingestion with 5-10g of dietary fat (retinoids and carotenoids are fat-soluble)", "Thermal cooking of plant carotenoids (breaks plant cell matrix to liberate beta-carotene)", "Adequate zinc status (required for enterocyte and hepatic transport proteins)"],
                "decreases": ["Fat malabsorption syndromes, orlistat, bile acid sequestrants (cholestyramine)", "Extremely low-fat diets (<10g fat/day reduces carotenoid uptake by >80%)", "Mineral oil and severe alcohol abuse"],
                "forms": [
                    "Retinol / Retinyl Palmitate: Preformed, highly bioavailable (1:1 RAE)",
                    "Beta-Carotene: Provitamin, conversion ratio ~12:1 to 24:1 in humans based on genetics (BCO1 enzyme variants)",
                    "Retinoic Acid: Prescription topical/oral dermatological form, biologically active"
                ],
                "notes": "Individuals with low BCO1 genetic conversion efficiency require more preformed dietary retinol from animal sources rather than relying purely on plant beta-carotene."
            },
            "requirements": {
                "rda": "900 mcg RAE/day (Men), 700 mcg RAE/day (Women)",
                "groups": [
                    {"group": "Adult Men", "amount": "900 mcg RAE/day (3,000 IU)"},
                    {"group": "Adult Women", "amount": "700 mcg RAE/day (2,333 IU)"},
                    {"group": "Pregnancy", "amount": "770 mcg RAE/day"},
                    {"group": "Lactation", "amount": "1,300 mcg RAE/day"}
                ],
                "ul": "3,000 mcg RAE/day (10,000 IU preformed retinol)",
                "note": "Tolerable Upper Intake Level (UL) of 3,000 mcg applies ONLY to preformed retinol, NOT provitamin carotenoids from food."
            },
            "supplementation": {
                "who_might": ["Individuals with clinical fat malabsorption or bariatric surgery", "Strict vegans with BCO1 genetic polymorphisms causing poor beta-carotene conversion", "Patients with diagnosed retinal or skin disorders under medical supervision"],
                "who_probably_not":["Pregnant women taking high-dose preformed retinol (teratogenic risk)", "Heavy tobacco smokers (high-dose beta-carotene supplements increase lung cancer incidence in clinical trials)", "Individuals regularly consuming liver multiple times per week"],
                "forms": ["Retinyl Palmitate Capsules", "Beta-Carotene Softgels", "Cod Liver Oil"],
                "typical_amounts": "700-900 mcg RAE (2,500-3,000 IU) daily",
                "timing": "With the largest meal containing dietary fats",
                "with_food": "Must take with a meal containing at least 5-10g dietary fat for optimal micellar absorption",
                "duration": "Daily with meals, or cyclical based on serum biomarker testing",
                "cycling": "Preformed retinol supplements should be periodic or biomarker-guided due to hepatic tissue accumulation."
            },
            "safety": {
                "level": "yellow",
                "upper_limit": "3,000 mcg RAE/day (10,000 IU preformed retinol)",
                "toxicity": "Hypervitaminosis A occurs from excessive intake of preformed retinol (not beta-carotene). Leads to hepatic stellate hypertrophy, elevated intracranial pressure, bone demineralization, and teratogenicity in pregnancy.",
                "overdose": "Acute high doses (>100,000 IU) cause severe headache, pseudotumor cerebri, nausea, vomiting, dizziness, and peeling skin.",
                "drug_interactions": ["Oral Retinoids (Isotretinoin, Acitretin): Additive severe toxicity", "Warfarin: High-dose vitamin A may enhance bleeding risk", "Hepatotoxic drugs: Increased risk of liver injury"],
                "contraindications": ["Pregnancy (doses >10,000 IU preformed retinol are teratogenic)", "Active liver disease or chronic alcoholism", "Concurrent prescription retinoid therapy"],
                "special_populations": ["Women of childbearing potential should not exceed 3,000 mcg RAE preformed retinol daily."]
            },
            "interactions": [
                {"substance": "Zinc", "interaction": "Synergistic", "mechanism": "Zinc is required to synthesize Retinol-Binding Protein (RBP4) and for retinol dehydrogenase activity.", "importance": "high"},
                {"substance": "Vitamin E & C", "interaction": "Synergistic", "mechanism": "Protects Vitamin A and carotenoids from oxidative degradation in tissues.", "importance": "moderate"},
                {"substance": "Isotretinoin", "interaction": "Contraindicated / Toxic", "mechanism": "Severe additive retinoid toxicity.", "importance": "high"}
            ],
            "timing": {
                "matters": True,
                "detail": "Take with lunch or dinner containing dietary fats for maximum micellar absorption."
            },
            "performance": {
                "muscle": "Regulates protein synthesis and satellite cell differentiation via retinoic acid receptor signaling.",
                "strength": "Supports testosterone biosynthesis and growth hormone axis in conjunction with zinc.",
                "fat_loss": "Retinoic acid promotes uncoupling protein-1 (UCP1) expression and white-to-brown adipose browning in preclinical models.",
                "recovery": "Essential for extracellular matrix repair, mucosal barrier recovery, and immune surveillance post-strenuous exercise.",
                "athletic": "Maintains visual reaction time and low-light visual acuity in athletes.",
                "energy": "Supports normal transferrin synthesis and erythropoiesis in the bone marrow.",
                "sleep": "Maintains retinal melanopsin photoreceptor health for circadian light signaling.",
                "cognitive": "Retinoic acid signaling in the hippocampus is essential for synaptic plasticity and spatial working memory.",
                "hormones": "Required for normal testicular steroidogenesis and thyroid hormone receptor responsiveness.",
                "metabolic": "Regulates hepatic gluconeogenesis and adipokine secretion."
            },
            "biomarkers": [
                {"marker": "Serum Retinol", "measures": "Circulating preformed retinol (homeostatically regulated)", "matters": "Identifies severe depletion (<0.7 µmol/L) or toxic elevation (>3.5 µmol/L)", "limitations": "Maintained by liver stores until hepatic reserves are severely exhausted", "when": "Suspected deficiency, malabsorption, or bariatric surgery follow-up"},
                {"marker": "Retinol-Binding Protein (RBP4)", "measures": "Specific carrier protein for retinol", "matters": "Validates transport capacity and reflects acute phase status (negative acute-phase reactant)", "limitations": "Suppressed during systemic inflammation and zinc deficiency", "when": "Comprehensive micronutrient and nutritional assessment"}
            ],
            "myths": [
                {"myth": "Plant beta-carotene can cause Vitamin A liver toxicity.", "fact": "Beta-carotene is non-toxic because intestinal BCO1 enzyme cleavage down-regulates automatically as vitamin A stores fill. Excess carotenoids merely turn the skin harmlessly orange (carotenodermia)."},
                {"myth": "Carrots provide identical vitamin A to liver or egg yolks.", "fact": "Carrots provide beta-carotene, which must be converted to active retinol with a conversion ratio between 12:1 and 24:1 depending on individual genetics."}
            ],
            "mistakes": [
                "Taking high-dose preformed retinol supplements alongside prescription acne medications",
                "Consuming plant carotenoids on a completely fat-free diet (drastically reduces absorption)",
                "Exceeding the 3,000 mcg RAE upper limit during pregnancy",
                "Assuming low serum retinol always means deficiency without checking CRP/inflammation"
            ],
            "if_low": [
                "Incorporate 1-2 servings of whole food retinol (eggs, dairy, fish) and carotenoids (sweet potatoes, carrots, spinach) daily",
                "Ensure meals contain at least 5-10g of healthy fats (olive oil, avocado, butter) to facilitate micellar transport",
                "Check zinc biomarker status (serum zinc / alkaline phosphatase) to ensure adequate retinol transport proteins",
                "If malabsorption exists, consult a physician for targeted water-miscible retinyl palmitate supplementation"
            ],
            "if_too_much": {
                "acute": "Intense throbbing headache, pseudotumor cerebri, severe nausea, vomiting, and generalized skin desquamation.",
                "chronic": "Hepatic fibrosis, portal hypertension, dry fissured lips (cheilitis), alopecia, bone pain, and hypercalcemia.",
                "mechanism": "Excess retinol saturates RBP4 transport capacity, causing free circulating retinyl esters to disrupt cellular membranes and lysosomal integrity.",
                "signs": "Severe headaches, visual blurring, elevated liver transaminases (ALT/AST), enlarged liver, bone demineralization.",
                "when_medical": "Seek immediate emergency medical evaluation if experiencing sudden severe headache, blurred vision, or yellowing of the skin/eyes (jaundice)."
            },
            "research": [
                {
                    "title": "Vitamin A Deficiency and Its Global Burden on Ocular and Mucosal Health",
                    "year": "2022",
                    "study_type": "Systematic Review & Meta-Analysis",
                    "evidence_level": "strong",
                    "summary": "Confirmed that adequate vitamin A status reduces all-cause mortality and diarrheal disease severity by restoring epithelial barrier tight junctions.",
                    "source": "The Lancet Global Health",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/35247318/"
                },
                {
                    "title": "Retinoids in Dermatology: Mechanisms of Action and Clinical Efficacy",
                    "year": "2020",
                    "study_type": "Clinical Review",
                    "evidence_level": "strong",
                    "summary": "Detailed RAR-mediated nuclear transcription pathways through which topical and systemic retinoids modulate epidermal proliferation and reduce acne lesions.",
                    "source": "Dermatologic Therapy",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/32415712/"
                }
            ]
        }
    },
    # -----------------------------------------------------------------
    # OMEGA-3 FATTY ACIDS
    # -----------------------------------------------------------------
    "omega_3": {
        "subject": "Omega-3 Fatty Acids (EPA & DHA)",
        "category": "Supplements",
        "query_type": "supplement",
        "one_liner": "Essential long-chain polyunsaturated fatty acids that integrate into cell phospholipid bilayers, resolving systemic inflammation and supporting neuronal membrane fluidity.",
        "science_score": 98,
        "science_score_rationale": "Supported by over 4,000 human randomized controlled trials, cardiovascular outcome studies, and mechanistic lipidomics.",
        "safety_level": "green",
        "quick_answer": "Omega-3 fatty acids, specifically Eicosapentaenoic Acid (EPA) and Docosahexaenoic Acid (DHA), are essential polyunsaturated fatty acids (PUFAs). They incorporate into cellular phospholipid membranes, produce Specialized Pro-resolving Mediators (resolvins, protectins), lower serum triglycerides by 20-30%, and maintain synaptic membrane fluidity in the brain.",
        "followups": [
            "What is the difference between EPA and DHA for mood vs heart health?",
            "What is the optimal Omega-3 Index for longevity and cardiovascular health?",
            "How does Fish Oil compare to Krill Oil and Algal Oil?",
            "What is the ideal ratio of Omega-6 to Omega-3 in the diet?"
        ],
        "sections": {
            "what_is_it": {
                "beginner": "Omega-3s are healthy essential fats found in fatty fish and algae that fight inflammation, protect your heart, sharpen brain function, and support joint comfort.",
                "advanced": "Omega-3 polyunsaturated fatty acids (PUFAs) include plant-derived alpha-linolenic acid (ALA) and marine-derived eicosapentaenoic acid (EPA, 20:5n-3) and docosahexaenoic acid (DHA, 22:6n-3). EPA and DHA incorporate into cell membrane phospholipids, displacing arachidonic acid and serving as precursors to specialized pro-resolving mediators (SPMs) via lipoxygenase and cyclooxygenase pathways."
            },
            "why_important": [
                {"title": "Membrane Phospholipid Fluidity & Receptors", "evidence": "strong", "detail": "DHA's 6 double bonds give cell membranes conformational flexibility, optimizing G-protein coupled receptor (GPCR) and rhodopsin signaling kinetics in neural synapses and retinal membranes."},
                {"title": "Specialized Pro-resolving Mediators (SPMs)", "evidence": "strong", "detail": "Enzymatically converted into resolvins (E-series from EPA, D-series from DHA), protectins, and maresins that actively terminate leukocyte infiltration and clear inflammatory exudate without immune suppression."},
                {"title": "Triglyceride Lowering & VLDL Clearance", "evidence": "strong", "detail": "Down-regulates SREBP-1c and activates PPAR-alpha to increase mitochondrial hepatic beta-oxidation, reducing VLDL triglyceride secretion by 20-30%."},
                {"title": "Cardiovascular Endothelial Nitric Oxide & Plaque Stability", "evidence": "strong", "detail": "Improves flow-mediated dilation, reduces vascular cell adhesion molecule-1 (VCAM-1), and stabilizes atherosclerotic fibrous caps."}
            ],
            "affects": [
                {"system": "Heart & Blood Vessels", "level": "primary", "detail": "Lowers serum triglycerides, reduces resting heart rate, and improves arterial compliance."},
                {"system": "Brain & Nervous System", "level": "primary", "detail": "DHA comprises >40% of brain polyunsaturated fatty acids, supporting neurotransmission and neuroprotection."},
                {"system": "Immune System & Joints", "level": "primary", "detail": "Shifts eicosanoid balance away from inflammatory prostaglandin E2 and leukotriene B4 toward pro-resolving mediators."},
                {"system": "Eyes & Vision", "level": "secondary", "detail": "Concentrates in retinal photoreceptor outer segments to maintain phototransduction kinetics."}
            ],
            "mechanism": {
                "summary": "Dietary EPA and DHA are emulsified by bile salts, hydrolyzed by pancreatic lipase into sn-2 monoglycerides and free fatty acids, absorbed into enterocytes, re-esterified into triglycerides, and transported via chylomicrons. Incorporated into cell membrane phospholipids, where they displace arachidonic acid and serve as substrates for SPM synthesis.",
                "steps": [
                    {"stage": "Micellar Duodenal Absorption", "detail": "Absorbed with dietary fat and transported via lymphatics in chylomicrons."},
                    {"stage": "Cell Membrane Incorporation", "detail": "Enzymatically esterified into the sn-2 position of membrane phospholipids in red blood cells, myocardium, and neural tissue."},
                    {"stage": "Displacement of Arachidonic Acid", "detail": "Competitively inhibits delta-5-desaturase and displaces Omega-6 arachidonic acid from membrane pools."},
                    {"stage": "SPM Synthesis & PPAR Activation", "detail": "Acts as ligand for PPAR-alpha/gamma and substrate for 15-LOX/5-LOX to synthesize E-series and D-series resolvins."}
                ]
            },
            "uses": {
                "strong": ["Treating hypertriglyceridemia (reduces fasting triglycerides by 20-30%)", "Reducing cardiovascular mortality and events in high-risk patients (REDUCE-IT trial with high-dose pure EPA)", "Resolving chronic systemic low-grade inflammation"],
                "moderate": ["Adjunctive therapy for major depressive disorder (especially EPA-dominant formulas with >60% EPA)", "Alleviating joint stiffness and pain in rheumatoid arthritis", "Improving dry eye syndrome symptoms"],
                "emerging": ["Preserving cognitive function and reducing neuroinflammation in early mild cognitive impairment", "Accelerating muscle recovery and attenuating delayed onset muscle soreness (DOMS)"],
                "insufficient": ["Replacing standard acute cardiovascular or psychiatric medical interventions"]
            },
            "deficiency": {
                "causes": ["Low dietary intake of cold-water marine fish (salmon, sardines, mackerel)", "Excessive intake of refined vegetable oils high in Omega-6 linoleic acid", "Extremely poor human conversion of plant ALA to EPA (<5-10%) and DHA (<1%)"],
                "effects": ["Omega-3 Index <4% (associated with substantially increased cardiovascular risk)", "Pro-inflammatory eicosanoid profile dominated by arachidonic acid metabolites", "Dry skin, rough patches, and poor wound healing", "Suboptimal cognitive processing and mood instability"],
                "symptoms": ["Dry, scaly, or inflamed skin", "Poor concentration & mental fatigue", "Joint stiffness & persistent soreness", "Dry eyes & visual fatigue"],
                "symptoms_note": "A low Omega-3 Index (<4%) is an established independent cardiovascular and all-cause mortality risk biomarker.",
                "timeline": "Erythrocyte membrane fatty acid saturation (Omega-3 Index) requires 8 to 12 weeks of daily supplementation to reach the optimal >8% target."
            },
            "food_sources": [
                {"food": "Wild Atlantic Salmon (Cooked)", "amount": "100 g (3.5 oz)", "content": "2,260 mg EPA+DHA", "bioavailability": "high", "serving": "1 fillet (150g)", "type": "animal"},
                {"food": "Sardines in Olive Oil", "amount": "1 can (100 g)", "content": "1,480 mg EPA+DHA", "bioavailability": "high", "serving": "1 can", "type": "animal"},
                {"food": "Mackerel (Cooked)", "amount": "100 g", "content": "2,500 mg EPA+DHA", "bioavailability": "high", "serving": "3.5 oz", "type": "animal"},
                {"food": "Chia Seeds (ALA precursor)", "amount": "2 tbsp (28 g)", "content": "5,000 mg ALA (~250mg EPA equiv)", "bioavailability": "medium", "serving": "2 tbsp", "type": "plant"},
                {"food": "Walnuts (ALA precursor)", "amount": "1 oz (28 g)", "content": "2,570 mg ALA (~120mg EPA equiv)", "bioavailability": "medium", "serving": "1 handful", "type": "plant"},
                {"food": "Algal Oil (Vegan DHA+EPA)", "amount": "1 ml dropper", "content": "500 mg EPA+DHA", "bioavailability": "high", "serving": "1 ml", "type": "plant"}
            ],
            "absorption": {
                "increases": ["Co-ingestion with a meal containing dietary fats (stimulates pancreatic lipase and bile flow 3-5x)", "Triglyceride (rTG) or phospholipid forms (superior bioavailability compared to ethyl ester forms on empty stomach)"],
                "decreases": ["Taking fish oil capsules on a completely empty stomach with only water (reduces absorption by >60%)", "Fat malabsorption disorders and pancreatic insufficiency"],
                "forms": [
                    "Re-esterified Triglyceride (rTG): Highest bioavailability, natural triglyceride structure",
                    "Ethyl Ester (EE): Standard concentrated pharmaceutical form; requires fat-containing meal for lipase hydrolysis",
                    "Phospholipid (Krill Oil): Bound to phosphatidylcholine, highly absorbable",
                    "Algal Oil: Direct vegan source of pure DHA and EPA"
                ],
                "notes": "Always consume Omega-3 supplements with the largest fat-containing meal of the day to ensure optimal pancreatic lipase activation."
            },
            "requirements": {
                "rda": "500-1000 mg combined EPA+DHA daily for general health (AHA recommends 1g for CHD, 2-4g for hypertriglyceridemia)",
                "groups": [
                    {"group": "General Adult Health", "amount": "500-1,000 mg EPA+DHA/day"},
                    {"group": "Cardiovascular Risk Reduction", "amount": "1,000-2,000 mg EPA+DHA/day"},
                    {"group": "Hypertriglyceridemia (Clinical)", "amount": "2,000-4,000 mg EPA/day"},
                    {"group": "Mood & Cognitive Support", "amount": "1,000-2,000 mg (≥60% EPA)/day"}
                ],
                "ul": "5,000 mg/day total EPA+DHA (FDA & EFSA safe upper guidance)",
                "note": "Daily doses up to 3,000-4,000 mg are safely prescribed in clinical cardiology without adverse bleeding events."
            },
            "supplementation": {
                "who_might": ["Individuals who do not consume 2+ servings of oily fish per week", "People with elevated triglycerides, high hs-CRP, or cardiovascular family history", "Athletes seeking improved muscle recovery and joint comfort", "Individuals seeking cognitive and mood support"],
                "who_probably_not":["People consuming 3-4 portions of wild fatty fish weekly with an Omega-3 Index >8%", "Individuals with active bleeding disorders unless approved by a physician"],
                "forms": ["rTG Fish Oil Softgels", "Pure EPA Ethyl Ester", "Liquid Fish Oil (IFOS Certified)", "Algal Oil (Vegan)"],
                "typical_amounts": "1,000-2,000 mg combined EPA+DHA daily",
                "timing": "With the heaviest meal of the day (lunch or dinner)",
                "with_food": "Always take with meals containing dietary fats to optimize absorption and eliminate fishy burps",
                "duration": "Continuous daily intake; minimum 8-12 weeks to achieve target membrane saturation",
                "cycling": "No cycling required; ongoing essential nutrient."
            },
            "safety": {
                "level": "green",
                "upper_limit": "5,000 mg/day combined EPA+DHA",
                "toxicity": "Non-toxic; extremely well tolerated across human clinical trials.",
                "overdose": "Extremely high doses (>5g/day) may cause mild gastrointestinal looseness, fishy aftertaste, and minor platelet aggregation slowing.",
                "drug_interactions": ["Anticoagulants & Antiplatelets (Warfarin, Clopidogrel, Aspirin): Mild additive antithrombotic effect; monitor INR if taking >3g/day", "Antihypertensive medications: Slight additive blood pressure reduction"],
                "contraindications": ["Severe active hemorrhagic conditions or unmanaged severe bleeding disorders", "Known fish or shellfish allergy (unless using purified algal oil)"],
                "special_populations": ["Safe and encouraged in pregnancy (DHA is vital for fetal brain and eye development)."]
            },
            "interactions": [
                {"substance": "Vitamin D3", "interaction": "Synergistic", "mechanism": "Fat-soluble Vitamin D is absorbed with fish oil lipids and works additively on immune and vascular health.", "importance": "high"},
                {"substance": "Curcumin", "interaction": "Synergistic", "mechanism": "Lipid vehicle enhances curcumin bioavailability; both downregulate NF-kB inflammatory cascades.", "importance": "high"},
                {"substance": "Warfarin", "interaction": "Monitor", "mechanism": "Additive mild antithrombotic activity at high doses (>3g/day).", "importance": "moderate"}
            ],
            "timing": {
                "matters": True,
                "detail": "Take with lunch or dinner containing dietary fats for maximum bioavailability."
            },
            "performance": {
                "muscle": "Enhances muscle protein synthesis sensitivity to amino acids and resistance training via mTORC1 sensitization.",
                "strength": "Reduces delayed-onset muscle soreness (DOMS) and preserves muscle quality during recovery periods.",
                "fat_loss": "Increases fatty acid oxidation through PPAR-alpha receptor activation.",
                "recovery": "Accelerates clearance of exercise-induced muscle damage biomarkers (creatine kinase, LDH) and reduces soreness.",
                "athletic": "Improves erythrocyte deformability and microvascular oxygen delivery to exercising skeletal muscle.",
                "energy": "Supports mitochondrial membrane integrity and oxidative phosphorylation efficiency.",
                "sleep": "DHA supports melatonin synthesis and nocturnal vagal tone.",
                "cognitive": "Enhances working memory, reaction time, and cerebral blood flow during demanding cognitive tasks.",
                "hormones": "Reduces cortisol response to acute psychological and physical stressors.",
                "metabolic": "Improves cellular insulin receptor membrane fluidity and lowers fasting triglycerides."
            },
            "biomarkers": [
                {"marker": "Omega-3 Index", "measures": "EPA + DHA percentage in red blood cell (RBC) membranes", "matters": "Target is 8% to 12% for optimal cardiovascular and cognitive protection (high risk <4%, moderate 4-8%)", "limitations": "Requires 8-12 weeks of consistent intake to reach steady state in RBCs", "when": "Baseline and 3-4 months after starting or adjusting Omega-3 supplementation"},
                {"marker": "Fasting Triglycerides", "measures": "Serum VLDL and chylomicron lipid content", "matters": "Direct biomarker of Omega-3 lipid-lowering efficacy", "limitations": "Requires 10-12 hour fast", "when": "Routine metabolic panels (every 3-6 months)"},
                {"marker": "High-Sensitivity C-Reactive Protein (hs-CRP)", "measures": "Systemic vascular inflammation", "matters": "Tracks anti-inflammatory response to EPA/DHA SPM synthesis", "limitations": "Elevated transiently during acute bacterial/viral infections", "when": "Cardiovascular risk stratification"}
            ],
            "myths": [
                {"myth": "Flaxseed or Chia seeds provide all the Omega-3 your body needs.", "fact": "Flax and chia provide ALA, which humans convert to EPA at only <5-10% and to DHA at <1%. Marine EPA/DHA is necessary for direct tissue membrane incorporation."},
                {"myth": "All fish oil supplements cause fishy burps and go rancid quickly.", "fact": "Fresh, high-quality re-esterified triglyceride (rTG) fish oil with low TOTOX oxidation values (<10) and natural tocopherols has zero odor and does not cause indigestion when taken with meals."}
            ],
            "mistakes": [
                "Taking fish oil capsules on an empty stomach with a glass of water (greatly reduces absorption)",
                "Purchasing cheap, unpurified oils with high TOTOX oxidation scores",
                "Assuming 1,000mg fish oil capsule means 1,000mg EPA+DHA (check active EPA/DHA content on label)",
                "Relying entirely on plant ALA while having an Omega-3 index <4%"
            ],
            "if_low": [
                "Incorporate 2-3 servings of cold-water oily fish (wild salmon, sardines, mackerel) per week",
                "Begin taking 1,000-2,000 mg combined EPA+DHA daily in rTG form with a fat-containing meal",
                "Reduce excessive dietary consumption of refined seed oils (high Omega-6 linoleic acid)",
                "Test your RBC Omega-3 Index after 12 weeks to verify reaching the >8% target zone"
            ],
            "if_too_much": {
                "acute": "Loose stools, mild gastrointestinal upset, fishy aftertaste.",
                "chronic": "Excessively prolonged bleeding time if taking massive doses (>10g/day) without clinical monitoring.",
                "mechanism": "High doses displace platelet membrane arachidonic acid, reducing thromboxane A2 aggregation.",
                "signs": "Easy bruising, minor nosebleeds, digestive discomfort.",
                "when_medical": "Consult a healthcare provider if taking anticoagulant medications and noticing unexplained spontaneous bruising."
            },
            "research": [
                {
                    "title": "Cardiovascular Risk Reduction with Icosapent Ethyl for Hypertriglyceridemia (REDUCE-IT)",
                    "year": "2019",
                    "study_type": "Multicenter Double-Blind RCT (n=8,179)",
                    "evidence_level": "strong",
                    "summary": "4g/day of pure EPA reduced ischemic cardiovascular events including CV death by 25% in statin-treated patients with elevated triglycerides.",
                    "source": "New England Journal of Medicine (NEJM)",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/30415628/"
                },
                {
                    "title": "Omega-3 Fatty Acids and Depression: A Systematic Review and Meta-Analysis of Randomized Clinical Trials",
                    "year": "2020",
                    "study_type": "Meta-Analysis of 26 RCTs",
                    "evidence_level": "strong",
                    "summary": "Formulations with pure EPA or EPA:DHA ratio ≥60% demonstrated significant clinical efficacy in reducing depressive symptoms.",
                    "source": "Translational Psychiatry",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/32770020/"
                }
            ]
        }
    },
    # -----------------------------------------------------------------
    # POTASSIUM
    # -----------------------------------------------------------------
    "potassium": {
        "subject": "Potassium",
        "category": "Minerals",
        "query_type": "mineral",
        "one_liner": "The major intracellular cation and electrolyte indispensable for establishing resting membrane potential, cardiac repolarization, and vascular endothelial relaxation.",
        "science_score": 97,
        "science_score_rationale": "Extensive clinical trial data, Cochrane meta-analyses on blood pressure and stroke prevention, and foundational cellular electrophysiology.",
        "safety_level": "yellow",
        "quick_answer": "Potassium (K+) is the primary intracellular mineral cation in the human body (~98% intracellular). It maintains the cellular resting membrane potential via the electrogenic Na+/K+-ATPase pump, counters dietary sodium to lower systemic blood pressure, drives cardiac action potential repolarization, and prevents metabolic alkalosis and muscle tetany.",
        "followups": [
            "What is the ideal Sodium-to-Potassium ratio for optimal blood pressure?",
            "Why do over-the-counter potassium supplements only contain 99mg?",
            "What are the best whole-food sources to reach the 3,400-4,700mg daily goal?",
            "What are the dangerous warning signs of hyperkalemia vs hypokalemia?"
        ],
        "sections": {
            "what_is_it": {
                "beginner": "Potassium is an essential mineral and electrolyte that helps control your blood pressure, keeps your heartbeat steady, stops painful muscle cramps, and helps your nerves send clear signals.",
                "advanced": "Potassium is the dominant intracellular cation (~140-150 mEq/L intracellular vs. 3.5-5.0 mEq/L in extracellular fluid). This steep electrochemical gradient is continuously maintained by energy-dependent Na+/K+-ATPase pumps (3 Na+ out for every 2 K+ in), creating the polarized resting membrane potential of excitable nerve, cardiac, and skeletal muscle cells."
            },
            "why_important": [
                {"title": "Resting Membrane Potential & Nerve Conduction", "evidence": "strong", "detail": "The outward leak of K+ through tandem-pore domain channels generates the negative resting membrane potential (~-70mV to -90mV) necessary for action potential generation in nerves and muscles."},
                {"title": "Cardiac Rhythm & Myocardial Repolarization", "evidence": "strong", "detail": "Delayed rectifier potassium currents (IKr, IKs) drive cardiac action potential Phase 3 repolarization, preventing fatal ventricular arrhythmias and QT prolongation."},
                {"title": "Blood Pressure Reduction & Sodium Counterbalance", "evidence": "strong", "detail": "Induces endothelium-dependent vasodilation through hyperpolarization of vascular smooth muscle cells and promotes natriuresis (urinary sodium excretion) via the renal distal tubule."},
                {"title": "Glycogen Storage & Protein Synthesis", "evidence": "strong", "detail": "Obligatory for pyruvate kinase activity in glycolysis and required alongside insulin for skeletal muscle glycogen storage and ribosomal translation."}
            ],
            "affects": [
                {"system": "Heart & Blood Vessels", "level": "primary", "detail": "Regulates cardiac rhythm, decreases arterial stiffness, and promotes vascular smooth muscle hyperpolarization."},
                {"system": "Muscles & Nerves", "level": "primary", "detail": "Permits voluntary muscular excitation-contraction coupling and terminates muscle spasms."},
                {"system": "Kidneys & Fluid Balance", "level": "primary", "detail": "Regulates glomerular filtration rate, stimulates urinary sodium excretion, and prevents nephrolithiasis (kidney stones)."},
                {"system": "Metabolism & Mitochondria", "level": "secondary", "detail": "Supports pancreatic insulin secretion and hepatic/muscular glycogen deposition."}
            ],
            "mechanism": {
                "summary": "Dietary potassium is passively absorbed in the upper small intestine (~90% bioavailability). Regulated tightly by renal cortical collecting duct principal cells via aldosterone and ROMK channels. Na+/K+-ATPase pumps actively partition 98% of total body potassium inside cells.",
                "steps": [
                    {"stage": "Intestinal Absorption", "detail": "Absorbed passively and rapidly via non-saturable paracellular transport across the duodenal and jejunal mucosa."},
                    {"stage": "Cellular Uptake (Insulin & Beta-2 Adrenergic)", "detail": "Postprandial insulin release and beta-2 adrenergic tone stimulate cellular Na+/K+-ATPase activity, buffering extracellular surges by driving K+ into myocytes and hepatocytes."},
                    {"stage": "Renal Homeostatic Excretion", "detail": "90% excreted by the kidneys via ROMK (Kir1.1) and BK channels in the cortical collecting duct, modulated directly by plasma aldosterone levels."},
                    {"stage": "Vascular Hyperpolarization", "detail": "Activates inward-rectifier potassium (Kir) channels and Na+/K+ pumps in endothelial and vascular smooth muscle cells, inducing vasodilation."}
                ]
            },
            "uses": {
                "strong": ["Reducing systolic and diastolic blood pressure in hypertensive individuals (average -5.3 / -3.1 mmHg)", "Reducing ischemic stroke risk by up to 21% with higher dietary intakes", "Preventing calcium oxalate kidney stone formation (via urinary citrate alkalinization with potassium citrate)"],
                "moderate": ["Alleviating exercise-induced and nocturnal skeletal muscle cramps", "Preserving bone mineral density by buffering dietary acid load"],
                "emerging": ["Improving insulin sensitivity and glucose tolerance in individuals with marginal hypokalemia"],
                "insufficient": ["Replacing emergency medical treatments for cardiac arrhythmias or renal failure"]
            },
            "deficiency": {
                "causes": ["High dietary sodium with low whole-food fruit and vegetable intake", "Use of potassium-wasting loop or thiazide diuretics without replenishment", "Excessive gastrointestinal fluid loss (vomiting, chronic diarrhea, laxative abuse)", "Heavy prolonged sweating in hot environments without electrolyte repletion"],
                "effects": ["Hypokalemia (<3.5 mEq/L) leading to muscle weakness, fasciculations, and paralytic ileus", "Cardiac arrhythmias, flattened T-waves, ST depression, and prominent U-waves on ECG", "Elevated systemic blood pressure and blunted endothelium-mediated vasodilation"],
                "symptoms": ["Muscle cramps, twitching & weakness", "Fatigue & persistent lethargy", "Constipation & abdominal bloating", "Heart palpitations or skipped beats"],
                "symptoms_note": "Early marginal potassium insufficiency causes elevated blood pressure and muscle cramping before overt serum hypokalemia manifests.",
                "timeline": "Inadequate dietary intake over several weeks depletes intracellular stores, although serum levels are maintained until tissue depletion is significant."
            },
            "food_sources": [
                {"food": "Baked Potato (with skin)", "amount": "1 large (299 g)", "content": "1,081 mg", "bioavailability": "high", "serving": "1 potato", "type": "plant"},
                {"food": "Avocado (Whole)", "amount": "1 medium (200 g)", "content": "975 mg", "bioavailability": "high", "serving": "1 avocado", "type": "plant"},
                {"food": "Cooked Spinach", "amount": "1 cup (180 g)", "content": "839 mg", "bioavailability": "high", "serving": "1 cup", "type": "plant"},
                {"food": "Wild Salmon (Cooked)", "amount": "1 fillet (150 g)", "content": "730 mg", "bioavailability": "high", "serving": "1 fillet", "type": "animal"},
                {"food": "Coconut Water (100% Pure)", "amount": "1 cup (240 ml)", "content": "600 mg", "bioavailability": "high", "serving": "1 glass", "type": "plant"},
                {"food": "Banana", "amount": "1 medium (118 g)", "content": "422 mg", "bioavailability": "high", "serving": "1 fruit", "type": "plant"}
            ],
            "absorption": {
                "increases": ["Hydration and normal gastric emptying rate", "Consuming whole-food plant matrices with organic anions (citrate, malate)"],
                "decreases": ["Excessive alcohol consumption", "Severe hypomagnesemia (magnesium deficiency impairs renal potassium retention by disabling ROMK channel closure)"],
                "forms": [
                    "Potassium Citrate: Highly bioavailable, systemic alkalinizing agent, ideal for kidney stone prevention",
                    "Potassium Chloride: Standard clinical electrolyte replacement salt",
                    "Potassium Bicarbonate: Buffers dietary acidity and metabolic acid loads",
                    "Dietary Potassium: Naturally complexed with phytonutrients and dietary fiber"
                ],
                "notes": "Always correct Magnesium deficiency before attempting to treat stubborn low Potassium, as low Magnesium causes renal K+ wasting."
            },
            "requirements": {
                "rda": "3,400 mg/day (Men), 2,600 mg/day (Women) — Optimal Longevity Target: 3,500-4,700 mg/day",
                "groups": [
                    {"group": "Adult Men", "amount": "3,400 mg/day"},
                    {"group": "Adult Women", "amount": "2,600 mg/day"},
                    {"group": "Pregnancy", "amount": "2,900 mg/day"},
                    {"group": "Lactation", "amount": "2,800 mg/day"}
                ],
                "ul": "No UL established for healthy individuals consuming food; supplements are regulated due to hyperkalemia risk.",
                "note": "Healthy kidneys rapidly excrete excess dietary potassium. The 99mg FDA supplement cap exists to protect against localized small-bowel ulceration from concentrated capsules."
            },
            "supplementation": {
                "who_might": ["Individuals on potassium-wasting diuretics under physician supervision", "Endurance athletes with heavy sweat losses in hot climates", "People with recurrent calcium oxalate kidney stones (Potassium Citrate)"],
                "who_probably_not":["Patients with Chronic Kidney Disease (CKD) or acute renal failure (high hyperkalemia risk)", "Individuals taking ACE inhibitors, ARBs, or potassium-sparing diuretics (Spironolactone) without clinical monitoring"],
                "forms": ["Potassium Citrate Powder", "Electrolyte Hydration Drink Mixes", "Low-Sodium Salt Substitutes (KCl)"],
                "typical_amounts": "Obtain primarily through food (3,000-4,000mg); supplemental powders provide 200-500mg per serving in diluted fluids",
                "timing": "Divided across the day with meals and fluid intake",
                "with_food": "Must take dissolved in substantial water or with whole meals to prevent GI irritation",
                "duration": "Continuous through healthy dietary patterns",
                "cycling": "No cycling required for dietary potassium."
            },
            "safety": {
                "level": "yellow",
                "upper_limit": "Food: No upper limit for healthy kidneys. Supplements: Use caution above 1,000mg supplemental per day.",
                "toxicity": "Hyperkalemia (>5.5 mEq/L) can cause life-threatening cardiac conduction blocks, peaked T-waves, ventricular fibrillation, and cardiac arrest.",
                "overdose": "Paresthesias, extreme muscular flaccidity, severe bradycardia, mental confusion, and cardiovascular collapse.",
                "drug_interactions": ["ACE Inhibitors & ARBs (Lisinopril, Losartan): Elevate serum potassium", "Potassium-sparing diuretics (Spironolactone, Amiloride): Substantially increase hyperkalemia risk", "NSAIDs: Decrease renal prostaglandins and reduce K+ clearance"],
                "contraindications": ["Chronic Kidney Disease (Stages 3b-5)", "Untreated Addison's disease (hypoaldosteronism)", "Hyperkalemic periodic paralysis"],
                "special_populations": ["Individuals with impaired renal filtration (eGFR <45) must strictly limit dietary and supplemental potassium under nephrologist guidance."]
            },
            "interactions": [
                {"substance": "Sodium", "interaction": "Physiological Antagonist", "mechanism": "Potassium promotes natriuresis and restores balanced fluid pressure dynamics.", "importance": "high"},
                {"substance": "Magnesium", "interaction": "Obligatory Synergy", "mechanism": "Intracellular magnesium is required to inhibit the ROMK channel and prevent renal potassium wasting.", "importance": "high"},
                {"substance": "ACE Inhibitors", "interaction": "Monitor", "mechanism": "Reduced aldosterone production decreases renal potassium excretion.", "importance": "high"}
            ],
            "timing": {
                "matters": True,
                "detail": "Distribute intake evenly across breakfast, lunch, and dinner rather than a single concentrated bolus."
            },
            "performance": {
                "muscle": "Essential for neuromuscular action potentials and preventing involuntary muscle cramps.",
                "strength": "Supports maximum voluntary isometric contraction and force generation in skeletal muscle fibers.",
                "fat_loss": "Potassium-rich whole foods displace calorically dense ultra-processed sodium-laden foods.",
                "recovery": "Facilitates post-workout muscle glycogen resynthesis and restores intracellular hydration balance.",
                "athletic": "Maintains cardiac stroke volume and neuromuscular responsiveness during extended endurance events.",
                "energy": "Drives the Na+/K+-ATPase pumps that utilize ~30% of total basal cellular ATP energy.",
                "sleep": "Supports nocturnal blood pressure dipping and decreases nighttime awakenings from muscle cramps.",
                "cognitive": "Maintains neuronal resting potentials and cerebral microvascular perfusion.",
                "hormones": "Required for normal stimulus-secretion coupling of insulin from pancreatic beta cells.",
                "metabolic": "Improves insulin sensitivity and reduces cardiovascular arterial stiffness."
            },
            "biomarkers": [
                {"marker": "Serum Potassium", "measures": "Extracellular potassium concentration", "matters": "Reference range 3.5-5.0 mEq/L; values <3.5 (hypokalemia) or >5.2 (hyperkalemia) require clinical attention", "limitations": "Represents <2% of total body potassium stores; easily falsely elevated by hemolyzed blood draws", "when": "Basic and Comprehensive Metabolic Panels (BMP/CMP)"},
                {"marker": "24-Hour Urine Potassium", "measures": "Daily renal potassium excretion", "matters": "Gold-standard objective assessment of true dietary potassium intake and renal handling", "limitations": "Requires complete 24-hour collection", "when": "Investigating refractory hypertension or unexplained hypokalemia"},
                {"marker": "Sodium-to-Potassium Ratio", "measures": "Urinary or dietary balance of Na+ to K+", "matters": "Optimal urinary ratio is <1.0 for cardiovascular protection and blood pressure regulation", "limitations": "Calculated from dietary logs or spot/24-hr urine tests", "when": "Cardiovascular risk optimization"}
            ],
            "myths": [
                {"myth": "Bananas are the highest potassium food on earth.", "fact": "A medium banana has ~422mg potassium. Baked potatoes (1,081mg), avocados (975mg), and cooked spinach (839mg) provide more than double the potassium of a banana per serving."},
                {"myth": "Taking potassium pills is the best way to get enough potassium.", "fact": "Because pills are capped at 99mg by law, getting your 3,500-4,700mg goal from whole foods (potatoes, lentils, avocados, salmon, spinach) is vastly superior and safer."}
            ],
            "mistakes": [
                "Trying to swallow 30 potassium 99mg pills instead of eating a baked potato and an avocado",
                "Taking high-dose potassium supplements while on blood pressure medications like Lisinopril or Losartan",
                "Ignoring magnesium status when attempting to fix chronic muscle cramps or low potassium",
                "Boiling vegetables in excess water and discarding the broth (leaches up to 50% of the potassium into the water)"
            ],
            "if_low": [
                "Incorporate high-potassium whole foods daily: baked potatoes with skin, avocados, cooked leafy greens, and coconut water",
                "Steam or roast vegetables rather than boiling them to retain water-soluble potassium in the food matrix",
                "Check serum magnesium levels to ensure renal K+ retention mechanisms are functioning properly",
                "Gradually increase whole-food plant intake to achieve the optimal >3,500mg daily longevity target"
            ],
            "if_too_much": {
                "acute": "Severe gastrointestinal nausea, abdominal cramping, and diarrhea from concentrated salts.",
                "chronic": "Hyperkalemia with cardiac conduction delays, bradycardia, muscle flaccidity, and ventricular arrhythmias.",
                "mechanism": "Depolarizes resting membrane potential, leading to inactivation of cardiac sodium channels and impaired conduction.",
                "signs": "Tingling in extremities (paresthesias), sudden muscle weakness, slow irregular pulse, dizziness.",
                "when_medical": "Seek immediate emergency medical care (ER) if experiencing palpitations accompanied by sudden muscle weakness or dizziness."
            },
            "research": [
                {
                    "title": "Effect of Increased Potassium Intake on Cardiovascular Risk Factors and Disease: Systematic Review and Meta-Analysis",
                    "year": "2013",
                    "study_type": "Cochrane Systematic Review & Meta-Analysis of 33 RCTs",
                    "evidence_level": "strong",
                    "summary": "Increased potassium intake (90-120 mmol/day) significantly reduced systolic blood pressure by 3.49 mmHg and lowered risk of incident stroke by 24% in adults.",
                    "source": "British Medical Journal (BMJ)",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/23558164/"
                },
                {
                    "title": "Sodium and Potassium Intake and the Risk of Cardiovascular Disease: A Prospective Cohort Study (NEJM)",
                    "year": "2014",
                    "study_type": "Prospective Cohort (n=101,945)",
                    "evidence_level": "strong",
                    "summary": "Demonstrated that higher potassium excretion (>2.5g/day) was associated with a significantly reduced risk of death and major cardiovascular events.",
                    "source": "New England Journal of Medicine (NEJM)",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/25119607/"
                }
            ]
        }
    },
    # -----------------------------------------------------------------
    # ASHWAGANDHA
    # -----------------------------------------------------------------
    "ashwagandha": {
        "subject": "Ashwagandha (Withania somnifera)",
        "category": "Adaptogens & Botanicals",
        "query_type": "supplement",
        "one_liner": "A premier Ayurvedic adaptogen rich in bioactive withanolides that modulates the hypothalamic-pituitary-adrenal (HPA) axis, attenuates serum cortisol, and enhances GABAergic signaling.",
        "science_score": 93,
        "science_score_rationale": "Validated by dozens of randomized double-blind placebo-controlled trials examining serum cortisol reduction, sleep latency, and muscular strength adaptations.",
        "safety_level": "green",
        "quick_answer": "Ashwagandha (Withania somnifera) is an Ayurvedic adaptogen standardized for bioactive withanolides (notably withaferin A and withanolide A). It downregulates chronic HPA axis hyperactivation, lowering morning and salivary cortisol by 20-30%, enhances central GABA-A receptor agonism to improve restorative slow-wave sleep, and supports physical power output and endogenous testosterone synthesis in stressed adults.",
        "followups": [
            "What is the difference between KSM-66, Sensoril, and Shoden extracts?",
            "What is the optimal daily timing: morning or evening?",
            "Does Ashwagandha affect thyroid hormone levels (TSH / T3 / T4)?",
            "How long can you take Ashwagandha before needing to cycle off?"
        ],
        "sections": {
            "what_is_it": {
                "beginner": "Ashwagandha is a natural herbal root extract known as an adaptogen. It helps your body handle stress, lowers anxiety, promotes deep restful sleep, and supports physical strength and recovery.",
                "advanced": "Ashwagandha is an adaptogenic botanical containing steroidal lactones known as withanolides (withaferin A, withanolide D, withanosides). These compounds exert neuroprotective, anxiolytic, and anti-inflammatory effects by modulating HPA axis endocrine signaling, mimicking GABA neurotransmission, and upregulating antioxidant enzyme expression (SOD, catalase, glutathione peroxidase)."
            },
            "why_important": [
                {"title": "HPA Axis Regulation & Cortisol Attenuation", "evidence": "strong", "detail": "Blunts corticotropin-releasing hormone (CRH) hypersecretion, resulting in a statistically significant 23-30% reduction in serum cortisol in chronically stressed individuals."},
                {"title": "GABA-Mimetic Anxiolysis & Sleep Quality", "evidence": "strong", "detail": "Interacts with GABA-A receptors to decrease central nervous system hyperarousal, decreasing sleep onset latency and increasing non-REM slow-wave sleep duration."},
                {"title": "Strength & Muscle Adaptation (Ergogenic)", "evidence": "strong", "detail": "RCTs demonstrate significant increases in 1RM bench press and leg extension, accelerated post-exercise recovery, and reduction in exercise-induced muscle damage (CK)."},
                {"title": "Endocrine & Testosterone Support", "evidence": "moderate", "detail": "Restores optimal Leydig cell function and lowers oxidative stress in testicular tissue, improving free testosterone in stressed and resistance-trained males."}
            ],
            "affects": [
                {"system": "Brain & Nervous System", "level": "primary", "detail": "GABAergic modulation reduces psychological anxiety and supports cognitive resilience under acute stress."},
                {"system": "Hormones & Endocrine", "level": "primary", "detail": "Lowers chronic cortisol, supports thyroid peroxidase activity (increases T3/T4 conversion), and optimizes testosterone."},
                {"system": "Muscles & Recovery", "level": "primary", "detail": "Reduces serum creatine kinase post-workout and enhances muscular force generation."},
                {"system": "Immune System & Inflammation", "level": "secondary", "detail": "Downregulates nuclear factor kappa B (NF-kB) and pro-inflammatory cytokines (IL-6, TNF-alpha)."}
            ],
            "mechanism": {
                "summary": "Withanolides cross the blood-brain barrier to bind GABA-A receptor sites and attenuate hypothalamic CRH release. Systemically, they suppress glucocorticoid receptor hypersensitivity, reduce systemic oxidative stress, and stimulate thyroid hormone synthesis.",
                "steps": [
                    {"stage": "Intestinal Absorption", "detail": "Lipophilic withanolides and withanosides are absorbed in the small intestine; bioavailability increases when ingested with dietary lipids."},
                    {"stage": "HPA Axis Calming", "detail": "Suppresses hypothalamic CRH and pituitary ACTH release, dampening adrenal gland cortisol synthesis."},
                    {"stage": "GABA-A Receptor Potentiation", "detail": "Acts as an allosteric modulator on central GABAergic pathways, promoting parasympathetic nervous system tone."},
                    {"stage": "Antioxidant Upregulation", "detail": "Upregulates Nrf2 pathway, increasing endogenous SOD and catalase to neutralize lipid peroxidation in neural and muscular tissues."}
                ]
            },
            "uses": {
                "strong": ["Reducing chronic stress, perceived anxiety, and elevated serum cortisol", "Improving sleep quality and reducing sleep onset latency in insomnia", "Enhancing muscle strength, power output, and post-exercise recovery in resistance-trained adults"],
                "moderate": ["Supporting endogenous testosterone and sperm motility in stressed men", "Improving cardiorespiratory endurance (VO2 max) in athletes"],
                "emerging": ["Enhancing cognitive focus, processing speed, and executive function"],
                "insufficient": ["Replacing clinical psychiatric medications without physician consultation"]
            },
            "deficiency": {
                "causes": ["Not an essential micronutrient; no physiological deficiency state exists."],
                "effects": ["N/A (Botanical adaptogen)"],
                "symptoms": ["Chronic high stress, nervous exhaustion, and elevated cortisol are indications for use."],
                "symptoms_note": "Best utilized when allostatic stress load or sleep disturbances are present.",
                "timeline": "Clinical trials demonstrate measurable cortisol reduction within 30 to 60 days of daily supplementation."
            },
            "food_sources": [
                {"food": "KSM-66 Root Extract (Standardized 5% Withanolides)", "amount": "300-600 mg", "content": "Full-Spectrum Root", "bioavailability": "high", "serving": "1-2 capsules", "type": "plant"},
                {"food": "Sensoril Extract (Standardized 10% Withanolides)", "amount": "125-250 mg", "content": "Root + Leaf Extract", "bioavailability": "high", "serving": "1 capsule", "type": "plant"},
                {"food": "Traditional Ashwagandha Churna (Raw Root Powder)", "amount": "3,000-5,000 mg", "content": "Unstandardized Root", "bioavailability": "moderate", "serving": "1 tsp in warm milk", "type": "plant"}
            ],
            "absorption": {
                "increases": ["Taking with a meal containing dietary fats or whole milk (withanolides are fat-soluble)", "Consistent daily dosing for at least 4-8 weeks"],
                "decreases": ["Taking on an empty stomach (may cause mild nausea in sensitive individuals)"],
                "forms": [
                    "KSM-66: Standardized to 5% withanolides; highest volume of human RCTs for stress, strength, and testosterone",
                    "Sensoril: Standardized to 10% withanolides; higher withaferin A, more sedating, ideal for evening sleep",
                    "Shoden: Highly concentrated (35% withanolide glycosides); potent micro-dose (120-240mg)"
                ],
                "notes": "Look for standardized root-only extracts to minimize withaferin A cytotoxic leaf fractions."
            },
            "requirements": {
                "rda": "No RDA established (herbal adaptogen)",
                "groups": [
                    {"group": "General Stress Management", "amount": "300-600 mg/day (standardized root)"},
                    {"group": "Athletic & Strength Recovery", "amount": "600 mg/day (divided into 300mg doses)"}
                ],
                "ul": "1,000 mg/day of standardized extract",
                "note": "Stick to clinically validated dosages (300-600mg KSM-66 or 125-250mg Sensoril)."
            },
            "supplementation": {
                "who_might": ["Individuals experiencing high work/life stress or elevated cortisol", "Athletes looking to optimize recovery and hormone balance", "People with poor sleep quality or elevated nighttime nervous arousal"],
                "who_probably_not": ["Individuals with hyperthyroidism / Graves' disease (Ashwagandha can stimulate thyroid hormones)", "Pregnant or nursing women", "Patients with autoimmune conditions (Lupus, Rheumatoid Arthritis, MS) without MD guidance"],
                "forms": ["Standardized Capsules", "Liquid Tinctures", "Functional Powders"],
                "typical_amounts": "300-600 mg daily of standardized root extract",
                "timing": "Morning with breakfast (for daytime anxiety) or 1-2 hours before bed (for sleep support)",
                "with_food": "Best taken with a meal containing healthy fats",
                "duration": "8 to 12 weeks",
                "cycling": "Consider cycling (e.g., 8-12 weeks on, 2-4 weeks off) to maintain receptor sensitivity."
            },
            "safety": {
                "level": "green",
                "upper_limit": "1,000 mg/day of concentrated extract",
                "toxicity": "Low toxicity profile. Rare cases of idiosyncratic liver injury reported with unverified multi-herb preparations.",
                "overdose": "Gastrointestinal upset, diarrhea, nausea, and excessive sedation.",
                "drug_interactions": ["Thyroid hormone medications (Synthroid/Levothyroxine): May cause additive thyroid elevation", "Sedatives / Benzodiazepines: Additive central nervous system depression", "Immunosuppressants: May counteract medication due to immune-stimulating effects"],
                "contraindications": ["Hyperthyroidism", "Pregnancy (abortifacient risk at very high doses in traditional texts)", "Severe acute liver disease"],
                "special_populations": ["Check thyroid panels (TSH, free T3, free T4) periodically during long-term use."]
            },
            "interactions": [
                {"substance": "L-Theanine", "interaction": "Synergistic", "mechanism": "Enhances alpha brain waves and calm focus while keeping cortisol low.", "importance": "high"},
                {"substance": "Magnesium Glycinate", "interaction": "Synergistic", "mechanism": "Dual GABA-A receptor activation and NMDA antagonism for deep restorative sleep.", "importance": "high"},
                {"substance": "Levothyroxine", "interaction": "Monitor", "mechanism": "Ashwagandha may stimulate endogenous T3/T4, requiring medication dose adjustments.", "importance": "high"}
            ],
            "timing": {
                "matters": True,
                "detail": "For sleep improvement, take 300-600mg in the evening with dinner. For daytime stress and cortisol control, take in the morning with food."
            },
            "performance": {
                "muscle": "Promotes muscle hypertrophy and accelerates myofibrillar protein synthesis by blunting cortisol-mediated catabolism.",
                "strength": "Significant increases in maximal bench press and squat force production in resistance-trained cohorts.",
                "fat_loss": "Reduces stress-related emotional overeating and abdominal visceral fat accumulation driven by elevated cortisol.",
                "recovery": "Decreases post-exercise serum creatine kinase and muscle soreness, allowing faster training frequency.",
                "athletic": "Improves VO2 max and time to exhaustion in healthy endurance athletes.",
                "energy": "Prevents chronic adrenal exhaustion and allostatic fatigue without stimulant crashes.",
                "sleep": "Improves sleep efficiency, non-REM deep sleep stages, and overall sleep score.",
                "cognitive": "Enhances attention span, reaction time, and working memory performance under stress.",
                "hormones": "Supports healthy LH and free testosterone while suppressing excessive cortisol.",
                "metabolic": "Promotes healthy fasting blood glucose and lipid profiles in individuals with metabolic stress."
            },
            "biomarkers": [
                {"marker": "Serum Cortisol (Morning 8 AM)", "measures": "Peak circadian glucocorticoid output", "matters": "Identifies elevated baseline stress and HPA axis hyperactivation", "limitations": "Subject to acute episodic stress surges", "when": "Baseline and 60-day follow-up"},
                {"marker": "Total & Free Testosterone", "measures": "Circulating androgen status", "matters": "Validates hormonal recovery in chronically fatigued or overtrained individuals", "limitations": "Diurnal rhythm requires early morning draw", "when": "Endocrine checkups in men"},
                {"marker": "TSH, Free T3, Free T4", "measures": "Thyroid gland regulatory status", "matters": "Monitors potential thyroid-stimulating activity of withanolides", "limitations": "Individual setpoints vary", "when": "Thyroid screenings"}
            ],
            "myths": [
                {"myth": "Ashwagandha acts like a sedative drug and will knock you out immediately.", "fact": "Ashwagandha is an adaptogen that modulates baseline stress over 2-6 weeks; it provides calm stability rather than acute narcotic sedation."},
                {"myth": "Ashwagandha causes emotional blunting (anhedonia) in everyone.", "fact": "Anhedonia is rare and typically occurs only with excessively high doses or prolonged use without breaks. Cycling 8 weeks on, 2 weeks off prevents receptor desensitization."}
            ],
            "mistakes": [
                "Taking unstandardized cheap leaf powder instead of clinically validated root extract (e.g. KSM-66)",
                "Taking Ashwagandha on an empty stomach and experiencing avoidable nausea",
                "Expecting instant 10-minute results instead of allowing 4 to 8 weeks for HPA axis reset",
                "Taking high doses while having undiagnosed hyperthyroidism"
            ],
            "if_low": [
                "Establish consistent sleep-wake timing and morning natural sunlight exposure to anchor the circadian cortisol rhythm",
                "Incorporate standardized Ashwagandha root extract (300-600mg/day) with meals for 8 to 12 weeks",
                "Pair with Magnesium Glycinate and deep diaphragmatic breathing for synergistic nervous system downregulation"
            ],
            "if_too_much": {
                "acute": "Nausea, gastrointestinal cramps, loose stools, or mild daytime drowsiness.",
                "chronic": "Potential mild thyroid hormone elevation or emotional flattening in susceptible individuals.",
                "mechanism": "Excessive GABAergic modulation or thyroid gland stimulation.",
                "signs": "Subtle emotional detachment, heat intolerance, or gastrointestinal discomfort.",
                "when_medical": "Discontinue use if jaundice, dark urine, or significant gastrointestinal pain occurs."
            },
            "research": [
                {
                    "title": "A Prospective, Randomized Double-Blind, Placebo-Controlled Study of Safety and Efficacy of High-Concentration Full-Spectrum Extract of Ashwagandha Root in Reducing Stress and Anxiety in Adults",
                    "year": "2012",
                    "study_type": "Randomized Double-Blind Placebo-Controlled Trial (RCT)",
                    "evidence_level": "strong",
                    "summary": "Demonstrated a 27.9% reduction in serum cortisol and a 44% reduction in perceived stress scores over 60 days with 600mg/day KSM-66.",
                    "source": "Indian Journal of Psychological Medicine",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/23439798/"
                },
                {
                    "title": "Examining the Effect of Withania somnifera Supplementation on Muscle Strength and Recovery: A Randomized Controlled Trial",
                    "year": "2015",
                    "study_type": "Randomized Controlled Trial (n=57)",
                    "evidence_level": "strong",
                    "summary": "Subjects receiving 600mg/day Ashwagandha had significantly greater increases in muscle strength on bench press and leg extension, accompanied by greater muscle size and significantly lower exercise-induced muscle damage.",
                    "source": "Journal of the International Society of Sports Nutrition (JISSN)",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/26609282/"
                }
            ]
        }
    }
}

def get_topic_profile(query: str) -> Optional[Dict[str, Any]]:
    """Look up a deeply accurate, scientifically verified profile by query string with fuzzy normalization."""
    if not query:
        return None
    q = query.strip().lower()
    
    # Normalize common abbreviations and typos
    q_norm = re.sub(r'\bvitm?\b|\bvitamins?\b', 'vitamin', q)
    q_norm = re.sub(r'\bmag\b', 'magnesium', q_norm)
    q_norm = re.sub(r'\bcalc\b', 'calcium', q_norm)
    q_norm = re.sub(r'\bpotass\b|\bpotasium\b|\bpotas\b', 'potassium', q_norm)
    q_norm = re.sub(r'\bashwa\b|\bashwaganda\b|\bashwaganha\b', 'ashwagandha', q_norm)
    q_norm = re.sub(r'[\s\-_]+', ' ', q_norm).strip()
    
    # 1. Direct and Alias Mappings
    if "magnesium" in q_norm or "mg2" in q_norm:
        return TOPIC_PROFILES.get("magnesium")
    elif "iron" in q_norm or "ferritin" in q_norm or "heme" in q_norm:
        return TOPIC_PROFILES.get("iron")
    elif "vitamin d" in q_norm or "d3" in q_norm or "cholecalciferol" in q_norm or "25(oh)d" in q_norm:
        return TOPIC_PROFILES.get("vitamin_d")
    elif "vitamin c" in q_norm or "ascorbic" in q_norm or "ascorbate" in q_norm:
        return TOPIC_PROFILES.get("vitamin_c")
    elif "vitamin a" in q_norm or "retinol" in q_norm or "carotenoid" in q_norm or "beta carotene" in q_norm:
        return TOPIC_PROFILES.get("vitamin_a")
    elif "vitamin b12" in q_norm or "b12" in q_norm or "cobalamin" in q_norm or "methylcobalamin" in q_norm:
        return TOPIC_PROFILES.get("vitamin_b12")
    elif "zinc" in q_norm or "picolinate" in q_norm:
        return TOPIC_PROFILES.get("zinc")
    elif "creatine" in q_norm or "monohydrate" in q_norm:
        return TOPIC_PROFILES.get("creatine")
    elif "ashwagandha" in q_norm or "ksm-66" in q_norm or "withania" in q_norm:
        return TOPIC_PROFILES.get("ashwagandha")
    elif "omega" in q_norm or "fish oil" in q_norm or re.search(r'\b(epa|dha|krill)\b', q_norm):
        return TOPIC_PROFILES.get("omega_3")
    elif "potassium" in q_norm or "k+" in q_norm:
        return TOPIC_PROFILES.get("potassium")
    elif "calcium" in q_norm:
        return TOPIC_PROFILES.get("calcium")
    elif "theanine" in q_norm or "l-theanine" in q_norm:
        return TOPIC_PROFILES.get("l_theanine")
    elif "coq10" in q_norm or "ubiquinol" in q_norm or "ubiquinone" in q_norm or "coenzyme q" in q_norm:
        return TOPIC_PROFILES.get("coq10")
    elif "selenium" in q_norm or "selenomethionine" in q_norm:
        return TOPIC_PROFILES.get("selenium")
    elif "iodine" in q_norm or "iodide" in q_norm or "kelp" in q_norm:
        return TOPIC_PROFILES.get("iodine")
    elif "boron" in q_norm:
        return TOPIC_PROFILES.get("boron")
    elif "growth hormone" in q_norm or "hgh" in q_norm or "somatotropin" in q_norm:
        return TOPIC_PROFILES.get("growth_hormone")
    
    # 2. Check for direct key match in TOPIC_PROFILES
    for key, profile in TOPIC_PROFILES.items():
        clean_key = key.replace("_", " ")
        if clean_key in q_norm or profile.get("subject", "").lower() in q_norm:
            return profile
            
    return None

try:
    from .kb_expanded import EXPANDED_PROFILES
    TOPIC_PROFILES.update(EXPANDED_PROFILES)
except Exception:
    try:
        from services.kb_expanded import EXPANDED_PROFILES
        TOPIC_PROFILES.update(EXPANDED_PROFILES)
    except Exception:
        pass




