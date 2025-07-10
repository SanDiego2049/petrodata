import { Plus } from "lucide-react";

const WidgetCard = ({
  size,
  title,
  children,
  isConfigurable = false,
  onAddWidget,
}) => {
  const baseCardClasses = `
    rounded-lg p-4 shadow-lg flex flex-col
    bg-gray-800 text-gray-100 border border-gray-700
    transition-all duration-300 ease-in-out
  `;

  const sizeClasses = {
    sm: "w-[18rem] h-[16rem] text-xs",
    md: "w-[20rem] h-[18rem] text-sm",
    lg: "w-[28rem] h-[24rem] text-base",
  };

  return (
    <div className={`${baseCardClasses} ${sizeClasses[size]} overflow-hidden`}>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-white text-base md:text-lg lg:text-xl">
          {title}
        </h3>
        {/* Plus Icon for Configuration Page */}
        {isConfigurable && (
          <button
            onClick={onAddWidget}
            className="p-1.5 bg-green-600 hover:bg-green-700 rounded-full text-white transition-colors duration-200"
            aria-label="Add widget to dashboard"
          >
            <Plus size={18} />
          </button>
        )}
      </div>
      {/* Widget Content (Passed as children) */}
      <div className="flex-grow w-full overflow-auto">{children}</div>
    </div>
  );
};

export default WidgetCard;
