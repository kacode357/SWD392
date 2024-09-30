import React, { useContext } from 'react';
import { Layout, Avatar, Dropdown, MenuProps, Button, Skeleton, Input } from 'antd';
import { UserOutlined, LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/auth.context';

const { Header } = Layout;
const { Search } = Input;

interface AppHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  loading: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, setCollapsed, loading }) => {
  const { auth } = useContext(AuthContext); // Fetch auth context
  console.log("Testxx >>>>>",auth);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token on logout
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
      <Header 
        className="header flex justify-between items-center" 
        style={{ 
          zIndex: 1001, 
          position: 'fixed', 
          width: '100%', 
          backgroundColor: '#000', // Màu trắng tinh
        }}
      >
        {loading ? (
          <Skeleton active title={false} paragraph={{ rows: 0 }} avatar={true} />
        ) : (
          <>
            {/* Left: Logo */}
            <div className="flex-1 flex justify-start">
              <Link to="/">
                <img src="public/logo2.png" alt="logo" className="h-20 w-auto" />
              </Link>
              {!isHomePage && React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                style: { color: 'black', fontSize: '20px', cursor: 'pointer', marginLeft: '20px' },
                onClick: () => setCollapsed(!collapsed),
              })}
            </div>

            <div className="flex-1 flex justify-center">
              <Search 
                placeholder="Find your favorite team, jersey, or player" 
                onSearch={(value) => console.log(value)} 
                style={{ width: 400 }} 
                enterButton
              />
            </div>


            <div className="flex-1 flex justify-end">
              {auth.isAuthenticated && auth.user ? (
                <Dropdown menu={{ items: avatarMenuItems }} trigger={['hover']} placement="bottomRight">
                  <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <Avatar icon={<UserOutlined />} />
                    <span style={{ color: 'black', marginLeft: '10px' }}>Hello, {auth.user.name}</span>
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
