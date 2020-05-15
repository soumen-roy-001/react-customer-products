import * as actionTypes from "./actionTypes";
import ApiBaseURL from "../axios";

export const getCustomers = () => {
  return (dispatch) => {
    ApiBaseURL.get("customers")
      .then((res) => {
        dispatch({ type: actionTypes.GET_CUSTOMERS, list: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const getProducts = () => {
  return (dispatch) => {
    ApiBaseURL.get("products")
      .then((res) => {
        dispatch({ type: actionTypes.GET_PRODUCTS, list: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const getCustomerProducts = (customerId) => {
  return (dispatch) => {
    if (customerId) {
      ApiBaseURL.get("customers-products/" + customerId)
        .then((res) => {
          // console.log(res.data.data);
          dispatch({
            type: actionTypes.GET_CUSTOMER_PRODUCTS,
            details: res.data.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};
export const postProducts = (formdata) => {
  return (dispatch) => {
    if (formdata) {
      ApiBaseURL.post("product-update", formdata)
        .then((res) => {
          // console.log(res.data.data);
          dispatch({
            type: actionTypes.UPDATE_PRODUCT,
            details: res.data.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};
