require("dotenv").config();
const glob = require("glob");
const path = require("path");
const DEVELOPMENT = "development";
const PRODUCTION = "production";
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const mode = process.env.NODE_ENV === DEVELOPMENT ? DEVELOPMENT : PRODUCTION;
const envIsDevelopment = mode === DEVELOPMENT;
const isWatching = process.env.DEV_STATUS === "watching";
const buildScripts = isWatching
  ? ["echo Webpack done", "theme watch", "theme open"]
  : ["echo Webpack done"];
const root = envIsDevelopment ? "dev" : "dist";
const stats = envIsDevelopment ? "errors-warnings" : { children: false };
// const shopifyCommand = `shopify theme dev -s=${process.env.SHOPIFY_FLAG_STORE} -t=${process.env.SHOPIFY_CLI_THEME_ID} --password=${process.env.SHOPIFY_CLI_THEME_TOKEN} --live-reload=full-page --path=dev`;
// const lastCommand = envIsDevelopment ? "" : "theme open";
const files = glob.sync("./src/js/bundles/**/*.js");
const entries = files.reduce((obj, route) => {
  // eslint-disable-next-line no-useless-escape
  const key = route.replace(/^.*[\\\/]/, "").replace(".js", "");

  obj[key] = route;
  return obj;
}, {});

console.log("DEV_STATUS:", process.env.DEV_STATUS);

module.exports = {
  devtool: false,
  entry: entries,
  mode: mode,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { url: false },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: { plugins: [["autoprefixer"]] },
            },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  output: {
    filename: "./assets/bundle.[name].js",
    path: path.resolve(__dirname, root),
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "./assets/bundle.[name].css" }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/assets/**/*",
          to: "assets/[name].[ext]",
        },
        {
          from: "src/config/settings_schema.json",
          to: "config/settings_schema.json",
        },
        {
          from: "src/liquid/layout/**/*.liquid",
          to: "layout/[name].[ext]",
        },
        {
          from: "src/locales/**/*",
          to: "locales/[name].[ext]",
          noErrorOnMissing: true,
        },
        {
          from: "src/liquid/sections/**/*.liquid",
          to: "sections/[name].[ext]",
        },
        {
          from: "src/liquid/snippets/**/*.liquid",
          to: "snippets/[name].[ext]",
        },
        {
          context: "src/liquid/templates/",
          from: "*.liquid",
          to: "templates/[name].[ext]",
          globOptions: {
            ignore: ["**/customers/**"],
          },
        },
        {
          from: "src/liquid/templates/customers/**/*",
          to: "templates/customers/[name].[ext]",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      Styles: path.resolve(__dirname, "src/styles/"),
    },
  },
  stats: stats,
};

if (envIsDevelopment) {
  module.exports.plugins.push(
    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: ["echo Builing webpack"],
      },
      onBuildEnd: {
        scripts: buildScripts,
        parallel: true,
      },
    })
  );
}
