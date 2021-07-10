import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// import { worker } from '@/_mocks/browser';
import { store } from '@/store';

import { GlobalStyler } from './GlobalStyler';
import App from './App';

import './index.css';

async function run() {
  // await worker.start();
  ReactDOM.render(
    <StrictMode>
      <Provider store={store}>
        <GlobalStyler />
        <App />
      </Provider>
    </StrictMode>,
    document.getElementById('root')
  );
}

run();
