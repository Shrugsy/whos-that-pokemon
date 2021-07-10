import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { css, Global } from '@emotion/react';

import { worker } from '@/_mocks/browser';
import { store } from '@/store';

import App from './App';

import './index.css';

async function run() {
  await worker.start();
  ReactDOM.render(
    <StrictMode>
      <Provider store={store}>
        <Global
          styles={css`
            body {
              background-color: #282c34;
              color: white;
            }
          `}
        />
        <App />
      </Provider>
    </StrictMode>,
    document.getElementById('root')
  );
}

run();
