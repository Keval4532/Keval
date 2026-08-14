import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { LayoutDashboard, Plus, Moon, Beef, Dumbbell, Droplets } from "lucide-react";
import { toast } from "sonner";
import { addTracking, getTracking, getDeviceId } from "../lib/api";

const METRICS = [
  { key: "sleep", label: "Sleep", unit: "hrs", color: "#00F0FF", icon: Moon, step: "0.5", placeholder: "7.5" },
  { key: "protein", label: "Protein", unit: "g", color: "#00E676", icon: Beef, step: "5", placeholder: "150" },
  { key: "training", label: "Training", unit: "min", color: "#FF9F0A", icon: Dumbbell, step: "5", placeholder: "60" },
  { key: "water", label: "Water", unit: "L", color: "#64D2FF", icon: Droplets, step: "0.25", placeholder: "2.5" },
];

const today = () => new Date().toISOString().slice(0, 10);

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [date, setDate] = useState(today());
  const [form, setForm] = useState({ sleep: "", protein: "", training: "", water: "" });
  const [saving, setSaving] = useState(false);

  const load = () => getTracking(getDeviceId()).then(setEntries).catch(() => setEntries([]));
  useEffect(() => { load(); }, []);

  useEffect(() => {
    const existing = entries.find((e) => e.date === date);
    setForm({
      sleep: existing?.sleep ?? "", protein: existing?.protein ?? "",
      training: existing?.training ?? "", water: existing?.water ?? "",
    });
  }, [date, entries]);

  const save = async () => {
    const payload = { device_id: getDeviceId(), date };
    let any = false;
    METRICS.forEach((m) => {
      if (form[m.key] !== "" && form[m.key] !== null) { payload[m.key] = parseFloat(form[m.key]); any = true; }
    });
    if (!any) { toast.error("Enter at least one value"); return; }
    setSaving(true);
    try {
      await addTracking(payload);
      toast.success(`Logged ${date}`);
      await load();
    } catch { toast.error("Could not save"); } finally { setSaving(false); }
  };

  const chartData = useMemo(
    () => entries.map((e) => ({ date: e.date.slice(5), ...e })),
    [entries]
  );

  const avg = (key) => {
    const last7 = entries.slice(-7).map((e) => e[key]).filter((v) => v != null);
    if (!last7.length) return null;
    return (last7.reduce((a, b) => a + b, 0) / last7.length).toFixed(1);
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-cyan-400"><LayoutDashboard className="h-3.5 w-3.5" /> Personal tracking</div>
        <h1 className="mt-2 font-display text-4xl font-light tracking-tight sm:text-5xl">My Dashboard</h1>
        <p className="mt-2 text-sm text-white/50">Log sleep, protein, training and water — then watch your trends build over time, Keval.</p>
      </div>

      {/* Averages */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {METRICS.map((m) => (
          <motion.div key={m.key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="border border-white/10 bg-[#0A0A0A] p-4" data-testid={`stat-${m.key}`}>
            <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/40">
              <m.icon className="h-3.5 w-3.5" style={{ color: m.color }} /> {m.label}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-3xl font-light tabular-nums" style={{ color: m.color }}>{avg(m.key) ?? "—"}</span>
              <span className="text-xs text-white/40">{m.unit}</span>
            </div>
            <div className="mt-1 text-[10px] text-white/30">7-day average</div>
          </motion.div>
        ))}
      </div>

      {/* Log form */}
      <div className="mb-8 border border-white/10 bg-[#0A0A0A] p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">Log a day</div>
          <input data-testid="dashboard-date" type="date" value={date} max={today()} onChange={(e) => setDate(e.target.value)}
            className="border border-white/10 bg-black px-3 py-1.5 text-xs text-white/70 focus:border-cyan-400/50 focus:outline-none" />
        </div>
        <div className="grid gap-4 sm:grid-cols-4">
          {METRICS.map((m) => (
            <div key={m.key}>
              <label className="mb-1.5 block text-xs text-white/50">{m.label} <span className="text-white/30">({m.unit})</span></label>
              <input data-testid={`input-${m.key}`} type="number" step={m.step} min="0" value={form[m.key]}
                onChange={(e) => setForm((f) => ({ ...f, [m.key]: e.target.value }))}
                placeholder={m.placeholder}
                className="w-full border border-white/10 bg-black px-3 py-2.5 text-sm focus:border-cyan-400/50 focus:outline-none" />
            </div>
          ))}
        </div>
        <button data-testid="dashboard-save" onClick={save} disabled={saving}
          className="mt-4 flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50">
          <Plus className="h-4 w-4" /> {saving ? "Saving…" : "Save entry"}
        </button>
      </div>

      {/* Charts */}
      {entries.length === 0 ? (
        <div className="border border-dashed border-white/10 p-12 text-center text-sm text-white/35">
          No data yet. Log your first day above to start building trends.
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {METRICS.map((m) => (
            <div key={m.key} className="border border-white/10 bg-[#0A0A0A] p-5" data-testid={`chart-${m.key}`}>
              <div className="mb-4 flex items-center gap-2 text-sm">
                <m.icon className="h-4 w-4" style={{ color: m.color }} />
                <span className="font-medium">{m.label}</span>
                <span className="text-xs text-white/40">({m.unit})</span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.15)", fontSize: 12, borderRadius: 8 }}
                    labelStyle={{ color: "#fff" }} />
                  <Line type="monotone" dataKey={m.key} stroke={m.color} strokeWidth={2} dot={{ r: 3, fill: m.color }}
                    activeDot={{ r: 5 }} connectNulls />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
