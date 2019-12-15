import reducer from "../../reducers/products";
import types from "../../utils/types";

describe("products reducer", () => {
  const entities = {
    products: {
      "1": { id: 1, name: "Exforge 10mg", prices: [1, 2] },
      "2": { id: 2, name: "Exforge 20mg", prices: [3, 4] },
      "3": { id: 3, name: "Paracetamol 20MG", prices: [6, 5] }
    }
  };
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it("should set prices from FETCHING_PRODUCTS_SUCCESS payload", () => {
    const fetched = {
      ...entities.products,
      ...{}
    };

    expect(
      reducer(
        {},
        {
          type: types.FETCHING_PRODUCTS_SUCCESS,
          entities
        }
      )
    ).toEqual(fetched);
  });

  it("should add products from ADD_PRODUCT payload", () => {
    const genID = Date.now();

    const productPayload = {
      [genID]: {
        id: genID,
        name: "Paracetamol 100mg",
        prices: [1, 6]
      }
    };
    const updated = {
      ...entities.products,
      ...productPayload
    };

    expect(
      reducer(entities.products, {
        type: types.ADD_PRODUCT,
        payload: { product: productPayload }
      })
    ).toEqual(updated);
  });

  it("should remove product from store with DELETE_PRODUCT payload id", () => {
    const payload = 2;

    expect(
      reducer(entities.products, {
        type: types.DELETE_PRODUCT,
        payload
      })
    ).toEqual({
      "1": { id: 1, name: "Exforge 10mg", prices: [1, 2] },
      "3": { id: 3, name: "Paracetamol 20MG", prices: [6, 5] }
    });
  });
});
