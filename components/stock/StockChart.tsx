"use client";

import { useState, useEffect } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";
import type { DailyPrice } from "@/lib/alphaVantage";

const PERIODS = [
  { label: "1M", days: 21 },
  { label: "3M", days: 63 },
  { label: "6M", days: 126 },
  { label: "전체", days: 90 },
];

export default function StockChart({ symbol }: { symbol: string }) {
  const [data, setData] = useState<DailyPrice[]>([]);
  const [period, setPeriod] = useState("1M");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!symbol) return;
    setLoading(true);
    fetch(`/api/stock?fn=daily&symbol=${symbol}`)
      .then((r) => r.json())
      .then((d) => { setData(Array.isArray(d) ? d : []); setLoading(false); });
  }, [symbol]);

  const days = PERIODS.find((p) => p.label === period)?.days ?? 21;
  const sliced = data.slice(-days);

  const isUp = sliced.length >= 2 && sliced[sliced.length - 1].close >= sliced[0].close;
  const color = isUp ? "#34d399" : "#f87171";

  const formatDate = (d: string) => {
    const [, m, day] = d.split("-");
    return `${m}/${day}`;
  };

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-[#13131f] border border-white/10 rounded-xl px-3 py-2 text-xs">
        <p className="text-slate-400 mb-1">{label}</p>
        <p className="text-white font-semibold">${payload[0].value.toFixed(2)}</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="h-56 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="h-56 flex items-center justify-center text-slate-500 text-sm">
        데이터를 불러올 수 없습니다
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-1 mb-4">
        {PERIODS.map((p) => (
          <button
            key={p.label}
            onClick={() => setPeriod(p.label)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              period === p.label
                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={sliced} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: 10, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            interval={Math.floor(sliced.length / 4)}
          />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fontSize: 10, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v}`}
            width={55}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="close"
            stroke={color}
            strokeWidth={2}
            fill="url(#colorClose)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
