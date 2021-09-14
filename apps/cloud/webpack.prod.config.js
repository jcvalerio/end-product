/* eslint-disable */
const getBabelWebpackConfig = require('@nrwl/react/plugins/webpack');
const path = require('path');
const webpackConfig = require('./webpack.config');
const WorkboxPlugin = require('workbox-webpack-plugin');
/* eslint-enable */

module.exports = (config) => {
  const cfg = getBabelWebpackConfig(config);

  return {
    ...webpackConfig(config),
    plugins: [
      ...cfg.plugins,
      new WorkboxPlugin.InjectManifest({
        exclude: [/\.(?:css|html|js|txt|LICENSE)$/],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10Mb
        swSrc: path.resolve(__dirname, './src/sw.js'),
      }),
    ],
  };
};
