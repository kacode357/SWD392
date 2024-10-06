import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const UserSidebar: React.FC = () => {
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
      key: '/manager-club',
      icon: <UserOutlined />,
      label: 'Manager Club',
      onClick: () => navigate('/manager-club'),
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

export default UserSidebar;
