import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Calendar, Key, Palette, FileText, DollarSign } from 'lucide-react';

const NewPolicy: React.FC = () => {
  const [coverageLimit, setCoverageLimit] = useState<number>(200000);
  const navigate = useNavigate();

  const vehicle = {
    model: 'Land Rover Defender',
    purchaseDate: '12-12-2020',
    vin: '1HGCM82633A123456',
    color: 'Bronze',
    plateNumber: 'KA01MN0100',
  };

  const handleRequestQuotations = () => {
    const queryParams = new URLSearchParams({ coverageLimit: coverageLimit.toString() });
    navigate(`/user/newpolicy/newquotes?${queryParams.toString()}`);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-blue-500 text-white p-4 rounded-t-lg flex items-center justify-center space-x-2">
          <div className="bg-white p-2 rounded-full">
            <Car className="text-blue-500" size={24} />
          </div>
          <h1 className="text-xl font-bold">Vehicle Insurance</h1>
        </div>

        <div className="bg-white shadow-lg rounded-b-lg overflow-hidden">
          <div className="p-4">
            <div className="space-y-3">
              <DetailItem icon={Car} label="Vehicle Model" value={vehicle.model} />
              <DetailItem icon={Calendar} label="Purchase Date" value={vehicle.purchaseDate} />
              <DetailItem icon={Key} label="VIN" value={vehicle.vin} />
              <DetailItem icon={Palette} label="Color" value={vehicle.color} />
              <DetailItem icon={FileText} label="Plate Number" value={vehicle.plateNumber} />
            </div>
          </div>

          <div className="bg-gray-50 p-4">
            <h2 className="text-lg font-semibold mb-4">Coverage</h2>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={coverageLimit}
                onChange={(e) => setCoverageLimit(Number(e.target.value))}
                className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleRequestQuotations}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
            >
              Request Quotations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem: React.FC<{ icon: React.ElementType; label: string; value: string }> = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <Icon className="text-blue-500 flex-shrink-0" size={20} />
    <div className="flex-grow">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default NewPolicy;
// import React, { useState } from 'react';
// import VehicleDetails from '../MainApp/NewPolicyComp/VehicleDetails';
// import CoverageInput from '../MainApp/NewPolicyComp/CoverageInput';
// import InsuranceIcon from './InsuranceIcon';

// const NewPolicy: React.FC = () => {
//     const [coverageLimit, setCoverage] = useState<number>(200000);

//     return (
//         <div className="min-h-screen flex flex-col justify-center items-center p-4 mt-5">
//             <InsuranceIcon />
//             <div className="w-full max-w-lg">
//                 {/* Vehicle Details Section */}
//                 <VehicleDetails />
//                 {/* Coverage Input Section */}
//                 <CoverageInput coverageLimit={coverageLimit} setCoverage={setCoverage} />

//             </div>
//         </div>
//     );
// };

// export default NewPolicy;
