module.exports = {
  moduleNameMapper: {
    '\\.svg': '../../__mocks__/resourcesMock.ts',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../coverage/apps/cloud',
  displayName: 'cloud',
};
