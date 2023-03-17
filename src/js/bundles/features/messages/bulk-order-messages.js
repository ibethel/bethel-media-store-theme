import { bmApiObj } from "../../utilities/bm-api-obj";
import isEmpty from "lodash/isEmpty";

const handleBulkApproved = item => {
  const bmApi = bmApiObj();
  const { bulk_approved } = item.properties;

  return bulk_approved && bulk_approved.includes(bmApi.bulkOrders.bulkOrderApproved.tag);
};

const handleBulkNotApproved = item => {
  const bmApi = bmApiObj();
  const { bulk_not_approved } = item.properties;

  return bulk_not_approved && bulk_not_approved.includes(bmApi.bulkOrders.bulkOrderNotApproved.tag);
};

const renderBulkApprovedMessages = items => {
  const bmApi = bmApiObj();
  const bulkApprovedMessage = bmApi.bulkOrders.bulkOrderApproved.message;

  if (bulkApprovedMessage) {
    return items.map(item => `${item.title} - ${bulkApprovedMessage}`);
  }

  return "";
};

const renderBulkNotApprovedMessages = items => {
  const bmApi = bmApiObj();
  const bulkNotApprovedMessage = bmApi.bulkOrders.bulkOrderNotApproved.message;

  if (bulkNotApprovedMessage) {
    return items.map(item => `${item.title} - ${bulkNotApprovedMessage}`);
  }

  return "";
};

const handleBulkOrderItems = items => {
  let bulkOrderMessages = [];
  const itemsAboveQty20 = items.filter(item => item.quantity > 19);

  if (isEmpty(itemsAboveQty20)) return;

  const bulkApproved = itemsAboveQty20.filter(item => handleBulkApproved(item));
  const bulkNotApproved = itemsAboveQty20.filter(item => handleBulkNotApproved(item));

  if (!isEmpty(bulkApproved)) {
    bulkOrderMessages = [...bulkOrderMessages, ...renderBulkApprovedMessages(bulkApproved)];
  }

  if (!isEmpty(bulkNotApproved)) {
    bulkOrderMessages = [...bulkOrderMessages, ...renderBulkNotApprovedMessages(bulkNotApproved)];
  }

  return bulkOrderMessages;
};

export { handleBulkOrderItems };
