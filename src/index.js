/* eslint-disable max-len */
import React from "react";
import { render } from "react-dom";
import Carousel from "./Carousel";

const Main = () => {
  const posts = [
    <div
      style={{
        backgroundColor: "grey",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
      key="text"
    >
      <h1 style={{ textAlign: "center", position: "absolute", top: "40%" }}>
        Hello World! This is a demo carousel
      </h1>
    </div>,
    <img
      src="https://storage.googleapis.com/strapi_bucket87/large_DSC_06555_d252028c66/large_DSC_06555_d252028c66.jpg"
      key="test1"
    ></img>,
    <img
      src="https://storage.googleapis.com/strapi_bucket87/medium_IMG_20210224_154935_9bf019692b/medium_IMG_20210224_154935_9bf019692b.jpg"
      key="test2"
    ></img>,
    <img
      src="https://storage.googleapis.com/strapi_bucket87/medium_IMG_20210222_224443_180d2083cd/medium_IMG_20210222_224443_180d2083cd.jpg"
      key="test3"
    ></img>,
    <img
      src="https://storage.googleapis.com/strapi_bucket87/medium_IMG_20210221_105438_dddb48f651/medium_IMG_20210221_105438_dddb48f651.jpg"
      key="test4"
    ></img>,
    <img
      src="https://storage.googleapis.com/strapi_bucket87/medium_IMG_20210213_142551_381f68f7ab/medium_IMG_20210213_142551_381f68f7ab.jpg"
      key="test5"
    ></img>,
    // <img
    //   src="https://storage.googleapis.com/strapi_bucket87/large_IMG_20210213_142551_381f68f7ab/large_IMG_20210213_142551_381f68f7ab.jpg"
    //   key="test6"
    // ></img>,
  ];
  const settings = {
    width: "100%",
    height: "600px",
    animationLength: 500,
    scrollingBackSpeed: 2000,
    autoplay: false,
    autoplaySpeed: 3000,
    neverend: true,
    slidesShown: 1,
    transitionType: "cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  };
  const onResize = (props) => console.log(props);

  return <Carousel slidesArray={posts} settings={settings} />;
};

render(<Main />, document.getElementById("root"));
