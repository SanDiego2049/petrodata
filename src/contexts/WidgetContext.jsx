// context/WidgetsContext.jsx
import { createContext, useContext, useState } from "react";

const WidgetsContext = createContext();

export const WidgetsProvider = ({ children }) => {
  const [selectedWidgets, setSelectedWidgets] = useState([]);
  const [widgetSizes, setWidgetSizes] = useState({});

  return (
    <WidgetsContext.Provider
      value={{
        selectedWidgets,
        setSelectedWidgets,
        widgetSizes,
        setWidgetSizes,
      }}
    >
      {children}
    </WidgetsContext.Provider>
  );
};

export const useWidgets = () => useContext(WidgetsContext);
