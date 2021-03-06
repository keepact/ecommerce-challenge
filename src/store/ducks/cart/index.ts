import produce, { Draft } from 'immer';
import { Reducer } from 'redux';
import { CartTypes, CartState, Cart } from './types';

const INITIAL_STATE: CartState = {
  data: [],
  error: false,
  loading: false,
};

type CartAction = {
  type: CartTypes;
  id?: number;
  amount?: number;
  payload: Cart;
};

export const reducer: Reducer<CartState, CartAction> = (
  state = INITIAL_STATE,
  action,
) => {
  return produce<CartState>(state, (draft: Draft<CartState>) => {
    switch (action.type) {
      case CartTypes.ADD_SUCCESS: {
        const { payload } = action;
        draft.data.push(payload);
        break;
      }
      case CartTypes.UPDATE_AMOUNT_SUCCESS: {
        const pokemonIndex = draft.data.findIndex(p => p.id === action.id);

        if (pokemonIndex >= 0) {
          draft.data[pokemonIndex].amount = Number(action.amount);
        }
        break;
      }
      case CartTypes.REMOVE: {
        const pokemonIndex = draft.data.findIndex(p => p.id === action.id);
        if (pokemonIndex >= 0) {
          draft.data.splice(pokemonIndex, 1);
        }
        break;
      }
      case CartTypes.RESET: {
        draft.data = [];
        draft.loading = false;
        draft.error = false;
        break;
      }
      default:
        return state;
    }
    return undefined;
  });
};

export default reducer;
