import reducer from "../../reducers/prices";
import types from "../../utils/types";

describe("prices reducer", () => {
  const entities = {
    prices: {
      "1": { id: 1, price: 10.99, date: "2019-01-01T17:16:32+00:00" },
      "2": { id: 2, price: 9.2, date: "2018-11-01T17:16:32+00:00" },
      "3": { id: 3, price: 12, date: "2019-01-01T17:16:32+00:00" },
      "4": { id: 4, price: 13.2, date: "2018-11-01T17:16:32+00:00" },
      "5": { id: 5, price: 5, date: "2017-01-01T17:16:32+00:00" },
      "6": { id: 6, price: 13.2, date: "2018-11-01T17:16:32+00:00" }
    }
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it("should set prices from localStorage if it exists", () => {
    expect(reducer(entities.prices, {})).toEqual(entities.prices);
  });

  it("should set prices from FETCHING_PRODUCTS_SUCCESS payload", () => {
    const fetched = {
      ...entities.prices,
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

  it("should add price from ADD_PRODUCT payload", () => {
    const genID = Date.now();
    const genDate = new Date().toISOString();

    const pricePayload = {
      [genID]: {
        id: genID,
        price: 14.5,
        date: genDate
      }
    };
    const updated = {
      ...entities.prices,
      ...pricePayload
    };

    expect(
      reducer(entities.prices, {
        type: types.ADD_PRODUCT,
        payload: { price: pricePayload }
      })
    ).toEqual(updated);
  });
});
