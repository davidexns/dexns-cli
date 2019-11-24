module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/test-utils/setup.js'],
  // Gatsby only:
  // transform: {
  //   '^.+\\.js?$': '<rootDir>/jest-preprocess.js',
  // },
}
