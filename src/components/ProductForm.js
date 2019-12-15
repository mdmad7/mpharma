import React, { useState } from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const ProductForm = ({ editMode, activeProduct, setOpen, addProduct }) => {
  const [product, setProduct] = useState(activeProduct);
  const handleChange = e => {
    if (e.target.name === "name") {
      setProduct({ ...product, name: e.target.value });
    }

    if (e.target.name === "price") {
      setProduct({
        ...product,
        price: e.target.value,
        priceId: product.priceId ? product.priceId : Date.now()
      });
    }
  };

  return (
    <>
      <DialogTitle id="form-dialog-title">
        {editMode ? "Edit Product" : "Add Product"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          placeholder="Enter name"
          value={product.name || ""}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          name="price"
          label="Price"
          type="text"
          fullWidth
          placeholder="Enter price"
          value={product.price || ""}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (product.name && product.price) {
              addProduct(product);
              setOpen(false);
            }
          }}
          color="primary"
        >
          {editMode ? "Edit" : "Add"}
        </Button>
      </DialogActions>
    </>
  );
};

ProductForm.propTypes = {
  editMode: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  activeProduct: PropTypes.object.isRequired
};

export default ProductForm;
