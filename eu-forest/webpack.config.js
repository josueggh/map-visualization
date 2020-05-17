const path = require('path')
const webpack = require('webpack');

const CONFIG = {
  mode: 'development',

  entry: {
    app: './src/app.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    index: 'index.html'
  },
  plugins: [
    new webpack.EnvironmentPlugin(['GoogleMapsAPIKey'])
  ]
};

module.exports = CONFIG;
