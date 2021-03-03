module.exports = {
  preset: "jest-puppeteer",
  globals: {
    URL: "http://localhost:3000",
  },
  moduleNameMapper: {
    "\\.(css|jpg|png)$": "<rootDir>/empty-module.js",
  },
  //...
};
