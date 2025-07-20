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

  const prices = filtered.map((item) => item[commodity]);
  const dates = filtered.map((item) => item.Period);
  return { prices, dates };
};

const WatchlistCard = ({ size = "small", preview = false }) => {
  const [state, setState] = useState("Abuja");
  const [allPrices, setAllPrices] = useState({});
  const [allChanges, setAllChanges] = useState({});
  const [allTimeseries, setAllTimeseries] = useState({});

  const uniqueStates = [...new Set(fullData.map((d) => d.State))];

  useEffect(() => {
    const pricesObj = {};
    const changesObj = {};
    const timeseriesObj = {};

    COMMODITIES.forEach((commodity) => {
      const { prices, dates } = getTimeseries(fullData, commodity, state);
      const current = prices.at(-1) || 0;
      const previous = prices.at(-2) || prices[0] || 0;
      const isPositive = current >= previous;
      const change = current - previous;

      pricesObj[commodity] = current;
      changesObj[commodity] = {
        change: change.toFixed(2),
        isPositive,
      };
      timeseriesObj[commodity] = { prices, dates };
    });

    setAllPrices(pricesObj);
    setAllChanges(changesObj);
    setAllTimeseries(timeseriesObj);
  }, [state]);

  const cardWidths = {
    small: "w-100",
    medium: "w-200",
    large: "w-100",
  };

  const cardHeights = {
    small: "h-100",
    medium: "h-100",
    large: "h-120",
  };

  const chartHeights = {
    medium: "max-h-15",
    large: "max-h-10",
  };

  const firstCommodity = COMMODITIES[0];
  const firstPrice = allPrices[firstCommodity] || 0;
  const firstChangeObj = allChanges[firstCommodity] || {};
  const isPositive = firstChangeObj.isPositive;
  const change = firstChangeObj.change || "0.00";

  if (preview) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white dark:bg-[#171717] rounded-xl text-black dark:text-white">
        <div className="flex flex-wrap h-20 items-center justify-center gap-2 text-center text-sm px-2 py-3">
          <span className="font-semibold truncate">{firstCommodity}</span>
          <span className="text-xs font-medium">₦{firstPrice.toFixed(2)}</span>
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
        </div>
      </div>
    );
  }

  const displayedCommodities =
    size === "medium" ? COMMODITIES.slice(0, 3) : COMMODITIES;

  return (
    <div
      className={`bg-white dark:bg-[#171717] text-black dark:text-white rounded-3xl ${cardWidths[size]} ${cardHeights[size]}`}
    >
      <div className="flex flex-col h-full p-6 w-full">
        {/* Commodity list */}
        <div className="flex-1 overflow-y-auto pr-1 scroll-smooth w-full scrollbar-thin scrollbar-thumb-[#262626] dark:scrollbar-thumb-[#404040] scrollbar-track-transparent">
          <div className="flex flex-col gap-2">
            {displayedCommodities.map((commodity) => {
              const { symbol, name } = COMMODITY_INFO[commodity];
              const current = allPrices[commodity] || 0;
              const { change, isPositive } = allChanges[commodity] || {};
              const timeseries = allTimeseries[commodity] || {};

              return (
                <div
                  key={commodity}
                  className={`flex justify-between items-center border-b border-gray-300 dark:border-[#333] ${
                    size === "small"
                      ? "py-4"
                      : size === "large"
                      ? "py-1"
                      : "py-3"
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
                      ></div>
                      <span className="text-sm font-semibold">{symbol}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {name}
                    </div>
                  </div>

                  {(size === "medium" || size === "large") && (
                    <div
                      className={`flex-1 ${
                        size === "large" ? "max-w-30" : "max-w-70"
                      } ${chartHeights[size]}`}
                    >
                      <LineChart
                        prices={timeseries.prices || []}
                        dates={timeseries.dates || []}
                        isDown={!isPositive}
                        size={size}
                        showGrid={false}
                        showXAxisLabels={false}
                      />
                    </div>
                  )}

                  <div className="text-end">
                    <div className="text-sm font-semibold">
                      ₦{current.toFixed(2)}
                    </div>
                    <div
                      className={`text-xs ${
                        isPositive ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {change}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* State selector */}
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

export default WatchlistCard;
