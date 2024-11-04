import React from "react";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { AuthWrapper } from "../context/auth.context";
import PrivateRoute from "./PrivateRoute";
import App from "../App";
import HomePage from "../pages/homepage";
import Login from "../pages/login";
import MyProfile from "../pages/User/MyProfile";
import SettingUser from "../pages/User/SettingUser";
import ManagerUser from "../pages/Admin/ManagerUser";
import ManagerClub from "../pages/Admin/ManagerClub";
import VerifyAccount from "../pages/User/VerifyAccount";
import NotFound from "../pages/NotFound";
import ManagerSession from "../pages/Admin/ManagerSession";
import ManagerPlayer from "../pages/Admin/ManagerPlayer";
import ManagerTypeShirt from "../pages/Admin/ManagerTypeShirt";
import ManagerShirt from "../pages/Admin/ManagerShirt";
import Shirtdetail from "../components/homepage/Shirtdetail";

import ManagerSize from "../pages/Admin/ManagerSize";
import ManagerShirtSize from "../pages/Admin/ManagerShirtSize";
import Cartdetail from "../components/homepage/Cartdetail";
import ClubShirts from "../pages/User/ClubShirts";
import { ROLES } from "../constants/index"; // Import ROLES
import ListShirtPage from "../pages/User/PageSearchShirt";

import AllShirts from "../pages/User/AllShirts";

import Payment from "../pages/Payment";
import HistoryPayment from "../pages/User/HistoryPayment";
import ManagerOrder from "../pages/Admin/ManagerOrder";
import OrdersHistory from "../pages/User/OrdersHistory";
import PlayerComponent from "../pages/User/Player";
import Session from "../pages/User/Session";
import TypeShirt from "../pages/User/TypeShirts";
import ManagerPayment from "../pages/Admin/ManagerPayment";
import ResendVerificationButton from "../components/ResendVerificationButton";

// Define routes with role-based access
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "admin/manager-user", element: <PrivateRoute element={ManagerUser} allowedRoles={[ROLES.ADMIN]} /> },
      { path: "admin/manager-club", element: <PrivateRoute element={ManagerClub} allowedRoles={[ROLES.ADMIN]} /> },
      { path: "admin/manager-session", element: <PrivateRoute element={ManagerSession} allowedRoles={[ROLES.ADMIN]} /> },
      { path: "admin/manager-player", element: <PrivateRoute element={ManagerPlayer} allowedRoles={[ROLES.ADMIN]} /> },
      { path: "admin/manager-size", element: <PrivateRoute element={ManagerSize} allowedRoles={[ROLES.ADMIN]} /> },
      { path: "admin/manager-type-shirt", element: <PrivateRoute element={ManagerTypeShirt} allowedRoles={[ROLES.ADMIN]} /> },
      { path: "admin/manager-shirt", element: <PrivateRoute element={ManagerShirt} allowedRoles={[ROLES.ADMIN]} /> },
      { path: "admin/manager-shirt-size", element: <PrivateRoute element={ManagerShirtSize} allowedRoles={[ROLES.ADMIN]} /> },
      { path: "admin/manager-order", element: <PrivateRoute element={ManagerOrder} allowedRoles={[ROLES.ADMIN]} /> },
      { path: "admin/manager-payment", element: <PrivateRoute element={ManagerPayment} allowedRoles={[ROLES.ADMIN]} /> },


      // Staff routes
      { path: "staff/manager-order", element: <PrivateRoute element={ManagerOrder} allowedRoles={[ROLES.STAFF]} /> },
      { path: "staff/manager-payment", element: <PrivateRoute element={ManagerPayment} allowedRoles={[ROLES.STAFF]} /> },

      // User routes
      { path: "user/my-profile", element: <PrivateRoute element={MyProfile} allowedRoles={[ROLES.USER]} /> },
      { path: "user/payment-history", element: <PrivateRoute element={HistoryPayment} allowedRoles={[ROLES.USER]} /> },
      { path: "user/order-history", element: <PrivateRoute element={OrdersHistory} allowedRoles={[ROLES.USER]} /> },
      { path: "user/setting", element: <PrivateRoute element={SettingUser} allowedRoles={[ROLES.USER, ROLES.STAFF, ROLES.ADMIN]} /> },

      // Public routes
      { path: "listshirt/shirt-details/:id", element: <PrivateRoute element={Shirtdetail} allowedRoles={[ROLES.USER]} /> },
      { path: "cart", element: <PrivateRoute element={Cartdetail} allowedRoles={[ROLES.USER]} /> },

      { path: "payment", element: <PrivateRoute element={Payment} allowedRoles={[ROLES.USER]} /> },

      { path: "listshirt", element: <PrivateRoute element={ListShirtPage} allowedRoles={[ROLES.USER]} /> },
      { path: "clubshirt", element: <PrivateRoute element={ClubShirts} allowedRoles={[ROLES.USER]} /> },
      { path: "allshirts", element: <PrivateRoute element={AllShirts} allowedRoles={[ROLES.USER]} /> },
      { path: "player", element: <PrivateRoute element={PlayerComponent} allowedRoles={[ROLES.USER]} /> },
      { path: "sessions", element: <PrivateRoute element={Session} allowedRoles={[ROLES.USER]} /> },
      { path: "typeshirts", element: <PrivateRoute element={TypeShirt} allowedRoles={[ROLES.USER]} /> },
      { path: "", element: <PrivateRoute element={HomePage} allowedRoles={[ROLES.USER]} /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "verifyemail/:id", element: <VerifyAccount /> },
  { path: "resend-verification", element: <ResendVerificationButton /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> }, // Catch-all for undefined routes
]);

// Main Router Component
const RouterComponent: React.FC = () => {
  return (
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  );
};

export default RouterComponent;
