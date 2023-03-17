import React from "react";

const BmImage = props => {
  const { image, imageWrapperClasses, imageWidths } = props;

  const formatImageUrl = (url, size) => {
    if (url && url.includes("jpg")) {
      return size ? url.replace(".jpg", `_${size}x.jpg`) : url.replace(".jpg", "_{width}x.jpg");
    } else if (url && url.includes("png")) {
      return size ? url.replace(".png", `_${size}x.png`) : url.replace(".png", "_{width}x.png");
    } else if (url && url.includes("webp")) {
      return size ? url.replace(".webp", `_${size}x.webp`) : url.replace(".webp", "_{width}x.webp");
    } else {
      return url;
    }
  };

  const renderImageWrapperClasses = () => {
    if (imageWrapperClasses) {
      return ` ${imageWrapperClasses}`;
    }
  };

  return (
    <div className={`bm-img__wrapper${renderImageWrapperClasses()}`}>
      <img
        alt={image.alt}
        className="bm-img d-block lazyload"
        data-src={formatImageUrl(image.url)}
        data-widths={`[${imageWidths}]`}
        data-aspectratio={image.aspect_ratio}
        data-sizes="auto"
        data-optimumx="1.3"
        height={image.height}
        src={formatImageUrl(image.url, 1)}
        tabIndex="-1"
        width={image.width}
      />
    </div>
  );
};

export default BmImage;
