const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  //   output: {
  //     path: path.resolve(__dirname, 'dist'),
  //     filename: '[name].js',
  //     clean: true,
  //   },
  output: {
    path: path.resolve('build'),
    filename: '[name].js',
    library: 'calculator',
    libraryExport: 'add',
    libraryTarget: 'umd', // var、commonjs、commonjs2、umd
  },
  // 配置如何查找源代码中的引入模块
  resolve: {
    // extensions: ['.js'],
    // alias: {
    //   bootstrap: path.resolve(
    //     __dirname,
    //     '/node_modules/bootstrap/dist/css/bootstrap.min.css'
    //   ),
    // },
    // modules: ['my_modules', 'node_modules'],
    // mainFields: ['style', 'main'], // 查找的是 package.json 中的字段
    // mainFiles: ['style.js', 'index.js'], // 查找的是文件
  },
  // 指定如何查找 loader
  resolveLoader: {
    extensions: ['.js'],
    alias: {},
    modules: ['loaders', 'node_modules'],
  },
  module: {
    // 一般来说我们拿到模块后要分析里面的依赖的模块 import/require
    // 一些模块我们知道它肯定没有依赖别的模块 jquery lodash，所以可以省这一步
    noParse: /jquery|lodash/,
    noParse(request) {
      return /jquery|lodash/.test(request);
    },
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.IgnorePlugin({
      // 目录的正则
      contextRegExp: /moment$/,
      // 请求的正则
      resourceRegExp: /locale/,
    }),
    // new BundleAnalyzerPlugin(),
  ],
});
