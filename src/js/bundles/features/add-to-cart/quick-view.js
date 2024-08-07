import { v4 as uuidv4 } from "uuid";
import MicroModal from "micromodal";
import { formatMoney } from "../../helpers/helpers";
import { getProduct } from "../../utilities/bm-api";
import { bmApiObj } from "../../utilities/bm-api-obj";
import { addedHtml } from "./atc-modal-html";
import { changeBtnText, handleItemProperties, handleFormAtc } from "./atc";
import Accordion from "../../components/accordions";

export const quickView = (btns = [], newBtns = []) => {
  const bmApi = bmApiObj();
  const root = window.Shopify.routes.root || "/";

  const handleOnRadioChange = event => {
    const currentElement = event.currentTarget;
    const radio = currentElement.querySelector('[type="radio"]');

    if (radio) radio.checked = true;
  };

  const chevronHtml = () => {
    return (
      "<i class='bm-icon bm-icon__icon-chevron-up d-block'>" +
      "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-up d-block' viewBox='0 0 16 16'>" +
      "<path fill-rule='evenodd' d='M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z'/>" +
      "</svg>" +
      "</i>"
    );
  };

  const modalAccordionHtml = content => {
    const uuid = uuidv4();
    const accordionItem = document.createElement("div");
    const accordionContent = document.createElement("div");
    const accordionMessage = document.createElement("div");
    const accordionButton = document.createElement("button");
    const buttonTitle = document.createElement("h3");
    const chevronContainer = document.createElement("span");
    const chevron = chevronHtml();

    accordionItem.classList.add("accordion-item");
    accordionContent.classList.add("accordion-item__content", "close-accordion");
    accordionMessage.classList.add("bm-message", "mt-0", "mb-0", "pb-2", "mm-modal__readable");
    accordionButton.classList.add(
      "accordion-item__title-button",
      "bm-btn",
      "bm-btn--no-styles",
      "d-flex",
      "align-items-center",
      "justify-content-between",
      "col-12",
      "px-0",
      "py-4",
      "closed-accordion",
      "mm-modal__readable"
    );
    buttonTitle.classList.add(
      "bm-title",
      "mt-0",
      "mb-0",
      "bm-fonts",
      "fs-6",
      "fw-bold",
      "mm-modal__readable"
    );
    chevronContainer.classList.add("d-block");

    accordionContent.ariaHidden = "true";
    accordionContent.id = `accordion-${uuid}`;
    accordionButton.dataset.target = `accordion-${uuid}`;
    accordionButton.type = "button";
    accordionButton.ariaExpanded = "false";
    accordionButton.setAttribute("aria-controls", `accordion-${uuid}`);

    buttonTitle.textContent = bmApi?.text?.description || "Description";

    accordionItem.appendChild(accordionContent);
    accordionItem.appendChild(accordionButton);
    accordionButton.appendChild(buttonTitle);
    accordionButton.appendChild(chevronContainer);
    chevronContainer.innerHTML = chevron;
    accordionContent.appendChild(accordionMessage);
    accordionMessage.innerHTML = content;

    return accordionItem;
  };

  const modalContentHtml = product => {
    const uuid = uuidv4();
    const prdTitle = product?.title;
    const prdHandle = product?.handle;
    const mainImg = product?.media[0];
    const variants = product?.variants;
    const description = product?.description;
    const imgSrc = mainImg?.src;
    const imgAlt = mainImg?.alt || prdTitle;
    const imgWidth = mainImg?.width;
    const imgHeight = mainImg?.height;
    const formId = `${prdHandle}-${uuid}`;
    const container = document.createElement("div");
    const imagesContainer = document.createElement("div");
    const imgWrapper = document.createElement("div");
    const imgRatioBox = document.createElement("div");
    const imgRatioBoxInner = document.createElement("div");
    const detailsContainer = document.createElement("div");
    const titleH3 = document.createElement("h3");
    const img = document.createElement("img");
    const form = document.createElement("form");
    const inputUtf8 = document.createElement("input");
    const inputFormType = document.createElement("input");
    const inputProductId = document.createElement("input");
    const formGroup = document.createElement("div");
    const inputRadiosContainer = document.createElement("div");
    const inputRadioWrapper = document.createElement("div");
    const inputRadioLabel = document.createElement("label");
    const inputRadio = document.createElement("input");
    const addedContainerHtml = document.createElement("div");
    const atcButton = document.createElement("button");
    const viewProductLink = document.createElement("a");
    const atcBtnText = bmApi?.atc?.btn?.text?.start || "Add to bag";
    const descriptionHtml = modalAccordionHtml(description);

    container.classList.add("bm-product-quick-view__container", "row");
    imagesContainer.classList.add(
      "bm-product-quick-view__images",
      "col-12",
      "col-sm-6",
      "mb-3",
      "mb-sm-0"
    );
    imgWrapper.classList.add("bm-product-quick-view__img-wrapper", "w-100");
    imgRatioBox.classList.add("aspect-ratio__box");
    imgRatioBoxInner.classList.add("aspect-ratio__box-inside");
    detailsContainer.classList.add("bm-product-quick-view__details", "col-12", "col-sm-6");
    titleH3.classList.add(
      "bm-product-quick-view__title",
      "mt-0",
      "mb-3",
      "ff-ivypresto",
      "bm-fonts",
      "fs-3",
      "fs-sm-3",
      "fs-xl-3",
      "mm-modal__readable"
    );
    img.classList.add("bm-product-quick-view__img", "h-auto", "w-100");
    form.classList.add("bm-atc-form", "col-12", "mb-1");
    formGroup.classList.add("bm-atc-form__fields", "mb-3");
    inputRadiosContainer.classList.add("bm-atc-form-variants");
    inputRadioWrapper.classList.add(
      "bm-atc-form-variants__radio",
      "rounded-1",
      "cursor-pointer",
      "d-block",
      "px-2",
      "py-3",
      "mb-3"
    );
    inputRadioLabel.classList.add("bm-atc-form__label", "pe-none", "mm-modal__readable");
    inputRadio.classList.add("cursor-pointer");
    addedContainerHtml.classList.add(
      "added-message",
      "d-flex",
      "align-items-center",
      "faded-opacity",
      "faded-opacity-show",
      "mb-2"
    );
    atcButton.classList.add(
      "bm-product-quick-view__atc-btn",
      "bm-btn",
      "d-flex",
      "align-items-center",
      "justify-content-center",
      "rounded-5",
      "bm-fonts",
      "fs-5",
      "col-12",
      "rounded-5",
      "atc__btn",
      "bm-btn--primary",
      "bm-btn--large",
      "opacity-hover",
      "mm-modal__readable"
    );
    viewProductLink.classList.add(
      "d-block",
      "mm-modal__readable",
      "text-center",
      "text-black",
      "mb-3"
    );

    img.src = imgSrc;
    img.alt = imgAlt;
    img.width = imgWidth;
    img.height = imgHeight;
    titleH3.textContent = prdTitle;
    form.id = formId;
    form.method = "post";
    form.action = `${root}cart/add`;
    form.acceptCharset = "UTF-8";
    form.enctype = "multipart/form-data";
    inputUtf8.type = "hidden";
    inputUtf8.name = "utf8";
    inputUtf8.value = "✓";
    inputFormType.type = "hidden";
    inputFormType.name = "form_type";
    inputFormType.value = "product";
    inputProductId.type = "hidden";
    inputProductId.name = "product-id";
    inputProductId.value = product?.id;
    inputRadiosContainer.dataset.handle = prdHandle;
    inputRadio.type = "radio";
    inputRadio.name = "id";
    inputRadio.setAttribute("form", formId);
    atcButton.type = "submit";
    atcButton.textContent = atcBtnText;
    atcButton.dataset.type = "form";
    viewProductLink.href = `${root}products/${prdHandle}`;
    viewProductLink.textContent = "view product";

    addedContainerHtml.innerHTML = addedHtml();
    container.appendChild(imagesContainer);
    container.appendChild(detailsContainer);
    imagesContainer.appendChild(imgWrapper);
    imgWrapper.appendChild(imgRatioBox);
    imgRatioBox.appendChild(imgRatioBoxInner);
    imgRatioBoxInner.appendChild(img);
    detailsContainer.appendChild(titleH3);
    detailsContainer.appendChild(form);
    detailsContainer.appendChild(viewProductLink);
    detailsContainer.appendChild(descriptionHtml);
    form.appendChild(inputUtf8);
    form.appendChild(inputFormType);
    form.appendChild(inputProductId);
    form.appendChild(formGroup);
    form.appendChild(addedContainerHtml);
    form.appendChild(atcButton);
    formGroup.appendChild(inputRadiosContainer);

    if (variants.length > 0) {
      let iteration = 0;

      variants.forEach(variant => {
        const variantUuid = uuidv4();
        const { id, title, available, sku, price } = variant;
        const inputRadioClone = inputRadio.cloneNode();
        const inputRadioLabelClone = inputRadioLabel.cloneNode();
        const inputRadioWrapperClone = inputRadioWrapper.cloneNode();

        inputRadioClone.id = `variant-${id}-${variantUuid}`;
        inputRadioClone.value = id;
        inputRadioClone.disabled = !available;
        inputRadioClone.dataset.sku = sku;
        inputRadioLabelClone.htmlFor = `variant-${id}-${variantUuid}`;
        inputRadioLabelClone.textContent = `${title} - ${formatMoney(price)}`;

        if (available && iteration === 0) {
          iteration++;
          inputRadioClone.checked = true;
        } else {
          inputRadioClone.checked = false;
        }

        if (!available) {
          inputRadioLabelClone.classList.add(
            "text-black",
            "text-opacity-25",
            "text-decoration-line-through"
          );
          inputRadioWrapperClone.classList.add("pe-none");
        }

        inputRadioWrapperClone.appendChild(inputRadioClone);
        inputRadioWrapperClone.appendChild(inputRadioLabelClone);
        inputRadiosContainer.appendChild(inputRadioWrapperClone);
      });
    }

    const allRadioWrappers = Array.from(
      inputRadiosContainer.querySelectorAll(".bm-atc-form-variants__radio")
    );

    allRadioWrappers.forEach(radio => (radio.onclick = handleOnRadioChange));

    Accordion([descriptionHtml]);

    return container;
  };

  const handleModalFormSubmit = async event => {
    event.preventDefault();
    const target = event.currentTarget;
    const modal = target.closest(".mm-modal__container");
    const addedMessage = modal.querySelector(".added-message");
    const btn = target.querySelector('[type="submit"]');
    const originalText = btn.textContent;
    const formData = Array.from(new FormData(target).entries());
    const prodEntry = formData.find(entry => entry[0] === "id");
    const prodVarId = prodEntry && parseInt(prodEntry[1]);
    const itemProps = formData.filter(entry => entry[0].includes("properties"));
    const addingText = bmApi?.atc?.btn?.text?.adding;

    let item = { id: prodVarId, quantity: 1 };

    if (itemProps.length > 0) {
      const properties = handleItemProperties(itemProps);

      item = { ...item, properties };
    }

    const items = prodVarId && {
      items: [item],
    };

    addingText && changeBtnText(btn, addingText);

    if (items?.items?.length > 0) {
      await handleFormAtc(items, btn, originalText, false, false);

      addedMessage.classList.remove("faded-opacity-show");

      setTimeout(() => addedMessage.classList.add("faded-opacity-show"), 1000);
    }
  };

  const handleModalOnShow = (modal, internalContent) => {
    const modalContent = modal.querySelector(".mm-modal-content");

    if (!modalContent) return;
    if (!internalContent) return;

    modalContent.innerHTML = "";
    modalContent.appendChild(internalContent);

    const form = modalContent.querySelector(".bm-atc-form ");

    if (form) {
      form.addEventListener("submit", handleModalFormSubmit);
    }
  };

  const handleQvBtnClick = async event => {
    const target = event.currentTarget;
    const handle = target.dataset.handle;
    const res = await getProduct(handle);
    const internalContent = modalContentHtml(res.data);

    MicroModal.show("quick-view-modal", {
      onShow: modal => handleModalOnShow(modal, internalContent),
    });
  };

  if (btns?.length > 0) {
    btns.forEach(btn => btn.addEventListener("click", handleQvBtnClick));
  }

  if (newBtns?.length > 0) {
    newBtns.forEach(btn => btn.addEventListener("click", handleQvBtnClick));
  }
};
