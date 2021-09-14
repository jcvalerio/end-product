const getBabelWebpackConfig = require('@nrwl/react/plugins/webpack');

module.exports = (config) => {
  const cfg = getBabelWebpackConfig(config);
  return {
    ...cfg,
    node: {
      global: true,
      process: true,
    },
    module: {
      ...cfg.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader'],
        },
        {
          test: /\.(md)$/,
          use: ['file-loader'],
        },
      ],
    },
  };
};
