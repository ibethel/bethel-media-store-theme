const Header = mobileToggle => {
  const mainStickyHeader = document.querySelector(".bm-main-header--sticky");

  const mobileControls = () => {
    const mobileMenuClose = document.querySelector("#mobileMenuClose");
    const bodyLockClass = "body--scroll-locked";

    const toggleMobileMenu = mobileMenu => {
      if (mobileMenu.ariaHidden === "true") {
        mobileMenu.ariaHidden = "false";
        document.body.classList.add(bodyLockClass);
      } else {
        mobileMenu.ariaHidden = "true";
        document.body.classList.remove(bodyLockClass);
      }

      return mobileMenu.ariaHidden;
    };

    const toggleMobileMenuButton = menuIsHidden => {
      const buttonIsExpanded = mobileToggle.ariaExpanded === "true";

      if (buttonIsExpanded && menuIsHidden) {
        mobileToggle.ariaExpanded = "false";
      } else if (!buttonIsExpanded && !menuIsHidden) {
        mobileToggle.ariaExpanded = "true";
      }
    };

    const handleMobileMenu = () => {
      const mobileMenu = document.querySelector("#mobileMenu");
      const mobileMenuStatus = toggleMobileMenu(mobileMenu);
      const menuIsHidden = mobileMenuStatus === "true";

      toggleMobileMenuButton(menuIsHidden);
    };

    mobileToggle.onclick = () => handleMobileMenu();
    mobileMenuClose.onclick = () => handleMobileMenu();
  };

  const showHeader = height => {
    const currentStyles = mainStickyHeader.getAttribute("style");
    const newStyles = "position: fixed;top: 0; width: 100%;z-index: 50;" + currentStyles;
    const stickyPlaceholder = document.querySelector(".bm-main-header__sticky-placeholder");
    mainStickyHeader.setAttribute("style", newStyles);
    stickyPlaceholder.style.marginTop = height + "px";
    window.removeEventListener("scroll", handleSticky);
    mainStickyHeader.classList.add("faded-in-opacity");
  };

  const handleSticky = () => {
    const stickyHeight = mainStickyHeader.offsetHeight;

    if (window.scrollY > stickyHeight + 30) {
      showHeader(stickyHeight);
    }

    if (window.scrollY > stickyHeight - 1) {
      mainStickyHeader.classList.add("fade-in-opacity");
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

    if (mainStickyHeader) {
      document.addEventListener("lazyloaded", handleLogoLoaded);
    }
  };

  mobileControls();
  stickyHeader();
};

export default Header;
