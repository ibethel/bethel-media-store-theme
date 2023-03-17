import { isEmpty } from "lodash";
import React, { useContext } from "react";
import SettingsContext from "../../../contexts/SettingsContext";

const CartItemProperties = props => {
  const { item } = props;
  const { messages } = useContext(SettingsContext);
  const BULK_APPROVED = "bulk_approved";
  const BULK_NOT_APPROVED = "bulk_not_approved";

  const renderBulkOrderProps = (property, key) => {
    const isBulkApproved = property[0] === BULK_APPROVED;
    const isBulkNotApproved = property[0] === BULK_NOT_APPROVED;

    if (isBulkApproved) {
      return (
        <li key={key} className="bm-colors-color-grey-50 bm-fonts fs-8">
          {messages.bulkApproved}
        </li>
      );
    }

    if (isBulkNotApproved) {
      return (
        <li key={key} className="bm-colors-color-grey-50 bm-fonts fs-8">
          {messages.bulkNotApproved}
        </li>
      );
    }
  };

  const handleMessageProps = property => {
    const bulkApprovedProp = property[0] === BULK_APPROVED;
    const bulkNotApprovedProp = property[0] === BULK_NOT_APPROVED;
    const hasBulkOrderMessages = bulkApprovedProp || bulkNotApprovedProp;

    return hasBulkOrderMessages;
  };

  const renderPropertyItem = (property, index) => {
    const key = property[0] + property[1] + index;
    const hasMessageProp = handleMessageProps(property);

    if (item.quantity > 19 && hasMessageProp) {
      return renderBulkOrderProps(property, key);
    }

    return (
      <li key={key} className="bm-colors-color-grey-50 bm-fonts fs-8">
        {property[0]}: {property[1]}
      </li>
    );
  };

  const renderProperties = () => {
    const properties = Object.entries(item.properties);
    const propsWithValues = properties.filter(property => {
      const hasMessageProp = handleMessageProps(property);

      if (item.quantity > 19 && hasMessageProp) {
        return property[1] && property;
      }

      if (hasMessageProp) {
        return false;
      }

      return property[1] && property;
    });

    const availableProperties = propsWithValues.map((property, index) =>
      renderPropertyItem(property, index)
    );

    if (!isEmpty(availableProperties)) {
      return <ul className="list-type-none ps-0 mt-0 mb-3">{availableProperties}</ul>;
    }

    return <div />;
  };

  return renderProperties();
};

export default CartItemProperties;
