import { isEmpty } from "lodash";

const MainNavHoverOpen = () => {
  // Inspired by bootstrap collapse v5.2 https://getbootstrap.com/docs/5.2/components/accordion/
  const CLASS_NAME_DISPLAYED = "display-flex-show";
  const CLASS_NAME_DISPLAYING = "display-flex-showing";
  const CLASS_NAME_CLOSED_HOVER_OPEN = "closed-hover-open";
  const CLASS_NAME_OPENED_HOVER_OPEN = "opened-drop-open";
  const mainNavList = document.querySelector(".navigation__list--main");
  const managementMenu = document.querySelector(".management-menu--desk .management-menu");

  const isDisplayed = element => element.classList.contains(CLASS_NAME_OPENED_HOVER_OPEN);

  const closeAllOtherButtons = button => {
    const navList = button.closest("ul");
    const buttons = Array.from(navList.querySelectorAll(".hover-open-button"));
    const allOtherButtons = buttons.filter(btn => btn.id !== button.id);

    allOtherButtons.forEach(btn => {
      const content = document.querySelector(`#${btn.dataset.target}`);

      hideDropOpen(content);
    });
  };

  const hoverOutsideNav = button => {
    const handleMouseLeave = event => {
      const currentContent = document.querySelector(`#${event.target.dataset.target}`);

      hideDropOpen(currentContent);

      event.target.removeEventListener("mouseleave", handleMouseLeave);
    };

    button.addEventListener("mouseleave", handleMouseLeave);
  };

  const hideDropOpen = content => {
    const transitionDisplay = content.classList.contains("display-flex-toggle");

    if (!isDisplayed(content)) {
      return;
    }

    if (transitionDisplay) {
      content.classList.add(CLASS_NAME_DISPLAYING);
      content.classList.remove(CLASS_NAME_OPENED_HOVER_OPEN);
    } else {
      content.classList.remove(CLASS_NAME_OPENED_HOVER_OPEN);
    }

    toggleAriaAndClasses(content, false);

    content.classList.remove(CLASS_NAME_DISPLAYED);
    content.classList.remove(CLASS_NAME_DISPLAYING);
  };

  const showDropOpen = content => {
    const button = document.querySelector(`[data-target=${content.id}]`);
    const transitionDisplay = content.classList.contains("display-flex-toggle");

    if (isDisplayed(content)) {
      return;
    }

    if (transitionDisplay) {
      content.classList.add(CLASS_NAME_DISPLAYING);
      content.classList.add(CLASS_NAME_DISPLAYED);
    } else {
      content.classList.add(CLASS_NAME_OPENED_HOVER_OPEN);
    }

    hoverOutsideNav(button);

    toggleAriaAndClasses(content, true);

    content.classList.remove(CLASS_NAME_DISPLAYING);
    content.classList.add(CLASS_NAME_OPENED_HOVER_OPEN);

    closeAllOtherButtons(button);
  };

  const toggleAriaAndClasses = (content, isOpen) => {
    if (!content) {
      return;
    }

    const button = document.querySelector(`[data-target="${content.id}"]`);

    button.classList.toggle(CLASS_NAME_CLOSED_HOVER_OPEN, !isOpen);
    button.setAttribute("aria-expanded", isOpen);
    content.setAttribute("aria-hidden", !isOpen);
  };

  const buttonEnterHandler = event => {
    event.preventDefault();
    const currentButton = event.currentTarget;
    const currentContent = document.querySelector(`#${currentButton.dataset.target}`);

    showDropOpen(currentContent);
  };

  const initiate = () => {
    const mainHoverBtns = Array.from(mainNavList.querySelectorAll(".hover-open-button"));
    const managementHoverBtns = Array.from(managementMenu.querySelectorAll(".hover-open-button"));

    if (!isEmpty(mainHoverBtns)) {
      mainHoverBtns.forEach(btn => btn && (btn.onmouseenter = buttonEnterHandler));
    }

    if (!isEmpty(managementHoverBtns)) {
      managementHoverBtns.forEach(btn => btn && (btn.onmouseenter = buttonEnterHandler));
    }
  };

  initiate();
};

export default MainNavHoverOpen;
