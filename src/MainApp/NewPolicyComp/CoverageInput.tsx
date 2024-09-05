import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CoverageInputProps {
    coverageLimit: number;
  setCoverage: (value: any) => void;
}

const CoverageInput: React.FC<CoverageInputProps> = ({ coverageLimit, setCoverage }) => {
  const navigation = useNavigate()
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md flex justify-between items-center mb-4">
      <label className="text-sm font-semibold mr-2">Coverage:</label>
      <input
        type="text"
        value={coverageLimit}
        onChange={(e) => setCoverage(e.target.value)}
        className="w-1/3 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
       <button onClick={() => navigation("/user/newpolicy/newquotes")} className="ml-4 bg-blue-500 text-white px-2 py-0.5 rounded-md text-sm font-semibold hover:bg-blue-600 transition duration-200">
        Request Quotations
      </button>
    </div>
  );
};

export default CoverageInput;
