import { useState, useEffect } from "react";
import LineChart from "../../charts/LineChart";
import fullData from "../../data/data.json";
import vanguard_icon from "../../assets/Publication.png";
import mockNews from "../../data/mockNews";

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

  const prices = filtered.map((item) => item[commodity]);
  const dates = filtered.map((item) => item.Period);
  return { prices, dates };
};

const RetailProductWithNewsCard = ({ size = "small", preview = false }) => {
  const [commodity, setCommodity] = useState("PMS");
  const [state, setState] = useState("Abuja");
  const [prices, setPrices] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const { prices, dates } = getTimeseries(fullData, commodity, state);
    setPrices(prices);
    setDates(dates);
  }, [commodity, state]);

  const currentPrice = prices[prices.length - 1] || 0;
  const previousPrice = prices[prices.length - 2] || prices[0] || 0;
  const priceChange = currentPrice - previousPrice;
  const isPositive = priceChange >= 0;

  const uniqueStates = [...new Set(fullData.map((d) => d.State))];

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
    medium: "max-h-15",
    large: "max-h-15",
  };

  const renderChart = () => (
    <LineChart
      prices={prices}
      dates={dates}
      isDown={!isPositive}
      size={size}
      showGrid={false}
      showXAxisLabels={false}
    />
  );

  if (preview) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white dark:bg-[#171717] rounded-xl text-black dark:text-white">
        <div className="flex flex-wrap h-20 truncate items-center justify-center gap-2 text-center text-sm px-2 py-3">
          <span className="font-semibold truncate">
            {COMMODITY_INFO[commodity].symbol}
          </span>
          <span className="text-xs font-medium">
            ₦{currentPrice.toFixed(2)}
          </span>
          <div
            className={`w-0 h-0 border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent ${
              isPositive
                ? "border-b-[10px] border-b-green-400"
                : "border-t-[10px] border-t-red-400"
            }`}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">With News</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col text-black dark:text-white p-6 rounded-3xl h-full bg-white dark:bg-[#171717] ${cardWidths[size]} ${cardHeights[size]}`}
    >
      {size === "small" && (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-0 h-0 border-l-[8px] border-r-[8px] border-l-transparent border-r-transparent ${
                  isPositive
                    ? "border-b-[12px] border-b-green-400"
                    : "border-t-[12px] border-t-red-400"
                }`}
              ></div>
              <span className="text-sm font-semibold">
                {COMMODITY_INFO[commodity].symbol}
              </span>
            </div>
            <div className="text-sm font-semibold">
              ₦{currentPrice.toFixed(2)}
            </div>
          </div>
          <div className={`${chartHeights[size]} mb-4`}>{renderChart()}</div>
        </>
      )}

      {(size === "medium" || size === "large") && (
        <div className="flex justify-between items-start gap-4 w-full">
          <div>
            <div className="flex items-center gap-1">
              <div
                className={`w-0 h-0 border-l-[8px] border-r-[8px] border-l-transparent border-r-transparent ${
                  isPositive
                    ? "border-b-[12px] border-b-green-400"
                    : "border-t-[12px] border-t-red-400"
                }`}
              ></div>
              <span className="text-sm font-semibold">
                {COMMODITY_INFO[commodity].symbol}
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {COMMODITY_INFO[commodity].name}
            </div>
          </div>
          <div
            className={`flex-1 ${size === "large" ? "max-w-30" : "max-w-70"} ${
              chartHeights[size]
            }`}
          >
            {renderChart()}
          </div>
          <div className="text-end">
            <div className="text-sm font-semibold mt-1">
              ₦{currentPrice.toFixed(2)}
            </div>
            <div
              className={`text-xs ${
                isPositive ? "text-green-400" : "text-red-400"
              }`}
            >
              {isPositive ? "+" : ""}
              {priceChange.toFixed(2)}
            </div>
          </div>
        </div>
      )}

      {(size === "medium" || size === "large") && (
        <div
          className={`${
            size === "large"
              ? "overflow-y-auto max-h-[250px] pr-2 scroll-smooth"
              : ""
          } flex flex-col gap-4 mb-6 scrollbar-thin dark:scrollbar-thumb-[#737373] scrollbar-track-transparent`}
        >
          {mockNews[commodity]
            .slice(0, size === "large" ? 5 : 2)
            .map((news, idx) => (
              <div
                key={idx}
                className="flex border-t border-gray-300 dark:border-[#36353A] pt-2 items-start gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <img src={vanguard_icon} alt="Vanguard" className="mt-1" />
                  </div>
                  <h4 className="text-sm font-semibold leading-snug">
                    {news.headline}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight mt-1">
                    {news.summary}
                  </p>
                </div>
                <img
                  src={news.image}
                  alt="News thumbnail"
                  className="w-16 h-16 object-cover rounded"
                />
              </div>
            ))}
        </div>
      )}

      <div className="flex gap-0 border-t border-gray-300 dark:border-gray-700">
        {COMMODITIES.map((c) => (
          <button
            key={c}
            onClick={() => setCommodity(c)}
            className={`px-4 py-2 text-sm flex-1 relative transition-colors ${
              commodity === c
                ? "text-green-500 dark:text-green-400"
                : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-gray-300"
            }`}
          >
            {commodity === c && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-green-500 dark:bg-green-400"></div>
            )}
            {c}
          </button>
        ))}
      </div>

      {size === "small" && (
        <div className="flex flex-col items-start gap-2 text-sm mb-4">
          <img src={vanguard_icon} alt="Vanguard" className="mt-2" />
          <p className="text-black dark:text-white text-lg leading-tight">
            {
              mockNews[commodity][
                Math.floor(Math.random() * mockNews[commodity].length)
              ]?.headline
            }
          </p>
        </div>
      )}

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

export default RetailProductWithNewsCard;
