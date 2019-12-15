import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "./actions/products";
const App = ({ fetchProducts }) => {
  useEffect(() => {
    const archivedProducts = !!localStorage.getItem("products");
    const archivedPrices = !!localStorage.getItem("prices");
    (!archivedProducts || !archivedPrices) && fetchProducts();
  }, []); //eslint-disable-line

  return (
    <div>
      <p>App</p>
    </div>
  );
};
const mapDispatch = dispatch => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts());
    }
  };
};
export default connect(null, mapDispatch)(App);
