const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

var config = {
  postcss: [autoprefixer],
  resolve: {
    extensions: ['', '.js', '.scss'],
    modulesDirectories: ['node_modules', 'src']
  },
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: path.join(__dirname, 'app', 'public'),
//    publicPath: '/public/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?limit=10000&minetype=application/font-woff&name=[path][name].[ext]' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=[path][name].[ext]' },
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.jsx?$/,
        include: /src/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!resolve-url-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss?sourceMap!resolve-url!sass?sourceMap')
      }/*,
      {
        test: /\.(?:eot|ttf|woff2?)$/,
        loader: 'file-loader?name=[path][name]-[hash:6].[ext]&context=assets'
      }*/
    ]
  },
  toolbox: {theme: 'src/theme.scss'},
  plugins: [
    /*
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    */
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}
    }),
    new CopyWebpackPlugin([
      { from: 'app_package.json', to: '../package.json' },
      { from: 'main.js', to: '../main.js' },
      { from: 'src/index.' + process.env.NODE_ENV + '.html', to: 'index.html' }
    ]),

    // Moment.js imports the locales dynamically which is why webpack will include all 60 locales (>300kb)
    // if we don't override this behaviour.
    // Here we "whitelist" the paths that will be imported when moment/locales/* is imported
    // We tell it that we are interested in de, en-gb, da & nl. Afrikaans etc. will stay out. :)
    // This results in a bundle size reduction of 300kb / 150KB minified
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /(de|en-gb|da|nl)$/)
  ].concat(production ? [
    new webpack.optimize.UglifyJsPlugin({
      // compress: {drop_console: true},
      sourceMap: false // This means dropping build time from ~45 sec to ~32 sec
    })] : []),
  devtool: 'inline-source-map'
};

// const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
// config.target = webpackTargetElectronRenderer(config);

module.exports = config;
