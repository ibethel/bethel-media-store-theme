const Accordion = (externalAccordions = []) => {
  // Inspired by bootstrap collapse v5.2 https://getbootstrap.com/docs/5.2/components/accordion/
  const CLASS_NAME_CLOSE_ACCORDION = "close-accordion";
  const CLASS_NAME_CLOSING_ACCORDION = "closing-accordion";
  const CLASS_NAME_CLOSING_PEAK_ACCORDION = "closing-peak-accordion";
  const CLASS_NAME_CLOSED_ACCORDION = "closed-accordion";
  const CLASS_NAME_PEAK_ACCORDION = "peak-accordion";
  const CLASS_NAME_DISPLAY_ACCORDION = "display-accordion";
  const CLASS_NAME_PEAK_ITEM = "accordion-item__peak";
  const END_TRANSITION = "endtransition";
  const accordions = Array.from(document.querySelectorAll(".accordion-item"));
  let transitioning = false;

  const dispatchEndTransition = element => element.dispatchEvent(new Event(END_TRANSITION));

  const isDisplayed = element => element.classList.contains(CLASS_NAME_DISPLAY_ACCORDION);

  const isPeak = element => {
    const currentAccordion = element.closest(".accordion-item");

    return currentAccordion.classList.contains(CLASS_NAME_PEAK_ITEM);
  };

  const waitTransition = (callback, content, wait = true) => {
    if (!wait) {
      callback(content);
      return;
    }

    let handlerCalled = false;

    const handleEndTransition = ({ target }) => {
      if (target !== content) {
        return;
      }

      handlerCalled = true;
      content.removeEventListener(END_TRANSITION, handleEndTransition);
      callback(content);
    };

    content.addEventListener(END_TRANSITION, handleEndTransition);

    setTimeout(() => {
      if (!handlerCalled) {
        dispatchEndTransition(content);
      }
    }, 355);
  };

  const toggleAccordion = content => {
    if (isDisplayed(content)) {
      hideAccordion(content);
    } else {
      showAccordion(content);
    }
  };

  const hideAccordion = content => {
    if (transitioning || !isDisplayed(content)) {
      return;
    }

    const peakHeight = content.dataset.height;

    content.style.height = content.scrollHeight + "px";
    // reflow
    // eslint-disable-next-line no-unused-expressions
    content.offsetHeight;

    if (isPeak(content)) {
      content.classList.add(CLASS_NAME_CLOSING_PEAK_ACCORDION);
      content.classList.remove(CLASS_NAME_PEAK_ACCORDION, CLASS_NAME_DISPLAY_ACCORDION);
    } else {
      content.classList.add(CLASS_NAME_CLOSING_ACCORDION);
      content.classList.remove(CLASS_NAME_CLOSE_ACCORDION, CLASS_NAME_DISPLAY_ACCORDION);
    }

    toggleAriaAndClasses(content, false);

    transitioning = true;

    const complete = element => {
      transitioning = false;

      if (isPeak(element)) {
        content.classList.remove(CLASS_NAME_CLOSING_PEAK_ACCORDION);
        content.classList.add(CLASS_NAME_PEAK_ACCORDION);
      } else {
        content.classList.remove(CLASS_NAME_CLOSING_ACCORDION);
        content.classList.add(CLASS_NAME_CLOSE_ACCORDION);
      }
    };

    if (peakHeight) {
      content.style.height = peakHeight + "px";
    } else {
      content.style.height = null;
    }

    waitTransition(complete, content, true);
  };

  const showAccordion = content => {
    if (transitioning || isDisplayed(content)) {
      return;
    }

    if (isPeak(content)) {
      content.classList.remove(CLASS_NAME_PEAK_ACCORDION);
      content.classList.add(CLASS_NAME_CLOSING_PEAK_ACCORDION);

      if (!content.style.height) {
        content.style.height = 60 + "px";
      }
    } else {
      content.classList.remove(CLASS_NAME_CLOSE_ACCORDION);
      content.classList.add(CLASS_NAME_CLOSING_ACCORDION);
      content.style.height = 0;
    }

    toggleAriaAndClasses(content, true);

    transitioning = true;

    const complete = element => {
      transitioning = false;

      if (isPeak(element)) {
        content.classList.remove(CLASS_NAME_CLOSING_PEAK_ACCORDION);
        content.classList.add(CLASS_NAME_PEAK_ACCORDION, CLASS_NAME_DISPLAY_ACCORDION);
      } else {
        content.classList.remove(CLASS_NAME_CLOSING_ACCORDION);
        content.classList.add(CLASS_NAME_CLOSE_ACCORDION, CLASS_NAME_DISPLAY_ACCORDION);
        content.style.height = null;
      }
    };

    waitTransition(complete, content, true);

    content.style.height = `${content.scrollHeight}px`;
  };

  const toggleAriaAndClasses = (content, isOpen) => {
    if (!content) {
      return;
    }

    const currentAccordion = content.closest(".accordion-item");
    const currentButton = currentAccordion.querySelector(`[data-target="${content.id}"]`);

    if (currentButton) {
      currentButton.classList.toggle(CLASS_NAME_CLOSED_ACCORDION, !isOpen);
      currentButton.setAttribute("aria-expanded", isOpen);
      content.setAttribute("aria-hidden", !isOpen);
    }
  };

  const initiate = () => {
    if (accordions.length > 0) {
      accordions.forEach(accordion => {
        const accordionButton = accordion.querySelector(".accordion-item__title-button");

        if (accordionButton) {
          accordionButton.onclick = ({ currentTarget }) => {
            const currentButton = currentTarget;
            const currentAccordion = currentButton.closest(".accordion-item");
            const currentContent = currentAccordion.querySelector(
              `#${currentButton.dataset.target}`
            );

            toggleAccordion(currentContent);
          };
        }
      });
    }

    if (externalAccordions.length > 0) {
      externalAccordions.forEach(accordion => {
        const accordionButton = accordion.querySelector(".accordion-item__title-button");

        if (accordionButton) {
          accordionButton.onclick = ({ currentTarget }) => {
            const currentButton = currentTarget;
            const currentAccordion = currentButton.closest(".accordion-item");
            const currentContent = currentAccordion.querySelector(
              `#${currentButton.dataset.target}`
            );

            toggleAccordion(currentContent);
          };
        }
      });
    }
  };

  initiate();
};

export default Accordion;
