import { Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./ui/Home";
import AppLayout from "./ui/AppLayout";
import NotFound from "./ui/NotFound";
import AuthLayout from "./components/auth/AuthLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import CompleteProfile from "./components/auth/CompleteProfile";

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthLayout />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
