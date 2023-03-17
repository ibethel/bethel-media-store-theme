import isEmpty from "lodash/isEmpty";
import { addToCart } from "../../utilities/bm-api";
import { bmApiObj } from "../../utilities/bm-api-obj";
import { updateUrlParams } from "../../helpers/helpers";
import { atcModalHtml } from "./atc-modal-html";
import { klaviyoAtc } from "../third-party-apps/klaviyo/klaviyo-atc";
import Swal from "sweetalert2";

const Atc = () => {
  const bmApi = bmApiObj();
  const variantChangeEvent = new Event("variantchanged", { bubbles: true });

  const changeBtnText = (btn, text) => {
    const btnContent = btn.querySelector(".bm-btn__content");

    if (btnContent) {
      btnContent.textContent = text && text.trim();
    } else {
      btn && (btn.textContent = text && text.trim());
    }
  };

  const resetBtn = (btn, text) => {
    const btnTimeout = setTimeout(() => {
      changeBtnText(btn, text);

      clearTimeout(btnTimeout);
    }, 300);
  };

  const getVariantWithOptions = (options, variants) => {
    const variant = variants.find(variant => {
      const optionResult = options.map((option, index) => variant.options[index] === option);

      return !optionResult.includes(false);
    });

    return variant;
  };

  const handleBtnAtc = async (btn, originalText, redirect) => {
    const btnItems = JSON.parse(btn.dataset.products);
    const addedText = !isEmpty(bmApi) && bmApi.atc.btn.text.added;

    const res = await addToCart(btnItems);

    if (!isEmpty(res)) {
      const html = atcModalHtml(res.items);

      if (!isEmpty(bmApi) && bmApi.klaviyo.enableAtc) {
        klaviyoAtc();
      }

      Swal.fire({
        didOpen: modal => {
          const cartButton = modal.querySelector('[href="/cart"');
          cartButton.focus();
        },
        html,
        showCloseButton: true,
        showConfirmButton: false,
      });

      addedText && !redirect && changeBtnText(btn, addedText);
      redirect && window.location.replace(redirect);
    }

    !redirect && resetBtn(btn, originalText);
  };

  const handleFormAtc = async (data, btn, originalText, redirect) => {
    const addedText = !isEmpty(bmApi) && bmApi.atc.btn.text.added;
    const prodElement = document.querySelector(".product-data");
    const prodData = JSON.parse(prodElement.textContent);

    const res = await addToCart(data);

    if (!isEmpty(res)) {
      const html = atcModalHtml(res.items, prodData);

      if (!isEmpty(bmApi) && bmApi.klaviyo.enableAtc) {
        klaviyoAtc();
      }

      Swal.fire({
        didOpen: modal => {
          const cartButton = modal.querySelector('[href="/cart"');
          cartButton.focus();
        },
        html,
        showCloseButton: true,
        showConfirmButton: false,
      });

      addedText && !redirect && changeBtnText(btn, addedText);
      redirect && window.location.replace(redirect);
    }

    !redirect && resetBtn(btn, originalText);
  };

  const handleSelectOptions = (input, optionsElement, variants) => {
    const currentSelects = Array.from(optionsElement.querySelectorAll("select"));
    const currentOptions = currentSelects.map(select => select.value);
    const variantSelected = getVariantWithOptions(currentOptions, variants);
    const form = optionsElement.closest(".bm-atc-form");
    const btn = form.querySelector('[type="submit"]');

    if (variantSelected.available) {
      updateUrlParams([`variant=${variantSelected.id}`]);
      input.value = variantSelected.id;
      btn.disabled = null;
      btn.classList.remove("disabled");
      changeBtnText(btn, !isEmpty(bmApi) && bmApi.atc.btn.text.start);
    } else {
      btn.disabled = true;
      btn.classList.add("disabled");
      changeBtnText(btn, !isEmpty(bmApi) && bmApi.atc.btn.text.unavailable);
    }
  };

  const handleRadioOptions = (input, optionsElement, variants) => {
    const currentRadios = Array.from(optionsElement.querySelectorAll('[type="radio"]'));
    const checkedRadios = currentRadios.filter(radio => radio.checked);
    const currentOptions = checkedRadios.map(radio => radio.value);
    const variantSelected = getVariantWithOptions(currentOptions, variants);
    const form = optionsElement.closest(".bm-atc-form");
    const btn = form.querySelector('[type="submit"]');

    if (variantSelected.available) {
      updateUrlParams([`variant=${variantSelected.id}`]);
      input.value = variantSelected.id;
      btn.disabled = null;
      btn.classList.remove("disabled");
      changeBtnText(btn, !isEmpty(bmApi) && bmApi.atc.btn.text.start);
    } else {
      btn.disabled = true;
      btn.classList.add("disabled");
      changeBtnText(btn, !isEmpty(bmApi) && bmApi.atc.btn.text.unavailable);
    }
  };

  const handleOnOptionChange = event => {
    const currentElement = event.currentTarget;
    const currentFormOptions = currentElement.closest(".bm-atc-form-options");
    const isSelect = currentElement.tagName.toLowerCase() === "select";
    const isRadio = currentElement.type === "radio";
    const varIdInput = currentFormOptions.querySelector('[name="id"');
    const prodVarElement = document.querySelector(".product-data");
    const prodVarData = JSON.parse(prodVarElement.textContent);

    if (isSelect) {
      handleSelectOptions(varIdInput, currentFormOptions, prodVarData.variants);
      currentElement.dispatchEvent(variantChangeEvent);
    }

    if (isRadio) {
      handleRadioOptions(varIdInput, currentFormOptions, prodVarData.variants);
      currentElement.dispatchEvent(variantChangeEvent);
    }
  };

  const handleOnVarSelectorChange = event => {
    const currentElement = event.currentTarget;
    const isSelect = currentElement.tagName.toLowerCase() === "select";
    const isRadio = currentElement.type === "radio";
    const isRadioButton = currentElement.classList.contains("bm-atc-form-variants__radio");

    if (isSelect) {
      updateUrlParams([`variant=${currentElement.value}`]);
      currentElement.dispatchEvent(variantChangeEvent);
    }

    if (isRadio) {
      updateUrlParams([`variant=${currentElement.value}`]);
      currentElement.dispatchEvent(variantChangeEvent);
    }

    if (isRadioButton) {
      const radio = currentElement.querySelector('[type="radio"]');
      radio.checked = true;
      updateUrlParams([`variant=${radio.value}`]);
      radio.dispatchEvent(variantChangeEvent);
    }
  };

  const handleOptionFlow = form => {
    const formOptions = form.querySelector(".bm-atc-form-options");

    if (formOptions) {
      const optionRadios = Array.from(formOptions.querySelectorAll('[type="radio"]'));
      const optionSelects = Array.from(formOptions.querySelectorAll("select"));

      if (!isEmpty(optionRadios)) {
        optionRadios.forEach(radio => (radio.onclick = handleOnOptionChange));
      }

      if (!isEmpty(optionSelects)) {
        optionSelects.forEach(select => (select.onchange = handleOnOptionChange));
      }
    }
  };

  const handleVarSelectFlow = form => {
    const formVarSelectors = form.querySelector(".bm-atc-form-variants");

    if (formVarSelectors) {
      const selectorRadios = Array.from(formVarSelectors.querySelectorAll('[type="radio"]'));
      const radioButtons = Array.from(
        formVarSelectors.querySelectorAll(".bm-atc-form-variants__radio")
      );
      const selectorSelect = formVarSelectors.querySelector("select");

      if (!isEmpty(radioButtons)) {
        radioButtons.forEach(radio => (radio.onclick = handleOnVarSelectorChange));
      } else if (!isEmpty(selectorRadios)) {
        selectorRadios.forEach(radio => (radio.onclick = handleOnVarSelectorChange));
      }

      if (!isEmpty(selectorSelect)) {
        selectorSelect.onchange = handleOnVarSelectorChange;
      }
    }
  };

  const handleBtnAtcFlow = (btn, originalText) => {
    const isBuyNow = btn.dataset.action === "buy_now";

    if (isBuyNow) {
      const redirectPath = window.location.origin + "/checkout";

      handleBtnAtc(btn, originalText, redirectPath);
    } else {
      handleBtnAtc(btn, originalText);
    }
  };

  const handleItemProperties = properties => {
    let obj = {};
    properties.forEach(prop => {
      if (prop[1]) {
        // eslint-disable-next-line no-useless-escape
        const parsePropertyFields = /[\[\]]|(\bproperties\b)/g;
        const name = prop[0].replace(parsePropertyFields, "");

        obj = { ...obj, [name]: prop[1] };
      }
    });

    return obj;
  };

  const handleFormBtn = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.textContent;
    const formData = Array.from(new FormData(form).entries());
    const prodEntry = formData.find(entry => entry[0] === "id");
    const prodVarId = prodEntry && parseInt(prodEntry[1]);
    const itemProps = formData.filter(entry => entry[0].includes("properties"));
    const isBuyNow = btn.dataset.action === "buy_now";
    const addingText = !isEmpty(bmApi) && bmApi.atc.btn.text.adding;
    const buyNowText = !isEmpty(bmApi) && bmApi.atc.btn.text.buyNow;
    const textToChange = isBuyNow ? buyNowText : addingText;
    let item = {
      id: prodVarId,
      quantity: 1,
    };

    if (!isEmpty(itemProps)) {
      const properties = handleItemProperties(itemProps);

      !isEmpty(properties) && (item = { ...item, properties });
    }

    const items = prodVarId && {
      items: [item],
    };

    addingText && changeBtnText(btn, textToChange);

    if (!isEmpty(items)) {
      handleFormAtc(items, btn, originalText, false);
    }
  };

  const handleAtcBtn = event => {
    const btn = event.currentTarget;
    const originalText = btn.textContent;
    const isBuyNow = btn.dataset.action === "buy_now";
    const addingText = !isEmpty(bmApi) && bmApi.atc.btn.text.adding;
    const buyNowText = !isEmpty(bmApi) && bmApi.atc.btn.text.buyNow;
    const textToChange = isBuyNow ? buyNowText : addingText;

    addingText && changeBtnText(btn, textToChange);

    handleBtnAtcFlow(btn, originalText);
  };

  const handleFormFlow = btn => {
    const isFormBtn = btn.dataset.type === "form";
    const isAtcBtn = btn.dataset.type === "button";
    const {
      products: { enableAtcAjax },
    } = bmApi;

    if (isFormBtn) {
      const form = btn.closest(".bm-atc-form");
      const hasOptSelector = form.querySelector(".bm-atc-form-options");
      const hasVarSelector = form.querySelector(".bm-atc-form-variants");

      enableAtcAjax && (form.onsubmit = handleFormBtn);

      if (hasVarSelector) {
        handleVarSelectFlow(form);
      }

      if (hasOptSelector) {
        handleOptionFlow(form);
      }
    }

    if (isAtcBtn) {
      btn.onclick = handleAtcBtn;
    }
  };

  const findAllAtcBtns = () => {
    const atcBtns = Array.from(document.querySelectorAll(".atc__btn"));

    atcBtns.forEach(btn => handleFormFlow(btn));
  };

  findAllAtcBtns();
};

export default Atc;
