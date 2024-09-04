import React from 'react';
import InsuranceIcon from './InsuranceIcon';

const Wallet: React.FC = () => {
    const policies = ([
        { policyId: 'P123', userId: 'U123', premium: 3000, coverage: '100,000' },
        { policyId: 'P456', userId: 'P123', premium: 3000, coverage: '100,000' }
    ]);

    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center">
            {/* Insurance Icon in the top left */}
            <InsuranceIcon />

            {/* Welcome Message and User Name */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2">Welcome</h1>
            </div>
            <div className="w-full max-w-lg mx-auto">
                    <table className="table-auto w-full text-center border-collapse border border-gray-400">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-400 px-4 py-2">Policy Id</th>
                                <th className="border border-gray-400 px-4 py-2">User Id</th>
                                <th className="border border-gray-400 px-4 py-2">Premium</th>
                                <th className="border border-gray-400 px-4 py-2">Coverage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {policies.map((policy) => (
                                <tr key={policy.policyId}>
                                    <td className="border border-gray-400 px-4 py-2 text-blue-500">
                                        <a href="#">{policy.policyId}</a>
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">{policy.userId}</td>
                                    <td className="border border-gray-400 px-4 py-2">{policy.premium}</td>
                                    <td className="border border-gray-400 px-4 py-2">{policy.coverage}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
    );
};

export default Wallet;


// import React from 'react';
// import InsuranceIcon from './InsuranceIcon';

// const Wallet: React.FC = () => {
//     const userName = "Kartik Talwar"; // Static for now, dynamic later
//     const walletConnected = false; // Placeholder for wallet connection state
//     return (
//         <div className="relative min-h-screen flex flex-col justify-center items-center">
//             {/* Insurance Icon in the top left */}
//             <InsuranceIcon />

//             {/* Welcome Message and User Name */}
//             <div className="text-center">
//                 <h1 className="text-3xl font-bold mb-2">Welcome</h1>
//                 <p className="text-xl text-gray-700">{userName}</p>
//             </div>

//             {/* Connect Wallet Button */}
//             <div className="mt-4">
//                 {!walletConnected ? (
//                     <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
//                         Connect Wallet
//                     </button>
//                 ) : (
//                     <p className="text-lg text-gray-700">Balance: 0.00 ETH</p> // Placeholder for balance
//                 )}
//             </div>
//         </div>
//         // <div className="p-4">
//         //     <h2 className="text-2xl font-bold">Wallet</h2>
//         //     <p>Your wallet details go here.</p>
//         // </div>
//     );
// };

// export default Wallet;
