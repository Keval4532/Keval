import React from "react";

// Lightweight markdown renderer: ## headings, - bullets, 1. numbered, **bold**
export function Markdown({ text }) {
  if (!text) return null;
  const lines = text.split("\n");
  const blocks = [];
  let list = null;

  const inline = (str) =>
    str.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
      p.startsWith("**") ? <strong key={j} className="font-semibold text-white">{p.slice(2, -2)}</strong> : p
    );

  const flush = () => {
    if (list) { blocks.push(list); list = null; }
  };

  lines.forEach((raw, i) => {
    const line = raw.trimEnd();
    if (!line.trim()) { flush(); return; }
    if (/^#{2,3}\s/.test(line)) {
      flush();
      const t = line.replace(/^#{2,3}\s/, "");
      blocks.push(
        <h3 key={`h-${i}`} className="mt-6 mb-2 flex items-center gap-2 font-display text-lg text-cyan-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />{t}
        </h3>
      );
    } else if (/^\s*[-*]\s+/.test(line)) {
      if (!list || list.type !== "ul") { flush(); list = { type: "ul", items: [], key: `ul-${i}` }; }
      list.items.push(line.replace(/^\s*[-*]\s+/, ""));
    } else if (/^\s*\d+\.\s+/.test(line)) {
      if (!list || list.type !== "ol") { flush(); list = { type: "ol", items: [], key: `ol-${i}` }; }
      list.items.push(line.replace(/^\s*\d+\.\s+/, ""));
    } else {
      flush();
      blocks.push(<p key={`p-${i}`} className="mb-2 leading-relaxed text-white/75">{inline(line)}</p>);
    }
  });
  flush();

  return (
    <div className="text-sm">
      {blocks.map((b) => {
        if (b.type === "ul" || b.type === "ol") {
          const Tag = b.type === "ol" ? "ol" : "ul";
          return (
            <Tag key={b.key} className={`mb-3 space-y-1.5 ${b.type === "ol" ? "list-decimal" : "list-disc"} pl-5`}>
              {b.items.map((it, k) => <li key={k} className="text-white/75 marker:text-cyan-400">{inline(it)}</li>)}
            </Tag>
          );
        }
        return b;
      })}
    </div>
  );
}
