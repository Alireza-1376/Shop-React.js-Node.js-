import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./ui/Home";
import AppLayout from "./ui/AppLayout";
import NotFound from "./ui/NotFound";
import AuthLayout from "./components/auth/AuthLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import CompleteProfile from "./components/auth/CompleteProfile";
import AdminLayout from "./ui/AdminLayout";
import Dashboard from "./components/admin/dashboard/Dashboard";
import Categories from "./components/admin/categories/Categories";
import Products from "./components/admin/products/Products";
import Orders from "./components/admin/orders/Orders";
import Users from "./components/admin/users/Users";

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
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
