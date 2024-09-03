import React from 'react';
import InsuranceLogo from '../assets/insurance.png'

const InsuranceIcon: React.FC = () => {
  return (
    <div className="absolute top-0 left-0">
      <img src={InsuranceLogo} className='h-20' />
    </div>
  );
};

export default InsuranceIcon;