import { TrendingUp } from "lucide-react";
import MiniChart from "../Dashboard/MiniChart";

const RetailProductContent = ({ product, showNews = false, size }) => {
  const defaultProduct = {
    symbol: "PMS",
    name: "Premium Motor Spirit",
    price: "₦714.26",
    change: "+0.37",
    changePercent: "+0.09%",
    trend: "up",
    chartData: [20, 25, 15, 30, 35, 25, 40, 45, 35, 50, 55, 60],
  };

  const currentProduct = product || defaultProduct;

  const renderContent = () => {
    switch (size) {
      case "S":
        return (
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-between mb-4 w-full">
              <span className="font-semibold">
                <span className="text-green-400">▲</span>
                {currentProduct.symbol}
              </span>
              <span className="text-green-400">{currentProduct.change}</span>
            </div>
            <div className="flex text-sm justify-between mb-6 w-full">
              <span className="text-[#A3A3A3]">{currentProduct.name}</span>
              <span className="text-green-400">
                {currentProduct.changePercent}
              </span>
            </div>
            <MiniChart
              data={currentProduct.chartData}
              color="#10B981"
              trend="up"
            />
            <div className="mt-10 text-center text-5xl font-semibold">
              {currentProduct.price}
            </div>
          </div>
        );
      case "M":
        return (
          <div className="flex flex-col items-center">
            <span>{currentProduct.symbol}</span>
            <MiniChart
              data={currentProduct.chartData}
              color="#10B981"
              trend="up"
            />
            <span>{currentProduct.price}</span>
          </div>
        );
      case "L":
        return (
          <div className="flex flex-col justify-center">
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <TrendingUp size={16} className="text-green-400 mr-2" />
                <span className="text-white text-sm font-medium">
                  {currentProduct.symbol}
                </span>
              </div>
              <span className="ml-auto text-green-400 text-sm">
                {currentProduct.change}
              </span>
            </div>
            <div className="mb-4 flex justify-between">
              <span className="text-gray-400 text-xs">
                {currentProduct.name}
              </span>
              <span className="ml-2 text-green-400 text-xs">
                {currentProduct.changePercent}
              </span>
            </div>
            <div className="h-20 mb-4 flex items-end">
              <MiniChart
                data={currentProduct.chartData}
                color="#10B981"
                trend="up"
              />
            </div>
            <div className="mb-4 text-center">
              <p className="text-white text-4xl font-bold">
                {currentProduct.price}
              </p>
            </div>
            {showNews && (
              <div className="mt-auto pt-4 border-t border-gray-700">
                <p className="text-white text-sm font-medium mb-2">News</p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Heirs Energies doubles oil production - Official...
                </p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderContent()}</div>;
};

export default RetailProductContent;
