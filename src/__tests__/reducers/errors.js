import reducer from "../../reducers/errors";
import types from "../../utils/types";

describe("errors reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it("should set error state for store key", () => {
    const storeKey = "products";

    expect(
      reducer(
        {},
        {
          type: types.SET_ERROR_STATE,
          error: "Network error",
          entity: storeKey
        }
      )
    ).toEqual({ products: "Network error" });
  });
});
