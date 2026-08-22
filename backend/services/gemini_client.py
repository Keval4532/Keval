"""Centralized Google GenAI (Gemini) Client for KEVALBIO.

Provides structured JSON generation and prose generation using the native
google-genai Python SDK, google-generativeai SDK, or direct REST API with Gemini 2.5 Flash.
"""
import os
import re
import json
import logging
import requests
from typing import Optional, Dict, Any, List

logger = logging.getLogger(__name__)

# --------------- Lazy Client Initialization & Multi-Driver Support ---------------
_genai_sdk = None
_legacy_sdk = None
_client = None
_client_initialized = False

DEFAULT_MODEL = "gemini-2.5-flash"
FALLBACK_MODELS = ["gemini-1.5-flash", "gemini-1.5-pro"]

try:
    from google import genai
    from google.genai import types
    _genai_sdk = (genai, types)
except ImportError:
    _genai_sdk = None

try:
    import google.generativeai as genai_legacy
    _legacy_sdk = genai_legacy
except ImportError:
    _legacy_sdk = None


def _get_client():
    """Lazily initialize the Gemini client on first use."""
    global _client, _client_initialized
    if _client_initialized:
        return _client
    
    _client_initialized = True
    api_key = os.environ.get('GEMINI_API_KEY') or os.environ.get('GOOGLE_API_KEY')
    if api_key and _genai_sdk:
        try:
            genai, _ = _genai_sdk
            _client = genai.Client(api_key=api_key)
            logger.info("KEVALBIO Gemini client initialized with native google-genai SDK (model: gemini-2.5-flash)")
        except Exception as e:
            logger.warning(f"Failed to init google-genai SDK: {e}")
            _client = None
    elif api_key and _legacy_sdk:
        try:
            _legacy_sdk.configure(api_key=api_key)
            _client = "legacy"
            logger.info("KEVALBIO Gemini client initialized with google-generativeai SDK")
        except Exception as e:
            logger.warning(f"Failed to init google-generativeai SDK: {e}")
            _client = None
    elif api_key:
        _client = "rest"
        logger.info("KEVALBIO Gemini client using direct REST API")
    else:
        _client = None
        logger.warning("CRITICAL: No GEMINI_API_KEY found. AI generation will use fallback data.")
    
    return _client


def is_available() -> bool:
    """Check if the Gemini client is configured and ready."""
    return _get_client() is not None


# --------------- JSON Extraction Helper ---------------

def _extract_json(text: str) -> Dict[str, Any]:
    """Robustly extract JSON from model output, handling markdown fences and trailing commas."""
    if not text or not isinstance(text, str):
        raise json.JSONDecodeError("Empty text for JSON extraction", "", 0)

    clean = text.strip()

    # Strip markdown code blocks
    clean = re.sub(r"^```(?:json)?\s*", "", clean, flags=re.IGNORECASE).strip()
    clean = re.sub(r"\s*```$", "", clean).strip()

    start = clean.find("{")
    end = clean.rfind("}")
    if start == -1 or end == -1 or end <= start:
        raise json.JSONDecodeError("No JSON object found in response", clean[:200], 0)

    candidate = clean[start:end + 1]

    # Attempt 1: Direct parse
    try:
        return json.loads(candidate)
    except json.JSONDecodeError:
        pass

    # Attempt 2: Fix trailing commas
    try:
        repaired = re.sub(r',\s*([\]}])', r'\1', candidate)
        return json.loads(repaired)
    except json.JSONDecodeError:
        pass

    # Attempt 3: Balanced brace extraction
    brace_count = 0
    in_str = False
    escape = False
    end_pos = -1
    for idx, ch in enumerate(candidate):
        if ch == '"' and not escape:
            in_str = not in_str
        elif ch == '\\' and not escape:
            escape = True
            continue
        elif not in_str:
            if ch == '{':
                brace_count += 1
            elif ch == '}':
                brace_count -= 1
                if brace_count == 0:
                    end_pos = idx + 1
                    break
        escape = False

    if end_pos != -1:
        try:
            balanced = candidate[:end_pos]
            balanced = re.sub(r',\s*([\]}])', r'\1', balanced)
            return json.loads(balanced)
        except json.JSONDecodeError:
            pass

    raise json.JSONDecodeError("Failed to parse JSON from Gemini response", candidate[:500], 0)


