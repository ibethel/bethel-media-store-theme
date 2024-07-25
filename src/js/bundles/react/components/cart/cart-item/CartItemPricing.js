import React, { useContext, useEffect, useState } from "react";
import { formatMoney } from "../../../../helpers/helpers";
import SettingsContext from "../../../contexts/SettingsContext";

const CartItemPricing = props => {
  const { item } = props;
  const [showCompare, setShowCompare] = useState(false);
  const { currency, itemSalePriceText, itemRegularPriceText } = useContext(SettingsContext);

  useEffect(() => {
    if (item.original_price !== item.final_price) {
      setShowCompare(true);
    }
  }, []);

  const renderContainerClasses = () => (showCompare ? " d-flex align-items-center" : "");

  const renderItemPriceClasses = () => (showCompare ? " me-2 text-danger" : "");

  const renderComparePrice = () => {
    if (showCompare) {
      return (
        <div className="cart-item-pricing__price-compare-container">
          <span className="visually-hidden">{itemRegularPriceText}</span>
          <s className="cart-item-pricing__price-compare text-muted d-block bm-fonts fs-8">
            {formatMoney(item.original_line_price)}
          </s>
        </div>
      );
    }
  };

  const renderSalePriceText = () => {
    if (showCompare) {
      return <span className="visually-hidden">{itemSalePriceText}</span>;
    }
  };

  return (
    <div className="cart-item-pricing mb-3">
      <div className={`cart-item-pricing__container${renderContainerClasses()}`}>
        <div className="cart-item-pricing__price-container">
          {renderSalePriceText()}

          <span
            className={`cart-item-pricing__price d-block bm-colors-color-grey-50 bm-fonts fs-8${renderItemPriceClasses()}`}
          >
            {formatMoney(item.final_line_price)}
          </span>
        </div>

        {renderComparePrice()}
      </div>
    </div>
  );
};

export default CartItemPricing;
