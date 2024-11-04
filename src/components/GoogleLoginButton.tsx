import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { notification, Modal, Spin, Button, Typography } from 'antd';
import { googleSignUpApi, googleSigInpApi } from '../util/api';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const GoogleLoginButton: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isManagerModalVisible, setIsManagerModalVisible] = useState(false);

  const handleSuccess = async (response: any) => {
    const googleId = response.credential;
    setLoading(true);

    try {
      const loginResponse = await googleSigInpApi(googleId);
      const token = loginResponse.token;

      if (token) {
        localStorage.setItem('token', token);
      }

      if (loginResponse.user.roleName === "Manager") {
        setIsManagerModalVisible(true); 
        setLoading(false);
        return;
      }

      notification.success({
        message: 'Google Login Successful',
        description: 'You have successfully logged in with Google.',
      });

      navigate('/');

    } catch (error: any) {
      if (error.response && error.response.user.message === "Email not verified!.") {
        setLoading(false);
        return;
      }

      try {
        const signupResponse = await googleSignUpApi(googleId);
        const token = signupResponse?.user?.token;
        
        if (token) {
          localStorage.setItem('token', token);
          navigate('/');
        }

        notification.success({
          message: 'Google Signup Successful',
          description: 'Please verify your email to activate your account.',
        });

      } catch (signupError) {
        console.error('Signup failed:', signupError);
        notification.error({
          message: 'Google Signup Failed',
          description: 'An error occurred while signing up with Google.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleError = () => {
    notification.error({
      message: 'Google Login Failed',
      description: 'An error occurred while logging in with Google.',
    });
  };

  return (
    <>
     <GoogleOAuthProvider clientId="976712067094-lv2i7i7ln5kul1tjejpti6a85rm3unt7.apps.googleusercontent.com">
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap />
      </GoogleOAuthProvider>

      {/* Loading Modal */}
      <Modal
        visible={loading}
        footer={null}
        closable={false}
        centered
        bodyStyle={{ textAlign: 'center' }}
      >
        <Spin size="large" />
        <p>Logging in, please wait...</p>
      </Modal>

      {/* Manager Role Modal */}
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
    </>
  );
};

export default GoogleLoginButton;
