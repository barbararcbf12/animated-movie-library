import React from 'react';
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App';

test('<App />', () => {
  const URL = window.location.href
  const { getByTestId } = render(
    <MemoryRouter>
        <App />
    </MemoryRouter>
)
  expect(getByTestId('logo').src).toBe(`${URL}logo_mml.svg`)
})
