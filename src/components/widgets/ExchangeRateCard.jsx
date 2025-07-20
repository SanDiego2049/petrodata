import { useState, useEffect } from "react";
import { ArrowRightLeft } from "lucide-react";
import exchangeRates from "../../data/exchangeRates.json";

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

const TABS = ["Official rate", "Black market"];

export default function ExchangeRateCard({ size = "small", preview = false }) {
  const [tab, setTab] = useState(TABS[0]);
  const [rates, setRates] = useState([]);
  const [currentRate, setCurrentRate] = useState(null);

  useEffect(() => {
    if (tab === "Official rate") {
      setRates(exchangeRates.official);
      setCurrentRate(exchangeRates.official.slice(-1)[0].rate);
    } else {
      setRates(exchangeRates.blackMarket);
      setCurrentRate(exchangeRates.blackMarket.slice(-1)[0].rate);
    }
  }, [tab]);

  if (preview) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white dark:bg-[#171717] rounded-xl text-black dark:text-white">
        <div className="flex h-20 items-center gap-2 px-3 py-2">
          <ArrowRightLeft size={16} className="text-[#009688]" />
          <span className="text-sm font-semibold">
            ₦{currentRate?.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }

  const TabSwitcher = () => (
    <div className="border-t border-gray-200 dark:border-[#404040] mt-auto">
      <div className="flex w-50">
        {TABS.map((label) => (
          <button
            key={label}
            onClick={() => setTab(label)}
            className={`px-4 text-nowrap py-2 text-sm flex-1 relative ${
              tab === label
                ? "text-[#009688]"
                : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-gray-300"
            }`}
            aria-label={`Switch to ${label}`}
          >
            {tab === label && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#009688]" />
            )}
            {label}
          </button>
        ))}
      </div>
    </div>
  );

  const RatesList = ({ rates }) => (
    <div
      className="flex flex-col gap-2 scrollbar-thin dark:scrollbar-thumb-[#737373] scrollbar-track-transparent overflow-y-auto pr-2"
      
    >
      <div className="flex flex-col gap-2">
        {rates.map(({ date, rate }) => (
          <div
            key={date}
            className="flex justify-between items-center py-1 border-b border-gray-200 dark:border-[#333]"
          >
            <div className="text-sm font-semibold text-black dark:text-[#FAFAFA]">
              {date}
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-[#D4D4D4]">
              ₦{rate.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Wrapper = ({ children }) => (
    <div
      className={`bg-white dark:bg-[#171717] text-black dark:text-white rounded-3xl flex flex-col ${cardWidths[size]} ${cardHeights[size]}`}
    >
      {children}
    </div>
  );

  if (size === "small") {
    return (
      <Wrapper>
        <div className="p-6 flex flex-col justify-between h-full">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-gray-200 dark:bg-[#262626] rounded-full flex items-center justify-center">
              <ArrowRightLeft size={20} className="text-[#009688]" />
            </div>
            <div className="text-lg font-semibold">Exchange rate</div>
          </div>

          <div className="mt-auto">
            <div className="mb-2 text-gray-500 dark:text-[#A3A3A3]">
              Naira (₦)
            </div>
            <div className="text-6xl font-semibold mb-6">
              {currentRate?.toLocaleString()}
            </div>
          </div>

          <TabSwitcher />
        </div>
      </Wrapper>
    );
  }

  if (size === "medium") {
    return (
      <Wrapper>
        <div className="flex h-full gap-4">
          <div className="flex p-6 flex-col flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-gray-200 dark:bg-[#262626] rounded-full flex items-center justify-center">
                <ArrowRightLeft size={20} className="text-[#009688]" />
              </div>
              <div className="text-lg font-semibold">Exchange rate</div>
            </div>

            <div className="mt-auto">
              <div className="mb-2 text-gray-500 dark:text-[#A3A3A3]">
                Naira (₦)
              </div>
              <div className="text-6xl font-semibold mb-6">
                {currentRate?.toLocaleString()}
              </div>
            </div>

            <TabSwitcher />
          </div>

          <div className="w-70 p-6 pl-4 border border-gray-200 dark:border-[#171717] bg-gray-100 dark:bg-[#404040] rounded-e-3xl flex flex-col">
            <RatesList rates={rates} />
          </div>
        </div>
      </Wrapper>
    );
  }

  if (size === "large") {
    return (
      <Wrapper>
        <div className="flex flex-col h-full">
          <div className="px-6 pt-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-gray-200 dark:bg-[#262626] rounded-full flex items-center justify-center">
                <ArrowRightLeft size={20} className="text-[#009688]" />
              </div>
              <div className="text-lg font-semibold">Exchange rate</div>
            </div>
            <div className="mt-auto">
              <div className="mb-2 text-gray-500 dark:text-[#A3A3A3]">
                Naira (₦)
              </div>

              <div className="text-6xl font-semibold mb-12">
                {currentRate?.toLocaleString()}
              </div>
            </div>
            <TabSwitcher />
          </div>
          <div className="p-6 bg-gray-100 dark:bg-[#404040] border border-gray-200 dark:border-[#171717] h-full rounded-b-3xl mt-2 overflow-y-auto">
            <RatesList rates={rates} />
          </div>
        </div>
      </Wrapper>
    );
  }
}
