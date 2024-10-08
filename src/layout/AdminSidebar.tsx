import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const items = [
    {
      key: '/manager-user',
      icon: <UserOutlined />,
      label: 'Manager Account',
      onClick: () => navigate('/manager-user'),
    },
    {
      key: '/manager-session',
      icon: <UserOutlined />,
      label: 'Manager Session',
      onClick: () => navigate('/manager-session'),
    },
    {
      key: '/manager-club',
      icon: <UserOutlined />,
      label: 'Manager Club',
      onClick: () => navigate('/manager-club'),
    },
   
    {
      key: '/manager-player',
      icon: <UserOutlined />,
      label: 'Manager Player',
      onClick: () => navigate('/manager-player'),
    },
    {
      key: '/manager-type-shirt',
      icon: <UserOutlined />,
      label: 'Manager Type Shirt',
      onClick: () => navigate('/manager-type-shirt'),
    },
    {
      key: '/manager-shirt',
      icon: <UserOutlined />,
      label: 'Manager Shirt',
      onClick: () => navigate('/manager-shirt'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    }
  ];

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      style={{ height: '100%', borderRight: 0, marginTop: '64px' }}
      items={items}
    />
  );
};

export default AdminSidebar;
