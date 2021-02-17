import React from 'react';
import { render, screen } from '@testing-library/react';

import App from '../App';
import { act } from 'react-dom/test-utils';

test('renders Loading message', () => {
  render(<App />);
  const loadingElement = screen.queryAllByText(/Loading/i);  
  expect(loadingElement.length).toEqual(1)
});

test('renders loading not rendered when data is fetched', async () => {
  const mockData = {
    fx: [{}]
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData)
    })
  );
  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<App  />);
  });
;

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
  const loadingElement = screen.queryAllByText(/Loading/i);
  expect(loadingElement.length).toEqual(0)
});

test('renders error message when fetch fails', async () => {
  const mockData = {
    fx: [{}]
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.reject({})
    })
  );
  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<App  />);
  });
;

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
  const loadingElement = screen.queryAllByText(/bananas/i);
  expect(loadingElement.length).toEqual(1)
});



