import { action } from 'typesafe-actions';
import { CartTypes } from './types';

export const addToCartRequest = (pokemon: object) =>
  action(CartTypes.ADD_REQUEST, pokemon);

export const addToCartSuccess = (pokemon: object) =>
  action(CartTypes.ADD_SUCCESS, pokemon);

export const removeFromCart = (id: number) => action(CartTypes.REMOVE, id);

export const updateAmountRequest = (id: number, amount: number) =>
  action(CartTypes.UPDATE_AMOUNT_REQUEST, id, amount);

export const updateAmountSuccess = (id: number, amount: number) =>
  action(CartTypes.UPDATE_AMOUNT_SUCCESS, id, amount);

export const resetCart = (pokemon: object) => action(CartTypes.RESET, pokemon);
