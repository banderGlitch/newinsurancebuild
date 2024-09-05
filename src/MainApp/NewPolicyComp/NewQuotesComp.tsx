import React, {useState} from 'react';
import InsuranceIcon from '../../components/InsuranceIcon';
import InsurerTable from './InsurerTable';


const NewQuotes: React.FC = () => {
    const [coverage, setCoverage] = useState<string>('200000');
    
    return (
        <div className="min-h-screen flex flex-col justify-center items-center ">
            <InsuranceIcon/>
        <div className="w-full max-w-lg"> 
          {/* Move InsurerTable here */}
          <InsurerTable coverageLimit={parseInt(coverage)} />
          {/* <div className="flex-grow overflow-y-auto">
            <InsurerTable coverageLimit={parseInt(coverage)} />
          </div> */}
  
          {/* Confirm & Pay Button */}
          <div className="mt-4  bottom-0 p-4 mt-auto">
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Confirm & Pay
            </button>
          </div>
        </div>
      </div>
    //     <div className="min-h-screen p-4 bg-gray-100 flex flex-col items-center">
    //     <InsuranceIcon/>
    //     <div className="w-full max-w-lg">
    //       {/* <h2 className="text-xl font-bold mb-4">New Quotes</h2>
    //       <p>This is the New Quotes page. It contains information about the new quotes for the selected policy.</p> */}
          
    //       {/* Move InsurerTable here */}
    //       <div className="flex-grow overflow-y-auto">
    //         <InsurerTable coverageLimit={parseInt(coverage)} />
    //       </div>
  
    //       {/* Confirm & Pay Button */}
    //       <div className="mt-4 sticky bottom-0 bg-gray-100 p-4">
    //         <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
    //           Confirm & Pay
    //         </button>
    //       </div>
    //     </div>
    //   </div>
        // <div>
        //     <InsuranceIcon/>
        //     <p>New Quotes</p>
        // </div>

    )
}

export default NewQuotes;