import React from 'react';
import InsuranceIcon from './InsuranceIcon';
import { FaEdit } from 'react-icons/fa'; // Importing the edit icon

const Insurer: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <InsuranceIcon/>
      <div className="w-full max-w-lg">
        {/* Premium and Coverage section */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <p className="text-sm font-semibold">Premium:</p>
            <p className="text-sm">3000</p>
            <p className="text-sm font-semibold">Coverage:</p>
            <p className="text-sm">100,000</p>
          </div>
          <FaEdit className="text-blue-500 text-lg cursor-pointer" />
        </div>

        {/* Policy Table */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 font-semibold">Policy Id</th>
                <th className="p-2 font-semibold">User Id</th>
                <th className="p-2 font-semibold">Premium</th>
                <th className="p-2 font-semibold">Coverage</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 text-blue-500">P123</td>
                <td className="p-2">U123</td>
                <td className="p-2">3000</td>
                <td className="p-2">100,000</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 text-blue-500">P456</td>
                <td className="p-2">P123</td>
                <td className="p-2">3000</td>
                <td className="p-2">100,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Insurer;


// import React from 'react';

// const Insurer: React.FC = () => {
//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold">Insurer</h2>
//       <p>Your insurer details go here.</p>
//     </div>
//   );
// };

// export default Insurer;