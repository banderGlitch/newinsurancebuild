import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Calendar, Key, Palette, FileText, AlertCircle } from 'lucide-react';

const User: React.FC = () => {
  const navigate = useNavigate();
  
  const vehicle = {
    model: 'Land Rover Defender',
    purchaseDate: '12-12-2020',
    vin: '1HGCM82633A123456',
    color: 'Bronze',
    plateNumber: 'KA01MN0100',
    imageUrl: 'https://example.com/rangerover.png', // Replace with actual image URL
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-16">
      <div className="max-w-md mx-auto pt-4 px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
          <div className="p-3 bg-blue-500 text-white flex justify-between items-center">
            <h2 className="text-lg font-semibold">Policy Details</h2>
            <div className="flex items-center space-x-1">
              <AlertCircle size={16} />
              <span className="text-sm font-medium">InActive</span>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-800 font-semibold">Policy ID: <span className="text-red-600">Not Available</span></p>
            <p className="text-sm text-gray-600 mt-1">Click on 'New Policy' to create an insurance policy for your vehicle.</p>
            <button 
              onClick={() => navigate("/user/newpolicy")}
              className="mt-3 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition duration-300"
            >
              + New Policy
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-3 bg-green-500 text-white">
            <h2 className="text-lg font-semibold">Vehicle Details</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Car className="text-green-500 flex-shrink-0" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Model</p>
                  <p className="text-sm font-semibold text-gray-800">{vehicle.model}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="text-green-500 flex-shrink-0" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Purchase Date</p>
                  <p className="text-sm font-semibold text-gray-800">{vehicle.purchaseDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 col-span-2">
                <Key className="text-green-500 flex-shrink-0" size={20} />
                <div>
                  <p className="text-xs text-gray-500">VIN</p>
                  <p className="text-sm font-semibold text-gray-800">{vehicle.vin}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Palette className="text-green-500 flex-shrink-0" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Color</p>
                  <p className="text-sm font-semibold text-gray-800">{vehicle.color}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="text-green-500 flex-shrink-0" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Plate Number</p>
                  <p className="text-sm font-semibold text-gray-800">{vehicle.plateNumber}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <img
                src={vehicle.imageUrl}
                alt={vehicle.model}
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
// import React from 'react';
// import LandRover from '../../assets/rangerover.png'

// const VehicleDetailsComponent: React.FC = () => {
//   const vehicle = {
//     model: 'Land Rover Defender',
//     purchaseDate: '12-12-2020',
//     vin: '1HGCM82633A123456',
//     color: 'Bronze',
//     plateNumber: 'KA01MN0100',
//     imageUrl: LandRover, 
//   };

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md w-full flex flex-col items-center">
//     {/* Vehicle Details */}
//     <div className="w-full text-left space-y-2">
//       <div className="flex justify-between">
//         <p className="text-sm font-semibold">Vehicle Model:</p>
//         <p className="text-sm">{vehicle.model}</p>
//       </div>
//       <div className="flex justify-between">
//         <p className="text-sm font-semibold">Vehicle purchase date:</p>
//         <p className="text-sm">{vehicle.purchaseDate}</p>
//       </div>
//       <div className="flex justify-between">
//         <p className="text-sm font-semibold">VIN:</p>
//         <p className="text-sm">{vehicle.vin}</p>
//       </div>
//       <div className="flex justify-between">
//         <p className="text-sm font-semibold">Color:</p>
//         <p className="text-sm">{vehicle.color}</p>
//       </div>
//       <div className="flex justify-between">
//         <p className="text-sm font-semibold">Plate number:</p>
//         <p className="text-sm">{vehicle.plateNumber}</p>
//       </div>
//     </div>

//     {/* Vehicle Image with Shadow */}
//     <div className="mt-4 w-full">
//       <img
//         src={vehicle.imageUrl}
//         alt={vehicle.model}
//         className="rounded-lg w-full h-40 object-cover shadow-md"
//       />
//     </div>
//   </div>
//   );
// };

// export default VehicleDetailsComponent;
