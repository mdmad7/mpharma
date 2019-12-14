import { normalize, schema } from "normalizr";

const price = new schema.Entity("prices");
const product = new schema.Entity("products", {
  prices: [price]
});

const normalizeProducts = data =>
  normalize(
    { products: data },
    {
      products: [product]
    }
  );

export default normalizeProducts;
