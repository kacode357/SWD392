import React from 'react';
import { Menu } from 'antd';
import { SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const UserSidebar: React.FC = () => {
  const navigate = useNavigate(); 

  const items = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'My Profile',
      onClick: () => navigate('/my-profile'), 
    },
    {
      key: '2',
      icon: <SettingOutlined />,
      label: 'Setting',
      onClick: () => navigate('/setting'), 
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