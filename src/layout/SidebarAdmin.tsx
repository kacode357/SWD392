import React from 'react';
import { Menu } from 'antd';
import { SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: '/admin/manager-user', icon: <UserOutlined />, label: 'Account' },
    { key: '/admin/manager-session', icon: <UserOutlined />, label: 'Session' },
    { key: '/admin/manager-club', icon: <UserOutlined />, label: 'Club' },
    { key: '/admin/manager-size', icon: <UserOutlined />, label: 'Size' },
    { key: '/admin/manager-player', icon: <UserOutlined />, label: 'Player' },
    { key: '/admin/manager-type-shirt', icon: <UserOutlined />, label: 'Type Shirt' },
    { key: '/admin/manager-shirt', icon: <UserOutlined />, label: 'Shirt' },
    { key: '/admin/manager-shirt-size', icon: <UserOutlined />, label: 'Shirt Size' },
    { key: '/admin/manager-order', icon: <UserOutlined />, label: 'Order' },
    { key: '/admin/manager-payment', icon: <UserOutlined />, label: 'Payment' },
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

export default AdminSidebar;
