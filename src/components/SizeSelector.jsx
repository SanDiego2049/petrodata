const SizeSelector = ({ selectedSize, onSizeChange }) => {
  const sizeMap = {
    S: "small",
    M: "medium",
    L: "large",
  };

  const displayMap = {
    small: "S",
    medium: "M",
    large: "L",
  };

  const handleSizeClick = (displaySize) => {
    const actualSize = sizeMap[displaySize];
    onSizeChange(actualSize);
  };

  const currentDisplay = displayMap[selectedSize] || "S";

  return (
    <div className="flex justify-center space-x-2 mt-4">
      {["S", "M", "L"].map((size) => {
        const isActive = currentDisplay === size;
        return (
          <button
            key={size}
            onClick={() => handleSizeClick(size)}
            className={`w-10 h-10 rounded-full text-sm font-medium transition-colors border ${
              isActive
                ? "bg-gray-900 text-white border-gray-800 dark:bg-[#262626] dark:border-[#262626]"
                : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300 dark:bg-[#525252] dark:text-gray-300 dark:border-[#737373] dark:hover:bg-[#2e2e2e]"
            }`}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
};

export default SizeSelector;
