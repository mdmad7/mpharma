import types from "../utils/types";

export const setFetchState = (entity, fetchState) => {
  return {
    type: types.SET_FETCH_STATE,
    entity,
    fetchState
  };
};
