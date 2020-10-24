module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: [
    // differing plugins based on project type?
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:jest-dom/recommended',
    'plugin:jsx-a11y/recommended',
    // May have to adjust this one if I add svelte
    'plugin:testing-library/react',
    'prettier',
    'prettier/react',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
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
  plugins: [
    'prettier',
    'react',
    'react-hooks',
    'jest',
    'jest-dom',
    'jsx-a11y',
    'testing-library',
  ],
  rules: {
    'import/first': ['error', 'absolute-first'],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
