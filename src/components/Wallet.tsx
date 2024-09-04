import React from 'react';
import InsuranceIcon from './InsuranceIcon';

const Wallet: React.FC = () => {
    const userName = "Kartik Talwar"; // Static for now, dynamic later
    const walletConnected = false; // Placeholder for wallet connection state
    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center">
            {/* Insurance Icon in the top left */}
            <InsuranceIcon />

            {/* Welcome Message and User Name */}
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Welcome</h1>
                <p className="text-xl text-gray-700">{userName}</p>
            </div>

            {/* Connect Wallet Button */}
            <div className="mt-4">
                {!walletConnected ? (
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                        Connect Wallet
                    </button>
                ) : (
                    <p className="text-lg text-gray-700">Balance: 0.00 ETH</p> // Placeholder for balance
                )}
            </div>
        </div>
        // <div className="p-4">
        //     <h2 className="text-2xl font-bold">Wallet</h2>
        //     <p>Your wallet details go here.</p>
        // </div>
    );
};

export default Wallet;
