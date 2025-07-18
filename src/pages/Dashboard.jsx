import { useState } from "react";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/Sidebar";
import { MessageCircle, Menu, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router";
import { useWidgets } from "../contexts/WidgetContext";
import allWidgets from "../components/allWidgets"; // map of all components

const Dashboard = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { selectedWidgets, widgetSizes } = useWidgets();

  const handleWidgetsEdit = () => {
    navigate("/widgets");
  };

  const handleSetAlertClick = () => {
    setIsModalOpen(true);
  };

  const getColSpan = (size) => {
    switch (size) {
      case "large":
        return "md:col-span-12";
      case "medium":
        return "md:col-span-6";
      default:
        return "md:col-span-4";
    }
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

        {/* MAIN WIDGET DISPLAY */}
        <main
          style={{
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#262626",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#404040",
            },
            scrollbarWidth: "thin",
            scrollbarColor: "#262626 #333",
          }}
          className="flex-1 overflow-y-auto p-6"
        >
          {selectedWidgets.length === 0 ? (
            <div className="mt-auto h-full flex items-center justify-center">
              <div className="text-center text-gray-400">
                <LayoutDashboard
                  size={48}
                  className="mx-auto mb-4 opacity-50"
                />
                <p>No widgets to see here.</p>
                <p className="text-sm mt-2">Add widgets for them to display</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="grid grid-cols-12 gap-6 max-w-full">
                {selectedWidgets.map((widgetId) => {
                  const WidgetComponent = allWidgets[widgetId];
                  const size = widgetSizes[widgetId] || "small";

                  if (!WidgetComponent) return null;

                  let colSpanClass = "";
                  if (size === "small")
                    colSpanClass = "col-span-12 md:col-span-4";
                  else if (size === "medium")
                    colSpanClass = "col-span-12 md:col-span-8";
                  else if (size === "large")
                    colSpanClass = "col-span-12 md:col-span-4";

                  return (
                    <div key={widgetId} className={`${colSpanClass}`}>
                      <WidgetComponent size={size} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>

        {/* EDIT WIDGET BUTTON */}
        <span className="bg-transparent backdrop-blur-3xl">
          <div className="py-4 flex justify-center items-center">
            <button
              onClick={handleWidgetsEdit}
              className={`px-4 py-2 rounded-full cursor-pointer text-sm ${
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

        {/* SET ALERT MODAL */}
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
              <div className="flex justify-center mt-6 gap-4">
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
