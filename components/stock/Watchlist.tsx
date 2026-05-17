"use client";

import { useState, useEffect } from "react";
import { Star, TrendingUp, TrendingDown } from "lucide-react";
import type { GlobalQuote } from "@/lib/alphaVantage";

const DEFAULT_WATCHLIST = ["AAPL", "TSLA", "NVDA", "MSFT"];

type QuoteMap = Record<string, GlobalQuote>;

export default function Watchlist({
  selectedSymbol,
  onSelect,
}: {
  selectedSymbol: string;
  onSelect: (symbol: string) => void;
}) {
  const [watchlist, setWatchlist] = useState<string[]>(DEFAULT_WATCHLIST);
  const [quotes, setQuotes] = useState<QuoteMap>({});

  useEffect(() => {
    const saved = localStorage.getItem("stock_watchlist");
    if (saved) setWatchlist(JSON.parse(saved));
  }, []);

  useEffect(() => {
    watchlist.forEach(async (sym) => {
      if (quotes[sym]) return;
      const res = await fetch(`/api/stock?fn=quote&symbol=${sym}`);
      const data = await res.json();
      if (data) setQuotes((prev) => ({ ...prev, [sym]: data }));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchlist]);

  const toggle = (sym: string) => {
    const next = watchlist.includes(sym)
      ? watchlist.filter((s) => s !== sym)
      : [...watchlist, sym];
    setWatchlist(next);
    localStorage.setItem("stock_watchlist", JSON.stringify(next));
  };

  const isStarred = watchlist.includes(selectedSymbol);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">관심 종목</h3>
        <button
          onClick={() => toggle(selectedSymbol)}
          className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-colors ${
            isStarred
              ? "bg-yellow-500/20 border-yellow-500/30 text-yellow-300"
              : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
          }`}
        >
          <Star size={12} className={isStarred ? "fill-yellow-300" : ""} />
          {isStarred ? "저장됨" : "추가"}
        </button>
      </div>

      <ul className="space-y-1">
        {watchlist.map((sym) => {
          const q = quotes[sym];
          const isUp = (q?.change ?? 0) >= 0;
          return (
            <li key={sym}>
              <button
                onClick={() => onSelect(sym)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors text-left ${
                  selectedSymbol === sym
                    ? "bg-indigo-500/15 border border-indigo-500/30"
                    : "hover:bg-white/5 border border-transparent"
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-white">{sym}</p>
                  {q && (
                    <p className="text-xs text-slate-500">${q.price.toFixed(2)}</p>
                  )}
                </div>
                {q && (
                  <div className={`flex items-center gap-1 text-xs font-medium ${isUp ? "text-emerald-400" : "text-rose-400"}`}>
                    {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {isUp ? "+" : ""}{q.changePercent.toFixed(2)}%
                  </div>
                )}
                {!q && (
                  <div className="w-10 h-3 bg-white/10 rounded animate-pulse" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
