from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import json
import logging
import hashlib
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict
import uuid
from datetime import datetime, timezone

from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')
MODEL_PROVIDER = "anthropic"
MODEL_NAME = "claude-sonnet-4-6"

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# ----------------------------- Models -----------------------------
class AnalyzeRequest(BaseModel):
    query: str
    level: str = "intermediate"  # beginner | intermediate | advanced
    mode: Optional[str] = None   # topic | symptom | comparison | lab (hint, optional)


class AskRequest(BaseModel):
    subject: str
    category: Optional[str] = ""
    question: str
    level: str = "intermediate"
    history: List[Dict[str, str]] = Field(default_factory=list)


class SaveRequest(BaseModel):
    device_id: str
    subject: str
    category: str
    query: str
    query_type: str
    one_liner: Optional[str] = ""


# ----------------------------- Prompts -----------------------------
BASE_RULES = """You are ApexBio, a premium evidence-based human physiology, nutrition, supplementation, fitness and biohacking EDUCATION engine.

STRICT RULES:
- Be scientifically accurate. Separate established evidence from hypotheses.
- Never diagnose the user. Never fabricate studies or lab reference ranges.
- Avoid fearmongering and exaggerated health claims. Never claim supplements cure diseases.
- Explain uncertainty. Prefer human evidence. Distinguish observational studies from RCTs.
- Use absolute years for research (e.g. "a 2019 meta-analysis"), never fabricate DOIs.
- If you lack reliable evidence, say so explicitly instead of inventing.
- Recommended intake != therapeutic dose != supplement dose. Do not push high-dose supplementation.
- For emergency/red-flag symptoms (severe chest pain, trouble breathing, loss of consciousness, severe allergic reaction, sudden neuro symptoms, severe bleeding, overdose) set "emergency": true and keep the answer short, urging immediate medical care.

OUTPUT: Return ONLY valid minified JSON. No markdown, no code fences, no prose outside JSON.
Adapt depth to the requested learning level: %LEVEL%.
"""

