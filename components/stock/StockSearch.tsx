"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import type { SearchResult } from "@/lib/alphaVantage";

const POPULAR = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "NVDA", name: "NVIDIA Corp." },
  { symbol: "MSFT", name: "Microsoft Corp." },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "AMZN", name: "Amazon.com Inc." },
];

export default function StockSearch({ onSelect }: { onSelect: (symbol: string) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (v: string) => {
    setQuery(v);
    if (timer.current) clearTimeout(timer.current);
    if (!v.trim()) { setResults([]); return; }
    setLoading(true);
    timer.current = setTimeout(async () => {
      const res = await fetch(`/api/stock?fn=search&keywords=${encodeURIComponent(v)}`);
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
      setLoading(false);
    }, 500);
  };

  const select = (symbol: string) => {
    onSelect(symbol);
    setQuery("");
    setOpen(false);
    setResults([]);
  };

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus-within:border-indigo-500/60 transition-colors">
        <Search size={16} className="text-slate-500 flex-shrink-0" />
        <input
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="종목명 또는 티커 검색 (예: AAPL)"
          className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-600 outline-none"
        />
        {query && (
          <button onClick={() => { setQuery(""); setResults([]); }}>
            <X size={14} className="text-slate-500 hover:text-white transition-colors" />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute top-full mt-2 w-full bg-[#13131f] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
          {loading && (
            <p className="text-xs text-slate-500 px-4 py-3">검색 중...</p>
          )}
          {!loading && results.length > 0 && (
            <ul>
              {results.map((r) => (
                <li key={r.symbol}>
                  <button
                    onClick={() => select(r.symbol)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors text-left"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{r.symbol}</p>
                      <p className="text-xs text-slate-500 truncate max-w-[200px]">{r.name}</p>
                    </div>
                    <span className="text-xs text-slate-600">{r.region}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {!loading && results.length === 0 && (
            <div className="px-4 py-3">
              <p className="text-xs text-slate-500 mb-3">인기 종목</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR.map((p) => (
                  <button
                    key={p.symbol}
                    onClick={() => select(p.symbol)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 hover:border-indigo-500/40 hover:text-white transition-colors"
                  >
                    {p.symbol}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
