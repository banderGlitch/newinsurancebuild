import React from 'react';
import InsuranceIcon from '../../components/InsuranceIcon';
import { useNavigate } from 'react-router-dom';

const ConfirmAndPay: React.FC = () => {
    const navigate = useNavigate()

    const handleReturn = () => {
        navigate(-1); // Go back to the previous page
      };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
        <InsuranceIcon/>
      <h2 className="text-xl font-bold mb-4">Premium Payment</h2>

      {/* Total Premium */}
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-6">
        <p className="text-center text-sm text-gray-700">
          Total Premium: <span className="font-bold">$200,000</span>
        </p>
      </div>

      {/* Pay Button */}
      <div className="w-full max-w-md bg-blue-500 text-white py-2 px-4 rounded-md text-center mb-6">
        Pay
      </div>

      {/* Payment Status */}
      <div className="w-full max-w-md bg-gray-100 text-gray-700 p-2 rounded-md mb-2 shadow-sm text-center text-sm">
        Premium Allocated to <span className="font-bold">0xomogijo5653...</span>
      </div>
      <div className="w-full max-w-md bg-gray-100 text-gray-700 p-2 rounded-md mb-2 shadow-sm text-center text-sm">
        <span className="font-bold">Distributing premiums</span>
      </div>
      <div className="w-full max-w-md bg-gray-100 text-gray-700 p-2 rounded-md mb-2 shadow-sm text-center text-sm">
        Premium <span className="font-bold">$3000</span> paid to <span className="font-bold">I123</span>
      </div>
      <div className="w-full max-w-md bg-gray-100 text-gray-700 p-2 rounded-md mb-2 shadow-sm text-center text-sm">
        Premium <span className="font-bold">$2000</span> paid to <span className="font-bold">I456</span>
      </div>
      <div className="w-full max-w-md bg-gray-100 text-gray-700 p-2 rounded-md mb-6 shadow-sm text-center text-sm">
        Policy <span className="font-bold">P12345</span> Issued
      </div>

      {/* Return Button */}
      <div className="w-full max-w-md">
        <button
          onClick={handleReturn}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md text-center"
        >
          Return
        </button>
      </div>
    </div>
    // <div className="min-h-screen flex flex-col justify-center items-center p-4">
    //     <InsuranceIcon/>
    //   <h2 className="text-xl font-bold mb-4">Premium Payment</h2>

    //   <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-6">
    //     <p className="text-center font-semibold text-gray-700">Total Premium: $200,000</p>
    //   </div>

    //   <div className="w-full max-w-md bg-blue-500 text-white py-2 px-4 rounded-md text-center mb-6">
    //     Pay
    //   </div>

    //   <div className="w-full max-w-md bg-gray-100 text-gray-700 p-2 rounded-md mb-2 shadow-sm text-center">
    //     Premium Allocated to 0xomogijo5653...
    //   </div>
    //   <div className="w-full max-w-md bg-gray-100 text-gray-700 p-2 rounded-md mb-2 shadow-sm text-center">
    //     Distributing premiums
    //   </div>
    //   <div className="w-full max-w-md bg-gray-100 text-gray-700 p-2 rounded-md mb-2 shadow-sm text-center">
    //     Premium $3000 paid to I123
    //   </div>
    //   <div className="w-full max-w-md bg-gray-100 text-gray-700 p-2 rounded-md mb-2 shadow-sm text-center">
    //     Premium $2000 paid to I456
    //   </div>
    //   <div className="w-full max-w-md bg-gray-100 text-gray-700 p-2 rounded-md mb-6 shadow-sm text-center">
    //     Policy P12345 Issued
    //   </div>

    //   <div className="w-full max-w-md bg-blue-500 text-white py-2 px-4 rounded-md text-center">
    //     Return
    //   </div>
    // </div>
  );
};

export default ConfirmAndPay;
// import React, { useState } from 'react';
// import InsuranceIcon from '../../components/InsuranceIcon';

// const ConfirmAndPay: React.FC = () => {
//   const [isPaymentDone, setIsPaymentDone] = useState(false);
//   const [premiumStatus, setPremiumStatus] = useState<string[]>([]);

//   const handlePayment = () => {
//     // Simulate payment process with status updates
//     setIsPaymentDone(true);
//     setPremiumStatus([
//       'Premium Allocated to 0xomogijo5653...',
//       'Distributing premiums',
//       'Premium $3000 paid to I123',
//       'Premium $2000 paid to I456',
//       'Policy P12345 Issued'
//     ]);
//   };

//   const handleReturn = () => {
//     // Add return functionality
//     alert('Returning to previous page');
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-between items-center p-4 ">
//         <InsuranceIcon/>
//       {/* Page Header */}
//       <h2 className="text-xl font-bold mb-4 text-center">Premium Payment</h2>

//       {/* Total Premium */}
//       <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-6">
//         <p className="text-center font-semibold text-gray-700">Total Premium: $200,000</p>
//       </div>

//       {/* Payment Button */}
//       {!isPaymentDone && (
//         <div className="w-full max-w-md">
//           <button
//             onClick={handlePayment}
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
//           >
//             Pay
//           </button>
//         </div>
//       )}

//       {/* Payment Status */}
//       {isPaymentDone && (
//         <div className="w-full max-w-md">
//           {premiumStatus.map((status, index) => (
//             <div key={index} className="bg-gray-100 text-gray-700 p-2 rounded-md mb-2 shadow-sm text-center">
//               {status}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Return Button */}
//       {isPaymentDone && (
//         <div className="w-full max-w-md mt-4">
//           <button
//             onClick={handleReturn}
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
//           >
//             Return
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ConfirmAndPay;
