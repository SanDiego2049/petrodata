import { useState } from "react";
import { Plane } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const FlightStatCard = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState("international");

  const chartData = {
    "24 Jan": { international: 150000, domestic: 50000 },
    "31 Jan": { international: 100000, domestic: 30000 },
    "7 Feb": { international: 350000, domestic: 120000 },
    "14 Feb": { international: 200000, domestic: 80000 },
  };

  const airportData = [
    { name: "Murtala Muhammed I...", flights: 12489 },
    { name: "Nnamdi Azikiwe Inter...", flights: 934483 },
    { name: "Mallam Aminu Kano I...", flights: 10722 },
    { name: "Port Harcourt Interna...", flights: 9823 },
    { name: "Akanu Ibiam Internati...", flights: 489 },
    { name: "Muritala Mohamm...", flights: 89 },
  ];

  const totalFlights = 284774;

  const labels = Object.keys(chartData);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "International",
        data: labels.map((label) => chartData[label].international),
        backgroundColor: "#3B82F6",
        stack: "flights",
      },
      {
        label: "Domestic",
        data: labels.map((label) => chartData[label].domestic),
        backgroundColor: "#F97316",
        stack: "flights",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "#A3A3A3",
          font: {
            size: 10, 
          },
        },
      },
      y: {
        stacked: true,
        grid: {
          display: true,
          drawBorder: false,
          color: "rgba(163, 163, 163, 0.2)",
        },
        ticks: {
          color: "#A3A3A3",
          stepSize: 100000,
          callback: function (value) {
            return value / 1000 + "k";
          },
          font: {
            size: 10, 
          },
        },
        min: 0,
        max: 600000,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#404040",
        titleColor: "#E5E5E5",
        bodyColor: "#E5E5E5",
      },
    },
  };

  return (
    <div
      className={`flex flex-col lg:flex-row ${
        darkMode ? "bg-[#171717] text-white" : "bg-white text-gray-900"
      } rounded-3xl h-full w-full`}
    >
      {/* Left Section */}
      <div className="w-full lg:w-1/2 p-4 flex flex-col">
        <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 bg-[#E0F2F1] rounded-full flex items-center justify-center">
            <Plane size={20} className="text-[#1E88E5] sm:w-6 sm:h-6" />
          </div>
          <h2 className="font-medium text-sm sm:text-base">
            {totalFlights.toLocaleString()}{" "}
            <span className="text-gray-400 text-xs sm:text-sm font-normal">
              Flights
            </span>
          </h2>
        </div>

        {/* Chart Area */}
        <div className="flex-grow relative h-48 sm:h-60 md:h-72 lg:h-auto mb-4 sm:mb-6">
          <Bar options={options} data={data} />
        </div>

        {/* Tabs */}
        <div className="flex border-t border-gray-700 gap-2 sm:gap-4 flex-wrap ">
          <button
            className={`px-2 py-1 text-xs font-medium transition-colors ${
              activeTab === "international"
                ? "border-t-1 border-[#009688] text-[#009688]"
                : "text-[#A3A3A3]"
            }`}
            onClick={() => setActiveTab("international")}
          >
            International
          </button>
          <button
            className={`px-2 py-1 text-xs font-medium transition-colors ${
              activeTab === "domestic"
                ? "border-t-1 border-[#009688] text-[#009688]"
                : "text-[#A3A3A3]"
            }`}
            onClick={() => setActiveTab("domestic")}
          >
            Domestic
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div
        className={`w-full p-4 lg:w-1/2 lg:rounded-e-3xl flex flex-col justify-center 
          ${darkMode ? "bg-[#404040] text-white" : "bg-gray-200 text-gray-900"}
          rounded-b-3xl lg:rounded-es-none lg:rounded-tr-3xl lg:rounded-br-3xl
        `}
      >
        <ul className="space-y-2 sm:space-y-3">
          {airportData.map((airport, index) => (
            <li
              key={index}
              className="flex justify-between items-center py-1 sm:py-2"
            >
              <span className="text-sm truncate">
                {airport.name}
              </span>{" "}
              <span className="text-sm flex-shrink-0">
                {airport.flights.toLocaleString()} flights
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FlightStatCard;
