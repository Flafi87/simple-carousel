import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import Image from "./Image";

const Gallery = ({ posts }) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const parentRef = useRef(null);
  const childrenRef = useRef(null);
  //   const size = useWindowSize();

  const [activeIndex, setActiveIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const [touchDifference, setTouchDifference] = useState(null);
  const [movement, setMovement] = useState();
  const [animation, setAnimation] = useState(false);
  const [imigi, setImigi] = useState();
  const [clientX, setClientX] = useState();
  const [mouseDown, setMouseDown] = useState(false);
  const visibleImage = 1;

  useEffect(() => {
    setActiveIndex(0);
  }, [posts]);

  useEffect(() => {
    if (parentRef.current) {
      console.log("window effect ran");
      let parentWidth = parentRef.current.offsetWidth;
      setWindowWidth(parentWidth);
      setMovement(-1 * parentWidth);
    }
  }, [parentRef]);

  useEffect(() => {
    const activeImages = Image({ items: posts, activeIndex });
    setImigi(activeImages);
  }, [activeIndex]);

  let myStyle = {
    transform: `translateX(${movement}px)`,
  };

  const endMovement = (index) => {
    setAnimation(true);
    setTouchDifference(0);
    setTimeout(() => {
      setActiveIndex(index);
      setAnimation(false);
      setMovement(-1 * windowWidth);
    }, 500);
  };
  const next = () => {
    // setAnimation(true);
    const nextIndex = activeIndex === posts.length - 1 ? 0 : activeIndex + 1;
    setMovement(-2 * windowWidth);
    endMovement(nextIndex);
  };
  const previous = () => {
    setAnimation(true);
    const nextIndex = activeIndex === 0 ? posts.length - 1 : activeIndex - 1;
    setMovement(0);
    endMovement(nextIndex);
  };
  const stay = () => {
    setMouseDown(false);
    setAnimation(true);
    setMovement(-1 * windowWidth);
    endMovement(activeIndex);
  };

  //   console.log(touchDifference);
  const handleTouchStart = (e) => {
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

    setMovement(-1 * diff - windowWidth);
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

      setMovement(-1 * diff - windowWidth);
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
  let className = `carousel-content`;
  if (animation) {
    className += " animation";
  }

  const carouselContent = (
    <div className={className} style={myStyle}>
      {imigi}
    </div>
  );
  return (
    <div className="carousel-component">
      <div>
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
        {carouselContent}
      </div>
    </div>
  );
};

export default Gallery;
