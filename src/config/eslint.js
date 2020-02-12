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
    'plugin:import/errors',
    'plugin:import/warnings',
    // "plugin:import/typescript",
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
  rules: {
    'import/first': ['error', 'absolute-first'],
  },
  settings: {
    react: {
      version: 'detect',
    },
    // Below line if TypeScript
    // 'import/resolver': {
    //   node: {
    //     extensions: ['.js', '.jsx', '.ts', '.tsx'],
    //   },
    // },
  },
}
