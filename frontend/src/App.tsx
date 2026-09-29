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
import Image from "./components/admin/products/Image";
import MainProducts from "./components/products/Products";
import AboutUs from "./ui/About-Us";
import ContactUs from "./ui/Contact-Us";
import ProtectedRoute from "./ui/AdminProtectedRoute";
import LoginProtectRoute from "./ui/LoginProtectRoute";


const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<MainProducts />} />
          <Route path="/login" element={
            <LoginProtectRoute>
              <AuthLayout />
            </LoginProtectRoute>
          } />
          <Route path="/check-otp" element={
            <LoginProtectRoute>
              <AuthLayout />
            </LoginProtectRoute>
          } />
          <Route path="/complete-profile" element={
            <LoginProtectRoute>
              <CompleteProfile />
            </LoginProtectRoute>
          } />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Route>
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="products/images/:id" element={<Image />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
