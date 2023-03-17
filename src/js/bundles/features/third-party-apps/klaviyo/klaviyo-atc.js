import isEmpty from "lodash/isEmpty";

export const klaviyoAtc = () => {
  var _learnq = _learnq || [];
  var item = item || undefined;

  fetch(`${window.location.origin}/cart.js`).then(res =>
    res
      .clone()
      .json()
      .then(data => {
        var cart = {
          total_price: data.total_price / 100,
          $value: data.total_price / 100,
          total_discount: data.total_discount,
          original_total_price: data.original_total_price / 100,
          items: data.items,
        };

        if (item !== "undefined" && !isEmpty(item)) {
          cart = Object.assign(cart, item);
        }

        _learnq.push(["track", "Added to Cart", cart]);
      })
  );
};
