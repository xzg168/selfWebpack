const extractTextPlugin = require('extract-text-webpack-plugin');
const rules = [
  {
    test: /\.css$/,
    exclude: /\.module\.css$/,
    // 区别开发环境和生成环境
    use:
      process.env.NODE_ENV === 'development'
        ? ['style-loader', 'css-loader', 'postcss-loader']
        : extractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader'],
            // css中的基础路径
            publicPath: './',
          }),
  },
  {
    test: /\.module.css$/,
    use:
      process.env.NODE_ENV === 'development'
        ? [
            'style-loader',
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
            'postcss-loader',
          ]
        : extractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  modules: true,
                },
              },
              'postcss-loader',
            ],
            // css中的基础路径
            publicPath: './',
          }),
  },
  {
    test: /\.(js|jsx|mjs|ts|tsx)$/,
    use: [
      {
        loader: 'babel-loader',
      },
    ],
    // 不检查node_modules下的js文件
    exclude: '/node_modules/',
  },
  {
    test: /\.(png|jpg|gif)$/,
    use: [
      {
        // 需要下载url-loader
        loader: 'url-loader',
        options: {
          limit: 5 * 1024, //小于这个时将会已base64位图片打包处理
          // 图片文件输出的文件夹
          publicPath: './images',
          outputPath: 'images',
        },
      },
    ],
  },
  {
    test: /\.html$/,
    // html中的img标签
    use: {
      loader: 'html-loader',
      options: {
        attrs: ['img:src', 'img:data-src', 'audio:src'],
        minimize: true,
      },
    },
  },
  {
    test: /\.less$/,
    // 区别开发环境和生成环境
    use:
      process.env.NODE_ENV === 'development'
        ? [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
            },
            { loader: 'less-loader', options: { javascriptEnabled: true } },
          ]
        : extractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'postcss-loader',
              { loader: 'less-loader', options: { javascriptEnabled: true } },
            ],
            // css中的基础路径
            publicPath: './',
          }),
    // 切记这个地方一定要引入antd，文档上没有写入但是一定要因引进去，切记切记
    include: [/antd/],
  },
];
module.exports = rules;
