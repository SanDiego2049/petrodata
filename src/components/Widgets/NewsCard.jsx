import { useEffect, useState } from "react";
import mockNews from "../../data/mockNews";
import fullData from "../../data/data.json";
import newsIcon1 from "../../assets/News Icon.png";
import newsIcon2 from "../../assets/Group.png";

const cardWidths = {
  small: "w-100",
  medium: "w-200",
  large: "w-100",
};

const cardHeights = {
  small: "h-100",
  medium: "h-100",
  large: "h-120",
};

const COMMODITIES = ["PMS", "AGO", "DPK", "LPG"];

const COMMODITY_COLORS = {
  PMS: "#B42318",
  AGO: "#B54708",
  DPK: "#F59E0B",
  LPG: "#00796B",
};

const COMMODITY_NAMES = {
  PMS: "PMS",
  AGO: "AGO",
  DPK: "DPK",
  LPG: "LPG",
};

const uniqueStates = [...new Set(fullData.map((d) => d.State))];

const NewsCard = ({ size = "small", preview = false }) => {
  const [state, setState] = useState("Abuja");
  const [currentCommodityIndex, setCurrentCommodityIndex] = useState(0);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const currentCommodity = COMMODITIES[currentCommodityIndex];
  const currentNews = mockNews[currentCommodity][currentNewsIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevNewsIndex) => {
        const nextNewsIndex =
          (prevNewsIndex + 1) % mockNews[currentCommodity].length;

        if (nextNewsIndex === 0) {
          setCurrentCommodityIndex(
            (prevCommodityIndex) =>
              (prevCommodityIndex + 1) % COMMODITIES.length
          );
        }

        return nextNewsIndex;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [currentCommodity]);

  useEffect(() => {
    setCurrentNewsIndex(0);
  }, [currentCommodityIndex]);

  const CommodityBadge = ({ commodity }) => (
    <div
      className="px-3 py-1 rounded-full text-xs text-white"
      style={{ backgroundColor: COMMODITY_COLORS[commodity] }}
    >
      {COMMODITY_NAMES[commodity]}
    </div>
  );

  if (preview) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#171717] rounded-xl text-white">
        <div className="flex flex-col truncate items-center justify-center text-center px-4 py-3">
          <CommodityBadge commodity={currentCommodity} />
          <span className="text-xs font-medium mt-1 line-clamp-2 max-w-[9rem]">
            {currentNews.headline}
          </span>
        </div>
      </div>
    );
  }

  const Wrapper = ({ children }) => (
    <div
      className={`text-white rounded-3xl ${cardWidths[size]} ${cardHeights[size]} overflow-hidden`}
    >
      <div className="h-full">{children}</div>
    </div>
  );

  const NewsItem = ({ news, commodity }) => (
    <div className="flex border-b-1 border-[#36353A] justify-between gap-2 py-3">
      <div className="flex-1">
        <div className="flex items-center justify-between flex-shrink-0 w-full">
          <img className=" h-3" src={newsIcon2} alt="News Icon" />
          <CommodityBadge commodity={commodity} />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white leading-tight">
            {news.headline}
          </h4>
          <p className="text-xs text-gray-400 leading-tight">{news.summary}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <img
          src={news.image}
          alt="News"
          className="w-16 h-16 object-cover rounded"
        />
      </div>
    </div>
  );

  const NewsContent = ({ news }) => (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-semibold text-white leading-tight">
        {news.headline}
      </h3>
    </div>
  );

  if (size === "large") {
    const topStories = mockNews.PMS.slice(0, 5);
    const forYouStory = mockNews.AGO[0];

    return (
      <Wrapper>
        <div className="p-6 h-full bg-[#171717] flex flex-col">
          <div className="flex justify-between items-center border-b border-[#36353A] pb-2">
            <span className="text-md font-semibold text-red-500">
              Top Stories
            </span>
            <img src={newsIcon1} alt="News Icon" className="h-4" />
          </div>

          <div className="flex-1 overflow-y-auto pr-2 mt-2">
            <div className="flex flex-col gap-4">
              {topStories.map((news, index) => (
                <div
                  key={index}
                  className="flex border-b border-[#36353A] pb-2 gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <img className="h-3" src={newsIcon2} alt="Publisher" />
                      <div className="flex gap-1">
                        {index === 2 ? (
                          <>
                            <CommodityBadge commodity="AGO" />
                            <CommodityBadge commodity="PMS" />
                          </>
                        ) : (
                          <CommodityBadge commodity="DPK" />
                        )}
                      </div>
                    </div>
                    <h4 className="text-sm font-semibold text-white leading-tight">
                      {news.headline}
                    </h4>
                    <p className="text-xs text-gray-400 leading-tight mt-1">
                      {news.summary}
                    </p>
                  </div>
                  <img
                    src={news.image}
                    alt="Thumbnail"
                    className="w-16 h-16 object-cover rounded"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center border-b border-[#36353A] pb-2">
                <span className="text-md font-semibold text-green-500">
                  For You
                </span>
              </div>
              <div className="flex justify-between gap-3 pt-2">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <img className="h-3" src={newsIcon2} alt="Publisher" />
                    <div className="flex gap-1">
                      <CommodityBadge commodity="AGO" />
                      <CommodityBadge commodity="PMS" />
                    </div>
                  </div>
                  <h4 className="text-sm font-semibold text-white leading-tight">
                    {forYouStory.headline}
                  </h4>
                  <p className="text-xs text-gray-400 leading-tight mt-1">
                    {forYouStory.summary}
                  </p>
                </div>
                <img
                  src={forYouStory.image}
                  alt="News"
                  className="w-16 h-16 object-cover rounded"
                />
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="bg-[#171717] text-white border border-gray-600 rounded px-2 py-1 opacity-50"
            >
              {uniqueStates.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Wrapper>
    );
  }

  if (size === "medium") {
    const newsItems = mockNews.PMS.slice(0, 2);

    return (
      <Wrapper>
        <div className="p-6 h-full bg-[#171717] flex flex-col">
          <div className="flex justify-between items-center border-b border-[#36353A] pb-2">
            <span className="text-md font-semibold text-red-500">
              Top Stories
            </span>
            <img src={newsIcon1} alt="Top Left" className="h-4" />
          </div>

          {newsItems.map((news, index) => (
            <NewsItem
              key={index}
              news={news}
              commodity={index === 0 ? "PMS" : "AGO"}
            />
          ))}

          <div className="mt-auto">
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="bg-[#171717] text-white border border-gray-600 rounded px-2 py-1 opacity-50"
            >
              {uniqueStates.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div
        className="relative h-full"
        style={{
          backgroundImage: `url(${currentNews.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80"></div>

        <div className="flex flex-col justify-between h-full p-4 relative">
          <div className="flex items-center justify-between mb-3">
            <CommodityBadge commodity={currentCommodity} />
            <img
              src={newsIcon1}
              alt={`${currentCommodity} icon`}
              className="h-4"
            />
          </div>

          <div className="mb-3">
            <div className="flex mb-2">
              <img src={newsIcon2} alt="Company logo" className="h-3" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <NewsContent news={currentNews} />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default NewsCard;
