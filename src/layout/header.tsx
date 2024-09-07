import React from 'react';
import { Layout, Avatar, Dropdown, MenuProps, Button } from 'antd';
import { UserOutlined, LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-test-v1.0.jpg'; 

const { Header } = Layout;

interface AppHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Kiểm tra token trong localStorage
  const token = localStorage.getItem('token');

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/login'); // Redirect to the login page
  };

  // Define the menu items as an array of MenuProps items
  const avatarMenuItems: MenuProps['items'] = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: <Link to="/user">User</Link>,
    },
    {
      key: '2',
      icon: <LogoutOutlined />,
      label: (
        <a onClick={handleLogout} style={{ display: 'flex', alignItems: 'center' }}>
          Logout
        </a>
      ),
    },
  ];

  // Kiểm tra nếu đang ở trang home thì không hiển thị nút mở menu
  const isHomePage = location.pathname === '/';

  return (
    <Layout>
      <Header className="header flex justify-between items-center bg-gray-900">
        {/* Left side: Icon to toggle sidebar, chỉ hiển thị nếu không phải trang Home */}
        <div className="flex-1 flex justify-start">
          {!isHomePage && React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            style: { color: 'white', fontSize: '20px', cursor: 'pointer' },
            onClick: () => setCollapsed(!collapsed), // Đảo trạng thái collapsed khi click vào icon
          })}
        </div>

        {/* Center: Logo */}
        <div className="flex-1 flex justify-center">
          <Link to="/">
            <img src={logo} alt="logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Right side: Avatar or Sign In button */}
        <div className="flex-1 flex justify-end">
          {token ? (
            <Dropdown menu={{ items: avatarMenuItems }} trigger={['hover']} placement="bottomRight">
              <Avatar style={{ cursor: 'pointer', fontSize: '30px' }} icon={<UserOutlined />} />
            </Dropdown>
          ) : (
            <Button type="primary" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          )}
        </div>
      </Header>
    </Layout>
  );
};

export default AppHeader;
