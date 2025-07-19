import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import WidgetsConfiguration from "./pages/WidgetsConfiguration";
import NotFound from "./pages/NotFound";
import { WidgetsProvider } from "./contexts/WidgetContext";
import { ThemeProvider } from "./contexts/ThemeContext";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <WidgetsProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/widgets" element={<WidgetsConfiguration />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </WidgetsProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
