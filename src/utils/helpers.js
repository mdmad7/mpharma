export const sortedPriceDate = products => {
  return products.map(product => ({
    ...product,
    prices: product.prices.sort((a, b) => new Date(b.date) - new Date(a.date))
  }));
};
