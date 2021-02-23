import React, { useState, useEffect, useRef } from "react";
import "./style.css";

// function useWindowSize() {
//   // Initialize state with undefined width/height so server and client renders match
//   // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
//   const [windowSize, setWindowSize] = useState({
//     width: undefined,
//     height: undefined,
//   });

//   useEffect(() => {
//     // Handler to call on window resize
//     function handleResize() {
//       // Set window width/height to state
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     }

//     // Add event listener
//     window.addEventListener("resize", handleResize);

//     // Call handler right away so state gets updated with initial window size
//     handleResize();

//     // Remove event listener on cleanup
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return windowSize;
// }

const Gallery = ({ posts }) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const parentRef = useRef(null);
  const childrenRef = useRef(null);
  //   const size = useWindowSize();

  const [activeIndex, setActiveIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const [touchDifference, setTouchDifference] = useState(null);
  const [transformation, setTransformation] = useState(
    -1 * touchDifference - windowWidth
  );
  const visibleImage = 1;

  useEffect(() => {
    if (parentRef.current) {
      let parentHeight = parentRef.current.offsetHeight;
      let parentWidth = parentRef.current.offsetWidth;
      setWindowWidth(parentWidth);
    }

    if (childrenRef.current) {
      let childrenHeight = childrenRef.current.offsetHeight;
      let childrenWidth = childrenRef.current.offsetWidth;
    }
  }, [parentRef, childrenRef]);

  //   console.log(touchDifference);
  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const next = () => {
    const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
    setTouchDifference(0);
  };

  const previous = () => {
    const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
    setTouchDifference(0);
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
    const triggerPoint = 0.5 * windowWidth;
    if (touchDifference > triggerPoint && touchDifference > 0) {
      next();
    } else if (
      Math.abs(touchDifference) > triggerPoint &&
      touchDifference < 0
    ) {
      previous();
    }
  };

  const images = posts.map((item) => {
    //console.log(item);
    const { title } = item;
    const image = item.postimage[0].formats.medium
      ? item.postimage[0].formats.medium.url
      : item.postimage[0].url;
    return <img src={image} key={title}></img>;
  });
  const activeImages = [];
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
  //   console.log(activeImages);

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
        ref={parentRef}
      >
        <div
          className="carousel-content"
          style={{
            transform: `translateX(${-1 * touchDifference - windowWidth}px)`,
          }}
        >
          {activeImages}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
