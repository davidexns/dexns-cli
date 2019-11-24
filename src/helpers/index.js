const { createConfigs } = require('./create-configs')
const { initializeGit } = require('./git')
const { install, installDev, npxRun } = require('./install')
const { openProject } = require('./open-project')
const { getPackageJson, updatePackageJson } = require('./package-json')

module.exports = {
  createConfigs,
  getPackageJson,
  initializeGit,
  install,
  installDev,
  npxRun,
  openProject,
  updatePackageJson,
}
