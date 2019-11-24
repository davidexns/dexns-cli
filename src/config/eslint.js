module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: [
    // add cypress and typescript if flagged
    // differing plugins based on project type?
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'prettier',
    'prettier/react',
  ],
  overrides: [
    {
      files: ['test-utils/setup.js'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['prettier', 'react', 'react-hooks', 'jest'],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
