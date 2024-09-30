import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthWrapper } from '../context/auth.context';
import PrivateRoute from './PrivateRoute'; 
import App from '../App';
import Loading from '../components/Loading';
import Euro2024Component from '../components/euro';

// Lazy-load the components
const HomePage = lazy(() => import('../pages/homepage'));
const UserPage = lazy(() => import('../pages/Admin/ManagerUser'));
const Login = lazy(() => import('../pages/login'));
const MyProfile = lazy(() => import('../pages/User/MyProfile'));
const SettingUser = lazy(() => import('../pages/User/SettingUser'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const VerifyEmail = lazy(() => import('../pages/User/VerifyEmail')); // New VerifyEmail component

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, 
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/euro",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <Euro2024Component></Euro2024Component>
          </Suspense>
        ), 
      },
      {
        path: "manager-user", 
        element: (
          <PrivateRoute element={UserPage} allowedRoles={['Admin']} />  
        ),
      },
      {
        path: "my-profile", 
        element: (
          <PrivateRoute element={MyProfile} allowedRoles={['user']} /> 
        ),
      },
      {
        path: "setting", 
        element: (
          <PrivateRoute element={SettingUser} allowedRoles={['user']} /> 
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading isLoading={true} />}>
        <Login />
      </Suspense>
    ), 
  },
  {
    path: "/:email",  
    element: (
      <Suspense fallback={<Loading isLoading={true} />}>
        <VerifyEmail />
      </Suspense>
    ), 
  },
  {
    path: "*", 
    element: (
      <Suspense fallback={<Loading isLoading={true} />}>
        <NotFoundPage />
      </Suspense>
    ), 
  }
]);

const RouterComponent: React.FC = () => {
  return (
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  );
};

export default RouterComponent;
