import { Pokemon } from '../store/ducks/pokemon/types';

interface Pagination {
  page: number;
  perPage: number;
  array: Pokemon[];
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

export const setPage = ({ page, perPage, array }: Pagination): Pokemon[] => {
  const indexOfLastItem = page * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentList = array.slice(indexOfFirstItem, indexOfLastItem);

  return currentList;
};
