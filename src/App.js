import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import PropTypes from "prop-types";

import MyTable from "./components/MyTable";
import ProductForm from "./components/ProductForm";
import PriceList from "./components/PriceHistory";
import DeleteProduct from "./components/DeleteNotify";

import { fetchProducts, addProduct, deleteProduct } from "./actions/products";

const App = ({
  fetchProducts,
  products,
  prices,
  loadingProducts,
  productsError,
  deleteProduct,
  addProduct
}) => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(undefined);

  const [editMode, setEditMode] = useState(false);
  const [activeProduct, setActiveProduct] = useState({});

  useEffect(() => {
    const archivedProducts = !!localStorage.getItem("products");
    const archivedPrices = !!localStorage.getItem("prices");
    (!archivedProducts || !archivedPrices) && fetchProducts();
  }, []); //eslint-disable-line

  const handleClickOpen = () => {
    setOpen(true);
    setActiveProduct({ id: Date.now(), priceId: Date.now(), prices: [] });
  };

  const handleProductDelete = () => {
    deleteProduct(activeProduct.id);
    setOpen(false);
  };

  const getProduct = product => {
    setActiveProduct(product);
  };
  return (
    <>
      <CssBaseline />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        onExited={() => {
          setActiveProduct({});
          setEditMode(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        {modal === "productForm" && (
          <ProductForm
            editMode={editMode}
            activeProduct={activeProduct}
            setOpen={setOpen}
            addProduct={addProduct}
          />
        )}

        {modal === "delete" && (
          <DeleteProduct
            activeProduct={activeProduct}
            handleProductDelete={handleProductDelete}
            setOpen={setOpen}
          />
        )}

        {modal === "priceList" && (
          <PriceList prices={prices} activeProduct={activeProduct} />
        )}
      </Dialog>

      <Container>
        <div style={{ marginBottom: "32px", textAlign: "right" }}>
          <Button
            data-testid="addDrug"
            variant="contained"
            disabled={loadingProducts}
            onClick={() => {
              handleClickOpen();
              setModal("productForm");
            }}
          >
            Add Product
          </Button>
        </div>

        <MyTable
          products={products}
          prices={prices}
          getProduct={getProduct}
          loadingProducts={loadingProducts}
          productsError={productsError}
          setModal={setModal}
          setEditMode={setEditMode}
          setOpen={setOpen}
        />
      </Container>
    </>
  );
};

const mapState = state => {
  return {
    products: state.products,
    prices: state.prices,
    loadingProducts: state.fetching.products,
    productsError: state.errors.products
  };
};
const mapDispatch = dispatch => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts());
    },
    deleteProduct: id => {
      dispatch(deleteProduct(id));
    },
    addProduct: product => {
      dispatch(addProduct(product));
    }
  };
};

App.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  prices: PropTypes.object.isRequired,
  loadingProducts: PropTypes.bool,
  productsError: PropTypes.string,
  deleteProduct: PropTypes.func,
  addProduct: PropTypes.func
};

export default connect(mapState, mapDispatch)(App);
