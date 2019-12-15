export const sortedPriceDate = products => {
  return products.map(product => ({
    ...product,
    prices: product.prices.sort((a, b) => new Date(b.date) - new Date(a.date))
  }));
};

export const removeObjectKey = (obj, key) => {
  return Object.values(obj).reduce((acc, cur) => {
    if (cur.id !== key) {
      acc[cur.id] = cur;
    }
    return acc;
  }, {});
};
