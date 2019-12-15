import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { render, cleanup, fireEvent } from "@testing-library/react";
import thunk from "redux-thunk";
import App from "../App";

const mockStore = configureStore([thunk]);

afterEach(cleanup);

describe("<App />", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      products: {},
      prices: {},
      fetching: {},
      errors: {}
    });

    store.dispatch = jest.fn();
  });

  it("renders App and Dispatches async action once", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(store.dispatch).toBeCalledTimes(1);
  });

  it("renders App and wont dispatch action because of localStorage values", () => {
    window.localStorage.setItem("products", JSON.stringify({}));
    window.localStorage.setItem("prices", JSON.stringify({}));

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(store.dispatch).toBeCalledTimes(0);
  });
});
