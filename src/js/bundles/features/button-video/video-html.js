import { wistiaLoadJsonp } from "../wistia-video/wistia-video";

const iframeHtml = (url, settings) => {
  const { interaction = true } = settings;
  const currentInteraction = interaction ? "" : " pe-none";

  return (
    "<iframe " +
    `class='bm-video__iframe position-absolute top-0 start-0${currentInteraction}' ` +
    "frameborder='0' " +
    "allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' " +
    "allowfullscreen " +
    `data-src='${url}' ` +
    "data-type='video' " +
    "></iframe>"
  );
};

const mp4Html = (url, settings) => {
  const { autoplay, controls = true, interaction = true, loop, thumbnail } = settings;
  const currentAutoPlay = autoplay ? " autoplay muted" : "";
  const currentControls = controls ? " controls" : "";
  const currentInteraction = interaction ? "" : " pe-none";
  const currentLoop = loop ? " loop" : "";
  const currentSettings = `${currentAutoPlay}${currentControls}${currentLoop}`;
  const currentThumbnail = thumbnail ? ` poster="${thumbnail}"` : "";

  return (
    "<video " +
    `class='bm-video__video position-absolute top-0 start-0${currentInteraction}' ` +
    "width='1080' " +
    `height='720'${currentSettings}${currentThumbnail}>` +
    `<source type='video/mp4' data-src='${url}'>` +
    "Your browser does not support the video tag." +
    "</video>"
  );
};

const parseWistiaId = url => {
  const wistiaUrlIsJsonp = url.includes("jsonp");
  const wistiaUrlHasParams = url.includes("?");
  const wistiaIdHalf = url.split("/medias/")[1];
  const wistiaEmbedId = wistiaUrlHasParams ? wistiaIdHalf.split("?")[0] : wistiaIdHalf;
  const wistiaJsonpId = wistiaUrlIsJsonp && wistiaIdHalf.split(".")[0];
  const wistiaId = wistiaJsonpId || wistiaEmbedId;

  wistiaLoadJsonp(null, wistiaId);

  return wistiaId;
};

const wistiaHtml = url => {
  const wistiaUrlRegex = /https?:\/\/[^.]+\.(wistia\.com|wi\.st)\/(medias|embed)\/.*/;
  const wistiaUrlIsValid = wistiaUrlRegex.test(url);
  const wistiaVideoId = wistiaUrlIsValid && parseWistiaId(url);

  return (
    "<div class='wistia-video position-absolute top-0 start-0'" +
    `data-wistiaid='${wistiaVideoId}'>` +
    `<div class='wistia_embed bm-video__wistia wistia_async_${wistiaVideoId}'>` +
    "</div>" +
    "</div>"
  );
};

export const videoHtml = (url, settings, mp4 = false, iframe = false, wistia = false) => {
  const iframeContent = iframe ? iframeHtml(url, settings) : "";
  const mp4Content = mp4 ? mp4Html(url, settings) : "";
  const wistiaContent = wistia ? wistiaHtml(url) : "";
  const videoContent = iframeContent || mp4Content || wistiaContent;

  return (
    "<div class='bm-video pt-4'>" +
    "<div class='bm-video__container'>" +
    "<div class='bm-video__wrapper position-relative'>" +
    videoContent +
    "</div>" +
    "</div>" +
    "</div>"
  );
};
