module.exports = {
  clearMocks: true,
  // Default coverage paths
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  // For Next
  // collectCoverageFrom: ['components/**/*.{js,jsx,ts,tsx}', 'pages/**/*.{js,jsx,ts,tsx}'],
  // For Svelte:
  // collectCoverageFrom: ['src/**/*.{js,ts,svelte}'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  // Only needed probably if there is cypress
  // testPathIgnorePatterns: ['node_modules', 'cypress'],
  // Gatsby only:
  // transform: {
  //   '^.+\\.js?$': '<rootDir>/jest-preprocess.js',
  // },
  // Svelte only:
  // transform: {
  //   '^.+\\.svelte$': [
  //     'svelte-jester',
  //     {
  //       preprocess: true,
  //     },
  //   ],
  //   '^.+\\.js$': 'babel-jest',
  //   '^.+\\.ts$': 'ts-jest',
  // },
  // moduleFileExtensions: ['js', 'ts', 'svelte'],
}
