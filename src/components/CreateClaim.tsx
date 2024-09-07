import React, { useState } from 'react';
import InsuranceIcon from './InsuranceIcon';

// Insurers data
const insurers = [
  { id: 'I123', coverage: 100000 },
  { id: 'I456', coverage: 100000 },
];

// Initial claims with fixed red color for existing claims
const initialClaims = [
  { id: 'C1', amount: 5000, color: 'bg-red-500' },  // Existing claim 1 with red color
  { id: 'C2', amount: 50000, color: 'bg-red-500' }, // Existing claim 2 with red color
];

const ClaimSubmitPage: React.FC = () => {
  const [claims, setClaims] = useState(initialClaims); // Stores the list of claims
  const [newClaim, setNewClaim] = useState<number>(0); // The value of the new claim

  // Calculate total coverage and used coverage
  const totalCoverage = insurers.reduce((acc, insurer) => acc + insurer.coverage, 0);
  const usedCoverage = claims.reduce((acc, claim) => acc + claim.amount, 0);
  const remainingCoverage = totalCoverage - usedCoverage;

  // Handle the new claim submission
  const handleNewClaimSubmit = () => {
    if (newClaim > 0 && newClaim <= remainingCoverage) {
      const newClaimEntry = {
        id: `C${claims.length + 1}`,
        amount: newClaim,
        color: 'bg-gray-500', // New claims are assigned grey color
      };
      setClaims([...claims, newClaimEntry]); // Add the new claim to the list
      setNewClaim(0); // Reset the claim input field
    } else {
      alert(`Invalid claim amount. Remaining coverage is $${remainingCoverage.toLocaleString()}`);
    }
  };

  // Calculate width of each claim relative to total coverage
  const calculateWidth = (amount: number) => {
    return (amount / totalCoverage) * 100;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <InsuranceIcon />

      {/* Insurance Claims Indicator */}
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between text-sm mb-2">
          <div className="font-bold">Insurers</div>
        </div>

        {/* Overlapping Insurers' Coverage Bar */}
        <div className="relative h-6 bg-gray-200 rounded-t-md mb-2">
          {insurers.map((insurer) => (
            <div
              key={insurer.id}
              className="absolute top-0 h-full bg-blue-300 opacity-70 flex items-center justify-center text-xs"
              style={{
                width: `${calculateWidth(insurer.coverage)}%`,
                left: `${(insurers.findIndex(i => i.id === insurer.id) * 100) / insurers.length}%`,
              }}
            >
              <span>{insurer.id} (${insurer.coverage.toLocaleString()})</span>
            </div>
          ))}

          {/* Divider lines between insurers */}
          {insurers.map((insurer, index) => (
            <div
              key={insurer.id + '-line'}
              className="absolute top-0 h-full w-0.5 bg-blue-500"
              style={{
                left: `${(index * 100) / insurers.length}%`,
              }}
            />
          ))}
        </div>

        {/* Claims Indicator */}
        <div className="text-sm mb-2 flex">
          <div className="font-bold">Claims</div>
        </div>
        <div className="relative flex items-center h-10 bg-gray-300 rounded-md overflow-hidden mb-2">
          {/* Render all claims */}
          {claims.map((claim) => (
            <div
              key={claim.id}
              className={`${claim.color} h-full border-r border-white`}
              style={{ width: `${calculateWidth(claim.amount)}%` }}
            />
          ))}

          {/* Remaining coverage in green */}
          {remainingCoverage > 0 && (
            <div
              className="bg-green-500 h-full"
              style={{ width: `${calculateWidth(remainingCoverage)}%` }}
            />
          )}
        </div>

        {/* Coverage Information */}
        <div className="flex justify-between text-sm font-bold">
          <p>Coverage Used: {usedCoverage.toLocaleString()}</p>
          <p>Coverage remaining: {remainingCoverage.toLocaleString()}</p>
        </div>
      </div>

      {/* Submit New Claim */}
      <div className="w-full mt-10 max-w-md bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
        <p className="text-sm font-bold">Submit New Claim</p>
        <input
          type="number"
          value={newClaim}
          onChange={(e) => setNewClaim(parseInt(e.target.value))}
          className="border p-2 rounded-md text-sm w-20 text-center mr-4"
          placeholder="$ Amount"
        />
        <button
          onClick={handleNewClaimSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ClaimSubmitPage;
// import React, { useState } from 'react';
// import InsuranceIcon from './InsuranceIcon';

// // Insurers data
// const insurers = [
//     { id: 'I123', coverage: 100000 },
//     { id: 'I456', coverage: 100000 },
//   ];

// // Initial claims with pre-defined colors
// const initialClaims = [
//   { id: 'C1', amount: 5000, color: 'bg-blue-500' },  // First claim with blue color
//   { id: 'C2', amount: 50000, color: 'bg-purple-500' }, // Second claim with red color
// ];

// // Colors for the new claims
// const claimColors = ['bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];

// const ClaimSubmitPage: React.FC = () => {
//   const [claims, setClaims] = useState(initialClaims); // Stores the list of claims
//   const [newClaim, setNewClaim] = useState<number>(0); // The value of the new claim

//   // Calculate total coverage and used coverage
//   const totalCoverage = insurers.reduce((acc, insurer) => acc + insurer.coverage, 0);
//   const usedCoverage = claims.reduce((acc, claim) => acc + claim.amount, 0);
//   const remainingCoverage = totalCoverage - usedCoverage;

//   // Handle the new claim submission
//   const handleNewClaimSubmit = () => {
//     if (newClaim > 0 && newClaim <= remainingCoverage) {
//       const nextColor = claimColors[claims.length % claimColors.length]; // Pick the next color for the new claim
//       const newClaimEntry = {
//         id: `C${claims.length + 1}`,
//         amount: newClaim,
//         color: nextColor, // Assign a new color from the list
//       };
//       setClaims([...claims, newClaimEntry]); // Add the new claim to the list
//       setNewClaim(0); // Reset the claim input field
//     } else {
//       alert(`Invalid claim amount. Remaining coverage is $${remainingCoverage.toLocaleString()}`);
//     }
//   };

//   // Calculate width of each claim relative to total coverage
//   const calculateWidth = (amount: number) => {
//     return (amount / totalCoverage) * 100;
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center p-4">
//         <InsuranceIcon/>
//       {/* Policy and Insurer List */}
//       {/* <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-6 text-center">
//         <p className="text-sm font-bold mb-2">Policy Id: I12345</p>
//         <p className="text-sm">
//         Insurers: {insurers.map((insurer, index) => (
//             <span key={insurer.id}>
//               <a href="#" className="text-blue-500">{insurer.id}</a>
//               {index < insurers.length - 1 ? ' > ' : ''}
//             </span>
//           ))}
//         </p>
//       </div> */}

//       {/* Submit New Claim */}
//       {/* <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
//         <p className="text-sm font-bold">Submit New Claim</p>
//         <input
//           type="number"
//           value={newClaim}
//           onChange={(e) => setNewClaim(parseInt(e.target.value))}
//           className="border p-2 rounded-md text-sm w-20 text-center mr-4"
//           placeholder="$ Amount"
//         />
//         <button
//           onClick={handleNewClaimSubmit}
//           className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm"
//         >
//           Submit
//         </button>
//       </div> */}

//       {/* Insurance Claims Indicator */}
//       <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
//         <div className="flex justify-between text-sm mb-2">
//           <div className="font-bold">Insurers</div>
//           {/* <div className="font-bold">Claims</div> */}
//         </div>
//         <div className="relative h-6 bg-gray-200 rounded-t-md mb-2">
//           {insurers.map((insurer) => (
//             <div
//               key={insurer.id}
//               className="absolute top-0 h-full bg-blue-300 opacity-70 flex items-center justify-center text-xs"
//               style={{
//                 width: `${calculateWidth(insurer.coverage)}%`,
//                 left: `${(insurers.findIndex(i => i.id === insurer.id) * 100) / insurers.length}%`,
//               }}
//             >
//               <span>{insurer.id} (${insurer.coverage.toLocaleString()})</span>
//             </div>
//           ))}
//             {/* Overlapping Insurers' Coverage Bar */}
//         <div className="relative h-6 bg-gray-200 rounded-t-md mb-2">
//           {insurers.map((insurer) => (
//             <div
//               key={insurer.id}
//               className="absolute top-0 h-full bg-blue-300 opacity-70 flex items-center justify-center text-xs"
//               style={{
//                 width: `${calculateWidth(insurer.coverage)}%`,
//                 left: `${(insurers.findIndex(i => i.id === insurer.id) * 100) / insurers.length}%`,
//               }}
//             >
//               <span>{insurer.id} ({insurer.coverage.toLocaleString()})</span>
//             </div>
//           ))}

//           {/* Divider lines between insurers */}
//           {insurers.map((insurer, index) => (
//             <div
//               key={insurer.id + '-line'}
//               className="absolute top-0 h-full w-0.5 bg-blue-500"
//               style={{
//                 left: `${(index * 100) / insurers.length}%`,
//               }}
//             />
//           ))}
//         </div>
//         </div>
//         {/* Claims Indicator */}
//         <div className='text-sm mb-2 flex'>
//         <div className="font-bold">Claims</div>
//         </div>
//         <div className="relative flex items-center h-10 bg-gray-300 rounded-md overflow-hidden mb-2">
//           {/* Render all claims first */}
//           {claims.map((claim) => (
//             <div
//               key={claim.id}
//               className={`${claim.color} h-full border-r border-white`}
//               style={{ width: `${calculateWidth(claim.amount)}%` }}
//             />
//           ))}

//           {/* Remaining coverage in green */}
//           {remainingCoverage > 0 && (
//             <div
//               className="bg-green-500 h-full"
//               style={{ width: `${calculateWidth(remainingCoverage)}%` }}
//             />
//           )}
//         </div>

//         {/* Coverage Information */}
//         <div className="flex justify-between text-sm font-bold">
//           <p>Coverage Used: {usedCoverage.toLocaleString()}</p>
//           <p>Coverage remaining: {remainingCoverage.toLocaleString()}</p>
//         </div>
//       </div>
//       <div className="w-full mt-10 max-w-md bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
//         <p className="text-sm font-bold">Submit New Claim</p>
//         <input
//           type="number"
//           value={newClaim}
//           onChange={(e) => setNewClaim(parseInt(e.target.value))}
//           className="border p-2 rounded-md text-sm w-20 text-center mr-4"
//           placeholder="$ Amount"
//         />
//         <button
//           onClick={handleNewClaimSubmit}
//           className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm"
//         >
//           Confirm
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ClaimSubmitPage;
