import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import DeleteNotify from "../../components/DeleteNotify";

afterEach(cleanup);

describe("<DeleteNotify", () => {
  let activeProduct = { id: 2, name: "Exforge 20mg", prices: [3, 4] };

  it("should display title with text", () => {
    let handleProductDelete = jest.fn();
    let setOpen = jest.fn();
    const { getByText } = render(
      <DeleteNotify
        activeProduct={activeProduct}
        setOpen={setOpen}
        handleProductDelete={handleProductDelete}
      />
    );

    expect(
      getByText(`Are you sure you want to remove ${activeProduct.name}?`)
    ).toBeInTheDocument();
  });

  it("should call handleProductDelete", () => {
    let handleProductDelete = jest.fn();
    let setOpen = jest.fn();
    const { getByTestId } = render(
      <DeleteNotify
        activeProduct={activeProduct}
        setOpen={setOpen}
        handleProductDelete={handleProductDelete}
      />
    );

    fireEvent.click(getByTestId("2-confirm-delete"));
    expect(handleProductDelete).toHaveBeenCalledTimes(1);
    expect(handleProductDelete).toHaveBeenCalledWith();
  });

  it("should cancel delete modal", () => {
    let handleProductDelete = jest.fn();
    let setOpen = jest.fn();
    const { getByTestId } = render(
      <DeleteNotify
        activeProduct={activeProduct}
        setOpen={setOpen}
        handleProductDelete={handleProductDelete}
      />
    );
    fireEvent.click(getByTestId("2-cancel-delete"));
    expect(setOpen).toHaveBeenCalledTimes(1);
    expect(setOpen).toHaveBeenCalledWith(false);
  });
});
