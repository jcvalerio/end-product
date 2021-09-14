module.exports = config => {
  return {
    ...config,
    externals: [
      {
        'aws-sdk': 'aws-sdk',
      },
    ],
    output: {
      ...config.output,
    },
  };
};
