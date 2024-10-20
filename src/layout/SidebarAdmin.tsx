import React from 'react';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: '/admin/manager-user', icon: <UserOutlined />, label: 'Manager Account' },
    { key: '/admin/manager-session', icon: <UserOutlined />, label: 'Manager Session' },
    { key: '/admin/manager-club', icon: <UserOutlined />, label: 'Manager Club' },
    { key: '/admin/manager-size', icon: <UserOutlined />, label: 'Manager Size' },
    { key: '/admin/manager-player', icon: <UserOutlined />, label: 'Manager Player' },
    { key: '/admin/manager-type-shirt', icon: <UserOutlined />, label: 'Manager Type Shirt' },
    { key: '/admin/manager-shirt', icon: <UserOutlined />, label: 'Manager Shirt' },
    { key: '/admin/manager-shirt-size', icon: <UserOutlined />, label: 'Manager Shirt Size' },
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
