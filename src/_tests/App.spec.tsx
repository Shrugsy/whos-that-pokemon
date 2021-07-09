import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';

import { setUpStore } from '@/store';
import { createHandlers } from '@/_mocks/handlers';

import App from '../App';

import { mswTestServer } from './__setup__';

function setUpApp() {
  mswTestServer.use(...createHandlers());
  const store = setUpStore();

  render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
}

test('Just passes', () => {
  expect(true).toBeTruthy();
});
