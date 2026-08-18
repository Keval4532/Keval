/**
 * KEVALBIO — Core Type Definitions & API Interfaces
 */

export type ExplanationPersona = "coach" | "five_year_old" | "biochemist";

export type BiologyCategory =
  | "vitamins_minerals"
  | "supplements_energy"
  | "hormones_endocrinology"
  | "longevity_circadian"
  | "cellular_systems"
  | "safety_triage";

export interface BiomarkerResult {
  biomarker: string;
  value: number;
  unit: string;
  standard_range: string;
  optimal_lifestyle_range: string;
  role: string;
  lifestyle_factors: string;
  food_first_strategy: string;
  doctor_questions: string[];
}

export interface LabScanResponse {
  status: string;
  total_biomarkers_analyzed: number;
  results: BiomarkerResult[];
  disclaimer: string;
}

export interface CircadianMilestone {
  time: string;
  title: string;
  icon: string;
  action: string;
}

export interface CircadianResponse {
  wake_time: string;
  daylight_condition: string;
  lux_estimate: string;
  recommended_viewing_duration: string;
  protocol_note: string;
  morning_sunlight_window: string;
  peak_cognitive_block: string;
  afternoon_slump_window: string;
  caffeine_hard_cutoff: string;
  dlmo_evening_window: string;
  target_bedtime: string;
  timeline: CircadianMilestone[];
}

export interface FastBreakerItem {
  item: string;
  calories: number;
  verdict: string;
  verdict_badge: string;
  insulin_impact: string;
  autophagy_impact: string;
  explanation: string;
}

export interface FastingResponse {
  elapsed_hours: number;
  target_hours: number;
  protocol: string;
  progress_percentage: number;
  hours_remaining: number;
  current_stage: {
    stage_number: number;
    name: string;
    range: string;
    primary_fuel: string;
    insulin_level: string;
    autophagy: string;
    description: string;
  };
  stages: Array<{
    stage: number;
    title: string;
    desc: string;
    active: boolean;
  }>;
  fast_breaker_dictionary: FastBreakerItem[];
}

export interface HydrationResponse {
  duration_minutes: number;
  intensity: string;
  sweat_rate_l_per_hr: number;
  estimated_fluid_loss_ml: number;
  estimated_fluid_loss_oz: number;
  electrolytes_lost: {
    sodium_mg: number;
    potassium_mg: number;
    magnesium_mg: number;
  };
  diy_rehydration_recipe: {
    title: string;
    liquid_base: string;
    sodium_source: string;
    potassium_source: string;
    flavor_glucose_transporter: string;
  };
  commercial_powder_guidance: string;
}

export interface SupplementAuditResponse {
  status: string;
  proprietary_blend_audit: {
    detected: boolean;
    verdict: string;
    explanation: string;
  };
  form_and_bioavailability_flags: Array<{
    ingredient: string;
    issue: string;
    recommendation: string;
  }>;
  clinical_trial_comparisons: Array<{
    ingredient: string;
    clinical_standard_dose: string;
    optimal_form: string;
    food_alternative: string;
  }>;
  money_saving_strategy: string;
}

export interface SubscriptionStatus {
  device_id: string;
  tier: "FREE" | "PRO_MONTHLY" | "PRO_ANNUAL";
  tier_name: string;
  is_pro: boolean;
  status: string;
  daily_queries_used: number;
  daily_query_limit: number;
  features: {
    unlimited_ai_questions: boolean;
    hormone_genetic_caffeine: boolean;
    unlimited_stack_audits: boolean;
    unlimited_meal_scans: boolean;
    deep_science_pubmed: boolean;
    unlimited_experiments: boolean;
    custom_receipt_themes: boolean;
  };
}