def _call_gemini_rest(prompt: str, system_instruction: str = "", temperature: float = 0.2) -> Optional[str]:
    """Fallback to direct Gemini REST API when SDK is not present."""
    api_key = os.environ.get('GEMINI_API_KEY') or os.environ.get('GOOGLE_API_KEY')
    if not api_key:
        return None
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": temperature,
            "maxOutputTokens": 4096,
        }
    }
    if system_instruction:
        payload["systemInstruction"] = {
            "parts": [{"text": system_instruction}]
        }
    
    try:
        resp = requests.post(url, json=payload, timeout=25)
        if resp.status_code == 200:
            data = resp.json()
            candidates = data.get("candidates", [])
            if candidates:
                parts = candidates[0].get("content", {}).get("parts", [])
                if parts:
                    return parts[0].get("text", "")
    except Exception as e:
        logger.warning(f"Gemini REST call failed: {e}")
    return None


# --------------- Core Generation Functions ---------------

async def generate_structured_json(
    system_instruction: str,
    user_prompt: str,
    max_output_tokens: int = 4096,
    temperature: float = 0.2,
) -> Optional[Dict[str, Any]]:
    """Generate structured JSON output using Gemini's native JSON mode.
    
    Tries native google-genai SDK first, then legacy SDK, then direct REST API.
    Returns parsed dict or None on failure.
    """
    client = _get_client()
    if client is None:
        return None

    if _genai_sdk and isinstance(client, _genai_sdk[0].Client):
        genai_mod, types_mod = _genai_sdk
        models_to_try = [DEFAULT_MODEL] + FALLBACK_MODELS

        for model_name in models_to_try:
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=user_prompt,
                    config=types_mod.GenerateContentConfig(
                        system_instruction=system_instruction,
                        response_mime_type="application/json",
                        temperature=temperature,
                        max_output_tokens=max_output_tokens,
                    ),
                )

                raw_text = response.text
                if not raw_text:
                    continue

                parsed = _extract_json(raw_text)
                if isinstance(parsed, dict):
                    logger.info(f"Successfully generated structured JSON via {model_name}")
                    return parsed

            except Exception as e:
                logger.warning(f"Gemini model '{model_name}' structured generation failed: {e}")
                continue

    # Fallback to direct REST API
    rest_prompt = f"{system_instruction}\n\nRespond ONLY with valid JSON.\n\n{user_prompt}"
    raw = _call_gemini_rest(rest_prompt, system_instruction, temperature)
    if raw:
        try:
            return _extract_json(raw)
        except Exception:
            pass

    return None


async def generate_prose(
    system_instruction: str,
    user_prompt: str,
    max_output_tokens: int = 2048,
    temperature: float = 0.4,
) -> Optional[str]:
    """Generate freeform prose text using Gemini.
    
    Returns generated string or None on failure.
    """
    client = _get_client()
    if client is None:
        return None

    if _genai_sdk and isinstance(client, _genai_sdk[0].Client):
        genai_mod, types_mod = _genai_sdk
        models_to_try = [DEFAULT_MODEL] + FALLBACK_MODELS

        for model_name in models_to_try:
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=user_prompt,
                    config=types_mod.GenerateContentConfig(
                        system_instruction=system_instruction,
                        temperature=temperature,
                        max_output_tokens=max_output_tokens,
                    ),
                )

                raw_text = response.text
                if raw_text and len(raw_text.strip()) > 0:
                    logger.info(f"Successfully generated prose via {model_name}")
                    return raw_text.strip()

            except Exception as e:
                logger.warning(f"Gemini model '{model_name}' prose generation failed: {e}")
                continue

    # Fallback to direct REST API
    return _call_gemini_rest(user_prompt, system_instruction, temperature)
