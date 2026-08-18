"""Backend tests for KevalBio NEW features: Profile + personalized analyze + coach personalization."""
import os
import uuid
import requests
import pytest

BASE_URL = (os.environ.get("REACT_APP_BACKEND_URL") or "http://localhost:8000").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def device_id():
    return "TEST_prof_" + uuid.uuid4().hex[:10]


PROFILE = {
    "goal": "Muscle growth",
    "age": "28",
    "sex": "Male",
    "training_days": "4",
    "diet": "Omnivore",
    "activity_level": "Very active",
    "height": "178",
    "weight": "78",
}


class TestProfile:
    def test_get_profile_empty_initially(self, device_id):
        r = requests.get(f"{API}/profile/{device_id}", timeout=30)
        assert r.status_code == 200
        assert r.json() == {}

    def test_post_profile_upsert(self, device_id):
        payload = {"device_id": device_id, **PROFILE}
        r = requests.post(f"{API}/profile", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        assert r.json() == {"status": "ok"}

    def test_get_profile_after_save(self, device_id):
        r = requests.get(f"{API}/profile/{device_id}", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert data["goal"] == "Muscle growth"
        assert data["age"] == "28"
        assert data["training_days"] == "4"
        assert data["diet"] == "Omnivore"
        assert "_id" not in data

    def test_repost_updates_no_duplicate(self, device_id):
        payload = {"device_id": device_id, **PROFILE, "goal": "Fat loss"}
        r = requests.post(f"{API}/profile", json=payload, timeout=30)
        assert r.status_code == 200
        r2 = requests.get(f"{API}/profile/{device_id}", timeout=30)
        assert r2.json()["goal"] == "Fat loss"


class TestPersonalizedAnalyze:
    def test_analyze_without_profile_no_personalized(self):
        # Use a fresh but likely-cached-or-fast query variant to keep it reasonable
        payload = {"query": "Creatine", "level": "intermediate"}
        r = requests.post(f"{API}/analyze", json=payload, timeout=180)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "subject" in data
        # Without profile there must be no personalized field
        assert "personalized" not in data or not data.get("personalized")

    def test_analyze_with_profile_returns_personalized(self):
        payload = {
            "query": "Creatine",
            "level": "intermediate",
            "profile": {
                "goal": "Muscle growth", "age": "28", "sex": "Male",
                "training_days": "4", "diet": "Omnivore",
            },
        }
        r = requests.post(f"{API}/analyze", json=payload, timeout=180)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "subject" in data
        assert "personalized" in data, f"missing 'personalized' field. keys={list(data.keys())}"
        assert isinstance(data["personalized"], str)
        assert len(data["personalized"]) > 40
        low = data["personalized"].lower()
        # Reference user goal or training
        assert ("muscle" in low) or ("train" in low) or ("growth" in low), data["personalized"]


class TestCoachPersonalized:
    def test_coach_with_profile(self):
        payload = {
            "question": "What supplements are worth taking?",
            "history": [],
            "profile": {"goal": "Muscle growth", "training_days": "4", "diet": "Omnivore"},
        }
        r = requests.post(f"{API}/coach", json=payload, timeout=180)
        assert r.status_code == 200, r.text
        answer = r.json().get("answer", "")
        assert isinstance(answer, str) and len(answer) > 100
        low = answer.lower()
        assert "tier 1" in low
        t1 = low.find("tier 1")
        t3 = low.find("tier 3")
        if t3 != -1:
            assert t1 < t3, "Tier 1 must be before Tier 3"
        # references goal/training
        assert ("muscle" in low) or ("growth" in low) or ("train" in low)
