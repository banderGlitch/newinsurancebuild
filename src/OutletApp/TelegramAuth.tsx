import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TelegramLoginButton from '../TelegramLoginButton';
import InsuranceLogo from '../assets/insurance.png'
import litProtocolLogo from '../assets/litprotocol.png'; // Make sure to have this asset
import { type TelegramUser } from '../types';

interface EnvVariables {
  VITE_TELEGRAM_BOT_NAME: string;
}

interface LoginPageProps {
  handleTelegramResponse: (user: any) => void;
  validationError: string | null;
  telegramUser: TelegramUser | null; // Add this prop
}

const LoginPage: React.FC<LoginPageProps> = ({ handleTelegramResponse, validationError, telegramUser }) => {
  const { VITE_TELEGRAM_BOT_NAME = 'LitDevGuidesBot' } = import.meta.env as unknown as EnvVariables;
  const navigate = useNavigate();

  useEffect(() => {
    if (telegramUser) {
      navigate('/wallet'); // Navigate to wallet after successful login
    }
  }, [telegramUser, navigate]);

  return (
    <div className="bg-gray-100 flex flex-col justify-between items-center min-h-screen p-6">
      {/* Top Section with Logo */}
      <div className="w-full flex justify-center mt-8">
        <img src={InsuranceLogo} alt="Car Insurance Logo" className="w-16 h-16" />
      </div>

      {/* Heading Section */}
      <div className="text-center mt-4">
        <h2 className="text-3xl font-bold mb-2">Car Insurance DApp</h2>
      </div>

      {/* Middle Section with Telegram Login */}
      <div className="flex-grow flex flex-col justify-center items-center">
        <h3 className="text-xl font-semibold mb-4">Login with Telegram</h3>
        <TelegramLoginButton
          botName={VITE_TELEGRAM_BOT_NAME}
          dataOnauth={handleTelegramResponse}
          buttonSize="large"
        />
        {validationError && (
          <div className="error-message mt-4 text-red-500">
            <p>{validationError}</p>
          </div>
        )}
      </div>

      {/* Bottom Section with Powered by Lit Protocol */}
      <div className="w-full text-center mb-4">
        <p className="text-sm text-gray-500">Powered by</p>
        <img src={litProtocolLogo} alt="Lit Protocol Logo" className="w-16 h-6 mx-auto mt-2" />
      </div>
    </div>
  );
};

export default LoginPage;
// import React from 'react';
// import TelegramLoginButton from '../TelegramLoginButton';

// interface EnvVariables {
//   VITE_TELEGRAM_BOT_NAME: string;
// }

// interface LoginPageProps {
//   handleTelegramResponse: (user: any) => void;
//   validationError: string | null;
// }

// const LoginPage: React.FC<LoginPageProps> = ({ handleTelegramResponse, validationError }) => {
//   const { VITE_TELEGRAM_BOT_NAME = 'LitDevGuidesBot' } = import.meta.env as unknown as EnvVariables;

//   return (
//     <div className="bg-gray-100 flex justify-center items-center min-h-screen">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 text-center">
//         <h2 className="text-2xl font-bold mb-4">Authenticate with Telegram</h2>
//         <TelegramLoginButton
//           botName={VITE_TELEGRAM_BOT_NAME}
//           dataOnauth={handleTelegramResponse}
//           buttonSize="large"
//         />
//         {validationError && (
//           <div className="error-message">
//             <p>{validationError}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
