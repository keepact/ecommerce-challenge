export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const priceMath = (): number => {
  const min = 12;
  const max = 100;
  const randomPrice = Math.floor(Math.random() * (+max - +min)) + +min;
  return randomPrice;
};
