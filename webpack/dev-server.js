module.exports = () => ({
  devServer: {
    contentBase: ['./src/fonts', './src/img'],
    historyApiFallback: true,
    hot: true,
    compress: true,
    port: 8080,
    publicPath: '/',
    quiet: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  }
});
