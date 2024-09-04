import React, { useState } from 'react';

// Sample data for the table
const insurerData = [
  { insurerId: 'I123', chainId: '1233', premium: 3000, coverage: 100000 },
  { insurerId: 'I456', chainId: '4566', premium: 2000, coverage: 100000 },
  { insurerId: 'I789', chainId: '7899', premium: 10000, coverage: 300000 },
];

interface InsurerTableProps {
  coverageLimit: number;
}

const InsurerTable: React.FC<InsurerTableProps> = ({ coverageLimit }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [totalSelectedCoverage, setTotalSelectedCoverage] = useState<number>(0);

  // Handle row selection
  const handleRowClick = (insurerId: string, coverage: number) => {
    if (totalSelectedCoverage + coverage > coverageLimit) {
      alert(`Total coverage limit of ${coverageLimit} exceeded.`);
      return;
    }

    if (selectedRows.includes(insurerId)) return;

    setSelectedRows([...selectedRows, insurerId]);
    setTotalSelectedCoverage(totalSelectedCoverage + coverage);
  };

  // Handle deselecting a row from the sequence below
  const handleDeselect = (insurerId: string, coverage: number) => {
    setSelectedRows(selectedRows.filter((id) => id !== insurerId));
    setTotalSelectedCoverage(totalSelectedCoverage - coverage);
  };

  // Get selected rows as an array of insurer data
  const selectedRowData = insurerData.filter((insurer) =>
    selectedRows.includes(insurer.insurerId)
  );

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md max-h-64 overflow-y-auto">
      {/* Insurer Table */}
      <table className="w-full text-left border-collapse mb-4">
        <thead>
          <tr className="border-b">
            <th className="p-2 font-semibold">Insurer Id</th>
            <th className="p-2 font-semibold">Chain Id</th>
            <th className="p-2 font-semibold">Premium</th>
            <th className="p-2 font-semibold">Coverage</th>
          </tr>
        </thead>
        <tbody>
          {insurerData.map((insurer) => (
            <tr
              key={insurer.insurerId}
              className={`border-b cursor-pointer ${
                selectedRows.includes(insurer.insurerId)
                  ? 'bg-blue-200'
                  : 'bg-white'
              }`}
              onClick={() => handleRowClick(insurer.insurerId, insurer.coverage)}
            >
              <td className="p-2 text-blue-500">{insurer.insurerId}</td>
              <td className="p-2">{insurer.chainId}</td>
              <td className="p-2">${insurer.premium.toLocaleString()}</td>
              <td className="p-2">${insurer.coverage.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display selected rows in sequence */}
      {selectedRows.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Selected Order:</h4>
          <div className="flex space-x-4">
            {selectedRowData.map((insurer) => (
              <div
                key={insurer.insurerId}
                className="px-2 py-1 bg-gray-200 rounded-md cursor-pointer"
                onClick={() => handleDeselect(insurer.insurerId, insurer.coverage)}
              >
                {insurer.insurerId}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Total selected policies */}
      <div className="mt-4">
        <p className="font-semibold">Total Selected Policies: {selectedRows.length}</p>
        <p>Total Selected Coverage: ${totalSelectedCoverage.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default InsurerTable;

// import React, { useState } from 'react';

// // Sample data for the table
// const insurerData = [
//     { insurerId: 'I123', chainId: '1233', premium: 3000, coverage: 100000 },
//     { insurerId: 'I456', chainId: '4566', premium: 2000, coverage: 100000 },
//     { insurerId: 'I789', chainId: '7899', premium: 10000, coverage: 300000 },
// ];


// interface InsurerTableProps {
//     coverageLimit: number;
// }

// const InsurerTable: React.FC<InsurerTableProps> = ({ coverageLimit }) => {

//     const [selectedRows, setSelectedRows] = useState<string[]>([]);
//     const [totalSelectedCoverage, setTotalSelectedCoverage] = useState<number>(0);


//     // Handle row selection
//     const handleRowClick = (insurerId: string, coverage: number) => {
//         if (totalSelectedCoverage + coverage > coverageLimit) {
//             alert(`Total coverage limit of ${coverageLimit} exceeded.`);
//             return;
//         }

//         if (selectedRows.includes(insurerId)) return;

//         setSelectedRows([...selectedRows, insurerId]);
//         setTotalSelectedCoverage(totalSelectedCoverage + coverage);
//     };

//     // Handle deselecting a row from the sequence below
//     const handleDeselect = (insurerId: string, coverage: number) => {
//         setSelectedRows(selectedRows.filter((id) => id !== insurerId));
//         setTotalSelectedCoverage(totalSelectedCoverage - coverage);
//     };


//     // Get selected rows as an array of insurer data
//     const selectedRowData = insurerData.filter((insurer) =>
//         selectedRows.includes(insurer.insurerId)
//     );





//     return (
//         <div className="w-full bg-white p-4 rounded-lg shadow-md">
//             <table className="w-full text-left border-collapse">
//                 <thead>
//                     <tr className="border-b">
//                         <th className="p-2 font-semibold">Insurer Id</th>
//                         <th className="p-2 font-semibold">Chain Id</th>
//                         <th className="p-2 font-semibold">Premium</th>
//                         <th className="p-2 font-semibold">Coverage</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {insurerData.map((insurer) => (
//                         <tr
//                             key={insurer.insurerId}
//                             className={`border-b cursor-pointer ${selectedRows.includes(insurer.insurerId)
//                                     ? 'bg-blue-200'
//                                     : 'bg-white'
//                                 }`}
//                             onClick={() => handleRowClick(insurer.insurerId, insurer.coverage)}
//                         >
//                             <td className="p-2 text-blue-500">{insurer.insurerId}</td>
//                             <td className="p-2">{insurer.chainId}</td>
//                             <td className="p-2">${insurer.premium.toLocaleString()}</td>
//                             <td className="p-2">${insurer.coverage.toLocaleString()}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default InsurerTable;
































 {/* <tr className="border-b">
                        <td className="p-2 text-blue-500">I123</td>
                        <td className="p-2">1233</td>
                        <td className="p-2">$3000</td>
                        <td className="p-2">$100,000</td>
                    </tr>
                    <tr className="border-b">
                        <td className="p-2 text-blue-500">I456</td>
                        <td className="p-2">4566</td>
                        <td className="p-2">$2000</td>
                        <td className="p-2">$100,000</td>
                    </tr>
                    <tr>
                        <td className="p-2 text-blue-500">I789</td>
                        <td className="p-2">7899</td>
                        <td className="p-2">$10,000</td>
                        <td className="p-2">$300,000</td>
                    </tr> */}