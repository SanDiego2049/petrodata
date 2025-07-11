import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import WidgetsConfiguration from "./pages/WidgetsConfiguration";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/widgets" element={<WidgetsConfiguration />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
