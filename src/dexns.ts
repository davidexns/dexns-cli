import Commander from 'commander'
import init from './commands/init'
import packageJson from '../package.json'

// const packageJson = { version: '0.1.0' }

const program = new Commander.Command('dexns').version(packageJson.version)

program
  .command('init [project-type] [project-name]')
  .alias('i')
  .description('Create a new project with sensible defaults')
  .option('-O, --open-code', 'Open the new repository in VS Code')
  // .option('-C, --include-cypress', 'include cypress dependency and config')
  .action(init)

program.parse(process.argv)

// async function defaultRunner() {
//   const response = await prompts({
//     type: 'select',
//     name: 'cmd',
//     message: 'What action would you like to perform?',
//     choices: [
//       { value: 'init', title: 'Create a new project' },
//       { value: 'other', title: 'Something else' },
//     ],
//   })

//   // Run the handler based on the specified command
//   switch (response.cmd) {
//     case 'init': {
//       return initAction()
//     }
//     case 'other': {
//       return otherHandlerButThisIsNotRealRightNow()
//     }
//     default: {
//       return
//     }
//   }
// }

if (process.argv.length < 3) {
  // TODO: default to init for now, eventually prompt for an action type
  // defaultRunner()
  init()
}
