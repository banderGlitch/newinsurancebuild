import React, { useEffect } from "react";
import { ethers } from "ethers";
import { useSDK } from "@metamask/sdk-react"; // Updated hook from MetaMask SDK
import { initLitClient } from "../_helpers/LitNodeClient"; // Lit Protocol helper
import { useDispatch, useSelector } from "react-redux";
import { setChain } from "../_helpers/chainSlice";
import { setWalletConnected, setWalletAddress, setWalletBalance, setLitNodeClient ,setTokenName } from "../_helpers/walletSlice"; // Import Redux actions
import { RootState, AppDispatch } from "../redux/store"; // Import types

interface WalletComponentProps {
  onWalletConnected: (walletAddress: string) => void; // Callback to notify parent when wallet is connected
}

const WalletComponent: React.FC<WalletComponentProps> = ({ onWalletConnected }) => {
  const dispatch = useDispatch<AppDispatch>();
  

  // Use the latest MetaMask SDK hook
  const { sdk, connected, connecting, provider, chainId } = useSDK();




  // Access wallet state from Redux
  const { walletConnected, walletAddress, walletBalance, litNodeClient } = useSelector(
    (state: RootState) => state.wallet
  );

  // const {  chainName, chainToken } = useSelector((state: RootState) => state.chain);

  // MetaMask Wallet Connection and Lit Protocol initialization


  // const getChainToken = (chainId: number) => {
  //   console.log("chainId",chainId
  //   )
  //   switch (chainId) {
  //     case '0x1':
  //       return 'ETH';
  //     case '0x89':
  //       return 'MATIC';
  //     case 296 :
  //       return 'HBAR';
  //     default:
  //       return `Unknown Network (Chain ID: ${chainId})`;
  //   }
  // };

  const getChainToken = (chainId: string) => {
    switch (chainId) {
      case '0x13882':
        return 'MATIC';
      case '0x128':
        return 'HBAR';
      default:
        return `Unknown Network (Chain ID: ${chainId})`;
    }
  };

  useEffect(() => {
    connectWallet()
  },[chainId, walletAddress, sdk, connected, connecting, provider, chainId ])
  
  const connectWallet = async () => {
    try {
      if (sdk) {
        const accounts = await sdk.connect(); // Use the updated connect method
        const account = accounts?.[0]; // Get the first account
        console.log("account", accounts?.[0])
        console.log("account----->", account)
        dispatch(setWalletAddress(account)); // Set wallet address
        dispatch(setWalletConnected(true)); // Set connection state

        if (provider) {
          const ethersProvider = new ethers.providers.Web3Provider(provider as any); // Explicitly cast to 'any'
          console.log("ethersProviders", ethersProvider)
          const balance = await ethersProvider.getBalance(account); // Get wallet balance
          console.log("balane")
          const formattedBalance = ethers.utils.formatEther(balance); // Format balance
          dispatch(setWalletBalance(formattedBalance)); // Set balance

          const network = await ethersProvider.getNetwork();
          const chainId = network.chainId; 

          console.log("Chain ID----------->:", chainId); // Log chainId for debugging
          // const chainToken = getChainToken(chainId!)
          // console.log("ChainToken---------------->", chainToken)
          // console.log("chainToken", chainToken)

          // Dispatch chain information with chainId and token
          // dispatch(setChain({
          //   chainId,
          //   chainName: null,
          //   chainToken: null
          // }));
        } else {
          console.error("MetaMask provider is not available.");
        }

        // Initialize LitNodeClient using the helper function
        const litClient = await initLitClient();
        dispatch(setLitNodeClient(litClient));

        // Notify parent component that MetaMask wallet is connected
        onWalletConnected(account);
      } else {
        // alert("MetaMask SDK is not initialized.");
      }
    } catch (err) {
      console.error("Failed to connect wallet:", err);
    }
  };

  useEffect(()=> {
    console.log("walletBalance", walletBalance)
    dispatch(setTokenName(getChainToken(chainId!)))
  },[chainId])

  return (
    <div>
      {walletConnected ? (
        <div>
          <p>Wallet Address: {walletAddress}</p>
          <p>Balance: {walletBalance} {getChainToken(chainId!)}</p>
        </div>
      ) : (
        <div>
          <button
            onClick={connectWallet}
            className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600"
            disabled={connecting}
          >
            {connecting ? "Connecting..." : "Connect MetaMask"}
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletComponent;


// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { useSDK } from "@metamask/sdk-react"; // Updated hook from MetaMask SDK
// import { initLitClient } from "../_helpers/LitNodeClient"; // Lit Protocol helper
// import { signInWithGoogle, authenticateWithGoogle } from "../_helpers/litGoogleAuth"; // Google OAuth helpers

// interface WalletComponentProps {
//   onWalletConnected: (walletAddress: string) => void; // Callback to notify parent when wallet is connected
// }

// const WalletComponent: React.FC<WalletComponentProps> = ({ onWalletConnected }) => {
//   const [walletConnected, setWalletConnected] = useState(false);
//   const [walletAddress, setWalletAddress] = useState<string | null>(null);
//   const [walletBalance, setWalletBalance] = useState<string | null>(null);
//   const [litNodeClient, setLitNodeClient] = useState<any>(null); // LitNodeClient state

//   // Use the latest MetaMask SDK hook
//   const { sdk, connected, connecting, provider, chainId } = useSDK();

//   console.log("LitNodeClient", litNodeClient)
//   console.log("connected", connected)
//   console.log("chainId", chainId)

//   // MetaMask Wallet Connection and Lit Protocol initialization
//   const connectWallet = async () => {
//     try {
//       if (sdk) {
//         const accounts = await sdk.connect(); // Use the updated connect method
//         const account = accounts?.[0]; // Get the first account
//         setWalletAddress(account); // Set wallet address
//         setWalletConnected(true); // Set connection state

//         if (provider) {
//           const ethersProvider = new ethers.providers.Web3Provider(provider as any); // Explicitly cast to 'any' since it's guaranteed to be an ExternalProvider
//           const balance = await ethersProvider.getBalance(account); // Get wallet balance
//           const formattedBalance = ethers.utils.formatEther(balance); // Format balance
//           setWalletBalance(formattedBalance); // Set balance
//         } else {
//           console.error("MetaMask provider is not available.");
//         }

//         // Initialize LitNodeClient using the helper function
//         const litClient = await initLitClient();
//         setLitNodeClient(litClient);

//         // Notify parent component that MetaMask wallet is connected
//         onWalletConnected(account);
//       } else {
//         alert("MetaMask SDK is not initialized.");
//       }
//     } catch (err) {
//       console.error("Failed to connect wallet:", err);
//     }
//   };

//   // Google OAuth Connection via Lit Protocol
//   const connectGoogle = async () => {
//     // "http://localhost:3000/wallet-connect"

//     const redirectUri = 'http://localhost:3000/wallet-connect';

//     try {
//       // const redirectUri = window.location.href; // Redirect URI for Google OAuth
//       // console.log("redirectUri", redirectUri)
//       await signInWithGoogle(redirectUri); // Redirect user to Google sign-in page
//     } catch (error) {
//       console.error("Google sign-in failed:", error);
//     }
//   };

//   // Handle Google Authentication after the redirect
//   // const handleGoogleAuth = async () => {
//   //   try {
//   //     const redirectUri = window.location.href; // The same redirect URI
//   //     const authMethod = await authenticateWithGoogle(redirectUri); // Authenticate with Google

//   //     if (authMethod) {
//   //       console.log("Google Auth Method:", authMethod);

//   //       // Initialize LitNodeClient
//   //       const litClient = await initLitClient();
//   //       setLitNodeClient(litClient);

//   //       // Notify parent component that Google authentication was successful
//   //       onWalletConnected("google-auth"); // Use "google-auth" to indicate Google authentication
//   //     }
//   //   } catch (error) {
//   //     console.error("Failed to authenticate with Google:", error);
//   //   }
//   // };

//   const handleGoogleAuth = async () => {
//     try {
//       // const redirectUri = window.location.href;
//       const redirectUri = 'http://localhost:3000/wallet-connect';
//       const pkp = await authenticateWithGoogle(redirectUri); // Authenticate with Google and fetch PKP

//       if (pkp) {
//         console.log("Google Auth PKP:", pkp);

//         // The PKP contains an Ethereum address-like format that we can use
//         const ethAddress = pkp.ethAddress;
//         setWalletAddress(ethAddress); // Set wallet address as the PKP Ethereum address
//         setWalletConnected(true);

//         const litClient = await initLitClient();
//         setLitNodeClient(litClient);

//         // Notify parent component that Google authentication was successful with a wallet address
//         onWalletConnected(ethAddress);
//       }
//     } catch (error) {
//       console.error("Failed to authenticate with Google:", error);
//     }
//   };


//   // Call this function after the page reloads from the Google OAuth redirect
//   useEffect(() => {
//     handleGoogleAuth();
//   }, []);

//   return (
//     <div>
//       {walletConnected ? (
//         <div>
//           <p>Wallet Address: {walletAddress}</p>
//           <p>Balance: {walletBalance} ETH</p>
//         </div>
//       ) : (
//         <div>
//           <button
//             onClick={connectWallet}
//             className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600"
//             disabled={connecting}
//           >
//             {connecting ? "Connecting..." : "Connect MetaMask"}
//           </button>
//           <button
//             onClick={connectGoogle}
//             className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 mt-4"
//           >
//             Sign in with Google
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WalletComponent;


// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { useMetaMask } from "@metamask/sdk-react"; // MetaMask SDK hook
// import { initLitClient } from "../_helpers/LitNodeClient"; // Lit Protocol helper
// import { signInWithGoogle, authenticateWithGoogle } from "../_helpers/litGoogleAuth"; // Google OAuth helpers

// interface WalletComponentProps {
//   onWalletConnected: (walletAddress: string) => void; // Callback to notify parent when wallet is connected
// }

// const WalletComponent: React.FC<WalletComponentProps> = ({ onWalletConnected }) => {
//   const [walletConnected, setWalletConnected] = useState(false); // State to track if the wallet is connected
//   const [walletAddress, setWalletAddress] = useState<string | null>(null); // State to store wallet address
//   const [walletBalance, setWalletBalance] = useState<string | null>(null); // State to store wallet balance
//   const [litNodeClient, setLitNodeClient] = useState<any>(null); // LitNodeClient state

//   const { provider, connect } = useMetaMask(); // MetaMask SDK hook

//   // MetaMask Wallet Connection and Lit Protocol initialization
//   const connectWallet = async () => {
//     try {
//       // Check if MetaMask provider exists
//       if (provider) {
//         const ethersProvider = new ethers.providers.Web3Provider(provider); // Use MetaMask SDK provider
//         await connect(); // Connect to MetaMask using the SDK
//         const signer = ethersProvider.getSigner();
//         const address = await signer.getAddress(); // Get the wallet address
//         setWalletAddress(address); // Save wallet address
//         setWalletConnected(true); // Update connection state

//         const balance = await ethersProvider.getBalance(address); // Get wallet balance
//         const formattedBalance = ethers.utils.formatEther(balance); // Format the balance in ETH
//         setWalletBalance(formattedBalance); // Save wallet balance

//         // Initialize LitNodeClient using the helper function
//         const litClient = await initLitClient();
//         setLitNodeClient(litClient);

//         // Notify parent component that MetaMask wallet is connected
//         onWalletConnected(address);
//       } else {
//         alert("Please install MetaMask to connect your wallet.");
//       }
//     } catch (error) {
//       console.error("Failed to connect MetaMask:", error);
//     }
//   };

//   // Google OAuth Connection via Lit Protocol
//   const connectGoogle = async () => {
//     try {
//       const redirectUri = window.location.href; // Redirect URI for Google OAuth
//       await signInWithGoogle(redirectUri); // Redirect user to Google sign-in page
//     } catch (error) {
//       console.error("Google sign-in failed:", error);
//     }
//   };

//   // Handle Google Authentication after the redirect
//   const handleGoogleAuth = async () => {
//     try {
//       const redirectUri = window.location.href; // The same redirect URI
//       const authMethod = await authenticateWithGoogle(redirectUri); // Authenticate with Google

//       if (authMethod) {
//         console.log("Google Auth Method:", authMethod);

//         // Initialize LitNodeClient
//         const litClient = await initLitClient();
//         setLitNodeClient(litClient);

//         // Notify parent component that Google authentication was successful
//         onWalletConnected("google-auth"); // Use "google-auth" to indicate Google authentication
//       }
//     } catch (error) {
//       console.error("Failed to authenticate with Google:", error);
//     }
//   };

//   // Call this function after the page reloads from the Google OAuth redirect
//   useEffect(() => {
//     handleGoogleAuth();
//   }, []);

//   return (
//     <div>
//       {walletConnected ? (
//         <div>
//           <p>Wallet Address: {walletAddress}</p>
//           <p>Balance: {walletBalance} ETH</p>
//         </div>
//       ) : (
//         <div>
//           <button
//             onClick={connectWallet}
//             className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600"
//           >
//             Connect MetaMask
//           </button>
//           <button
//             onClick={connectGoogle}
//             className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 mt-4"
//           >
//             Sign in with Google
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WalletComponent;

// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { useMetaMask } from "@metamask/sdk-react";
// import { initLitClient } from "../_helpers/LitNodeClient";
// import { signInWithGoogle, authenticateWithGoogle } from "../_helpers/litGoogleAuth";


// interface WalletComponentProps {
//   onWalletConnected: (walletAddress: string) => void; // This will be called once wallet is connected
// }

// const WalletComponent: React.FC<WalletComponentProps> = ({ onWalletConnected }) => {
//   onWalletConnected
//   console.log("onWalletConnect-------->", onWalletConnected)
//   const [walletConnected, setWalletConnected] = useState(false);
//   const [walletAddress, setWalletAddress] = useState<string | null>(null);
//   const [walletBalance, setWalletBalance] = useState<string | null>(null);
//   const [litNodeClient, setLitNodeClient] = useState<any>(null); // LitNodeClient state

//   useEffect(() => {
//     console.log("LitNodeClient", litNodeClient)
//   }, [litNodeClient])

//   const connectWallet = async () => {
//     try {
//       if (window.ethereum) {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         await provider.send("eth_requestAccounts", []);
//         const signer = provider.getSigner();
//         const address = await signer.getAddress();
//         setWalletAddress(address); // Set wallet address
//         setWalletConnected(true);

//         const balance = await provider.getBalance(address);
//         const formattedBalance = ethers.utils.formatEther(balance);
//         setWalletBalance(formattedBalance);

//         // Initialize LitNodeClient using the helper function
//         const litClient = await initLitClient();
//         setLitNodeClient(litClient);

//         // Perform any additional logic using Lit Protocol here
//         console.log("LitNodeClient initialized and connected");



//         // Call the onWalletConnected prop to notify parent component
//         onWalletConnected(address);
//       } else {
//         alert("Please install MetaMask to connect your wallet.");
//       }
//     } catch (err) {
//       console.error("Failed to connect wallet:", err);
//     }
//   };

//   // Google OAuth Connection via Lit Protocol
//   const connectGoogle = async () => {
//     try {
//       const redirectUri = window.location.href; // Redirect URI for Google OAuth
//       await signInWithGoogle(redirectUri); // Redirect user to Google sign-in
//     } catch (error) {
//       console.error("Google sign-in failed:", error);
//     }
//   };

//   // Handle Google Authentication after redirect
//   const handleGoogleAuth = async () => {
//     try {
//       const redirectUri = window.location.href; // The same redirect URI
//       const authMethod = await authenticateWithGoogle(redirectUri); // Authenticate with Google

//       if (authMethod) {
//         console.log("Google Auth Method:", authMethod);

//         // Initialize LitNodeClient
//         const litClient = await initLitClient();
//         setLitNodeClient(litClient);

//         // Notify parent component that Google authentication was successful
//         onWalletConnected("google-auth"); // We pass `null` here because no wallet is involved
//       }
//     } catch (error) {
//       console.error("Failed to authenticate with Google:", error);
//     }
//   };

//   // Call this after the page reloads from the Google OAuth redirect
//   useEffect(() => {
//     handleGoogleAuth();
//   }, []);


//   return (
//     <div>
//       {walletConnected ? (
//         <div>
//           <p>Wallet Address: {walletAddress}</p>
//           <p>Balance: {walletBalance} ETH</p>
//         </div>
//       ) : (
//         <div>
//           <button
//             onClick={connectWallet}
//             className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600"
//           >
//             Connect Wallet
//           </button>
//           <button
//             onClick={connectGoogle}
//             className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 mt-4"
//           >
//             Sign in with Google
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WalletComponent;


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