import { setFetchState } from "../../actions/fetching";
import types from "../../utils/types";

describe("fetching actions", () => {
  it("should create an action to set a fetching state for a state key", () => {
    const entity = "products";
    const fetchState = true;

    const expectedAction = {
      type: types.SET_FETCH_STATE,
      entity,
      fetchState
    };

    expect(setFetchState(entity, fetchState)).toEqual(expectedAction);
  });
});
