import React, { useContext, useEffect, useState } from "react";
import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import AppHeader from "./layout/HeaderHomepage";
import HeaderAdmin from "./layout/HeaderAdmin";
import HeaderHomepage from "./layout/HeaderUser";
import UserSidebar from "./layout/SidebarUser";
import AdminSidebar from "./layout/SidebarAdmin";
import ManagerSidebar from "./layout/SidebarManager";
import StaffSidebar from "./layout/SidebarStaff";
import { AuthContext } from "./context/auth.context";
import { getCurrentLogin } from "./util/api";
import { setGlobalLoadingHandler } from "./util/axios.customize";
import Loading from "./components/Loading";
import { sidebarPaths, hiddenHeaderPaths } from "./constants/routesSidebar";
import { ROLES } from "./constants/index";
import AppFooter from "./layout/Footer";
import { CartProvider } from "./context/cart.context";

const { Sider, Content } = Layout;

const App: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const { setAuth, appLoading, setAppLoading, auth } = useContext(AuthContext);

  const showSidebar = sidebarPaths.includes(location.pathname);
  const hideHeader = hiddenHeaderPaths.includes(location.pathname);
  const isAdminPath = location.pathname.startsWith("/admin");
  const isUserPath = location.pathname.startsWith("/user");
  const isStaffPath = location.pathname.startsWith("/staff");

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
        console.error("Failed to fetch account", error);
        localStorage.clear();
      } finally {
        setAppLoading(false);
      }
    };
    fetchAccount();
  }, [setAuth, setAppLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const sidebarComponents = {
    [ROLES.ADMIN]: AdminSidebar,
    [ROLES.MANAGER]: ManagerSidebar,
    [ROLES.STAFF]: StaffSidebar,
    [ROLES.USER]: UserSidebar,
  };

  const headerComponents = {
    [ROLES.ADMIN]: HeaderAdmin,
    default: HeaderHomepage,
  };

  const HeaderComponent = hideHeader
    ? null
    : headerComponents[auth?.user?.role] || AppHeader;

  const SidebarComponent = auth?.isAuthenticated && showSidebar && userLoaded
    ? sidebarComponents[auth?.user?.role] || UserSidebar
    : null;

  return (
    <CartProvider>
      <Layout style={{ minHeight: "100vh" }}>
        {HeaderComponent && (
          <HeaderComponent
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            loading={appLoading}
          />
        )}
        <Layout>
          {SidebarComponent && (
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={setCollapsed}
              width={200}
              className="site-layout-background"
              style={{ height: "100vh", zIndex: 1000 }}
            >
              <SidebarComponent />
            </Sider>
          )}
          <Layout>
            <Loading isLoading={isLoading}>
              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  marginTop: 50,
                  minHeight: "calc(100vh - 200px)",
                  transition: "all 0.2s",
                }}
              >
                <Outlet />
              </Content>
            </Loading>
            {!isAdminPath && <AppFooter />}
          </Layout>
        </Layout>
      </Layout>
    </CartProvider>
  );
};

export default App;
