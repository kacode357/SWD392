import React from 'react';
import Shirtnew from '../components/homepage/Shirtnew';
import Shirtclub from '../components/homepage/Shirtclub';
import Shirtseason from '../components/homepage/Shirtseason';

const HomePage: React.FC = () => {
  return (
    <div className='px-60'>

      <Shirtnew />

      <Shirtclub />
      <Shirtseason />

    </div>
  );
};

export default HomePage;
