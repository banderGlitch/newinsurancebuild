import React from 'react';
import { FaSearch } from 'react-icons/fa'

interface CoverageInputProps {
    coverageLimit: number;
  setCoverage: (value: any) => void;
}

const CoverageInput: React.FC<CoverageInputProps> = ({ coverageLimit, setCoverage }) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md flex justify-between items-center mb-4">
      <label className="text-sm font-semibold mr-2">Coverage:</label>
      <input 
        type="text"
        value={coverageLimit}
        onChange={(e) => setCoverage(e.target.value)}
        className="w-1/3 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
       {/* <FaSearch className="ml-4 text-blue-500 text-lg cursor-pointer hover:text-blue-600" /> */}
       <button className="ml-4 bg-blue-500 text-white px-2 py-0.5 rounded-md text-sm font-semibold hover:bg-blue-600 transition duration-200">
        Request Quotations
      </button>
      {/* <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Request Quotations
      </button> */}
    </div>
  );
};

export default CoverageInput;
