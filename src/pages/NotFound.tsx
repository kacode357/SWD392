import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl">Oops! The page you're looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
