import React from 'react';
import PolicyComponent from '../MainApp/InsureeComp/PolicyComponent';
import VehicleDetailsComponent from '../MainApp/InsureeComp/VehicleDetailsComponent';
import InsuranceIcon from './InsuranceIcon';



const User: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <InsuranceIcon/>
            {/* Policy Component */}
            <div className="w-full max-w-lg">
                <PolicyComponent />
            </div>
            {/* Vehicle Details Component */}
            <h3 className="text-lg font-bold mb-2 w-full text-left mt-6">Vehicle Details</h3>
            <div className="w-full max-w-lg">
                <VehicleDetailsComponent />
            </div>
        </div>
    );
};

export default User;
