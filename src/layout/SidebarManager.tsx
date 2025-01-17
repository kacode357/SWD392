import React from 'react';
import { Menu } from 'antd';
import { SettingOutlined, TeamOutlined, FileOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const ManagerSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: '/manage-users', icon: <TeamOutlined />, label: 'Manage Users' },
    { key: '/reports', icon: <FileOutlined />, label: 'Reports' },
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

export default ManagerSidebar;
