"""Unit and Integration Tests for KEVALBIO Auth & Automated Subscriber Provisioning Service."""
import os
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))

import pytest
from fastapi.testclient import TestClient
from server import app, hash_password, verify_password, generate_user_password, create_access_token, decode_access_token

client = TestClient(app)


def test_password_generation_and_hashing():
    pwd = generate_user_password()
    assert pwd.startswith("KevalBio-")
    assert pwd.endswith("-Pass")
    
    hashed = hash_password(pwd)
    assert hashed != pwd
    assert verify_password(pwd, hashed) is True
    assert verify_password("WrongPassword-123", hashed) is False


def test_jwt_token_flow():
    payload = {"user_id": "test-123", "email": "test@kevalbio.ai", "role": "PRO_SUBSCRIBER", "tier": "PRO_ANNUAL"}
    token = create_access_token(payload)
    assert isinstance(token, str)
    
    decoded = decode_access_token(token)
    assert decoded is not None
    assert decoded["email"] == "test@kevalbio.ai"
    assert decoded["role"] == "PRO_SUBSCRIBER"
    assert decoded["tier"] == "PRO_ANNUAL"


def test_provision_subscriber_endpoint():
    res = client.post("/api/auth/provision-subscriber", json={
        "email": "sarah.connor@example.com",
        "name": "Sarah Connor",
        "tier": "PRO_ANNUAL",
        "device_id": "dev_test_sarah_001"
    })
    assert res.status_code == 200, res.text
    data = res.json()
    assert data["status"] == "success"
    assert data["user"]["email"] == "sarah.connor@example.com"
    assert data["user"]["name"] == "Sarah Connor"
    assert data["user"]["is_pro"] is True
    assert data["user"]["tier"] == "PRO_ANNUAL"
    assert "credentials" in data
    assert data["credentials"]["email"] == "sarah.connor@example.com"
    assert data["credentials"]["temporary_password"].startswith("KevalBio-")
    assert "token" in data and len(data["token"]) > 20

    # Test login with generated credentials
    temp_pwd = data["credentials"]["temporary_password"]
    login_res = client.post("/api/auth/login", json={
        "email": "sarah.connor@example.com",
        "password": temp_pwd
    })
    assert login_res.status_code == 200
    login_data = login_res.json()
    assert login_data["status"] == "success"
    assert login_data["user"]["email"] == "sarah.connor@example.com"
    assert login_data["user"]["is_pro"] is True
    
    # Test session verification via /auth/me with Bearer token
    me_res = client.get("/api/auth/me", headers={"Authorization": f"Bearer {login_data['token']}"})
    assert me_res.status_code == 200
    me_data = me_res.json()
    assert me_data["is_authenticated"] is True
    assert me_data["is_pro"] is True
    assert me_data["user"]["email"] == "sarah.connor@example.com"


def test_login_invalid_credentials():
    res = client.post("/api/auth/login", json={
        "email": "sarah.connor@example.com",
        "password": "CompletelyWrongPassword!"
    })
    assert res.status_code == 401
    assert "Invalid email or password" in res.json()["detail"]


def test_demo_login_endpoint():
    res = client.post("/api/auth/demo-login", json={"tier": "PRO_ANNUAL"})
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    assert data["user"]["email"] == "demo@kevalbio.ai"
    assert data["user"]["is_pro"] is True
    assert "token" in data
