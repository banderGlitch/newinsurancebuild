import React from 'react';
import InsuranceIcon from '../../components/InsuranceIcon';
import InsurerTable from './InsurerTable';


const NewQuotes: React.FC = () => {
    const coverage = '200000'
    // const [coverage, setCoverage] = useState<string>('200000');
    
    return (
        <div className="min-h-screen flex flex-col justify-center items-center ">
            <InsuranceIcon/>
        <div className="w-full max-w-lg"> 
          {/* Move InsurerTable here */}
          <InsurerTable coverageLimit={parseInt(coverage)} />
          {/* Confirm & Pay Button */}
          <div className="mt-4  bottom-0 p-4 mt-auto">
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Confirm & Pay
            </button>
          </div>
        </div>
      </div>
    )
}

export default NewQuotes;