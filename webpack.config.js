const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/main.webpack.js',
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'main.min.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
        ]
      },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
      { 
        test: /\.jade$/, 
        use: [
          'jade-loader',
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/jade/index.jade',
      minify: false
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, '.'),
    compress: true,
    port: 9000
  }
}