import React, { useContext } from "react";
import DOMPurify from "dompurify/";
import SettingsContext from "../../contexts/SettingsContext";

const CartEmpty = () => {
  const { continueBrowsing, emptyCartText } = useContext(SettingsContext);
  return (
    <div>
      <p className="text-center">{emptyCartText}</p>
      <p
        className="text-center"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(continueBrowsing) }}
      ></p>
    </div>
  );
};

export default CartEmpty;
