import StockItem from "./StockItem";
import { Warehouse } from "lucide-react";

const DepotCard = ({ darkMode = true, size = "large" }) => {
  const depotData = [
    {
      symbol: "NIPCO",
      name: "Lagos",
      price: "₦714.26",
      change: "+0.37",
      changePercent: "+0.05%",
      trend: "up",
      chartColor: "text-green-400",
    },
    {
      symbol: "Oando PLC",
      name: "Rivers",
      price: "₦714.26",
      change: "+0.37",
      changePercent: "+0.05%",
      trend: "up",
      chartColor: "text-green-400",
    },
    {
      symbol: "MRS Oil Nigeria P...",
      name: "Oyo",
      price: "₦714.26",
      change: "+0.37",
      changePercent: "+0.05%",
      trend: "up",
      chartColor: "text-green-400",
    },
  ];

  return (
    <div
      className={`${
        darkMode ? "bg-[#171717] text-white" : "bg-white text-black"
      } rounded-3xl p-4 w-full h-full flex flex-col`}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-9 h-9 flex-shrink-0 bg-orange-50 rounded-full flex items-center justify-center">
          <span className="text-orange-500 text-xs font-bold">
            <Warehouse />
          </span>
        </div>
        <h3 className="font-medium text-sm">Depot</h3>
      </div>

      <div className="space-y-3 flex-grow">
        {depotData.slice(0, size === "small" ? 2 : 3).map((depot, index) => (
          <StockItem key={index} stock={depot} darkMode={darkMode} />
        ))}
      </div>

      <div className=" flex flex-wrap gap-2 border-t border-gray-700">
        {["PMS", "AGO", "DPK", "ICE", "LPG"].map((tag, index) => (
          <span
            key={index}
            className={`px-2 py-1 text-xs font-medium ${
              index === 0
                ? "border-t-1 border-[#009688] text-[#009688]"
                : "text-[#A3A3A3]"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DepotCard;
