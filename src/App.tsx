import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from './layout/header';
import UserSidebar from './layout/UserSidebar';

const { Sider, Content } = Layout;

const App: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false); 

  // Kiểm tra nếu người dùng ở trang "/user"
  const showUserSidebar = location.pathname === '/user' || location.pathname === '/user-2';
  // Kiểm tra nếu ở trang login hoặc register để ẩn Header
  const hideHeader = location.pathname === '/login' || location.pathname === '/register';

  return (
    <Layout>
      {!hideHeader && <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />} 
      <Layout>
        {/* Chỉ hiển thị Sidebar bên trái nếu ở trang /user */}
        {showUserSidebar && (
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed) => setCollapsed(collapsed)}
            width={200}
            className="site-layout-background"
            style={{ height: '100vh', zIndex: 1000 }} 
          >
            <UserSidebar />

          </Sider>

        )}
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              transition: 'all 0.2s',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
