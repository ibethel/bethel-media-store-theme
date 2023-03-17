import isEmpty from "lodash/isEmpty";
import Swal from "sweetalert2";
import { bmApiObj } from "../../utilities/bm-api-obj";

const WishList = () => {
  const starHtml = () => {
    return (
      "<i class='bm-icon bm-icon__icon-star d-block'>" +
      "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-star d-block bm-icon__size--regular text-white' viewBox='0 0 16 16'>" +
      "<path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z'></path>" +
      "</svg>" +
      "</i>"
    );
  };

  const starFillHtml = () => {
    return (
      "<i class='bm-icon bm-icon__icon-star-fill d-block'>" +
      "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-star-fill d-block bm-icon__size--regular text-white' viewBox='0 0 16 16'>" +
      "<path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z'></path>" +
      "</svg>" +
      "</i>"
    );
  };

  const loginHtml = () => {
    const { wishList } = bmApiObj();

    return (
      "<div class='px-3 py-5 text-center'>" +
      "<p class='bm-message mt-0 mb-0'>" +
      wishList.noCustomerHtml +
      "</p>" +
      "</div>"
    );
  };

  const updateWishCount = qty => {
    const counters = Array.from(document.querySelectorAll(".bm-wish-counter"));

    counters.forEach(counter => (counter.textContent = counter.dataset.count = qty));
  };

  const removeWish = button => {
    const handle = button.dataset.handle;
    const removeItem = button.dataset.remove === "true";
    const favorites = CF.customer.get("favorites_list");
    const wishIndex = favorites.indexOf(handle);
    let currentFavs = [];

    if (!isEmpty(favorites)) {
      currentFavs = [...currentFavs, ...favorites];
    }

    if (!isEmpty(currentFavs)) {
      currentFavs.splice(wishIndex, 1);
    }

    const wishRemoved = !currentFavs.includes(handle);

    if (wishRemoved) {
      CF.customer.set("favorites_list", currentFavs);
      const newFavs = CF.customer.get("favorites_list");
      const favsUpdated = !newFavs.includes(handle);

      button.dataset.wish = false;
      updateWishCount(newFavs.length);

      if (favsUpdated) {
        const favoritesList = { favorites_list: newFavs };
        const buttonContent = button.querySelector(".bm-btn__content");

        buttonContent.innerHTML = starHtml();

        CF.customer
          .update(favoritesList)
          .then(() => {
            if (removeItem) {
              const favItem = button.closest(".favorites-item");

              favItem.remove();
            }
          })
          .catch(error => console.log({ error }));
      }
    }
  };

  const addWish = button => {
    const handle = button.dataset.handle;
    const favorites = CF.customer.get("favorites_list");
    let currentFavs = [];

    if (!isEmpty(favorites)) {
      currentFavs = [...currentFavs, ...favorites];
    }

    if (handle) {
      currentFavs = [...currentFavs, handle];
    }

    if (!isEmpty(currentFavs)) {
      CF.customer.set("favorites_list", currentFavs);
      const newFavs = CF.customer.get("favorites_list");
      const favsUpdated = newFavs.includes(handle);

      button.dataset.wish = true;
      updateWishCount(newFavs.length);

      if (favsUpdated) {
        const favoritesList = { favorites_list: newFavs };
        const buttonContent = button.querySelector(".bm-btn__content");

        buttonContent.innerHTML = starFillHtml();

        CF.customer.update(favoritesList).catch(error => console.log({ error }));
      }
    }
  };

  const onWishClick = event => {
    const button = event.currentTarget;
    const customer = button.dataset.customer === "true";
    const isWish = button.dataset.wish === "true";

    if (!customer) {
      const html = loginHtml();

      Swal.fire({
        html,
        showCloseButton: true,
        showConfirmButton: false,
      });
    } else {
      if (isWish) {
        removeWish(button);
      } else {
        addWish(button);
      }
    }
  };

  const onRemoveClick = event => {
    const button = event.currentTarget;

    removeWish(button);
  };

  const onCustomerReady = () => {
    const wishButtons = Array.from(document.querySelectorAll(".bm-btn--wish"));
    const wishRemoveBtns = Array.from(document.querySelectorAll(".bm-btn--wish-remove"));

    if (!isEmpty(wishButtons)) {
      wishButtons.forEach(button => (button.onclick = onWishClick));
    }

    if (!isEmpty(wishRemoveBtns)) {
      wishRemoveBtns.forEach(button => (button.onclick = onRemoveClick));
    }
  };

  const initiate = () => {
    if (CF) {
      CF.customerReady(() => onCustomerReady());
    }
  };

  initiate();
};

export default WishList;
