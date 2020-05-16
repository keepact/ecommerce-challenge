import { select, put, all, takeLatest } from 'redux-saga/effects';
import { CartTypes } from './types';
import { ApplicationState } from '../../index';

interface PokemonDetails {
  id: number;
  name: string;
  sprites: string;
  price: number;
}

type CartAction = {
  type: CartTypes;
  id: number;
  amount: number;
  payload: PokemonDetails;
};

function* addToCart({ payload }: CartAction) {
  const { id, name, sprites, price } = payload;
  const productExist = yield select((state: ApplicationState) =>
    state.cart.data.find(p => p.id === id),
  );

  const currentAmount = productExist ? productExist.amount : 0;
  const amount = currentAmount + 1;

  if (productExist) {
    yield put({
      type: CartTypes.UPDATE_AMOUNT_SUCCESS,
      id,
      amount,
    });
  } else {
    const pokemon = {
      id,
      name,
      sprites,
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
