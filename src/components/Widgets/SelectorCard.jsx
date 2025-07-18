import { Minus, Plus } from "lucide-react";
import SizeSelector from "../SizeSelector";

const SelectorCard = ({
  title,
  description,
  children,
  onSelect,
  isSelected,
  selectedSize,
  onSizeChange,
}) => {
  const sizeClasses = {
    small: "w-full h-full",
    medium: "w-full h-full",
    large: "w-full h-full",
  };

  const baseCardClasses = `
    rounded-3xl p-5 
    bg-[#404040] border border-[#2a2a2a] 
    text-white
    transition-all duration-300 ease-in-out
    ${sizeClasses[selectedSize]}
    flex flex-col
    h-full
  `;

  return (
    <div className={baseCardClasses}>
      <div className="mb-6 lg:flex-shrink-0">
        <h3 className="font-medium text-white text-base mb-1 leading-tight">
          {title}
        </h3>
        <p className="text-[#D4D4D4] text-xs leading-relaxed">{description}</p>
      </div>
      <div className="relative flex-1 mx-auto rounded-3xl overflow-hidden">
        <button
          onClick={onSelect}
          className="absolute cursor-pointer top-0.5 right-1.5 w-10 h-10 bg-[#00897B] rounded-full flex items-center justify-center hover:bg-[#2b5c57] transition-colors z-10"
        >
          {isSelected ? (
            <Minus size={20} className="text-white" />
          ) : (
            <Plus size={20} className="text-white" />
          )}
        </button>
        <div className="w-full h-full p-3">{children}</div>
      </div>
      <div className="mt-4 flex-shrink-0">
        <SizeSelector selectedSize={selectedSize} onSizeChange={onSizeChange} />
      </div>
    </div>
  );
};

export default SelectorCard;
