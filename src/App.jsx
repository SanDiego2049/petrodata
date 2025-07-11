import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import WidgetsConfiguration from "./pages/WidgetsConfiguration";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/widgets" element={<WidgetsConfiguration />} />
        {/* <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> 
      <Route path="*" element={<NotFound />} />
*/}
      </Routes>
    </>
  );
};

export default App;
