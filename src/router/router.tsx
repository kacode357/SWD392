import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { AuthWrapper } from '../context/auth.context';
import PrivateRoute from './PrivateRoute'; 
import App from '../App';
import HomePage from '../pages/homepage';
import UserPage from '../pages/Admin/ManagerUser';
import Login from '../pages/login';
import MyProfile from '../pages/User/MyProfile';
import SettingUser from '../pages/User/SettingUser';
import NotFoundPage from '../pages/NotFoundPage'; // Import the NotFoundPage component

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // Route for the homepage "/"
        element: <HomePage />, // Homepage is now public, no PrivateRoute
      },
      {
        path: "manager-user", 
        element: <PrivateRoute element={UserPage} allowedRoles={['admin']} />, // Only "admin" role can access
      },
      {
        path: "my-profile", 
        element: <PrivateRoute element={MyProfile} allowedRoles={['user']} />,
      },
      {
        path: "setting", 
        element: <PrivateRoute element={SettingUser} allowedRoles={['user']} />,
      },
      {
        path: "test", 
        element: <PrivateRoute element={UserPage} allowedRoles={['admin']} />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />, 
  },
  {
    path: "*", 
    element: <NotFoundPage />, 
  }
]);

const RouterComponent: React.FC = () => {
  return <AuthWrapper> <RouterProvider router={router} /> </AuthWrapper>;
};

export default RouterComponent;
