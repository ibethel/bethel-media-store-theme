import axios from "axios";
import { updateCartCount } from "../helpers/helpers";

export const changeCart = async (id, quantity) => {
  if (quantity >= 0) {
    try {
      const object = { id, quantity };
      const res = await axios.post("/cart/change.js", object);

      return res;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log({ error });
    }
  }
};

export const changeLine = async (line, quantity) => {
  if (quantity >= 0) {
    try {
      const object = { line, quantity };
      const res = await axios.post("/cart/change.js", object);

      return res;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log({ error });
    }
  }
};

export const getCart = async () => {
  try {
    const res = await axios.get("/cart.js");

    return res;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error });
  }
};

export const updateCart = async updates => {
  return await axios.post("/cart/update.js", updates).catch(error => {
    return { ...error.response, error: true };
  });
};

export const getProduct = async productHandle => await axios.get(`/products/${productHandle}.js`);

export const addToCart = async items => {
  try {
    const res = await axios.post("/cart/add.js", items);
    const currentQty = items.items
      .map(item => item.quantity)
      .reduce((total, value) => total + value);

    updateCartCount(currentQty);
    return res.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error });
  }
};
