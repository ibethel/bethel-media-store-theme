import isEmpty from "lodash/isEmpty";
import { bmApiObj } from "../../utilities/bm-api-obj";
import MicroModal from "micromodal";

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

  const wishItemHtml = item => {
    return (
      "<li class='favorites-item d-flex align-items-center bm-bdr-btm border-color-grey-20'>" +
      "<div class='flex-grow-1'>" +
      `<a href=${item.url} class='bm-link opacity-hover text-decoration-none d-block py-3'>` +
      `${item.title}` +
      "</a>" +
      "</div>" +
      "<div>" +
      "<button class='bm-btn d-flex align-items-center justify-content-center rounded-5 px-2 p-1 bm-btn--no-styles opacity-hover bm-btn--wish-remove' type='button' data-remove='true'" +
      `data-product='${JSON.stringify(item)}'>` +
      "<i class='bm-icon bm-icon__icon-chevron-down d-block ms-1'>" +
      "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-x-lg d-block' viewBox='0 0 16 16'>" +
      "<path fill-rule='evenodd' d='M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z'/>" +
      "<path fill-rule='evenodd' d='M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z'/>" +
      "</svg>" +
      "</i>" +
      "</button>" +
      "</div>" +
      "</li>"
    );
  };

  const updateWishCount = qty => {
    const counters = Array.from(document.querySelectorAll(".bm-wish-counter"));

    counters.forEach(counter => (counter.textContent = counter.dataset.count = qty));
  };

  const removeWish = button => {
    const prodData = button.dataset.product;
    const product = prodData && JSON.parse(prodData);
    const favsList = localStorage.getItem("bmgFavoritesList");
    let favs = favsList && JSON.parse(favsList);
    const favsHasProducts = favs && favs.products;
    const favsProdExists = favsHasProducts && favs.products.length > 0;
    const findProduct = product.handle && favsProdExists;
    const removeItem = button.dataset.remove === "true";
    const wishIndex =
      findProduct && favs.products.findIndex(prod => prod.handle === product.handle);

    if (findProduct && !isNaN(wishIndex)) {
      favs.products.splice(wishIndex, 1);
    }

    const wishRemoved = findProduct && !favs.products.find(fav => fav.handle === product.handle);

    if (wishRemoved) {
      localStorage.setItem("bmgFavoritesList", JSON.stringify(favs));
      const newFavsStore = localStorage.getItem("bmgFavoritesList");
      const newFavs = newFavsStore && JSON.parse(newFavsStore);
      const findNewProd = newFavs.products && product.handle;
      const favsUpdated =
        findNewProd && !newFavs.products.find(fav => fav.handle === product.handle);

      button.dataset.wish = false;
      updateWishCount(newFavs.products.length);

      if (favsUpdated) {
        const buttonContent = button.querySelector(".bm-btn__content");

        buttonContent && (buttonContent.innerHTML = starHtml());

        if (removeItem) {
          const favItem = button.closest(".favorites-item");

          favItem.remove();
        }
      }
    }
  };

  const addWish = button => {
    const prodData = button.dataset.product;
    const product = prodData && JSON.parse(prodData);
    const favStore = localStorage.getItem("bmgFavoritesList");

    if (!favStore) {
      let favObj = { products: [] };
      localStorage.setItem("bmgFavoritesList", JSON.stringify(favObj));
    }

    const favsList = localStorage.getItem("bmgFavoritesList");
    let favs = favsList && JSON.parse(favsList);
    const favsHasProducts = favs && favs.products;
    const favsProdExists = favsHasProducts && favs.products.length > 0;
    const findProduct = product.handle && favsProdExists;
    const productInFavs = findProduct && favs.products.find(fav => fav.handle === product.handle);
    const addNewProduct = !productInFavs && favsHasProducts && product;

    if (addNewProduct) {
      favs.products = [...favs.products, product];
    }

    if (favsHasProducts && favs.products.length > 0) {
      localStorage.setItem("bmgFavoritesList", JSON.stringify(favs));
      const newFavsStore = localStorage.getItem("bmgFavoritesList");
      const newFavs = newFavsStore && JSON.parse(newFavsStore);
      const newFavsProductsExist = newFavs.products && newFavs.products.length > 0;
      const findNewProd = newFavsProductsExist && product.handle;
      const newProdInFavs =
        findNewProd && newFavs.products.find(fav => fav.handle === product.handle);

      if (newProdInFavs) {
        const buttonContent = button.querySelector(".bm-btn__content");

        updateWishCount(newFavs.products.length);

        button.dataset.wish = true;
        buttonContent.innerHTML = starFillHtml();
      }
    }
  };

  const onWishClick = event => {
    const button = event.currentTarget;
    const customer = button.dataset.customer === "true";
    const isWish = button.dataset.wish === "true";

    if (!customer) {
      const html = loginHtml();

      MicroModal.show("bm-generic-modal", {
        onShow: modal => {
          const modalContent = modal.querySelector(".mm-modal-content");

          if (modalContent) {
            modalContent.innerHTML = html;
          }
        },
        awaitOpenAnimation: true,
      });
    } else {
      isWish ? removeWish(button) : addWish(button);
    }
  };

  const handleInitialState = (products, buttons) => {
    updateWishCount(products.length ? products.length : 0);

    if (products.length) {
      buttons.forEach(btn => {
        const prodData = btn.dataset.product;
        const prod = prodData && JSON.parse(prodData);
        const product = products.find(fav => fav.handle === prod.handle);

        if (product) {
          const buttonContent = btn.querySelector(".bm-btn__content");

          btn.dataset.wish = true;
          buttonContent.innerHTML = starFillHtml();
        }
      });
    }
  };

  const handleWishSection = (section, favs) => {
    const products = favs.products;

    if (products && products.length > 0) {
      section.classList.remove("d-none");
      products.forEach(product => section.insertAdjacentHTML("beforeend", wishItemHtml(product)));

      const wishRemoveBtns = Array.from(document.querySelectorAll(".bm-btn--wish-remove"));

      !isEmpty(wishRemoveBtns) &&
        wishRemoveBtns.forEach(
          button => (button.onclick = event => removeWish(event.currentTarget))
        );
    }
  };

  const initiate = () => {
    const wishSection = document.querySelector(".bm-account-favorites");
    const wishButtons = Array.from(document.querySelectorAll(".bm-btn--wish"));
    const favsList = localStorage.getItem("bmgFavoritesList");
    let favs = favsList && JSON.parse(favsList);

    if (wishSection && favs) {
      handleWishSection(wishSection, favs);
    }

    if (!isEmpty(wishButtons)) {
      wishButtons.forEach(button => (button.onclick = onWishClick));

      favs && handleInitialState(favs.products, wishButtons);
    }
  };

  initiate();
};

export default WishList;
