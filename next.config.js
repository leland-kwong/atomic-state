module.exports = {
  webpack: (config, {
    buildId, dev, isServer, defaultLoaders, webpack,
  }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    config.module.rules.push({
      test: /\.js|\.ts|\.tsx$/,
      loader: require.resolve('@open-wc/webpack-import-meta-loader'),
    });
    return config;
  },
  webpackDevMiddleware: (config) =>
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    config
  ,
};
