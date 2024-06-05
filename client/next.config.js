module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300; // detect file changes in every 3 mili second
    return config;
  },
};
