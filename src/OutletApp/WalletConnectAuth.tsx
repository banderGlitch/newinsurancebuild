import React from 'react';
import { useNavigate } from 'react-router-dom';
import InsuranceIcon from '../components/InsuranceIcon';

interface WalletConnectPageProps {

  telegramUser: string | null; // Get user's name from Telegram
  setWalletStatus: (value:any) => void;
}

const WalletConnectPage: React.FC<WalletConnectPageProps> = ({ telegramUser , setWalletStatus }) => {
  console.log("telegramUser", telegramUser)
//   const [walletConnected, setWalletConnected] = useState(false);
//   const [account, setAccount] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if MetaMask is installed
  // const isMetaMaskInstalled = () => {
  //   return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
  // };

  // Handle MetaMask wallet connection
  const connectWallet = async () => 
    setWalletStatus(true)
    navigate('/');{
    // if (isMetaMaskInstalled()) {
    //   try {
    //     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    //     setAccount(accounts[0]);
    //     setWalletConnected(true);
    //   } catch (error) {
    //     console.error('Failed to connect wallet:', error);
    //   }
    // } else {
    //   alert('Please install MetaMask to connect your wallet.');
    // }
  };

//   useEffect(() => {
//     if (walletConnected && account) {
//       navigate('/'); // Redirect to protected route after wallet connection
//     }
//   }, [walletConnected, account, navigate]);

  return (
    <div className="flex flex-col justify-between items-center min-h-screen p-6">
      <InsuranceIcon/>
      {/* Top Section with Welcome Message */}
      <div className="w-full flex justify-center mt-20">
        <h2 className="text-3xl font-bold">Welcome User</h2>
      </div>
      {/* Middle Section with Wallet Connect */}
      <div className="flex-grow flex flex-col justify-center items-center">
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default WalletConnectPage;