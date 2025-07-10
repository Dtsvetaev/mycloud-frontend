import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
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