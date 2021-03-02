import React from "react";

const Slides = ({
  slidesArray,
  activeIndex,
  windowWidth,
  movement,
  animation,
  backgroundColor,
}) => {
  const slides = slidesArray.map((slide, index) => {
    let translate = 0;
    let display;
    if (index === activeIndex) {
      translate = movement;
    }
    if (activeIndex === slidesArray.length - 1) {
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
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "hidden",
          backgroundColor,
          width: windowWidth,
          zIndex: "1",
          transform: `translateX(${translate}px)`,
          display: `${display}`,
        }}
      >
        {slide}
      </div>
    );
  });
  return slides;
};

export default Slides;
