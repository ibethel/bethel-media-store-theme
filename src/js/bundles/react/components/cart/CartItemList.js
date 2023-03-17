import React from "react";
import CartItem from "./cart-item/CartItem";

const CartItemList = props => {
  const { items } = props;

  const renderItems = () => {
    return items.map(item => {
      return <CartItem key={item.key} item={item} />;
    });
  };

  return (
    <ul className="list-type-none ps-0 mt-0 mb-0 border-bottom border-color-grey-10">
      {renderItems()}
    </ul>
  );
};

export default CartItemList;
