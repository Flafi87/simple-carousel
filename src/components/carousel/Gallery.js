import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./style.css";
import Image from "./Slides";
import Navigation from "./Navigation";
import Empty from "./Empty";
const Gallery = ({ slidesArray, settings }) => {
  const {
    width = "100%",
    height = "600px",
    arrow = true,
    dots = true,
    backgroundColor,
    transitionType = "linear",
    animationLength = 300,
    scrollingBackSpeed = 2000,
    arrowColor = "black",
    autoplay = false,
    autoplaySpeed = 3000,
    neverend = false,
    slidesShown = 1,
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
  const [maxIndex, setMaxIndex] = useState(slidesArray.length - 1);

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
    if (slidesArray.length % slidesShown !== 0) {
      setMaxIndex(slidesArray.length - (slidesArray.length % slidesShown) - 1);
    } else {
      setMaxIndex(slidesArray.length - 1);
    }
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
    if (activeIndex === maxIndex) {
      if (neverending) {
        jumpTo(0);
      } else {
        setAnimation("animation");
        setActiveIndex(activeIndex);
      }
    } else {
      setAnimation("animation");
      const nextIndex =
        activeIndex === maxIndex
          ? neverending
            ? 0
            : activeIndex
          : activeIndex + 1;
      setActiveIndex(nextIndex);
    }

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

  const navigation = (
    <Navigation
      slidesArray={slidesArray}
      activeIndex={activeIndex}
      maxIndex={maxIndex}
      jumpTo={jumpTo}
      arrow={arrow}
      next={next}
      previous={previous}
      arrowColor={arrowColor}
      dots={dots}
    />
  );
  return (
    <div
      className="carousel-component"
      style={{
        width: width,
        overflow: "hidden",
        position: "relative",
      }}
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
          backgroundColor={backgroundColor}
          animation={animation}
          transitionType={transitionType}
          animationLength={animationLength}
          scrollingBackSpeed={scrollingBackSpeed}
          slidesShown={slidesShown}
        />
        {navigation}
      </div>
    </div>
  );
};

Gallery.defaultProps = {
  settings: {
    width: "100%",
    height: "600px",
    arrow: true,
    dots: true,
    backgroundColor: "none",
    transitionType: "linear",
    animationLength: 1,
    scrollingBackSpeed: 2,
    arrowColor: "black",
    autoplay: false,
    autoplaySpeed: 3000,
    neverend: false,
    slidesShown: 1,
  },
  slidesArray: [<Empty />, <Empty />],
};

Gallery.propTypes = {
  slidesArray: PropTypes.arrayOf(PropTypes.element),
  settings: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    arrow: PropTypes.bool,
    dots: PropTypes.bool,
    backgroundColor: PropTypes.string,
    transitionType: PropTypes.string,
    animationLength: PropTypes.number,
    scrollingBackSpeed: PropTypes.number,
    arrowColor: PropTypes.string,
    autoplay: PropTypes.bool,
    autoplaySpeed: PropTypes.number,
    neverend: PropTypes.bool,
    slidesShown: PropTypes.number,
  }),
};

export default Gallery;
