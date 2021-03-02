import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./style.css";
import Image from "./Slides";
const Gallery = ({ slidesArray, settings }) => {
  const {
    width = "100%",
    height = "400px",
    arrow = true,
    dots = true,
    backgroundColor = "none",
    arrowColor = "black",
    autoplay = false,
    autoplaySpeed = 2000,
    neverend = false,
  } = settings;
  const [windowWidth, setWindowWidth] = useState(0);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const parentRef = useRef(null);
  const [neverending, setNeverEnding] = useState(neverend);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const [touchDifference, setTouchDifference] = useState(null);
  const [movement, setMovement] = useState(0);
  const [animation, setAnimation] = useState("");
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    setActiveIndex(0);
  }, [slidesArray]);

  useEffect(() => {
    if (autoplay) {
      setNeverEnding(true);
      const interval = setInterval(() => {
        next();
      }, autoplaySpeed);
      return () => clearInterval(interval);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (parentRef.current) {
      const parentWidth = parentRef.current.offsetWidth;
      setWindowWidth(parentWidth);
    }
  }, [dimensions.width]);

  const next = () => {
    setAnimation("animation");
    const nextIndex =
      activeIndex === slidesArray.length - 1
        ? neverending
          ? 0
          : activeIndex
        : activeIndex + 1;
    setActiveIndex(nextIndex);
    setTouchDifference(0);
    setMovement(0);
  };
  const jumpTo = (index) => {
    setAnimation("animation-long");
    setTouchDifference(0);
    setMovement(0);
    setActiveIndex(index);
  };
  const previous = () => {
    setAnimation("animation");
    setTouchDifference(0);
    const nextIndex =
      activeIndex === 0
        ? neverending
          ? slidesArray.length - 1
          : activeIndex
        : activeIndex - 1;
    setMovement(0);
    setActiveIndex(nextIndex);
  };
  const stay = () => {
    setAnimation("animation");
    setTouchDifference(0);
    setMovement(0);
    setMouseDown(false);
  };

  const handleTouchStart = (e) => {
    setAnimation("");
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const currentTouch = e.touches[0].clientX;
    if (touchPosition === null) {
      return;
    }
    const diff = touchPosition - currentTouch;
    setMovement(-1 * diff);
    setTouchDifference(diff);
  };

  const handleTouchEnd = () => {
    const triggerPoint = 0.2 * windowWidth;
    if (touchDifference > triggerPoint && touchDifference > 0) {
      next();
    } else if (
      Math.abs(touchDifference) > triggerPoint &&
      touchDifference < 0
    ) {
      previous();
    } else {
      stay();
    }
  };

  const handleMouseDown = (e) => {
    setAnimation("");
    e.preventDefault();
    setTouchPosition(e.clientX);
    setMouseDown(true);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (mouseDown) {
      const currentTouch = e.clientX;
      if (touchPosition === null || currentTouch === 0) {
        return;
      }
      const diff = touchPosition - currentTouch;
      setMovement(-1 * diff);
      setTouchDifference(diff);
    }
  };
  const handleMouseUp = (e) => {
    e.preventDefault();
    if (mouseDown) {
      const triggerPoint = 0.2 * windowWidth;
      if (touchDifference > triggerPoint && touchDifference > 0) {
        next();
      } else if (
        Math.abs(touchDifference) > triggerPoint &&
        touchDifference < 0
      ) {
        previous();
      } else {
        stay();
      }
    }
    setMouseDown(false);
  };

  const buttons = slidesArray.map((el, index) => {
    const active = index === activeIndex ? "active" : "";
    return (
      <span
        key={index}
        onClick={() => {
          jumpTo(index);
        }}
        className={`navigation-dot ${active}`}
      ></span>
    );
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
  return (
    <div
      className="carousel-component"
      style={{ width: width, overflow: "hidden", position: "relative" }}
    >
      <div
        className="carousel-content-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        ref={parentRef}
        style={{
          height: height,
          position: "relative",
          margin: "10px 0px 0px 0px",
        }}
      >
        <Image
          slidesArray={slidesArray}
          activeIndex={activeIndex}
          windowWidth={windowWidth}
          movement={movement}
          animation={animation}
          backgroundColor={backgroundColor}
        />
        {navigation}
      </div>
    </div>
  );
};

export default Gallery;

Gallery.propTypes = {
  slidesArray: PropTypes.arrayOf(PropTypes.element),
  settings: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    arrow: PropTypes.boolean,
    dots: PropTypes.boolean,
    backgroundColor: PropTypes.string,
    arrowColor: PropTypes.string,
    autoplay: PropTypes.boolean,
    autoplaySpeed: PropTypes.number,
    neverend: PropTypes.boolean,
  }),
};
