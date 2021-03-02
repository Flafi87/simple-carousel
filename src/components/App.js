import React from "react";
import Gallery from "./carousel/Gallery";

export default function App({ slidesArray, settings }) {
  return <Gallery slidesArray={slidesArray} settings={settings} />;
}
