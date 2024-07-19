import axios from "axios";

const ProductRecommendations = prodRecs => {
  const getRecs = async url => {
    try {
      const res = await axios.get(url);

      const html = document.createElement("div");

      if (!res?.data) return;

      html.innerHTML = res.data;

      if (!html) return;

      const list = html.querySelector(".prod-rec");
      console.log("list", list);
      if (!list) return;

      return list;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error({ error });
      console.log({ error });
    }
  };

  const renderNewRecs = async (url, element) => {
    const list = await getRecs(url);

    if (!element) return;
    if (!list) return;

    console.log("section list", list);

    element.innerHTML = list.innerHTML;
  };

  prodRecs.forEach(prodRec => {
    const url = prodRec.dataset.url;

    if (!url) return;

    renderNewRecs(url, prodRec);
  });
};

export default ProductRecommendations;
