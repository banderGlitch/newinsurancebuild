import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout logic here
    navigate('/login'); // Redirect to login page after logout
  }, [navigate]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Logging out...</h2>
    </div>
  );
};

export default Logout;