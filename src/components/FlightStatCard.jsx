import { TrendingUp, Plane } from "lucide-react";

const FlightStatsCard = ({ darkMode }) => {
  const flightOperators = [
    { name: "Murtala Muhammad I...", flights: "12,489 flights" },
    { name: "Nnamdi Azikiwe Inter...", flights: "934,483 flights" },
    { name: "Mallam Aminu Kano I...", flights: "10,722 flights" },
    { name: "Port Harcourt Interna...", flights: "9,823 flights" },
  ];

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-xl p-6 border ${
        darkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Plane className="w-4 h-4 text-white" />
          </div>
          <div>
            <span
              className={`font-bold text-lg ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              284,774
            </span>
            <span
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              } ml-2`}
            >
              Flights
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-green-400">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">10% last week</span>
        </div>
      </div>

      <div className="flex items-end justify-between h-20 mb-6">
        {[30, 45, 60, 80, 65, 90, 75].map((height, index) => (
          <div key={index} className="flex flex-col items-center space-y-1">
            <div
              className={`w-6 rounded-t ${
                index % 2 === 0 ? "bg-blue-500" : "bg-orange-500"
              }`}
              style={{ height: `${height}%` }}
            />
          </div>
        ))}
      </div>

      <div className="flex space-x-4 text-xs mb-4">
        <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          24 Jan
        </span>
        <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          31 Jan
        </span>
        <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          7 Feb
        </span>
        <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          14 Feb
        </span>
      </div>

      <div className="flex space-x-4 text-xs mb-4">
        <span className="text-blue-500">International</span>
        <span className="text-orange-500">Domestic</span>
      </div>

      <div className="space-y-2">
        {flightOperators.map((operator, index) => (
          <div key={index} className="flex justify-between items-center">
            <span
              className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {operator.name}
            </span>
            <span
              className={`text-xs ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {operator.flights}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightStatsCard;
