import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';

import { FilterContextProvider } from './context/filter';
import { StoreContext } from './context/store';

import GlobalStyle from './styles/global';
import Header from './components/Header';

import { store, persistor } from './store';
import Routes from './routes';

const App: React.FC = () => {
  const { store: storeTheme } = useContext(StoreContext);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <FilterContextProvider>
          <ThemeProvider theme={storeTheme}>
            <BrowserRouter>
              <Header />
              <Routes />
            </BrowserRouter>
          </ThemeProvider>
        </FilterContextProvider>
      </PersistGate>
      <GlobalStyle />
      <ToastContainer autoClose={3000} />
    </Provider>
  );
};
export default App;
