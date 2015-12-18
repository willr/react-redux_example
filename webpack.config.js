

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map', 
  entry: {
    path: path.join(__dirname, 'app')
  },
  output: {
      path: path.join(__dirname, '/public/js'),
      filename: "bundle.js",
      publicPath: '/public/js/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.jsx?$/, 
        exlude: /node_modules/, 
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devServer: {
    contentBase: './public'
  }
};

