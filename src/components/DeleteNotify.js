import React from "react";
import PropTypes from "prop-types";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";

const DeleteProduct = ({ activeProduct, handleProductDelete, setOpen }) => {
  return (
    <>
      <DialogTitle id="alert-dialog-title">Delete Product</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to remove {`${activeProduct.name}`}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          No
        </Button>
        <Button onClick={handleProductDelete} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </>
  );
};

DeleteProduct.propTypes = {
  activeProduct: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleProductDelete: PropTypes.func.isRequired
};

export default DeleteProduct;
