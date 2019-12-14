import types from "../utils/types";

let initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FETCH_STATE:
      return {
        ...state,
        [action.entity]: action.fetchState
      };

    default:
      return state;
  }
};
