import produce, { Draft } from 'immer';
import { Reducer } from 'redux';
import { PokemonTypes, PokemonState, Pokemon } from './types';

const INITIAL_STATE: PokemonState = {
  data: [],
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
        draft.data.push(action.payload);
        break;
      }
      default:
        return state;
    }
    return undefined;
  });
};

export default reducer;