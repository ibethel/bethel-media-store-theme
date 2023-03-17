import React, { useContext, useState } from "react";
import { isEmpty } from "lodash";
import { changeItemQuantity } from "../../../actions";
import { connect } from "react-redux";

import BmImage from "../../bm-image/BmImage";
import CartItemControls from "./CartItemControls";
import CartItemDiscounts from "./CartItemDiscounts";
import CartItemPricing from "./CartItemPricing";
import CartItemProperties from "./CartItemProperties";
import SettingsContext from "../../../contexts/SettingsContext";

const CartItem = props => {
  const { changeItemQuantity, item } = props;
  const { removeButtonText } = useContext(SettingsContext);
  const [disabled, setDisabled] = useState(false);

  const onRemoveClick = () => {
    setDisabled(true);
    changeItemQuantity(item.key, 0);
    setDisabled(false);
  };

  const renderDiscounts = () => {
    if (!isEmpty(item.discounts)) {
      return <CartItemDiscounts item={item} />;
    }
  };

  const renderProperties = () => {
    if (!isEmpty(item.properties)) {
      return <CartItemProperties item={item} />;
    }
  };

  return (
    <li key={item.key} className="cart-item d-flex border-top border-color-grey-10 py-3">
      <div className="cart-item-image col-4 me-3">
        <BmImage
          image={item.featured_image}
          imageWrapperClasses="bm-img__wrapper--fixed-width"
          imageWidths="180,360"
        />
      </div>

      <div className="cart-item-details col-8">
        <h6 className="bm-title mt-0 mb-3 fs-6">{item.title}</h6>
        <CartItemPricing item={item} />
        <CartItemControls item={item} />
        {renderProperties()}
        {renderDiscounts()}

        <button
          className="bm-btn cart-item__remove opacity-hover bm-btn--link bm-colors-color-grey-50"
          type="button"
          onClick={onRemoveClick}
          disabled={disabled}
        >
          {removeButtonText}
        </button>
      </div>
    </li>
  );
};

export default connect(null, { changeItemQuantity })(CartItem);
