module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
  },
  plugins: ['node'],
  env: {
    es6: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:node/recommended', 'prettier'],
  globals: {
    name: 'off',
  },
}
