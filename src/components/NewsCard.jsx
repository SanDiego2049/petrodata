const NewsCard = ({ darkMode }) => (
  <div
    className={`${
      darkMode ? "bg-gray-800" : "bg-white"
    } rounded-xl p-6 border ${
      darkMode ? "border-gray-700" : "border-gray-200"
    } relative overflow-hidden`}
  >
    <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs px-2 py-1 rounded">
      ICE
    </div>
    <div className="h-40 bg-gradient-to-br from-green-400 to-teal-600 rounded-lg mb-4 flex items-center justify-center">
      <div className="text-white text-6xl font-bold">bp</div>
    </div>
    <div className="text-sm text-gray-400 mb-1">Vanguard</div>
    <h3
      className={`text-sm font-medium ${
        darkMode ? "text-white" : "text-gray-900"
      }`}
    >
      Shareholders Enjoy a Massive Windfall as BP Expands Global...
    </h3>
  </div>
);

export default NewsCard;
