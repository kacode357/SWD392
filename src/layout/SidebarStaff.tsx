import React from 'react';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const StaffSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    
    {
      key: '/staff/manager-session',
      icon: <UserOutlined />,
      label: 'Manager Session',
      onClick: () => navigate('/staff/manager-session'),
    },
    {
      key: '/staff/manager-club',
      icon: <UserOutlined />,
      label: 'Manager Club',
      onClick: () => navigate('/staff/manager-club'),
    },
    {
      key: '/staff/manager-size',
      icon: <UserOutlined />,
      label: 'Manager Size',
      onClick: () => navigate('/staff/manager-size'),
    },
    {
      key: '/staff/manager-player',
      icon: <UserOutlined />,
      label: 'Manager Player',
      onClick: () => navigate('/staff/manager-player'),
    },
    {
      key: '/staff/manager-type-shirt',
      icon: <UserOutlined />,
      label: 'Manager Type Shirt',
      onClick: () => navigate('/staff/manager-type-shirt'),
    },
    {
      key: '/staff/manager-shirt',
      icon: <UserOutlined />,
      label: 'Manager Shirt',
      onClick: () => navigate('/staff/manager-shirt'),
    },
    {
      key: '/staff/manager-shirt-size',
      icon: <UserOutlined />,
      label: 'Manager Shirt Size',
      onClick: () => navigate('/staff/manager-shirt-size'),
    },
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

export default StaffSidebar;
