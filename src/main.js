import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import App from "./components/App";

const Main = () => {
  const posts = [
    <div
      style={{
        backgroundColor: "grey",
        width: "100%",
        height: "100%",
        padding: "2em",
      }}
    >
      <h1>Hello World this is a demo carousel</h1>
    </div>,
    <img src="https://storage.googleapis.com/strapi_bucket87/large_DSC_06555_d252028c66/large_DSC_06555_d252028c66.jpg"></img>,
    <img src="https://storage.googleapis.com/strapi_bucket87/large_DSC_04530_392a7c3ea1/large_DSC_04530_392a7c3ea1.jpg"></img>,
    <img src="https://storage.googleapis.com/strapi_bucket87/large_IMG_20210213_142551_381f68f7ab/large_IMG_20210213_142551_381f68f7ab.jpg"></img>,
    <img src="https://storage.googleapis.com/strapi_bucket87/large_DSC_03910_4f877b8d42/large_DSC_03910_4f877b8d42.jpg"></img>,
  ];
  const settings = {
    width: "100%",
    height: "600px",
    arrow: true,
    dots: true,
    arrowColor: "#c1c7ce",
    backgroundColor: "",
  };

  return <App slidesArray={posts} settings={settings} />;
};

render(<Main />, document.getElementById("root"));
