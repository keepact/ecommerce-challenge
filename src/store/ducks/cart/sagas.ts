import { select, put, all, takeLatest } from 'redux-saga/effects';
import { AnyAction } from 'redux';

import { CartTypes } from './types';
import { ApplicationState } from '../../index';

import { addToCartSuccess, updateAmountSuccess } from './actions';

function* addToCart({ name }: AnyAction) {
  const productExist = yield select((state: ApplicationState) =>
    state.cart.data.find(p => p.name === name),
  );

  const currentAmount = productExist ? productExist.amount : 0;

  const amount = currentAmount + 1;

  if (productExist) {
    yield put(updateAmountSuccess(name, amount));
  } else {
    const currentCart = yield select(
      (state: ApplicationState) => state.cart.data,
    );

    const data = {
      ...currentCart,
      amount: 1,
    };

    yield put(addToCartSuccess(data));
  }
}

function* updateAmount({ name, amount }: AnyAction) {
  if (amount <= 0) return;

  yield put(updateAmountSuccess(name, amount));
}

export default all([
  takeLatest(CartTypes.ADD_REQUEST, addToCart),
  takeLatest(CartTypes.UPDATE_AMOUNT_REQUEST, updateAmount),
]);
