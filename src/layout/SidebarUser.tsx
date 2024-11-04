import React from 'react';
import { Menu } from 'antd';
import { SettingOutlined, FileTextOutlined, DollarOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const UserSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: '/user/order-history', icon: <FileTextOutlined />, label: 'History Order' }, // Icon cho lịch sử đơn hàng
    { key: '/user/payment-history', icon: <DollarOutlined />, label: 'History Payment' }, // Icon cho lịch sử thanh toán
    { key: '/user/setting', icon: <SettingOutlined />, label: 'Setting' }, // Icon cho cài đặt
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

export default UserSidebar;
