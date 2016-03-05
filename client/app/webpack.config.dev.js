var webpack = require('webpack');
var webpackConfig = require('./webpack.config.base');


webpackConfig.plugins.push(
  /** The DefinePlugin-plugin is a funky preprocessor. It's a bit like C-style
    * preprocessor that just replaces strings, but the rules are more complex.
    * See <https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin>
    *
    * The DefinePlugin can be used to define JS variables for the client-side
    * code. We use the process.env.ENV_VAR convention as in nodejs.
    *
    * E.g. process.env.DEBUG will be replaced with 'true' in the bundled code,
    * so if(process.env.DEBUG) becomes if(true) after minification if(true)
    * is simplified away.
    */
  new webpack.DefinePlugin({
    'process.env.DEBUG': true,
    /**
     * If app is operating within /blog/* set the base path to "/blog".
     * In dev environment we are operating within /* so this is an empty
     * string.
     */
    'process.env.APP_BASE_PATH': "''",
    'process.env.API_BASE_PATH': "'/api'",
    'process.env.GA_TRACKING_ID': "''"
  })
);

webpackConfig.devServer = {
  contentBase: './static',
  inline: true,
  lazy: false,
  watchOptions: {
    // Faster polling might not work because of slow sync from host machine
    // (virtualbox)
    poll: 1000
  },
  historyApiFallback: true,
  proxy: {
    '/api/*': {
      target: 'http://backend:5000', // Set api path and port here
      xfwd: true,
    },
  },
  // IP and port where webpack-dev-server is accessible (client development)
  // TODO: move to env variables
  port: 8000,
  host: '0.0.0.0'
};

module.exports = webpackConfig;
