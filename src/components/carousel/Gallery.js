import React, { useState, useEffect } from "react";
import "./style.css";

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

const Gallery = ({ posts }) => {
  const size = useWindowSize();
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const [touchDifference, setTouchDifference] = useState(null);
  console.log(touchDifference);
  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const next = () => {
    const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const handleTouchMove = (e) => {
    // console.log(e);
    const currentTouch = e.touches[0].clientX;
    if (touchPosition === null) {
      return;
    }

    const diff = touchPosition - currentTouch;
    setTouchDifference(diff);
  };

  const handleTouchEnd = () => {
    console.log(size);
    if (touchDifference > 0.7 * size.width) {
      next();
    }
  };

  const images = posts.map((item) => {
    //console.log(item);
    const { title } = item;
    const image = item.postimage[0].formats.medium
      ? item.postimage[0].formats.medium.url
      : item.postimage[0].url;
    return <img key={title} src={image}></img>;
  });

  return (
    <>
      <div className="">
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
      >
        <div
          className="carousel-content"
          style={{ transform: `translateX(${-1 * touchDifference}px)` }}
        >
          {images}
        </div>
      </div>
    </>
  );
};

export default Gallery;
