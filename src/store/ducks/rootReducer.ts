import { combineReducers } from 'redux';

import cart from './cart';
import pokemon from './pokemon';

export default combineReducers({
  cart,
  pokemon,
});
