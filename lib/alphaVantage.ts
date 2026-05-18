const BASE_URL = "https://www.alphavantage.co/query";
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY!;

export type DailyPrice = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type GlobalQuote = {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  latestTradingDay: string;
  previousClose: number;
  open: number;
  high: number;
  low: number;
};

export type SearchResult = {
  symbol: string;
  name: string;
  type: string;
  region: string;
  currency: string;
};

export async function getGlobalQuote(symbol: string): Promise<GlobalQuote | null> {
  const res = await fetch(
    `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`,
    { next: { revalidate: 300 } }
  );
  const data = await res.json();
  if (data["Note"] || data["Information"]) return null;
  const series = data["Time Series (Daily)"];
  if (!series) return null;

  const dates = Object.keys(series).sort().reverse();
  if (dates.length < 2) return null;

  const today = series[dates[0]] as Record<string, string>;
  const prev = series[dates[1]] as Record<string, string>;

  const price = parseFloat(today["4. close"]);
  const previousClose = parseFloat(prev["4. close"]);
  const change = price - previousClose;
  const changePercent = (change / previousClose) * 100;

  return {
    symbol,
    price,
    change,
    changePercent,
    volume: parseInt(today["5. volume"]),
    latestTradingDay: dates[0],
    previousClose,
    open: parseFloat(today["1. open"]),
    high: parseFloat(today["2. high"]),
    low: parseFloat(today["3. low"]),
  };
}

export async function getDailyPrices(symbol: string): Promise<DailyPrice[]> {
  const res = await fetch(
    `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  if (data["Note"] || data["Information"]) return [];
  const series = data["Time Series (Daily)"];
  if (!series) return [];

  return Object.entries(series)
    .slice(0, 90)
    .map(([date, values]: [string, unknown]) => {
      const v = values as Record<string, string>;
      return {
        date,
        open: parseFloat(v["1. open"]),
        high: parseFloat(v["2. high"]),
        low: parseFloat(v["3. low"]),
        close: parseFloat(v["4. close"]),
        volume: parseInt(v["5. volume"]),
      };
    })
    .reverse();
}

export async function searchSymbol(keywords: string): Promise<SearchResult[]> {
  const res = await fetch(
    `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(keywords)}&apikey=${API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const matches = data["bestMatches"];
  if (!matches) return [];

  return matches.slice(0, 6).map((m: Record<string, string>) => ({
    symbol: m["1. symbol"],
    name: m["2. name"],
    type: m["3. type"],
    region: m["4. region"],
    currency: m["8. currency"],
  }));
}
