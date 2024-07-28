import axios from "axios";
import { bmApiObj } from "../../utilities/bm-api-obj";
import Atc from "../add-to-cart/atc";
import { quickView } from "../add-to-cart/quick-view";

const LoadMore = () => {
  const LOAD_MORE_BTN = "load-more-btn";
  const LOAD_MORE_CTN = "load-more-container";
  const LOADED = "LOADED";
  const LOADING = "LOADING";
  const loadMoreBtn = document.querySelector(`.${LOAD_MORE_BTN}`);
  const btnOriginalText = loadMoreBtn && loadMoreBtn.textContent;
  const loadMoreProducts = document.querySelector(`.${LOAD_MORE_CTN}`);
  const bmApi = bmApiObj();
  let pagesLoaded = [];

  const handleBtnOnClick = ({ currentTarget }) => getNextPage(currentTarget.dataset.next);

  const resetBtn = (btn, text) => {
    const btnTimeout = setTimeout(() => {
      btn.textContent = text;

      clearTimeout(btnTimeout);
    }, 300);
  };

  const addProducts = html => {
    const parser = new DOMParser();
    const virtualDoc = parser.parseFromString(html, "text/html");
    const nextBtn = virtualDoc.querySelector(`.${LOAD_MORE_BTN}`);
    const nextUrl = nextBtn.dataset.next;
    const nextProducts = virtualDoc.querySelector(`.${LOAD_MORE_CTN}`);
    const enableQuickAdd = bmApi?.quickView?.format === "quick_add";
    const enableQuickView = bmApi?.quickView?.format === "quick_view";
    const nextContent = nextProducts.innerHTML;
    const nextPage = nextProducts.dataset.page;

    loadMoreProducts.insertAdjacentHTML("beforeend", nextContent);
    loadMoreBtn.setAttribute("data-next", nextUrl);

    if (enableQuickAdd && !pagesLoaded.includes(nextPage)) {
      const recentAtcBtns = Array.from(
        loadMoreProducts.querySelectorAll(`.bm-prod-item.page-${nextPage} .atc__btn`)
      );

      Atc(null, recentAtcBtns);
    }

    if (enableQuickView && !pagesLoaded.includes(nextPage)) {
      const recentQuickViewBtns = Array.from(
        loadMoreProducts.querySelectorAll(`.bm-prod-item.page-${nextPage} .bm-btn--quick-view`)
      );

      quickView(null, recentQuickViewBtns);
    }

    if (nextPage) pagesLoaded.push(nextPage);

    if (!nextUrl) {
      loadMoreBtn.classList.add("d-none");
      loadMoreBtn.disabled = true;
    }
  };

  const getNextPage = async url => {
    try {
      loadMoreBtn.disabled = true;
      loadMoreBtn.textContent = LOADING;

      const res = await axios.get(url);

      loadMoreBtn.textContent = LOADED;
      loadMoreBtn.disabled = false;
      resetBtn(loadMoreBtn, btnOriginalText);
      addProducts(res.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log({ error });
    }
  };

  if (loadMoreBtn) {
    loadMoreBtn.onclick = handleBtnOnClick;
  }
};

export default LoadMore;
