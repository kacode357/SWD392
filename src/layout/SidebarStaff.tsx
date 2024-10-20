import React from 'react';
import { Menu } from 'antd';
import { SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const StaffSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: '/staff/manager-session', icon: <UserOutlined />, label: 'Manager Session' },
    { key: '/staff/manager-club', icon: <UserOutlined />, label: 'Manager Club' },
    { key: '/staff/manager-size', icon: <UserOutlined />, label: 'Manager Size' },
    { key: '/staff/manager-player', icon: <UserOutlined />, label: 'Manager Player' },
    { key: '/staff/manager-type-shirt', icon: <UserOutlined />, label: 'Manager Type Shirt' },
    { key: '/staff/manager-shirt', icon: <UserOutlined />, label: 'Manager Shirt' },
    { key: '/staff/manager-shirt-size', icon: <UserOutlined />, label: 'Manager Shirt Size' },
    { key: '/user/setting', icon: <SettingOutlined />, label: 'Setting' },
  ];

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      style={{ height: '100%', borderRight: 0, marginTop: '64px' }}
      items={menuItems.map((item) => ({
        ...item,
        onClick: () => navigate(item.key),
      }))}
    />
  );
};

export default StaffSidebar;
