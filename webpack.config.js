// webpack.config.js
const webpack = require('webpack');

module.exports = {
  // other config...

  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
