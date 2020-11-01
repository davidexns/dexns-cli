import execa, { ExecaChildProcess, Options } from 'execa'
// import { execSync } from 'child_process'

type InstallCommands = ['yarn', 'add'] | ['npm', 'install']

// Method for determining if `yarn` can be used inspired by Gatsby
// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-cli/src/init-starter.js
function getInstallCommands(): InstallCommands {
  // Defaulting to only npm for now until I test with yarn v2
  // try {
  //   execSync(`yarnpkg --version`, { stdio: `ignore` })
  //   return ['yarn', 'add']
  // } catch (e) {
  return ['npm', 'install']
  // }
}

export function install(
  packages: string[],
  options: Options,
  isDev: boolean
): ExecaChildProcess {
  const [runner, command]: InstallCommands = getInstallCommands()

  return execa(
    runner,
    [command, ...packages, ...(isDev ? ['-D'] : [])],
    options
  )
}

export function installDev(
  packages: string[],
  options: Options
): ExecaChildProcess {
  return install(packages, options, true)
}

export function npxRun(command: string): ExecaChildProcess {
  const args = command.split(' ')
  return execa('npx', args)
}
