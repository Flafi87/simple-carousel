import React from "react";

const Image = ({ activeIndex, windowWidth, movement, animation }) => {
  const visibleImage = 1;
  const items = ["red", "blue", "green", "yellow", "pink", "purple", "black"];
  const middle = Math.floor(items.length / 2);
  const middlePoint = activeIndex + middle;
  const images = items.map((item, index) => {
    let translate = 0;
    let display;
    if (index === activeIndex) {
      translate = movement;
    }
    if (activeIndex === items.length - 1) {
      translate = -(activeIndex - index) * windowWidth + movement;
    } else if (index > activeIndex) {
      translate = (index - activeIndex) * windowWidth + movement;
    } else if (index < activeIndex) {
      translate = -(activeIndex - index) * windowWidth + movement;
    }
    return (
      <div
        className={`carousel-element ${animation}`}
        key={index}
        style={{
          width: windowWidth,
          border: "solid 1px",
          backgroundColor: `${item}`,
          zIndex: "1",
          transform: `translateX(${translate}px)`,
          display: `${display}`,
        }}
      ></div>
    );
  });
  return images;
};

export default Image;
