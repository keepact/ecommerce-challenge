import { action } from 'typesafe-actions';
import { CartTypes } from './types';

export const addToCartRequest = (name: string) =>
  action(CartTypes.ADD_REQUEST, name);

export const addToCartSuccess = (product: object) =>
  action(CartTypes.ADD_SUCCESS, product);

export const removeFromCart = (name: string) => action(CartTypes.REMOVE, name);

export const updateAmountRequest = (name: string, amount: number) =>
  action(CartTypes.UPDATE_AMOUNT_REQUEST, name, amount);

export const updateAmountSuccess = (name: string, amount: number) =>
  action(CartTypes.UPDATE_AMOUNT_SUCCESS, name, amount);

export const resetCart = (product: object) => action(CartTypes.RESET, product);
