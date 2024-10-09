import React, { useContext, useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from './layout/header';
import UserSidebar from './layout/UserSidebar';
import AdminSidebar from './layout/AdminSidebar';
import ManagerSidebar from './layout/ManagerSidebar';
import StaffSidebar from './layout/StaffSidebar';
import { AuthContext } from './context/auth.context';
import { getCurrentLogin } from './util/api';
import { setGlobalLoadingHandler } from './util/axios.customize';
import Loading from './components/Loading';
import { sidebarPaths, hiddenHeaderPaths } from './constants/routesSidebar';
import { ROLES } from './constants/index'; // Import ROLES
import AppFooter from './layout/Footer';

const { Sider, Content } = Layout;

const App: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const { setAuth, appLoading, setAppLoading, auth } = useContext(AuthContext);

  // Check if the current path requires a sidebar (exact match)
  const showSidebar = sidebarPaths.includes(location.pathname);

  // Check if the current path requires hiding the header (exact match)
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
              id: res?.id,
              imgUrl: res?.imgUrl,
              email: res?.email,
              name: res?.userName,
              role: res?.roleName,
            },
          });
          setUserLoaded(true);
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
      {/* Header will show unless path is in hiddenHeaderPaths */}
      {!hideHeader && (
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} loading={appLoading} />

      )}

      <Layout>
        {/* Show Sidebar only if user info is loaded and path is in sidebarPaths */}
        {showSidebar && userLoaded && (
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed) => setCollapsed(collapsed)}
            width={200}
            className="site-layout-background"
            style={{ height: '100vh', zIndex: 1000 }}
          >
            {/* Render different sidebars based on user role */}
            {auth?.user?.role === ROLES.ADMIN ? (
              <AdminSidebar />
            ) : auth?.user?.role === ROLES.MANAGER ? (
              <ManagerSidebar />
            ) : auth?.user?.role === ROLES.STAFF ? (
              <StaffSidebar />
            ) : (
              <UserSidebar />
            )}
          </Sider>
        )}

        <Layout style={{ padding: '0 24px 24px' }}>
          {/* Loading component based on isLoading */}
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
        <AppFooter />
      </Layout>
    </Layout>

  );
};

export default App;
