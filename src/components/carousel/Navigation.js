import React from "react";

const Navigation = ({
  slidesArray,
  activeIndex,
  maxIndex,
  jumpTo,
  arrow,
  next,
  previous,
  arrowColor,
  dots,
}) => {
  const buttons = slidesArray.map((el, index) => {
    const active = index === activeIndex ? "#3e3c3c" : "#d0c3c3";
    if (index <= maxIndex) {
      return (
        <span
          key={index}
          onClick={() => {
            jumpTo(index);
          }}
          className={`navigation-dot ${active}`}
          style={{
            height: "10px",
            width: "10px",
            backgroundColor: `${active}`,
            borderRadius: "50%",
            display: "inline-block",
            margin: "5px",
            boxShadow: "1px 1px 1px #868282",
            opacity: "0.8",
          }}
        ></span>
      );
    }
  });

  const navigation = (
    <div
      className="carousel-navigation"
      style={{
        height: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: "5%",
        zIndex: "1",
        width: "100%",
      }}
    >
      {arrow ? (
        <div className="arrow-block" onClick={() => previous()}>
          <span
            className="arrow left"
            style={{
              border: `solid ${arrowColor}`,
              borderWidth: "0 10px 10px 0",
              display: "inline-block",
              padding: "10px",
              transform: "rotate(135deg)",
              WebkitTransform: "rotate(135deg)",
            }}
          ></span>
        </div>
      ) : null}
      {dots ? (
        <div
          className="navigation-dots"
          style={{
            height: "30px",
            justifyContent: "center",
            bottom: "5%",
            zIndex: 1,
            padding: "10px",
          }}
        >
          {buttons}
        </div>
      ) : null}
      {arrow ? (
        <div className="arrow-block" onClick={() => next()}>
          <span
            className="arrow right"
            style={{
              border: `solid ${arrowColor}`,
              borderWidth: "0 10px 10px 0",
              display: "inline-block",
              padding: "10px",
              transform: "rotate(-45deg)",
              WebkitTransform: "rotate(-45deg)",
            }}
          ></span>
        </div>
      ) : null}
    </div>
  );
  return navigation;
};

export default Navigation;
