import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/Animation - 1726033251609.json';

interface LoadingProps {
  isLoading: boolean;
  children?: React.ReactNode;  // Cho phép children không bắt buộc
}

const Loading: React.FC<LoadingProps> = ({ isLoading, children }) => {
  const loadingStyle = {
    height: 700,
    width: 700,
    marginLeft: '10%',
  };

  return (
    <div className={`relative overflow-auto ${isLoading ? 'no-scroll' : ''}`}>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-100 z-50 pointer-events-none">
          <div>
            <Lottie animationData={animationData} style={loadingStyle} />
          </div>
        </div>
      )}
      {/* Nếu có children và không đang loading thì render children */}
      {!isLoading && children}
    </div>
  );
};

export default Loading;
