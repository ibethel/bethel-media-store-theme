import { CHANGE_ITEM_QUANTITY, FETCH_CART, REMOVE_CART_ITEM } from "./types";
import { changeCart, getCart } from "../../utilities/bm-api";

export const changeItemQuantity = (id, qty) => async dispatch => {
  const response = await changeCart(id, qty);

  dispatch({ type: CHANGE_ITEM_QUANTITY, payload: response.data });
};

export const fetchCart = () => async dispatch => {
  const response = await getCart();

  dispatch({ type: FETCH_CART, payload: response.data });
};

export const deleteCartItem = id => async dispatch => {
  const response = await changeCart(id, 0);

  dispatch({ type: REMOVE_CART_ITEM, payload: response.data });
};
