import { select, put, call, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { PokemonTypes, Pokemon } from './types';
import { CartTypes } from '../cart/types';

import { ApplicationState } from '../..';
import { randomNumberMath } from '../../../util/helpers';
import api from '../../../services/api';

interface PokemonDetails {
  data: {
    id: number;
    name: string;
    sprites: {
      front_default: string;
    };
  };
}

interface PokemonType {
  data: {
    name: string;
    pokemon: PokemonTypeInfo[];
  };
}

interface PokemonTypeInfo {
  pokemon: {
    name: string;
    url: string;
  };
}

interface PokemonAction {
  type: PokemonTypes;
  payload: string;
}

function* getPokemonDetails(url: string) {
  const formatUrl = url.replace('https://pokeapi.co/api/v2/', '');

  try {
    const { data }: PokemonDetails = yield call(api.get, formatUrl);
    const pokemon: Pokemon = {
      id: data.id,
      name: data.name,
      sprites:
        data.sprites.front_default ??
        'https://api.adorable.io/avatars/80/abott@adorable.png',
      price: randomNumberMath(12, 100),
      stock: randomNumberMath(1, 15),
    };

    yield put({
      type: PokemonTypes.GET_DETAILS_SUCCESS,
      payload: pokemon,
    });
  } catch (err) {
    yield put({
      type: PokemonTypes.GET_ERROR,
    });
    toast.error(
      'Ocorreu um erro ao solicitar os pokemons. Tente novamente em alguns minutos',
    );
  }
}

function* getPokemons({ payload }: PokemonAction) {
  try {
    const { data }: PokemonType = yield call(api.get, payload);
    const type: string = yield select(
      (state: ApplicationState) => state.pokemon.pokemonType,
    );
    const hasEmptyArrayOfPokemons: boolean = yield select(
      (state: ApplicationState) => state.pokemon.data.length === 0,
    );

    if (hasEmptyArrayOfPokemons || type !== data.name) {
      if (type !== data.name) {
        yield put({ type: PokemonTypes.RESET });
        yield put({ type: CartTypes.RESET });
      }
      yield all(
        data.pokemon.map(poke => call(getPokemonDetails, poke.pokemon.url)),
      );
    }

    yield put({ type: PokemonTypes.GET_SUCCESS, pokemonType: data.name });
  } catch (err) {
    yield put({
      type: PokemonTypes.GET_ERROR,
    });
    toast.error(
      'Ocorreu um erro ao solicitar os pokemons. Tente novamente em alguns minutos',
    );
  }
}

export default all([takeLatest(PokemonTypes.GET_REQUEST, getPokemons)]);
