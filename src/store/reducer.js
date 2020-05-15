import * as actionTypes from "./actionTypes";
import { updateObject } from "./utility";

const initialState = {
  customers: [],
  products: [],
  customerProducts: {},
  orders: [],
  orderProducts: [],
  updatedOrder: {},
  updatedProduct: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CUSTOMERS:
      return updateObject(state, { customers: action.list });
    case actionTypes.GET_PRODUCTS:
      return updateObject(state, { products: action.list });
    case actionTypes.GET_CUSTOMER_PRODUCTS:
      return updateObject(state, { customerProducts: action.details });
    case actionTypes.GET_ORDERS:
      return updateObject(state, { orders: action.list });
    case actionTypes.GET_ORDER_PRODUCTS:
      return updateObject(state, { orderProducts: action.list });
    case actionTypes.UPDATE_ORDER:
      return updateObject(state, { updatedOrder: action.details });
    case actionTypes.UPDATE_PRODUCT:
      return updateObject(state, { updatedProduct: action.details });
    default:
      return state;
  }
};

export default reducer;
