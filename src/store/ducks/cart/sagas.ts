import { select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { CartTypes, Cart } from './types';
import { Pokemon } from '../pokemon/types';

import { ApplicationState } from '../../index';

interface AddCart {
  type: CartTypes;
  payload: Pokemon;
}

interface UpdateCart {
  type: CartTypes;
  id: number;
  amount: number;
}

function* addToCart({ payload }: AddCart) {
  const { id, name, sprites, price, stock } = payload;
  const productExist: Cart = yield select((state: ApplicationState) =>
    state.cart.data.find(p => p.id === id),
  );

  const currentAmount = productExist ? productExist.amount : 0;
  const amount = currentAmount + 1;

  if (amount > stock) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

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

function* updateAmount({ id, amount }: UpdateCart) {
  if (amount <= 0) return;

  const { stock }: Pokemon = yield select((state: ApplicationState) =>
    state.pokemon.data.find(p => p.id === id),
  );

  if (amount > stock) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

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
