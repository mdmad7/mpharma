import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "./actions/products";
const App = ({ fetchProducts }) => {
  useEffect(() => {
    fetchProducts();
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
