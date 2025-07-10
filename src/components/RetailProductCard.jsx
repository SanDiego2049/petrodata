import React from "react";
import StockItem from "./StockItem";

const RetailProductCard = ({
  darkMode = true,
  size = "large",
  showNews = false,
}) => {
  const stockData = [
    {
      symbol: "PMS",
      name: "Premium Motor Spirit",
      price: "₦714.26",
      change: "+0.37",
      changePercent: "+0.05%",
      trend: "up",
      chartColor: "text-green-400",
    },
    {
      symbol: "AGO",
      name: "Automotive Gas Oil",
      price: "₦1249.06",
      change: "-9.01",
      changePercent: "-0.63%",
      trend: "down",
      chartColor: "text-red-400",
    },
    {
      symbol: "ICE",
      name: "ICE Brent Crude",
      price: "₦0.00",
      change: "0.00",
      changePercent: "0.00%",
      trend: "up",
      chartColor: "text-green-400",
    },
    {
      symbol: "DPK",
      name: "Dual Purpose Kerosene",
      price: "₦1088.92",
      change: "-50.90",
      changePercent: "-4.46%",
      trend: "down",
      chartColor: "text-red-400",
    },
  ];

  return (
    <div
      className={`${
        darkMode ? "bg-[#171717]" : "bg-white"
      } rounded-3xl p-4 w-full`}
    >
      <div className="space-y-3">
        {stockData.slice(0, size === "small" ? 2 : 4).map((stock, index) => (
          <StockItem key={index} stock={stock} darkMode={darkMode} />
        ))}
      </div>

      {showNews && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Heirs Energies doubles oil production - Official...
          </p>
        </div>
      )}
    </div>
  );
};

export default RetailProductCard;
