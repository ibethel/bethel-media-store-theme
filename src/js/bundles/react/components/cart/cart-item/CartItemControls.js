import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { changeItemQuantity } from "../../../actions";
import SettingsContext from "../../../contexts/SettingsContext";

const CartItemControls = props => {
  const { changeItemQuantity, item } = props;
  const { itemQtyLabel } = useContext(SettingsContext);
  const [disabled, setDisabled] = useState(false);
  const [qty, setQty] = useState(item.quantity);

  const onInputChange = async event => {
    setQty(parseInt(event.target.value));
    setDisabled(true);
  };

  const onQtyChange = quantity => {
    setDisabled(true);
    setQty(quantity);
  };

  useEffect(async () => {
    if (disabled && qty >= 0) {
      await changeItemQuantity(item.key, qty);

      setDisabled(false);
    } else {
      setDisabled(false);
      setQty(item.quantity);
    }
  }, [qty]);

  return (
    <div className="cart-item-qty d-flex align-items-center mb-3">
      <label htmlFor={item.key} className="d-block bm-colors-color-grey-50 bm-fonts fs-8 me-2">
        {itemQtyLabel}
      </label>

      <div className="cart-item-qty__controls d-flex align-items-center border border-color-grey-10">
        <button
          className="bm-btn cart-change-qty cart-minus bm-btn--no-styles p-2"
          onClick={() => onQtyChange(item.quantity - 1)}
          type="button"
          disabled={disabled}
        >
          <i className="bm-icon d-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-dash d-block bm-icon__size--small"
              viewBox="0 0 16 16"
            >
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg>
          </i>
        </button>

        <input
          className="cart-item__input d-block border-0 p-2 text-center"
          type="number"
          name="updates[]"
          id={item.key}
          value={qty}
          min="0"
          onChange={onInputChange}
          disabled={disabled}
        />

        <button
          className="bm-btn cart-change-qty cart-minus bm-btn--no-styles p-2"
          onClick={() => onQtyChange(item.quantity + 1)}
          type="button"
          disabled={disabled}
        >
          <i className="bm-icon d-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus d-block bm-icon__size--small"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </i>
        </button>
      </div>
    </div>
  );
};

export default connect(null, { changeItemQuantity })(CartItemControls);
