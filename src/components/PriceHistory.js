import React from "react";
import PropTypes from "prop-types";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const PriceList = ({ activeProduct, prices }) => {
  return (
    <>
      <DialogTitle id="alert-dialog-title"> Price History</DialogTitle>
      <DialogContent>
        <List>
          {(activeProduct.prices || []).map(price => (
            <ListItem key={price}>
              <ListItemText
                secondary={new Date(prices[price].date).toGMTString()}
                primary={prices[price].price}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </>
  );
};

PriceList.propTypes = {
  activeProduct: PropTypes.object.isRequired,
  prices: PropTypes.object.isRequired
};

export default PriceList;
