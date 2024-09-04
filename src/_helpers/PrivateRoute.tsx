import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { type TelegramUser } from '../types';

interface PrivateRouteProps {
  telegramUser: TelegramUser | null;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ telegramUser }) => {
  return telegramUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;