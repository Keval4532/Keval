import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const client = axios.create({ baseURL: API, timeout: 180000 });

export const analyzeQuery = async (query, level = "intermediate", mode = null, profile = null) => {
  const { data } = await client.post("/analyze", { query, level, mode, profile });
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

export const getDeviceId = () => {
  let id = localStorage.getItem("apexbio_device");
  if (!id) {
    id = "dev_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("apexbio_device", id);
  }
  return id;
};
