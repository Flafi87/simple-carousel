import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import Image from "./Image";
const items = ["red", "blue", "green", "yellow", "pink", "purple", "black"];
const Gallery = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const parentRef = useRef(null);
  const childrenRef = useRef(null);
  //   const size = useWindowSize();

  const [activeIndex, setActiveIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const [touchDifference, setTouchDifference] = useState(null);
  const [movement, setMovement] = useState(0);
  const [animation, setAnimation] = useState("");
  const [imigi, setImigi] = useState();
  const [mouseDown, setMouseDown] = useState(false);
  const visibleImage = 1;
  let myStyle = {
    transform: `translateX(${movement}px)`,
  };
  useEffect(() => {
    setActiveIndex(0);
  }, [items]);

  useEffect(() => {
    if (parentRef.current) {
      console.log("window effect ran");
      let parentWidth = parentRef.current.offsetWidth;
      setWindowWidth(parentWidth);
    }
  }, [parentRef]);

  const next = () => {
    // setAnimation(true);
    const nextIndex =
      activeIndex === items.length - 1 ? activeIndex : activeIndex + 1;
    setAnimation("animation");
    setMovement(0);
    setActiveIndex(nextIndex);
  };
  const jumpTo = (item) => {
    setAnimation("animation-long");
    setMovement(0);
    setActiveIndex(item);
  };
  const previous = () => {
    setAnimation("animation");
    const nextIndex = activeIndex === 0 ? 0 : activeIndex - 1;
    setMovement(0);
    setActiveIndex(nextIndex);
  };
  const stay = () => {
    setAnimation("animation");
    setMovement(0);
    setMouseDown(false);
    setAnimation(true);
  };

  const handleTouchStart = (e) => {
    setAnimation("");
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    // console.log(e);
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
    console.log(e.clientX);
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
      console.log("this ran??");
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

  const buttons = items.map((el, index) => {
    const active = index === activeIndex ? "active" : "";
    return (
      <span
        key={index}
        onClick={() => {
          jumpTo(index);
        }}
        className={`flying-button ${active}`}
      ></span>
    );
  });

  return (
    <div className="carousel-component">
      <div className="top-navigation">
        <button onClick={() => previous()} className="">
          Back
        </button>
        <button onClick={() => next()} className="">
          Next
        </button>
      </div>
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
      >
        <Image
          activeIndex={activeIndex}
          windowWidth={windowWidth}
          movement={movement}
          animation={animation}
        />
        <div className="flying-buttons">{buttons}</div>
      </div>
    </div>
  );
};

export default Gallery;
