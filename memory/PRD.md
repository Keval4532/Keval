# ApexBio — Product Requirements Document

## Original Problem Statement
Build ApexBio — a premium AI-powered human physiology, nutrition, supplementation, fitness, recovery, and biohacking EDUCATION platform. Users ask what they want to understand about their body; ApexBio classifies the query and generates a structured, scientifically grounded learning dashboard. Tagline: "Understand Your Biology. Optimize Your Performance."

## User Choices (this build)
- AI model: **Claude Sonnet 4.6** (via Emergent LLM universal key, emergentintegrations)
- Scope: **Phase 1 MVP + core Explore library**
- Auth: **None yet** — open access, local + device-id saved topics
- Theme: design-agent decided → premium dark, clinical/futuristic, cyan/green accents
- Food sources: global/general

## Architecture
- **Backend** (FastAPI, `/app/backend/server.py`): `/api/analyze` (classify + generate structured JSON, cached in Mongo `topic_cache`), `/api/ask` (conversational follow-up, context-aware), `/api/explore` (category library), `/api/trending` (from analytics), `/api/saved` CRUD (device-id based). LLM via emergentintegrations `LlmChat` (anthropic/claude-sonnet-4-6), tolerant JSON parser + section normalization.
- **Frontend** (React + Tailwind + framer-motion + sonner): Home (hero search + level toggle), Result (tabbed topic dashboard, ScoreGauge, evidence badges, safety indicator, body-system map, Ask ApexBio panel, followups), Explore, Compare, Symptom Explorer, Lab Explorer, Saved. Layout with top nav + mobile bottom nav.

## Query types handled
nutrient/vitamin/mineral/supplement/hormone/physiology → full tabbed profile; symptom → ranked contributors (non-diagnostic); comparison → side-by-side table + verdict; lab → marker explainer.

## Implemented (2026-06)
- Intelligent AI query classification + universal education engine (all sections: what/why/affects/mechanism/uses/deficiency/food/absorption/requirements/supplementation/safety/interactions/timing/performance/biomarkers/myths/mistakes/if_low/if_too_much/research)
- Evidence badges, 0-100 Science Score gauge + rationale, safety traffic-light, emergency safety layer
- Beginner/Intermediate/Advanced learning levels, progressive disclosure (accordions/tabs)
- Body-system visualization, interactive food/interaction tables, myths, research
- Ask ApexBio contextual follow-up chat; Explore library; Compare; Symptom & Lab explorers; Saved topics; trending
- Response caching for speed

## Verified
- `/api/analyze` returns correct types for Magnesium (mineral, score 88, all sections), "Why am I always tired?" (symptom), "Creatine vs beta-alanine" (comparison). Home + Result pages render.

## Backlog (later phases)
- P1: Personalization engine (goals/profile), Daily Health Dashboard + trends, Apex Coach
- P2: Authentication (JWT or Google), user-scoped saves, Weekly Review, Personal Experiments
- P3: Admin panel, advanced analytics, Free vs Premium (Stripe) subscription
- P3: Streaming AI responses, richer body-system anatomy visualization

## Next tasks
Gather feedback on Phase 1, then implement personalization + dashboard.
