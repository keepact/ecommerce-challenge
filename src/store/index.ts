import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { CartState } from './ducks/cart/types';
import { PokemonState } from './ducks/pokemon/types';

import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

export interface ApplicationState {
  cart: CartState;
  pokemon: PokemonState;
}

const persistConfig = {
  key: 'B2W',
  storage,
  whitelist: ['cart', 'pokemon'],
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: Store<ApplicationState> = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { persistor, store };
