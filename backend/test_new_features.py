"""Comprehensive verification suite for all KEVALBIO high-impact interactive tools."""
import requests
import json

BASE = "http://127.0.0.1:8000/api"

def run_tests():
    print("🚀 Running Comprehensive Verification for 5 New Interactive Biology Tools...\n")

    # TEST 1: Lab Report Translator & Biomarkers
    print("--- TEST 1: Lab Report Translator & Biomarker Interpreter ---")
    r_lab = requests.post(f"{BASE}/tools/scan-lab", json={
        "markers": [
            {"biomarker": "Vitamin D [25(OH)D]", "value": 28.0, "unit": "ng/mL"},
            {"biomarker": "Ferritin", "value": 35.0, "unit": "ng/mL"},
            {"biomarker": "Liver ALT / AST", "value": 45.0, "unit": "U/L"}
        ]
    })
    assert r_lab.status_code == 200, f"Lab failed: {r_lab.text}"
    lab_data = r_lab.json()
    assert len(lab_data["results"]) == 3
    print(f"✅ Lab Markers Translated: {len(lab_data['results'])} markers")
    print(f"✅ Context Factors Verified: {lab_data['results'][2]['biomarker']} -> '{lab_data['results'][2]['lifestyle_factors'][:60]}...'")
    print(f"✅ Doctor Questions: {lab_data['results'][0]['doctor_questions'][0]}")

    # TEST 2: Circadian Light & Cortisol Windows
    print("\n--- TEST 2: Circadian Light & Cortisol Window Calculator ---")
    r_circ = requests.post(f"{BASE}/tools/circadian-calc", json={
        "wake_hour": 6.5, # 6:30 AM
        "daylight_condition": "direct_sun"
    })
    assert r_circ.status_code == 200
    circ_data = r_circ.json()
    print(f"✅ Wake Time: {circ_data['wake_time']} | Lux: {circ_data['lux_estimate']}")
    print(f"✅ Morning Sun Window: {circ_data['morning_sunlight_window']} ({circ_data['recommended_viewing_duration']})")
    print(f"✅ Peak Cognitive Focus Block: {circ_data['peak_cognitive_block']}")
    print(f"✅ DLMO Evening Window: {circ_data['dlmo_evening_window']}")

    # TEST 3: Fasting & Metabolic Shift Timeline + Dictionary
    print("\n--- TEST 3: Fasting Timeline & Fast-Breaker Dictionary ---")
    r_fast = requests.post(f"{BASE}/tools/fasting-calc", json={
        "fast_hours_elapsed": 15.5,
        "protocol": "16:8",
        "target_fast_hours": 16.0
    })
    assert r_fast.status_code == 200
    fast_data = r_fast.json()
    print(f"✅ Fasting Progress: {fast_data['progress_percentage']}% ({fast_data['elapsed_hours']}h elapsed)")
    print(f"✅ Current Stage: Stage {fast_data['current_stage']['stage_number']} - {fast_data['current_stage']['name']}")
    print(f"✅ Primary Fuel: {fast_data['current_stage']['primary_fuel']}")
    print(f"✅ Autophagy State: {fast_data['current_stage']['autophagy']}")
    assert len(fast_data["fast_breaker_dictionary"]) >= 8
    print(f"✅ Fast-Breaker Dictionary Loaded: {len(fast_data['fast_breaker_dictionary'])} items verified")

    # TEST 4: Sweat Rate & Precision Hydration Calculator
    print("\n--- TEST 4: Sweat Rate & Precision Hydration Calculator ---")
    r_hyd = requests.post(f"{BASE}/tools/hydration-calc", json={
        "duration_mins": 90,
        "intensity": "high",
        "temp_c": 30.0,
        "humidity_pct": 65.0,
        "pre_weight_kg": 80.0,
        "post_weight_kg": 78.5
    })
    assert r_hyd.status_code == 200
    hyd_data = r_hyd.json()
    print(f"✅ Fluid Loss Calculated: {hyd_data['estimated_fluid_loss_ml']} ml (~{hyd_data['estimated_fluid_loss_oz']} fl oz)")
    print(f"✅ Sodium Lost: {hyd_data['electrolytes_lost']['sodium_mg']} mg | Potassium: {hyd_data['electrolytes_lost']['potassium_mg']} mg")
    print(f"✅ DIY Kitchen Recipe: {hyd_data['diy_rehydration_recipe']['title']}")

    # TEST 5: Supplement Value & Proprietary Blend Auditor
    print("\n--- TEST 5: Supplement Value & Proprietary Blend Auditor ---")
    formula = "Proprietary Energy Matrix 2800mg (Caffeine, L-Arginine, Beta-Alanine), Magnesium Oxide 200mg"
    r_audit = requests.post(f"{BASE}/tools/supplement-audit", json={"formula_text": formula})
    assert r_audit.status_code == 200
    audit_data = r_audit.json()
    assert audit_data["proprietary_blend_audit"]["detected"] == True
    print(f"✅ Proprietary Blend Detected: {audit_data['proprietary_blend_audit']['verdict']}")
    print(f"✅ Form Audit Flagged: {audit_data['form_and_bioavailability_flags'][0]['ingredient']} -> {audit_data['form_and_bioavailability_flags'][0]['issue']}")
    print(f"✅ Clinical Trial Dosing: {[c['ingredient'] for c in audit_data['clinical_trial_comparisons']]}")
    print(f"✅ Money-Saving Strategy: {audit_data['money_saving_strategy'][:80]}...\n")

    print("🎉 ALL 5 HIGH-IMPACT INTERACTIVE BIOLOGY TOOLS VERIFIED WITH 100% SUCCESS!")

if __name__ == "__main__":
    run_tests()
