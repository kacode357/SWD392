import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <Result
        status="404"
        title={<h1 style={{ color: 'white' }}>404</h1>}
        subTitle={<p style={{ color: 'gray' }}>Oops! The page you're looking for does not exist.</p>}
        extra={
          <Button
            type="primary"
            onClick={goHome}
            style={{ backgroundColor: 'white', color: 'black', borderColor: 'white' }}
          >
            Go Back to Home
          </Button>
        }
        style={{ backgroundColor: 'black' }}
      />
    </div>
  );
};

export default NotFound;
