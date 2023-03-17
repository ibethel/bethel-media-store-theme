import React from "react";

const CartItemDiscounts = props => {
  const { item } = props;

  const renderDiscounts = () => {
    const discounts = item.discounts.map((discount, index) => {
      return (
        <li key={discount.title + index} className="text-success bm-fonts fs-8">
          {discount.title}
        </li>
      );
    });

    if (discounts) {
      return <ul className="list-type-none ps-0 mt-0 mb-3">{discounts}</ul>;
    }

    return <div />;
  };

  return renderDiscounts();
};

export default CartItemDiscounts;
