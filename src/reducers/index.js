import { combineReducers } from "redux";
import products from "./products";
import prices from "./prices";
import fetching from "./fetching";
import errors from "./errors";

export default combineReducers({
  products,
  prices,
  fetching,
  errors
});
