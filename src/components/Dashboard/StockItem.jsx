import MiniChart from "../Dashboard/MiniChart";

const StockItem = ({ stock, darkMode = true, showChart = true }) => {
  const getChartColor = (trend) => {
    switch (trend) {
      case "up":
        return "#10B981";
      case "down":
        return "#EF4444";
      default:
        return "#10B981";
    }
  };

  const getTrendIcon = (trend) => {
    if (trend === "up") {
      return "▲";
    } else if (trend === "down") {
      return "▼";
    }
    return "";
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case "up":
        return "text-green-400";
      case "down":
        return "text-red-400";
      default:
        return darkMode ? "text-white" : "text-gray-900";
    }
  };

  return (
    <div className="flex border-b-1 last:border-b-0 border-[#36353A] items-center justify-between py-2">
      <div className="flex items-center space-x-3 flex-1">
        <div className="flex items-center space-x-2">
          <span className={`text-xs font-medium ${getTrendColor(stock.trend)}`}>
            {getTrendIcon(stock.trend)}
          </span>
          <span className="flex flex-col">
            <span
              className={`font-medium text-sm ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {stock.symbol}
            </span>
            <span
              className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {stock.name}
            </span>
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {showChart && (
          <div className="h-12 w-24 sm:w-32 md:w-40 flex-grow-0 flex-shrink-0">
            <MiniChart
              data={stock.chartData}
              color={getChartColor(stock.trend)}
              trend={stock.trend}
            />
          </div>
        )}
        <div className="text-right min-w-[60px] flex-shrink-0">
          <div
            className={`font-medium text-sm ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {stock.price}
          </div>
          <div className={`text-xs ${getTrendColor(stock.trend)}`}>
            {stock.change}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockItem;
