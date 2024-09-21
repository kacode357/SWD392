import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'; 
import { useNavigate } from 'react-router-dom';

const UserSidebar: React.FC = () => {
  const navigate = useNavigate(); 
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  const items = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Manager Account',
      onClick: () => navigate('/manager-user'),
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: 'Test',
      onClick: () => navigate('/test'),
    },
    {
      key: '3',
      icon: <LogoutOutlined />, 
      label: 'Logout',
      onClick: handleLogout, 
    }
  ];

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      style={{ height: '100%', borderRight: 0, marginTop: '64px' }}
      items={items}
    />
  );
};

export default UserSidebar;
