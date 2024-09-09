import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Calendar, Key, Palette, FileText, AlertCircle, User as UserIcon, Shield } from 'lucide-react';

const User: React.FC = () => {
  const navigate = useNavigate();
  
  const vehicle = {
    model: 'Land Rover Defender',
    purchaseDate: '12-12-2020',
    vin: '1HGCM82633A123456',
    color: 'Bronze',
    plateNumber: 'KA01MN0100',
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div style={{WebkitOverflowScrolling:"touch", scrollbarWidth:"none"}} className="flex-1 overflow-y-auto">
        <div className="max-w-sm mx-auto px-4 pb-20">
          <header className="py-4 mb-4 sticky top-0 bg-gray-100 z-10">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-500 text-white p-2 rounded-full">
                <Car size={24} />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Vehicle Insurance</h1>
            </div>
          </header>

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

          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
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
                  src="../../src/assets/rangerover.png"
                  alt={vehicle.model}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Car, Calendar, Key, Palette, FileText, AlertCircle } from 'lucide-react';

// const User: React.FC = () => {
//   const navigate = useNavigate();
  
//   const vehicle = {
//     model: 'Land Rover Defender',
//     purchaseDate: '12-12-2020',
//     vin: '1HGCM82633A123456',
//     color: 'Bronze',
//     plateNumber: 'KA01MN0100',
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <div className="flex-1 overflow-y-auto">
//         <div className="max-w-sm mx-auto px-4 pb-20">
//           <header className="py-4 mb-4 sticky top-0 bg-gray-100 z-10">
//             <div className="flex items-center space-x-2">
//               <div className="bg-blue-500 text-white p-2 rounded-full">
//                 <Car size={24} />
//               </div>
//               <h1 className="text-2xl font-bold text-gray-800">Vehicle Insurance</h1>
//             </div>
//           </header>

//           <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
//             <div className="p-3 bg-blue-500 text-white flex justify-between items-center">
//               <h2 className="text-lg font-semibold">Policy Details</h2>
//               <div className="flex items-center space-x-1">
//                 <AlertCircle size={16} />
//                 <span className="text-sm font-medium">InActive</span>
//               </div>
//             </div>
//             <div className="p-4">
//               <p className="text-gray-800 font-semibold">Policy ID: <span className="text-red-600">Not Available</span></p>
//               <p className="text-sm text-gray-600 mt-1">Click on 'New Policy' to create an insurance policy for your vehicle.</p>
//               <button 
//                 onClick={() => navigate("/user/newpolicy")}
//                 className="mt-3 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition duration-300"
//               >
//                 + New Policy
//               </button>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
//             <div className="p-3 bg-green-500 text-white">
//               <h2 className="text-lg font-semibold">Vehicle Details</h2>
//             </div>
//             <div className="p-4">
//               <div className="grid grid-cols-2 gap-4 mb-4">
//                 <div className="flex items-center space-x-2">
//                   <Car className="text-green-500 flex-shrink-0" size={20} />
//                   <div>
//                     <p className="text-xs text-gray-500">Model</p>
//                     <p className="text-sm font-semibold text-gray-800">{vehicle.model}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Calendar className="text-green-500 flex-shrink-0" size={20} />
//                   <div>
//                     <p className="text-xs text-gray-500">Purchase Date</p>
//                     <p className="text-sm font-semibold text-gray-800">{vehicle.purchaseDate}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2 col-span-2">
//                   <Key className="text-green-500 flex-shrink-0" size={20} />
//                   <div>
//                     <p className="text-xs text-gray-500">VIN</p>
//                     <p className="text-sm font-semibold text-gray-800">{vehicle.vin}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Palette className="text-green-500 flex-shrink-0" size={20} />
//                   <div>
//                     <p className="text-xs text-gray-500">Color</p>
//                     <p className="text-sm font-semibold text-gray-800">{vehicle.color}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <FileText className="text-green-500 flex-shrink-0" size={20} />
//                   <div>
//                     <p className="text-xs text-gray-500">Plate Number</p>
//                     <p className="text-sm font-semibold text-gray-800">{vehicle.plateNumber}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <img
//                   src="/api/placeholder/400/320"
//                   alt={vehicle.model}
//                   className="w-full h-40 object-cover rounded-lg"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default User;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Car, Calendar, Key, Palette, FileText, AlertCircle } from 'lucide-react';

// const User: React.FC = () => {
//   const navigate = useNavigate();
  
//   const vehicle = {
//     model: 'Land Rover Defender',
//     purchaseDate: '12-12-2020',
//     vin: '1HGCM82633A123456',
//     color: 'Bronze',
//     plateNumber: 'KA01MN0100',
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <div className="flex-1 overflow-y-auto">
//         <div className="max-w-md mx-auto px-4 pb-20">
//           <header className="py-4 mb-4 sticky top-0 bg-gray-100 z-10">
//             <div className="flex items-center space-x-2">
//               <div className="bg-blue-500 text-white p-2 rounded-full">
//                 <Car size={24} />
//               </div>
//               <h1 className="text-2xl font-bold text-gray-800">Vehicle Insurance</h1>
//             </div>
//           </header>

//           <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
//             <div className="p-3 bg-blue-500 text-white flex justify-between items-center">
//               <h2 className="text-lg font-semibold">Policy Details</h2>
//               <div className="flex items-center space-x-1">
//                 <AlertCircle size={16} />
//                 <span className="text-sm font-medium">InActive</span>
//               </div>
//             </div>
//             <div className="p-4">
//               <p className="text-gray-800 font-semibold">Policy ID: <span className="text-red-600">Not Available</span></p>
//               <p className="text-sm text-gray-600 mt-1">Click on 'New Policy' to create an insurance policy for your vehicle.</p>
//               <button 
//                 onClick={() => navigate("/user/newpolicy")}
//                 className="mt-3 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition duration-300"
//               >
//                 + New Policy
//               </button>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
//             <div className="p-3 bg-green-500 text-white">
//               <h2 className="text-lg font-semibold">Vehicle Details</h2>
//             </div>
//             <div className="p-4">
//               <div className="grid grid-cols-2 gap-4 mb-4">
//                 <div className="flex items-center space-x-2">
//                   <Car className="text-green-500 flex-shrink-0" size={20} />
//                   <div>
//                     <p className="text-xs text-gray-500">Model</p>
//                     <p className="text-sm font-semibold text-gray-800">{vehicle.model}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Calendar className="text-green-500 flex-shrink-0" size={20} />
//                   <div>
//                     <p className="text-xs text-gray-500">Purchase Date</p>
//                     <p className="text-sm font-semibold text-gray-800">{vehicle.purchaseDate}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2 col-span-2">
//                   <Key className="text-green-500 flex-shrink-0" size={20} />
//                   <div>
//                     <p className="text-xs text-gray-500">VIN</p>
//                     <p className="text-sm font-semibold text-gray-800">{vehicle.vin}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Palette className="text-green-500 flex-shrink-0" size={20} />
//                   <div>
//                     <p className="text-xs text-gray-500">Color</p>
//                     <p className="text-sm font-semibold text-gray-800">{vehicle.color}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <FileText className="text-green-500 flex-shrink-0" size={20} />
//                   <div>
//                     <p className="text-xs text-gray-500">Plate Number</p>
//                     <p className="text-sm font-semibold text-gray-800">{vehicle.plateNumber}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <img
//                   src="../../src/assets/rangerover.png"
//                   alt={vehicle.model}
//                   className="w-full h-40 object-cover rounded-lg"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Car, Calendar, Key, Palette, FileText, AlertCircle } from 'lucide-react';

// const User: React.FC = () => {
//   const navigate = useNavigate();
  
//   const vehicle = {
//     model: 'Land Rover Defender',
//     purchaseDate: '12-12-2020',
//     vin: '1HGCM82633A123456',
//     color: 'Bronze',
//     plateNumber: 'KA01MN0100',
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="max-w-md mx-auto px-4">
//         <header className="py-4 mb-4">
//           <div className="flex items-center space-x-2">
//             <div className="bg-blue-500 text-white p-2 rounded-full">
//               <Car size={24} />
//             </div>
//             <h1 className="text-2xl font-bold text-gray-800">Vehicle Insurance</h1>
//           </div>
//         </header>

//         <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
//           <div className="p-3 bg-blue-500 text-white flex justify-between items-center">
//             <h2 className="text-lg font-semibold">Policy Details</h2>
//             <div className="flex items-center space-x-1">
//               <AlertCircle size={16} />
//               <span className="text-sm font-medium">InActive</span>
//             </div>
//           </div>
//           <div className="p-4">
//             <p className="text-gray-800 font-semibold">Policy ID: <span className="text-red-600">Not Available</span></p>
//             <p className="text-sm text-gray-600 mt-1">Click on 'New Policy' to create an insurance policy for your vehicle.</p>
//             <button 
//               onClick={() => navigate("/user/newpolicy")}
//               className="mt-3 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition duration-300"
//             >
//               + New Policy
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-3 bg-green-500 text-white">
//             <h2 className="text-lg font-semibold">Vehicle Details</h2>
//           </div>
//           <div className="p-4">
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div className="flex items-center space-x-2">
//                 <Car className="text-green-500 flex-shrink-0" size={20} />
//                 <div>
//                   <p className="text-xs text-gray-500">Model</p>
//                   <p className="text-sm font-semibold text-gray-800">{vehicle.model}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Calendar className="text-green-500 flex-shrink-0" size={20} />
//                 <div>
//                   <p className="text-xs text-gray-500">Purchase Date</p>
//                   <p className="text-sm font-semibold text-gray-800">{vehicle.purchaseDate}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2 col-span-2">
//                 <Key className="text-green-500 flex-shrink-0" size={20} />
//                 <div>
//                   <p className="text-xs text-gray-500">VIN</p>
//                   <p className="text-sm font-semibold text-gray-800">{vehicle.vin}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Palette className="text-green-500 flex-shrink-0" size={20} />
//                 <div>
//                   <p className="text-xs text-gray-500">Color</p>
//                   <p className="text-sm font-semibold text-gray-800">{vehicle.color}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <FileText className="text-green-500 flex-shrink-0" size={20} />
//                 <div>
//                   <p className="text-xs text-gray-500">Plate Number</p>
//                   <p className="text-sm font-semibold text-gray-800">{vehicle.plateNumber}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-4">
//               <img
//                 src="../../src/assets/rangerover.png"
//                 alt={vehicle.model}
//                 className="w-full h-40 object-cover rounded-lg"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default User;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Car, Calendar, Key, Palette, FileText, AlertCircle } from 'lucide-react';

// const User: React.FC = () => {
//   const navigate = useNavigate();
  
//   const vehicle = {
//     model: 'Land Rover Defender',
//     purchaseDate: '12-12-2020',
//     vin: '1HGCM82633A123456',
//     color: 'Bronze',
//     plateNumber: 'KA01MN0100',
//     imageUrl: 'https://example.com/rangerover.png', // Replace with actual image URL
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen pb-16">
//       <div className="max-w-md mx-auto pt-4 px-4">
//       <header className="flex items-center space-x-2 mb-4">
//           <div className="bg-blue-500 text-white p-2 rounded-full">
//              <Car size={24} />
//      </div>
//           <h1 className="text-2xl font-bold text-gray-800">Vehicle Insurasdance</h1>
//         </header>
//         <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
//           <div className="p-3 bg-blue-500 text-white flex justify-between items-center">
//             <h2 className="text-lg font-semibold">Policy Details</h2>
//             <div className="flex items-center space-x-1">
//               <AlertCircle size={16} />
//               <span className="text-sm font-medium">InActive</span>
//             </div>
//           </div>
//           <div className="p-4">
//             <p className="text-gray-800 font-semibold">Policy ID: <span className="text-red-600">Not Available</span></p>
//             <p className="text-sm text-gray-600 mt-1">Click on 'New Policy' to create an insurance policy for your vehicle.</p>
//             <button 
//               onClick={() => navigate("/user/newpolicy")}
//               className="mt-3 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition duration-300"
//             >
//               + New Policy
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-3 bg-green-500 text-white">
//             <h2 className="text-lg font-semibold">Vehicle Details</h2>
//           </div>
//           <div className="p-4">
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div className="flex items-center space-x-2">
//                 <Car className="text-green-500 flex-shrink-0" size={20} />
//                 <div>
//                   <p className="text-xs text-gray-500">Model</p>
//                   <p className="text-sm font-semibold text-gray-800">{vehicle.model}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Calendar className="text-green-500 flex-shrink-0" size={20} />
//                 <div>
//                   <p className="text-xs text-gray-500">Purchase Date</p>
//                   <p className="text-sm font-semibold text-gray-800">{vehicle.purchaseDate}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2 col-span-2">
//                 <Key className="text-green-500 flex-shrink-0" size={20} />
//                 <div>
//                   <p className="text-xs text-gray-500">VIN</p>
//                   <p className="text-sm font-semibold text-gray-800">{vehicle.vin}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Palette className="text-green-500 flex-shrink-0" size={20} />
//                 <div>
//                   <p className="text-xs text-gray-500">Color</p>
//                   <p className="text-sm font-semibold text-gray-800">{vehicle.color}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <FileText className="text-green-500 flex-shrink-0" size={20} />
//                 <div>
//                   <p className="text-xs text-gray-500">Plate Number</p>
//                   <p className="text-sm font-semibold text-gray-800">{vehicle.plateNumber}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-4">
//               <img
//                 src="../../src/assets/rangerover.png"
//                 alt={vehicle.model}
//                 className="w-full h-40 object-cover rounded-lg"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default User;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Car, Calendar, Key, Palette, FileText, Plus, AlertCircle } from 'lucide-react';

// const User = () => {
//   const navigate = useNavigate();
  
//   const vehicle = {
//     model: 'Land Rover Defender',
//     purchaseDate: '12-12-2020',
//     vin: '1HGCM82633A123456',
//     color: 'Bronze',
//     plateNumber: 'KA01MN0100',
//     imageUrl: 'https://example.com/rangerover.png', // Replace with actual image URL
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-4 pb-16">
//       <div className="max-w-md mx-auto space-y-4">
//         <header className="flex items-center space-x-2 mb-4">
//           <div className="bg-blue-500 text-white p-2 rounded-full">
//             <Car size={24} />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-800">Vehicle Insurance</h1>
//         </header>
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-3 bg-blue-500 text-white flex justify-between items-center">
//             <h2 className="text-lg font-semibold">Policy Details</h2>
//             <div className="flex items-center space-x-1">
//               <AlertCircle size={16} />
//               <span className="text-sm font-medium">InActive</span>
//             </div>
//           </div>
//           <div className="p-4">
//             <p className="text-gray-800 font-semibold">Policy ID: <span className="text-red-600">Not Available</span></p>
//             <p className="text-sm text-gray-600 mt-1">Click on 'New Policy' to create an insurance policy for your vehicle.</p>
//             <button 
//               onClick={() => navigate("/user/newpolicy")}
//               className="mt-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 hover:bg-green-600 transition duration-300"
//             >
//               <Plus size={16} />
//               <span>New Policy</span>
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-3 bg-green-500 text-white">
//             <h2 className="text-lg font-semibold">Vehicle Details</h2>
//           </div>
//           <div className="p-4">
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div className="flex items-center space-x-2">
//                 <Car className="text-green-500 flex-shrink-0" size={20} />
//                 <div>
//                   <p className="text-xs text-gray-500">Model</p>
//                   <p className="text-sm font-semibold text-gray-800">{vehicle.model}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Calendar className="text-green-500 flex-shrink-0" size={20} />
//                 <div>
//                   <p className="text-xs text-gray-500">Purchase Date</p>
//                   <p className="text-sm font-semibold text-gray-800">{vehicle.purchaseDate}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2 col-span-2">
//                 <Key className="text-green-500 flex-shrink-0" size={20} />
//                 <div>
//                   <p className="text-xs text-gray-500">VIN</p>
//                   <p className="text-sm font-semibold text-gray-800">{vehicle.vin}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Palette className="text-green-500 flex-shrink-0" size={20} />
//                 <div>
//                   <p className="text-xs text-gray-500">Color</p>
//                   <p className="text-sm font-semibold text-gray-800">{vehicle.color}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <FileText className="text-green-500 flex-shrink-0" size={20} />
//                 <div>
//                   <p className="text-xs text-gray-500">Plate Number</p>
//                   <p className="text-sm font-semibold text-gray-800">{vehicle.plateNumber}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-4">
//               <img
//                 src = "../../src/assets/rangerover.png"
//                 alt={vehicle.model}
//                 className="w-full h-40 object-cover rounded-lg shadow-sm"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default User;
// import { useNavigate } from 'react-router-dom';
// import { Car, Calendar, Key, Palette, FileText, Plus, AlertCircle } from 'lucide-react';
// import rangeRover from  "../../src/assets/rangerover.png"

// const User = () => {
//   const navigate = useNavigate();
  
//   const vehicle = {
//     model: 'Land Rover Defender',
//     purchaseDate: '12-12-2020',
//     vin: '1HGCM82633A123456',
//     color: 'Bronze',
//     plateNumber: 'KA01MN0100',
//     imageUrl: {rangeRover}, // Replace with actual image URL
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-4 pb-16">
//       <div className="max-w-md mx-auto space-y-4">
//         <header className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-2">
//             <div className="bg-blue-500 text-white p-1.5 rounded-full">
//               <Car size={20} />
//             </div>
//             <h1 className="text-xl font-bold text-gray-800">Vehicle Insurance</h1>
//           </div>
//         </header>

//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-3 bg-blue-500 text-white flex justify-between items-center">
//             <h2 className="text-lg font-semibold">Policy Details</h2>
//             <div className="flex items-center space-x-1">
//               <AlertCircle size={16} />
//               <span className="text-sm font-medium">InActive</span>
//             </div>
//           </div>
//           <div className="p-3">
//             <p className="text-gray-600 text-sm">Policy ID: <span className="font-semibold text-gray-800">Not Available</span></p>
//             <p className="text-xs text-gray-500 mt-1">Click on 'New Policy' to create an insurance policy for your vehicle.</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-3 bg-green-500 text-white">
//             <h2 className="text-lg font-semibold">Vehicle Details</h2>
//           </div>
//           <div className="p-3">
//             <div className="grid grid-cols-2 gap-3 mb-3">
//               <div className="flex items-center space-x-2">
//                 <Car className="text-green-500 flex-shrink-0" size={16} />
//                 <div>
//                   <p className="text-xs text-gray-500">Model</p>
//                   <p className="text-sm font-semibold text-gray-800">{vehicle.model}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Calendar className="text-green-500 flex-shrink-0" size={16} />
//                 <div>
//                   <p className="text-xs text-gray-500">Purchase Date</p>
//                   <p className="text-sm font-semibold text-gray-800">{vehicle.purchaseDate}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2 col-span-2">
//                 <Key className="text-green-500 flex-shrink-0" size={16} />
//                 <div className="w-full">
//                   <p className="text-xs text-gray-500">VIN</p>
//                   <p className="text-xs font-semibold text-gray-800 break-all">{vehicle.vin}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Palette className="text-green-500 flex-shrink-0" size={16} />
//                 <div>
//                   <p className="text-xs text-gray-500">Color</p>
//                   <p className="text-sm font-semibold text-gray-800">{vehicle.color}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <FileText className="text-green-500 flex-shrink-0" size={16} />
//                 <div>
//                   <p className="text-xs text-gray-500">Plate Number</p>
//                   <p className="text-sm font-semibold text-gray-800">{vehicle.plateNumber}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-3">
//               <img
//                 src= "../../src/assets/rangerover.png"
//                 alt={vehicle.model}
//                 className="w-full h-32 object-cover rounded-lg shadow-sm"
//               />
//             </div>
//           </div>
//         </div>

//         <button 
//           onClick={() => navigate("/user/newpolicy")}
//           className="fixed bottom-20 right-4 bg-green-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-green-600 transition duration-300 shadow-lg"
//         >
//           <Plus size={20} />
//           <span>New Policy</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default User;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Car, Calendar, Key, Palette, FileText, Plus, AlertCircle } from 'lucide-react';

// const User = () => {
//   const navigate = useNavigate();
  
//   const vehicle = {
//     model: 'Land Rover Defender',
//     purchaseDate: '12-12-2020',
//     vin: '1HGCM82633A123456',
//     color: 'Bronze',
//     plateNumber: 'KA01MN0100',
//     imageUrl: 'https://example.com/rangerover.png', // Replace with actual image URL
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-4">
//       <div className="max-w-3xl mx-auto">
//         <header className="flex items-center justify-between mb-6">
//           <div className="flex items-center space-x-3">
//             <div className="bg-blue-500 text-white p-2 rounded-full">
//               <Car size={24} />
//             </div>
//             <h1 className="text-2xl font-bold text-gray-800">Vehicle Insurance</h1>
//           </div>
//           <button 
//             onClick={() => navigate("/user/newpolicy")}
//             className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-green-600 transition duration-300"
//           >
//             <Plus size={20} />
//             <span>New Policy</span>
//           </button>
//         </header>

//         <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
//           <div className="p-4 bg-blue-500 text-white flex justify-between items-center">
//             <h2 className="text-xl font-semibold">Policy Details</h2>
//             <div className="flex items-center space-x-2">
//               <AlertCircle size={20} />
//               <span className="font-medium">InActive</span>
//             </div>
//           </div>
//           <div className="p-4">
//             <p className="text-gray-600">Policy ID: <span className="font-semibold text-gray-800">Not Available</span></p>
//             <p className="text-sm text-gray-500 mt-2">Click on 'New Policy' to create an insurance policy for your vehicle.</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="p-4 bg-green-500 text-white">
//             <h2 className="text-xl font-semibold">Vehicle Details</h2>
//           </div>
//           <div className="p-4">
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div className="flex items-center space-x-3">
//                 <Car className="text-green-500" size={20} />
//                 <div>
//                   <p className="text-sm text-gray-500">Model</p>
//                   <p className="font-semibold text-gray-800">{vehicle.model}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Calendar className="text-green-500" size={20} />
//                 <div>
//                   <p className="text-sm text-gray-500">Purchase Date</p>
//                   <p className="font-semibold text-gray-800">{vehicle.purchaseDate}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Key className="text-green-500" size={20} />
//                 <div>
//                   <p className="text-sm text-gray-500">VIN</p>
//                   <p className="font-semibold text-gray-800">{vehicle.vin}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Palette className="text-green-500" size={20} />
//                 <div>
//                   <p className="text-sm text-gray-500">Color</p>
//                   <p className="font-semibold text-gray-800">{vehicle.color}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <FileText className="text-green-500" size={20} />
//                 <div>
//                   <p className="text-sm text-gray-500">Plate Number</p>
//                   <p className="font-semibold text-gray-800">{vehicle.plateNumber}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-4">
//               <img
//                 src={vehicle.imageUrl}
//                 alt={vehicle.model}
//                 className="w-full h-48 object-cover rounded-lg shadow-md"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default User;
// import React from 'react';
// import PolicyComponent from '../MainApp/InsureeComp/PolicyComponent';
// import VehicleDetailsComponent from '../MainApp/InsureeComp/VehicleDetailsComponent';
// import InsuranceIcon from './InsuranceIcon';



// const User: React.FC = () => {
//     return (
//         <div className="flex flex-col justify-center items-center min-h-screen">
//             <InsuranceIcon/>
//             {/* Policy Component */}
//             <div className="w-full max-w-lg">
//                 <PolicyComponent />
//             </div>
//             {/* Vehicle Details Component */}
//             <h3 className="text-lg font-bold mb-2 w-full text-left mt-6">Vehicle Details</h3>
//             <div className="w-full max-w-lg">
//                 <VehicleDetailsComponent />
//             </div>
//         </div>
//     );
// };

// export default User;
