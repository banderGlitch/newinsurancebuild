import React from 'react';
import { FaWallet, FaUser, FaShieldAlt, FaSignOutAlt } from 'react-icons/fa';

const TabNavigation: React.FC = () => {
  return (
    <div className="fixed bottom-0 w-full bg-[#2a2b2e] shadow-md">
      <div className="flex justify-around p-2">
        {/* Wallet Tab */}
        <div className="flex flex-col items-center text-gray-500">
          <FaWallet size={24} />
          <span className="text-sm">Wallet</span>
        </div>
        
        {/* User Tab */}
        <div className="flex flex-col items-center text-gray-500">
          <FaUser size={24} />
          <span className="text-sm">User</span>
        </div>
        
        {/* Insurer Tab */}
        <div className="flex flex-col items-center text-gray-500">
          <FaShieldAlt size={24} />
          <span className="text-sm">Insurer</span>
        </div>
        
        {/* Logout Tab */}
        <div className="flex flex-col items-center text-gray-500">
          <FaSignOutAlt size={24} />
          <span className="text-sm">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { FaWallet, FaUser, FaShieldAlt, FaSignOutAlt } from 'react-icons/fa'; 

// const TabNavigation: React.FC = () => {
//   return (
//     <div className="fixed bottom-0 w-full bg-white shadow-md">
//       <div className="flex justify-around p-2">
//         <NavLink
//           to="/wallet"
//           className={({ isActive }) =>
//             isActive ? 'flex flex-col items-center text-blue-500' : 'flex flex-col items-center text-gray-500'
//           }
//         >
//           <FaWallet size={24} />
//           <span className="text-sm">Wallet</span>
//         </NavLink>
//         <NavLink
//           to="/user"
//           className={({ isActive }) =>
//             isActive ? 'flex flex-col items-center text-blue-500' : 'flex flex-col items-center text-gray-500'
//           }
//         >
//           <FaUser size={24} />
//           <span className="text-sm">User</span>
//         </NavLink>
//         <NavLink
//           to="/insurer"
//           className={({ isActive }) =>
//             isActive ? 'flex flex-col items-center text-blue-500' : 'flex flex-col items-center text-gray-500'
//           }
//         >
//           <FaShieldAlt size={24} />
//           <span className="text-sm">Insurer</span>
//         </NavLink>
//         <NavLink
//           to="/logout"
//           className={({ isActive }) =>
//             isActive ? 'flex flex-col items-center text-red-500' : 'flex flex-col items-center text-gray-500'
//           }
//         >
//           <FaSignOutAlt size={24} />
//           <span className="text-sm">Logout</span>
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default TabNavigation;