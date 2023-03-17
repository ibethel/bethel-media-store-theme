const DropOpen = () => {
  // Inspired by bootstrap collapse v5.2 https://getbootstrap.com/docs/5.2/components/accordion/
  const CLASS_NAME_DISPLAYED = "display-show";
  const CLASS_NAME_DISPLAYING = "display-showing";
  const CLASS_NAME_CLOSED_DROP_OPEN = "closed-drop-open";
  const CLASS_NAME_OPENED_DROP_OPEN = "opened-drop-open";
  const END_TRANSITION = "enddisplaytransition";
  const dropOpenBtns = Array.from(document.querySelectorAll(".drop-open-button"));
  let transitioning = false;

  const dispatchEndTransition = element => element.dispatchEvent(new Event(END_TRANSITION));

  const isDisplayed = element => element.classList.contains(CLASS_NAME_OPENED_DROP_OPEN);

  const waitTransition = (callback, content, wait = true) => {
    if (!wait) {
      callback();
      return;
    }

    let handlerCalled = false;

    const handleEndTransition = ({ target }) => {
      if (target !== content) {
        return;
      }

      handlerCalled = true;
      content.removeEventListener(END_TRANSITION, handleEndTransition);
      callback();
    };

    content.addEventListener(END_TRANSITION, handleEndTransition);

    setTimeout(() => {
      if (!handlerCalled) {
        dispatchEndTransition(content);
      }
    }, 50);
  };

  const closeAllOtherButtons = button => {
    const navList = button.closest("ul");
    const buttons = Array.from(navList.querySelectorAll(".drop-open-button"));
    const allOtherButtons = buttons.filter(btn => btn.id !== button.id);

    allOtherButtons.forEach(btn => {
      const content = document.querySelector(`#${btn.dataset.target}`);

      hideDropOpen(content);
    });
  };

  const toggleDropOpen = content => {
    if (isDisplayed(content)) {
      hideDropOpen(content);
    } else {
      showDropOpen(content);
    }
  };

  const hideDropOpen = content => {
    const transitionDisplay = content.classList.contains("display-toggle");

    if (transitioning || !isDisplayed(content)) {
      return;
    }

    if (transitionDisplay) {
      content.classList.add(CLASS_NAME_DISPLAYING);
      content.classList.remove(CLASS_NAME_OPENED_DROP_OPEN);
    } else {
      content.classList.remove(CLASS_NAME_OPENED_DROP_OPEN);
    }

    toggleAriaAndClasses(content, false);

    if (transitionDisplay) {
      transitioning = true;

      const complete = () => {
        transitioning = false;
        content.classList.remove(CLASS_NAME_DISPLAYED);
        content.classList.remove(CLASS_NAME_DISPLAYING);
      };

      waitTransition(complete, content, true);
    }
  };

  const showDropOpen = content => {
    const button = document.querySelector(`[data-target=${content.id}]`);
    const isNav = button.dataset.nav === "true";
    const transitionDisplay = content.classList.contains("display-toggle");

    if (transitioning || isDisplayed(content)) {
      return;
    }

    if (transitionDisplay) {
      content.classList.add(CLASS_NAME_DISPLAYING);
      content.classList.add(CLASS_NAME_DISPLAYED);
    } else {
      content.classList.add(CLASS_NAME_OPENED_DROP_OPEN);
    }

    toggleAriaAndClasses(content, true);

    if (transitionDisplay) {
      transitioning = true;

      const complete = () => {
        transitioning = false;
        content.classList.remove(CLASS_NAME_DISPLAYING);
        content.classList.add(CLASS_NAME_OPENED_DROP_OPEN);

        if (isNav) {
          closeAllOtherButtons(button);
        }
      };

      waitTransition(complete, content, true);
    }
  };

  const toggleAriaAndClasses = (content, isOpen) => {
    if (!content) {
      return;
    }

    const button = document.querySelector(`[data-target="${content.id}"]`);

    button.classList.toggle(CLASS_NAME_CLOSED_DROP_OPEN, !isOpen);
    button.setAttribute("aria-expanded", isOpen);
    content.setAttribute("aria-hidden", !isOpen);
  };

  const buttonClickHandler = event => {
    event.preventDefault();
    const currentButton = event.currentTarget;
    const currentContent = document.querySelector(`#${currentButton.dataset.target}`);

    toggleDropOpen(currentContent);
  };

  const initiate = () => {
    if (dropOpenBtns) {
      dropOpenBtns.forEach(btn => btn && (btn.onclick = buttonClickHandler));
    }
  };

  initiate();
};

export default DropOpen;
