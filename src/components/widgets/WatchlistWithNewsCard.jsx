import { useState, useEffect } from "react";
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

const CommodityItem = ({ commodity, data, size }) => {
  const { symbol, name } = COMMODITY_INFO[commodity];
  const current = data.prices[commodity] || 0;
  const { change, isPositive } = data.changes[commodity] || {};

  return (
    <div
      className={`flex justify-between items-start ${
        size === "small"
          ? "border-b border-gray-300 dark:border-[#333] py-2 items-center"
          : ""
      }`}
    >
      <div>
        <div className="flex items-center gap-1">
          <div
            className={`w-0 h-0 border-l-[8px] border-r-[8px] border-l-transparent border-r-transparent ${
              isPositive
                ? "border-b-[12px] border-b-green-400"
                : "border-t-[12px] border-t-red-400"
            }`}
          />
          <span className="text-sm font-semibold">{symbol}</span>
        </div>
        {size === "small" && (
          <div className="text-xs text-gray-500 dark:text-gray-400">{name}</div>
        )}
      </div>
      <div className="text-end">
        <div className="text-sm font-semibold">₦{current.toFixed(2)}</div>
        {size === "small" && (
          <div
            className={`text-xs ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}
            {change}
          </div>
        )}
      </div>
    </div>
  );
};

const NewsItem = ({ news }) => (
  <div className="flex border-t border-gray-300 dark:border-[#36353A] pt-2 items-start gap-4">
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <img src={vanguard_icon} alt="Vanguard" className="mt-1" />
      </div>
      <h4 className="text-sm font-semibold leading-snug">{news.headline}</h4>
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
);

const WatchlistWithNewsCard = ({ size = "small", preview = false }) => {
  const [state, setState] = useState("Abuja");
  const [allPrices, setAllPrices] = useState({});
  const [allChanges, setAllChanges] = useState({});

  const uniqueStates = [...new Set(fullData.map((d) => d.State))];

  useEffect(() => {
    const pricesObj = {};
    const changesObj = {};

    COMMODITIES.forEach((commodity) => {
      const { prices } = getTimeseries(fullData, commodity, state);
      const current = prices.at(-1) || 0;
      const previous = prices.at(-2) || prices[0] || 0;
      const isPositive = current >= previous;
      const change = current - previous;

      pricesObj[commodity] = current;
      changesObj[commodity] = {
        change: change.toFixed(2),
        isPositive,
      };
    });

    setAllPrices(pricesObj);
    setAllChanges(changesObj);
  }, [state]);

  // --- Preview Mode ---
  if (preview) {
    const firstCommodity = COMMODITIES[0];
    const current = allPrices[firstCommodity] || 0;
    const { change, isPositive } = allChanges[firstCommodity] || {};

    return (
      <div className="w-full h-full flex items-center justify-center bg-white dark:bg-[#171717] rounded-xl text-black dark:text-white">
        <div className="flex h-20 flex-wrap items-center justify-center gap-2 text-center text-sm px-2 py-3">
          <span className="font-semibold truncate">{firstCommodity}</span>
          <span className="text-xs font-medium">₦{current.toFixed(2)}</span>
          <div
            className={`w-0 h-0 border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent ${
              isPositive
                ? "border-b-[10px] border-b-green-400"
                : "border-t-[10px] border-t-red-400"
            }`}
          />
          <span
            className={`text-xs ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}
            {change}
          </span>
          <p className="text-xs text-gray-500 dark:text-gray-400">With News</p>
        </div>
      </div>
    );
  }

  const displayedCommodities =
    size === "small" ? COMMODITIES.slice(0, 3) : COMMODITIES;

  const renderCommodities = () => (
    <div
      className={`${
        size === "small"
          ? "flex flex-col gap-4 mb-4"
          : "grid grid-cols-2 gap-4 mb-4"
      }`}
    >
      {displayedCommodities.map((commodity) => (
        <CommodityItem
          key={commodity}
          commodity={commodity}
          data={{ prices: allPrices, changes: allChanges }}
          size={size}
        />
      ))}
    </div>
  );

  const renderNews = () => {
    if (size === "small") {
      return (
        <div className="flex flex-col items-start gap-2 text-sm mb-4">
          <img src={vanguard_icon} alt="Vanguard" className="mt-2" />
          <p className="text-black dark:text-white text-lg leading-tight">
            {
              mockNews[COMMODITIES[0]][
                Math.floor(Math.random() * mockNews[COMMODITIES[0]].length)
              ]?.headline
            }
          </p>
        </div>
      );
    }

    const newsItems =
      size === "medium" ? mockNews.PMS.slice(0, 2) : mockNews.PMS.slice(0, 5);

    return (
      <div
        className={`flex flex-col gap-4 mb-4 ${
          size === "large"
            ? "overflow-y-auto max-h-[300px] pr-2 scroll-smooth"
            : ""
        } scrollbar-thin dark:scrollbar-thumb-[#737373] scrollbar-track-transparent`}
      >
        {newsItems.map((news, idx) => (
          <NewsItem key={idx} news={news} />
        ))}
      </div>
    );
  };

  return (
    <div
      className={`p-6 bg-white dark:bg-[#171717] text-black dark:text-white rounded-3xl ${
        size === "small"
          ? "w-100 h-100"
          : size === "medium"
          ? "w-200 h-100"
          : "w-100 h-120"
      }`}
    >
      <div className="flex flex-col h-full">
        {renderCommodities()}
        {renderNews()}
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
    </div>
  );
};

export default WatchlistWithNewsCard;
