import axios from "axios";
import types from "../utils/types";

import { setErrorState } from "./errors";
import { setFetchState } from "./fetching";
import normalizeProducts from "../utils/normalizeProducts";
import { sortedPriceDate } from "../utils/helpers";

export const fetchProducts = () => {
  return dispatch => {
    dispatch(setFetchState("products", true));
    dispatch(setErrorState("products", undefined));

    return axios({
      method: "get",
      url: `http://www.mocky.io/v2/5c3e15e63500006e003e9795`
    })
      .then(response => {
        if (response.status === 200) {
          const sorted = sortedPriceDate(response.data.products);
          const normalizedData = normalizeProducts(sorted);

          dispatch({
            type: types.FETCHING_PRODUCTS_SUCCESS,
            entities: normalizedData.entities
          });
          dispatch(setFetchState("products", false));
        }
      })
      .catch(error => {
        dispatch(setFetchState("products", false));
        dispatch(setErrorState("products", error.message));
      });
  };
};

export const addProduct = product => {
  return dispatch => {
    const payload = {
      product: {
        [product.id]: {
          id: product.id,
          name: product.name,
          prices: product.priceId
            ? [product.priceId, ...product.prices]
            : [...product.prices]
        }
      },
      price: product.priceId && {
        [product.priceId]: {
          id: product.priceId,
          price: parseFloat(product.price),
          date: new Date().toISOString()
        }
      }
    };

    dispatch({
      type: types.ADD_PRODUCT,
      payload
    });
  };
};

export const deleteProduct = payload => {
  return dispatch => {
    dispatch({
      type: types.DELETE_PRODUCT,
      payload
    });
  };
};
