import isEmpty from "lodash/isEmpty";
import { bmApiObj } from "../../utilities/bm-api-obj";
import { formatImageUrl, formatMoney } from "../../helpers/helpers";
import { handleBulkOrderItems } from "../messages/bulk-order-messages";

const atcModalImage = item => {
  const image = item.featured_image;

  return (
    "<div class='bm-img__wrapper bm-img__wrapper--fixed-width'>" +
    "<img" +
    ` alt='${image.alt}'` +
    " class='bm-img d-block lazyload'" +
    ` data-src='${formatImageUrl(image.url)}'` +
    " data-widths='[180,360]'" +
    ` data-aspectratio='${image.aspect_ratio}'` +
    " data-sizes='auto'" +
    " data-optimumx='1.3'" +
    ` height='${image.height}'` +
    ` src='${formatImageUrl(image.url, 1)}'` +
    " tabIndex='-1'" +
    ` width='${image.width}'` +
    "/>" +
    "</div>"
  );
};

const renderContainerClasses = showCompare => (showCompare ? " d-flex align-items-center" : "");

const renderItemPriceClasses = showCompare => (showCompare ? " me-2 text-danger" : "");

const renderSalePriceText = showCompare => {
  const bmApi = bmApiObj();
  const itemSalePriceText = bmApi.cartPage.copy.sale_price;

  if (showCompare) {
    return `<span class="visually-hidden">${itemSalePriceText}</span>`;
  }

  return "";
};

const renderComparePrice = showCompare => {
  const bmApi = bmApiObj();
  const itemRegularPriceText = bmApi.cartPage.copy.regular_price;

  if (showCompare) {
    return (
      "<div className='bm-atc-modal__pricing-price-compare-container'>" +
      `<span className='visually-hidden'>${itemRegularPriceText}</span>` +
      "<s className='bm-atc-modal__pricing-price-compare text-muted d-block bm-fonts fs-8'>" +
      formatMoney(item.original_price) +
      "</s>" +
      "</div>"
    );
  }

  return "";
};

const atcModalPricing = item => {
  const showCompare = item.original_price !== item.final_price;

  return (
    "<div class='bm-atc-modal__pricing mb-3'>" +
    "<div class='bm-atc-modal__pricing-container'>" +
    `<div class='bm-atc-modal__pricing-price-container${renderContainerClasses(showCompare)}` +
    "'>" +
    renderSalePriceText(showCompare) +
    `<span class='bm-atc-modal__pricing-price d-block bm-colors-color-grey-50 bm-fonts fs-8${renderItemPriceClasses(
      showCompare
    )}` +
    "'>" +
    formatMoney(item.final_price) +
    "</span>" +
    "</div>" +
    renderComparePrice(showCompare) +
    "</div>" +
    "</div>"
  );
};

const atcModalDetails = item => {
  return (
    "<div class='bm-atc-modal__details col-8'>" +
    `<h6 class='bm-title mt-0 mb-3 fs-6'>${item.title}</h6>` +
    atcModalPricing(item) +
    "</div>"
  );
};

const atcModalActions = () => {
  return (
    "<div class='bm-atc-modal__actions row align-items-center justify-content-between'>" +
    "<div class='button-block mb-2 mb-sm-0 col-12 col-sm-6'>" +
    "<a href='/cart' class='bm-btn d-flex align-items-center justify-content-center rounded-5 bm-newsletter-button rounded-5 bm-btn--primary bm-btn--large opacity-hover col-12' type='button'>" +
    "<span class='bm-btn__wrapper d-flex align-items-center justify-content-center'>" +
    "<span class='bm-btn__content d-block'>View Bag</span>" +
    "</span>" +
    "</a>" +
    "</div>" +
    "<div class='button-block col-12 col-sm-6'>" +
    "<a href='/checkout' class='bm-btn d-flex align-items-center justify-content-center rounded-5 bm-newsletter-button rounded-5 bm-btn--primary bm-btn--large opacity-hover col-12' type='button'>" +
    "<span class='bm-btn__wrapper d-flex align-items-center justify-content-center'>" +
    "<span class='bm-btn__content d-block'>Checkout</span>" +
    "</span>" +
    "</a>" +
    "</div>" +
    "</div>"
  );
};

const atcModalConfirmation = () => {
  const bmApi = bmApiObj();

  return (
    "<div class='bm-atc-modal__confirmation mb-3 d-flex align-items-center'>" +
    "<span class='d-block me-1'>" +
    "<i class='bm-icon bm-icon__icon-star d-block'>" +
    "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-check-circle-fill d-block bm-icon__size--regular bm-colors-color-brown' viewBox='0 0 16 16'>" +
    "<path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z'></path>" +
    "</svg>" +
    "</i>" +
    "</span>" +
    "<span class='d-block'>" +
    `${bmApi.atc.btn.text.added}` +
    "</span>" +
    "</div>"
  );
};

const atcModalMessages = messages => {
  if (isEmpty(messages)) {
    return "<div class='bm-atc-modal__messages'></div>";
  }

  const messageItems = messages
    .map(message => {
      return "<p class='mt-0 mb-3 fs-6'>" + message + "</p>";
    })
    .join("");

  return (
    "<div class='bm-atc-modal__messages'>" +
    "<p class='mt-0 mb-3 fs-6'>" +
    messageItems +
    "</p>" +
    "</div>"
  );
};

const atcModalItemsHtml = items => {
  const itemsHtml = items.map(item => {
    return (
      `<div class='bm-atc-modal__product row mb-3 mb-sm-5' data-handle='${item.handle}'>` +
      "<div class='bm-atc-modal__image col-4'>" +
      atcModalImage(item) +
      "</div>" +
      atcModalDetails(item) +
      "</div>"
    );
  });

  return itemsHtml.join("");
};

const handleAtcMessageFlow = items => {
  let messages = [];
  const bulkOrderMessages = handleBulkOrderItems(items);

  if (!isEmpty(bulkOrderMessages)) {
    messages = [...messages, ...bulkOrderMessages];
  }

  return messages;
};

export const atcModalHtml = (items, product) => {
  const messages = handleAtcMessageFlow(items, product);

  return (
    "<div class='bm-atc-modal p-3'>" +
    atcModalConfirmation() +
    atcModalMessages(messages) +
    "<div class='bm-atc-modal__wrapper'>" +
    atcModalItemsHtml(items) +
    atcModalActions() +
    "</div>" +
    "</div>"
  );
};
