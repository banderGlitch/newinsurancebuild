import React from 'react';
import { useNavigate } from 'react-router-dom';


const PolicyComponent: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full flex justify-between items-center border">
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-semibold">Policy Id:</p>
        {/* <p onClick={(createClaim(80002, 1, 500, 'Car accident')) => navigate('createClaim')} className="text-sm">claimDetails.claimId</p> */}
        <p onClick={() => navigate('createClaim')} className="text-sm"></p>
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-sm font-semibold">Status:</p>
        <p className="text-sm text-red-500 font-bold">InActive</p>
        {/* Placeholder for the plus icon */}
        <div className="rounded-full bg-gray-300 w-6 h-6 flex items-center justify-center">
          <svg onClick={() => navigate("/user/newpolicy")} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>
    </div>
  </div>
  );
};

export default PolicyComponent;
// import React from 'react';

// const PolicyComponent: React.FC = () => {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md mb-4">
//       {/* <h3 className="text-lg font-bold mb-2">Policy:</h3> */}
//       <table className="w-full">
//         <tbody>
//           <tr>
//             <td className="font-semibold">Policy Id</td>
//             <td className="text-right">IL2345</td>
//           </tr>
//           <tr>
//             <td className="font-semibold">Status</td>
//             <td className="text-right text-red-500 font-bold">InActive</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PolicyComponent;