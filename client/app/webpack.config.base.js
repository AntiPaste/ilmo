var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');


/**
  * This file contains the base configuration for client side webpack.
  * The base configuration is extended by environment specific configuration
  * files.
  *
  * Note that this file is NOT run through babel transpilation before execution.
  */

var webpackConfig = {
  // Source maps keep a mapping from bundled/generated code to original code.
  // This allows us to keep error messages clear. E.g. instead of getting
  //   "Error on massive.bundle.js:6834"
  // we can use to source map and get
  //   "Error on specific.module.js:61".
  devtool: 'source-map',

  // Entry point for the application: where it starts.
  entry: './app.js',

  // When webpack bundles your application, the bundled file(s) need to be saved
  // somewhere. Settings under `output` affect this.
  output: {
    // Directory where the bundle is saved.
    // The path should be absolute according to the webpack docs.
    path: path.join(__dirname, '../_build/client'),

    // Filename for entry point chunk, relative to output.path dir above.
    // [hash] is replaced with the unique compilation hash.
    // The hash is useful for busting the browser cache when app.js is updated.
    filename: 'app.[hash].js',

    // The output.path, but from the viewpoint of the Javascript / HTML page.
    // I.e. root path where the application is served over HTTP,
    // http://example.com/public/path would mean publicPath: '/public/path'
    publicPath: '/',
  },
  plugins: [
    // The HtmlWebpackPlugin plugin will generate an HTML5 file for you that
    // includes all your webpack bundles in the body using script tags.
    new HtmlWebpackPlugin({
      title: 'Ilmo',
      template: 'index.html.template',

      // All javascript resources will be placed at the bottom of the body
      // element.
      inject: 'body',
    })
  ],
  module: {
    // Preloaders are run before normal loaders. Useful for linting before
    // any code transformations, or to do image compression.
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules|shared/,
        loader: 'eslint-loader'
      },
    ],

    // Loaders do resource transformations, e.g. SASS to CSS
    // Loaders are functions that take the source resource file and return
    // the new source.
    loaders: [
      // Run .js and .jsx files through babel transform.
      // Babel will transform JSX to plain JS and ES6 features to ES5.
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },

      /**
        * Run .scss files through first through sass, then css and style loaders.
        * - sass-loader converts sass styles to css
        * - css-loader processes urls, fonts, and other resources
        * - style-loader transforms the styles into a <style> tag
        *
        * With this transform, scss files can be imported via a
        *   require('./foo.scss')
        * instruction, which is the CommonJS style.
        * In our case, we use ES6 "import './foo.scss'" which is changed to
        * a require() statement by babel.
        *
        * It may seem really weird to include some SCSS into a JavaScript file.
        * However, if you get over it, this allows us a modular structure:
        * All your components are now better isolated, each one containing its
        * own style and logic.
        *
        * TODO: Extract CSS to a separate cacheable file, see
        * "Move CSS in external stylesheet" in
        * <http://www.jonathan-petitcolas.com/2015/05/15/howto-setup-webpack-on-es6-react-application-with-sass.html>
        * Maybe: Add [hash] to the css file like app.[hash].js is done?
        * Can we have a separate hash for this file? One that changes when
        * styles are changed. See [contenthash] at
        * <https://github.com/webpack/extract-text-webpack-plugin#api>
        */
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style!css!autoprefixer!sass',
      }
    ]
  }
}

module.exports = webpackConfig;
