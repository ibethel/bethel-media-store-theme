import DOMPurify from "dompurify";
import Swal from "sweetalert2";

import { videoHtml } from "../button-video/video-html";
import { wistiaLoadScript } from "../wistia-video/wistia-video";

const VideoOnLoad = () => {
  const formatYoutubeUrl = (id, settings) => {
    const { autoplay, controls = true, loop } = settings;
    const currentUrl = new URL(`https://www.youtube.com/embed/${id}`);

    const autoPlaySetting = autoplay ? "1" : "0";
    const controlsSetting = controls ? "1" : "0";
    const loopSetting = loop ? "1" : "0";

    currentUrl.searchParams.append("autoplay", autoPlaySetting);
    currentUrl.searchParams.append("controls", controlsSetting);
    currentUrl.searchParams.append("loop", loopSetting);

    if (autoplay) {
      currentUrl.searchParams.append("mute", "1");
    }

    if (loop) {
      currentUrl.searchParams.append("playlist", id);
    }

    return currentUrl.href;
  };

  const formatWistiaUrl = id => `https://bethel-5.wistia.com/medias/${id}`;

  const handleWillOpen = modal => {
    const iframe = modal.querySelector("iframe");
    const video = modal.querySelector("video");

    if (iframe) {
      iframe.src = iframe.dataset.src;
    }

    if (video) {
      const source = video.querySelector("source");

      source && (source.src = source.dataset.src);
    }
  };

  const handleOnLoad = (id, settings, youtube, wistia) => {
    let finalUrl;
    if (youtube) {
      finalUrl = formatYoutubeUrl(id, settings);
    } else if (wistia) {
      finalUrl = formatWistiaUrl(id);
    }

    const videoContent = videoHtml(finalUrl, settings, null, youtube, wistia);
    const html = DOMPurify.sanitize(videoContent, { ADD_TAGS: ["iframe"] });

    if (wistia) {
      wistiaLoadScript();
    }

    Swal.fire({
      customClass: {
        container: "bm-video__modal-container",
        popup: "bm-video__modal-popup",
        htmlContainer: "bm-video__modal-html",
      },
      willOpen: modal => handleWillOpen(modal),
      html: html,
      showCloseButton: true,
      showConfirmButton: false,
    });
  };

  const initiate = () => {
    const params = new URLSearchParams(window.location.search);
    const isYoutube = params.has("youtube_id");
    const isWistia = params.has("wistia_id");
    const autoplay = params.get("autoplay") && true;
    const controls = params.get("controls") && true;
    const interaction = params.get("interaction") && true;
    const loop = params.get("loop") && true;
    const videoSettings = { autoplay, controls, interaction, loop };

    if (isYoutube) {
      handleOnLoad(params.get("youtube_id"), videoSettings, isYoutube, null);
    } else if (isWistia) {
      handleOnLoad(params.get("wistia_id"), videoSettings, null, isWistia);
    }
  };

  initiate();
};

export default VideoOnLoad;
