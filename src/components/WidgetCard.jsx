import SizeSelector from "../components/SizeSelector";

const WidgetCard = ({
  title,
  description,
  children,
  onSelect,
  isSelected,
  selectedSize,
  onSizeChange,
}) => {
  const baseCardClasses = `
    rounded-3xl w-100 p-5 
    bg-[#404040] border border-[#2a2a2a] 
    text-white
    transition-all duration-300 ease-in-out
  `;

  return (
    <div className={`${baseCardClasses}`}>
      <div className="mb-6">
        <h3 className="font-medium text-white text-base mb-1 leading-tight">
          {title}
        </h3>
        <p className="text-[#D4D4D4] text-xs leading-relaxed">{description}</p>
      </div>
      <div className="flex-grow w-80 h-80 mx-auto px-4 rounded-3xl bg-black">
        {children}
      </div>
      <div className="mt-4 flex justify-center items-center">
        <button
          onClick={onSelect}
          className={`px-3 py-1 rounded-full text-sm ${
            isSelected
              ? "bg-[#313131] text-white"
              : "bg-[#737373] text-gray-300"
          }`}
        >
          {isSelected ? "Selected" : "Select"}
        </button>
      </div>
      <SizeSelector selectedSize={selectedSize} onSizeChange={onSizeChange} />
    </div>
  );
};

export default WidgetCard;
