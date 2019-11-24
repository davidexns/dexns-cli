const execa = require('execa')
const { execSync } = require('child_process')

// Method for determining if `yarn` can be used inspired by Gatsby
// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-cli/src/init-starter.js
function getInstallCommands() {
  try {
    execSync(`yarnpkg --version`, { stdio: `ignore` })
    return ['yarn', 'add']
  } catch (e) {
    return ['npm', 'install']
  }
}

function install(packages, options, isDev) {
  const [runner, command] = getInstallCommands()

  return execa(runner, [command, ...packages, isDev && '-D'], options)
}

function installDev(packages, options) {
  return install(packages, options, true)
}

function npxRun(command) {
  const args = command.split(' ')
  return execa('npx', args)
}

module.exports = {
  install,
  installDev,
  npxRun,
}
