import React, { useContext, useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from './layout/header';
import UserSidebar from './layout/UserSidebar';
import AdminSidebar from './layout/AdminSidebar'; // Import AdminSidebar
import { AuthContext } from './context/auth.context';
import { getCurrentLogin } from './util/api';
import { setGlobalLoadingHandler } from './util/axios.customize';
import Loading from './components/Loading';
import { sidebarPaths, hiddenHeaderPaths } from './constants/routesSidebar'; // Import routes constants

const { Sider, Content } = Layout;

const App: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth, appLoading, setAppLoading, auth } = useContext(AuthContext);

  // Kiểm tra nếu đường dẫn hiện tại nằm trong các đường dẫn yêu cầu sidebar
  const showSidebar = sidebarPaths.some((path) => location.pathname.startsWith(path));

  // Kiểm tra nếu đường dẫn hiện tại cần ẩn header
  const hideHeader = hiddenHeaderPaths.includes(location.pathname);

  useEffect(() => {
    setGlobalLoadingHandler(setIsLoading);
    const fetchAccount = async () => {
      try {
        setAppLoading(true);
        const res = await getCurrentLogin();
        if (res) {
          setAuth({
            isAuthenticated: true,
            user: {
              email: res?.email,
              name: res?.userName,
              role: res?.roleName,
            },
          });
        }
      } catch (error) {
        console.error('Failed to fetch account', error);
      } finally {
        setAppLoading(false);
      }
    };
    fetchAccount();
  }, [setAuth, setAppLoading]);

  return (
    <Layout>
      {/* Header sẽ luôn hiện trừ khi đường dẫn thuộc hiddenHeaderPaths */}
      {!hideHeader && (
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} loading={appLoading} />
      )}

      <Layout>
        {/* Hiển thị Sidebar nếu đường dẫn hiện tại nằm trong sidebarPaths */}
        {showSidebar && (
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed) => setCollapsed(collapsed)}
            width={200}
            className="site-layout-background"
            style={{ height: '100vh', zIndex: 1000 }}
          >
            {/* Kiểm tra role của user để hiển thị sidebar tương ứng */}
            {auth?.user?.role === 'admin' ? (
              <AdminSidebar />
            ) : (
              <UserSidebar />
            )}
          </Sider>
        )}

        <Layout style={{ padding: '0 24px 24px' }}>
          {/* Loading component kiểm tra isLoading */}
          <Loading isLoading={isLoading}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                marginTop: 50,
                minHeight: 280,
                transition: 'all 0.2s',
              }}
            >
              <Outlet />
            </Content>
          </Loading>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
