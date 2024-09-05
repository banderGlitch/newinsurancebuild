import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './OutletApp/TelegramAuth';
import PrivateRoute from './_helpers/PrivateRoute';
import { type TelegramUser } from './types';
import TabNavigation from './components/TabNavigation';
import Wallet from './components/Wallet';
import User from './components/User';
import Insurer from './components/Insurer';
import Logout from './components/Logout';
import WalletConnectPage from './OutletApp/WalletConnectAuth';
import NewPolicy from './components/NewPolicy';
import { Outlet } from 'react-router-dom';
import NewQuotes from './MainApp/NewPolicyComp/NewQuotesComp';
import ConfirmAndPay from './MainApp/NewPolicyComp/ConfirmAndPay';


function App() {
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [walletOk, setWalletStatus] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);



  const handleTelegramResponse = async (user: TelegramUser) => {
    if (user && typeof user === 'object') {
      setTelegramUser(user);

      // Add your Telegram validation logic here
      const isValid = true; // Replace with actual validation logic
      const isRecent = true; // Replace with actual time check

      if (!isValid || !isRecent) {
        setValidationError(
          !isValid
            ? 'Failed to validate Telegram user info. Please try again.'
            : 'Authentication has expired. Please log in again.'
        );
      } else {
        setValidationError(null);
      }
    } else {
      setValidationError('Invalid user data received. Please try again.');
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width threshold as needed
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  return (
    // <Router>
    //   <Routes>
    //     <Route
    //       path="/login"
    //       element={
    //         <LoginPage
    //           handleTelegramResponse={handleTelegramResponse}
    //           validationError={validationError}
    //           telegramUser={telegramUser}
    //         />
    //       }
    //     />
    //     <Route
    //       path="/wallet-connect"
    //       element={
    //         <WalletConnectPage
    //           telegramUser={telegramUser?.first_name || 'User'}
    //           setWalletStatus={setWalletStatus}
    //         />
    //       }
    //     />
    //     {/* Nested Routes under /user */}
    //     <Route path="/user" element={<UserLayout />}>
    //       <Route index element={<User />} />
    //       <Route path="newpolicy" element={<NewPolicyLayout />}>
    //         <Route index element={<NewPolicy />} />
    //         <Route path="newquotes" element={<NewQuotes />} />
    //         <Route path="newquotes/confirm&pay" element={<ConfirmAndPay />} />
    //       </Route>
    //     </Route>
    //     <Route path="/insurer" element={<Insurer />} />
    //     <Route path="/logout" element={<Logout />} />
    //     <Route path="/" element={<Wallet />} />
    //   </Routes>
    //   <TabNavigation />
    // </Router>
    isMobile && (
      <Router>
        <Routes>
          {/* Public route for Telegram login */}
          <Route
            path="/login"
            element={
              <LoginPage
                handleTelegramResponse={handleTelegramResponse}
                validationError={validationError}
                telegramUser={telegramUser}
              />
            }
          />
          <Route
            path="/wallet-connect"
            element={
              <WalletConnectPage
                telegramUser={telegramUser?.first_name || 'User'}
                setWalletStatus={setWalletStatus}
              />
            }
          />

          {/* Protected route for main app */}
          <Route element={<PrivateRoute telegramUser={telegramUser} />}>
            <Route path="/user" element={<UserLayout />}>
              <Route index element={<User />} />
              <Route path="newpolicy" element={<NewPolicyLayout />}>
                <Route index element={<NewPolicy />} />
                <Route path="newquotes" element={<NewQuotes />} />
                 <Route path="newquotes/confirm&pay" element={<ConfirmAndPay />} />
              </Route>
            </Route>
            <Route path="/insurer" element={<Insurer />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Wallet />} />
          </Route>
        </Routes>
        {telegramUser && walletOk && <TabNavigation />}
      </Router>
    )
  )
}

const UserLayout: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const NewPolicyLayout: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const ConfirmPay: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};



export default App;

