import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { AppContextProvider } from './context';

import GlobalStyle from './styles/global';
import Header from './components/Header';

import { store, persistor } from './store';
import Routes from './routes';

const App: React.FC = () => (
  <>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppContextProvider>
          <BrowserRouter>
            <Header />
            <Routes />
          </BrowserRouter>
        </AppContextProvider>
      </PersistGate>

      <GlobalStyle />
      <ToastContainer autoClose={3000} />
    </Provider>
  </>
);

export default App;
