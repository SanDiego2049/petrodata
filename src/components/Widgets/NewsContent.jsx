const NewsContent = ({ size }) => {
  const renderContent = () => {
    switch (size) {
      case "S":
        return <div>News Headline</div>;
      case "M":
        return <div>News Headline with Snippet</div>;
      case "L":
        return <div>Full News Article</div>;
      default:
        return null;
    }
  };

  return <div>{renderContent()}</div>;
};

export default NewsContent;
