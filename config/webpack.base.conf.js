const path = require('path');
const webpack = require('webpack');
const glob = require('glob');

//require("./env-config");
//消除冗余的css
const PurgecssPlugin = require('purgecss-webpack-plugin');
// html模板
const htmlWebpackPlugin = require('html-webpack-plugin');
//静态资源输出
const copyWebpackPlugin = require('copy-webpack-plugin');
const rules = require('./webpack.rules.conf.js');

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function() {
  return {
    template: path.resolve(__dirname, '../public/index.html'),
    filename: `index.html`,
    inject: true,
    hash: false, //开启hash  ?[hash]
    chunks: ['vendor', 'common', 'main'],
    minify:
      process.env.NODE_ENV === 'development'
        ? false
        : {
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true, //折叠空白区域 也就是压缩代码
            removeAttributeQuotes: true, //去除属性引用
          },
  };
};

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  module: {
    rules: [...rules],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: [
      '.mjs',
      '.web.ts',
      '.ts',
      '.web.tsx',
      '.tsx',
      '.web.js',
      '.js',
      '.json',
      '.web.jsx',
      '.jsx',
    ],
  },
  //将外部变量或者模块加载进来
  externals: {
    // 'jquery': 'window.jQuery'
  },
  // 提取公共代码
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'vendor', // 打包后的文件名，任意命名
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10,
        },
        utils: {
          // 抽离自己写的公共代码，common这个名字可以随意起
          chunks: 'initial',
          name: 'common', // 任意命名
          minSize: 0, // 只要超出0字节就生成一个新包
          minChunks: 2,
        },
      },
    },
  },
  plugins: [
    //静态资源输出
    new copyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: path.resolve(__dirname, '../build'),
        ignore: ['.*'],
      },
    ]),
    // 消除冗余的css代码
    // new PurgecssPlugin({
    //   paths: glob.sync(path.join(__dirname, '../src')),
    // }),
    //htmlWebpackPlugin配置
    // @ts-ignore
    new htmlWebpackPlugin(getHtmlConfig()),
  ],
};
