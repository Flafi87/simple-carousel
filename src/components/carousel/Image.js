import React from "react";

const Image = ({ items, activeIndex }) => {
  const visibleImage = 1;
  const activeImages = [];
  const images = items.map((item) => {
    const { title } = item;
    const image = item.postimage[0].formats.medium
      ? item.postimage[0].formats.medium.url
      : item.postimage[0].url;
    return <img src={image} key={title}></img>;
  });
  /**Loading one before the one and one after */

  for (let i = 0; i < visibleImage * 3; i++) {
    let imageIndex;
    if (activeIndex === 0 && i === 0) {
      imageIndex = images.length - 1;
    } else if (
      activeIndex === images.length - 1 &&
      i === visibleImage * 3 - 1
    ) {
      imageIndex = 0;
    } else {
      imageIndex = activeIndex + i - 1;
    }
    activeImages.push(images[imageIndex]);
  }
  console.log("image generated");
  return activeImages;
};

export default Image;
