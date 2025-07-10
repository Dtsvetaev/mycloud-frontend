import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../store';
import Register from '../components/Register';

global.fetch = jest.fn();

describe('Register Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('успешная регистрация показывает сообщение', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/имя пользователя/i), {
      target: { value: 'newuser' },
    });

    fireEvent.change(screen.getByPlaceholderText(/пароль/i), {
      target: { value: 'newpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    expect(await screen.findByText(/регистрация успешна/i)).toBeInTheDocument();
  });

  test('ошибка регистрации отображается', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ username: ['Имя уже занято'] }),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/имя пользователя/i), {
      target: { value: 'existinguser' },
    });

    fireEvent.change(screen.getByPlaceholderText(/пароль/i), {
      target: { value: '12345678' },
    });

    fireEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    expect(await screen.findByText(/имя уже занято/i)).toBeInTheDocument();
  });
});
