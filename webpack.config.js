const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HashPlugin = require('./plugins/hash-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  // 如果 mode 是 Production 会启动压缩插件
  mode: 'development',
  devtool: false,
  //   entry: {
  //     main: ['./src/index1.js', './src/index2.js'],
  //     vendor: ['lodash', 'jquery'],
  //   },
  //   entry: {
  //     main: './src/index.js',
  //     vendor: ['lodash'],
  //   },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  optimization: {
    moduleIds: 'natural', // deterministic
    chunkIds: 'natural', // deterministic
  },
  //   optimization: {
  //     minimize: true,
  //     minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  //   },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      //   {
      //     test: /\.(png|jpg|gif)$/i,
      //     type: 'asset/resource',
      //     generator: {
      //       filename: 'images/[hash][ext]',
      //     },
      //   },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      //   minify: {
      //     collapseWhitespace: true,
      //     keepClosingSlash: true,
      //     removeComments: true,
      //     removeRedundantAttributes: true,
      //     removeScriptTypeAttributes: true,
      //     removeStyleLinkTypeAttributes: true,
      //     useShortDoctype: true,
      //   },
    }),
    // new MiniCssExtractPlugin({
    //   filename: 'css/[name].[contenthash].css',
    // }),
    // new HashPlugin(),
  ],
};
