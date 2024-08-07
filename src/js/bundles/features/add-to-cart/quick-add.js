import { formatMoney } from "../../helpers/helpers";
import { iconCloseHtml } from "../../helpers/icon";

export const quickAddHtml = variants => {
  const container = document.createElement("div");
  const actionOne = document.createElement("div");
  const closeBtn = document.createElement("button");
  const list = document.createElement("ul");
  const option = document.createElement("li");

  container.classList.add(
    "position-absolute",
    "start-0",
    "end-0",
    "bottom-0",
    "d-flex",
    "flex-column",
    "justify-content-end",
    "rounded-1",
    "faded-opacity",
    "faded-opacity-show",
    "px-1",
    "py-2"
  );
  actionOne.classList.add("mb-2");
  list.classList.add("list-type-none", "my-0", "ps-0");
  option.classList.add(
    "bm-atc-form-variants__radio",
    "quick-add-options",
    "rounded-1",
    "text-black",
    "cursor-pointer",
    "d-block",
    "p-1",
    "mb-1"
  );
  closeBtn.classList.add(
    "quick-add-close",
    "bm-btn--no-styles",
    "d-block",
    "ms-auto",
    "cursor-pointer"
  );

  container.style.zIndex = "10";
  container.style.background = "rgba(255, 255, 255, 0.8)";
  closeBtn.type = "button";

  container.focus();
  container.appendChild(actionOne);
  closeBtn.innerHTML = iconCloseHtml("d-block");
  actionOne.appendChild(closeBtn);
  container.appendChild(list);

  variants.forEach((variant, index) => {
    const amount = parseInt(variant.price.replace(".", ""));
    const money = formatMoney(amount);
    option.textContent = `${variant.title} - ${money}`;
    option.dataset.action = "add_to_cart";
    option.dataset.type = "button";
    option.dataset.products = `{"items":[{"id":${variant.id},"quantity":1}]}`;

    if (!variant.available) {
      option.classList.add(
        "disabled",
        "pe-none",
        "text-opacity-25",
        "text-decoration-line-through"
      );
      option.setAttribute("disabled", true);
    } else {
      option.removeAttribute("disabled");
      option.classList.remove(
        "disabled",
        "pe-none",
        "text-opacity-25",
        "text-decoration-line-through"
      );
    }

    list.appendChild(option.cloneNode(true));

    if (index === 0) option.focus();
  });

  return container;
};

export const quickAtc = async (btn, originalText, callback) => {
  const variantsData = btn.dataset.variants;
  const variants = variantsData && JSON.parse(variantsData);
  const quickAddModal = quickAddHtml(variants);

  btn.insertAdjacentElement("beforebegin", quickAddModal);

  const close = quickAddModal.querySelector(".quick-add-close");
  const options = Array.from(quickAddModal.querySelectorAll(".quick-add-options"));

  const handleRemoveQuickAdd = changeText => {
    quickAddModal.classList.add("faded-opacity-show");
    btn.disabled = true;
    setTimeout(() => {
      close.removeEventListener("click", handleRemoveQuickAdd);
      quickAddModal.remove();
      btn.disabled = false;

      if (changeText !== false) btn.textContent = originalText;
    }, 200);
  };

  close.addEventListener("click", handleRemoveQuickAdd);

  const handleOptionClick = async event => {
    const current = event.currentTarget;

    current.classList.add("active");
    await disableOtherOptions(options, current);
    callback(current, btn, originalText);
    handleRemoveQuickAdd(false);
  };

  const disableOtherOptions = async (all, current) => {
    all.forEach(option => {
      if (option !== current) {
        option.classList.remove("active");
        option.classList.add("disabled", "pe-none");
        option.setAttribute("disabled", true);
        option.removeEventListener("click", handleOptionClick);
      }
    });
  };

  options.forEach(option => option.addEventListener("click", handleOptionClick));

  setTimeout(() => quickAddModal.classList.remove("faded-opacity-show"), 200);
};
