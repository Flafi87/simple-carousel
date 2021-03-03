import React from "react";
import renderer from "react-test-renderer";

import Carousel from "./";

it("renders correctly when there are no items", () => {
  const tree = renderer.create(<Carousel />).toJSON();
  expect(tree).toMatchSnapshot();
});
