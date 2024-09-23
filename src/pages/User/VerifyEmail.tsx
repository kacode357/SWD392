import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { verifyEmailApi } from '../../util/api';
import { Spin, Result } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const VerifyEmail = () => {
  const { email } = useParams<{ email: string | undefined }>(); // Allow undefined in case email is missing
  const [message, setMessage] = useState<string>('Verifying your email...');
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      if (email) {  // Ensure email is not undefined before calling the API
        try {
          const response = await verifyEmailApi(email);
          if (response.success) {
            setMessage('Your email has been successfully verified!');
            setSuccess(true);
          } else {
            setMessage('Email verification failed. Please try again.');
            setSuccess(false);
          }
        } catch (error) {
          setMessage('An error occurred while verifying your email.');
          setSuccess(false);
        } finally {
          setLoading(false);
        }
      } else {
        setMessage('Invalid or missing email.');
        setSuccess(false);
        setLoading(false);
      }
    };

    verifyEmail();
  }, [email]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {loading ? (
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
          tip="Verifying your email..."
        />
      ) : (
        <div>
          {success ? (
            <Result
              status="success"
              title="Email Verified"
              subTitle={message}
            />
          ) : (
            <Result
              status="error"
              title="Verification Failed"
              subTitle={message}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
