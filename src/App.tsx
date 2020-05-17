import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { AppContextProvider } from './context';

import GlobalStyle from './styles/global';
import Header from './components/Header';

import store from './store';
import Routes from './routes';

const App: React.FC = () => (
  <>
    <Provider store={store}>
      <AppContextProvider>
        <Header />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AppContextProvider>
      <GlobalStyle />
      <ToastContainer autoClose={3000} />
    </Provider>
  </>
);

export default App;
