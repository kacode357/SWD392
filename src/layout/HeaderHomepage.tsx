import React, { useContext } from "react";
import { Layout, Avatar, Dropdown, Skeleton, Badge } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/log 111-02.png";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";
import ListNavigation from "./ListNavigation";
const { Header } = Layout;

interface AppHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  loading: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  collapsed,
  setCollapsed,
  loading,
}) => {
  const { auth } = useContext(AuthContext);
  const { cartItemCount } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const avatarMenuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link to="/user/my-profile">My Profile</Link>,
    },
    {
      key: "2",
      icon: <LogoutOutlined />,
      label: (
        <a
          onClick={handleLogout}
          style={{ display: "flex", alignItems: "center" }}
        >
          Logout
        </a>
      ),
    },
  ];

  const isHomePage = location.pathname === "/";

  return (
    <Layout>
      <ListNavigation />
      <Header
        className="header flex justify-between items-center bg-black"
        style={{ zIndex: 1001, position: "fixed", width: "100%" }}
      >
        {loading ? (
          <Skeleton
            active
            title={false}
            paragraph={{ rows: 0 }}
            avatar={true}
          />
        ) : (
          <>
            <div className="flex-1 flex justify-start">
              {!isHomePage &&
                React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    style: {
                      color: "white",
                      fontSize: "20px",
                      cursor: "pointer",
                    },
                    onClick: () => setCollapsed(!collapsed),
                  }
                )}
            </div>

            {/* Logo Center */}
            <div className="flex-1 flex justify-center">
              <Link to="/">
                <img src={logo} alt="logo" className="h-20 w-auto" />
              </Link>
            </div>

            {/* Right side: Avatar, Cart Icon */}
            <div className="flex-1 flex justify-end items-center">
              {auth.isAuthenticated && (
                <Badge count={cartItemCount} offset={[10, 0]}>
                  <ShoppingCartOutlined
                    style={{
                      color: "white",
                      fontSize: "24px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/cart")}
                  />
                </Badge>
              )}
              {auth.isAuthenticated ? (
                <Dropdown
                  menu={{ items: avatarMenuItems }}
                  trigger={["hover"]}
                  placement="bottomRight"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      marginLeft: "20px",
                    }}
                  >
                    <Avatar icon={<UserOutlined />} />
                    <span style={{ color: "white", marginLeft: "10px" }}>
                      Hello, {auth.user.name}
                    </span>
                  </div>
                </Dropdown>
              ) : (
                <button
                  className="bg-white text-gray-900 py-2 px-4 rounded-md max-w-xs w-auto mr-4 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => navigate("/login")}
                  style={{
                    padding: "6px 12px",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: "500",
                    borderRadius: "6px",
                    marginRight: "10px",
                  }}
                >
                  Sign In
                </button>
              )}
            </div>
          </>
        )}
      </Header>
    </Layout>
  );
};

export default AppHeader;
