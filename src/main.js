import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import App from "./components/App";

const Main = () => {
  const [posts, setPosts] = useState();

  const getPosts = () => {
    fetch("https://strapi.flafi.hu/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  };

  useEffect(() => {
    getPosts();
  }, []);
  if (posts) {
    return <App posts={posts} />;
  } else {
    return <div>Loading</div>;
  }
};

render(<Main />, document.getElementById("root"));
