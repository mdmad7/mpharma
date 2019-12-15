import React from "react";
import PropTypes from "prop-types";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import HistoryIcon from "@material-ui/icons/History";

const MyTable = props => {
  const {
    products,
    prices,
    getProduct,
    setEditMode,
    setModal,
    setOpen,
    loadingProducts,
    productsError
  } = props;

  if (loadingProducts) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  if (productsError) {
    return <p style={{ textAlign: "center" }}>{productsError}</p>;
  }

  if (!Object.values(products).length) {
    return <p style={{ textAlign: "center" }}>No products to display</p>;
  }

  return (
    <Paper>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Products</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(products).map(product => (
            <TableRow key={product.id} data-testid="product-tr">
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="right">
                {prices[product.prices[0]].price}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  data-testid={`${product.id}-priceList`}
                  onClick={() => {
                    getProduct(product);
                    setModal("priceList");
                    setOpen(true);
                  }}
                >
                  <HistoryIcon style={{ cursor: "pointer" }} />
                </IconButton>{" "}
                <IconButton
                  data-testid={`${product.id}-edit`}
                  onClick={() => {
                    setEditMode(true);
                    getProduct({
                      ...product,
                      price: prices[product.prices[0]].price
                    });
                    setOpen(true);
                    setModal("productForm");
                  }}
                >
                  <EditIcon style={{ cursor: "pointer" }} />
                </IconButton>{" "}
                <IconButton
                  data-testid={`${product.id}-delete`}
                  onClick={() => {
                    getProduct(product);
                    setModal("delete");
                    setOpen(true);
                  }}
                >
                  <DeleteIcon style={{ cursor: "pointer" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

MyTable.propTypes = {
  getProduct: PropTypes.func,
  products: PropTypes.object.isRequired,
  prices: PropTypes.object.isRequired,
  setOpen: PropTypes.func,
  setModal: PropTypes.func,
  setEditMode: PropTypes.func,
  loadingProducts: PropTypes.bool,
  productsError: PropTypes.string
};

export default MyTable;
