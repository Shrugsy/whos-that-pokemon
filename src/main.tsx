import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { StylesProvider } from '@material-ui/core';

// import { worker } from '@/_mocks/browser';

import { store } from '@/store';

import { GlobalStyler } from './GlobalStyler';
import App from './App';

async function run() {
  // await worker.start();
  ReactDOM.render(
    <StrictMode>
      <StylesProvider injectFirst>
        <Provider store={store}>
          <GlobalStyler />
          <App />
        </Provider>
      </StylesProvider>
    </StrictMode>,
    document.getElementById('root')
  );
}

run();
