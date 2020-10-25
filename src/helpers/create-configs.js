const fs = require('fs')
const path = require('path')
const { getPackageJson } = require('./package-json')
const buildEslintConfig = require('../config/eslint')

function copyFiles(projectRoot, fileNames = []) {
  fileNames.forEach(([fromName, to]) => {
    fs.copyFile(
      path.resolve(__dirname, `../config/${fromName}`),
      `${projectRoot}/${to}`,
      err => {
        if (err) throw err
      }
    )
  })
}

// Approach thoughts:
// ESLint config should be extending an eslint-config-dexns something or other

function createConfigs(dirName, type) {
  const rootDir = `${process.cwd()}/${dirName}`

  // TODO: check if TypeScript and/or Cypress are flagged
  // Check for the presence of existing files or configs in package.json???
  // get package.json
  const packageJson = getPackageJson(dirName)

  // check for jest, prettier, or eslint items in package.json and root directory
  const configKeys = Object.keys(packageJson).filter(key =>
    ['eslint', 'jest', 'prettier'].includes(key)
  )
  if (configKeys.length) {
    // TODO: Shoot, need an option to delete properties from package.json
  }

  // if found, pull the objects in and add them to overrides in the future TODO below, then remove from package.json

  // Create the files (reading existing if necessary?)
  // TODO: Instead of copying like this, they should be imported/required and assigned in newly created files
  copyFiles(rootDir, [
    ['husky.js', '.huskyrc.js'],
    ['jest.js', 'jest.config.js'],
    ['lint-staged.js', '.lintstagedrc.js'],
    ['prettier.js', '.prettierrc.js'],
    ['prettierignore', '.prettierignore'],
  ])

  const eslint = buildEslintConfig(type)

  fs.writeFile(
    `${rootDir}/.eslintrc.json`,
    JSON.stringify(eslint, null, 2),
    err => {
      if (err) throw err
    }
  )

  // TODO: Import the default configs (and potentially adding the configs from an existing file as overrides)
}

module.exports = {
  createConfigs,
}
