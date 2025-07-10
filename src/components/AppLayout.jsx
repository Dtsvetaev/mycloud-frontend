import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const AppLayout = ({ children }) => {
  const isAuth = !!localStorage.getItem('access');

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <nav style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Link to="/">📁 Мои файлы</Link>
          {!isAuth && (
            <>
              <Link to="/login" style={{ marginLeft: '1em' }}>🔐 Вход</Link>
              <Link to="/register" style={{ marginLeft: '1em' }}>📝 Регистрация</Link>
            </>
          )}
        </div>
        {isAuth && <LogoutButton />}
      </nav>
      <hr />
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
