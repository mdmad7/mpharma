import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import ProductForm from "../../components/ProductForm";

afterEach(cleanup);

describe("<ProductForm />", () => {
  let activeProduct = { id: 2, name: "Exforge 20mg", prices: [3, 4] };
  const editMode = true;
  const setOpen = jest.fn();
  const handleChange = jest.fn();

  it("should display appropriate title text add/edit", () => {
    const titleText = editMode ? "Edit Product" : "Add Product";
    const addProduct = jest.fn();

    const { getByText } = render(
      <ProductForm
        activeProduct={activeProduct}
        editMode={editMode}
        addProduct={addProduct}
        setOpen={setOpen}
        handleChange={handleChange}
      />
    );

    expect(getByText(titleText)).toBeInTheDocument();
  });

  it("should call close modal function", () => {
    const addProduct = jest.fn();

    const { getByText } = render(
      <ProductForm
        activeProduct={activeProduct}
        addProduct={addProduct}
        setOpen={setOpen}
        handleChange={handleChange}
      />
    );
    fireEvent.click(getByText("Cancel"));
    expect(setOpen).toHaveBeenCalledWith(false);
  });

  it("should add new product", () => {
    const genID = Date.now();
    const addProduct = jest.fn();

    const { getByText, getByPlaceholderText } = render(
      <ProductForm
        activeProduct={{ id: genID, priceId: genID, prices: [] }}
        addProduct={addProduct}
        setOpen={setOpen}
        handleChange={handleChange}
      />
    );
    expect(getByText("Add Product")).toBeInTheDocument();

    const nameInput = getByPlaceholderText("Enter name");
    const priceInput = getByPlaceholderText("Enter price");

    fireEvent.change(nameInput, { target: { value: "Drug A" } });
    fireEvent.change(priceInput, { target: { value: "17.55" } });
    const genProd = {
      id: genID,
      priceId: genID,
      prices: [],
      name: "Drug A",
      price: "17.55"
    };
    fireEvent.click(getByText("Add"));
    expect(setOpen).toHaveBeenCalledWith(false);
    expect(addProduct).toHaveBeenCalledWith(genProd);
  });

  it("wont add new product without price", () => {
    const genID = Date.now();
    const addProduct = jest.fn();

    const { getByText, getByPlaceholderText } = render(
      <ProductForm
        activeProduct={{ id: genID, priceId: genID, prices: [] }}
        addProduct={addProduct}
        setOpen={setOpen}
        handleChange={handleChange}
      />
    );
    expect(getByText("Add Product")).toBeInTheDocument();

    const nameInput = getByPlaceholderText("Enter name");
    const priceInput = getByPlaceholderText("Enter price");

    fireEvent.change(nameInput, { target: { value: "Drug A" } });
    // fireEvent.change(priceInput, { target: { value: "17.55" } });

    fireEvent.click(getByText("Add"));
    expect(addProduct).toHaveBeenCalledTimes(0);
  });

  it("should edit existing product", () => {
    const addProduct = jest.fn();

    const { getByText, getByPlaceholderText } = render(
      <ProductForm
        editMode
        activeProduct={activeProduct}
        addProduct={addProduct}
        setOpen={setOpen}
        handleChange={handleChange}
      />
    );

    const nameInput = getByPlaceholderText("Enter name");
    const priceInput = getByPlaceholderText("Enter price");
    expect(getByText("Edit Product")).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: "Drug B" } });
    fireEvent.change(priceInput, { target: { value: "20.55" } });

    fireEvent.click(getByText("Edit"));
    expect(setOpen).toHaveBeenCalledWith(false);
    expect(addProduct).toHaveBeenCalled();
  });
});
