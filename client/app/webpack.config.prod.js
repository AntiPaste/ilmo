var webpack = require('webpack');
var webpackConfig = require('./webpack.config.base');


webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env.DEBUG': false,
    /**
     * If app is operating within /blog/* set the base path to "/blog".
     * In dev environment we are operating within /* so this is an empty
     * string.
     */
    'process.env.APP_BASE_PATH': "''",
    'process.env.API_BASE_PATH': "'/api'",
    'process.env.NODE_ENV': "'production'",
    'process.env.GA_TRACKING_ID': "'UA-30738033-4'"
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(true),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.BannerPlugin('Copyright 2015 Taito United Oy - All rights reserved.'),
  new webpack.NoErrorsPlugin()
);

module.exports = webpackConfig;
