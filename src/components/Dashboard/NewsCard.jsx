import news_image from "../../assets/News widget.png";

const NewsCard = () => (
  <div
    style={{ backgroundImage: `url(${news_image})` }}
    className="bg-cover bg-center rounded-3xl p-4 sm:p-6 relative overflow-hidden h-full flex flex-col"
  >
    {/* Opaque overlay */}
    <div className="absolute inset-0 bg-black opacity-40 rounded-3xl"></div>

    {/* Content Wrapper */}
    <div className="relative z-10 flex flex-col h-full">
      <div className="absolute top-0 left-0 sm:top-0 sm:left-0 bg-teal-600 text-white text-xs px-2 py-1 rounded-full">
        ICE
      </div>
      <div className="mt-6 mb-2 sm:mb-8 flex items-center justify-center flex-grow"></div>
      <div className="text-xs sm:text-sm text-gray-400 mb-0.5 sm:mb-1">
        Vanguard
      </div>
      <h3 className="text-white text-sm sm:text-base font-medium">
        Shareholders Enjoy a Massive Windfall as BP Expands Global...
      </h3>
    </div>
  </div>
);

export default NewsCard;
