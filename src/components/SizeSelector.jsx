const SizeSelector = ({ selectedSize, onSizeChange }) => (
  <div className="flex justify-center space-x-2 mt-4">
    {["S", "M", "L"].map((size) => (
      <button
        key={size}
        onClick={() => onSizeChange(size)}
        className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
          selectedSize === size
            ? "bg-[#262626] text-white"
            : "bg-[#525252] border-1 border-[#737373] text-gray-300 hover:bg-[#2e2e2e]"
        }`}
      >
        {size}
      </button>
    ))}
  </div>
);

export default SizeSelector;
