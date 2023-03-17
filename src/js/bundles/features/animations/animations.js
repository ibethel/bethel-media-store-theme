const listCloseNoAnimate = list => {
  const listItems = Array.from(list.children);

  listItems.forEach(item => item.classList.remove("item-animate"));
};

const listOpenAnimate = list => {
  const listItems = Array.from(list.children);

  let currentDelay = 200;
  let stagger = 15;

  const handleDelayArray = () => {
    let array = [];
    for (let index = 0; index < listItems.length; index++) {
      if (index === 0) {
        array.push(currentDelay);
      } else {
        array.push((currentDelay -= stagger));
      }
    }

    return array.reverse();
  };

  const delayArray = handleDelayArray();

  const animateItem = (item, delay) => {
    const timeout = () => item.classList.add("item-animate");

    setTimeout(timeout, delay);
  };

  listItems.forEach((item, index) => animateItem(item, delayArray[index]));
};

export { listCloseNoAnimate, listOpenAnimate };
