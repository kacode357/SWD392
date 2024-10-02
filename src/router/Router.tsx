// Import ROLES at the top
import { ROLES } from '../constants/index';  // Adjust the path as needed
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { AuthWrapper } from '../context/auth.context';
import PrivateRoute from './PrivateRoute'; 
import App from '../App';
import HomePage from '../pages/homepage';
import Login from '../pages/login';
import MyProfile from '../pages/User/MyProfile';
import SettingUser from '../pages/User/SettingUser';
import ManagerUser from '../pages/Admin/ManagerUser';
import ManagerClub from '../pages/Admin/ManagerClub'; // Corrected "MangerClub" to "ManagerClub"
import VerifyAccount from '../pages/User/VerifyAccount'; // Import the VerifyAccount component

// Create the router with public and private routes, including the new verify route
const router = createBrowserRouter([
  {
    path: "/", // Root path
    element: <App />, // Wrapper component
    children: [
      {
        index: true, // This is for the root "/"
        element: <HomePage />, // Public HomePage
      },
      {
        path: "manager-user", // Route for user management
        element: (
          <PrivateRoute 
            element={ManagerUser} 
            allowedRoles={[ROLES.ADMIN]} // Only admins can access this route
          />
        ),
      },
      {
        path: "my-profile", // Route for user profile
        element: (
          <PrivateRoute 
            element={MyProfile} 
            allowedRoles={[ROLES.USER]} // Only logged-in users can access this route
          />
        ),
      },
      {
        path: "setting", // Route for user settings
        element: (
          <PrivateRoute 
            element={SettingUser} 
            allowedRoles={[ROLES.USER]} // Only logged-in users can access
          />
        ),
      },
      {
        path: "manager-club", // Route for club management
        element: (
          <PrivateRoute 
            element={ManagerClub} 
            allowedRoles={[ROLES.ADMIN]} // Only admins can access this route
          />
        ),
      },
      {
        path: ":id", // New route for account verification using the ID from URL
        element: <VerifyAccount />, // Public route to verify account with the given ID
      },
    ],
  },
  {
    path: "/login", // Login path
    element: <Login />, // Public login page
  }
]);

// The main router component with authentication context
const RouterComponent: React.FC = () => {
  return (
    <AuthWrapper> 
      <RouterProvider router={router} /> 
    </AuthWrapper>
  );
};

export default RouterComponent;
