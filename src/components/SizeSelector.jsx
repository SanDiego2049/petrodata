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
      {["S", "M", "L"].map((size) => (
        <button
          key={size}
          onClick={() => handleSizeClick(size)}
          className={`w-10 h-10 cursor-pointer rounded-full text-sm font-medium transition-colors ${
            currentDisplay === size
              ? "bg-[#262626] text-white"
              : "bg-[#525252] border-1 border-[#737373] text-gray-300 hover:bg-[#2e2e2e]"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default SizeSelector;
