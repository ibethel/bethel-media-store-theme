export const bmApiObj = () => {
  const bmApi = document.querySelector("#bmApi").textContent;

  return bmApi ? JSON.parse(bmApi) : {};
};
