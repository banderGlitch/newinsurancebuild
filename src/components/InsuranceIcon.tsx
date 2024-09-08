import React from 'react';
import InsuranceLogo from '../../src/assets/insurance.png'
import BeraChainLogo from '../../src/assets/bera.png'

const InsuranceIcon: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 flex items-center space-x-40">
    <img src={InsuranceLogo} className='h-20' alt="Insurance Logo" />
    {/* <img src={BeraChainLogo} className='h-16' alt="Chain Logo" /> */}
  </div>
    
    // <div className="absolute top-0 left-0">
    //   <img src={InsuranceLogo} className='h-20' />
    // </div>
  );
};

export default InsuranceIcon;