// eslint-disable-next-line import/no-unresolved
import "Styles/templates/gift_card.scss";
import { bmApiObj } from "../utilities/bm-api-obj";

const GiftCard = () => {
  const bmApi = bmApiObj();
  const imageAltText = bmApi.giftCards.qrImageAlt;
  const qrCodeElement = document.querySelector(".qr-code");
  const qrIdentifier = qrCodeElement.dataset.identifier;

  document.addEventListener("DOMContentLoaded", function () {
    new QRCode(qrCodeElement, {
      text: qrIdentifier,
      width: 120,
      height: 120,
      imageAltText,
    });
  });
};

document.addEventListener("DOMContentLoaded", GiftCard());
