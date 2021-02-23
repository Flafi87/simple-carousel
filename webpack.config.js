const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


const config = {
    entry: {
        main: './src/main.js',
      },
    module:{rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]},
plugins: [    new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "src", "index.html")
  })]
  ,
output: {
filename:"index.js",
path: path.resolve(__dirname, "./build")
}
}


module.exports = (env,argv) => {
    if (argv.mode === 'development') {
        /**/
      }
      if (argv.mode === 'production') {
       config.entry.main = './src/index.js';
       config.output.path = path.resolve(__dirname, "./dist");
       config.plugins = [];
      }
return config
}