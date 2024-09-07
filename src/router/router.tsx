import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/homepage';
import UserPage from '../pages/user';
import UserPage2 from '../pages/user-2';
import Login from '../pages/login';
import Register from '../pages/register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // Đây là route cho trang chủ "/"
        element: <HomePage />,
      },
      {
        path: "user", // Đây là route cho "/user"
        element: <UserPage />,
      },
      {
        path: "user-2", // Đây là route cho "/user"
        element: <UserPage2 />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />, // Route cho trang login
  },
  {
    path: "/register",
    element: <Register />, // Route cho trang register
  }
]);

const RouterComponent: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default RouterComponent;
