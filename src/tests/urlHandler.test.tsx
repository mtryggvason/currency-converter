import React from 'react';
import { render, screen } from '@testing-library/react';
import { URLHandler } from '../components/urlHandler';

test('renders Loading message', () => {
    const testHash = '#test'
  render(<URLHandler hash="test" />);
  expect(window.location.hash).toEqual(testHash)
});


