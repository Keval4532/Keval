"""Problem Analysis & Root-Cause Intelligence Engine for KEVALBIO."""
import re
import logging
from typing import List, Dict, Any, Optional

logger = logging.getLogger(__name__)

# Red Flag Medical Emergency Detector
RED_FLAG_PATTERNS = [
    (r"\b(chest\s*pain|angina|heart\s*attack)\b", "Severe chest pain or pressure requires immediate emergency medical evaluation."),
    (r"\b(shortness\s*of\s*breath|breathing\s*difficult|dyspnea|cannot\s*breathe)\b", "Acute breathing difficulty is a critical medical red flag."),
    (r"\b(faint|passed\s*out|loss\s*of\s*consciousness|syncope)\b", "Fainting or loss of consciousness warrants urgent clinical assessment."),
    (r"\b(sudden\s*numbness|slurred\s*speech|paralysis|stroke|facial\s*droop)\b", "Sudden neurological deficits require immediate emergency care."),
    (r"\b(severe\s*bleeding|coughing\s*blood|vomiting\s*blood)\b", "Acute hemorrhage requires immediate hospital attention."),
    (r"\b(overdose|poison|toxic\s*ingestion)\b", "Suspected poisoning or acute overdose requires emergency toxicological intervention.")
]


def check_red_flags(query: str) -> Optional[Dict[str, Any]]:
    """Checks for life-threatening acute symptoms."""
    q_lower = query.lower()
    for pattern, warning in RED_FLAG_PATTERNS:
        if re.search(pattern, q_lower):
            return {
                "is_emergency": True,
                "title": "⚠️ URGENT: Medical Evaluation Required",
                "message": warning,
                "guidance": "KEVALBIO is an educational platform. For acute, sudden, or severe symptoms (such as chest pain, severe dyspnea, or neurological changes), immediately call emergency services or go to the nearest emergency department. Do not rely on dietary or supplement interventions."
            }
    return None


