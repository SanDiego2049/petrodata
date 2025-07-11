const DepotContent = ({ size }) => {
  const renderContent = () => {
    switch (size) {
      case "S":
        return <div>Depot Status</div>;
      case "M":
        return <div>Depot Status with Graph</div>;
      case "L":
        return <div>Full Depot Details</div>;
      default:
        return null;
    }
  };

  return <div>{renderContent()}</div>;
};

export default DepotContent;
