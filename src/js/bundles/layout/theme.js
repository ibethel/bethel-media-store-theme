// eslint-disable-next-line import/no-unresolved
import "Styles/layout/theme.scss";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "lazysizes";
import "lazysizes/plugins/rias/ls.rias";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import "lazysizes/plugins/optimumx/ls.optimumx";

import _ from "lodash";
import { startGallerySliders, startSlider } from "../features/sliders/sliders";
import { bmApiObj } from "../utilities/bm-api-obj";

import Accordion from "../components/accordions";
import Atc from "../features/add-to-cart/atc";
import BMLazyLoad from "../features/bm-lazyload/bm-lazyload";
import BtvHeader from "../global/btv-header";
import ButtonVideo from "../features/button-video/button-video";
import DropOpen from "../features/drop-open/drop-open";
import Header from "../global/header";
import ImageZoomFeature from "../features/image-zoom/image-zoom";
import LoadMore from "../features/load-more/load-more";
import MainNavHoverOpen from "../features/hover-open/hover-open";
import NewsLetter from "../features/newsletter/newsletter";
import PopOver from "../features/pop-over/pop-over";
import PredictiveSearch from "../features/predictive-search/predictive-search";
import ProductRecommendations from "../features/product-recommendations/product-recommendations";
import ScrollTo from "../features/scroll-to/scroll-to";
import SidebarSlider from "../features/sidebar-slider/sidebar-slider";
import VideoOnLoad from "../features/video-on-load/video-on-load";
import WishList from "../features/wist-list/wish-list";

const accordionComponent = () => {
  const accordion = document.querySelector(".accordion-item");

  if (accordion) {
    Accordion();
  }
};

const announcementBarSection = () => {
  const announcementBar = document.querySelector(".announcement-bar");
  const announcementBarSlider = announcementBar && announcementBar.querySelector(".splide");

  if (announcementBarSlider) {
    startSlider(announcementBarSlider);
  }
};

const addToCartFeature = () => {
  const atcBtn = document.querySelector(".atc__btn");

  if (atcBtn) {
    Atc();
  }
};

const bannerItemRowSliders = () => {
  const bannerItemRows = Array.from(document.querySelectorAll(".banner-item-rows-carousel"));

  if (!_.isEmpty(bannerItemRows)) {
    bannerItemRows.forEach(bannerItemRow => {
      const bannerItemRowSlider = bannerItemRow && bannerItemRow.querySelector(".splide");

      bannerItemRowSlider && startSlider(bannerItemRowSlider);
    });
  }
};

const btvHeaderSection = () => {
  const btvHeader = document.querySelector(".btv-header__section");

  if (btvHeader) {
    BtvHeader();
  }
};

const buttonVideoFeature = () => {
  const btnVideo = document.querySelector(".bm-btn__video");

  if (btnVideo) {
    ButtonVideo();
  }
};

const bannerSliderSection = () => {
  const bannersSliders = Array.from(document.querySelectorAll(".banner-slider"));

  if (!_.isEmpty(bannersSliders)) {
    bannersSliders.forEach(bannerSlider => {
      const bannerSliderSlider = bannerSlider && bannerSlider.querySelector(".splide");

      bannerSliderSlider && startSlider(bannerSliderSlider);
    });
  }
};

const customItemRowSliders = () => {
  const customItemRows = Array.from(document.querySelectorAll(".custom-item-rows-carousel"));

  if (!_.isEmpty(customItemRows)) {
    customItemRows.forEach(customItemRow => {
      const customItemRowSlider = customItemRow && customItemRow.querySelector(".splide");

      customItemRowSlider && startSlider(customItemRowSlider);
    });
  }
};

const dropOpenFeature = () => {
  const dropOpen = document.querySelector(".drop-open-button");

  if (dropOpen) {
    DropOpen();
  }
};

const bmLazyLoadFeature = () => {
  const videos = document.querySelector(".bm-video");

  if (videos) {
    BMLazyLoad();
  }
};

const headerSection = () => {
  const mobileToggle = document.querySelector("#mobileToggle");

  if (mobileToggle) {
    Header(mobileToggle);
  }
};

const imageZoomFeature = () => {
  const imageZoom = document.querySelector(".bm-image--zoom");

  if (imageZoom) {
    ImageZoomFeature();
  }
};

const loadMoreFeature = () => {
  const loadMore = document.querySelector(".load-more-container");

  if (loadMore) {
    LoadMore();
  }
};

const mainNavHoverOpenFeature = () => {
  const mainNavList = document.querySelector(".navigation__list--main");
  const hoverOpen = mainNavList.querySelector(".hover-open-button");

  if (hoverOpen) {
    MainNavHoverOpen();
  }
};

const newsletterFeature = () => {
  const newsLetterButtons = document.querySelectorAll(".bm-newsletter-button");

  if (newsLetterButtons) {
    NewsLetter(newsLetterButtons);
  }
};

const productRowSliders = () => {
  const productRows = Array.from(document.querySelectorAll(".product-rows-carousel"));

  if (!_.isEmpty(productRows)) {
    productRows.forEach(productRow => {
      const productRowSlider = productRow && productRow.querySelector(".splide");

      productRowSlider && startSlider(productRowSlider);
    });
  }
};

const popOverFeature = () => {
  const popOver = document.querySelector(".bm-slide-right");

  if (popOver) {
    PopOver();
  }
};

const productRecommendationsFeature = () => {
  const prodRecs = Array.from(document.querySelectorAll(".prod-rec"));

  if (!prodRecs.length > 0) return false;

  ProductRecommendations(prodRecs);
};

const predictiveSearchFeature = () => {
  const searches = Array.from(document.querySelectorAll(".bm-predictive-search"));

  if (searches.length > 0) PredictiveSearch(searches);
};

const scrollToFeature = () => {
  const hideScroll = document.querySelector(".bm-hide-scroll");

  if (hideScroll) {
    ScrollTo();
  }
};

const sideBarSliderFeature = () => {
  const sideBarSlider = document.querySelector(".sidebar-slide__button");

  if (sideBarSlider) {
    SidebarSlider();
  }
};

const thumbnailGallery = () => {
  const thumbGallery = Array.from(document.querySelectorAll(".bm-thumbnail-gallery"));

  if (!_.isEmpty(thumbGallery)) {
    thumbGallery.forEach(gallery => startGallerySliders(gallery));
  }
};

const videoSliders = () => {
  const videoCarousels = Array.from(document.querySelectorAll(".video-carousel"));

  if (!_.isEmpty(videoCarousels)) {
    videoCarousels.forEach(videoCarousel => {
      const videoCarouselSlider = videoCarousel && videoCarousel.querySelector(".splide");

      videoCarouselSlider && startSlider(videoCarouselSlider);
    });
  }
};

const wishListFeature = () => {
  const { wishList } = bmApiObj();

  if (wishList.enableWishList) {
    WishList();
  }
};

window.addEventListener("DOMContentLoaded", () => {
  accordionComponent();
  announcementBarSection();
  addToCartFeature();
  bannerItemRowSliders();
  buttonVideoFeature();
  btvHeaderSection();
  bannerSliderSection();
  bmLazyLoadFeature();
  customItemRowSliders();
  dropOpenFeature();
  headerSection();
  imageZoomFeature();
  loadMoreFeature();
  mainNavHoverOpenFeature();
  newsletterFeature();
  productRecommendationsFeature();
  productRowSliders();
  popOverFeature();
  predictiveSearchFeature();
  scrollToFeature();
  sideBarSliderFeature();
  thumbnailGallery();
  VideoOnLoad();
  videoSliders();
  wishListFeature();
});
