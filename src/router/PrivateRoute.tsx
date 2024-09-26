import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

interface PrivateRouteProps {
    element: React.ComponentType;  // Chấp nhận component, không phải là element JSX
    allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component, allowedRoles }) => {
    const { auth, appLoading } = useContext(AuthContext);

    if (appLoading) {
        return <div></div>;  // Bạn có thể sử dụng spinner hoặc component loading ở đây
    }

    const userRole = auth?.user?.role;

    if (userRole && allowedRoles.includes(userRole)) {
        return <Component />;  // Render component thay vì element JSX
    }

    if (userRole === 'Admin') {
        return <Navigate to="/manager-user" replace />;
    }

    return <Navigate to="/" replace />;
};

export default PrivateRoute;
