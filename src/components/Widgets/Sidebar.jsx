import {
  Search,
  Tag,
  Plane,
  Newspaper,
  File,
  ArrowRightLeft,
  Warehouse,
  Menu,
} from "lucide-react";
import { useState } from "react";

const Sidebar = ({ activeItem, setActiveItem }) => {
  const sidebarItems = [
    { id: "product-retail-price", icon: Tag, label: "Product retail price" },
    { id: "flight-widget", icon: Plane, label: "Flight widget" },
    { id: "depot-widget", icon: Warehouse, label: "Depot widget" },
    { id: "news-widget", icon: Newspaper, label: "News widget" },
    { id: "report-widget", icon: File, label: "Report widget" },
    { id: "exchange-rate", icon: ArrowRightLeft, label: "Exchange rate" },
  ];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden p-2 fixed top-4 left-4 z-50 bg-[#404040] rounded-full text-white"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={24} />
      </button>
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static top-0 left-0 w-64 p-6 flex flex-col h-screen bg-[#262626] transition-transform duration-300 ease-in-out z-40 md:z-auto`}
      >
        <button
          className="md:hidden absolute top-4 right-4 text-white"
          onClick={() => setIsOpen(false)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="mb-8">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search product..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-[#404040] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <nav className="flex-grow overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              className={`flex items-center w-full px-4 py-3 rounded-full text-sm font-medium transition-colors duration-200
                ${
                  activeItem === item.id
                    ? "bg-[#404040] text-white"
                    : "text-gray-400 hover:bg-[#202020] hover:text-white"
                }`}
              onClick={() => {
                setActiveItem(item.id);
                if (isOpen) setIsOpen(false);
              }}
            >
              {item.icon && <item.icon size={20} className="mr-3" />}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
