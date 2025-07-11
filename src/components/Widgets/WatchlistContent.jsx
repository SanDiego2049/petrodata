import StockItem from "../Dashboard/StockItem";

const WatchlistContent = ({ items, size }) => {
  const renderContent = () => {
    switch (size) {
      case "S":
        return items
          .slice(0, 1)
          .map((item, index) => (
            <StockItem
              key={index}
              stock={item}
              darkMode={true}
              showChart={false}
            />
          ));
      case "M":
        return items
          .slice(0, 2)
          .map((item, index) => (
            <StockItem
              key={index}
              stock={item}
              darkMode={true}
              showChart={true}
            />
          ));
      case "L":
        return items.map((item, index) => (
          <StockItem
            key={index}
            stock={item}
            darkMode={true}
            showChart={true}
          />
        ));
      default:
        return null;
    }
  };

  return <div>{renderContent()}</div>;
};

export default WatchlistContent;
