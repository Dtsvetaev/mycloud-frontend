import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../store';
import Upload from '../components/Upload';

describe('Upload Component', () => {
  test('отображает кнопку загрузки', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Upload />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button', { name: /загрузить/i })).toBeInTheDocument();
  });
});
