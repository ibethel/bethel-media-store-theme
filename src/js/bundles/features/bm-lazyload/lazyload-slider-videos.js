import { wistiaLoadScript } from "../wistia-video/wistia-video";
import {
  filterSliderVideos,
  handleIframes,
  handleVideos,
  handleWistiaVideos,
} from "./lazyload-helpers";

const handleVideoIsVisibile = entry => {
  const currentVideo = entry.target;
  const elementIsVideo = currentVideo.nodeName === "VIDEO";
  const elementIsIframe = currentVideo.nodeName === "IFRAME";
  const elementIsWistia = currentVideo.classList.contains("wistia-video");
  const videoDataSet = currentVideo && currentVideo.dataset.settings;
  const videoSettings = elementIsVideo && videoDataSet && JSON.parse(videoDataSet);

  if (elementIsVideo && videoSettings && videoSettings.autoplay) {
    currentVideo.autoplay = true;
    currentVideo.muted = true;
  }

  if (elementIsIframe) {
    handleIframes(currentVideo);
  } else if (elementIsWistia) {
    handleWistiaVideos(currentVideo);
  } else {
    handleVideos(currentVideo);
  }
};

const getSliderVideos = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      handleVideoIsVisibile(entry);

      observer.unobserve(entry.target);
    }
  });
};

const setSliderVideos = slider => {
  let videos = [];
  const videoElements = Array.from(slider.querySelectorAll("video"));
  const videoSliderElements = filterSliderVideos(videoElements);
  const wistiaVideos = Array.from(slider.querySelectorAll(".wistia-video"));
  const wistiaSliderVideos = filterSliderVideos(wistiaVideos);
  const iframes = Array.from(slider.querySelectorAll("iframe"));
  const iframeVideos = iframes.filter(iframe => iframe.dataset.type === "video");
  const iframeSliderVideos = filterSliderVideos(iframeVideos);

  videoElements[0] && (videos = [...videos, ...videoSliderElements]);
  iframeSliderVideos[0] && (videos = [...videos, ...iframeSliderVideos]);

  if (wistiaVideos[0]) {
    videos = [...videos, ...wistiaSliderVideos];
    wistiaLoadScript();
  }

  return videos;
};

export const lazyloadSliderVideos = slider => {
  const sliderVideos = setSliderVideos(slider);

  const options = {
    root: slider,
    rootMargin: "0px",
    threshold: 1,
  };
  const observer = new IntersectionObserver((entries, observer) => {
    if (sliderVideos) {
      getSliderVideos(entries, observer);
    }
  }, options);

  sliderVideos.forEach(video => observer.observe(video));
};
