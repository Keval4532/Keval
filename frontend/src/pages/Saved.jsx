import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, Trash2, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { getSaved, deleteSaved, getDeviceId } from "../lib/api";

export default function Saved() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getSaved(getDeviceId()).then(setItems).catch(() => setItems([])).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const remove = async (subject) => {
    await deleteSaved(getDeviceId(), subject);
    const list = JSON.parse(localStorage.getItem("apex_saved_local") || "[]").filter((s) => s !== subject);
    localStorage.setItem("apex_saved_local", JSON.stringify(list));
    toast.success("Removed");
    load();
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-cyan-400"><Bookmark className="h-3.5 w-3.5" /> Knowledge library</div>
        <h1 className="mt-2 font-display text-4xl font-light tracking-tight sm:text-5xl">Saved</h1>
      </div>

      {loading ? (
        <div className="text-sm text-white/40">Loading…</div>
      ) : items.length === 0 ? (
        <div className="border border-dashed border-white/10 p-12 text-center">
          <Bookmark className="mx-auto mb-3 h-8 w-8 text-white/20" />
          <div className="text-white/60">No saved topics yet.</div>
          <button onClick={() => navigate("/explore")} className="mt-4 rounded-lg bg-cyan-400 px-4 py-2 text-sm text-black">Explore topics</button>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.id} data-testid={`saved-item-${it.subject.replace(/\W/g, "")}`} className="group border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-cyan-400/30">
              <div className="mb-2 flex items-start justify-between">
                <span className="rounded-full border border-cyan-400/30 px-2 py-0.5 text-[9px] uppercase tracking-widest text-cyan-400">{it.category || it.query_type}</span>
                <button data-testid={`saved-delete-${it.subject.replace(/\W/g, "")}`} onClick={() => remove(it.subject)} className="text-white/30 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
              </div>
              <button onClick={() => navigate(`/result?q=${encodeURIComponent(it.query)}&level=intermediate`)} className="text-left">
                <div className="flex items-center gap-1.5 font-display text-lg group-hover:text-cyan-300">{it.subject} <ArrowUpRight className="h-4 w-4 text-white/30" /></div>
                {it.one_liner && <p className="mt-1 line-clamp-2 text-sm text-white/50">{it.one_liner}</p>}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
