import React from "react";
import { bmApiObj } from "../../utilities/bm-api-obj";

const bmApi = bmApiObj();

const settings = {
  cart: bmApi.cartPage.cart,
  checkoutButtonText: bmApi.cartPage.copy.checkout_button,
  continueBrowsing: bmApi.cartPage.copy.continue_browsing,
  currency: bmApi.currency,
  emptyCartText: bmApi.cartPage.copy.cart_empty,
  itemRegularPriceText: bmApi.cartPage.copy.regular_price,
  itemSalePriceText: bmApi.cartPage.copy.sale_price,
  itemQtyLabel: bmApi.cartPage.copy.qty,
  messages: {
    bulkApproved: bmApi.bulkOrders.bulkOrderApproved.message,
    bulkNotApproved: bmApi.bulkOrders.bulkOrderNotApproved.message,
  },
  removeButtonText: bmApi.cartPage.copy.remove,
  subtotalTitle: bmApi.cartPage.copy.subtotal_title,
  summaryTitle: bmApi.cartPage.copy.summary_title,
};

export default React.createContext(settings);
