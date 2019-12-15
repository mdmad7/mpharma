import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import MyTable from "../../components/MyTable";

afterEach(() => {
  cleanup();
  jest.resetModules();
});

describe("<MyTable />", () => {
  let products = {
    "1": { id: 1, name: "Exforge 10mg", prices: [1, 2] },
    "2": { id: 2, name: "Exforge 20mg", prices: [3, 4] },
    "3": { id: 3, name: "Paracetamol 20MG", prices: [6, 5] }
  };
  let prices = {
    "1": { id: 1, price: 10.99, date: "2019-01-01T17:16:32+00:00" },
    "2": { id: 2, price: 9.2, date: "2018-11-01T17:16:32+00:00" },
    "3": { id: 3, price: 12, date: "2019-01-01T17:16:32+00:00" },
    "4": { id: 4, price: 13.2, date: "2018-11-01T17:16:32+00:00" },
    "5": { id: 5, price: 5, date: "2017-01-01T17:16:32+00:00" },
    "6": { id: 6, price: 13.2, date: "2018-11-01T17:16:32+00:00" }
  };

  it("should display loading ui", () => {
    const { getByText } = render(
      <MyTable products={{}} prices={{}} loadingProducts={true} />
    );

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("should display error ui", () => {
    const { getByText } = render(
      <MyTable
        products={{}}
        prices={{}}
        loadingProducts={false}
        productsError={"Network error"}
      />
    );

    expect(getByText("Network error")).toBeInTheDocument();
  });

  it("should display no products ui", () => {
    const { getByText } = render(
      <MyTable products={{}} prices={{}} loadingProducts={false} />
    );

    expect(getByText("No products to display")).toBeInTheDocument();
  });

  it("should render products passed to it", () => {
    const { getByText, getAllByTestId } = render(
      <MyTable products={products} prices={prices} loadingProducts={false} />
    );
    expect(getAllByTestId("product-tr").length).toBe(3);
    expect(getByText("Exforge 10mg")).toBeTruthy();
    expect(getByText("10.99")).toBeTruthy();
    expect(getByText("Exforge 20mg")).toBeTruthy();
    expect(getByText("12")).toBeTruthy();

    expect(getByText("Paracetamol 20MG")).toBeTruthy();
    expect(getByText("13.2")).toBeTruthy();
  });

  it("should call product edit modal", () => {
    let getProduct = jest.fn();
    let setModal = jest.fn();
    let setOpen = jest.fn();
    let setEditMode = jest.fn();

    const { getByTestId } = render(
      <MyTable
        products={products}
        prices={prices}
        getProduct={getProduct}
        setModal={setModal}
        setOpen={setOpen}
        setEditMode={setEditMode}
      />
    );
    fireEvent.click(getByTestId("3-edit"));
    expect(getProduct).toHaveBeenCalledTimes(1);
    expect(setModal).toHaveBeenCalledTimes(1);
    expect(setOpen).toHaveBeenCalledTimes(1);
    expect(setEditMode).toHaveBeenCalledTimes(1);

    expect(getProduct).toHaveBeenCalledWith({
      id: 3,
      name: "Paracetamol 20MG",
      price: 13.2,
      prices: [6, 5]
    });
    expect(setModal).toHaveBeenCalledWith("productForm");
    expect(setOpen).toHaveBeenCalledWith(true);
    expect(setEditMode).toHaveBeenCalledWith(true);
  });

  it("should call price history modal", () => {
    let getProduct = jest.fn();
    let setModal = jest.fn();
    let setOpen = jest.fn();
    const { getByTestId } = render(
      <MyTable
        products={products}
        prices={prices}
        getProduct={getProduct}
        setModal={setModal}
        setOpen={setOpen}
      />
    );
    fireEvent.click(getByTestId("1-priceList"));
    expect(getProduct).toHaveBeenCalledTimes(1);
    expect(setModal).toHaveBeenCalledTimes(1);
    expect(setOpen).toHaveBeenCalledTimes(1);

    expect(getProduct).toHaveBeenCalledWith({
      id: 1,
      name: "Exforge 10mg",
      prices: [1, 2]
    });
    expect(setModal).toHaveBeenCalledWith("priceList");
    expect(setOpen).toHaveBeenCalledWith(true);
  });

  it("should call delete product modal", () => {
    let getProduct = jest.fn();
    let setModal = jest.fn();
    let setOpen = jest.fn();
    const { getByTestId } = render(
      <MyTable
        products={products}
        prices={prices}
        getProduct={getProduct}
        setModal={setModal}
        setOpen={setOpen}
      />
    );
    fireEvent.click(getByTestId("2-delete"));
    expect(getProduct).toHaveBeenCalledTimes(1);
    expect(setModal).toHaveBeenCalledTimes(1);
    expect(setOpen).toHaveBeenCalledTimes(1);

    expect(getProduct).toHaveBeenCalledWith({
      id: 2,
      name: "Exforge 20mg",
      prices: [3, 4]
    });
    expect(setModal).toHaveBeenCalledWith("delete");
    expect(setOpen).toHaveBeenCalledWith(true);
  });
});
