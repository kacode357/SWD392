import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const ForgotPasswordButton: React.FC = () => {
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate('/forgot-password'); // Điều chỉnh đường dẫn nếu cần
  };

  return (
    <div className="text-center mt-2">
      <Button type="link" onClick={handleForgotPassword} className="text-blue-500 hover:underline">
        Forgot Password?
      </Button>
    </div>
  );
};

export default ForgotPasswordButton;
