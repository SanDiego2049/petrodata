import { useState } from "react";
import LineChart from "../../charts/LineChart";
import depotData from "../../data/depotData.json";
import { Warehouse } from "lucide-react";

const DEPOTS = [
  "NIPCO",
  "AY Shafa",
  "AA Rano",
  "Bluefin",
  "Rainoil",
  "MRS",
  "Total",
  "Northwest",
  "Swift",
  "Conoil",
];

const COMMODITIES = ["PMS", "AGO", "DPK", "LPG"];

const getDepotTimeseries = (data, depot, state, commodity) => {
  const filtered = data
    .filter(
      (item) =>
        item.State === state &&
        item.Depot === depot &&
        item[commodity] !== undefined
    )
    .sort((a, b) => new Date(a.Period) - new Date(b.Period));

  const prices = filtered.map((item) => item[commodity]);
  const dates = filtered.map((item) => item.Period);
  return { prices, dates };
};

const DepotCard = ({ size = "small", preview = false }) => {
  const [state, setState] = useState("Lagos");
  const [commodity, setCommodity] = useState("PMS");
  const [depot, setDepot] = useState("NIPCO");

  const uniqueStates = [...new Set(depotData.map((d) => d.State))];

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
    small: "max-h-25",
    medium: "max-h-15",
    large: "max-h-10",
  };

  const { prices, dates } = getDepotTimeseries(
    depotData,
    depot,
    state,
    commodity
  );
  const current = prices[prices.length - 1] || 0;
  const previous = prices[prices.length - 2] || prices[0] || 0;
  const change = current - previous;
  const isPositive = change >= 0;

  const visibleDepots = size === "medium" ? DEPOTS.slice(0, 3) : DEPOTS;

  if (preview) {
    return (
      <div className="w-full h-full flex items-center justify-center rounded-xl bg-white dark:bg-[#171717] text-black dark:text-white">
        <div className="flex flex-wrap h-20 items-center justify-center gap-2 text-center text-sm px-2 py-3">
          <Warehouse className="text-orange-400" size={16} />
          <span className="font-semibold">{depot}</span>
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
      className={`p-6 rounded-3xl bg-white dark:bg-[#171717] text-black dark:text-white ${cardWidths[size]} ${cardHeights[size]}`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white dark:bg-[#262626] rounded-full flex items-center justify-center">
              <Warehouse className="text-orange-500" />
            </div>
            <div className="text-sm font-semibold">Depot</div>
          </div>
          {size === "small" && (
            <div
              className={`text-sm font-semibold flex items-center gap-1 ${
                isPositive ? "text-green-400" : "text-red-400"
              }`}
            >
              <div
                className={`w-0 h-0 border-l-[8px] border-r-[8px] border-l-transparent border-r-transparent ${
                  isPositive
                    ? "border-b-[12px] border-b-green-400"
                    : "border-t-[12px] border-t-red-400"
                }`}
              ></div>
              {depot}
            </div>
          )}
        </div>

        {size === "small" && (
          <>
            <div className={`mb-4 ${chartHeights[size]}`}>
              <LineChart
                prices={prices}
                dates={dates}
                isDown={!isPositive}
                size={size}
                showGrid={false}
                showXAxisLabels={false}
              />
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold">₦{current.toFixed(2)}</div>
              <div className="text-right">
                <div
                  className={`text-sm font-medium ${
                    isPositive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {change.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex overflow-x-auto gap-0 border-t border-gray-200 dark:border-[#404040] mb-2">
                {DEPOTS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDepot(d)}
                    className={`px-4 truncate py-2 text-sm flex-1 relative ${
                      depot === d
                        ? "text-green-400"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                    }`}
                  >
                    {depot === d && (
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-green-400"></div>
                    )}
                    {d}
                  </button>
                ))}
              </div>

              <div className="flex gap-0 border-t border-gray-200 dark:border-[#404040] mb-2">
                {COMMODITIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCommodity(c)}
                    className={`px-4 py-2 text-sm flex-1 relative ${
                      commodity === c
                        ? "text-green-400"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                    }`}
                  >
                    {commodity === c && (
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-green-400"></div>
                    )}
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {size !== "small" && (
          <>
            <div
              className={`flex flex-col pr-2 scrollbar-thin dark:scrollbar-thumb-[#737373] scrollbar-track-transparent ${
                size === "large" ? "overflow-y-auto" : ""
              }`}
            >
              {visibleDepots.map((depot) => {
                const { prices, dates } = getDepotTimeseries(
                  depotData,
                  depot,
                  state,
                  commodity
                );
                const current = prices[prices.length - 1] || 0;
                const previous = prices[prices.length - 2] || prices[0] || 0;
                const change = current - previous;
                const isPositive = change >= 0;

                return (
                  <div key={depot}>
                    <div
                      className={`flex justify-between items-center border-b border-gray-200 dark:border-[#36353A] ${
                        size === "large" ? "py-2" : ""
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-0 h-0 border-l-[8px] border-r-[8px] border-l-transparent border-r-transparent ${
                            isPositive
                              ? "border-b-[12px] border-b-green-400"
                              : "border-t-[12px] border-t-red-400"
                          }`}
                        ></div>
                        <span className="text-sm font-semibold">{depot}</span>
                      </div>

                      <div
                        className={
                          size === "large"
                            ? `w-30 ${chartHeights[size]}`
                            : `${chartHeights[size]}`
                        }
                      >
                        <LineChart
                          prices={prices}
                          dates={dates}
                          isDown={!isPositive}
                          size={size}
                          showGrid={false}
                          showXAxisLabels={false}
                        />
                      </div>

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
                          {change.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-gray-200 dark:border-[#404040] mb-3">
              <div className="flex">
                {COMMODITIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCommodity(c)}
                    className={`px-4 py-2 text-sm flex-1 relative ${
                      commodity === c
                        ? "text-green-400"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                    }`}
                  >
                    {commodity === c && (
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-green-400"></div>
                    )}
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="mt-auto">
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="bg-white dark:bg-[#171717] text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded px-2 py-1 opacity-50"
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

export default DepotCard;
