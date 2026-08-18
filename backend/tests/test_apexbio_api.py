"""ApexBio backend API tests."""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "http://localhost:8000").rstrip("/")
API = f"{BASE_URL}/api"
TIMEOUT = 180
DEVICE_ID = "testdev1"


@pytest.fixture(scope="module")
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


# ---------- Health ----------
def test_root(s):
    r = s.get(f"{API}/", timeout=30)
    assert r.status_code == 200
    assert "ApexBio" in r.json().get("message", "")


# ---------- Analyze (topic/mineral) ----------
def test_analyze_magnesium(s):
    r = s.post(f"{API}/analyze",
               json={"query": "Teach me everything about Magnesium", "level": "intermediate"},
               timeout=TIMEOUT)
    assert r.status_code == 200, r.text
    d = r.json()
    assert d.get("query_type") == "mineral"
    assert d.get("subject")
    assert isinstance(d.get("science_score"), int)
    assert d.get("safety_level") in ("green", "yellow", "red")
    sections = d.get("sections") or {}
    assert isinstance(sections, dict)
    # at least some expected section keys
    expected = {"what_is_it", "mechanism", "food_sources", "safety"}
    assert expected.intersection(sections.keys()), f"Missing sections: got {list(sections.keys())}"
    assert isinstance(d.get("followups"), list) and len(d["followups"]) >= 1


# ---------- Analyze (symptom) ----------
def test_analyze_symptom_tired(s):
    r = s.post(f"{API}/analyze", json={"query": "Why am I always tired?"}, timeout=TIMEOUT)
    assert r.status_code == 200, r.text
    d = r.json()
    assert d.get("query_type") == "symptom"
    contributors = d.get("contributors") or []
    assert isinstance(contributors, list) and len(contributors) >= 1
    valid = {"common", "possible", "less_common", "rule_out"}
    for c in contributors:
        assert c.get("likelihood") in valid, c
    assert isinstance(d.get("red_flags"), list)
    assert d.get("disclaimer")


# ---------- Analyze (comparison) ----------
def test_analyze_comparison(s):
    r = s.post(f"{API}/analyze", json={"query": "Creatine vs beta-alanine"}, timeout=TIMEOUT)
    assert r.status_code == 200, r.text
    d = r.json()
    assert d.get("query_type") == "comparison"
    items = d.get("items") or []
    assert isinstance(items, list) and len(items) == 2
    assert isinstance(d.get("rows"), list) and len(d["rows"]) >= 1
    assert d.get("verdict")


# ---------- Ask ----------
def test_ask(s):
    r = s.post(f"{API}/ask",
               json={"subject": "Magnesium", "category": "Mineral",
                     "question": "What foods contain this?", "level": "intermediate", "history": []},
               timeout=TIMEOUT)
    assert r.status_code == 200, r.text
    d = r.json()
    assert isinstance(d.get("answer"), str) and len(d["answer"]) > 20


# ---------- Explore / Trending ----------
def test_explore(s):
    r = s.get(f"{API}/explore", timeout=30)
    assert r.status_code == 200
    d = r.json()
    assert isinstance(d.get("categories"), list) and len(d["categories"]) > 0
    assert d["categories"][0].get("items")


def test_trending(s):
    r = s.get(f"{API}/trending", timeout=30)
    assert r.status_code == 200
    assert isinstance(r.json().get("topics"), list)


# ---------- Saved CRUD ----------
def test_saved_flow(s):
    # cleanup pre
    s.delete(f"{API}/saved/{DEVICE_ID}/Magnesium", timeout=30)

    payload = {"device_id": DEVICE_ID, "subject": "Magnesium", "category": "Mineral",
               "query": "Magnesium", "query_type": "mineral", "one_liner": "x"}
    r = s.post(f"{API}/saved", json=payload, timeout=30)
    assert r.status_code == 200
    assert r.json().get("status") in ("saved", "exists")

    # duplicate returns exists
    r2 = s.post(f"{API}/saved", json=payload, timeout=30)
    assert r2.status_code == 200
    assert r2.json().get("status") == "exists"

    # list
    r3 = s.get(f"{API}/saved/{DEVICE_ID}", timeout=30)
    assert r3.status_code == 200
    items = r3.json()
    assert any(i.get("subject") == "Magnesium" for i in items)
    # no mongo _id leak
    for i in items:
        assert "_id" not in i

    # delete
    r4 = s.delete(f"{API}/saved/{DEVICE_ID}/Magnesium", timeout=30)
    assert r4.status_code == 200
    assert r4.json().get("status") == "deleted"

    r5 = s.get(f"{API}/saved/{DEVICE_ID}", timeout=30)
    assert not any(i.get("subject") == "Magnesium" for i in r5.json())


# ---------- Validation ----------
def test_analyze_empty(s):
    r = s.post(f"{API}/analyze", json={"query": "  "}, timeout=30)
    assert r.status_code == 400
