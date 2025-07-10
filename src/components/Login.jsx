import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTokens } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    setUsername('');
    setPassword('');
    setErrorMsg(null);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setTokens(data));
        navigate('/');
      } else {
        if (data.detail === 'No active account found with the given credentials') {
          setErrorMsg('Неверное имя пользователя или пароль');
        } else {
          setErrorMsg(data.detail || 'Ошибка авторизации');
        }
      }
    } catch (err) {
      setErrorMsg('Ошибка сети. Повторите позже.');
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;