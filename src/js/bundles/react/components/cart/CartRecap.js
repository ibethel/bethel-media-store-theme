import React, { useContext } from "react";
import { formatMoney } from "../../../helpers/helpers";
import SettingsContext from "../../contexts/SettingsContext";

const CartRecap = props => {
  const { totalPrice } = props;
  const { checkoutButtonText, subtotalTitle, summaryTitle } = useContext(SettingsContext);

  return (
    <div className="cart-recap col-12 col-xl-4">
      <div className="bm-bg-grey-5 px-3 py-4 mb-3 mb-xl-4">
        <h3 className="bm-title mt-0 mb-3 bm-fonts fs-8 fw-bold">{summaryTitle}</h3>

        <hr
          className="mt-0 mb-3 p-0 border-color-grey-10 bm-bg-grey-10"
          style={{ borderStyle: "solid" }}
        />

        <p className="cart-recap__total d-flex justify-content-between m-0 bm-fonts fs-8">
          <span>{subtotalTitle}</span>
          <span className="cart-recap__total-price">{formatMoney(totalPrice)}</span>
        </p>
      </div>

      <button
        className="bm-btn rounded-5 fs-7 col-12 bm-btn--primary bm-btn--large opacity-hover"
        name="checkout"
        type="submit"
      >
        {checkoutButtonText}
      </button>
    </div>
  );
};

export default CartRecap;
