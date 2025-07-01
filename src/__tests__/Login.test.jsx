import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../components/Login';

global.fetch = jest.fn();

describe('Login Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    window.localStorage.clear();
  });

  test('отображает поля и кнопку', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/имя пользователя/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/пароль/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /войти/i })).toBeInTheDocument();
  });

  test('успешный вход вызывает fetch и сохраняет токены', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ access: 'token123', refresh: 'ref456' }),
    });

    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/имя пользователя/i), { target: { value: 'user1' } });
    fireEvent.change(screen.getByPlaceholderText(/пароль/i), { target: { value: 'pass1' } });
    fireEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/token/', expect.anything());
      expect(localStorage.getItem('access')).toBe('token123');
      expect(localStorage.getItem('refresh')).toBe('ref456');
    });
  });

  test('ошибка авторизации вызывает alert', async () => {
    window.alert = jest.fn();

    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ detail: 'No active account' }),
    });

    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/имя пользователя/i), { target: { value: 'wrong' } });
    fireEvent.change(screen.getByPlaceholderText(/пароль/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Ошибка авторизации!');
    });
  });
});