TOPIC_SCHEMA = """
Classify the query, then produce this JSON shape. Fill ONLY the top-level object matching the query_type.

Common fields for ALL types:
{
 "query_type": one of ["nutrient","vitamin","mineral","supplement","hormone","organ_system","physiology","food","exercise","training","body_composition","sleep_recovery","biohacking","metabolism","longevity","symptom","comparison","lab","medication","combination"],
 "subject": "canonical name of the topic",
 "category": "human-readable category label",
 "one_liner": "one sentence explanation",
 "emergency": false,
 "science_score": 0-100 integer reflecting quantity+quality of studies, design, consistency, replication, human evidence, clinical relevance,
 "science_score_rationale": "1-2 sentences explaining the score",
 "safety_level": "green" | "yellow" | "red",
 "followups": ["3-6 short natural follow-up questions a user might ask"]
}

If query_type is a symptom, ADD:
 "disclaimer": "A symptom alone does not establish a diagnosis or nutrient deficiency.",
 "quick_answer": "2-4 sentences",
 "contributors": [{"name":"","likelihood":"common|possible|less_common|rule_out","mechanism":"","lifestyle":"","nutrition":""}],
 "biomarkers": [{"marker":"","measures":"","matters":"","limitations":"","when":""}],
 "red_flags": ["symptoms that warrant urgent medical attention"]

If query_type is a comparison, ADD:
 "quick_answer": "2-4 sentence summary of the comparison",
 "items": ["ItemA","ItemB"],
 "rows": [{"attribute":"Mechanism|Benefits|Evidence|Dosage|Absorption|Timing|Safety|Cost|Best use case|Limitations","a":"","b":""}],
 "verdict": "balanced conclusion"

If query_type is lab (a biomarker/lab test), ADD:
 "quick_answer": "2-4 sentences",
 "lab": {"what_it_is":"","produced_by":"","what_it_tells":"","what_it_does_not":"","influencing_factors":["..."],"reference_ranges":"typical ranges WITH units, note they vary by lab","why_ranges_differ":"","when_investigated":""},
 "biomarkers": [] 

Otherwise (nutrient/vitamin/mineral/supplement/hormone/physiology/etc), ADD a rich "sections" object. Include the keys that make sense for the subject; omit ones that truly do not apply:
 "quick_answer": "2-4 sentences",
 "sections": {
   "what_is_it": {"beginner":"", "advanced":""},
   "why_important": [{"title":"","detail":"","evidence":"strong|moderate|emerging|limited"}],
   "affects": [{"system":"one of Brain,Nervous system,Heart,Blood vessels,Muscles,Bones,Liver,Kidneys,Gut,Immune system,Endocrine system,Reproductive system,Metabolism,Mitochondria,Skin,Sleep/circadian","level":"primary|secondary|indirect","detail":""}],
   "mechanism": {"summary":"", "steps":[{"stage":"Consumption|Absorption|Transport|Cellular action|Physiological effect|Observable outcome","detail":""}]},
   "uses": {"strong":["..."],"moderate":["..."],"emerging":["..."],"insufficient":["..."]},
   "deficiency": {"causes":["..."],"effects":["..."],"symptoms":["..."],"symptoms_note":"note if symptoms are nonspecific","risk_groups":["..."],"testing":""},
   "food_sources": [{"food":"","amount":"","content":"","bioavailability":"high|moderate|low","serving":"","type":"animal|plant|fortified"}],
   "absorption": {"increases":["..."],"decreases":["..."],"forms":["..."],"notes":""},
   "requirements": {"rda":"","groups":[{"group":"","amount":""}],"ul":"","note":"distinguish recommended intake vs therapeutic vs supplement dose"},
   "supplementation": {"who_might":["..."],"who_probably_not":["..."],"forms":["..."],"typical_amounts":"","timing":"","with_food":"","duration":"","cycling":""},
   "safety": {"level":"green|yellow|red","upper_limit":"","toxicity":"","overdose":"","drug_interactions":["..."],"contraindications":["..."],"special_populations":["..."]},
   "interactions": [{"substance":"","interaction":"","mechanism":"","importance":"high|moderate|low"}],
   "timing": {"matters": true, "detail":"if it does not matter, say so explicitly"},
   "performance": {"muscle":"","strength":"","fat_loss":"","recovery":"","athletic":"","energy":"","sleep":"","cognitive":"","hormones":"","metabolic":""},
   "biomarkers": [{"marker":"","measures":"","matters":"","limitations":"","when":""}],
   "myths": [{"myth":"","fact":""}],
   "mistakes": ["3-8 common mistakes"],
   "if_low": ["ordered practical educational steps"],
   "if_too_much": {"acute":"","chronic":"","mechanism":"","signs":"","when_medical":""},
   "research": [{"title":"","year":"","study_type":"systematic review|meta-analysis|RCT|guideline|review|observational","evidence_level":"strong|moderate|emerging|limited","summary":"","source":"journal or institution name, no fake DOI"}]
 }

Keep values concise and educational. Aim for 4-8 items in list sections.

CRITICAL BREVITY RULES (to keep the response complete and fast):
- Keep every string value under ~220 characters. Be dense and factual, not verbose.
- Use at most 4 items in every list/array.
- Only include a research entry if it reflects a real, well-known body of literature (max 3 entries). Do NOT fabricate.
- Omit any section key that does not meaningfully apply to the subject rather than padding it.
- Return MINIFIED JSON on a single line with no extra whitespace.
"""


def build_analyze_prompt(level: str) -> str:
    return BASE_RULES.replace("%LEVEL%", level) + "\n" + TOPIC_SCHEMA


