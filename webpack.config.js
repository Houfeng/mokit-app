const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const os = require('os');

const ENV = process.env.NODE_ENV || 'prod';
console.log(`${os.EOL}NODE_ENV:`, ENV);

const cssBundlePlugin = new ExtractTextPlugin("css/bundle.css");

const htmlPlugin = new HtmlWebpackPlugin({
  title: 'template',
  filename: 'index.html',
  template: './src/assets/index.html',
});

const cleanPlugin = new CleanWebpackPlugin(['build/dist'], {
  verbose: false
});

const compressPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
});

// webpack plugins
const plugins = [
  htmlPlugin,
  cssBundlePlugin,
  cleanPlugin,
];
if (ENV === 'prod') plugins.push(compressPlugin);

// webpack loaders
const loaders = [{
  test: /\.js$/,
  loader: "babel",
  exclude: [/node_modules/, /\.test\.js$/]
}, {
  test: /.*mokit.*\.js$/,
  loader: "babel"
}, {
  test: /\.json$/,
  loader: "json",
}, {
  test: /\?raw$/,
  loader: 'raw'
}, {
  test: /\.html$/,
  loader: 'raw'
}, {
  test: /\.(png|jpg|gif)\?*.*$/,
  loader: 'url?limit=8192&name=img/[hash].[ext]'
}, {
  test: /\.(eot|woff|woff2|webfont|ttf|svg)\?*.*$/,
  loader: 'url?limit=8192&name=font/[hash].[ext]'
}, {
  test: /\.less$/,
  loader: cssBundlePlugin.extract("css!less", {
    publicPath: '../'
  })
}, {
  test: /\.css$/,
  loader: cssBundlePlugin.extract("css", {
    publicPath: '../'
  })
}];

// webpack configs
module.exports = {
  entry: {
    bundle: `./src/app.js`
  },
  output: {
    path: './build/dist/',
    filename: 'js/[name].js'
  },
  devtool: 'source-map',
  module: {
    loaders: loaders
  },
  plugins: plugins
};