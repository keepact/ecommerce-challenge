export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const randomNumberMath = (min: number, max: number): number => {
  const randomPrice = Math.floor(Math.random() * (+max - +min)) + +min;
  return randomPrice;
};
