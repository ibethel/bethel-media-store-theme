import "../../../../styles/components/bm-modal/bm-modal.scss";
import Swal from "sweetalert2";

const ImageZoom = () => {
  const zoomedImages = Array.from(document.getElementsByClassName("bm-image--zoom"));

  const initiateZoom = image => {
    const handleImageIsLoaded = event => {
      const currentImage = event.target;
      const html = `<img class="bm-modal__image" src="${currentImage.dataset.zoom}" />`;

      const handleDidOpen = modal => {
        const htmlContainer = modal.querySelector(".bm-modal__html-container");
        const modalImage = htmlContainer.querySelector("img");

        modalImage.onload = () =>
          (htmlContainer.scrollLeft = (modalImage.width - htmlContainer.clientWidth) / 2);
      };

      currentImage.onclick = () => {
        Swal.fire({
          customClass: {
            container: "p-0 bm-modal__container bm-modal__container-image-zoom overlow-y-unset",
            popup: "bm-modal bm-modal--full-width",
            htmlContainer: "m-0 pt-xl-5 bm-modal__html-container text-center",
          },
          didOpen: modal => handleDidOpen(modal),
          html,
          showCloseButton: true,
          showConfirmButton: false,
        });
      };
    };

    image.addEventListener("lazyloaded", handleImageIsLoaded);
  };

  zoomedImages.forEach(image => initiateZoom(image));
};

export default ImageZoom;
