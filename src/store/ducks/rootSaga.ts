import { all } from 'redux-saga/effects';

import cart from './cart/sagas';
import pokemon from './pokemon/sagas';

export default function* rootSaga() {
  return yield all([cart, pokemon]);
}
