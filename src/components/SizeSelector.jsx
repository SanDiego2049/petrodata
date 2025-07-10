const SizeSelector = ({ selectedSize, onSizeChange }) => (
  <div className="flex space-x-2 mt-4">
    {["S", "M", "L"].map((size) => (
      <button
        key={size}
        onClick={() => onSizeChange(size)}
        className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
          selectedSize === size
            ? "bg-gray-600 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        {size}
      </button>
    ))}
  </div>
);

export default SizeSelector;
