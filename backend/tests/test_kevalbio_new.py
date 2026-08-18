"""Backend tests for KevalBio new features: /api/tracking and /api/coach."""
import os
import time
import uuid
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "http://localhost:8000").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def device_id():
    return "TEST_dev_" + uuid.uuid4().hex[:10]


# ---------- Tracking ----------
class TestTracking:
    def test_post_tracking_upsert(self, device_id):
        payload = {"device_id": device_id, "date": "2026-08-10", "sleep": 7.5, "protein": 160, "training": 45, "water": 3}
        r = requests.post(f"{API}/tracking", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        assert r.json().get("status") == "ok"

    def test_get_tracking_returns_entry(self, device_id):
        r = requests.get(f"{API}/tracking/{device_id}", timeout=30)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list) and len(items) >= 1
        e = [i for i in items if i["date"] == "2026-08-10"][0]
        assert e["sleep"] == 7.5
        assert e["protein"] == 160
        assert e["training"] == 45
        assert e["water"] == 3
        assert "_id" not in e

    def test_upsert_merges_same_date(self, device_id):
        # update just sleep for same date
        payload = {"device_id": device_id, "date": "2026-08-10", "sleep": 8.0}
        r = requests.post(f"{API}/tracking", json=payload, timeout=30)
        assert r.status_code == 200
        r2 = requests.get(f"{API}/tracking/{device_id}", timeout=30)
        entries = [i for i in r2.json() if i["date"] == "2026-08-10"]
        assert len(entries) == 1  # not duplicated
        assert entries[0]["sleep"] == 8.0
        assert entries[0]["protein"] == 160  # preserved

    def test_multiple_dates_sorted_ascending(self, device_id):
        for d, s in [("2026-08-12", 6.5), ("2026-08-11", 7.0)]:
            requests.post(f"{API}/tracking", json={"device_id": device_id, "date": d, "sleep": s}, timeout=30)
        r = requests.get(f"{API}/tracking/{device_id}", timeout=30)
        dates = [i["date"] for i in r.json()]
        assert dates == sorted(dates)

    def test_empty_body_rejected(self, device_id):
        r = requests.post(f"{API}/tracking", json={"device_id": device_id, "date": "2026-08-13"}, timeout=30)
        assert r.status_code == 400


# ---------- Coach ----------
class TestCoach:
    def test_coach_returns_answer_foundations_first(self):
        payload = {"question": "Help me improve my sleep", "history": []}
        r = requests.post(f"{API}/coach", json=payload, timeout=120)
        assert r.status_code == 200, r.text
        answer = r.json().get("answer", "")
        assert isinstance(answer, str) and len(answer) > 50
        low = answer.lower()
        assert "tier 1" in low
        # foundations must appear before supplements
        t1 = low.find("tier 1")
        t3 = low.find("tier 3")
        if t3 != -1:
            assert t1 < t3, f"Tier 1 must come before Tier 3. answer={answer[:400]}"

    def test_coach_empty_question(self):
        r = requests.post(f"{API}/coach", json={"question": "", "history": []}, timeout=30)
        assert r.status_code == 400
