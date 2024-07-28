import axios from "axios";
import { updateCartCount, handleErrorModal } from "../helpers/helpers";
import MicroModal from "micromodal";

const root = window.Shopify.routes.root || "/";

export const changeCart = async (id, quantity) => {
  if (quantity >= 0) {
    try {
      const object = { id, quantity };
      const res = await axios.post(`${root}cart/change.js`, object);

      return res;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      MicroModal.show("bm-error-modal", {
        onShow: modal => handleErrorModal(error, modal),
        awaitOpenAnimation: true,
      });
    }
  }
};

export const changeLine = async (line, quantity) => {
  if (quantity >= 0) {
    try {
      const object = { line, quantity };
      const res = await axios.post(`${root}cart/change.js`, object);

      return res;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      MicroModal.show("bm-error-modal", {
        onShow: modal => handleErrorModal(error, modal),
        awaitOpenAnimation: true,
      });
    }
  }
};

export const getCart = async () => {
  try {
    const res = await axios.get(`${root}cart.js`);

    return res;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    MicroModal.show("bm-error-modal", {
      onShow: modal => handleErrorModal(error, modal),
      awaitOpenAnimation: true,
    });
  }
};

export const updateCart = async updates => {
  return await axios.post(`${root}cart/update.js`, updates).catch(error => {
    return { ...error.response, error: true };
  });
};

export const getProduct = async productHandle =>
  await axios.get(`${root}products/${productHandle}.js`);

export const addToCart = async items => {
  try {
    const res = await axios.post(`${root}cart/add.js`, items);
    const currentQty = items.items
      .map(item => item.quantity)
      .reduce((total, value) => total + value);

    updateCartCount(currentQty);
    return res.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    MicroModal.show("bm-error-modal", {
      onShow: modal => handleErrorModal(error, modal),
      awaitOpenAnimation: true,
    });
  }
};
