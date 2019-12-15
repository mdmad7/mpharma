import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const ProductForm = ({
  editMode,
  activeProduct,
  handleChange,
  handleClose,
  handleAddProduct
}) => {
  return (
    <>
      <DialogTitle id="form-dialog-title">
        {editMode ? "Edit" : "Add"} Product
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={activeProduct.name || ""}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          name="price"
          label="Price"
          type="text"
          fullWidth
          value={activeProduct.price || ""}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddProduct} color="primary">
          {editMode ? "Edit" : "Add"}
        </Button>
      </DialogActions>
    </>
  );
};

ProductForm.propTypes = {
  editMode: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAddProduct: PropTypes.func.isRequired,
  activeProduct: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default ProductForm;
