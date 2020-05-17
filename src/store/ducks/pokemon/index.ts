import produce, { Draft } from 'immer';
import { Reducer } from 'redux';
import { PokemonTypes, PokemonState, Pokemon } from './types';

const INITIAL_STATE: PokemonState = {
  data: [],
  page: 1,
  perPage: 9,
  pageNumbers: [],
  error: false,
  loading: false,
};

type PokemonAction = {
  type: PokemonTypes;
  payload: Pokemon;
};

export const reducer: Reducer<PokemonState, PokemonAction> = (
  state = INITIAL_STATE,
  action,
) => {
  return produce<PokemonState>(state, (draft: Draft<PokemonState>) => {
    switch (action.type) {
      case PokemonTypes.GET_REQUEST: {
        draft.loading = true;
        break;
      }
      case PokemonTypes.GET_SUCCESS: {
        for (
          let i = 1;
          i <= Math.ceil(draft.data.length / draft.perPage);
          i += 1
        ) {
          draft.pageNumbers.push(i);
        }
        draft.loading = false;
        break;
      }
      case PokemonTypes.GET_DETAILS_SUCCESS: {
        draft.error = false;
        draft.data.push(action.payload);
        break;
      }
      case PokemonTypes.GET_ERROR: {
        draft.loading = false;
        draft.error = true;
        draft.data = [];
        break;
      }
      default:
        return state;
    }
    return undefined;
  });
};

export default reducer;
