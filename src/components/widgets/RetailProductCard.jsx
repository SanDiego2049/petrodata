import { useState, useEffect } from "react";
import LineChart from "../../charts/LineChart";
import fullData from "../../data/data.json";

const COMMODITIES = ["PMS", "AGO", "DPK", "LPG"];

const COMMODITY_INFO = {
  PMS: { name: "Premium Motor Spirit", symbol: "PMS" },
  AGO: { name: "Automotive Gas Oil", symbol: "AGO" },
  DPK: { name: "Dual Purpose Kerosene", symbol: "DPK" },
  LPG: { name: "Liquefied Petroleum Gas", symbol: "LPG" },
};

const getTimeseries = (data, commodity, state) => {
  const filtered = data
    .filter((item) => item.State === state && item[commodity])
    .sort((a, b) => new Date(a.Period) - new Date(b.Period));

  return {
    prices: filtered.map((item) => item[commodity]),
    dates: filtered.map((item) => item.Period),
  };
};

const calculatePriceStats = (prices) => {
  if (!prices.length) return { highest: 0, median: 0, lowest: 0 };

  const sorted = [...prices].sort((a, b) => a - b);
  const highest = Math.max(...prices);
  const lowest = Math.min(...prices);
  const median =
    sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];

  return { highest, median, lowest };
};

const RetailProductCard = ({ size = "small", preview = false }) => {
  const [commodity, setCommodity] = useState("PMS");
  const [state, setState] = useState("Abuja");
  const [prices, setPrices] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const { prices, dates } = getTimeseries(fullData, commodity, state);
    setPrices(prices);
    setDates(dates);
  }, [commodity, state]);

  const current = prices.at(-1) || 0;
  const previous = prices.at(-2) || prices[0] || 0;
  const change = current - previous;
  const percentage = previous ? (change / previous) * 100 : 0;
  const isPositive = change >= 0;

  const uniqueStates = [...new Set(fullData.map((d) => d.State))];
  const stats = calculatePriceStats(prices);

  const cardWidths = {
    small: "min-w-full max-w-100",
    medium: "min-w-full max-w-200",
    large: "min-w-full max-w-100",
  };

  const cardHeights = {
    small: "h-100",
    medium: "h-100",
    large: "h-120",
  };

  const chartHeights = {
    small: "max-h-32",
    medium: "max-h-20",
    large: "max-h-35",
  };

  if (preview) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white dark:bg-[#171717] rounded-xl text-black dark:text-white">
        <div className="flex flex-wrap h-20 items-center justify-center gap-2 text-center text-sm px-2 py-3">
          <span className="font-semibold truncate">
            {COMMODITY_INFO[commodity].symbol}
          </span>
          <span className="text-xs font-medium">₦{current.toFixed(2)}</span>
          <div
            className={`w-0 h-0 border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent ${
              isPositive
                ? "border-b-[10px] border-b-green-400"
                : "border-t-[10px] border-t-red-400"
            }`}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-6 ${cardWidths[size]} ${cardHeights[size]} flex flex-col h-full bg-white dark:bg-[#171717] rounded-3xl text-black dark:text-white`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="w-100">
          <div className="flex items-center gap-1">
            <div
              className={`w-0 h-0 border-l-[8px] border-r-[8px] border-l-transparent border-r-transparent ${
                isPositive
                  ? "border-b-[12px] border-b-green-400"
                  : "border-t-[12px] border-t-red-400"
              }`}
            ></div>
            <span className="text-lg font-semibold">
              {COMMODITY_INFO[commodity].symbol}
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {COMMODITY_INFO[commodity].name}
          </div>
        </div>
        <div className="text-right">
          <div
            className={`text-lg font-semibold ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}
            {change.toFixed(2)}
          </div>
          <div
            className={`text-sm ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}
            {percentage.toFixed(2)}%
          </div>
        </div>
      </div>

      {size === "small" && (
        <div className={`mb-6 ${chartHeights[size]}`}>
          <LineChart
            prices={prices}
            dates={dates}
            isDown={!isPositive}
            size={size}
            showGrid={false}
            showXAxisLabels={false}
          />
        </div>
      )}

      {size === "medium" && (
        <div className="flex gap-6 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Highest</span>
              <span className="text-black dark:text-white font-medium">
                {stats.highest.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Median</span>
              <span className="text-black dark:text-white font-medium">
                {stats.median.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Lowest</span>
              <span className="text-black dark:text-white font-medium">
                {stats.lowest.toFixed(2)}
              </span>
            </div>
          </div>
          <div className={`flex-1 max-w-full ${chartHeights[size]}`}>
            <LineChart
              prices={prices}
              dates={dates}
              isDown={!isPositive}
              size={size}
              showGrid
              showXAxisLabels
            />
          </div>
        </div>
      )}

      {size === "large" && (
        <>
          <div className="flex gap-6 mb-6">
            <div className="flex gap-12 mx-auto">
              {Object.entries(stats).map(([label, value]) => (
                <div key={label} className="flex flex-col items-start">
                  <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {label}
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    {value.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className={chartHeights[size]}>
            <LineChart
              prices={prices}
              dates={dates}
              isDown={!isPositive}
              size={size}
              showGrid
              showXAxisLabels
              showYAxisLabels
            />
          </div>
        </>
      )}

      <div className="text-3xl text-center font-bold mb-6">
        ₦{current.toFixed(2)}
      </div>

      <div className="flex gap-0 border-t border-gray-300 dark:border-gray-700">
        {COMMODITIES.map((c) => (
          <button
            key={c}
            onClick={() => setCommodity(c)}
            className={`px-4 py-2 text-sm flex-1 relative transition-colors ${
              commodity === c
                ? "text-green-500 dark:text-green-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
            }`}
          >
            {commodity === c && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-green-500 dark:bg-green-400" />
            )}
            {c}
          </button>
        ))}
      </div>

      <div className="mt-auto">
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="bg-white dark:bg-[#171717] text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded px-2 py-1 opacity-80"
        >
          {uniqueStates.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RetailProductCard;
