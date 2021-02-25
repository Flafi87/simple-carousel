import React, { useState, useEffect, useRef } from "react";
import "./style.css";

const img = document.createElement("img");
img.src =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
img.style.display = "none";

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
  const visibleImage = 1;

  useEffect(() => {
    setActiveIndex(0);
  }, [posts]);

  useEffect(() => {
    if (parentRef.current) {
      let parentWidth = parentRef.current.offsetWidth;
      setWindowWidth(parentWidth);
      setMovement(-1 * parentWidth);
    }
  }, [parentRef]);

  useEffect(() => {
    const activeImages = [];
    console.log("image generated");
    const images = posts.map((item) => {
      const { title } = item;
      const image = item.postimage[0].formats.medium
        ? item.postimage[0].formats.medium.url
        : item.postimage[0].url;
      return <img src={image} key={title} draggable="true"></img>;
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

    setImigi(activeImages);
  }, [activeIndex]);

  let myStyle = {
    transform: `translateX(${movement}px)`,
    // transitionDuration: `${duration}s`,
  };
  const endMovement = (index) => {
    setTimeout(() => {
      setAnimation(false);
      setMovement(-1 * windowWidth);
      setActiveIndex(index);
    }, 500);
  };
  const next = () => {
    setAnimation(true);
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

  const handleDragStart = (e) => {
    e.dataTransfer.setDragImage(img, 0, 0);
    e.dataTransfer.effectAllowed = "move";
    // e.dataTransfer.dropEffect = "move";
    const touchDown = e.clientX;
    setTouchPosition(touchDown);
  };
  const handleOnDrag = (e) => {
    const currentTouch = e.clientX;
    if (touchPosition === null || currentTouch === 0) {
      return;
    }

    const diff = touchPosition - currentTouch;

    setMovement(-1 * diff - windowWidth);
    setTouchDifference(diff);
  };
  const handleDragEnd = (e) => {
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

  const handleOnClick = (e) => {};

  let className = `carousel-content`;
  if (animation) className += " animation";
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
        draggable
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={(e) => {
          e.preventDefault();
          //   var img = new Image();
          //   img.src = img.src =
          //     "http://kryogenix.org/images/hackergotchi-simpler.png";
          //   e.dataTransfer.setDragImage(img, 0, 0);
        }}
        onDrag={handleOnDrag}
        onClick={handleOnClick}
        ref={parentRef}
      >
        {carouselContent}
      </div>
    </div>
  );
};

export default Gallery;
