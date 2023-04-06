import _ from "lodash";
import axios from "axios";

const PredictiveSearch = searches => {
  const TIMEOUT = 500;
  const PREDICTIVE_SEARCH = "bm-predictive-search";
  const PREDICTIVE_SEARCH_MODAL = "bm-predictive-search-modal";
  const PREDICTIVE_SEARCH_SECTION = "shopify-section-predictive-search";
  let outsideEvent = false;

  const handleOutsideClick = event => {
    const target = event.target;
    const search = target.closest(`.${PREDICTIVE_SEARCH}`);
    const isInSearch = !!search || target.classList.contains(PREDICTIVE_SEARCH);
    const modals = Array.from(document.querySelectorAll(`.${PREDICTIVE_SEARCH_MODAL}`));

    if (!isInSearch) {
      modals.length > 0 && modals.forEach(modal => (modal.innerHTML = ""));

      document.body.removeEventListener("click", handleOutsideClick);
      outsideEvent = false;
    }
  };

  const getSearchData = async (term, modal) => {
    const url = `/search/suggest?q=${term}&section_id=predictive-search`;

    try {
      const response = await axios.get(url);

      const sectionData = new DOMParser().parseFromString(response.data, "text/html");
      const section = sectionData.querySelector(`#${PREDICTIVE_SEARCH_SECTION}`);

      modal.innerHTML = section.innerHTML;
    } catch (error) {
      console.log({ error });
    }
  };

  const handleOnInputChange = async event => {
    const input = event.target;
    const search = input.closest(`.${PREDICTIVE_SEARCH}`);
    const modal = search.querySelector(`.${PREDICTIVE_SEARCH_MODAL}`);

    if (!outsideEvent) {
      document.body.addEventListener("click", handleOutsideClick);
      outsideEvent = true;
    }

    if (input.value) {
      getSearchData(input.value, modal);
    } else {
      modal.innerHTML = "";
    }
  };

  const initiate = () => {
    searches.forEach(search => {
      const form = search.querySelector("form");
      const input = form.querySelector('input[type="search"]');

      input.addEventListener("input", _.debounce(handleOnInputChange, TIMEOUT, { leading: true }));
    });
  };

  initiate();
};

export default PredictiveSearch;
