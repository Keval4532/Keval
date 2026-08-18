"""Comprehensive Test Suite for KEVALBIO Platform Upgrade across all 10 core requirements."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "http://localhost:8000").rstrip("/")
API = f"{BASE_URL}/api"
TIMEOUT = 30


@pytest.fixture(scope="module")
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


# TEST 1: Teach me everything about magnesium
def test_1_learn_magnesium(s):
    r = s.post(f"{API}/analyze", json={"query": "Teach me everything about magnesium", "level": "intermediate"}, timeout=TIMEOUT)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("subject") == "Magnesium"
    assert data.get("query_type") == "mineral"
    assert isinstance(data.get("sections"), dict)
    assert "what_is_it" in data["sections"]
    assert "mechanism" in data["sections"]
    assert "food_sources" in data["sections"]
    assert "safety" in data["sections"]
    assert "live_research" in data


# TEST 2: I'm always tired
def test_2_problem_always_tired(s):
    r = s.post(f"{API}/problem", json={"query": "I'm always tired"}, timeout=TIMEOUT)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("problem") == "I'm always tired"
    assert data.get("quick_take")
    assert isinstance(data.get("root_causes"), list) and len(data["root_causes"]) >= 4
    assert isinstance(data.get("nutritional_gaps"), list) and len(data["nutritional_gaps"]) >= 1
    # Check no diagnosis claim
    for gap in data["nutritional_gaps"]:
        assert "deficien" not in gap.get("relevance", "").lower()
    assert isinstance(data.get("food_solutions"), list)
    assert isinstance(data.get("supplement_priorities"), list)
    assert isinstance(data.get("biomarkers"), list)
    assert isinstance(data.get("action_plan"), dict)
    assert "today" in data["action_plan"]


# TEST 3: I'm vegetarian and always tired
def test_3_vegetarian_always_tired(s):
    r = s.post(f"{API}/problem", json={"query": "I'm vegetarian and always tired", "profile": {"diet": "Vegetarian", "goal": "Energy"}}, timeout=TIMEOUT)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("problem")
    # Check that plant-based/vegetarian food sources or B12/Iron gaps are addressed
    gaps_str = str(data.get("nutritional_gaps"))
    assert "B12" in gaps_str or "Iron" in gaps_str


# TEST 4: My muscles keep cramping
def test_4_muscle_cramping(s):
    r = s.post(f"{API}/problem", json={"query": "My muscles keep cramping"}, timeout=TIMEOUT)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "Cramp" in data.get("title", "")
    # Check that root causes include multiple factors (sleep, hydration, electrolytes, fatigue), not just magnesium
    causes = [c["category"] for c in data.get("root_causes", [])]
    assert "Hydration & Electrolytes" in causes
    assert "Training & Cumulative Fatigue" in causes or "Sleep & Recovery" in causes


# TEST 5: What foods are high in iron?
def test_5_foods_high_in_iron(s):
    r = s.post(f"{API}/analyze", json={"query": "What foods are high in iron?"}, timeout=TIMEOUT)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("subject")
    foods = data.get("sections", {}).get("food_sources", [])
    assert len(foods) >= 2
    assert any("iron" in str(f).lower() or "lentil" in str(f).lower() or "spinach" in str(f).lower() or "beef" in str(f).lower() for f in foods)


# TEST 6: Should I take vitamin D?
def test_6_should_i_take_vitamin_d(s):
    r = s.post(f"{API}/problem", json={"query": "Should I take vitamin D?"}, timeout=TIMEOUT)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("quick_take")
    assert isinstance(data.get("biomarkers"), list)
    # Check testing consideration included
    bm_str = str(data["biomarkers"])
    assert "Vitamin D" in bm_str or "25-Hydroxy" in bm_str


# TEST 7: Supplement Stack Analyzer (Vitamin D + magnesium + zinc + omega-3 + creatine)
def test_7_supplement_stack_analyzer(s):
    stack_str = "Vitamin D + magnesium + zinc + omega-3 + creatine"
    r = s.post(f"{API}/supplements/analyze-stack", json={"stack": stack_str}, timeout=TIMEOUT)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("supplements_count") >= 4
    assert isinstance(data.get("analyzed_supplements"), list)
    assert "timing_schedule" in data
    assert "morning" in data["timing_schedule"]
    assert "evening" in data["timing_schedule"]


# TEST 8: What's the latest research on creatine?
def test_8_latest_research_creatine(s):
    r = s.post(f"{API}/research", json={"query": "creatine", "timeframe": "3y"}, timeout=TIMEOUT)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("live_searched") is True
    assert isinstance(data.get("studies"), list) and len(data["studies"]) >= 1
    study = data["studies"][0]
    assert "title" in study
    assert "evidence_level" in study
    assert "url" in study


# TEST 9: Give me cheap Indian foods high in protein and iron
def test_9_regional_indian_foods(s):
    r = s.post(f"{API}/problem", json={"query": "Give me cheap Indian foods high in protein and iron", "region_hint": "India"}, timeout=TIMEOUT)
    assert r.status_code == 200, r.text
    data = r.json()
    food_str = str(data.get("food_solutions", []))
    assert "Dal" in food_str or "Moong" in food_str or "Chana" in food_str or "Palak" in food_str or "Lentil" in food_str


# TEST 10: I have chest pain and feel short of breath (Emergency Red Flag)
def test_10_red_flag_chest_pain(s):
    r = s.post(f"{API}/problem", json={"query": "I have chest pain and feel short of breath"}, timeout=TIMEOUT)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("emergency") is not None
    assert data["emergency"].get("is_emergency") is True
    assert "URGENT" in data["emergency"].get("title", "")


# TEST 11: Diet Meal Log Analyzer
def test_11_diet_meal_analyzer(s):
    meals = {
        "breakfast": "3 eggs + toast",
        "lunch": "dal + rice + salad",
        "dinner": "chicken + roti"
    }
    r = s.post(f"{API}/nutrition/analyze-diet", json={"meals": meals}, timeout=TIMEOUT)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "summary" in data
    assert data["summary"]["calories"] > 500
    assert data["summary"]["protein"] > 30
    assert isinstance(data.get("dashboard"), list)
