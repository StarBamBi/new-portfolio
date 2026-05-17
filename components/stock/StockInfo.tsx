"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { GlobalQuote } from "@/lib/alphaVantage";

export default function StockInfo({ symbol }: { symbol: string }) {
  const [quote, setQuote] = useState<GlobalQuote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!symbol) return;
    setLoading(true);
    fetch(`/api/stock?fn=quote&symbol=${symbol}`)
      .then((r) => r.json())
      .then((d) => { setQuote(d); setLoading(false); });
  }, [symbol]);

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="h-10 bg-white/5 rounded-xl w-48" />
        <div className="h-5 bg-white/5 rounded-xl w-32" />
      </div>
    );
  }

  if (!quote) {
    return <p className="text-slate-500 text-sm">종목 정보를 불러올 수 없습니다.</p>;
  }

  const isUp = quote.change >= 0;

  return (
    <div>
      {/* 종목명 + 심볼 */}
      <div className="flex items-center gap-3 mb-1">
        <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/20">
          {quote.symbol}
        </span>
        <span className="text-xs text-slate-500">{quote.latestTradingDay}</span>
      </div>

      {/* 현재가 */}
      <div className="flex items-end gap-3 mb-3">
        <span className="text-4xl font-extrabold text-white">
          ${quote.price.toFixed(2)}
        </span>
        <div className={`flex items-center gap-1 mb-1 ${isUp ? "text-emerald-400" : "text-rose-400"}`}>
          {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className="text-sm font-semibold">
            {isUp ? "+" : ""}{quote.change.toFixed(2)} ({isUp ? "+" : ""}{quote.changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      {/* 세부 지표 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "시가", value: `$${quote.open.toFixed(2)}` },
          { label: "고가", value: `$${quote.high.toFixed(2)}` },
          { label: "저가", value: `$${quote.low.toFixed(2)}` },
          { label: "전일 종가", value: `$${quote.previousClose.toFixed(2)}` },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5">
            <p className="text-xs text-slate-500 mb-1">{label}</p>
            <p className="text-sm font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
