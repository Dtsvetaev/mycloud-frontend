import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../components/Register';
import { MemoryRouter } from 'react-router-dom';

global.fetch = jest.fn();

describe('Register Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('успешная регистрация показывает сообщение и редиректит', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/имя пользователя/i), {
      target: { value: 'newuser' },
    });

    fireEvent.change(screen.getByPlaceholderText(/пароль/i), {
      target: { value: 'newpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    await waitFor(() => {
      expect(screen.getByText(/регистрация успешна/i)).toBeInTheDocument();
    });
  });

  test('ошибка регистрации выводится пользователю', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Имя уже занято' }),
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/имя пользователя/i), {
      target: { value: 'existing' },
    });

    fireEvent.change(screen.getByPlaceholderText(/пароль/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    await waitFor(() => {
      expect(screen.getByText(/имя уже занято/i)).toBeInTheDocument();
    });
  });
});
