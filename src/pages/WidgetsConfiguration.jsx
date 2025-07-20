import { useState } from "react";
import { LayoutDashboard } from "lucide-react";
import RetailProductCard from "../components/widgets/RetailProductCard";
import RetailProductWithNewsCard from "../components/widgets/RetailProductCardWithNews";
import WatchlistCard from "../components/widgets/WatchlistCard";
import WatchlistWithNewsCard from "../components/widgets/WatchlistWithNewsCard";
import FlightStatCard from "../components/widgets/FlightStatCard";
import DepotCard from "../components/widgets/DepotCard";
import NewsCard from "../components/widgets/NewsCard";
import ExchangeRateCard from "../components/widgets/ExchangeRateCard";
import Sidebar from "../components/widgets/Sidebar";
import SelectorCard from "../components/widgets/SelectorCard";
import ReportCard from "../components/widgets/ReportCard";
import useIsMobile from "../hooks/useIsMobile";
import { useNavigate } from "react-router";
import { useWidgets } from "../contexts/WidgetContext";

const WidgetsConfiguration = () => {
  const { selectedWidgets, setSelectedWidgets, widgetSizes, setWidgetSizes } =
    useWidgets();

  const [activeItem, setActiveItem] = useState("product-retail-price");
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleWidgetSelect = (widgetId) => {
    setSelectedWidgets((prev) =>
      prev.includes(widgetId)
        ? prev.filter((w) => w !== widgetId)
        : [...prev, widgetId]
    );
  };

  const handleSizeChange = (widgetId, size) => {
    setWidgetSizes((prev) => ({ ...prev, [widgetId]: size }));
  };

  const handleDone = () => {
    navigate("/"); // Navigate to dashboard
  };

  const handleCancel = () => {
    if (selectedWidgets.length > 0) {
      setSelectedWidgets([]);
      setWidgetSizes({});
    }
    navigate("/");
  };

  const widgets = {
    "product-retail-price": [
      {
        id: "retail-product",
        title: "Retail product",
        description:
          "View price quotes and track performance of a product throughout the week",
        component: RetailProductCard,
      },
      {
        id: "retail-product-news",
        title: "Retail product & news",
        description:
          "View price quotes, track performance and latest news of a product throughout the week",
        component: RetailProductWithNewsCard,
      },
      {
        id: "watchlist",
        title: "Watchlist",
        description:
          "View price quotes and track performance of watchlist throughout the week",
        component: WatchlistCard,
      },
      {
        id: "watchlist-news",
        title: "Watchlist & news",
        description:
          "View price quotes, track performance and latest news of watchlist throughout the week",
        component: WatchlistWithNewsCard,
      },
    ],
    "flight-widget": [
      {
        id: "flight-stat",
        title: "Flight widget",
        description: "Track flight status and departure information",
        component: FlightStatCard,
      },
    ],
    "depot-widget": [
      {
        id: "depot",
        title: "Depot widget",
        description: "Monitor depot capacity and operational status",
        component: DepotCard,
      },
    ],
    "news-widget": [
      {
        id: "news",
        title: "News widget",
        description: "Stay updated with latest news and headlines",
        component: NewsCard,
      },
    ],
    "report-widget": [
      {
        id: "report",
        title: "Report widget",
        description: "Access detailed reports and analysis",
        component: ReportCard,
      },
    ],
    "exchange-rate": [
      {
        id: "exchange",
        title: "Exchange rate",
        description: "Track currency exchange rates and market changes",
        component: ExchangeRateCard,
      },
    ],
  };

  const renderWidgets = () => widgets[activeItem] || [];

  return (
    <div className="flex h-screen bg-white text-black dark:bg-[#262626] dark:text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content */}
      <div className="flex-1 mb-6 flex">
        {/* Middle Section */}
        <div className="flex-1 p-6 py-16 overflow-y-auto scrollbar-thin dark:scrollbar-thumb-[#737373] scrollbar-track-transparent scroll-smooth">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {renderWidgets().map((widget) => {
              const WidgetComponent = widget.component;
              const size = widgetSizes[widget.id];
              const isSelected = selectedWidgets.includes(widget.id);
              const colSpan =
                size === "medium" ? "col-span-1 sm:col-span-2" : "col-span-1";

              return (
                <div key={widget.id} className={colSpan}>
                  <SelectorCard
                    title={widget.title}
                    description={widget.description}
                    onSelect={() => handleWidgetSelect(widget.id)}
                    isSelected={isSelected}
                    selectedSize={size}
                    onSizeChange={(size) => handleSizeChange(widget.id, size)}
                  >
                    <WidgetComponent size={size} preview={isMobile} />
                  </SelectorCard>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden 2xl:block w-96 bg-gray-100 dark:bg-[#171717] p-6 border-l border-gray-300 dark:border-[#404040] flex-shrink-0">
          <div className="h-full flex flex-col">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              Preview
            </h2>

            {selectedWidgets.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <LayoutDashboard
                    size={48}
                    className="mx-auto mb-4 opacity-50"
                  />
                  <p>No widgets selected</p>
                  <p className="text-sm mt-2">Select widgets to see preview</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-3 gap-3 auto-rows-min">
                  {selectedWidgets.map((widgetId) => {
                    const allWidgets = Object.values(widgets).flat();
                    const widget = allWidgets.find((w) => w.id === widgetId);
                    if (!widget) return null;

                    const WidgetComponent = widget.component;
                    const size = widgetSizes[widgetId];

                    return (
                      <div
                        key={widgetId}
                        className="border border-gray-300 dark:border-[#404040] rounded-lg p-4 flex"
                      >
                        <WidgetComponent size={size} preview={true} />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-300 dark:border-[#404040] flex gap-4">
              {selectedWidgets.length > 0 && (
                <button
                  onClick={handleDone}
                  className="flex-1 cursor-pointer py-3 bg-[#26A69A] text-white rounded-lg font-medium hover:bg-[#1e7a70] transition-colors"
                >
                  Done
                </button>
              )}
              <button
                onClick={handleCancel}
                className="flex-1 cursor-pointer py-3 bg-[#404040] text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                {selectedWidgets.length > 0 ? "Cancel" : "Back home"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-gray-100 dark:bg-[#171717] border-t border-gray-300 dark:border-[#404040] p-4 flex gap-4">
        {selectedWidgets.length > 0 && (
          <button
            onClick={handleDone}
            className="flex-1 cursor-pointer py-2 bg-[#26A69A] text-white rounded-full font-medium text-sm hover:bg-[#1e7a70] transition-colors"
          >
            Done
          </button>
        )}
        <button
          onClick={handleCancel}
          className="flex-1 cursor-pointer py-2 bg-[#404040] text-white rounded-full font-medium text-sm hover:bg-gray-700 transition-colors"
        >
          {selectedWidgets.length > 0 ? "Cancel" : "Back home"}
        </button>
      </div>
    </div>
  );
};

export default WidgetsConfiguration;
