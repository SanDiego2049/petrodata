const FlightContent = ({ size }) => {
  const renderContent = () => {
    switch (size) {
      case "S":
        return <div>Flight Symbol</div>;
      case "M":
        return <div>Flight Symbol with Mini Stats</div>;
      case "L":
        return <div>Full Flight Stats</div>;
      default:
        return null;
    }
  };

  return <div>{renderContent()}</div>;
};

export default FlightContent;
