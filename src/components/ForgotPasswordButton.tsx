import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Typography, Card, Space, notification } from 'antd';
import { forgotPasswordApi, resetPasswordApi } from '../util/api';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ForgotPasswordButton: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Bước 1: Nhập email, Bước 2: Nhập mã xác nhận và mật khẩu mới
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>('');

  const handleForgotPassword = async (values: { email: string }) => {
    setLoading(true);
    try {
      await forgotPasswordApi(values.email);
      setEmail(values.email); // Lưu email để sử dụng cho reset password
      notification.success({
        message: 'Verification Email Sent',
        description: 'A verification code has been sent to your email.',
      });
      setStep(2); // Chuyển sang bước 2
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to send verification email.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (values: { verificationCode: string; newPassword: string }) => {
    setLoading(true);
    try {
      await resetPasswordApi({ email, ...values });
      notification.success({
        message: 'Password Reset',
        description: 'Your password has been reset successfully.',
      });
      navigate('/login'); // Điều hướng về trang đăng nhập
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to reset password.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-5"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url('https://i.pinimg.com/564x/16/3e/1a/163e1a79ab7b45324fc5b4c134665ef7.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {step === 1 ? (
        <Card bordered={false} style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Title level={3} style={{ textAlign: 'center' }}>Forgot Password</Title>
            <Text type="secondary" style={{ textAlign: 'center' }}>
              Please enter your email address to receive a verification code.
            </Text>
            <Form name="forgot_password_form" onFinish={handleForgotPassword} layout="vertical">
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter your email!' },
                  { type: 'email', message: 'Please enter a valid email address!' },
                ]}
              >
                <Input placeholder="Enter your email" size="large" />
              </Form.Item>
              <Form.Item>
                <button
                  type="submit"
                  className="bg-black text-white py-2 px-4 w-full rounded-md hover:bg-gray-800 focus:outline-none"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Verification Code'}
                </button>
              </Form.Item>
            </Form>
          </Space>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 text-black hover:text-gray-800 focus:outline-none"
          >
            <ArrowLeftOutlined className="mr-2" /> {/* Add the icon here */}
            Back to Login
          </button>

        </Card>
      ) : (
        <Card bordered={false} style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Title level={3} style={{ textAlign: 'center' }}>Reset Password</Title>
            <Text type="secondary" style={{ textAlign: 'center' }}>
              Please enter the verification code sent to your email and your new password.
            </Text>
            <Form name="reset_password_form" onFinish={handleResetPassword} layout="vertical">
              <Form.Item
                name="verificationCode"
                label="Verification Code"
                rules={[{ required: true, message: 'Please enter the verification code!' }]}
              >
                <Input placeholder="Enter verification code" size="large" />
              </Form.Item>
              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[{ required: true, message: 'Please enter your new password!' }]}
              >
                <Input.Password placeholder="Enter new password" size="large" />
              </Form.Item>
              <Form.Item>
                <button
                  type="submit"
                  className="bg-black text-white py-2 px-4 w-full rounded-md hover:bg-gray-800 focus:outline-none"
                  disabled={loading}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </Form.Item>
            </Form>
          </Space>
        </Card>
      )}

    </div>
  );
};

export default ForgotPasswordButton;
