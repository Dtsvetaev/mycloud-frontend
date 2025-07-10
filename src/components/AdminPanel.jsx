// src/components/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('access');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (err) {
      setError('Ошибка загрузки пользователей');
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError('Ошибка при удалении пользователя');
    }
  };

  const toggleAdmin = async (id, isStaff) => {
    try {
      await axios.post(
        `/api/users/${id}/set-admin-status/`,
        { is_staff: !isStaff, is_superuser: false },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUsers();
    } catch (err) {
      setError('Ошибка при обновлении прав администратора');
    }
  };

  return (
    <div>
      <h2>Администрирование пользователей</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Логин</th>
            <th>Email</th>
            <th>Админ</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.is_staff ? 'Да' : 'Нет'}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Удалить</button>
                <button onClick={() => toggleAdmin(user.id, user.is_staff)}>
                  {user.is_staff ? 'Снять права' : 'Сделать админом'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
