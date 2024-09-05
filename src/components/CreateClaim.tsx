import React, { useState } from 'react';

// Insurers data
const insurers = [
    { id: 'I123', coverage: 100000 },
    { id: 'I456', coverage: 100000 },
  ];

// Initial claims with pre-defined colors
const initialClaims = [
  { id: 'C1', amount: 5000, color: 'bg-blue-500' },  // First claim with blue color
  { id: 'C2', amount: 50000, color: 'bg-purple-500' }, // Second claim with red color
];

// Colors for the new claims
const claimColors = ['bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];

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
      const nextColor = claimColors[claims.length % claimColors.length]; // Pick the next color for the new claim
      const newClaimEntry = {
        id: `C${claims.length + 1}`,
        amount: newClaim,
        color: nextColor, // Assign a new color from the list
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
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-100">
      {/* Policy and Insurer List */}
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-6 text-center">
        <p className="text-sm font-bold mb-2">Policy Id: I12345</p>
        <p className="text-sm">
          Insurers: {insurers.map((insurer) => (
            <span key={insurer.id}>
              <a href="#" className="text-blue-500">{insurer.id}</a>
            </span>
          ))}
        </p>
      </div>

      {/* Submit New Claim */}
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
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
          Submit
        </button>
      </div>

      {/* Insurance Claims Indicator */}
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between text-sm mb-2">
          <div className="font-bold">Insurers</div>
          <div className="font-bold">Claims</div>
        </div>

        {/* Claims Indicator */}
        <div className="relative flex items-center h-10 bg-gray-300 rounded-md overflow-hidden mb-2">
          {/* Render all claims first */}
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
          <p>Coverage remaining: ${remainingCoverage.toLocaleString()}</p>
          <p>Coverage Used: ${usedCoverage.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ClaimSubmitPage;

// import React, { useState } from 'react';

// const insurers = [
//   { id: 'I123', coverage: 2000000 }, // Total coverage is 2 million
// ];

// const initialClaims = [
//   { id: 'C1', amount: 5000, color: 'bg-blue-500' },  // First claim of 5000
//   { id: 'C2', amount: 1000000, color: 'bg-red-500' }, // Second claim of 1 million
// ];

// const ClaimSubmitPage: React.FC = () => {
//   const [claims, setClaims] = useState(initialClaims);
//   const [newClaim, setNewClaim] = useState<number>(0);
//   const totalCoverage = insurers[0].coverage;
//   const usedCoverage = claims.reduce((acc, claim) => acc + claim.amount, 0);
//   const remainingCoverage = totalCoverage - usedCoverage;

//   // Handle new claim submission
//   const handleNewClaimSubmit = () => {
//     if (newClaim > 0 && newClaim <= remainingCoverage) {
//       const newClaimEntry = {
//         id: `C${claims.length + 1}`,
//         amount: newClaim,
//         color: 'bg-green-500', // New claims are indicated in green by default
//       };
//       setClaims([...claims, newClaimEntry]);
//       setNewClaim(0);
//     } else {
//       alert(`Invalid claim amount. Remaining coverage is $${remainingCoverage.toLocaleString()}`);
//     }
//   };

//   // Calculate width of each claim relative to total coverage
//   const calculateWidth = (amount: number) => {
//     return (amount / totalCoverage) * 100;
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-100">
//       {/* Policy and Insurer List */}
//       <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-6 text-center">
//         <p className="text-sm font-bold mb-2">Policy Id: I12345</p>
//         <p className="text-sm">
//           Insurers: {insurers.map((insurer) => (
//             <span key={insurer.id}>
//               <a href="#" className="text-blue-500">{insurer.id}</a>
//             </span>
//           ))}
//         </p>
//       </div>

//       {/* Submit New Claim */}
//       <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
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
//       </div>

//       {/* Insurance Claims Indicator */}
//       <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
//         <div className="flex justify-between text-sm mb-2">
//           <div className="font-bold">Insurers</div>
//           <div className="font-bold">Claims</div>
//         </div>

//         {/* Claims Indicator */}
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
//           <p>Coverage remaining: ${remainingCoverage.toLocaleString()}</p>
//           <p>Coverage Used: ${usedCoverage.toLocaleString()}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClaimSubmitPage;


// import React, { useState } from 'react';

// const insurers = [
//   { id: 'I123', coverage: 2000000 }, // 2 million total coverage
// ];

// const initialClaims = [
//   { id: 'C1', amount: 5000, color: 'bg-blue-500' }, // First claim of 5000
//   { id: 'C2', amount: 1000000, color: 'bg-red-500' }, // Second claim of 1 million
// ];

// const ClaimSubmitPage: React.FC = () => {
//   const [claims, setClaims] = useState(initialClaims);
//   const [newClaim, setNewClaim] = useState<number>(0);
//   const totalCoverage = insurers[0].coverage;
//   const usedCoverage = claims.reduce((acc, claim) => acc + claim.amount, 0);
//   const remainingCoverage = totalCoverage - usedCoverage;

//   // Handle new claim submission
//   const handleNewClaimSubmit = () => {
//     if (newClaim > 0 && newClaim <= remainingCoverage) {
//       const newClaimEntry = {
//         id: `C${claims.length + 1}`,
//         amount: newClaim,
//         color: `bg-green-${claims.length * 100 + 200}`, // Assign new claim color dynamically
//       };
//       setClaims([...claims, newClaimEntry]);
//       setNewClaim(0);
//     } else {
//       alert(`Invalid claim amount. Remaining coverage is $${remainingCoverage.toLocaleString()}`);
//     }
//   };

//   // Calculate width of claims relative to total coverage
//   const calculateWidth = (amount: number) => {
//     return (amount / totalCoverage) * 100;
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-100">
//       {/* Policy and Insurer List */}
//       <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-6 text-center">
//         <p className="text-sm font-bold mb-2">Policy Id: I12345</p>
//         <p className="text-sm">
//           Insurers: {insurers.map((insurer) => (
//             <span key={insurer.id}>
//               <a href="#" className="text-blue-500">{insurer.id}</a>
//             </span>
//           ))}
//         </p>
//       </div>

//       {/* Submit New Claim */}
//       <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
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
//       </div>

//       {/* Insurance Claims Indicator */}
//       <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
//         <div className="flex justify-between text-sm mb-2">
//           <div className="font-bold">Insurers</div>
//           <div className="font-bold">Claims</div>
//         </div>

//         {/* Claims Indicator */}
//         <div className="relative flex items-center h-10 bg-gray-300 rounded-md overflow-hidden mb-2">
//           {/* Claims on the scale */}
//           {claims.map((claim) => (
//             <div
//               key={claim.id}
//               className={`${claim.color} h-full border-r border-white`}
//               style={{ width: `${calculateWidth(claim.amount)}%` }}
//             />
//           ))}

//           {/* Remaining coverage */}
//           {remainingCoverage > 0 && (
//             <div
//               className="bg-green-500 h-full"
//               style={{ width: `${calculateWidth(remainingCoverage)}%` }}
//             />
//           )}
//         </div>

//         {/* Coverage Information */}
//         <div className="flex justify-between text-sm font-bold">
//           <p>Coverage remaining: ${remainingCoverage.toLocaleString()}</p>
//           <p>Coverage Used: ${usedCoverage.toLocaleString()}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClaimSubmitPage;

// import React, { useState } from 'react';

// const insurers = [
//   { id: 'I123', coverage: 2000000 }, // 2 million total coverage
// ];

// const initialClaims = [
//   { id: 'C1', amount: 5000, color: 'bg-blue-500' }, // First claim of 5000
//   { id: 'C2', amount: 1000000, color: 'bg-red-500' }, // Second claim of 1 million
// ];

// const ClaimSubmitPage: React.FC = () => {
//   const [claims, setClaims] = useState(initialClaims);
//   const [newClaim, setNewClaim] = useState<number>(0);
//   const totalCoverage = insurers[0].coverage;
//   const usedCoverage = claims.reduce((acc, claim) => acc + claim.amount, 0);
//   const remainingCoverage = totalCoverage - usedCoverage;

//   // Handle new claim submission
//   const handleNewClaimSubmit = () => {
//     if (newClaim > 0 && newClaim <= remainingCoverage) {
//       const newClaimEntry = {
//         id: `C${claims.length + 1}`,
//         amount: newClaim,
//         color: 'bg-green-500', // New claims are indicated in green
//       };
//       setClaims([...claims, newClaimEntry]);
//       setNewClaim(0);
//     } else {
//       alert(`Invalid claim amount. Remaining coverage is $${remainingCoverage.toLocaleString()}`);
//     }
//   };

//   // Calculate width of claims relative to total coverage
//   const calculateWidth = (amount: number) => {
//     return (amount / totalCoverage) * 100;
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-100">
//       {/* Policy and Insurer List */}
//       <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-6 text-center">
//         <p className="text-sm font-bold mb-2">Policy Id: I12345</p>
//         <p className="text-sm">
//           Insurers: {insurers.map((insurer) => (
//             <span key={insurer.id}>
//               <a href="#" className="text-blue-500">{insurer.id}</a>
//             </span>
//           ))}
//         </p>
//       </div>

//       {/* Submit New Claim */}
//       <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
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
//       </div>

//       {/* Insurance Claims Indicator */}
//       <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
//         <div className="flex justify-between text-sm mb-2">
//           <div className="font-bold">Insurers</div>
//           <div className="font-bold">Claims</div>
//         </div>

//         {/* Claims Indicator */}
//         <div className="relative flex items-center h-10 bg-gray-300 rounded-md overflow-hidden mb-2">
//           {/* Claims on the scale */}
//           {claims.map((claim) => (
//             <div
//               key={claim.id}
//               className={`${claim.color} h-full border-r border-white`}
//               style={{ width: `${calculateWidth(claim.amount)}%`, minWidth: '10px' }}
//             />
//           ))}

//           {/* Remaining coverage */}
//           {remainingCoverage > 0 && (
//             <div
//               className="bg-green-500 h-full"
//               style={{ width: `${calculateWidth(remainingCoverage)}%` }}
//             />
//           )}
//         </div>

//         {/* Coverage Information */}
//         <div className="flex justify-between text-sm font-bold">
//           <p>Coverage remaining: ${remainingCoverage.toLocaleString()}</p>
//           <p>Coverage Used: ${usedCoverage.toLocaleString()}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClaimSubmitPage;

// import React, { useState } from 'react';

// const insurers = [
//   { id: 'I123', coverage: 100000 },
//   { id: 'I456', coverage: 100000 },
// ];

// const initialClaims = [
//   { id: 'C1', amount: 60000, insurerId: 'I123', color: 'bg-blue-500' },
//   { id: 'C2', amount: 50000, insurerId: 'I456', color: 'bg-red-500' },
// ];

// const ClaimSubmitPage: React.FC = () => {
//   const [claims, setClaims] = useState(initialClaims);
//   const [newClaim, setNewClaim] = useState<number>(0);

//   // Calculate total coverage, used coverage, and remaining coverage
//   const totalCoverage = insurers.reduce((acc, insurer) => acc + insurer.coverage, 0);
//   const usedCoverage = claims.reduce((acc, claim) => acc + claim.amount, 0);
//   const remainingCoverage = totalCoverage - usedCoverage;

//   // Handle new claim submission
//   const handleNewClaimSubmit = () => {
//     if (newClaim > 0 && newClaim <= remainingCoverage) {
//       const newClaimEntry = {
//         id: `C${claims.length + 1}`,
//         amount: newClaim,
//         insurerId: insurers[0].id, // For simplicity, assign to first insurer (update logic as needed)
//         color: 'bg-green-500', // New claims are indicated in green
//       };
//       setClaims([...claims, newClaimEntry]);
//       setNewClaim(0);
//     } else {
//       alert(`Invalid claim amount. Remaining coverage is $${remainingCoverage}`);
//     }
//   };

//   // Calculate width of claims relative to insurer's coverage
//   const calculateWidth = (amount: number, insurerCoverage: number) => {
//     return (amount / insurerCoverage) * 100;
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-100">
//       {/* Policy and Insurer List */}
//       <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-6 text-center">
//         <p className="text-sm font-bold mb-2">Policy Id: I12345</p>
//         <p className="text-sm">
//           Insurers: {insurers.map((insurer, index) => (
//             <span key={insurer.id}>
//               <a href="#" className="text-blue-500">{insurer.id}</a>
//               {index < insurers.length - 1 ? ' > ' : ''}
//             </span>
//           ))}
//         </p>
//       </div>

//       {/* Submit New Claim */}
//       <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
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
//       </div>

//       {/* Insurance Claims Indicator */}
//       <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
//         <div className="flex justify-between text-sm mb-2">
//           <div className="font-bold">Insurers</div>
//           <div className="font-bold">Claims</div>
//         </div>

//         <div className="relative flex items-center h-10 bg-gray-300 rounded-md overflow-hidden mb-2">
//           {/* Insurer Policy Coverage Scale */}
//           <div className="absolute top-0 left-0 flex h-full w-full justify-between text-center text-xs text-black">
//             {insurers.map((insurer) => (
//               <div
//                 key={insurer.id}
//                 className="flex flex-col justify-center border-r border-gray-600"
//                 style={{ width: `${calculateWidth(insurer.coverage, totalCoverage)}%` }}
//               >
//                 <span>{insurer.id}</span>
//                 <span>(${insurer.coverage.toLocaleString()})</span>
//               </div>
//             ))}
//           </div>

//           {/* User Claims on the scale */}
//           <div className="absolute top-0 left-0 flex h-full">
//             {insurers.map((insurer) => (
//               <div key={insurer.id} className="relative h-full">
//                 {claims
//                   .filter((claim) => claim.insurerId === insurer.id)
//                   .map((claim) => (
//                     <div
//                       key={claim.id}
//                       className={`${claim.color} h-full`}
//                       style={{
//                         width: `${calculateWidth(claim.amount, insurer.coverage)}%`,
//                         minWidth: '10px', // Ensure a minimum visible width for small claims
//                       }}
//                     />
//                   ))}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Coverage Information */}
//         <div className="flex justify-between text-sm font-bold">
//           <p>Coverage remaining: ${remainingCoverage.toLocaleString()}</p>
//           <p>Coverage Used: ${usedCoverage.toLocaleString()}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClaimSubmitPage;

// import React, { useState } from 'react';

// const insurers = [
//   { id: 'I123', coverage: 100000 },
//   { id: 'I456', coverage: 100000 },
// ];

// const initialClaims = [
//   { id: 'C1', amount: 60000, color: 'bg-blue-500' },
//   { id: 'C2', amount: 50000, color: 'bg-red-500' },
// ];

// const ClaimSubmitPage: React.FC = () => {
//   const [claims, setClaims] = useState(initialClaims);
//   const [newClaim, setNewClaim] = useState<number>(0);
//   const totalCoverage = insurers.reduce((acc, insurer) => acc + insurer.coverage, 0);
//   const usedCoverage = claims.reduce((acc, claim) => acc + claim.amount, 0);
//   const remainingCoverage = totalCoverage - usedCoverage;

//   const handleNewClaimSubmit = () => {
//     if (newClaim > 0 && newClaim <= remainingCoverage) {
//       const newClaimEntry = {
//         id: `C${claims.length + 1}`,
//         amount: newClaim,
//         color: 'bg-green-500', // New claims are indicated in green
//       };
//       setClaims([...claims, newClaimEntry]);
//       setNewClaim(0);
//     } else {
//       alert(`Invalid claim amount. Remaining coverage is $${remainingCoverage}`);
//     }
//   };

//   const calculateWidth = (amount: number) => {
//     return (amount / totalCoverage) * 100;
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-100">
//       {/* Policy and Insurer List */}
//       <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-6 text-center">
//         <p className="text-sm font-bold mb-2">Policy Id: I12345</p>
//         <p className="text-sm">
//           Insurers: {insurers.map((insurer, index) => (
//             <span key={insurer.id}>
//               <a href="#" className="text-blue-500">{insurer.id}</a>
//               {index < insurers.length - 1 ? ' > ' : ''}
//             </span>
//           ))}
//         </p>
//       </div>

//       {/* Submit New Claim */}
//       <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
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
//       </div>

//       {/* Insurance Claims Indicator */}
//       <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
//         <div className="flex justify-between text-sm mb-2">
//           <div className="font-bold">Insurers</div>
//           <div className="font-bold">Claims</div>
//         </div>

//         <div className="relative flex items-center h-10 bg-gray-300 rounded-md overflow-hidden mb-2">
//           {/* Insurer Policy Coverage Scale */}
//           <div className="absolute top-0 left-0 flex h-full w-full justify-between text-center text-xs text-black">
//             {insurers.map((insurer) => (
//               <div
//                 key={insurer.id}
//                 className="flex flex-col justify-center border-r border-gray-600"
//                 style={{ width: `${calculateWidth(insurer.coverage)}%` }}
//               >
//                 <span>{insurer.id}</span>
//                 <span>(${insurer.coverage.toLocaleString()})</span>
//               </div>
//             ))}
//           </div>

//           {/* User Claims on the scale */}
//           <div className="absolute top-0 left-0 flex h-full">
//             {claims.map((claim) => (
//               <div
//                 key={claim.id}
//                 className={`${claim.color} h-full border-r border-white`}
//                 style={{ width: `${calculateWidth(claim.amount)}%` }}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Coverage Information */}
//         <div className="flex justify-between text-sm font-bold">
//           <p>Coverage remaining: ${remainingCoverage.toLocaleString()}</p>
//           <p>Coverage Used: ${usedCoverage.toLocaleString()}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClaimSubmitPage;

// import React, { useState } from 'react';
// import InsuranceIcon from './InsuranceIcon';

// const insurers = [
//   { id: 'I123', coverage: 100000 },
//   { id: 'I456', coverage: 100000 },
// ];

// const initialClaims = [
//   { id: 'C1', amount: 60000, color: 'bg-blue-500' },
//   { id: 'C2', amount: 50000, color: 'bg-red-500' },
// ];

// const ClaimSubmitPage: React.FC = () => {
//   const [claims, setClaims] = useState(initialClaims);
//   const [newClaim, setNewClaim] = useState<number>(0);
//   const totalCoverage = insurers.reduce((acc, insurer) => acc + insurer.coverage, 0);
//   const usedCoverage = claims.reduce((acc, claim) => acc + claim.amount, 0);
//   const remainingCoverage = totalCoverage - usedCoverage;

//   const handleNewClaimSubmit = () => {
//     if (newClaim > 0 && newClaim <= remainingCoverage) {
//       const newClaimEntry = {
//         id: `C${claims.length + 1}`,
//         amount: newClaim,
//         color: 'bg-green-500', // New claims are indicated in green
//       };
//       setClaims([...claims, newClaimEntry]);
//       setNewClaim(0);
//     } else {
//       alert(`Invalid claim amount. Remaining coverage is $${remainingCoverage}`);
//     }
//   };

//   return (
//     // <div className="min-h-screen flex flex-col justify-center items-center p-4">
//     //     <InsuranceIcon/>
//     //   {/* Policy and Insurer List */}
//     //   <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-4">
//     //     <p className="text-sm">
//     //       <strong>Policy Id:</strong> I12345
//     //     </p>
//     //     <p className="text-sm">
//     //       <strong>Insurers:</strong> {insurers.map((insurer, index) => (
//     //         <span key={insurer.id}>
//     //           <a href="#" className="text-blue-500">{insurer.id}</a>
//     //           {index < insurers.length - 1 ? ' > ' : ''}
//     //         </span>
//     //       ))}
//     //     </p>
//     //   </div>

//     //   {/* Submit New Claim */}
//     //   <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-4 flex items-center">
//     //     <p className="mr-4">Submit New Claim</p>
//     //     <input
//     //       type="number"
//     //       value={newClaim}
//     //       onChange={(e) => setNewClaim(parseInt(e.target.value))}
//     //       className="border p-2 rounded-md text-sm w-24 mr-2"
//     //       placeholder="$ Amount"
//     //     />
//     //     <button
//     //       onClick={handleNewClaimSubmit}
//     //       className="bg-blue-500 text-white py-2 px-4 rounded-md"
//     //     >
//     //       Submit
//     //     </button>
//     //   </div>

//     //   {/* Insurance Claims Indicator */}
//     //   <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-4">
//     //     <div className="flex justify-between text-sm mb-2">
//     //       <div>
//     //         <strong>Insurers</strong>
//     //       </div>
//     //       <div>
//     //         <strong>Claims</strong>
//     //       </div>
//     //     </div>

//     //     <div className="relative flex items-center h-10 bg-gray-300 rounded-md overflow-hidden mb-2">
//     //       <div className="absolute top-0 left-0 flex h-full">
//     //         {insurers.map((insurer, index) => (
//     //           <div
//     //             key={insurer.id}
//     //             className="relative h-full flex items-center"
//     //             style={{ width: `${(insurer.coverage / totalCoverage) * 100}%` }}
//     //           >
//     //             <p className="absolute left-0 right-0 text-xs text-center text-gray-800">
//     //               {insurer.id} (${insurer.coverage.toLocaleString()})
//     //             </p>
//     //           </div>
//     //         ))}
//     //       </div>

//     //       <div className="absolute top-0 right-0 h-full w-0.5 bg-black" />

//     //       <div className="absolute top-0 left-0 flex h-full">
//     //         {claims.map((claim, index) => (
//     //           <div
//     //             key={claim.id}
//     //             className={`${claim.color} h-full`}
//     //             style={{ width: `${(claim.amount / totalCoverage) * 100}%` }}
//     //           />
//     //         ))}
//     //       </div>
//     //     </div>

//     //     {/* Coverage Information */}
//     //     <div className="flex justify-between text-sm">
//     //       <p>Coverage remaining: ${remainingCoverage.toLocaleString()}</p>
//     //       <p>Coverage Used: ${usedCoverage.toLocaleString()}</p>
//     //     </div>
//     //   </div>
//     // </div>
//     <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-100">
//     {/* Policy and Insurer List */}
//     <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-6 text-center">
//       <p className="text-sm font-bold mb-2">Policy Id: I12345</p>
//       <p className="text-sm">
//         Insurers: {insurers.map((insurer, index) => (
//           <span key={insurer.id}>
//             <a href="#" className="text-blue-500">{insurer.id}</a>
//             {index < insurers.length - 1 ? ' > ' : ''}
//           </span>
//         ))}
//       </p>
//     </div>

//     {/* Submit New Claim */}
//     <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
//       <p className="text-sm font-bold">Submit New Claim</p>
//       <input
//         type="number"
//         value={newClaim}
//         onChange={(e) => setNewClaim(parseInt(e.target.value))}
//         className="border p-2 rounded-md text-sm w-20 text-center mr-4"
//         placeholder="$ Amount"
//       />
//       <button
//         onClick={handleNewClaimSubmit}
//         className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm"
//       >
//         Submit
//       </button>
//     </div>

//     {/* Insurance Claims Indicator */}
//     <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
//       <div className="flex justify-between text-sm mb-2">
//         <div className="font-bold">Insurers</div>
//         <div className="font-bold">Claims</div>
//       </div>

//       <div className="relative flex items-center h-10 bg-gray-300 rounded-md overflow-hidden mb-2">
//         <div className="absolute top-0 left-0 flex h-full w-full justify-between text-center text-xs text-black">
//           {insurers.map((insurer) => (
//             <div
//               key={insurer.id}
//               className="flex flex-col justify-center"
//               style={{ width: `${(insurer.coverage / totalCoverage) * 100}%` }}
//             >
//               <span>{insurer.id}</span>
//               <span>(${insurer.coverage.toLocaleString()})</span>
//             </div>
//           ))}
//         </div>

//         <div className="absolute top-0 left-0 flex h-full">
//           {claims.map((claim) => (
//             <div
//               key={claim.id}
//               className={`${claim.color} h-full`}
//               style={{ width: `${(claim.amount / totalCoverage) * 100}%` }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Coverage Information */}
//       <div className="flex justify-between text-sm font-bold">
//         <p>Coverage remaining: ${remainingCoverage.toLocaleString()}</p>
//         <p>Coverage Used: ${usedCoverage.toLocaleString()}</p>
//       </div>
//     </div>
//   </div>
//   );
// };

// export default ClaimSubmitPage;
