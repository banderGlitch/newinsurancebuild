import React, { useState } from 'react';

// Sample data for the table
const insurerData = [
  { insurerId: 'I123', chainId: '1233', premium: 3000, coverage: 100000 },
  { insurerId: 'I456', chainId: '4566', premium: 2000, coverage: 100000 },
  { insurerId: 'I789', chainId: '7899', premium: 10000, coverage: 300000 },
  { insurerId: 'I910', chainId: '9100', premium: 5000, coverage: 200000 },
  { insurerId: 'I112', chainId: '1122', premium: 4000, coverage: 150000 },
  { insurerId: 'I113', chainId: '1133', premium: 7000, coverage: 250000 },

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
    <div className="w-full bg-white rounded-lg shadow-md ">
      {/* Insurer Table */}
      <div className="max-h-64 overflow-y-auto">
        <table className="w-full text-left border-collapse mb-4 text-sm">
          <thead>
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
                onClick={() => handleRowClick(insurer.insurerId, insurer.coverage)}
              >
                <td className="p-3 text-blue-500 whitespace-nowrap">{insurer.insurerId}</td>
                <td className="p-3">{insurer.chainId}</td>
                <td className="p-3">${insurer.premium.toLocaleString()}</td>
                <td className="p-3">${insurer.coverage.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Display selected rows in sequence */}
      {/* Total selected policies and coverage */}
      <div className="mt-4 text-sm">
        <p className="font-semibold">Total Selected Policies: {selectedRows.length}</p>
        <p>Total Selected Coverage: ${totalSelectedCoverage.toLocaleString()} / ${coverageLimit.toLocaleString()}</p>
      </div>

      {/* Display selected rows in sequence */}
      {selectedRows.length > 0 && (
        <div className="mb-4 mt-4  pb-4">
          <h4 className="font-semibold mb-2 text-sm">Selected Order:</h4>
          <div className="flex space-x-4">
            {selectedRowData.map((insurer) => (
              <div
                key={insurer.insurerId}
                className="px-2 py-1 bg-gray-200 rounded-md cursor-pointer text-sm"
                onClick={() => handleDeselect(insurer.insurerId, insurer.coverage)}
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

