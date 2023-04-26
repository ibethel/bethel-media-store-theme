import { Splide } from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import isEmpty from "lodash/isEmpty";

const handleBreakPoints = breakpoints => {
  const arrowPhone = breakpoints.phone.arrows;
  const arrowTablet = breakpoints.tablet.arrows;
  const arrowDesk = breakpoints.desk.arrows;
  const arrowsBreaks = arrowPhone || arrowTablet || arrowDesk;
  const paddingPhoneRight = breakpoints.phone.padding.right;
  const paddingTabletRight = breakpoints.tablet.padding.right;
  const paddingDeskRight = breakpoints.desk.padding.right;
  const paddingBreaks = paddingPhoneRight || paddingTabletRight || paddingDeskRight;
  const perPagePhone = breakpoints.phone.perPage;
  const perPageTablet = breakpoints.tablet.perPage;
  const perPageDesk = breakpoints.desk.perPage;
  const perPageBreaks = perPagePhone || perPageTablet || perPageDesk;
  const returnBreakPoints = arrowsBreaks || paddingBreaks || perPageBreaks;
  let breakPoints = {};

  if (perPagePhone || paddingPhoneRight) {
    let phoneBreakPoint = {};

    if (arrowPhone === false || arrowPhone) {
      phoneBreakPoint = { ...phoneBreakPoint, arrows: arrowPhone };
    }

    paddingPhoneRight &&
      (phoneBreakPoint = { ...phoneBreakPoint, padding: { right: paddingPhoneRight } });
    perPagePhone && (phoneBreakPoint = { ...phoneBreakPoint, perPage: perPagePhone });

    breakPoints = { ...breakPoints, 576: phoneBreakPoint };
  }

  if (perPageTablet || paddingTabletRight) {
    let tabletBreakPoint = {};

    if (arrowTablet === false || arrowTablet) {
      tabletBreakPoint = { ...tabletBreakPoint, arrows: arrowTablet };
    }

    paddingTabletRight &&
      (tabletBreakPoint = { ...tabletBreakPoint, padding: { right: paddingTabletRight } });
    perPageTablet && (tabletBreakPoint = { ...tabletBreakPoint, perPage: perPageTablet });

    breakPoints = { ...breakPoints, 1200: tabletBreakPoint };
  }

  if (perPageDesk || paddingDeskRight) {
    let deskBreakPoint = {};

    if (arrowDesk === false || arrowDesk) {
      deskBreakPoint = { ...deskBreakPoint, arrows: arrowDesk };
    }

    paddingDeskRight &&
      (deskBreakPoint = { ...deskBreakPoint, padding: { right: paddingDeskRight } });
    perPageDesk && (deskBreakPoint = { ...deskBreakPoint, perPage: perPageDesk });
    breakPoints = { ...breakPoints, 1500: deskBreakPoint };
  }

  if (returnBreakPoints) {
    return breakPoints;
  }
};

const formatSliderOptions = settings => {
  const sliderSettings = settings && JSON.parse(settings);
  const {
    arrows = true,
    autoplay = false,
    autoScroll = false,
    breakpoints,
    drag,
    gap,
    rewind = true,
    speed = 2,
    interval = 3,
    isNavigation,
    padding,
    pagination = true,
    perMove,
    perPage,
  } = sliderSettings;

  let options = { arrows, noDrag: ".no-drag", pagination };

  if (autoplay) {
    options = { ...options, autoplay, interval: interval || 5000 };
  }

  if (autoScroll) {
    options = { ...options, autoScroll: { speed: speed || 2 }, focus: "center" };
  }

  if (breakpoints) {
    const breakPoints = handleBreakPoints(breakpoints);

    if (breakPoints) {
      options = { ...options, breakpoints: breakPoints };
    }
  }

  if (drag === false) {
    options = { ...options, drag };
  }

  if (gap) {
    options = { ...options, gap };
  }

  if (isNavigation) {
    options = { ...options, isNavigation };
  }

  if (padding) {
    const paddingRight = padding.right;

    paddingRight && (options = { ...options, padding: { right: paddingRight } });
  }

  if (perMove) {
    options = { ...options, perMove };
  }

  if (perPage) {
    options = { ...options, perPage };
  }

  if (rewind) {
    options = { ...options, rewind };
  }

  return options;
};

const goToVariantSlide = (variantId, slider, slides) => {
  const prodVarElement = document.querySelector(".product-data");
  const prodVarData = JSON.parse(prodVarElement.textContent);
  const productVariant = prodVarData.variants.find(variant => variant.id === variantId);

  if (productVariant.featured_media) {
    const variantSlide = slides.find(
      slide => parseInt(slide.dataset.mediaid) === productVariant.featured_media.id
    );

    const variantSlideNumber = parseInt(variantSlide.id.split("-")[1].replace("slide", "")) - 1;

    slider.go(variantSlideNumber);
  }
};

export const startSlider = element => {
  const currentSettings = element && element.dataset.settings;
  const options = formatSliderOptions(currentSettings);
  const slide = new Splide(element, options);

  if (!isEmpty(options.autoScroll)) {
    slide.mount({ AutoScroll });
  } else {
    slide.mount();
  }
};

export const startGallerySliders = element => {
  const thumbPrimary = element.querySelector(".bm-thumbnail-gallery__primary");
  const thumbPrimarySlider = thumbPrimary && thumbPrimary.querySelector(".splide");
  const thumbSecondary = element.querySelector(".bm-thumbnail-gallery__secondary");
  const thumbSecondarySlider = thumbSecondary && thumbSecondary.querySelector(".splide");
  const syncSliders = thumbPrimarySlider && thumbSecondarySlider;

  if (syncSliders) {
    const primarySettings = thumbPrimarySlider && thumbPrimarySlider.dataset.settings;
    const parsedPrimarySettings = primarySettings && JSON.parse(primarySettings);
    const primaryOptions = formatSliderOptions(primarySettings);
    const primary = new Splide(thumbPrimarySlider, primaryOptions);
    const secondarySettings = thumbSecondarySlider && thumbSecondarySlider.dataset.settings;
    const secondaryOptions = formatSliderOptions(secondarySettings);
    const secondary = new Splide(thumbSecondarySlider, secondaryOptions);
    const primarySlides = Array.from(thumbPrimarySlider.querySelectorAll(".splide__slide"));
    const params = new URLSearchParams(window.location.search);
    const currentUrlVariant = params && parseInt(params.get("variant"));

    primary.sync(secondary);
    primary.mount();
    secondary.mount();

    if (parsedPrimarySettings.changeVariantImage) {
      document.addEventListener("variantchanged", event => {
        const currentSelectedVariantId = parseInt(event.target.value);

        goToVariantSlide(currentSelectedVariantId, primary, primarySlides);
      });
    }

    if (currentUrlVariant) {
      goToVariantSlide(currentUrlVariant, primary, primarySlides);
    }
  }
};
