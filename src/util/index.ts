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
