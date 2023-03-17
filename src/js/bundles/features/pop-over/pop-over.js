import { isEmpty } from "lodash";

const PopOver = () => {
  // Inspired by bootstrap collapse v5.2 https://getbootstrap.com/docs/5.2/components/accordion/
  const CLASS_NAME_DISPLAYED = "display-show";
  const CLASS_NAME_DISPLAYING = "display-showing";
  const CLASS_NAME_CLOSED_POP_OVER = "closed-pop-over";
  const CLASS_NAME_OPENED_POP_OVER = "opened-pop-over";
  const END_TRANSITION = "endpopovertransition";
  let transitioning = false;

  const dispatchEndTransition = element => element.dispatchEvent(new Event(END_TRANSITION));

  const isDisplayed = element => element.classList.contains(CLASS_NAME_OPENED_POP_OVER);

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
    }, 100);
  };

  const togglePopOver = content => {
    if (isDisplayed(content)) {
      hidePopOver(content);
    } else {
      showPopOver(content);
    }
  };

  const hidePopOver = content => {
    const transitionDisplay = content.classList.contains("display-toggle");

    if (transitioning || !isDisplayed(content)) {
      return;
    }

    if (transitionDisplay) {
      content.classList.remove(CLASS_NAME_OPENED_POP_OVER);
    } else {
      content.classList.remove(CLASS_NAME_OPENED_POP_OVER);
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

  const showPopOver = content => {
    const transitionDisplay = content.classList.contains("display-toggle");

    if (transitioning || isDisplayed(content)) {
      return;
    }

    if (transitionDisplay) {
      content.classList.add(CLASS_NAME_DISPLAYING);
      content.classList.add(CLASS_NAME_DISPLAYED);
    } else {
      content.classList.add(CLASS_NAME_OPENED_POP_OVER);
    }

    toggleAriaAndClasses(content, true);

    if (transitionDisplay) {
      transitioning = true;

      const complete = () => {
        transitioning = false;
        content.classList.remove(CLASS_NAME_DISPLAYING);
        content.classList.add(CLASS_NAME_OPENED_POP_OVER);
      };

      waitTransition(complete, content, true);
    }
  };

  const toggleAriaAndClasses = (content, isOpen) => {
    if (!content) {
      return;
    }

    const buttons = Array.from(document.querySelectorAll(`[data-target="${content.id}"]`));

    buttons.forEach(button => {
      button.classList.toggle(CLASS_NAME_CLOSED_POP_OVER, !isOpen);
      button.setAttribute("aria-expanded", isOpen);
    });

    content.setAttribute("aria-hidden", !isOpen);
  };

  const onClickHandler = event => {
    event.preventDefault();
    const currentButton = event.currentTarget;
    const currentContent = document.querySelector(`#${currentButton.dataset.target}`);

    togglePopOver(currentContent);
  };

  const initiate = () => {
    const popOverBtns = Array.from(document.querySelectorAll(".pop-over-btn"));

    if (!isEmpty(popOverBtns)) {
      popOverBtns.forEach(btn => btn && (btn.onclick = onClickHandler));
    }
  };

  initiate();
};

export default PopOver;
