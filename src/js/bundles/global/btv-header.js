const BtvHeader = () => {
  const btvStickyHeader = document.querySelector(".btv-main-header--sticky");
  const mainStickyHeader = document.querySelector(".bm-main-header--sticky");

  const handleSticky = () => {
    const stickyPlaceholder = document.querySelector(".bm-main-header__sticky-placeholder");
    const stickyHeight = btvStickyHeader.offsetHeight;
    const currentStyles = btvStickyHeader.getAttribute("style");
    const newStyles = "position: fixed;top: 0; width: 100%;z-index: 50;" + currentStyles;

    if (window.scrollY > stickyHeight) {
      btvStickyHeader.classList.add("fade-in-opacity");
    }

    if (window.scrollY > stickyHeight + 50) {
      btvStickyHeader.setAttribute("style", newStyles);
      stickyPlaceholder.style.paddingTop = stickyHeight + "px";
      window.removeEventListener("scroll", handleSticky);
      btvStickyHeader.classList.add("faded-in-opacity");
    }
  };

  const stickyHeader = () => {
    const handleLogoLoaded = event => {
      const logoImageLoaded = event.target.classList.contains("bm-logo__image");

      if (logoImageLoaded) {
        window.addEventListener("scroll", handleSticky);
        window.removeEventListener("lazyloaded", handleLogoLoaded);
      }
    };

    if (btvStickyHeader) {
      document.addEventListener("lazyloaded", handleLogoLoaded);
    }
  };

  if (btvStickyHeader && !mainStickyHeader) {
    stickyHeader();
  }
};

export default BtvHeader;
