import types from "../utils/types";

let initialState = !!localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : {};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCHING_PRODUCTS_SUCCESS:
      const fetched = {
        ...action.entities.products,
        ...state
      };
      localStorage.setItem("products", JSON.stringify(fetched));

      return fetched;
    case types.ADD_PRODUCT:
      const updated = {
        ...state,
        ...action.payload.product
      };
      localStorage.setItem("products", JSON.stringify(updated));
      return updated;

    case types.DELETE_PRODUCT:
      const newState = Object.values(state).reduce((acc, cur) => {
        if (cur.id !== action.payload) {
          acc[cur.id] = cur;
        }
        return acc;
      }, {});

      localStorage.setItem("products", JSON.stringify(newState));

      return newState;

    default:
      return state;
  }
};