SECTION_KEYS = {
    "what_is_it", "why_important", "affects", "mechanism", "uses", "deficiency",
    "food_sources", "absorption", "requirements", "supplementation", "safety",
    "interactions", "timing", "performance", "biomarkers", "myths", "mistakes",
    "if_low", "if_too_much", "research",
}


def extract_json(text: str) -> Dict[str, Any]:
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(json)?", "", text).strip()
        text = re.sub(r"```$", "", text).strip()
    start = text.find("{")
    if start == -1:
        raise json.JSONDecodeError("no object", text, 0)
    text = text[start:]
    dec = json.JSONDecoder()
    obj, end = dec.raw_decode(text)
    # Merge trailing top-level keys the model emitted after a premature closing brace
    rest = text[end:].strip()
    if rest.startswith(","):
        try:
            extra, _ = dec.raw_decode("{" + rest[1:])
            for k, v in extra.items():
                obj.setdefault(k, v)
        except Exception:
            pass
    # Normalize: move stray section keys sitting at root into sections
    if isinstance(obj.get("sections"), dict):
        for k in list(obj.keys()):
            if k in SECTION_KEYS and k not in obj["sections"]:
                obj["sections"][k] = obj.pop(k)
    return obj


async def call_llm(system_message: str, user_text: str, session_id: str, max_tokens: int = 8000) -> str:
    chat = (
        LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=session_id,
            system_message=system_message,
        )
        .with_model(MODEL_PROVIDER, MODEL_NAME)
        .with_params(max_tokens=max_tokens)
    )
    resp = await chat.send_message(UserMessage(text=user_text))
    return resp


# ----------------------------- Routes -----------------------------
def _safe_key(s: str) -> str:
    return (s or "unknown").replace(".", "·").replace("$", "")


@api_router.get("/")
async def root():
    return {"message": "ApexBio API"}


@api_router.post("/analyze")
async def analyze(req: AnalyzeRequest):
    q = req.query.strip()
    if not q:
        raise HTTPException(status_code=400, detail="Query is required")

    level = req.level if req.level in ("beginner", "intermediate", "advanced") else "intermediate"
    cache_key = hashlib.sha256(f"{q.lower()}|{level}|{req.mode}".encode()).hexdigest()

    cached = await db.topic_cache.find_one({"_id": cache_key})
    if cached:
        await db.analytics.update_one(
            {"_id": "search"},
            {"$inc": {f"topics.{_safe_key(cached['data'].get('subject','unknown'))}": 1, "total": 1}},
            upsert=True,
        )
        return cached["data"]

    system = build_analyze_prompt(level)
    hint = f"\nUser is using the '{req.mode}' tool." if req.mode else ""
    user_text = f'User query: "{q}"{hint}\nClassify and generate the ApexBio educational profile as JSON.'

    try:
        raw = await call_llm(system, user_text, f"analyze-{cache_key[:12]}", max_tokens=12000)
        data = extract_json(raw)
    except json.JSONDecodeError as je:
        with open("/tmp/last_raw.txt", "w") as f:
            f.write(raw or "")
        logger.error("JSON parse failed at pos %s: %s", je.pos, je.msg)
        raise HTTPException(status_code=502, detail="Could not generate a structured answer. Please try rephrasing.")
    except Exception as e:
        logger.exception("LLM error")
        raise HTTPException(status_code=502, detail=f"AI engine error: {str(e)}")

    data["_meta"] = {"level": level, "generated_at": datetime.now(timezone.utc).isoformat()}

    await db.topic_cache.insert_one({"_id": cache_key, "query": q, "level": level, "data": data,
                                     "created_at": datetime.now(timezone.utc).isoformat()})
    await db.analytics.update_one(
        {"_id": "search"},
        {"$inc": {f"topics.{_safe_key(data.get('subject','unknown'))}": 1, "total": 1}},
        upsert=True,
    )
    return data


