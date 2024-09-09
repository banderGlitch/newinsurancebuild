import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Wallet, User, Shield, LogOut } from 'lucide-react';

const TabNavigation: React.FC = () => {
  const location = useLocation();
  const isUserRouteActive = location.pathname.startsWith('/user');

  const navItems = [
    { to: '/', icon: Wallet, label: 'Wallet' },
    { to: '/user', icon: User, label: 'Insuree' },
    { to: '/insurer', icon: Shield, label: 'Insurer' },
    { to: '/logout', icon: LogOut, label: 'Logout' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 shadow-lg">
      <div className="flex justify-around items-center p-2">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center ${
                (item.to === '/user' && isUserRouteActive) || isActive
                  ? 'text-blue-500'
                  : 'text-gray-400 hover:text-gray-200'
              }`
            }
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
// import React from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import { FaWallet, FaUser, FaShieldAlt, FaSignOutAlt } from 'react-icons/fa';

// const TabNavigation: React.FC = () => {
//   const location = useLocation();
//   const isUserRouteActive = location.pathname.startsWith('/user');

//   return (
//     <div className="absolute bottom-[-4%] left-0 right-0 w-full flex justify-around bg-gray-800 shadow-md shadow-md">
//       <div className="flex justify-around p-2 w-full">
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             isActive ? 'flex flex-col items-center text-blue-500' : 'flex flex-col items-center text-gray-500'
//           }
//         >
//           <FaWallet size={24} />
//           <span className="text-sm">Wallet</span>
//         </NavLink>
//         <NavLink
//           to="/user"
//           className={isUserRouteActive ? 'flex flex-col items-center text-blue-500' : 'flex flex-col items-center text-gray-500'}
//         >
//           <FaUser size={24} />
//           <span className="text-sm">Insuree</span>
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