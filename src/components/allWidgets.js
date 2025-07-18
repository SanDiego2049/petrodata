// components/allWidgets.js
import RetailProductCard from "./widgets/RetailProductCard";
import RetailProductCardWithNews from "./widgets/RetailProductCardWithNews";
import WatchlistCard from "./widgets/WatchlistCard";
import WatchlistWithNewsCard from "./widgets/WatchlistWithNewsCard";
import DepotCard from "./widgets/DepotCard";
import FlightStatCard from "./widgets/FlightStatCard";
import NewsCard from "./widgets/NewsCard";
import ReportCard from "./widgets/ReportCard";
import ExchangeRateCard from "./widgets/ExchangeRateCard";

export default {
  "retail-product": RetailProductCard,
  "retail-product-news": RetailProductCardWithNews,
  watchlist: WatchlistCard,
  "watchlist-news": WatchlistWithNewsCard,
  depot: DepotCard,
  "flight-stat": FlightStatCard,
  news: NewsCard,
  report: ReportCard,
  exchange: ExchangeRateCard,
};
