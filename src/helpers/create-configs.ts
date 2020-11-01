import fs from 'fs'
import path from 'path'
// import { getPackageJson } from './package-json'
import buildEslintConfig from '../builders/eslint'
import buildHuskyConfig from '../builders/husky'
import buildLintStagedConfig from '../builders/lint-staged'
import buildPrettierConfig from '../builders/prettier'
import { ProjectType } from '../constants/globals'

type CopyFileTuple = ReadonlyArray<[string, string]>

function copyFiles(projectRoot: string, fileNames: CopyFileTuple = []) {
  fileNames.forEach(([fromName, to]) => {
    fs.copyFile(
      path.resolve(__dirname, `../config-helpers/${fromName}`),
      `${projectRoot}/${to}`,
      err => {
        if (err) throw err
      }
    )
  })
}

// Configs should be array pairings of file name and data function.
function writeJsonConfigs(
  rootDir: string,
  projectType: ProjectType,
  configs: ReadonlyArray<[string, (type: ProjectType) => void]>
) {
  configs.forEach(([fileName, dataFunction]) => {
    fs.writeFile(
      `${rootDir}/${fileName}`,
      JSON.stringify(dataFunction(projectType), null, 2),
      err => {
        if (err) throw err
      }
    )
  })
}

// Approach thoughts:
// ESLint config should be extending an eslint-config-dexns something or other

export function createConfigs(dirName: string, type: ProjectType): void {
  const rootDir = `${process.cwd()}/${dirName}`
  // const rootDir = path.resolve(process.cwd(), `./${dirName}`)

  // TODO: check if TypeScript and/or Cypress are flagged
  // Check for the presence of existing files or configs in package.json???
  // get package.json
  // const packageJson = getPackageJson(dirName)

  // check for jest, prettier, or eslint items in package.json and root directory
  // const configKeys = Object.keys(packageJson).filter(key =>
  //   ['eslint', 'jest', 'prettier'].includes(key)
  // )
  // if (configKeys.length) {
  // TODO: Shoot, need an option to delete properties from package.json
  // }

  // if found, pull the objects in and add them to overrides in the future TODO below, then remove from package.json

  // Create the files (reading existing if necessary?)
  // TODO: Instead of copying like this, they should be imported/required and assigned in newly created files
  copyFiles(rootDir, [
    ['jest.js', 'jest.config.js'],
    ['prettierignore', '.prettierignore'],
  ])

  writeJsonConfigs(rootDir, type, [
    ['.eslintrc.json', buildEslintConfig],
    ['.huskyrc.json', buildHuskyConfig],
    ['.lintstagedrc.json', buildLintStagedConfig],
    ['.prettierrc.json', buildPrettierConfig],
  ])

  // TODO: Import the default configs (and potentially adding the configs from an existing file as overrides)
}
