import React from "react";

const Empty = () => {
  return [
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
        Hello World! This is a demo carousel. Unfortunately the{" "}
        <code>slidesArray</code> Props are empty :( Please add an array with
        Elements or images
        <br />
        <code>
          [&lt;div key=&quot;hello&quot;&gt;Hello&lt;/div&gt;,&lt;img
          key=&quot;img1&quot;src=&quot; img_girl.jpg&quot;&gt;]
        </code>
      </h1>
    </div>,
  ];
};

export default Empty;
