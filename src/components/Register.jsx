import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Регистрация успешна! Перенаправление...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        let translated = '';

        if (data?.password?.[0]?.includes('Ensure this field has at least 8 characters')) {
          translated = 'Пароль должен содержать минимум 8 символов';
        } else if (data?.username?.[0]?.includes('Enter a valid username')) {
          translated = 'Имя пользователя может содержать только буквы, цифры и символы @/./+/-/_';
        } else {
          translated =
            data.username?.[0] ||
            data.password?.[0] ||
            data.detail ||
            data.error ||
            'Ошибка регистрации';
        }

        setError(translated);
      }
    } catch (err) {
      setError('Ошибка сети. Повторите попытку позже.');
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Register;