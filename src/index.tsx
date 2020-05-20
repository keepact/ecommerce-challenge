import React from 'react';
import ReactDOM from 'react-dom';
import { StoreContextProvider } from './context/store';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
