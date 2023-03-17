// If your looking for lazyloading images. lazysizes is imported in the theme.js.
import isEmpty from "lodash/isEmpty";
import { lazyloadSliderVideos } from "./lazyload-slider-videos";
import { wistiaLoadScript } from "../wistia-video/wistia-video";
import {
  filterOutSliderVideos,
  handleIframes,
  handleVideos,
  handleWistiaVideos,
} from "./lazyload-helpers";

const BMLazyLoad = () => {
  const sliders = Array.from(document.querySelectorAll(".splide"));
  const slidersWithVideos = sliders.filter(slider => !!slider.querySelector(".bm-video"));

  const handleVideoIsVisibile = entry => {
    const currentVideo = entry.target;
    const elementIsVideo = currentVideo.nodeName === "VIDEO";
    const elementIsIframe = currentVideo.nodeName === "IFRAME";
    const elementIsWistia = currentVideo.classList.contains("wistia-video");
    const videoSettings = elementIsVideo && JSON.parse(currentVideo.dataset.settings);

    if (elementIsVideo && videoSettings.autoplay) {
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

  const getVideos = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        handleVideoIsVisibile(entry);

        observer.unobserve(entry.target);
      }
    });
  };

  const setVideos = () => {
    let videos = [];
    const videoElements = Array.from(document.querySelectorAll("video"));
    const videoNotInSlider = filterOutSliderVideos(videoElements);
    const wistiaVideos = Array.from(document.querySelectorAll(".wistia-video"));
    const wistiaNotInSlider = filterOutSliderVideos(wistiaVideos);
    const iframes = Array.from(document.querySelectorAll("iframe"));
    const iframesNotInSlider = filterOutSliderVideos(iframes);
    const iframeVideos = iframesNotInSlider.filter(iframe => iframe.dataset.type === "video");

    videoNotInSlider[0] && (videos = [...videos, ...videoNotInSlider]);
    iframeVideos[0] && (videos = [...videos, ...iframeVideos]);

    if (wistiaNotInSlider[0]) {
      videos = [...videos, ...wistiaNotInSlider];
      wistiaLoadScript();
    }

    return videos;
  };

  const initiateMainObserver = () => {
    const videos = setVideos();

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries, observer) => {
      if (videos) {
        getVideos(entries, observer);
      }
    }, options);

    videos.forEach(video => observer.observe(video));
  };

  const initiateSlidersObservers = () => {
    if (!isEmpty(slidersWithVideos)) {
      slidersWithVideos.forEach(slider => lazyloadSliderVideos(slider));
    }
  };

  const initiate = () => {
    initiateMainObserver();
    initiateSlidersObservers();
  };

  initiate();
};

export default BMLazyLoad;
