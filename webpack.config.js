var path = require('path');
var webpack = require('webpack');
var autoprefixer           = require('autoprefixer');
var precss                 = require('precss');
var rucksack                 = require('rucksack-css');
var nodeModules            = path.resolve(__dirname, './node_modules');
var modules                = path.resolve(__dirname, './src/js/modules');
var ExtractTextPlugin      = require('extract-text-webpack-plugin');
//var HtmlWebpackPlugin      = require('html-webpack-plugin');
var buildDir = 'build';
var process           = require('process');
var env               = process.env.NODE_ENV || 'development';


var config = {
  context: __dirname,
  entry: {
    index: './index.js'
  },

  output: {
    path: __dirname + '/' + buildDir,
    filename: '[name].js',
    publicPath: '/',
    sourceMapFilename: '[name].map'
  },
  resolve: {
    root: [
      path.resolve('./node_modules')
    ],
    extensions: ['', '.jsx', '.js', '.scss', '.svg'],
    modulesDirectories: [
      'web_modules',
      'node_modules',
      './',
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './src/icons'),
      path.resolve(__dirname, './src/components'),
      path.resolve(__dirname, './src/lib')
    ]
  },
  module: {
    //resolve: {
    //  extensions: ['', '.jsx', '.js', '.scss'],
    //  alias: {
    //    modules: modules
    //  },
    //},
    loaders:[
      //{
      //  test   : /fonts?\/.*\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      //  loader : 'file-loader?name=[path][name].[ext]'
      //},
      {
        test: /\.html$/,
        loader: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /\.(jpg|png|gif)$/,
        loaders: [
          'file-loader?name=[path][name].[ext]'
        ]
      },
      { test: /\.svg$/,
        loader: 'babel?presets[]=es2015,presets[]=react!svg-react'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.scss/,
        loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=[local]-[name]-[hash:base64:5]!postcss!sass?sourceMap&includePaths[]='
          +'&includePaths[]='
          + 'node_modules'
          +'&includePaths[]='
          + 'node_modules/breakpoint-sass/stylesheets'
          +'&includePaths[]='
          + 'node_modules/reset.scss'
          +'&includePaths[]='
          + 'node_modules/susy/sass'
      },
    ]
  },
  postcss: function () {
    return [autoprefixer, rucksack, precss];
  },
  stats: {
    colors: true
  },
  devtool: 'eval-source-map',
  plugins: [
    //new ExtractTextPlugin('css/main.css', {allChunks: true}),
    //new webpack.EnvironmentPlugin([
    //  'NODE_ENV'
    //]),
    //new webpack.ProvidePlugin({
    //  TweenLite: 'TweenLite'
    //}),
  ]
};

config.devServer = {
  contentBase: '/',
    hot: true,
    inline: true
};

module.exports = config;
