import React, { useState } from 'react';
import VehicleDetails from '../MainApp/NewPolicyComp/VehicleDetails';
import CoverageInput from '../MainApp/NewPolicyComp/CoverageInput';
import InsuranceIcon from './InsuranceIcon';

const NewPolicy: React.FC = () => {
    const [coverageLimit, setCoverage] = useState<number>(200000);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-4 mt-5">
            <InsuranceIcon />
            <div className="w-full max-w-lg">
                {/* Vehicle Details Section */}
                <VehicleDetails />
                {/* Coverage Input Section */}
                <CoverageInput coverageLimit={coverageLimit} setCoverage={setCoverage} />

            </div>
        </div>
    );
};

export default NewPolicy;
