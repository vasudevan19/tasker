import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import HomePageLayout from "./layouts/HomePageLayout";
import Home from "./pages/Home/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Navigate to="login" />} />
        <Route index path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
      <Route path="/home" element={<HomePageLayout />}>
        <Route path="list" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
