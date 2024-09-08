import React from 'react';
import { useNavigate } from 'react-router-dom';
import InsuranceIcon from '../components/InsuranceIcon';
import WalletComponent from './WalletConnectAuth'; // Import the WalletComponent for wallet connection

interface WalletConnectPageProps {
  telegramUser: string | null;
  setWalletStatus: (value: any) => void;
}

const WalletConnectPage: React.FC<WalletConnectPageProps> = ({ telegramUser, setWalletStatus }) => {
  const navigate = useNavigate();

  const onWalletConnected = (walletAddress: string) => {
    console.log("walletAddress", walletAddress)
    setWalletStatus(true); // Update wallet status
    navigate('/'); // Redirect to home page
  };
  
//   useEffect(() => {
//     console.log("console was called!!")
//     onWalletConnected("asdasdasdasd")
//   },[telegramUser])

  return (
    <div className="flex flex-col justify-between items-center min-h-screen p-6">
      <InsuranceIcon />
      <div className="w-full flex justify-center mt-20">
        <h2 className="text-3xl font-bold">
          {telegramUser ? `Welcome ${telegramUser}` : 'Welcome User'}
        </h2>
      </div>
      <div className="flex-grow flex flex-col justify-center items-center">
        <WalletComponent onWalletConnected={onWalletConnected} />
      </div>
    </div>
  );
};

export default WalletConnectPage;
