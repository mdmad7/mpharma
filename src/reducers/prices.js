import types from "../utils/types";

let initialState = !!localStorage.getItem("prices")
  ? JSON.parse(localStorage.getItem("prices"))
  : {};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCHING_PRODUCTS_SUCCESS:
      const fetched = {
        ...action.entities.prices,
        ...state
      };
      localStorage.setItem("prices", JSON.stringify(fetched));

      return fetched;
    case types.ADD_PRODUCT:
      const updated = {
        ...state,
        ...(action.payload.price || {})
      };
      localStorage.setItem("prices", JSON.stringify(updated));
      return updated;
    default:
      return state;
  }
};
