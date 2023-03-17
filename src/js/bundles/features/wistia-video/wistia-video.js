import { createJSScriptTag } from "../../helpers/helpers";

const wistiaLoadJsonp = (video, id) => {
  const videoId = video ? video.dataset.wistiaid : id;
  const mediaJsonpUrl = `https://fast.wistia.com/embed/medias/${videoId}.jsonp`;
  const scriptId = `wistia-video--${videoId}`;
  const videoJsonpExists = document.getElementById(scriptId);

  if (!videoJsonpExists) {
    const mediaJsonp = createJSScriptTag(mediaJsonpUrl, true, false, scriptId);

    document.body.appendChild(mediaJsonp);
  }
};

const wistiaLoadScript = () => {
  const mainScriptExists = document.getElementById("wistia-video__main-script");

  if (!mainScriptExists) {
    const wistiaMainScriptUrl = "https://fast.wistia.com/assets/external/E-v1.js";

    const wistiaMainScript = createJSScriptTag(
      wistiaMainScriptUrl,
      true,
      false,
      "wistia-video__main-script"
    );

    document.body.appendChild(wistiaMainScript);
  }
};

export { wistiaLoadJsonp, wistiaLoadScript };
