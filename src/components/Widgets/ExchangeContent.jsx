const ExchangeContent = ({ size }) => {
  const renderContent = () => {
    switch (size) {
      case "S":
        return <div>Exchange Rate</div>;
      case "M":
        return <div>Exchange Rate with Trend</div>;
      case "L":
        return <div>Full Exchange Data</div>;
      default:
        return null;
    }
  };

  return <div>{renderContent()}</div>;
};

export default ExchangeContent;
