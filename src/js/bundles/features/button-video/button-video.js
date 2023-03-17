import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import { videoHtml } from "./video-html";
import { wistiaLoadScript } from "../wistia-video/wistia-video";

const ButtonVideo = () => {
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

  const handleDidOpen = modal => {
    const iframe = modal.querySelector("iframe");
    const video = modal.querySelector("video");
    const wistia = modal.querySelector(".wistia-video");

    if (iframe) {
      iframe.focus();
    }

    if (video) {
      video.focus();
    }

    if (wistia) {
      Swal.getFocusableElements().forEach(element => element.blur());
    }
  };

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

  const handleOnClick = event => {
    const currentButton = event.currentTarget;
    const currentSettings = currentButton.dataset.settings;
    const videoSettings = currentSettings && JSON.parse(currentSettings);
    const isMp4 = currentButton.dataset.video === "mp4";
    const isYoutube = currentButton.dataset.video === "youtube";
    const isWistia = currentButton.dataset.video === "wistia";
    const videoUrl = currentButton.dataset.videourl;
    const youtubeUrl = formatYoutubeUrl(videoUrl, videoSettings);
    const finalUrl = isYoutube ? youtubeUrl : videoUrl;
    const videoContent = videoHtml(finalUrl, videoSettings, isMp4, isYoutube, isWistia);
    const html = DOMPurify.sanitize(videoContent, { ADD_TAGS: ["iframe"] });

    if (isWistia) {
      wistiaLoadScript();
    }

    Swal.fire({
      customClass: {
        container: "bm-video__modal-container",
        popup: "bm-video__modal-popup",
        htmlContainer: "bm-video__modal-html",
      },
      didOpen: modal => handleDidOpen(modal),
      willOpen: modal => handleWillOpen(modal),
      html: html,
      showCloseButton: true,
      showConfirmButton: false,
    });
  };

  const initiate = () => {
    const btnVideos = Array.from(document.querySelectorAll(".bm-btn__video"));

    btnVideos.forEach(button => (button.onclick = handleOnClick));
  };

  initiate();
};

export default ButtonVideo;
