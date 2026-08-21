"""Centralized Google GenAI (Gemini) Client for KEVALBIO.

Provides structured JSON generation and prose generation using the native
google-genai Python SDK with Gemini 2.5 Flash.
"""
import os
import re
import json
import logging
from typing import Optional, Dict, Any, List

from google import genai
from google.genai import types

logger = logging.getLogger(__name__)

# --------------- Lazy Client Initialization ---------------
# The client is initialized lazily on first use to ensure environment
# variables from dotenv are loaded before we read GEMINI_API_KEY.

_client = None
_client_initialized = False

DEFAULT_MODEL = "gemini-3.6-flash"
FALLBACK_MODELS = ["gemini-3.5-flash-lite", "gemini-2.5-flash"]


def _get_client():
    """Lazily initialize the Gemini client on first use."""
    global _client, _client_initialized
    if _client_initialized:
        return _client
    
    _client_initialized = True
    api_key = os.environ.get('GEMINI_API_KEY') or os.environ.get('GOOGLE_API_KEY')
    if api_key:
        _client = genai.Client(api_key=api_key)
        logger.info("KEVALBIO Gemini client initialized with native google-genai SDK (model: gemini-2.5-flash)")
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


# --------------- Core Generation Functions ---------------

async def generate_structured_json(
    system_instruction: str,
    user_prompt: str,
    max_output_tokens: int = 4096,
    temperature: float = 0.2,
) -> Optional[Dict[str, Any]]:
    """Generate structured JSON output using Gemini's native JSON mode.
    
    Tries the default model first, then falls back to alternatives.
    Returns parsed dict or None on failure.
    """
    client = _get_client()
    if client is None:
        return None

    models_to_try = [DEFAULT_MODEL] + FALLBACK_MODELS

    for model_name in models_to_try:
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=user_prompt,
                config=types.GenerateContentConfig(
                    system_instruction=system_instruction,
                    response_mime_type="application/json",
                    temperature=temperature,
                    max_output_tokens=max_output_tokens,
                ),
            )

            raw_text = response.text
            if not raw_text:
                logger.warning(f"Empty response from model '{model_name}'. Trying fallback...")
                continue

            parsed = _extract_json(raw_text)
            if isinstance(parsed, dict):
                logger.info(f"Successfully generated structured JSON via {model_name}")
                return parsed

        except Exception as e:
            logger.warning(f"Gemini model '{model_name}' structured generation failed: {e}. Trying fallback...")
            continue

    logger.error("All Gemini models failed for structured JSON generation.")
    return None


async def generate_prose(
    system_instruction: str,
    user_prompt: str,
    max_output_tokens: int = 2048,
    temperature: float = 0.35,
) -> Optional[str]:
    """Generate free-form prose text (for /ask and /coach endpoints).
    
    Returns raw text string or None on failure.
    """
    client = _get_client()
    if client is None:
        return None

    models_to_try = [DEFAULT_MODEL] + FALLBACK_MODELS

    for model_name in models_to_try:
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=user_prompt,
                config=types.GenerateContentConfig(
                    system_instruction=system_instruction,
                    temperature=temperature,
                    max_output_tokens=max_output_tokens,
                ),
            )

            raw_text = response.text
            if raw_text and raw_text.strip():
                logger.info(f"Successfully generated prose via {model_name}")
                return raw_text.strip()

            logger.warning(f"Empty prose response from '{model_name}'. Trying fallback...")
            continue

        except Exception as e:
            logger.warning(f"Gemini model '{model_name}' prose generation failed: {e}. Trying fallback...")
            continue

    logger.error("All Gemini models failed for prose generation.")
    return None
