import React, { useContext, useState } from "react";
import { Form, Input, Button, notification, Modal, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentLogin, loginUserApi } from "../util/api";
import { AuthContext } from "../context/auth.context";
import logo from "../assets/logo1.jfif";
import GoogleLoginButton from "./GoogleLoginButton";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;
interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isManagerModalVisible, setIsManagerModalVisible] = useState(false);

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true); // Bật loading khi bắt đầu gọi API
    const { email, password } = values;
    const data = { email, password };

    const resDataToken = await loginUserApi(data);
    if (resDataToken) {
      localStorage.setItem("token", resDataToken.token);

      const resDataLogin = await getCurrentLogin();

      setAuth({
        isAuthenticated: true,
        user: {
          id: resDataLogin?.id,
          imgUrl: resDataLogin?.imgUrl,
          email: resDataLogin?.email,
          name: resDataLogin?.name,
          role: resDataLogin?.role,
        },
      });

      // Redirect based on role
      if (resDataLogin?.roleName === "Admin") {
        notification.success({
          message: "Successful",
          description: "You have successfully logged in.",
        });
        window.location.href = "/admin/dashboard";
        return;
      } else if (resDataLogin?.roleName === "Manager") {
        // Hiển thị popup nếu role là Manager và không hiện thông báo thành công
        setIsManagerModalVisible(true);
        return;
      } else {
        notification.success({
          message: "Successful",
          description: "You have successfully logged in.",
        });
        navigate("/");
        return;
      }
    } else {
      notification.error({
        message: "Error",
        description: resDataToken.EM || "Something went wrong!",
      });
    }

    setLoading(false); // Tắt loading sau khi API hoàn thành
  };

  return (
    <div className="form-container sign-in px-5">
      <Form<LoginFormValues> name="login_form" onFinish={onFinish} layout="vertical">
        <img src={logo} className="w-5/6 mx-auto" alt="Logo" />
        <h1 className="font-bold text-2xl ">Sign In</h1>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Button className="button" type="primary" htmlType="submit" loading={loading} block>
          Sign In
        </Button>
        <div className="flex justify-between mt-2">
          <Link to="/resend-verification" className="text-black hover:text-black hover:underline">
            Resend Verification
          </Link>
          <Link to="/forgot-password" className="text-black hover:text-black hover:underline">
            Forgot Password
          </Link>
        </div>

        <div className="separator flex items-center py-2">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <div className="flex justify-center">
          <GoogleLoginButton />
        </div>
        <div className="text-center mt-2">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => (window.location.href = "/")}
          >
            Back to HomePage
          </button>
        </div>
      </Form>

      {/* Popup cho role Manager */}
      <Modal
        visible={isManagerModalVisible}
        footer={
          <div style={{ textAlign: 'center' }}>
        <Button type="primary" onClick={() => setIsManagerModalVisible(false)}>
          OK
        </Button>
          </div>
        }
        onCancel={() => setIsManagerModalVisible(false)}
        centered
        style={{
          borderRadius: '12px',
          padding: 0,
        }}
        bodyStyle={{
          padding: '39px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #ffecb3, #ff8a65)',
          borderRadius: '8px',
        }}
      >
        <ExclamationCircleOutlined style={{ fontSize: '48px', color: '#ff5722' }} />
        <Typography.Title level={3} style={{ color: '#d84315', marginTop: '16px' }}>
          Restricted Access
        </Typography.Title>
        <Text style={{ fontSize: '16px', color: '#5d4037', fontWeight: 500 }}>
          This role is only available on mobile devices.
        </Text>
      </Modal>
    </div>
  );
};

export default LoginForm;
