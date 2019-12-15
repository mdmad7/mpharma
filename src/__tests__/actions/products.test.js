import axios from "axios";
import {
  deleteProduct,
  addProduct,
  fetchProducts
} from "../../actions/products";
import types from "../../utils/types";

jest.mock("axios");

describe("product actions", () => {
  it("should create an action to delete product", () => {
    const payload = Date.now();

    const expectedAction = {
      type: types.DELETE_PRODUCT,
      payload
    };

    expect(deleteProduct(payload)).toEqual(expectedAction);
  });

  it("should create an action to add/edit product", () => {
    const genID = Date.now();

    const product = {
      id: genID,
      name: "Paracetamol 100mg",
      price: "7.00",
      priceId: genID,
      prices: []
    };

    const payload = {
      product: {
        [product.id]: {
          id: product.id,
          name: product.name,
          prices: product.priceId
            ? [product.priceId, ...product.prices]
            : [...product.prices]
        }
      },
      price: product.priceId && {
        [product.priceId]: {
          id: product.priceId,
          price: parseFloat(product.price),
          date: new Date().toISOString()
        }
      }
    };

    const expectedAction = {
      type: types.ADD_PRODUCT,
      payload
    };

    expect(addProduct(product)).toEqual(expectedAction);
  });

  // it("should create an action to fetch products from api", async () => {
  //   const data = {
  //     products: [
  //       {
  //         id: 1,
  //         name: "Exforge 10mg",
  //         prices: [
  //           {
  //             id: 1,
  //             price: 10.99,
  //             date: "2019-01-01T17:16:32+00:00"
  //           },
  //           {
  //             id: 2,
  //             price: 9.2,
  //             date: "2018-11-01T17:16:32+00:00"
  //           }
  //         ]
  //       },
  //       {
  //         id: 2,
  //         name: "Exforge 20mg",
  //         prices: [
  //           {
  //             id: 3,
  //             price: 12.0,
  //             date: "2019-01-01T17:16:32+00:00"
  //           },
  //           {
  //             id: 4,
  //             price: 13.2,
  //             date: "2018-11-01T17:16:32+00:00"
  //           }
  //         ]
  //       },
  //       {
  //         id: 3,
  //         name: "Paracetamol 20MG",
  //         prices: [
  //           {
  //             id: 5,
  //             price: 5.0,
  //             date: "2017-01-01T17:16:32+00:00"
  //           },
  //           {
  //             id: 6,
  //             price: 13.2,
  //             date: "2018-11-01T17:16:32+00:00"
  //           }
  //         ]
  //       }
  //     ]
  //   };

  //   axios.get.mockImplementationOnce(() => Promise.resolve(data));
  //   await expect(fetchData('react')).resolves.toEqual(data);

  //   const expectedAction = {
  //     type: types.FETCHING_PRODUCTS_SUCCESS,
  //     payload
  //   };

  //   expect(fetchProducts(product)).toEqual(expectedAction);
  // });
});
