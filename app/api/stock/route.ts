import { NextRequest, NextResponse } from "next/server";
import { getGlobalQuote, getDailyPrices, searchSymbol } from "@/lib/alphaVantage";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fn = searchParams.get("fn");
  const symbol = searchParams.get("symbol") ?? "";
  const keywords = searchParams.get("keywords") ?? "";

  try {
    if (fn === "quote") {
      const data = await getGlobalQuote(symbol);
      return NextResponse.json(data);
    }
    if (fn === "daily") {
      const data = await getDailyPrices(symbol);
      return NextResponse.json(data);
    }
    if (fn === "search") {
      const data = await searchSymbol(keywords);
      return NextResponse.json(data);
    }
    return NextResponse.json({ error: "Unknown function" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "API error" }, { status: 500 });
  }
}
