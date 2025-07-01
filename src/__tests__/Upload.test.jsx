import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Upload from '../components/Upload';

global.fetch = jest.fn();

describe('Upload Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    global.alert = jest.fn();
    localStorage.setItem('access', 'test-token');
  });

  test('успешная загрузка файла вызывает alert', async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    render(<Upload />);

    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
    const fileInput = screen.getByTestId('file-input');

    Object.defineProperty(fileInput, 'files', {
      value: [file],
    });

    fireEvent.change(fileInput);
    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(alert).toHaveBeenCalledWith('Файл успешно загружен!');
    });
  });

  test('ошибка загрузки файла вызывает alert', async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    render(<Upload />);

    const file = new File(['fail'], 'fail.txt', { type: 'text/plain' });
    const fileInput = screen.getByTestId('file-input');

    Object.defineProperty(fileInput, 'files', {
      value: [file],
    });

    fireEvent.change(fileInput);
    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith('Ошибка загрузки файла');
    });
  });
});




