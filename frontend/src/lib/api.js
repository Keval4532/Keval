import axios from "axios";

// In production on Vercel or any remote domain, ALWAYS use relative path "" so requests route to /api on the same origin.
// In local development, fall back to localhost:8000 if running separate dev servers.
const isProd = 
  process.env.NODE_ENV === "production" || 
  (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1");

const BACKEND_URL = isProd 
  ? "" 
  : (process.env.REACT_APP_BACKEND_URL || "http://localhost:8000");

export const API = BACKEND_URL ? `${BACKEND_URL}/api` : "/api";

const client = axios.create({ baseURL: API, timeout: 180000 });

// Automatically attach JWT token if available
client.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("kevalbio_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // localStorage might not be available in SSR
  }
  return config;
});

export const analyzeQuery = async (query, level = "intermediate", mode = null, profile = null, timeframe = "all") => {
  const { data } = await client.post("/analyze", { query, level, mode, profile, timeframe });
  return data;
};

export const analyzeProblem = async (query, profile = null, region_hint = null) => {
  const { data } = await client.post("/problem", { query, profile, region_hint });
  return data;
};

export const getResearch = async (query, timeframe = "all") => {
  const { data } = await client.post("/research", { query, timeframe });
  return data;
};

export const analyzeDiet = async (meals, profile = null) => {
  const { data } = await client.post("/nutrition/analyze-diet", { meals, profile });
  return data;
};

export const analyzeStack = async (stack) => {
  const { data } = await client.post("/supplements/analyze-stack", { stack });
  return data;
};

export const askApex = async (payload) => {
  const { data } = await client.post("/ask", payload);
  return data;
};

export const askCoach = async (payload) => {
  const { data } = await client.post("/coach", payload);
  return data;
};

export const saveProfile = async (payload) => {
  const { data } = await client.post("/profile", payload);
  return data;
};

export const getProfile = async (deviceId) => {
  const { data } = await client.get(`/profile/${deviceId}`);
  return data;
};

export const getLocalProfile = () => {
  try {
    const p = JSON.parse(localStorage.getItem("apex_profile") || "null");
    if (p && Object.values(p).some((v) => v)) return p;
  } catch { /* ignore */ }
  return null;
};

export const addTracking = async (payload) => {
  const { data } = await client.post("/tracking", payload);
  return data;
};

export const getTracking = async (deviceId) => {
  const { data } = await client.get(`/tracking/${deviceId}`);
  return data;
};

export const getExplore = async () => {
  const { data } = await client.get("/explore");
  return data;
};

export const getTrending = async () => {
  const { data } = await client.get("/trending");
  return data;
};

export const saveTopic = async (payload) => {
  const { data } = await client.post("/saved", payload);
  return data;
};

export const getSaved = async (deviceId) => {
  const { data } = await client.get(`/saved/${deviceId}`);
  return data;
};

export const deleteSaved = async (deviceId, subject) => {
  const { data } = await client.delete(`/saved/${deviceId}/${encodeURIComponent(subject)}`);
  return data;
};

export const getDailyLesson = async () => {
  const { data } = await client.get("/daily-lesson");
  return data;
};

export const submitFeedback = async (payload) => {
  const { data } = await client.post("/feedback", payload);
  return data;
};

export const getCaffeineClearance = async (payload) => {
  const { data } = await client.post("/tools/caffeine-clearance", payload);
  return data;
};

export const scanMealText = async (meal_text, profile = null) => {
  const { data } = await client.post("/nutrition/scan-meal-text", { meal_text, profile });
  return data;
};

export const getPersonaExplain = async (subject, persona, context = "") => {
  const { data } = await client.post("/persona-explain", { subject, persona, context });
  return data;
};

export const getExperimentTemplates = async () => {
  const { data } = await client.get("/experiments/templates");
  return data;
};

export const getActiveExperiment = async (deviceId) => {
  const { data } = await client.get(`/experiments/active/${deviceId}`);
  return data;
};

export const startExperiment = async (payload) => {
  const { data } = await client.post("/experiments/start", payload);
  return data;
};

export const checkinExperiment = async (payload) => {
  const { data } = await client.post("/experiments/check-in", payload);
  return data;
};

export const getSubscriptionStatus = async (deviceId) => {
  const { data } = await client.get(`/subscription/status/${deviceId}`);
  return data;
};

export const createCheckoutSession = async (payload) => {
  const { data } = await client.post("/subscription/create-checkout", payload);
  return data;
};

export const upgradeSubscriptionSimulation = async (payload) => {
  const { data } = await client.post("/subscription/upgrade-simulation", payload);
  return data;
};

export const scanLabReport = async (markers = [], raw_text = "") => {
  const { data } = await client.post("/tools/scan-lab", { markers, raw_text });
  return data;
};

export const getLabBiomarkers = async () => {
  const { data } = await client.get("/tools/lab-biomarkers");
  return data;
};

export const getCircadianWindows = async (payload) => {
  const { data } = await client.post("/tools/circadian-calc", payload);
  return data;
};

export const getFastingTimeline = async (payload) => {
  const { data } = await client.post("/tools/fasting-calc", payload);
  return data;
};

export const getFastBreakers = async () => {
  const { data } = await client.get("/tools/fast-breakers");
  return data;
};

export const getHydrationCalc = async (payload) => {
  const { data } = await client.post("/tools/hydration-calc", payload);
  return data;
};

export const auditSupplementFormula = async (formula_text) => {
  const { data } = await client.post("/tools/supplement-audit", { formula_text });
  return data;
};

// ----------------------------- Authentication & Provisioning APIs -----------------------------

export const loginUser = async ({ email, password, remember_me = false }) => {
  const { data } = await client.post("/auth/login", { email, password, remember_me });
  return data;
};

export const getAuthMe = async () => {
  const { data } = await client.get("/auth/me");
  return data;
};

export const logoutUser = async () => {
  const { data } = await client.post("/auth/logout");
  return data;
};

export const provisionSubscriberApi = async (payload) => {
  const { data } = await client.post("/auth/provision-subscriber", payload);
  return data;
};

export const forgotPasswordApi = async ({ email }) => {
  const { data } = await client.post("/auth/forgot-password", { email });
  return data;
};

export const demoLoginApi = async (payload = { tier: "PRO_ANNUAL" }) => {
  const { data } = await client.post("/auth/demo-login", payload);
  return data;
};

export const getDeviceId = () => {
  let id = localStorage.getItem("apexbio_device");
  if (!id) {
    id = "dev_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("apexbio_device", id);
  }
  return id;
};
