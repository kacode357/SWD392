import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context'; 
import { ROLES } from '../constants/index';
interface PrivateRouteProps {
    element: React.ComponentType;
    allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component, allowedRoles }) => {
    const { auth, appLoading } = useContext(AuthContext); // Lấy trạng thái xác thực và trạng thái loading

    // Nếu đang tải dữ liệu người dùng, hiển thị loader hoặc empty div
    if (appLoading) {
        return <div></div>;  // Bạn có thể thay thế bằng một spinner hoặc loader khác
    }

    const userRole = auth?.user?.role;  // Lấy vai trò người dùng từ context

    // Nếu người dùng đã đăng nhập và có role phù hợp, render component
    if (userRole && allowedRoles.includes(userRole)) {
        return <Component />;
    }
    if (auth.user?.role === ROLES.ADMIN && !allowedRoles.includes(ROLES.ADMIN)) {
        return <Navigate to="/admin/manager-user" />; // Chuyển hướng admin về trang admin hợp lệ
      }
    // Nếu người dùng là admin nhưng truy cập vào trang không được phép, điều hướng về "/admin/manager-user"
    if (userRole === ROLES.ADMIN) {
        return <Navigate to="/admin/manager-user" replace />;
    }

    // Nếu không có quyền truy cập, điều hướng về trang chủ hoặc trang khác
    return <Navigate to="/" replace />;
}

export default PrivateRoute;
