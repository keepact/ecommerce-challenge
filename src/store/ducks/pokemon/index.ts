import produce, { Draft } from 'immer';
import { Reducer } from 'redux';
import { PokemonTypes, PokemonState, Pokemon } from './types';

const INITIAL_STATE: PokemonState = {
  data: [],
  pokemonType: 'poison',
  page: 1,
  perPage: 9,
  lastPage: 0,
  error: false,
  loading: false,
};

type PokemonAction = {
  type: PokemonTypes;
  pokemonType?: string;
  page?: number;
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
        const lastPage = Math.round(draft.data.length / draft.perPage);
        draft.lastPage = lastPage;
        draft.pokemonType = action.pokemonType ?? 'poison';
        draft.loading = false;
        break;
      }
      case PokemonTypes.GET_DETAILS_SUCCESS: {
        draft.error = false;
        draft.data.push(action.payload);
        break;
      }
      case PokemonTypes.CHANGE_PAGE: {
        draft.page = action.page ?? 1;
        break;
      }
      case PokemonTypes.GET_ERROR: {
        draft.data = [];
        draft.loading = false;
        draft.error = true;
        break;
      }
      default:
        return state;
    }
    return undefined;
  });
};

export default reducer;
