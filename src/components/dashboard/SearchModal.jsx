import { useState } from "react";
import {
  Search,
  BarChart3,
  Newspaper,
  FileText,
  Sparkle,
  Check,
  X,
} from "lucide-react";
import logo from "../../assets/entypo_drop.png";

const SearchModal = ({ isOpen, onClose }) => {
  const [activeMainTab, setActiveMainTab] = useState("Search");
  const [activeFilterTab, setActiveFilterTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState("");

  if (!isOpen) return null;

  const mainTabs = ["Search", "Ask Petrodata AI"];

  const filterTabs = [
    { name: "All", icon: Search },
    { name: "Analysis", icon: BarChart3 },
    { name: "News", icon: Newspaper },
    { name: "Report", icon: FileText },
    { name: "Exclusive report", icon: Sparkle },
  ];

  const suggestions = [
    "PMS Petroleum Motor Spirit",
    "AGO Automotive Gas Oil",
    "DPK Dual Purpose Kerosene",
    "LPG Liquified Petroleum Gas",
    "ICE ICE Brent Crude",
  ];

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setSearchQuery(suggestion);
  };

  return (
    <div className="fixed inset-0 backdrop-blur bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-gray-100 dark:bg-[#171717] text-[#303030] dark:text-white rounded-lg w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Header Tabs */}
        <div className="flex items-center p-4 gap-2">
          <img src={logo} alt="" />
          <div className="flex rounded-lg p-1">
            {mainTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveMainTab(tab)}
                className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  activeMainTab === tab
                    ? "bg-gray-200 dark:bg-[#525252] text-black dark:text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="pb-4">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-12 py-4 dark:text-white text-black placeholder-gray-400 border-b dark:border-[#404040] border-gray-400 focus:border-teal-500 focus:outline-none text-md bg-transparent"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="pb-4">
          <div className="flex px-6 gap-1 border-b dark:border-[#404040] border-gray-300 overflow-x-auto">
            {filterTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveFilterTab(tab.name)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors relative ${
                    activeFilterTab === tab.name
                      ? "text-[#00897B]"
                      : "text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  {IconComponent && <IconComponent size={16} />}
                  {tab.name}
                  {activeFilterTab === tab.name && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Suggestions */}
        <div className="px-6 pb-6 overflow-y-auto">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-4">
            Suggestions
          </h3>
          <div className="space-y-1">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full flex items-center justify-between p-4 text-left rounded-lg transition-colors ${
                  selectedSuggestion === suggestion
                    ? "dark:bg-gray-600 bg-teal-100 text-black dark:text-white"
                    : "bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <span className="text-md">{suggestion}</span>
                {selectedSuggestion === suggestion && (
                  <Check size={20} className="text-teal-400 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
