import React from "react";

const Slides = ({
  slidesArray,
  activeIndex,
  windowWidth,
  movement,
  animation,
  backgroundColor,
  transitionType,
  animationLength,
  scrollingBackSpeed,
  slidesShown,
}) => {
  const slides = slidesArray.map((slide, index) => {
    let translate = 0;
    let calculatedWidth = windowWidth / slidesShown;
    let transition = "";
    if (index === activeIndex) {
      translate = movement;
    }
    if (activeIndex === slidesArray.length - slidesShown) {
      translate = -(activeIndex - index) * calculatedWidth + movement;
    } else if (index > activeIndex) {
      translate = (index - activeIndex) * calculatedWidth + movement;
    } else if (index < activeIndex) {
      translate = -(activeIndex - index) * calculatedWidth + movement;
    }
    if (animation === "animation") {
      transition = `all ${animationLength}ms ${transitionType}`;
    } else if (animation === "animation-long") {
      transition = `all ${scrollingBackSpeed}ms ${transitionType}`;
    }
    return (
      <div
        className={`carousel-element`}
        key={index}
        style={{
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "hidden",
          backgroundColor,
          width: calculatedWidth,
          zIndex: "1",
          transform: `translateX(${translate}px)`,
          transition: transition,
        }}
      >
        {slide}
      </div>
    );
  });
  return slides;
};

export default Slides;
