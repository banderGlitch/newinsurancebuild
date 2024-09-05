import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaWallet, FaUser, FaShieldAlt, FaSignOutAlt } from 'react-icons/fa'; 

const TabNavigation: React.FC = () => {
  const location = useLocation();
  const isUserRouteActive = location.pathname.startsWith('/user');

  return (
    <div className="absolute bottom-[-4%] left-0 right-0 w-full flex justify-around bg-gray-800 shadow-md shadow-md">
      <div className="flex justify-around p-2 w-full">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'flex flex-col items-center text-blue-500' : 'flex flex-col items-center text-gray-500'
          }
        >
          <FaWallet size={24} />
          <span className="text-sm">Wallet</span>
        </NavLink>
        <NavLink
          to="/user"
          className={isUserRouteActive ? 'flex flex-col items-center text-blue-500' : 'flex flex-col items-center text-gray-500'}
        >
          <FaUser size={24} />
          <span className="text-sm">Insuree</span>
        </NavLink>
        <NavLink
          to="/insurer"
          className={({ isActive }) =>
            isActive ? 'flex flex-col items-center text-blue-500' : 'flex flex-col items-center text-gray-500'
          }
        >
          <FaShieldAlt size={24} />
          <span className="text-sm">Insurer</span>
        </NavLink>
        <NavLink
          to="/logout"
          className={({ isActive }) =>
            isActive ? 'flex flex-col items-center text-red-500' : 'flex flex-col items-center text-gray-500'
          }
        >
          <FaSignOutAlt size={24} />
          <span className="text-sm">Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default TabNavigation;