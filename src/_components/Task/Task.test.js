import React from 'react';
import { render } from '@testing-library/react';
import Task from './Task';

test('Renderiza la app', () => {
  const { getByText } = render(<Task />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
