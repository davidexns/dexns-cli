module.exports = type => {
  const defaultConfig = {
    endOfLine: 'lf',
    semi: false,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'es5',
  }

  switch (type) {
    case 'sapper':
      return {
        ...defaultConfig,
        svelteBracketNewLine: true,
        svelteSortOrder: 'scripts-markup-styles',
      }
    default:
      return defaultConfig
  }
}
