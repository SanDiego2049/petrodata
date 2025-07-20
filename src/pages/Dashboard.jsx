import { useState } from "react";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/Sidebar";
import { MessageCircle, Menu, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router";
import { useWidgets } from "../contexts/WidgetContext";
import allWidgets from "../components/allWidgets";
import SetAlertModal from "../components/dashboard/SetAlertModal";
import NotificationModal from "../components/dashboard/NotificationModal";
import SearchModal from "../components/dashboard/SearchModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const { selectedWidgets, widgetSizes } = useWidgets();

  const handleWidgetsEdit = () => {
    navigate("/widgets");
  };

  const handleSetAlertClick = () => {
    setIsAlertModalOpen(true);
  };

  const handleNotificationClick = () => {
    setIsNotificationModalOpen(true);
  };

  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-100 text-black dark:bg-[#262626] dark:text-white">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <button
          className="p-2 my-4 mx-1 rounded md:hidden absolute top-0 left-0 z-30"
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open sidebar menu"
        >
          <Menu size={24} className="text-black dark:text-white" />
        </button>

        <Header
          onSetAlertClick={handleSetAlertClick}
          onNotificationClick={handleNotificationClick}
          onSearchClick={handleSearchClick}
        />

        {/* MAIN WIDGET DISPLAY */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-[#262626] scrollbar-track-transparent mb-16 md:mb-0">
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
                    <div key={widgetId} className={colSpanClass}>
                      <WidgetComponent size={size} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>

        {/* EDIT WIDGET BUTTON */}
        <div>
          {/* Desktop View */}
          <div className="hidden md:flex justify-center items-center py-4">
            <button
              onClick={handleWidgetsEdit}
              className="
                px-4 py-2 rounded-full cursor-pointer text-sm
                bg-gray-200 text-gray-600 hover:bg-gray-300
                dark:bg-[#525252] dark:text-gray-300 dark:hover:bg-[#292929]
                flex items-center space-x-2
              "
            >
              <span>
                {selectedWidgets.length === 0 ? "Add widgets" : "Edit widgets"}
              </span>
            </button>
          </div>

          {/* Fixed Mobile Button */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#171717] border-t border-gray-200 dark:border-[#404040] p-4 flex justify-center">
            <button
              onClick={handleWidgetsEdit}
              className="
                w-full max-w-xs px-4 py-2 rounded-full cursor-pointer text-sm
                bg-gray-200 text-gray-600 hover:bg-gray-300
                dark:bg-[#737373] dark:text-gray-300 dark:hover:bg-[#2C3138]
                flex items-center justify-center space-x-2
              "
            >
              <span>
                {selectedWidgets.length === 0 ? "Add widgets" : "Edit widgets"}
              </span>
            </button>
          </div>

          {/* Request Button */}
          <button
            className="
              fixed bottom-20 right-4
              flex items-center md:space-x-2 rounded-full
              bg-[#00897B] text-white hover:bg-teal-700
              md:px-4 md:py-2 p-3 shadow-lg
              transition-all duration-300 ease-in-out
            "
          >
            <MessageCircle />
            <span className="hidden sm:inline text-sm">
              Make special request
            </span>
          </button>
        </div>

        {/* SET ALERT MODAL */}
        {isAlertModalOpen && (
          <SetAlertModal onClose={() => setIsAlertModalOpen(false)} />
        )}

        {/* NOTIFICATION MODAL */}
        {isNotificationModalOpen && (
          <NotificationModal
            isOpen={isNotificationModalOpen}
            onClose={() => setIsNotificationModalOpen(false)}
          />
        )}

        {/* NOTIFICATION MODAL */}
        {isSearchModalOpen && (
          <SearchModal
            isOpen={isSearchModalOpen}
            onClose={() => setIsSearchModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
