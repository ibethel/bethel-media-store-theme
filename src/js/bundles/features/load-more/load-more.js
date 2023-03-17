import axios from "axios";

const LoadMore = () => {
  const LOAD_MORE_BTN = "load-more-btn";
  const LOAD_MORE_CTN = "load-more-container";
  const LOADED = "LOADED";
  const LOADING = "LOADING";
  const loadMoreBtn = document.querySelector(`.${LOAD_MORE_BTN}`);
  const btnOriginalText = loadMoreBtn && loadMoreBtn.textContent;
  const loadMoreProducts = document.querySelector(`.${LOAD_MORE_CTN}`);

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

    loadMoreProducts.insertAdjacentHTML("beforeend", nextProducts.innerHTML);
    loadMoreBtn.setAttribute("data-next", nextUrl);

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
