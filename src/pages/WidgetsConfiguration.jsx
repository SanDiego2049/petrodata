import { useState } from "react";
import WidgetCard from "../components/WidgetCard";
import RetailProductContent from "../components/Widgets/RetailProductContent";
import WatchlistContent from "../components/Widgets/WatchlistContent";
import FlightContent from "../components/Widgets/FlightStatContent";
import DepotContent from "../components/Widgets/DepotContent";
import NewsContent from "../components/Widgets/NewsContent";
import ReportContent from "../components/Widgets/ReportContent";
import ExchangeContent from "../components/Widgets/ExchangeContent";
import Sidebar from "../components/Widgets/Sidebar";
import { useNavigate } from "react-router";

const WidgetsConfiguration = () => {
  const navigate = useNavigate();
  const [activeSidebarItem, setActiveSidebarItem] = useState(
    "product-retail-price"
  );
  const [selectedWidgets, setSelectedWidgets] = useState([]);
  const [widgetSizes, setWidgetSizes] = useState({});

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
    navigate("/");
  };

  const renderWidgets = () => {
    const widgets = {
      "product-retail-price": [
        {
          id: "retail-product",
          title: "Retail product",
          content: RetailProductContent,
        },
        {
          id: "retail-product-news",
          title: "Retail product & news",
          content: RetailProductContent,
        },
      ],
      "flight-widget": [
        { id: "flight", title: "Flight widget", content: FlightContent },
      ],
      "depot-widget": [
        { id: "depot", title: "Depot widget", content: DepotContent },
      ],
      "news-widget": [
        { id: "news", title: "News widget", content: NewsContent },
      ],
      "report-widget": [
        { id: "report", title: "Report widget", content: ReportContent },
      ],
      "exchange-rate": [
        { id: "exchange", title: "Exchange rate", content: ExchangeContent },
      ],
    };

    return widgets[activeSidebarItem] || [];
  };

  const watchlistData = [
    {
      symbol: "PMS",
      name: "Premium Motor Spirit",
      price: "₦714.26",
      change: "+0.37",
      changePercent: "+0.05%",
      trend: "up",
      chartData: [50, 70, 60, 80, 75, 90, 85],
    },
    {
      symbol: "AGO",
      name: "Automotive Gas Oil",
      price: "₦1249.08",
      change: "-9.01",
      changePercent: "-0.72%",
      trend: "down",
      chartData: [90, 80, 70, 60, 65, 55, 50],
    },
    {
      symbol: "ICE",
      name: "ICE Brent Crude",
      price: "N0.00",
      change: "0.00",
      changePercent: "0.00%",
      trend: "neutral",
      chartData: [60, 60, 60, 60, 60, 60, 60],
    },
    {
      symbol: "DPK",
      name: "Dual Purpose Kerosene",
      price: "N2088.92",
      change: "-50.90",
      changePercent: "-2.38%",
      trend: "down",
      chartData: [80, 75, 70, 65, 60, 55, 50],
    },
  ];

  return (
    <div className="flex h-screen bg-[#262626] text-white overflow-hidden">
      <Sidebar
        activeItem={activeSidebarItem}
        setActiveItem={setActiveSidebarItem}
      />
      <div className="flex-1 flex">
        <div style={{ width: "70%" }} className="flex flex-col">
          <main
            className="flex-1 p-6 overflow-y-auto"
            style={{
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#333",
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
          >
            <div className="flex flex-wrap gap-4 justify-center">
              {renderWidgets().map((widget) => {
                const ContentComponent = widget.content;
                return (
                  <WidgetCard
                    key={widget.id}
                    title={widget.title}
                    description={`View and configure ${widget.title.toLowerCase()}`}
                    onSelect={() => handleWidgetSelect(widget.id)}
                    isSelected={selectedWidgets.includes(widget.id)}
                    selectedSize={widgetSizes[widget.id] || "M"}
                    onSizeChange={(size) => handleSizeChange(widget.id, size)}
                  >
                    {typeof ContentComponent === "function" ? (
                      <ContentComponent
                        product={watchlistData[0]}
                        showNews={widget.id === "retail-product-news"}
                        size={widgetSizes[widget.id] || "M"}
                      />
                    ) : (
                      ContentComponent
                    )}
                  </WidgetCard>
                );
              })}
              {activeSidebarItem === "product-retail-price" && (
                <>
                  <WidgetCard
                    title="Watchlist"
                    description="View price quotes and track performance of watchlist throughout the week."
                    onSelect={() => handleWidgetSelect("watchlist")}
                    isSelected={selectedWidgets.includes("watchlist")}
                    selectedSize={widgetSizes["watchlist"] || "M"}
                    onSizeChange={(size) => handleSizeChange("watchlist", size)}
                  >
                    <WatchlistContent
                      items={watchlistData}
                      size={widgetSizes["watchlist"] || "M"}
                    />
                  </WidgetCard>
                  <WidgetCard
                    title="Watchlist & news"
                    description="View price quotes, track performance and latest news of watchlist throughout the week."
                    onSelect={() => handleWidgetSelect("watchlist-news")}
                    isSelected={selectedWidgets.includes("watchlist-news")}
                    selectedSize={widgetSizes["watchlist-news"] || "M"}
                    onSizeChange={(size) =>
                      handleSizeChange("watchlist-news", size)
                    }
                  >
                    <WatchlistContent
                      items={watchlistData}
                      size={widgetSizes["watchlist-news"] || "M"}
                    />
                  </WidgetCard>
                </>
              )}
            </div>
          </main>
        </div>
        <aside
          style={{ width: "30%" }}
          className="p-6 flex flex-col items-center space-y-6 bg-[#262626]"
        >
          {selectedWidgets.map((widgetId) => {
            const widget = [
              ...renderWidgets(),
              {
                id: "watchlist",
                title: "Watchlist",
                content: WatchlistContent,
              },
              {
                id: "watchlist-news",
                title: "Watchlist & news",
                content: WatchlistContent,
              },
            ].find((w) => w.id === widgetId);
            if (!widget) return null;
            const ContentComponent = widget.content;
            const sizeClass =
              widgetSizes[widgetId] === "S"
                ? "h-24"
                : widgetSizes[widgetId] === "M"
                ? "h-48"
                : "h-80";
            return (
              <div
                key={widgetId}
                className={`${sizeClass} mx-auto px-8 rounded-3xl bg-black`}
              >
                {typeof ContentComponent === "function" ? (
                  <ContentComponent
                    product={watchlistData[0]}
                    showNews={
                      widgetId === "retail-product-news" ||
                      widgetId === "watchlist-news"
                    }
                    size={widgetSizes[widgetId] || "M"}
                    items={
                      widgetId.startsWith("watchlist")
                        ? watchlistData
                        : undefined
                    }
                  />
                ) : (
                  ContentComponent
                )}
              </div>
            );
          })}
          {selectedWidgets.length > 0 && (
            <div className="flex justify-center p-6">
              <button
                onClick={handleDone}
                className="px-4 py-2 bg-[#737373] rounded-full text-white font-medium hover:bg-[#313131] transition-colors duration-200"
              >
                Done
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default WidgetsConfiguration;
