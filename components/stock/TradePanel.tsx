"use client";

import { useState, useEffect } from "react";
import type { GlobalQuote } from "@/lib/alphaVantage";

const INITIAL_BALANCE = 10_000_000;

type Holding = { symbol: string; qty: number; avgPrice: number };

export default function TradePanel({ symbol }: { symbol: string }) {
  const [quote, setQuote] = useState<GlobalQuote | null>(null);
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [qty, setQty] = useState(1);
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("stock_balance");
    const savedHoldings = localStorage.getItem("stock_holdings");
    if (saved) setBalance(Number(saved));
    if (savedHoldings) setHoldings(JSON.parse(savedHoldings));
  }, []);

  useEffect(() => {
    if (!symbol) return;
    fetch(`/api/stock?fn=quote&symbol=${symbol}`)
      .then((r) => r.json())
      .then(setQuote);
  }, [symbol]);

  const save = (b: number, h: Holding[]) => {
    setBalance(b);
    setHoldings(h);
    localStorage.setItem("stock_balance", String(b));
    localStorage.setItem("stock_holdings", JSON.stringify(h));
  };

  const flash = (type: "ok" | "err", text: string) => {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3000);
  };

  const price = quote?.price ?? 0;
  const totalCost = price * qty;
  const holding = holdings.find((h) => h.symbol === symbol);
  const holdingQty = holding?.qty ?? 0;

  const handleBuy = () => {
    if (!price) return flash("err", "가격 정보를 불러오는 중입니다.");
    if (balance < totalCost) return flash("err", "잔액이 부족합니다.");
    const newHoldings = holdings.map((h) => {
      if (h.symbol !== symbol) return h;
      const newQty = h.qty + qty;
      return { ...h, qty: newQty, avgPrice: (h.avgPrice * h.qty + totalCost) / newQty };
    });
    if (!newHoldings.find((h) => h.symbol === symbol)) {
      newHoldings.push({ symbol, qty, avgPrice: price });
    }
    save(balance - totalCost, newHoldings);
    flash("ok", `${symbol} ${qty}주 매수 완료`);
  };

  const handleSell = () => {
    if (!price) return flash("err", "가격 정보를 불러오는 중입니다.");
    if (holdingQty < qty) return flash("err", `보유 수량(${holdingQty}주)이 부족합니다.`);
    const newHoldings = holdings
      .map((h) => h.symbol === symbol ? { ...h, qty: h.qty - qty } : h)
      .filter((h) => h.qty > 0);
    save(balance + totalCost, newHoldings);
    flash("ok", `${symbol} ${qty}주 매도 완료`);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="text-sm font-bold text-white mb-4">모의 투자</h3>

      {/* 잔액 */}
      <div className="mb-4 p-3 bg-white/5 rounded-xl">
        <p className="text-xs text-slate-500 mb-1">보유 현금</p>
        <p className="text-lg font-bold text-white">
          {balance.toLocaleString("ko-KR")}원
        </p>
        {holdingQty > 0 && (
          <p className="text-xs text-slate-400 mt-1">
            {symbol} 보유 <span className="text-indigo-300 font-semibold">{holdingQty}주</span>
            {holding && (
              <span className="ml-2 text-slate-500">평균단가 ${holding.avgPrice.toFixed(2)}</span>
            )}
          </p>
        )}
      </div>

      {/* 매수/매도 탭 */}
      <div className="flex gap-1 mb-4 bg-white/5 rounded-xl p-1">
        {(["buy", "sell"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              mode === m
                ? m === "buy"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            {m === "buy" ? "매수" : "매도"}
          </button>
        ))}
      </div>

      {/* 수량 */}
      <div className="mb-4">
        <label className="text-xs text-slate-500 mb-1.5 block">수량 (주)</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors text-sm font-bold"
          >−</button>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white text-center outline-none focus:border-indigo-500/50"
          />
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors text-sm font-bold"
          >+</button>
        </div>
      </div>

      {/* 예상 금액 */}
      <div className="mb-4 flex justify-between text-xs text-slate-500">
        <span>주당 가격</span>
        <span className="text-white">${price.toFixed(2)}</span>
      </div>
      <div className="mb-4 flex justify-between text-sm font-semibold">
        <span className="text-slate-400">총 {mode === "buy" ? "매수" : "매도"} 금액</span>
        <span className="text-white">${totalCost.toFixed(2)}</span>
      </div>

      {/* 실행 버튼 */}
      <button
        onClick={mode === "buy" ? handleBuy : handleSell}
        className={`w-full py-2.5 rounded-xl text-sm font-bold transition-colors ${
          mode === "buy"
            ? "bg-emerald-500 hover:bg-emerald-400 text-white"
            : "bg-rose-500 hover:bg-rose-400 text-white"
        }`}
      >
        {mode === "buy" ? "매수하기" : "매도하기"}
      </button>

      {/* 피드백 메시지 */}
      {msg && (
        <p className={`mt-3 text-xs text-center font-medium ${msg.type === "ok" ? "text-emerald-400" : "text-rose-400"}`}>
          {msg.text}
        </p>
      )}
    </div>
  );
}
