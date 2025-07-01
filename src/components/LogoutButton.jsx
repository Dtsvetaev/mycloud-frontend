import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        marginLeft: '1rem',
        float: 'right',
        backgroundColor: '#222',
        color: 'white',
        border: '1px solid white',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '4px'
      }}
    >
      Выйти
    </button>
  );
};

export default LogoutButton;
