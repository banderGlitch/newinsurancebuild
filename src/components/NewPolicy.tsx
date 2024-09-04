import React, { useState } from 'react';
import VehicleDetails from '../MainApp/NewPolicyComp/VehicleDetails';
import CoverageInput from '../MainApp/NewPolicyComp/CoverageInput';
import InsurerTable from '../MainApp/NewPolicyComp/InsurerTable';
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

                {/* Insurer Table */}
                <div className="flex-grow overflow-y-auto">
                    <InsurerTable coverageLimit={coverageLimit} />
                </div>
                {/* <InsurerTable coverageLimit = {coverageLimit} /> */}

                {/* Confirm & Pay Button */}
                <div className="mt-0 sticky bottom-0">
                    <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                        Confirm & Pay
                    </button>
                </div>
                {/* <div className="mt-6">
                    <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                        Confirm & Pay
                    </button>
                </div> */}
            </div>
        </div>
        //   <div className="min-h-screen p-4 flex flex-col items-center">
        //     <InsuranceIcon/>
        //     <div className="w-full max-w-lg">
        //       {/* Vehicle Details Section */}
        //       <VehicleDetails />

        //       {/* Coverage Input Section */}
        //       <CoverageInput coverage={coverage} setCoverage={setCoverage} />

        //       {/* Insurer Table */}
        //       <InsurerTable />

        //       {/* Confirm & Pay Button */}
        //       <div className="mt-6">
        //         <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
        //           Confirm & Pay
        //         </button>
        //       </div>
        //     </div>
        //   </div>
    );
};

export default NewPolicy;
