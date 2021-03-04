import React from "react";
import renderer from "react-test-renderer";

import Carousel from "./Carousel/";

it("renders correctly when there are nothing", () => {
  const tree = renderer.create(<Carousel />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with sample input and settings", () => {
  const tree = renderer
    .create(<Carousel slidesArray={posts} settings={settings} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

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
    src="https://storage.googleapis.com/strapi_bucket87/large_DSC_04530_392a7c3ea1/large_DSC_04530_392a7c3ea1.jpg"
    key="test2"
  ></img>,
  <img
    src="https://storage.googleapis.com/strapi_bucket87/large_IMG_20210213_142551_381f68f7ab/large_IMG_20210213_142551_381f68f7ab.jpg"
    key="test3"
  ></img>,
  <img
    src="https://storage.googleapis.com/strapi_bucket87/large_DSC_03910_4f877b8d42/large_DSC_03910_4f877b8d42.jpg"
    key="test4"
  ></img>,
  <img
    src="https://storage.googleapis.com/strapi_bucket87/large_DSC_04530_392a7c3ea1/large_DSC_04530_392a7c3ea1.jpg"
    key="test5"
  ></img>,
  <img
    src="https://storage.googleapis.com/strapi_bucket87/large_IMG_20210213_142551_381f68f7ab/large_IMG_20210213_142551_381f68f7ab.jpg"
    key="test6"
  ></img>,
];
const settings = {
  width: "100%",
  height: "600px",
  animationLength: 300,
  scrollingBackSpeed: 2000,
  autoplay: true,
  autoplaySpeed: 3000,
  neverend: false,
  slidesShown: 1,
  transitionType: "cubic-bezier(0.4, 0, 0.2, 1) 0ms",
};
