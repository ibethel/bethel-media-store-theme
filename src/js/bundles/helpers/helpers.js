import { getCart } from "../utilities/bm-api";
import { bmApiObj } from "../utilities/bm-api-obj";

const bmApi = bmApiObj();

export const updateCartCount = async eagerQty => {
  const cartCounter = Array.from(document.querySelectorAll(".bm-cart-counter"));

  cartCounter.forEach(counter => {
    const currentCount = parseInt(counter.dataset.count);
    const eagerCount = eagerQty + currentCount;

    counter.textContent = counter.dataset.count = eagerCount;
  });

  const res = await getCart();
  const count = res.data.item_count;

  cartCounter.forEach(counter => {
    counter.textContent = counter.dataset.count = count;
  });
};

export const createJSScriptTag = (src, async, defer, id) => {
  const scriptElement = document.createElement("script");
  scriptElement.type = "text/javascript";
  src && (scriptElement.src = src);
  id && (scriptElement.id = id);

  if (async && !defer) {
    scriptElement.async = true;
  }

  if (!async && defer) {
    scriptElement.defer = true;
  }

  return scriptElement;
};

export const formatImageUrl = (url, size) => {
  if (url && url.includes("jpg")) {
    return size ? url.replace(".jpg", `_${size}x.jpg`) : url.replace(".jpg", "_{width}x.jpg");
  } else if (url && url.includes("png")) {
    return size ? url.replace(".png", `_${size}x.png`) : url.replace(".png", "_{width}x.png");
  } else if (url && url.includes("webp")) {
    return size ? url.replace(".webp", `_${size}x.webp`) : url.replace(".webp", "_{width}x.webp");
  } else {
    return url;
  }
};

export const formatMoney = number => {
  const currency = bmApi?.currency;
  const code = currency?.currencyCode;
  const enableCode = currency?.enableCurrencyCode;
  const symbol = currency?.currencySymbol;
  const money = (number / 100).toFixed(2);
  let finalFormat = money;

  if (enableCode) finalFormat += ` ${code}`;

  if (symbol) finalFormat = `${symbol}${finalFormat}`;

  return finalFormat;
};

export const updateUrlParams = (paramsArray, replaceLocation) => {
  const newUrl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    "?" +
    paramsArray.join("&");

  replaceLocation
    ? window.location.replace(newUrl)
    : window.history.replaceState({ path: newUrl }, "", newUrl);
};

export const updateUrlHash = (hash, replaceLocation) => {
  const newUrl =
    window.location.protocol + "//" + window.location.host + window.location.pathname + "#" + hash;

  replaceLocation
    ? window.location.replace(newUrl)
    : window.history.replaceState({ path: newUrl }, "", newUrl);
};
