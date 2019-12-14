import types from "../utils/types";

export const setErrorState = (entity, error) => {
  return {
    type: types.SET_ERROR_STATE,
    entity,
    error
  };
};
