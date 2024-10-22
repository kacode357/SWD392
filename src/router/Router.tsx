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
import Listshirt from "../pages/User/Listshirt";
import ManagerSize from "../pages/Admin/ManagerSize";
import ManagerShirtSize from "../pages/Admin/ManagerShirtSize";
import Cartdetail from "../components/homepage/Cartdetail";
import ClubShirts from "../pages/User/ClubShirts";
import { ROLES } from "../constants/index"; // Import ROLES

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

      // Staff routes
      { path: "staff/manager-club", element: <PrivateRoute element={ManagerClub} allowedRoles={[ROLES.STAFF]} /> },
      { path: "staff/manager-session", element: <PrivateRoute element={ManagerSession} allowedRoles={[ROLES.STAFF]} /> },
      { path: "staff/manager-player", element: <PrivateRoute element={ManagerPlayer} allowedRoles={[ROLES.STAFF]} /> },
      { path: "staff/manager-size", element: <PrivateRoute element={ManagerSize} allowedRoles={[ROLES.STAFF]} /> },
      { path: "staff/manager-type-shirt", element: <PrivateRoute element={ManagerTypeShirt} allowedRoles={[ROLES.STAFF]} /> },
      { path: "staff/manager-shirt", element: <PrivateRoute element={ManagerShirt} allowedRoles={[ROLES.STAFF]} /> },
      { path: "staff/manager-shirt-size", element: <PrivateRoute element={ManagerShirtSize} allowedRoles={[ROLES.STAFF]} /> },

      // User routes
      { path: "user/my-profile", element: <PrivateRoute element={MyProfile} allowedRoles={[ROLES.USER, ROLES.STAFF]} /> },
      { path: "user/setting", element: <PrivateRoute element={SettingUser} allowedRoles={[ROLES.USER, ROLES.STAFF, ROLES.MANAGER]} /> },

      // Public routes
      { path: "shirt-details/:id", element: <PrivateRoute element={Shirtdetail} allowedRoles={[ROLES.USER, ROLES.STAFF, ROLES.MANAGER]} /> },
      { path: "cart", element: <PrivateRoute element={Cartdetail} allowedRoles={[ROLES.USER, ROLES.STAFF, ROLES.MANAGER]} /> },
      { path: "listshirt/:clubId", element: <PrivateRoute element={Listshirt} allowedRoles={[ROLES.USER, ROLES.STAFF, ROLES.MANAGER]} /> },
      { path: "clubshirt", element: <PrivateRoute element={ClubShirts} allowedRoles={[ROLES.USER, ROLES.STAFF, ROLES.MANAGER]} /> },
      { path: "", element: <PrivateRoute element={HomePage} allowedRoles={[ROLES.USER, ROLES.STAFF, ROLES.MANAGER]} /> },
      { path: "*", element: <NotFound /> },
        ],
      },
      { path: "verifyemail/:id", element: <VerifyAccount /> },
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
