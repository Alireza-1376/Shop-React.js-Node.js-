import { Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./ui/Home";
import AppLayout from "./ui/AppLayout";
import NotFound from "./ui/NotFound";
import AuthLayout from "./components/auth/AuthLayout";

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthLayout />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
