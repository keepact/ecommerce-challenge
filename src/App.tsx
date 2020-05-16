import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import GlobalStyle from './styles/global';
import Header from './components/Header';

import store from './store';
import Routes from './routes';

const App: React.FC = () => (
  <>
    <Provider store={store}>
      <Header />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyle />
    </Provider>
  </>
);

export default App;
