"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import StockSearch from "@/components/stock/StockSearch";
import StockInfo from "@/components/stock/StockInfo";
import StockChart from "@/components/stock/StockChart";
import TradePanel from "@/components/stock/TradePanel";
import Watchlist from "@/components/stock/Watchlist";

export default function StockPage() {
  const [symbol, setSymbol] = useState("AAPL");

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-40 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              포트폴리오
            </Link>
            <div className="w-px h-4 bg-white/10" />
            <span className="text-sm font-semibold text-white">주식 대시보드</span>
            <span className="text-xs text-slate-500 hidden sm:block">— 모의 투자 연습용</span>
          </div>
          <StockSearch onSelect={setSymbol} />
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

          {/* 왼쪽: 종목 정보 + 차트 */}
          <div className="space-y-6">
            {/* 종목 정보 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <StockInfo symbol={symbol} />
            </div>

            {/* 차트 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-4">가격 차트</h3>
              <StockChart symbol={symbol} />
            </div>

            {/* 초보자 가이드 */}
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-5">
              <p className="text-xs font-semibold text-indigo-300 mb-2">초보자 가이드</p>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">•</span>
                  주식은 회사의 일부를 소유하는 것입니다. 주가가 오르면 수익이, 내리면 손실이 생깁니다.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">•</span>
                  모의 투자로 연습한 뒤 실제 투자를 시작하세요. 처음 지급된 1,000만원으로 자유롭게 연습할 수 있습니다.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">•</span>
                  주가 데이터는 Alpha Vantage API 기준이며 15분 지연될 수 있습니다.
                </li>
              </ul>
            </div>
          </div>

          {/* 오른쪽: 관심종목 + 모의 거래 */}
          <div className="space-y-6">
            <Watchlist selectedSymbol={symbol} onSelect={setSymbol} />
            <TradePanel symbol={symbol} />
          </div>
        </div>
      </main>
    </div>
  );
}
