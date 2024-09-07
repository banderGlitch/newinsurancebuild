import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { initLitClient } from "../_helpers/LitNodeClient";


interface WalletComponentProps {
  onWalletConnected: (walletAddress: string) => void; // This will be called once wallet is connected
}

const WalletComponent: React.FC<WalletComponentProps> = ({ onWalletConnected }) => {
  onWalletConnected
  console.log("onWalletConnect-------->", onWalletConnected)
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);
  const [litNodeClient, setLitNodeClient] = useState<any>(null); // LitNodeClient state

  useEffect(() => {
    console.log("LitNodeClient", litNodeClient)
  },[litNodeClient])

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address); // Set wallet address
        setWalletConnected(true);

        const balance = await provider.getBalance(address);
        const formattedBalance = ethers.utils.formatEther(balance);
        setWalletBalance(formattedBalance);

        // Initialize LitNodeClient using the helper function
        const litClient = await initLitClient(); 
        setLitNodeClient(litClient);

         // Perform any additional logic using Lit Protocol here
         console.log("LitNodeClient initialized and connected");



        // Call the onWalletConnected prop to notify parent component
        onWalletConnected(address);
      } else {
        alert("Please install MetaMask to connect your wallet.");
      }
    } catch (err) {
      console.error("Failed to connect wallet:", err);
    }
  };

  return (
    <div>
      {walletConnected ? (
        <div>
          <p>Wallet Address: {walletAddress}</p>
          <p>Balance: {walletBalance} ETH</p>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletComponent;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import InsuranceIcon from '../components/InsuranceIcon';

// interface WalletConnectPageProps {

//   telegramUser: string | null; // Get user's name from Telegram
//   setWalletStatus: (value:any) => void;
// }

// const WalletConnectPage: React.FC<WalletConnectPageProps> = ({ telegramUser , setWalletStatus }) => {
//   console.log("telegramUser", telegramUser)
// //   const [walletConnected, setWalletConnected] = useState(false);
// //   const [account, setAccount] = useState<string | null>(null);
//   const navigate = useNavigate();

//   // Check if MetaMask is installed
//   // const isMetaMaskInstalled = () => {
//   //   return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
//   // };

//   // Handle MetaMask wallet connection
//   const connectWallet = async () => 
//     setWalletStatus(true)
//     navigate('/');{
//     // if (isMetaMaskInstalled()) {
//     //   try {
//     //     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//     //     setAccount(accounts[0]);
//     //     setWalletConnected(true);
//     //   } catch (error) {
//     //     console.error('Failed to connect wallet:', error);
//     //   }
//     // } else {
//     //   alert('Please install MetaMask to connect your wallet.');
//     // }
//   };

// //   useEffect(() => {
// //     if (walletConnected && account) {
// //       navigate('/'); // Redirect to protected route after wallet connection
// //     }
// //   }, [walletConnected, account, navigate]);

//   return (
//     <div className="flex flex-col justify-between items-center min-h-screen p-6">
//       <InsuranceIcon/>
//       {/* Top Section with Welcome Message */}
//       <div className="w-full flex justify-center mt-20">
//         <h2 className="text-3xl font-bold">Welcome User</h2>
//       </div>
//       {/* Middle Section with Wallet Connect */}
//       <div className="flex-grow flex flex-col justify-center items-center">
//         <button
//           onClick={connectWallet}
//           className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600"
//         >
//           Connect Wallet
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WalletConnectPage;