module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [],
              presets: [
                [
                  '@babel/env',
                  {
                    targets: {
                      node: 'current',
                      browsers: ['last 2 versions']
                    }
                  }
                ],
              ],
              env: {
                production: {
                  presets: []
                }
              }
            }
          }
        ]
      }
    ]
  }
});
