import "../../../../styles/components/bm-modal/bm-modal.scss";
import MicroModal from "micromodal";

const ImageZoom = () => {
  const zoomedImages = Array.from(document.getElementsByClassName("bm-image--zoom"));

  const initiateZoom = (image, index) => {
    const handleImageIsLoaded = (event, image) => {
      const currentImage = event?.target || image;
      const html = `<img class="bm-modal__image" src="${currentImage.dataset.zoom}" />`;

      console.log("currentImage", currentImage);

      const handleDidOpen = modal => {
        const htmlContainer = modal.querySelector(".mm-modal__container");
        const modalImage = htmlContainer && htmlContainer.querySelector("img");

        modalImage.onload = () =>
          (htmlContainer.scrollLeft = (modalImage.width - htmlContainer.clientWidth) / 2);
      };

      currentImage.onclick = () => {
        MicroModal.show("bm-zoom-modal", {
          onShow: modal => {
            const modalContent = modal.querySelector(".mm-modal-content");

            if (modalContent) {
              modalContent.innerHTML = html;
            }

            handleDidOpen(modal);
          },
          awaitOpenAnimation: true,
        });
      };
    };

    if (index === 0) {
      handleImageIsLoaded(null, image);
    } else {
      image.addEventListener("lazyloaded", handleImageIsLoaded);
    }
  };

  zoomedImages.forEach((image, index) => initiateZoom(image, index));
};

export default ImageZoom;
