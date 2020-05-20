import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider, DefaultTheme } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';
import { usePersistedState } from './util/hooks';

import poison from './styles/themes/poison';
import ground from './styles/themes/ground';
import ghost from './styles/themes/ghost';
import flying from './styles/themes/flying';

import { AppContextProvider } from './context';
import { StoreContextProvider } from './context/store';

import GlobalStyle from './styles/global';
import Header from './components/Header';

import { store, persistor } from './store';
import Routes from './routes';

const App: React.FC = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', poison);

  const changeStore = (type: string) => {
    switch (type) {
      case 'poison':
        setTheme(poison);
        break;
      case 'flying':
        setTheme(flying);
        break;
      case 'ghost':
        setTheme(ghost);
        break;
      case 'ground':
        setTheme(ground);
        break;
      default:
        setTheme(poison);
    }
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppContextProvider>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <StoreContextProvider>
                <Header changeStore={changeStore} />
                <Routes />
              </StoreContextProvider>
            </BrowserRouter>
          </ThemeProvider>
        </AppContextProvider>
      </PersistGate>
      <GlobalStyle />
      <ToastContainer autoClose={3000} />
    </Provider>
  );
};
export default App;
