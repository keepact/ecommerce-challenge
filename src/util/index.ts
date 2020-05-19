import { Pokemon } from '../store/ducks/pokemon/types';
import { Cart } from '../store/ducks/cart/types';

interface Pagination {
  page: number;
  perPage: number;
  array: Pokemon[];
}

interface SumAmount {
  [key: string]: number;
}

export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const randomNumberMath = (min: number, max: number): number => {
  const randomNumber = Math.floor(Math.random() * (+max - +min)) + +min;
  return randomNumber;
};

export const calculateBonus = (total: number): string =>
  formatPrice(total / 10);

export const calculateTotal = (array: Cart[]): number => {
  return array.reduce((sumTotal: number, product) => {
    return sumTotal + product.price * product.amount;
  }, 0);
};

export const calculateSubTotal = (array: Cart[]): Cart[] => {
  return array.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  }));
};

export const calculateAmount = (array: Cart[]): SumAmount => {
  return array.reduce((sumAmount: SumAmount, product: Cart) => {
    sumAmount[product.id] = product.amount;

    return sumAmount;
  }, {});
};

export const setPage = ({ page, perPage, array }: Pagination): Pokemon[] => {
  const indexOfLastItem = page * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentList = array.slice(indexOfFirstItem, indexOfLastItem);

  return currentList;
};
