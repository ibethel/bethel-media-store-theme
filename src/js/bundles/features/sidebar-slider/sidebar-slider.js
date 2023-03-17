const SidebarSlider = () => {
  const BODY_LOCK_CLASS = "body--scroll-locked";
  const CLASS_NAME_HIDE_SIDEBAR = "sidebar-slide-hide";
  const CLASS_NAME_SHOW_SIDEBAR = "sidebar-slide-show";
  const sideBarBtns = Array.from(document.querySelectorAll(".sidebar-slide__button"));
  const showScrollLock = true;

  const isDisplayed = element => element.classList.contains(CLASS_NAME_SHOW_SIDEBAR);

  const toggleSideBar = content => {
    if (isDisplayed(content)) {
      hideSideBar(content);
    } else {
      showSideBar(content);
    }
  };

  const hideSideBar = content => {
    if (!isDisplayed(content)) {
      return;
    }

    content.classList.remove(CLASS_NAME_SHOW_SIDEBAR);

    if (showScrollLock) {
      document.body.classList.remove(BODY_LOCK_CLASS);
    }

    toggleAriaAndClasses(content, false);
  };

  const showSideBar = content => {
    if (isDisplayed(content)) {
      return;
    }

    content.classList.add(CLASS_NAME_SHOW_SIDEBAR);

    if (showScrollLock) {
      document.body.classList.add(BODY_LOCK_CLASS);
    }

    toggleAriaAndClasses(content, true);
  };

  const toggleAriaAndClasses = (content, isOpen) => {
    if (!content) {
      return;
    }

    const buttons = document.querySelectorAll(`[data-target="${content.id}"]`);

    buttons.forEach(button => {
      button.classList.toggle(CLASS_NAME_HIDE_SIDEBAR, !isOpen);
      button.setAttribute("aria-expanded", isOpen);
    });

    content.setAttribute("aria-hidden", !isOpen);
  };

  const buttonClickHandler = (event) => {
    event.stopPropagation();
    const currentButton = event.currentTarget;
    const currentContent = document.querySelector(`#${currentButton.dataset.target}`);

    toggleSideBar(currentContent);
  };

  const initiate = () => {
    if (sideBarBtns) {
      sideBarBtns.forEach(btn => btn && (btn.onclick = buttonClickHandler));
    }
  };

  initiate();
};

export default SidebarSlider;
