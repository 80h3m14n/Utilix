const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const historyApiFallback = require("connect-history-api-fallback");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const basePath = process.env.BASE_PATH || (isProduction ? "./" : "/");

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      publicPath: isProduction ? "/Utilix/" : "/",
      clean: true, // Clean the output directory before emitting new files
    },
    mode: argv.mode || "development",
    devtool: isProduction ? "source-map" : "eval-source-map",
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      compress: true,
      port: 8080,
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
      template: "./src/index.html",     // source HTML file
      filename: "index.html",           // output name
      inject: "body",                   // where to put <script> tag
      minify: isProduction ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      } : false,
      }),
    ],
    resolve: {
      extensions: [".js", ".json"],
    },
  };
};


