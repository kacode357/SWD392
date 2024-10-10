import React from 'react';
import Shirtnew from '../components/homepage/Shirtnew';
import Shirtclub from '../components/homepage/Shirtclub';

const HomePage: React.FC = () => {
  return (
    <div className=" p-4">
      < Shirtnew />
      <Shirtclub />
    </div>
  );
};

export default HomePage;