def analyze_problem(
    query: str,
    profile: Optional[Dict[str, Any]] = None,
    region_hint: Optional[str] = None
) -> Dict[str, Any]:
    """Performs end-to-end root cause problem investigation following KEVALBIO's signature flow."""
    q_clean = query.strip()
    q_lower = q_clean.lower()
    
    # 1. Check emergency red flags
    emergency = check_red_flags(q_clean)
    if emergency:
        return {
            "problem": q_clean,
            "emergency": emergency,
            "quick_take": "Your symptom matches clinical criteria requiring urgent medical attention. Lifestyle and nutritional analysis are deferred to immediate safety.",
            "what_not_to_assume": "Do not assume severe or acute chest, respiratory, or neurological symptoms can be resolved with nutrition or supplementation.",
            "action_plan": {
                "today": "Seek immediate medical evaluation at an emergency department or primary care clinic.",
                "this_week": "Follow physician directives and clinical testing recommendations.",
                "next_weeks": "Re-evaluate general nutritional foundations only after medical clearance.",
                "when_doctor": "Immediate emergency care is advised."
            }
        }

    # Extract user profile context
    user_diet = (profile.get("diet") if profile else None) or ""
    user_goal = (profile.get("goal") if profile else None) or ""
    is_veg = "vegetarian" in user_diet.lower() or "vegetarian" in q_lower or "vegan" in user_diet.lower() or "vegan" in q_lower
    is_indian = "india" in (region_hint or "").lower() or "india" in q_lower or "indian" in q_lower

    # Problem Categorization
    is_fatigue = any(w in q_lower for w in ["tired", "fatigue", "exhausted", "low energy", "sleepy", "burnout", "drained", "sluggish"])
    is_cramp = any(w in q_lower for w in ["cramp", "twitch", "spasm", "muscle tight", "charley horse"])
    is_sleep = any(w in q_lower for w in ["sleep", "insomnia", "waking up", "restless", "night"])
    is_weakness = any(w in q_lower for w in ["weak", "strength drop", "low power", "workout fatigue", "struggling"])
    is_weight = any(w in q_lower for w in ["fat loss", "weight loss", "struggling to lose", "belly fat", "metabolism"])

    # Determine Title & Quick Take
    if is_cramp:
        topic_title = "Muscle Cramps & Neuromuscular Irritability"
        quick_take = "Muscle cramps are multifaceted neuromuscular events. While often attributed to electrolytes or hydration, exercise-induced muscular fatigue, altered motor neuron excitability, and training load spikes are equally frequent drivers."
    elif is_sleep:
        topic_title = "Sleep Architecture & Circadian Disruption"
        quick_take = "Poor sleep quality typically arises from circadian misalignment, autonomic nervous system hyper-arousal, environmental factors (light, temperature), and evening metabolic disruptions."
    elif is_weakness:
        topic_title = "Exercise Performance & Muscular Energetics"
        quick_take = "Feeling weak during workouts is commonly linked to glycogen depletion, insufficient pre-training hydration, inadequate sleep recovery, or excessive cumulative volume exceeding adaptive capacity."
    elif is_weight:
        topic_title = "Metabolic Regulation & Energy Balance"
        quick_take = "Fat loss plateaus involve metabolic adaptation, unmeasured caloric intake, reduced non-exercise activity thermogenesis (NEAT), sleep debt, and endocrine fluid shifts."
    else:  # Default to Fatigue / General Problem
        topic_title = "Persistent Fatigue & Suboptimal Vitality"
        quick_take = "Fatigue is one of the most common non-specific physiological complaints. Rather than pointing to a single deficiency, it usually reflects cumulative deficits across sleep architecture, caloric/iron availability, allostatic stress, and cellular bioenergetics."

    # 1. 9-Category Root Cause Breakdown
    root_causes = [
        {
            "category": "Sleep & Recovery",
            "likelihood": "more_likely",
            "findings": "Sleep debt (<7 hours) or fragmented slow-wave sleep impairs cellular ATP regeneration and neuro-endocrine restoration.",
            "remedy": "Anchor consistent wake-up times and eliminate blue spectrum light 90 minutes before bed."
        },
        {
            "category": "Nutrition & Energy Intake",
            "likelihood": "more_likely",
            "findings": "Chronic under-eating relative to activity level or erratic meal timing causes reactive blood glucose dips and systemic fatigue.",
            "remedy": "Ensure adequate caloric baseline with 1.6-2.2g protein/kg and complex carbohydrates timed around physical exertion."
        },
        {
            "category": "Hydration & Electrolytes",
            "likelihood": "possible",
            "findings": "Even mild 1-2% hypohydration reduces cardiac stroke volume, elevates perceived exertion, and increases muscle cramp susceptibility.",
            "remedy": "Consume 500ml water upon waking with balanced sodium/potassium intake throughout training."
        },
        {
            "category": "Training & Cumulative Fatigue",
            "likelihood": "possible",
            "findings": "Spikes in training volume or lack of scheduled deload weeks lead to central nervous system fatigue.",
            "remedy": "Track session RPE and ensure at least 1-2 full rest or active recovery days weekly."
        },
        {
            "category": "Stress & Allostatic Load",
            "likelihood": "possible",
            "findings": "Elevated sympathetic nervous system tone and cortisol dysregulation disrupt metabolic flexibility and deep recovery.",
            "remedy": "Practice 5 minutes of physiological sigh breathwork daily and prioritize outdoor exposure."
        },
        {
            "category": "Micronutrients & Potential Gaps",
            "likelihood": "possible",
            "findings": "Suboptimal intake of key co-factors (Iron, B12, Magnesium, Vitamin D, Zinc) can impair mitochondrial cellular respiration.",
            "remedy": "Audit whole-food dietary density before considering targeted supplements."
        },
        {
            "category": "Medications & Current Supplements",
            "likelihood": "less_likely",
            "findings": "Certain medications (e.g. diuretics, statins, antihistamines) or excessive caffeine timing can perturb energy and electrolytes.",
            "remedy": "Review timing of caffeine (cut off 8-10 hours prior to sleep) and discuss medications with a pharmacist."
        },
        {
            "category": "Medical & Clinical Factors",
            "likelihood": "rule_out",
            "findings": "Occult anemia, thyroid dysfunction (hypothyroidism), post-viral fatigue, or sleep apnea require clinical laboratory ruling out.",
            "remedy": "Request standard annual lab panel (CBC, CMP, Ferritin, TSH, Vitamin D) from a physician."
        },
        {
            "category": "Environmental & Circadian Factors",
            "likelihood": "less_likely",
            "findings": "Inadequate morning sunlight exposure and excessive evening artificial lighting desynchronize the master suprachiasmatic circadian clock.",
            "remedy": "Get 10-15 minutes of outdoor sunlight within 60 minutes of waking."
        }
    ]

    # 2. Potential Nutritional Gaps (Strictly "Potential Gaps", Never "Deficient")
    if is_cramp:
        nutritional_gaps = [
            {
                "nutrient": "Magnesium",
                "relevance": "high",  # high | possible | unclear
                "why_it_matters": "Crucial co-factor for neuromuscular relaxation and ATP-dependent calcium reuptake in muscle sarcoplasmic reticulum.",
                "problem_connection": "Low dietary magnesium may increase muscle twitching and post-exercise cramping.",
                "evidence_strength": "moderate",
                "food_sources": "Pumpkin seeds, spinach, almonds, black beans, whole grains, lentils.",
                "intake_target": "350 - 420 mg/day",
                "absorption_factors": "Absorption is reduced by high phytate meals; enhanced when taken with protein.",
                "testing_role": "Serum magnesium has limitations (only 1% of body stores); RBC magnesium or dietary recall is preferred.",
                "supplement_status": "Reasonable consideration if dietary intake is consistently low."
            },
            {
                "nutrient": "Potassium & Sodium",
                "relevance": "high",
                "why_it_matters": "Maintain cellular membrane resting potential and electrochemical gradient required for muscle contraction.",
                "problem_connection": "Heavy sweat losses without electrolyte replacement disrupt neuromuscular signaling.",
                "evidence_strength": "strong",
                "food_sources": "Coconut water, potatoes with skin, bananas, lentils, cooked greens, salted meals.",
                "intake_target": "Potassium: 3,400 - 4,700 mg/day; Sodium: matched to sweat rate.",
                "absorption_factors": "Rapidly absorbed in small intestine; requires adequate fluid volume.",
                "testing_role": "Basic Metabolic Panel (BMP) accurately assesses serum electrolytes.",
                "supplement_status": "Food-first electrolyte hydration is safer and more effective than potassium pills."
            },
            {
                "nutrient": "Calcium",
                "relevance": "possible",
                "why_it_matters": "Triggers actin-myosin cross-bridge formation during muscular contraction.",
                "problem_connection": "Altered extracellular ionized calcium can trigger muscle hyperexcitability.",
                "evidence_strength": "moderate",
                "food_sources": "Yogurt, milk, paneer, tofu (calcium-set), fortified plant milks, sesame seeds.",
                "intake_target": "1,000 mg/day",
                "absorption_factors": "Requires adequate vitamin D status for active intestinal absorption.",
                "testing_role": "Serum ionized calcium or total calcium with albumin context.",
                "supplement_status": "Generally obtained through whole foods."
            }
        ]
    else:  # Fatigue / General
        nutritional_gaps = [
            {
                "nutrient": "Iron & Ferritin",
                "relevance": "high",
                "why_it_matters": "Essential for hemoglobin oxygen transport and mitochondrial electron transport chain cytochrome function.",
                "problem_connection": "Low cellular iron impairs cellular oxygen delivery, manifesting as chronic fatigue, low stamina, and brain fog.",
                "evidence_strength": "strong",
                "food_sources": "Lentils, spinach, tofu, chickpeas, pumpkin seeds, chicken liver, lean meats." if not is_veg else "Lentils (dal), chickpeas, spinach/palak, tofu, pumpkin seeds, fortified cereals.",
                "intake_target": "8 - 18 mg/day (higher for menstruating females & plant-based eaters due to non-heme bioavailability).",
                "absorption_factors": "Non-heme iron absorption increases 3-4x when paired with Vitamin C (citrus, bell peppers) and decreases with tea/coffee tannins.",
                "testing_role": "CBC + Serum Ferritin (<30 ng/mL indicates depleted stores). Essential before supplementing.",
                "supplement_status": "Only supplement if lab tests confirm low ferritin, as excess iron is pro-oxidant."
            },
            {
                "nutrient": "Vitamin B12 (Cobalamin)",
                "relevance": "high" if is_veg else "possible",
                "why_it_matters": "Required for red blood cell maturation, DNA synthesis, and neurological myelin maintenance.",
                "problem_connection": "Subclinical B12 insufficiency slows cellular methylation and causes profound lethargy and numbness.",
                "evidence_strength": "strong",
                "food_sources": "Fortified nutritional yeast, dairy, paneer, eggs, fish, meats." if not is_veg else "Dairy, paneer, fortified plant milks, fortified cereals, nutritional yeast.",
                "intake_target": "2.4 mcg/day",
                "absorption_factors": "Requires gastric intrinsic factor and hydrochloric acid for absorption.",
                "testing_role": "Serum B12 + Methylmalonic Acid (MMA) for sensitive tissue-level verification.",
                "supplement_status": "High priority for vegetarians/vegans; methylcobalamin or cyanocobalamin 500-1000mcg."
            },
            {
                "nutrient": "Vitamin D3",
                "relevance": "high",
                "why_it_matters": "Acts as a nuclear secosteroid hormone regulating >1000 genes, neuromuscular power, and immune resilience.",
                "problem_connection": "Low vitamin D levels correlate strongly with daytime somnolence and muscle weakness.",
                "evidence_strength": "strong",
                "food_sources": "Fatty fish (salmon, sardines), egg yolks, fortified dairy/plant milks, sun exposure.",
                "intake_target": "1,000 - 2,000 IU/day baseline (target serum 25(OH)D of 30-50 ng/mL).",
                "absorption_factors": "Fat-soluble; absorbability increases when taken with dietary lipids.",
                "testing_role": "25-hydroxy Vitamin D blood test.",
                "supplement_status": "Frequently necessary for individuals with indoor lifestyles or darker skin pigmentation."
            },
            {
                "nutrient": "Magnesium",
                "relevance": "possible",
                "why_it_matters": "Essential cofactor for ATP production (ATP must bind to a magnesium ion to be biologically active).",
                "problem_connection": "Suboptimal magnesium impairs cellular bioenergetics and neuromuscular relaxation.",
                "evidence_strength": "moderate",
                "food_sources": "Pumpkin seeds, almonds, black beans, spinach, dark chocolate, whole grains.",
                "intake_target": "320 - 420 mg/day",
                "absorption_factors": "Absorbed in small intestine; divided doses improve gastrointestinal tolerance.",
                "testing_role": "Serum/RBC magnesium alongside dietary intake analysis.",
                "supplement_status": "Reasonable if whole-food intake is low; magnesium glycinate 200-400mg in evening."
            }
        ]

    # 3. Food-First Solutions (With Regional & Dietary Awareness)
    if is_indian or (is_veg and "india" in (region_hint or "").lower()):
        food_solutions = [
            {
                "nutrient": "Iron & Bioavailable Folate",
                "best_foods": "Sprouted Moong Dal, Roasted Chana, Palak (Spinach) & Moringa (Drumstick Leaves), Rajma (Kidney Beans), Sesame Seeds (Til)",
                "serving_size": "1 cup cooked dal / 1 cup palak-moringa sabzi / 1 handful roasted chana",
                "nutrient_contribution": "5.0 - 7.5 mg non-heme iron (35-45% daily value)",
                "absorption_tips": "Squeeze fresh lemon juice (Vitamin C) over dal/sabzi to convert ferric Fe3+ to bioavailable ferrous Fe2+. Avoid chai/coffee within 60 minutes of meals.",
                "easy_additions": "Snack on roasted chana; include sprouted moong dal and moringa leaves in daily curries or salads."
            },
            {
                "nutrient": "Magnesium & Micronutrients",
                "best_foods": "Soaked Almonds & Nuts, Pumpkin seeds (Kaddoo ke beej), Whole Wheat / Bajra Roti, Cooked Lentils",
                "serving_size": "2 tablespoons seeds + soaked almonds + 2 Bajra rotis",
                "nutrient_contribution": "190 - 250 mg elemental magnesium (55% daily target)",
                "absorption_tips": "Soak almonds and nuts overnight to reduce phytic acid and improve mineral absorption.",
                "easy_additions": "Eat 5-8 soaked peeled almonds in the morning; sprinkle pumpkin seeds onto curd."
            },
            {
                "nutrient": "Protein & B-Vitamins",
                "best_foods": "Paneer, Soya Chunks, Sattu (Roasted Gram Flour), Curd / Greek Dahi, Moong & Toor Dal",
                "serving_size": "100g paneer / 45g soya chunks / 30g sattu drink / 200g curd",
                "nutrient_contribution": "20 - 28g high-quality bioavailable protein",
                "absorption_tips": "Distribute protein across 3 meals rather than eating all protein at dinner.",
                "easy_additions": "Drink a glass of chilled sattu buttermilk (chaas) or add boiled soya chunks to sabzi for high-protein meals."
            }
        ]
    else:
        food_solutions = [
            {
                "nutrient": "Iron & Cellular Oxygenation",
                "best_foods": "Lentils, Cooked Spinach, Pumpkin Seeds, Grass-fed Beef / Poultry, Tofu, Chickpeas",
                "serving_size": "1 cup cooked lentils or 150g protein source",
                "nutrient_contribution": "4.5 - 7.0 mg iron per serving",
                "absorption_tips": "Pair plant iron with Vitamin C-rich vegetables (bell peppers, broccoli, tomatoes). Avoid tea with meals.",
                "easy_additions": "Toss a handful of baby spinach and pumpkin seeds into your lunch bowl or grain dish."
            },
            {
                "nutrient": "Magnesium & Bioenergetics",
                "best_foods": "Pumpkin Seeds, Dark Leafy Greens, Almonds, Black Beans, Dark Chocolate (85%+), Quinoa",
                "serving_size": "1 oz (30g) pumpkin seeds + 1 cup cooked black beans",
                "nutrient_contribution": "200 - 260 mg magnesium (60% RDA)",
                "absorption_tips": "Whole foods provide magnesium in an organic matrix with synergistic dietary fiber and potassium.",
                "easy_additions": "Keep a jar of roasted pumpkin seeds at your desk for an afternoon snack."
            },
            {
                "nutrient": "Vitamin D & Omega-3 Fatty Acids",
                "best_foods": "Wild Salmon, Sardines, Mackerel, Pastured Egg Yolks, Fortified Dairy or Plant Milks",
                "serving_size": "1 fillet (150g) salmon or 2 whole eggs",
                "nutrient_contribution": "600 - 900 IU Vitamin D + 1,500mg EPA/DHA",
                "absorption_tips": "Consume with dietary fat for optimal intestinal micelle incorporation.",
                "easy_additions": "Include canned sardines or wild salmon twice weekly in salads or grain bowls."
            }
        ]

    # 4. Supplement Consideration & Prioritization
    supplement_priorities = [
        {
            "priority": "Priority 1 (Strong Evidence + High Rationale)",
            "name": "Vitamin D3 + K2",
            "why_this": f"User complaint of {q_clean} indicates potential circadian/indoor recovery deficit. Vitamin D regulates neuromuscular transcription and immune vitality. Pairing with K2 prevents soft-tissue calcium deposition.",
            "form": "Vitamin D3 (Cholecalciferol) with K2 (MK-7)",
            "dosage": "1,000 - 2,000 IU daily (or guided by 25(OH)D blood test)",
            "timing": "Morning or midday with a fat-containing meal",
            "evidence_grade": "strong",
            "caution": "Avoid megadosing (>10,000 IU/day) without periodic serum monitoring."
        },
        {
            "priority": "Priority 2 (Reasonable Consideration)",
            "name": "Magnesium Glycinate or Malate",
            "why_this": "Supports cellular ATP stabilization and neuromuscular relaxation without gastrointestinal distress. Glycinate is optimal for evening relaxation; Malate for daytime muscular energy.",
            "form": "Magnesium Bisglycinate Chelate",
            "dosage": "200 - 300 mg elemental magnesium daily",
            "timing": "1-2 hours before sleep",
            "evidence_grade": "moderate",
            "caution": "Reduce dose if mild loose stools occur."
        },
        {
            "priority": "Priority 2 (Reasonable Consideration)" if is_veg else "Priority 3 (Optional / Contextual)",
            "name": "Vitamin B12 (Active Methylcobalamin)",
            "why_this": "Essential for red blood cell synthesis and neurological methylation, particularly crucial for plant-based eaters who do not consume animal meats.",
            "form": "Methylcobalamin or Hydroxocobalamin sublingual",
            "dosage": "500 - 1,000 mcg 2-3 times weekly",
            "timing": "Morning with breakfast",
            "evidence_grade": "strong",
            "caution": "Very high safety profile; excess is excreted via urine."
        },
        {
            "priority": "Not Recommended (Inappropriate without testing)",
            "name": "High-Dose Oral Iron",
            "why_this": "Fatigue alone does NOT establish iron deficiency. Excess iron is pro-oxidant and can damage cardiovascular and liver tissue. Supplementation should ONLY occur after a documented low ferritin lab result.",
            "form": "N/A",
            "dosage": "Only as prescribed by physician based on blood work",
            "timing": "N/A",
            "evidence_grade": "limited",
            "caution": "Never take high-dose iron empirically without CBC and ferritin confirmation."
        }
    ]

    # 5. Food vs Supplement Comparative Matrix
    food_vs_supplement_rows = [
        {
            "factor": "Magnesium",
            "food_val": "Provides 150-250mg per serving alongside fiber, potassium, zinc, and polyphenols.",
            "supp_val": "Provides 200-400mg isolated elemental magnesium with exact chelation.",
            "absorption": "Food matrix slows transit for steady absorption; supplements offer higher single-bolus bioavailability.",
            "cost_safety": "Food is inherently safe with zero toxicity; high-dose supplements can cause transient laxative effects.",
            "verdict": "Build food foundation first (seeds, greens, beans); supplement in evening if dietary intake falls short."
        },
        {
            "factor": "Iron",
            "food_val": "Heme iron (meat/fish) has 15-35% absorption; non-heme (lentils/spinach) has 2-10% (boosted by Vitamin C).",
            "supp_val": "Provides 25-65mg elemental iron, often causing constipation or nausea.",
            "absorption": "Food provides regulated physiological uptake; supplements bypass certain enterocyte checkpoints.",
            "cost_safety": "Food has virtually zero iron-overload risk; high-dose supplements risk oxidative organ stress.",
            "verdict": "Prioritize iron-rich foods with Vitamin C. Only use supplements under medical supervision with confirmed ferritin deficiency."
        },
        {
            "factor": "Vitamin D",
            "food_val": "Limited in diet (salmon, egg yolks); primarily produced photochemically via sunlight (UVB).",
            "supp_val": "Reliable, standardized D3 (1,000-2,000 IU) providing exact physiological replenishment.",
            "absorption": "Both require dietary fat for optimal intestinal absorption.",
            "cost_safety": "Extremely inexpensive and highly effective; toxicity requires chronic megadoses (>10,000 IU/day).",
            "verdict": "Supplementation or dedicated sun exposure is often practical due to scarce dietary availability."
        }
    ]

    # 6. Biomarkers / What Could Be Worth Checking?
    biomarkers_to_check = [
        {
            "test_name": "Complete Blood Count (CBC) with Differential",
            "measures": "Hemoglobin, Hematocrit, Mean Corpuscular Volume (MCV), and White Blood Cells.",
            "why_it_matters": "Rules out microcytic (iron-deficient) or macrocytic (B12/folate) anemia and hidden chronic infections.",
            "limitations": "Does not detect early depleted iron stores before overt anemia occurs.",
            "influencing_factors": "Hydration status (dehydration artificially concentrates hemoglobin)."
        },
        {
            "test_name": "Serum Ferritin & Iron Saturation Panel",
            "measures": "Intracellular iron storage protein and transferrin saturation percentage.",
            "why_it_matters": "The most sensitive clinical metric for depleted iron stores before functional hemoglobin declines.",
            "limitations": "Acts as an acute-phase reactant (can be falsely elevated during acute infection or inflammation).",
            "influencing_factors": "Recent strenuous exercise, alcohol intake, or systemic inflammation (check hs-CRP alongside)."
        },
        {
            "test_name": "25-Hydroxy Vitamin D (25(OH)D)",
            "measures": "Circulating total vitamin D reserves.",
            "why_it_matters": "Determines whether levels are sufficient (>30 ng/mL) for bone, muscle, and immune health.",
            "limitations": "Standard assays measure total 25(OH)D rather than free bioavailable hormone.",
            "influencing_factors": "Seasonality, recent sun exposure, and skin pigmentation."
        },
        {
            "test_name": "Comprehensive Metabolic Panel (CMP) & TSH",
            "measures": "Electrolytes (Sodium, Potassium, Calcium), kidney (BUN/Creatinine), liver enzymes, and thyroid stimulating hormone.",
            "why_it_matters": "Evaluates fluid balance, organ clearance, and rules out subclinical hypothyroidism.",
            "limitations": "Static single snapshot of dynamic physiological parameters.",
            "influencing_factors": "Fasting status and strenuous training within 24 hours."
        }
    ]

    # 7. What NOT to Assume
    what_not_to_assume = [
        "Do NOT assume you have a specific nutrient deficiency simply because you feel fatigued or experience muscle tightness.",
        "Do NOT assume more supplements equal faster recovery — biological pathways have saturated rate-limiting enzymes.",
        "Do NOT assume a normal serum calcium/magnesium blood test completely rules out localized intracellular or tissue-level deficits.",
        "Do NOT assume supplements can compensate for chronic sleep debt (<6 hours) or inadequate caloric hydration foundations."
    ]

    # 8. Start Here (1-3 Actions)
    start_here = [
        {
            "action": "Anchor your sleep and wake window",
            "why": "Deep slow-wave sleep is when your cells regenerate ATP, repair muscle micro-tears, and clear neuro-metabolic waste.",
            "try_this": "Wake up at the same time every day and get 10-15 minutes of outdoor daylight within 1 hour of waking."
        },
        {
            "action": "Add mineral-dense whole foods to one meal today",
            "why": "Whole foods provide magnesium, iron, and potassium in natural cellular matrices with essential co-factors.",
            "try_this": "Add a handful of pumpkin seeds, a serving of lentils/dal, or cooked leafy greens to your lunch or dinner."
        },
        {
            "action": "Drink 500ml water with electrolytes upon waking",
            "why": "Even mild 1-2% dehydration reduces cardiac output, increases perceived effort, and triggers fatigue.",
            "try_this": "Keep a water glass by your bed and drink 500ml upon waking with a light pinch of unrefined sea salt."
        }
    ]

    # 9. What This Means For You (Translating Science into Life)
    what_this_means_for_you = (
        f"If your everyday diet already provides adequate calories, protein, and minerals, you probably do NOT need high-dose supplements. "
        f"Focus first on your foundational sleep and hydration. If fatigue or cramping persists after 2-3 weeks of consistency, discuss baseline blood testing (CBC, Ferritin, 25(OH)D) with your physician."
    )

    # 10. The One Thing to Remember
    the_one_thing_to_remember = "A symptom is a clue, not a diagnosis. Build your foundation with food and sleep first—supplements only when they actually add value."

    # 11. For You (Personalized if profile exists)
    for_you = None
    if profile and (profile.get("goal") or profile.get("diet")):
        for_you = {
            "biggest_opportunity": f"Aligning your daily nutrition and recovery around your goal of {profile.get('goal', 'better energy and vitality')}.",
            "focus_first": "Consistent sleep schedule, morning daylight, and adequate hydration before adding supplements.",
            "dont_need_to_worry_about": "Complicated multi-vitamin mega-doses or aggressive single-nutrient megadosing.",
            "could_investigate": "Requesting a routine annual blood panel (CBC, Ferritin, Vitamin D) from your doctor."
        }

    # 12. Short Answer (2-3 Friendly paragraphs)
    short_answer = (
        f"Let's break this down. You mentioned that you're experiencing {q_clean}. "
        f"There are several possible biological contributors, and a single nutrient deficiency is only one part of the picture.\n\n"
        f"Most often, everyday energy dips and physical complaints reflect interconnected factors across sleep quality, hydration, training load, and dietary co-factors. "
        f"By focusing on whole foods and consistent recovery habits, most people see substantial improvements within a few weeks."
    )

    # 13. Personalized Action Plan
    action_plan = {
        "today": "Drink 500ml water with a pinch of salt upon waking, get 15 minutes of outdoor daylight, and establish a fixed sleep cutoff tonight.",
        "this_week": "Incorporate 2 daily servings of the recommended whole foods (seeds, leafy greens, legumes/protein) and eliminate screens 60 minutes before bed.",
        "next_weeks": "Monitor symptom trends in the KevalBio Tracker. If fatigue or cramps persist after 2-3 weeks of consistent foundations, schedule a baseline lab panel (CBC, Ferritin, 25(OH)D, CMP).",
        "when_doctor": "Consult your physician if symptoms worsen, if you experience dizziness, sudden weakness, unexplained weight changes, or if symptoms fail to improve despite foundational lifestyle consistency."
    }

    # 14. Interactive Follow-up Questions
    followup_questions = [
        "What should I eat to improve this?",
        "Do I need a supplement?",
        "What tests should I check with my doctor?",
        "Can you analyze my typical day of eating?",
        "Why does sleep affect my energy so much?"
    ]

    return {
        "problem": q_clean,
        "title": topic_title,
        "quick_take": quick_take,
        "short_answer": short_answer,
        "start_here": start_here,
        "what_this_means_for_you": what_this_means_for_you,
        "the_one_thing_to_remember": the_one_thing_to_remember,
        "for_you": for_you,
        "root_causes": root_causes,
        "nutritional_gaps": nutritional_gaps,
        "food_solutions": food_solutions,
        "supplement_priorities": supplement_priorities,
        "food_vs_supplement": food_vs_supplement_rows,
        "biomarkers": biomarkers_to_check,
        "what_not_to_assume": what_not_to_assume,
        "action_plan": action_plan,
        "followups": followup_questions,
        "live_research_enabled": True
    }
