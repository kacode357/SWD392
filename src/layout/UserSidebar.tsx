import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const UserSidebar: React.FC = () => {
  const navigate = useNavigate(); // Hook để điều hướng

  const items = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'User 1',
      onClick: () => navigate('/user'), // Điều hướng tới trang /user khi nhấn vào User 1
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: 'User 2',
      onClick: () => navigate('/user-2'), // Điều hướng tới trang /user-2 khi nhấn vào User 2
    },
    {
      key: '3',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/settings'), // Điều hướng tới trang /settings khi nhấn vào Settings
    },
  ];

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      style={{ height: '100%', borderRight: 0 }}
      items={items}
    />
  );
};

export default UserSidebar;
