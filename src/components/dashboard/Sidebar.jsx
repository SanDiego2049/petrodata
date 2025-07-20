import { useEffect } from "react";
import {
  Settings,
  LayoutDashboard,
  BookOpen,
  ChevronsLeft,
  BookmarkMinus,
  ChartNoAxesColumn,
  Sparkle,
} from "lucide-react";
import logo from "../../assets/entypo_drop.png";

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: ChartNoAxesColumn, label: "Analysis", active: false },
    { icon: BookOpen, label: "News & Report", active: false },
    { icon: Sparkle, label: "Exclusive report", active: false },
    { icon: BookmarkMinus, label: "Watchlist", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  // Prevent background scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobileOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile Overlay - blocks clicks + adds blur */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          ${isCollapsed ? "w-16" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          fixed top-0 left-0 h-screen flex flex-col z-50
          transition-all duration-300 ease-in-out
          bg-white dark:bg-[#171717] text-gray-900 dark:text-white
          md:relative md:translate-x-0
        `}
      >
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`
            absolute top-1/10 -translate-y-1/2 p-2 rounded-full border
            bg-white hover:bg-[#f5f5f5] text-gray-900 border-gray-300
            dark:bg-[#262626] dark:hover:bg-[#111111] dark:text-white dark:border-[#404040]
            transition-all z-10
            ${isCollapsed ? "right-[-14px]" : "right-[-12px]"}
            hidden md:block
          `}
          aria-label="Toggle sidebar"
        >
          <ChevronsLeft
            size={20}
            className={`transition-transform duration-300 ${
              isCollapsed ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {/* Logo */}
        <div className="p-4 mb-10 flex items-center gap-4">
          <img src={logo} alt="Petrodata Logo" />
          <span
            className={`text-2xl font-medium text-[#A3A3A3] whitespace-nowrap overflow-hidden transition-opacity duration-200 ${
              isCollapsed ? "opacity-0" : "opacity-100"
            }`}
          >
            <span className="text-[#26A69A]">Petro</span>data
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex-grow flex flex-col gap-2 mt-30">
          {sidebarItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`
                flex items-center gap-4 px-4 py-2.5 transition-colors
                ${
                  item.active
                    ? "bg-[#26A69A]/10 text-[#26A69A] border-e-2 border-[#26A69A]"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                }
                ${isCollapsed ? "justify-center" : ""}
              `}
            >
              <item.icon className="min-w-[20px] w-5 h-5" />
              <span
                className={`text-sm font-medium whitespace-nowrap overflow-hidden ${
                  isCollapsed ? "hidden" : "block"
                }`}
              >
                {item.label}
              </span>
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
