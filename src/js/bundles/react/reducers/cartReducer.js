import { CHANGE_ITEM_QUANTITY, REMOVE_CART_ITEM, FETCH_CART } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case CHANGE_ITEM_QUANTITY:
      return { ...state, ...action.payload };
    case REMOVE_CART_ITEM:
      return { ...state, ...action.payload };
    case FETCH_CART:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
