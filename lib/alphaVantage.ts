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
    `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  const q = data["Global Quote"];
  if (!q || !q["05. price"]) return null;

  return {
    symbol: q["01. symbol"],
    price: parseFloat(q["05. price"]),
    change: parseFloat(q["09. change"]),
    changePercent: parseFloat(q["10. change percent"].replace("%", "")),
    volume: parseInt(q["06. volume"]),
    latestTradingDay: q["07. latest trading day"],
    previousClose: parseFloat(q["08. previous close"]),
    open: parseFloat(q["02. open"]),
    high: parseFloat(q["03. high"]),
    low: parseFloat(q["04. low"]),
  };
}

export async function getDailyPrices(symbol: string): Promise<DailyPrice[]> {
  const res = await fetch(
    `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
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
