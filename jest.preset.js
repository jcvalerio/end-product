const nxPreset = require('@nrwl/jest/preset');
module.exports = {
  ...nxPreset,
  collectCoverage: true,
  coverageReporters: ['html'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  resolver: '@nrwl/jest/plugins/resolver',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
};
