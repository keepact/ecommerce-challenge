import { select, put, all, takeLatest } from 'redux-saga/effects';
import { CartTypes } from './types';
import { ApplicationState } from '../../index';

interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

type CartAction = {
  type: CartTypes;
  id: number;
  amount: number;
  payload: {
    price: number;
    data: PokemonDetails;
  };
};

function* addToCart({ payload }: CartAction) {
  const { data, price } = payload;
  const { id, name, sprites } = data;
  const productExist = yield select((state: ApplicationState) =>
    state.cart.data.find(p => p.id === data.id),
  );

  const currentAmount = productExist ? productExist.amount : 0;
  const amount = currentAmount + 1;

  if (productExist) {
    yield put({
      type: CartTypes.UPDATE_AMOUNT_SUCCESS,
      id: data.id,
      amount,
    });
  } else {
    const pokemon = {
      id,
      name,
      sprites: sprites.front_default,
      price,
      amount: 1,
    };
    yield put({
      type: CartTypes.ADD_SUCCESS,
      payload: pokemon,
    });
  }
}

function* updateAmount({ id, amount }: CartAction) {
  if (amount <= 0) return;

  yield put({
    type: CartTypes.UPDATE_AMOUNT_SUCCESS,
    id,
    amount,
  });
}

export default all([
  takeLatest(CartTypes.ADD_REQUEST, addToCart),
  takeLatest(CartTypes.UPDATE_AMOUNT_REQUEST, updateAmount),
]);
