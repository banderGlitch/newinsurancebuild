import React, { useState } from 'react';

// Sample data for the table
const insurerData = [ // allQuotations here 
  { insurerId: 'I123', chainId: '1233', premium: 3000, coverage: 100000 },
  { insurerId: 'I456', chainId: '4566', premium: 2000, coverage: 100000 },
  { insurerId: 'I789', chainId: '7899', premium: 10000, coverage: 300000 },
  { insurerId: 'I910', chainId: '9100', premium: 5000, coverage: 200000 },
  { insurerId: 'I112', chainId: '1122', premium: 4000, coverage: 150000 },
  { insurerId: 'I113', chainId: '1133', premium: 7000, coverage: 250000 },
  { insurerId: 'I114', chainId: '1144', premium: 5200, coverage: 230000 },
  { insurerId: 'I115', chainId: '1155', premium: 6200, coverage: 210000 },
  { insurerId: 'I116', chainId: '1166', premium: 8200, coverage: 350000 },
  { insurerId: 'I117', chainId: '1177', premium: 1300, coverage: 95000 },
  { insurerId: 'I118', chainId: '1188', premium: 5500, coverage: 180000 },
  { insurerId: 'I119', chainId: '1199', premium: 2400, coverage: 160000 },
  { insurerId: 'I120', chainId: '1200', premium: 4000, coverage: 170000 },
  { insurerId: 'I121', chainId: '1211', premium: 3300, coverage: 145000 },
  { insurerId: 'I122', chainId: '1222', premium: 7400, coverage: 290000 },
  { insurerId: 'I1233', chainId: '1233', premium: 9800, coverage: 310000 },
  { insurerId: 'I124', chainId: '1244', premium: 3600, coverage: 190000 },
  { insurerId: 'I125', chainId: '1255', premium: 5100, coverage: 225000 },
  { insurerId: 'I126', chainId: '1266', premium: 2700, coverage: 140000 },
  { insurerId: 'I127', chainId: '1277', premium: 6600, coverage: 240000 },
];

interface InsurerTableProps {
  coverageLimit: number;
}

const InsurerTable: React.FC<InsurerTableProps> = ({ coverageLimit }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [totalSelectedCoverage, setTotalSelectedCoverage] = useState<number>(0);
  const [totalPremium, setTotalPremium] = useState<number>(0);

  // Handle row selection
  const handleRowClick = (insurerId: string, coverage: number, premium: number) => {
    if (selectedRows.includes(insurerId)) return;

    setSelectedRows([...selectedRows, insurerId]);
    setTotalSelectedCoverage(totalSelectedCoverage + coverage);
    setTotalPremium(totalPremium + premium); // Update total premium
  };

  // Handle deselecting a row from the sequence below
  const handleDeselect = (insurerId: string, coverage: number, premium: number) => {
    setSelectedRows(selectedRows.filter((id) => id !== insurerId));
    setTotalSelectedCoverage(totalSelectedCoverage - coverage);
    setTotalPremium(totalPremium - premium); // Update total premium
  };

  // Get selected rows as an array of insurer data
  const selectedRowData = insurerData.filter((insurer) =>
    selectedRows.includes(insurer.insurerId)
  );

  const isCoverageExceeded = totalSelectedCoverage > coverageLimit;

  return (
    <div className="w-full bg-white rounded-lg shadow-md mt-10">
      {/* Insurer Table */}
      <div className="max-h-80 overflow-y-auto mt-4">
        <table className="w-full text-left border-collapse mb-4 text-sm">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b">
              <th className="p-3 font-semibold text-gray-700">Insurer Id</th>
              <th className="p-3 font-semibold text-gray-700">Chain</th>
              <th className="p-3 font-semibold text-gray-700">Premium</th>
              <th className="p-3 font-semibold text-gray-700">Coverage</th>
            </tr>
          </thead>
          <tbody>
            {insurerData.map((insurer) => (
              <tr
                key={insurer.insurerId}
                className={`border-b cursor-pointer ${selectedRows.includes(insurer.insurerId)
                  ? 'bg-blue-100'
                  : 'bg-white'
                }`}
                onClick={() => handleRowClick(insurer.insurerId, insurer.coverage, insurer.premium)}
              >
                <td className="p-3 text-blue-500 whitespace-nowrap">{insurer.insurerId}</td>
                <td className="p-3">{insurer.chainId}</td>
                <td className="p-3">{insurer.premium.toLocaleString()}</td>
                <td className="p-3">{insurer.coverage.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total premium and selected policies */}
      <div className="mt-0 text-sm text-center relative bottom-1 right-3">
        <p className="font-semibold">Premium: <span className="font-bold text-blue-600">{totalPremium.toLocaleString()}</span></p>
      </div>

      {/* Total selected policies and coverage */}
      <div className="text-sm flex flex-col">
        <p className="font-semibold">Total Selected Policies: {selectedRows.length}</p>
        <p className={`font-semibold ${isCoverageExceeded ? 'text-red-500' : ''}`}>
          Total Selected Coverage: {totalSelectedCoverage.toLocaleString()} / {coverageLimit.toLocaleString()}
        </p>
      </div>

      {/* Display selected rows in sequence */}
      {selectedRows.length > 0 && (
        <div className="mb-4 mt-4 pb-4">
          <h4 className="font-semibold mb-2 text-sm">Selected Order:</h4>
          {/* Added scrollable container for selected rows */}
          <div className="flex space-x-4 overflow-x-auto max-w-xs whitespace-nowrap">
            {selectedRowData.map((insurer) => (
              <div
                key={insurer.insurerId}
                className="px-2 py-1 bg-gray-200 rounded-md cursor-pointer text-sm"
                onClick={() => handleDeselect(insurer.insurerId, insurer.coverage, insurer.premium)}
              >
                {insurer.insurerId}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InsurerTable;
