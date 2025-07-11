import { useState } from "react";
import DepotCard from "../components/Dashboard/DepotCard";
import FlightStatsCard from "../components/Dashboard/FlightStatCard";
import Header from "../components/Dashboard/Header";
import NewsCard from "../components/Dashboard/NewsCard";
import ReportsCard from "../components/Dashboard/ReportsCard";
import RetailProductCard from "../components/Dashboard/RetailProductCard";
import Sidebar from "../components/Dashboard/Sidebar";
import { MessageCircle, Menu } from "lucide-react";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWidgetsEdit = () => {
    navigate("/widgets");
  };

  const handleSetAlertClick = () => {
    setIsModalOpen(true);
  };

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
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <button
          className="p-2 m-4 rounded md:hidden absolute top-0 left-0 z-30"
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open sidebar menu"
        >
          <Menu size={24} className={darkMode ? "text-white" : "text-black"} />
        </button>

        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onSetAlertClick={handleSetAlertClick}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6 items-stretch">
            <div className="col-span-12 md:col-span-6 h-full">
              <RetailProductCard darkMode={darkMode} />
            </div>
            <div className="col-span-12 md:col-span-6 h-full">
              <DepotCard darkMode={darkMode} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            <div className="col-span-12 md:col-span-6 lg:col-span-3 h-full">
              <ReportsCard darkMode={darkMode} />
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-3 h-full">
              <NewsCard darkMode={darkMode} />
            </div>
            <div className="col-span-12 md:col-span-12 lg:col-span-6 h-full">
              <FlightStatsCard darkMode={darkMode} />
            </div>
          </div>
        </main>

        <span className="bg-transparent backdrop-blur-3xl">
          <div className="py-4 flex justify-center items-center">
            <button
              onClick={handleWidgetsEdit}
              className={`px-4 py-2 rounded-full text-sm ${
                darkMode
                  ? "bg-[#737373] text-gray-300 hover:bg-[#2C3138]"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              } flex items-center space-x-2`}
            >
              <span>Edit widget</span>
            </button>
          </div>

          <button
            className={`absolute bottom-4 right-4 z-10 
            flex items-center sm:space-x-2 rounded-full 
            bg-[#00897B] text-white hover:bg-teal-700 
            px-3 py-3 sm:px-4 sm:py-2 sm:text-sm 
            md:bottom-12 md:right-8 md:px-4 md:py-2 md:text-sm`}
          >
            <MessageCircle className="w-6 h-6 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Make special request</span>
          </button>
        </span>

        {isModalOpen && (
          <div className="fixed inset-0 bg-[#3a3a3a] bg-opacity-80 flex justify-center items-center z-50">
            <div className="bg-[#262626] p-6 rounded-3xl shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-6 text-white">
                Set Alert
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter price"
                  className="w-full p-2 bg-[#333] text-white rounded-full border border-gray-600"
                />
                <input
                  type="text"
                  placeholder="Condition"
                  className="w-full p-2 bg-[#333] text-white rounded-full border border-gray-600"
                />
                <select className="w-full p-2 text-sm bg-[#333] text-white rounded-full border border-gray-600">
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                </select>
              </div>
              <div className="flex justify-center  mt-6 gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 w-full text-white rounded-full hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 w-full bg-[#00897B] text-white rounded-full hover:bg-green-600">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
