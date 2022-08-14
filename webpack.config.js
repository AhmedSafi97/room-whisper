const path = require("path");
const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  entry: ["./client/src/index.js"],
  output: {
    path: path.resolve(__dirname, `./build/${process.env.OUTPUT}`),
    filename: "main.js",
  },
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    ...(isDevelopment ? [new BundleAnalyzerPlugin()] : []),
    new Dotenv({
      path: `./.env`,
    }),
    new CompressionPlugin(),
    new HtmlWebpackPlugin({
      title: "chat app",
      favicon: path.join(__dirname, "client", "public", "favicon.ico"),
      template: path.join(__dirname, "client", "public", "index.html"),
    }),
    new Webpack.ProvidePlugin({ process: "process/browser" }),
    new Webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify("5fa3b9"),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: "1+1",
      "typeof window": JSON.stringify("object"),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.BASE_NAME": JSON.stringify(process.env.BASE_NAME),
      "process.env.REACT_APP_API_URL": JSON.stringify(
        process.env.API
      ),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              {
                plugins: ["@babel/plugin-proposal-class-properties"],
              },
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // 'resolve-url-loader'
          "resolve-url-loader",
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss"],
    modules: ["./node_modules", "./client"],
  },
  resolveLoader: { modules: ["./node_modules"] },
};
