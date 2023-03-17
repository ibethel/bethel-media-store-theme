import { isEmpty } from "lodash";
import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { fetchCart } from "../../actions";
import SettingsContext from "../../contexts/SettingsContext";

import CartEmpty from "./CartEmpty";
import CartItemList from "./CartItemList";
import CartRecap from "./CartRecap";

const Cart = props => {
  const { cart, fetchCart } = props;
  const settings = useContext(SettingsContext);
  const initialCart = settings.cart;
  const currentCart = !isEmpty(cart) ? cart : initialCart;

  useEffect(() => {
    fetchCart();
    updateCartCounter(cart.item_count);
  }, [cart.item_count]);

  const updateCartCounter = count => {
    const counters = Array.from(document.querySelectorAll(".bm-cart-counter"));

    counters.forEach(counter => {
      const currentCount = parseInt(counter.dataset.count);

      if (currentCount !== count) {
        counter.dataset.count = count;
        counter.textContent = count;
      }
    });
  };

  const renderCart = () => {
    return (
      <form action="/cart" className="cart-form" id="cart-form" method="post">
        <div className="cart-form__container d-flex flex-column flex-xl-row">
          <div className="cart-items col-12 col-xl-8 mb-3 mb-sm-5 mb-xl-0 pe-xl-5">
            <CartItemList items={currentCart.items} />
          </div>

          <CartRecap totalPrice={cart.total_price} />
        </div>
      </form>
    );
  };

  const handleCartFlow = () => {
    if (isEmpty(currentCart.items)) {
      return <CartEmpty />;
    }

    return renderCart();
  };

  return handleCartFlow();
};

const mapStateToProps = ({ cart }) => ({ cart });

export default connect(mapStateToProps, { fetchCart })(Cart);
