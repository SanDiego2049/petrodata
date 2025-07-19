import {
  Search,
  LayoutDashboard,
  Plane,
  Warehouse,
  Newspaper,
  File,
  ArrowRightLeft,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const Sidebar = ({
  activeItem,
  setActiveItem,
  searchQuery,
  setSearchQuery,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarItems = [
    {
      id: "product-retail-price",
      icon: LayoutDashboard,
      label: "Product retail price",
      keywords: [
        "product",
        "retail",
        "price",
        "watchlist",
        "pms",
        "ago",
        "ice",
        "dpk",
      ],
    },
    {
      id: "flight-widget",
      icon: Plane,
      label: "Flight widget",
      keywords: ["flight", "aviation", "airline", "airport"],
    },
    {
      id: "depot-widget",
      icon: Warehouse,
      label: "Depot widget",
      keywords: ["depot", "warehouse", "storage", "capacity"],
    },
    {
      id: "news-widget",
      icon: Newspaper,
      label: "News widget",
      keywords: ["news", "article", "updates", "headlines"],
    },
    {
      id: "report-widget",
      icon: File,
      label: "Report widget",
      keywords: ["report", "document", "analysis", "summary"],
    },
    {
      id: "exchange-rate",
      icon: ArrowRightLeft,
      label: "Exchange rate",
      keywords: [
        "exchange",
        "rate",
        "currency",
        "usd",
        "ngn",
        "dollar",
        "naira",
      ],
    },
  ];

  const filteredItems = sidebarItems.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile open button */}
      {!isOpen && (
        <button
          className="lg:hidden fixed top-3 left-3 z-50 bg-white text-black dark:bg-[#171717] dark:text-white p-2 rounded-md"
          onClick={() => setIsOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 flex flex-col
          bg-white text-black dark:bg-[#171717] dark:text-white
          transform transition-transform duration-300 ease-in-out
          z-40
          lg:static lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200 dark:border-[#404040] flex items-center gap-2">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search widgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-gray-100 dark:bg-[#262626] border border-gray-300 dark:border-[#404040] rounded-full text-black dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#26A69A]"
            />
          </div>

          {/* Close button */}
          <button
            className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#333]"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4 pl-4 overflow-y-auto">
          <div className="space-y-2">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  activeItem === item.id
                    ? "text-[#26A69A] border-r-2 border-[#26A69A]"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#262626] hover:text-black dark:hover:text-white"
                }`}
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
