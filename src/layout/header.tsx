import React, { useContext } from 'react';
import { Layout, Avatar, Dropdown, MenuProps, Button, Skeleton } from 'antd';
import { UserOutlined, LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-test-v1.0.jpg';
import { AuthContext } from '../context/auth.context';

const { Header } = Layout;

interface AppHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  loading: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, setCollapsed, loading }) => {
  const { auth } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const avatarMenuItems: MenuProps['items'] = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: <Link to="/my-profile">My Profile</Link>,
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

  const isHomePage = location.pathname === '/';

  return (
    <Layout>
      <Header className="header flex justify-between items-center bg-gray-900" style={{ zIndex: 1001, position: 'fixed', width: '100%' }}>
        {loading ? (
          <Skeleton active title={false} paragraph={{ rows: 0 }} avatar={true} />
        ) : (
          <>
            <div className="flex-1 flex justify-start">
              {!isHomePage && React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                style: { color: 'white', fontSize: '20px', cursor: 'pointer' },
                onClick: () => setCollapsed(!collapsed),
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
              {auth.isAuthenticated ? (
                <Dropdown menu={{ items: avatarMenuItems }} trigger={['hover']} placement="bottomRight">
                  <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <Avatar icon={<UserOutlined />} />
                    <span style={{ color: 'white', marginLeft: '10px' }}>Hello, {auth.user.name}</span>
                  </div>
                </Dropdown>
              ) : (
                <Button type="primary" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
              )}
            </div>
          </>
        )}
      </Header>
    </Layout>
  );
};

export default AppHeader;
