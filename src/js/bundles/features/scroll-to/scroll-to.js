const ScrollTo = () => {
  const startObserver = elements => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(
      (entries, observer) => getObserved(entries, observer),
      options
    );

    elements.forEach(element => observer.observe(element));
  };

  const getObserved = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-element");
        observer.unobserve(entry.target);
      }
    });
  };

  const initiate = () => {
    const hideScroll = Array.from(document.querySelectorAll(".bm-hide-scroll"));
    const observedElements = [...hideScroll];

    startObserver(observedElements);
  };

  initiate();
};

export default ScrollTo;
