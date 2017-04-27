const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
      app: './app.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/public/',
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.sass', '.css', '.hbs']
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g)$/i,
        loaders: [
          'file-loader?name=[name].[ext]',
          {
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.hbs$/,
        include: path.join(__dirname, 'src'),
        loader: 'handlebars-loader'
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src'),
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }]
      }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.hbs',
      inject: 'body',
      excludeAssets: [/internal.*.js/, /external.*.js/]
    })
  ]
}

module.exports = config
