const NewsLetter = buttons => {
  buttons.forEach(button => {
    button.onclick = () => {
      window._klOnsite = window._klOnsite || [];
      window._klOnsite.push(["openForm", "RJbhz4"]);
    };
  });
};

export default NewsLetter;
