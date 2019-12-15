import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  deleteProduct,
  addProduct,
  fetchProducts
} from "../../actions/products";

import types from "../../utils/types";

const mockStore = configureMockStore([thunk]);

describe("product actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});

    // store.dispatch = jest.fn();
    store.clearActions();
  });

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

  it("should create an action to fetch products from api", async () => {
    let data = {
      status: 200,
      data: {
        products: [
          {
            id: 1,
            name: "Exforge 10mg",
            prices: [
              {
                id: 1,
                price: 10.99,
                date: "2019-01-01T17:16:32+00:00"
              },
              {
                id: 2,
                price: 9.2,
                date: "2018-11-01T17:16:32+00:00"
              }
            ]
          },
          {
            id: 2,
            name: "Exforge 20mg",
            prices: [
              {
                id: 3,
                price: 12.0,
                date: "2019-01-01T17:16:32+00:00"
              },
              {
                id: 4,
                price: 13.2,
                date: "2018-11-01T17:16:32+00:00"
              }
            ]
          },
          {
            id: 3,
            name: "Paracetamol 20MG",
            prices: [
              {
                id: 5,
                price: 5.0,
                date: "2017-01-01T17:16:32+00:00"
              },
              {
                id: 6,
                price: 13.2,
                date: "2018-11-01T17:16:32+00:00"
              }
            ]
          }
        ]
      }
    };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(data));
    await store.dispatch(fetchProducts());

    let expectedActions = [
      { type: "SET_FETCH_STATE", entity: "products", fetchState: true },
      { type: "SET_ERROR_STATE", entity: "products", error: undefined },
      {
        type: "FETCHING_PRODUCTS_SUCCESS",
        entities: {
          prices: {
            "1": { id: 1, price: 10.99, date: "2019-01-01T17:16:32+00:00" },
            "2": { id: 2, price: 9.2, date: "2018-11-01T17:16:32+00:00" },
            "3": { id: 3, price: 12, date: "2019-01-01T17:16:32+00:00" },
            "4": { id: 4, price: 13.2, date: "2018-11-01T17:16:32+00:00" },
            "5": { id: 5, price: 5, date: "2017-01-01T17:16:32+00:00" },
            "6": { id: 6, price: 13.2, date: "2018-11-01T17:16:32+00:00" }
          },
          products: {
            "1": { id: 1, name: "Exforge 10mg", prices: [1, 2] },
            "2": { id: 2, name: "Exforge 20mg", prices: [3, 4] },
            "3": { id: 3, name: "Paracetamol 20MG", prices: [6, 5] }
          }
        }
      },
      { type: "SET_FETCH_STATE", entity: "products", fetchState: false }
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should create an action to fetch products from api that fails", async () => {
    let data = {
      status: 500,
      message: "Network Error"
    };

    mockAxios.get.mockImplementationOnce(() => Promise.reject(data));
    await store.dispatch(fetchProducts());

    let expectedActions = [
      { type: "SET_FETCH_STATE", entity: "products", fetchState: true },
      { type: "SET_ERROR_STATE", entity: "products", error: undefined },
      { type: "SET_FETCH_STATE", entity: "products", fetchState: false },
      {
        type: "SET_ERROR_STATE",
        entity: "products",
        error: "Network Error"
      }
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
});
