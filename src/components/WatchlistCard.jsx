const WatchlistCard = ({ darkMode, showNews = false }) => {
  const watchlistData = [
    {
      symbol: "PMS",
      name: "Premium Motor Spirit",
      price: "₦714.26",
      change: "+0.37",
    },
    {
      symbol: "AGO",
      name: "Automotive Gas Oil",
      price: "₦1249.06",
      change: "-8.01",
    },
    { symbol: "ICE", name: "ICE Brent Crude", price: "₦0.00", change: "0.00" },
    {
      symbol: "DPK",
      name: "Dual Purpose Kerosene",
      price: "₦1088.92",
      change: "-50.90",
    },
  ];

  return (
    <div
      className={`${
        darkMode ? "bg-[#171717]" : "bg-white"
      } rounded-xl p-6 border ${
        darkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className={`font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {showNews ? "Watchlist & news" : "Watchlist"}
        </h3>
      </div>

      <div className="space-y-3">
        {watchlistData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  item.change.startsWith("+")
                    ? "bg-green-400"
                    : item.change.startsWith("-")
                    ? "bg-red-400"
                    : "bg-gray-400"
                }`}
              ></div>
              <span
                className={`font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {item.symbol}
              </span>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {item.name}
              </span>
            </div>
            <div className="text-right">
              <div
                className={`font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {item.price}
              </div>
              <div
                className={`text-sm ${
                  item.change.startsWith("+")
                    ? "text-green-400"
                    : item.change.startsWith("-")
                    ? "text-red-400"
                    : "text-gray-400"
                }`}
              >
                {item.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showNews && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Heirs Energies doubles oil production - Official...
          </p>
        </div>
      )}
    </div>
  );
};

export default WatchlistCard;
