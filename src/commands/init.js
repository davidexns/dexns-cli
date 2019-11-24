const Listr = require('listr')
const {
  createConfigs,
  npxRun,
  initializeGit,
  installDev,
  openProject,
} = require('../helpers')

// type ProjectType = 'gatsby' | 'next' | 'react-native'
// const projectTypes: ReadonlyArray<ProjectType> = [
//   'gatsby',
//   'next',
//   'react-native',
// ]

function getProjectConfig(type) {
  switch (type.toLowerCase()) {
    case 'gatsby':
      // TODO: will need a jest-preprocess file with babel-preset-gatsby
      return {
        initCommand: 'gatsby new',
      }
    case 'next':
      return {
        initCommand: 'create-next-app',
      }
    case 'react-native':
      return {
        initCommand: 'react-native init',
        devDeps: [
          'eslint-plugin-react-native',
          '@testing-library/jest-native',
          '@testing-library/react-native',
        ],
      }
    default:
      return {} // TODO: Probably throw
  }
}

function runInit(answers) {
  const {
    projectType,
    projectName,
    includeTypeScript = false,
    // includeCypress = false,
  } = answers
  const { initCommand, devDeps = [], configTasks = [] } = getProjectConfig(
    projectType
  )
  const isWeb = ['gatsby', 'next'].includes(projectType)

  new Listr([
    {
      title: `Running ${initCommand} command`,
      task: () => npxRun(`${initCommand} ${projectName}`),
    },
    {
      title: 'Install dev dependencies',
      task: () =>
        installDev(
          [
            'babel-eslint',
            'babel-jest',
            'eslint',
            'eslint-config-prettier',
            'eslint-plugin-prettier',
            'eslint-plugin-react',
            'eslint-plugin-react-hooks',
            'husky',
            'jest',
            'lint-staged',
            'prettier',
            ...(isWeb
              ? ['@testing-library/react', '@testing-library/jest-dom']
              : []),
            ...devDeps,
            ...(includeTypeScript
              ? [
                  'typescript',
                  '@typescript-eslint/eslint-plugin',
                  '@typescript-eslint/parser',
                  'ts-jest',
                ]
              : []),
          ],
          { cwd: projectName }
        ),
    },
    {
      // TODO: Create jest, eslint, prettier, prettierignore, husky, lint-staged, and (if applicable) typescript and cypress config files, and add jest test setup file
      // TODO: Note - probably want to check for the existence of one of the mentioned configs (gatsby starts you out with prettierrc and ignore)
      title: 'Creating configuration files',
      task: () => createConfigs(projectName, configTasks),
    },
    // TODO: Create jest setup file
    // {
    //   title: 'Creating jest setup file',
    //   enabled: () => isWeb,
    //   task: () => {},
    // },
    {
      title: 'Initializing git repo',
      task: () => initializeGit(projectName),
    },
    // TODO: Add/run any project-specific tasks
  ])
    .run()
    .then(() => openProject(projectName))
}

module.exports = runInit
