import React, { useState, useEffect } from 'react';
import { connectWallet, getCurrentAccount } from '../src/services/metamask';

interface WalletConnectProps {
  onConnect: (provider: any) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect }) => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    const account = await getCurrentAccount();
    if (account) {
      setAccount(account);
      onConnect(account);
    }
  };

  const handleConnect = async () => {
    const accounts = await connectWallet();
    if (accounts && accounts.length > 0) {
      setAccount(accounts[0]);
      onConnect(accounts[0]);
    }
  };

  if (account) {
    return null;
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Connect to MetaMask</h2>
        <button
          onClick={handleConnect}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Connect MetaMask
        </button>
      </div>
    </div>
  );
};

export default WalletConnect;
// import React, { useState, useEffect } from 'react';
// import { ethers } from 'ethers';

// interface WalletConnectProps {
//   onConnect: (provider: ethers.providers.Web3Provider) => void;
// }

// const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect }) => {
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     checkConnection();
//   }, []);

//   const checkConnection = async () => {
//     if (window.ethereum) {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const accounts = await provider.listAccounts();
//       if (accounts.length > 0) {
//         setIsConnected(true);
//         onConnect(provider);
//       }
//     }
//   };

//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         await provider.send("eth_requestAccounts", []);
//         setIsConnected(true);
//         onConnect(provider);
//       } catch (error) {
//         console.error("Failed to connect wallet:", error);
//       }
//     } else {
//       alert("Please install MetaMask to use this feature.");
//     }
//   };

//   if (isConnected) {
//     return null;
//   }

//   return (
//     <div className="bg-gray-100 flex justify-center items-center min-h-screen">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 text-center">
//         <h2 className="text-2xl font-bold mb-4">Connect to MetaMask</h2>
//         <button
//           onClick={connectWallet}
//           className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
//         >
//           Connect MetaMask
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WalletConnect;