// components/cards/FlightStatCard.jsx
import { useEffect, useState } from "react";
import { Plane } from "lucide-react";
import StackedBarChart from "../../charts/StackedBarChart";
import flightData from "../../data/flightData.json";

const TABS = ["International", "Domestic"];

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

const COLORS = {
  Commercial: "#3B82F6",
  Military: "#10B981",
  Private: "#F59E0B",
};

const FlightStatCard = ({ size = "small", preview = false }) => {
  const [state, setState] = useState("Lagos");
  const [tab, setTab] = useState("International");
  const [total, setTotal] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [airportStats, setAirportStats] = useState([]);

  const uniqueStates = [...new Set(flightData.map((d) => d.state))];

  useEffect(() => {
    const filtered = flightData.filter(
      (entry) =>
        entry.type?.toLowerCase() === tab.toLowerCase() && entry.state === state
    );

    const dateMap = {};
    filtered.forEach(({ date, Commercial, Military, Private }) => {
      if (!dateMap[date])
        dateMap[date] = { Commercial: 0, Military: 0, Private: 0 };
      dateMap[date].Commercial += Commercial;
      dateMap[date].Military += Military;
      dateMap[date].Private += Private;
    });

    const formatted = Object.entries(dateMap)
      .map(([date, values]) => ({
        date,
        ...values,
        total: values.Commercial + values.Military + values.Private,
      }))
      .sort(
        (a, b) =>
          new Date(Date.parse(a.date + " 2025")) -
          new Date(Date.parse(b.date + " 2025"))
      )
      .slice(-6);

    setTotal(formatted.reduce((sum, d) => sum + d.total, 0));
    setChartData(formatted);

    if (size !== "small") {
      const airportMap = {};
      filtered.forEach(({ airport, Commercial, Military, Private }) => {
        airportMap[airport] =
          (airportMap[airport] || 0) + Commercial + Military + Private;
      });

      const sortedAirports = Object.entries(airportMap)
        .map(([airport, flights]) => ({ airport, flights }))
        .sort((a, b) => b.flights - a.flights);

      setAirportStats(sortedAirports);
    }
  }, [tab, state, size]);

  const TabSwitcher = () => (
    <div className="border-t border-[#404040] mb-2">
      <div className="flex w-50">
        {TABS.map((label) => (
          <button
            key={label}
            onClick={() => setTab(label)}
            className={`px-4 py-2 text-sm flex-1 relative ${
              tab === label
                ? "text-[#009688]"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            {tab === label && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#009688]"></div>
            )}
            {label}
          </button>
        ))}
      </div>
    </div>
  );

  const StateDropdown = () => (
    <div className="mt-auto">
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="bg-[#171717] text-white border border-gray-600 rounded px-2 py-1 opacity-50"
      >
        {uniqueStates.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );

  const ChartWithHeader = ({ height }) => (
    <>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
          <Plane fill="#155dfc" className="text-blue-600" />
        </div>
        <div className="text-2xl font-semibold">
          {total.toLocaleString()}{" "}
          <span className="text-gray-400 text-sm">Flights</span>
        </div>
      </div>
      <div className="mb-4">
        <StackedBarChart
          data={chartData}
          showYAxisRight
          height={height}
          colors={COLORS}
        />
      </div>
    </>
  );

  const AirportList = ({ stats, textSize = "text-md" }) => (
    <div className="flex flex-col gap-2">
      {stats.map(({ airport, flights }) => (
        <div
          key={airport}
          className={`flex flex-col gap-2 items-start py-1.5 border-b border-[#333] last:border-b-0`}
        >
          <div className={`${textSize} font-semibold text-[#FAFAFA] text-wrap`}>
            {airport}
          </div>
          <div className={`${textSize} font-medium text-[#D4D4D4]`}>
            {flights.toLocaleString()} flights
          </div>
        </div>
      ))}
    </div>
  );

  const Wrapper = ({ children }) => (
    <div
      className={`bg-[#171717] text-white rounded-3xl ${cardWidths[size]} ${cardHeights[size]}`}
    >
      {children}
    </div>
  );

  if (preview) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#171717] rounded-xl text-white">
        <div className="flex flex-wrap items-center justify-center gap-2 text-center text-sm px-2 py-3">
          <Plane fill="#155dfc" className="text-blue-600" size={16} />
          <span className="font-semibold">{state}</span>
          <span className="text-xs font-medium">{tab}</span>
          <span className="text-xs font-medium">
            {total.toLocaleString()} flights
          </span>
        </div>
      </div>
    );
  }

  if (size === "large") {
    return (
      <Wrapper>
        <div className="flex flex-col h-full">
          <div className="px-6 pt-6">
            <ChartWithHeader height={180} />
            <TabSwitcher />
            <StateDropdown />
          </div>
          <div className="p-6 border border-[#171717] bg-[#404040] h-full rounded-b-3xl">
            <AirportList stats={airportStats} textSize="text-md" />
          </div>
        </div>
      </Wrapper>
    );
  }

  if (size === "medium") {
    return (
      <Wrapper>
        <div className="flex h-full">
          <div className="flex-1 p-6 flex flex-col">
            <ChartWithHeader height={170} />
            <TabSwitcher />
            <StateDropdown />
          </div>
          <div className="w-70 pl-4 p-6 border border-[#171717] bg-[#404040] rounded-e-3xl">
            <AirportList stats={airportStats} />
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="p-6 flex flex-col h-full">
        <ChartWithHeader height={210} />
        <TabSwitcher />
        <StateDropdown />
      </div>
    </Wrapper>
  );
};

export default FlightStatCard;
