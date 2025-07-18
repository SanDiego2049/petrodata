import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import WidgetsConfiguration from "./pages/WidgetsConfiguration";
import NotFound from "./pages/NotFound";
import { WidgetsProvider } from "./contexts/WidgetContext";

const App = () => {
  return (
    <>
      <WidgetsProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/widgets" element={<WidgetsConfiguration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </WidgetsProvider>
    </>
  );
};

export default App;
