const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
// 清除目录等
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const webpackConfigBase = require('./webpack.base.conf');

const webpackConfigProd = {
  mode: 'production', // 通过 mode 声明生产环境

  output: {
    path: path.resolve(__dirname, '../build'),
    // 打包多出口文件
    filename: 'js/[name].[hash].js',
    publicPath: './',
  },

  devtool: 'cheap-module-eval-source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
        },
      }),
    ],
  },
  plugins: [
    //删除build目录
    new CleanWebpackPlugin(),
    // 分离css插件参数为提取出去的路径
    new extractTextPlugin({
      filename: 'css/[name].[hash:8].min.css',
    }),
    //压缩css
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
      },
    }),
  ],
  performance: {
    hints: false,
  },
};
module.exports = merge(webpackConfigBase, webpackConfigProd);
