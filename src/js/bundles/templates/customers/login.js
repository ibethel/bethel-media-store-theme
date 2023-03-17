// eslint-disable-next-line import/no-unresolved
import "Styles/templates/customers/login.scss";
import { updateUrlHash } from "../../helpers/helpers";

const LoginPage = () => {
  const recoverButton = document.querySelector(".bm-btn__recover");
  const recoverContainer = document.querySelector(".bm-reset-form__container");
  const recoverHash = document.URL.includes("#recover");
  const loginBtn = document.querySelector(".bm-btn__login");
  const loginContainer = document.querySelector(".bm-login-form__container");
  const loginForm = document.querySelector("[action='/account/login']");
  const recoverForm = document.querySelector("[action='/account/recover']");

  const hideLogin = () => {
    toggleDisabled(loginForm, true);
    loginContainer.classList.add("opacity-0", "pe-none");
    loginContainer.setAttribute("aria-hidden", true);
  };

  const showLogin = () => {
    toggleDisabled(loginForm, false);
    loginContainer.classList.remove("opacity-0", "pe-none");
    loginContainer.setAttribute("aria-hidden", false);
  };

  const showRecover = () => {
    recoverContainer.setAttribute("aria-hidden", false);
    recoverContainer.classList.remove("d-none", "pe-none");
    toggleDisabled(recoverForm, false);
  };

  const hideRecover = () => {
    recoverContainer.setAttribute("aria-hidden", true);
    recoverContainer.classList.add("d-none", "pe-none");
    toggleDisabled(recoverForm, true);
  };

  const toggleDisabled = (content, value) => {
    const contentElements = Array.from(content.elements);

    contentElements.forEach(element => {
      element.disabled = value;

      if (!value) {
        element.classList.remove("disabled");
      } else {
        element.classList.add("disabled");
      }
    });
  };

  const handleLoginClick = event => {
    event.preventDefault();
    const url = window.location.origin + window.location.pathname;
    window.history.replaceState({ path: url }, "", url);
    hideRecover();
    showLogin();
  };

  const handleRecoverClick = event => {
    event.preventDefault();
    updateUrlHash("recover");
    showRecover();
    hideLogin();
  };

  const initiate = () => {
    recoverButton.onclick = handleRecoverClick;
    loginBtn.onclick = handleLoginClick;

    if (recoverHash) {
      showRecover();
      hideLogin();
    }
  };

  initiate();
};

window.addEventListener("DOMContentLoaded", () => LoginPage());
