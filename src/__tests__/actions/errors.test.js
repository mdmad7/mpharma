import { setErrorState } from "../../actions/errors";
import types from "../../utils/types";

describe("error actions", () => {
  it("should create an action to set an error state for a state key", () => {
    const entity = "products";
    const error = "Network error";

    const expectedAction = {
      type: types.SET_ERROR_STATE,
      entity,
      error
    };
    expect(setErrorState(entity, error)).toEqual(expectedAction);
  });
});
