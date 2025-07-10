import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

const Navigation = () => {
  const { access, user } = useSelector((state) => state.auth);
  const isAuth = !!access;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav style={{ marginBottom: '1rem' }}>
      <Link to="/">Файлы</Link>
      {user?.is_staff && (
        <Link to="/admin" style={{ marginLeft: '1rem' }}>Админка</Link>
      )}
      {isAuth ? (
        <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>
          Выйти
        </button>
      ) : (
        <>
          <Link to="/login" style={{ marginLeft: '1rem' }}>Войти</Link>
          <Link to="/register" style={{ marginLeft: '1rem' }}>Регистрация</Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;