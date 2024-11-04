import React, { useState } from 'react';
import { Button, Input, notification } from 'antd';
import { resendVerificationApi } from '../util/api'; // API gửi lại email xác thực

const ResendVerificationButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(''); // Trạng thái để lưu email

  const handleResendVerification = async () => {
    if (!email) {
      notification.warning({
        message: 'Email Required',
        description: 'Please enter your email to resend the verification email.',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await resendVerificationApi(email ); // Gửi email qua API
      if (response.success) {
        notification.success({
          message: 'Verification Email Sent',
          description: 'A new verification email has been sent to your registered email address.',
        });
      } else {
        notification.error({
          message: 'Error',
          description: response.message || 'Failed to send verification email.',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Something went wrong while sending verification email.',
      });
    }
    setLoading(false);
  };

  return (
    <div className="text-center mt-2">
      <Input 
        placeholder="Enter your email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        style={{ marginBottom: '8px' }} 
      />
      <Button 
        type="link" 
        onClick={handleResendVerification} 
        loading={loading} 
        className="text-blue-500 hover:underline"
      >
        Resend Verification Email
      </Button>
    </div>
  );
};

export default ResendVerificationButton;
