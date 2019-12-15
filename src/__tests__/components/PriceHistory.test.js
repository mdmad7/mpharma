import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import PriceHistory from "../../components/PriceHistory";

afterEach(cleanup);

describe("<PriceHistory", () => {
  let activeProduct = { id: 2, name: "Exforge 20mg", prices: [3, 4] };
  let prices = {
    "1": { id: 1, price: 10.99, date: "2019-01-01T17:16:32+00:00" },
    "2": { id: 2, price: 9.2, date: "2018-11-01T17:16:32+00:00" },
    "3": { id: 3, price: 12, date: "2019-01-01T17:16:32+00:00" },
    "4": { id: 4, price: 13.2, date: "2018-11-01T17:16:32+00:00" },
    "5": { id: 5, price: 5, date: "2017-01-01T17:16:32+00:00" },
    "6": { id: 6, price: 13.2, date: "2018-11-01T17:16:32+00:00" }
  };

  it("should display title with text", () => {
    const { getByText, getAllByTestId } = render(
      <PriceHistory activeProduct={activeProduct} prices={prices} />
    );

    expect(getAllByTestId("product-priceList").length).toBe(2);
    expect(
      getByText(new Date("2019-01-01T17:16:32+00:00").toGMTString())
    ).toBeTruthy();
    expect(getByText("12")).toBeTruthy();
    expect(
      getByText(new Date("2018-11-01T17:16:32+00:00").toGMTString())
    ).toBeTruthy();
    expect(getByText("13.2")).toBeTruthy();
  });
});
