const ReportContent = ({ size }) => {
  const renderContent = () => {
    switch (size) {
      case "S":
        return <div>Report Summary</div>;
      case "M":
        return <div>Report Summary with Chart</div>;
      case "L":
        return <div>Full Report Details</div>;
      default:
        return null;
    }
  };

  return <div>{renderContent()}</div>;
};

export default ReportContent;
