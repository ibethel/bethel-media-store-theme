import { wistiaLoadJsonp } from "../wistia-video/wistia-video";

let currentWistiaVideos = [];

export const handleIframes = video => {
  const iframeDataSrc = video.dataset.src;

  iframeDataSrc && (video.src = iframeDataSrc);
};

export const handleWistiaVideos = video => {
  const videoId = video.dataset.wistiaid;

  if (!currentWistiaVideos.includes(videoId)) {
    currentWistiaVideos = [...currentWistiaVideos, videoId];
    wistiaLoadJsonp(video);
  }
};

export const handleVideos = video => {
  const videoSources = video.querySelectorAll("source");

  videoSources.forEach(source => {
    const dataSrc = source.dataset.src;
    dataSrc && (source.src = dataSrc);
  });

  video.load();
};

export const filterSliderVideos = videos =>
  videos.map(video => video.closest(".splide__slide") && video);

export const filterOutSliderVideos = videos =>
  videos.filter(video => !video.closest(".splide__slide"));
