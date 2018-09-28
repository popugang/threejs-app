const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');

const babel = require('./webpack/babel');
const devServer = require('./webpack/dev-server');
const fonts = require('./webpack/fonts');
const images = require('./webpack/images');
const html = require('./webpack/html');

const isProd = process.env.NODE_ENV === 'production';

const PATH = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

const common = merge([
  {
    // entry: { app: ['./src/index.js', './src/styles.css'] },
    entry: { app: ['./src/index.js'] },
    output: {
      path: PATH.build,
      filename: 'bundle.[hash].js',
      chunkFilename: '[name].chunk.[hash].js'
    },

    resolve: {
      extensions: ['.js', '.css'],
      modules: ['node_modules'],
      alias: {
        app: path.resolve(__dirname, 'app'),
        api: path.resolve(__dirname, 'app', 'api'),
        components: path.resolve(__dirname, 'app', 'components'),
        configs: path.resolve(__dirname, 'app', 'configs'),
        constants: path.resolve(__dirname, 'app', 'constants'),
        src: path.resolve(__dirname, 'src')
      }
    },

    plugins: [
      new HtmlWebPackPlugin({
        template: `${PATH.src}/index.html`,
      })
    ]
  },
  babel(),
  html(),
  fonts(),
  images(),
]);

module.exports = () =>
  isProd
    ? merge([common])
    : merge([common, {
          devtool: 'cheap-module-source-map',
          performance: {
            hints: false
          },
          plugins: [new webpack.HotModuleReplacementPlugin()]
        },
        devServer(),
      ]);
