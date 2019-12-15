import reducer from "../../reducers/fetching";
import types from "../../utils/types";

describe("fetching reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it("should set fetching state for store key", () => {
    const storeKey = "products";

    expect(
      reducer(
        {},
        {
          type: types.SET_FETCH_STATE,
          fetchState: true,
          entity: storeKey
        }
      )
    ).toEqual({ products: true });
  });
});