@api_router.post("/ask")
async def ask(req: AskRequest):
    if not req.question.strip():
        raise HTTPException(status_code=400, detail="Question is required")

    system = (
        BASE_RULES.replace("%LEVEL%", req.level)
        + f"\nYou are answering a conversational follow-up about the topic: '{req.subject}' (category: {req.category}). "
        "Stay on this topic and maintain context. Answer in clear plain prose (NOT JSON), 2-5 short paragraphs max. "
        "Use markdown-style **bold** for key terms and hyphen bullet lists where helpful."
    )

    convo = ""
    for m in req.history[-6:]:
        role = "User" if m.get("role") == "user" else "ApexBio"
        convo += f"{role}: {m.get('content','')}\n"
    user_text = f"{convo}User: {req.question}\nApexBio:"

    try:
        answer = await call_llm(system, user_text, f"ask-{req.subject.lower()[:20]}")
    except Exception as e:
        logger.exception("Ask error")
        raise HTTPException(status_code=502, detail=f"AI engine error: {str(e)}")

    await db.analytics.update_one({"_id": "search"}, {"$inc": {"questions": 1}}, upsert=True)
    return {"answer": answer.strip()}


@api_router.post("/saved")
async def save_topic(req: SaveRequest):
    doc = req.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    existing = await db.saved_topics.find_one({"device_id": req.device_id, "subject": req.subject})
    if existing:
        return {"status": "exists", "id": existing["id"]}
    await db.saved_topics.insert_one({**doc, "_id": doc["id"]})
    return {"status": "saved", "id": doc["id"]}


@api_router.get("/saved/{device_id}")
async def get_saved(device_id: str):
    items = await db.saved_topics.find({"device_id": device_id}, {"_id": 0}).sort("created_at", -1).to_list(200)
    return items


@api_router.delete("/saved/{device_id}/{subject}")
async def delete_saved(device_id: str, subject: str):
    await db.saved_topics.delete_one({"device_id": device_id, "subject": subject})
    return {"status": "deleted"}


@api_router.get("/explore")
async def explore():
    return EXPLORE_DATA


@api_router.get("/trending")
async def trending():
    doc = await db.analytics.find_one({"_id": "search"})
    if not doc or not doc.get("topics"):
        return {"topics": []}
    topics = sorted(doc["topics"].items(), key=lambda x: x[1], reverse=True)[:8]
    return {"topics": [{"name": t.replace("·", "."), "count": c} for t, c in topics]}


EXPLORE_DATA = {
    "categories": [
        {"name": "Vitamins", "color": "#FFEA00",
         "items": ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D", "Vitamin E", "Vitamin K", "Folate", "B-Complex"]},
        {"name": "Minerals", "color": "#00F0FF",
         "items": ["Magnesium", "Zinc", "Iron", "Calcium", "Potassium", "Selenium", "Iodine", "Sodium"]},
        {"name": "Supplements", "color": "#00E676",
         "items": ["Creatine", "Omega-3", "Whey Protein", "Electrolytes", "Caffeine", "Beta-Alanine", "Ashwagandha", "Vitamin D3"]},
        {"name": "Hormones", "color": "#FF6EC7",
         "items": ["Insulin", "Cortisol", "Testosterone", "Estrogen", "Thyroid Hormones", "Growth Hormone", "Melatonin", "Leptin"]},
        {"name": "Physiology", "color": "#A78BFA",
         "items": ["Metabolism", "Mitochondria", "Inflammation", "Muscle Hypertrophy", "Digestion", "Sleep", "Insulin Sensitivity", "Autophagy"]},
        {"name": "Training", "color": "#FF9F0A",
         "items": ["Progressive Overload", "Training Volume", "Intensity", "Recovery", "Hypertrophy", "Strength", "Conditioning", "VO2 Max"]},
        {"name": "Longevity", "color": "#64D2FF",
         "items": ["Circadian Rhythm", "Cardiovascular Health", "Metabolic Health", "Exercise", "Sleep Quality", "Fasting", "Zone 2 Cardio", "Blood Pressure"]},
    ]
}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
