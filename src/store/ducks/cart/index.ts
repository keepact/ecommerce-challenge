import produce, { Draft } from 'immer';
import { Reducer } from 'redux';

import { CartTypes, CartState } from './types';

const INITIAL_STATE: CartState = {
  data: [],
  error: false,
  loading: false,
};

const reducer: Reducer<CartState> = (state = INITIAL_STATE, action) => {
  return produce<CartState>(state, (draft: Draft<CartState>) => {
    switch (action.type) {
      case CartTypes.RESET: {
        draft.data = [];
        draft.loading = false;
        draft.error = false;
        break;
      }
      case CartTypes.ADD_SUCCESS: {
        const { product } = action;
        draft.data.push(product);
        break;
      }
      case CartTypes.REMOVE: {
        const pokemonIndex = draft.data.findIndex(p => p.name === action.name);
        if (pokemonIndex >= 0) {
          draft.data.splice(pokemonIndex, 1);
        }
        break;
      }
      case CartTypes.UPDATE_AMOUNT_SUCCESS: {
        const pokemonIndex = draft.data.findIndex(p => p.name === action.name);

        if (pokemonIndex >= 0) {
          draft.data[pokemonIndex].amount = Number(action.amount);
        }
        break;
      }
      default:
        return state;
    }
  });
};

export default reducer;
