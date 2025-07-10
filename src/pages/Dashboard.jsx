import { useState } from "react";
import DepotCard from "../components/DepotCard";
import FlightStatsCard from "../components/FlightStatCard";
import Header from "../components/Header";
import NewsCard from "../components/NewsCard";
import ReportsCard from "../components/ReportsCard";
import RetailProductCard from "../components/RetailProductCard";
import Sidebar from "../components/Sidebar";
import { Edit3, MessageCircle } from "lucide-react";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-[#262626] text-white" : "bg-gray-100 text-black"
      }`}
    >
      <Sidebar
        darkMode={darkMode}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <RetailProductCard darkMode={darkMode} />
            <DepotCard darkMode={darkMode} />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <ReportsCard darkMode={darkMode} />
            <NewsCard darkMode={darkMode} />
            <FlightStatsCard darkMode={darkMode} />
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              className={`px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-[#2C3138] text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              } flex items-center space-x-2`}
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit widget</span>
            </button>

            <button className="px-4 py-2 bg-[#00B478] text-white rounded-lg hover:bg-teal-700 flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Make special request</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
