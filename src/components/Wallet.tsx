import React from 'react';
import { Wallet as WalletIcon, User, DollarSign, Shield } from 'lucide-react';

const Wallet: React.FC = () => {
    const policies = [
        { policyId: 'P123', userId: 'U123', premium: 3000, coverage: '100,000' },
        { policyId: 'P456', userId: 'P123', premium: 3000, coverage: '100,000' }
    ];

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="max-w-3xl mx-auto">
                <header className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-500 text-white p-2 rounded-full">
                            <WalletIcon size={24} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">My Wallet</h1>
                    </div>
                </header>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                    <div className="p-6">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Welcome</h2>
                        <p className="text-center text-gray-600">Here's an overview of your insurance policies</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6">
                        <h3 className="text-xl font-semibold mb-4">Your Policies</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy Id</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Id</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coverage</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {policies.map((policy) => (
                                        <tr key={policy.policyId} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <Shield className="h-10 w-10 text-blue-500" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-blue-600">{policy.policyId}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <User className="h-5 w-5 text-gray-400 mr-2" />
                                                    <div className="text-sm text-gray-900">{policy.userId}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                                                    <div className="text-sm text-gray-900">{policy.premium}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{policy.coverage}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
// import React from 'react';
// import InsuranceIcon from './InsuranceIcon';

// const Wallet: React.FC = () => {
//     const policies = ([
//         { policyId: 'P123', userId: 'U123', premium: 3000, coverage: '100,000' },
//         { policyId: 'P456', userId: 'P123', premium: 3000, coverage: '100,000' }
//     ]);

//     return (
//         <div className="relative min-h-screen flex flex-col justify-center items-center">
//             {/* Insurance Icon in the top left */}
//             <InsuranceIcon />

//             {/* Welcome Message and User Name */}
//             <div className="text-center mb-6">
//                 <h1 className="text-3xl font-bold mb-2">Welcome</h1>
//             </div>
//             <div className="w-full max-w-lg mx-auto">
//                     <table className="table-auto w-full text-center border-collapse border border-gray-400">
//                         <thead>
//                             <tr className="bg-gray-100">
//                                 <th className="border border-gray-400 px-4 py-2">Policy Id</th>
//                                 <th className="border border-gray-400 px-4 py-2">User Id</th>
//                                 <th className="border border-gray-400 px-4 py-2">Premium</th>
//                                 <th className="border border-gray-400 px-4 py-2">Coverage</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {policies.map((policy) => (
//                                 <tr key={policy.policyId}>
//                                     <td className="border border-gray-400 px-4 py-2 text-blue-500">
//                                         <a href="#">{policy.policyId}</a>
//                                     </td>
//                                     <td className="border border-gray-400 px-4 py-2">{policy.userId}</td>
//                                     <td className="border border-gray-400 px-4 py-2">{policy.premium}</td>
//                                     <td className="border border-gray-400 px-4 py-2">{policy.coverage}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//         </div>
//     );
// };

// export default Wallet;


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
