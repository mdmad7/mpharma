import types from "../utils/types";

let initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ERROR_STATE:
      return {
        ...state,
        [action.entity]: action.error
      };

    default:
      return state;
  }
};
