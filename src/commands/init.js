const prompts = require('prompts')
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
const projectTypes = ['gatsby', 'next', 'sapper', 'react-native']
const webProjectTypes = [
  { value: 'next', title: 'Next' },
  { value: 'sapper', title: 'Sapper (Svelte)' },
  { value: 'gatsby', title: 'Gatsby' },
]

const questions = {
  projectType: {
    type: 'select',
    name: 'projectType',
    message: 'Which type of project would you like to create?',
    choices: [
      ...webProjectTypes,
      { value: 'react-native', title: 'React Native' },
    ],
  },
  projectName: {
    type: 'text',
    name: 'projectName',
    message: 'What would you like to name your project?',
    validate: input => input.length > 0 || 'Please provide a project name',
  },
  // typeScript: {
  //   type: 'confirm',
  //   name: 'includeTypeScript',
  //   message: 'Would you like to use TypeScript?',
  //   initial: true,
  // },
  // cypress: {
  // when: answers => webProjectTypes.includes(answers.projectType),
  //   name: 'includeCypress',
  //   type: 'confirm',
  //   message: 'Would you like to include Cypress?',
  //   initial: true,
  // },
}

function getProjectConfig(type) {
  const reactWebDeps = [
    '@testing-library/react',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
  ]
  switch (type.toLowerCase()) {
    case 'gatsby':
      // TODO: will need a jest-preprocess file with babel-preset-gatsby
      return {
        initCommand: 'gatsby new',
        devDeps: reactWebDeps,
      }
    case 'next':
      return {
        initCommand: 'create-next-app',
        devDeps: reactWebDeps,
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
    case 'sapper':
      return {
        initCommand: 'degit sveltejs/sapper-template#rollup',
        devDeps: [
          '@rollup/plugin-typescript',
          '@testing-library/svelte',
          '@tsconfig/svelte',
          'prettier-plugin-svelte',
          'rollup-plugin-svelte-svg',
          'svelte-check',
          'svelte-htm',
          'svelte-jester',
          'svelte-preprocess',
        ],
      }
    default:
      return {} // TODO: Probably throw
  }
}

async function actionHandler(projectType, projectName, options) {
  let isCancel = false
  const onCancel = () => (isCancel = true)

  const answers = {
    ...(projectType && projectTypes.includes(projectType)
      ? { projectType }
      : await prompts(questions.projectType, { onCancel })),
    ...(projectName
      ? { projectName }
      : await prompts(
          {
            ...questions.projectName,
            type: isCancel ? null : questions.projectName.type,
          },
          { onCancel }
        )),
  }

  // If the user went through the prompt flow, ask about Cypress and TypeScript
  // if (!projectName) {
  // save the options here
  // }

  // Run the init if user didn't cancel
  if (!isCancel) {
    runInit(answers, options)
  }
}

function runInit(answers, options = {}) {
  const {
    projectType,
    projectName,
    includeTypeScript = true,
    // includeCypress = false,
  } = answers
  const { openCode = false } = options
  const { initCommand, devDeps = [] } = getProjectConfig(projectType)
  const isWeb = ['gatsby', 'next', 'sapper'].includes(projectType)

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
            'babel-eslint', // TODO: Do I always need this?
            'babel-jest',
            'eslint',
            'eslint-config-prettier',
            'eslint-plugin-import', // TODO: May only need this for React projects
            'eslint-plugin-jest',
            'eslint-plugin-jest-dom',
            'eslint-plugin-prettier',
            'eslint-plugin-testing-library',
            'husky',
            'jest',
            'lint-staged',
            'prettier',
            ...(isWeb
              ? ['@testing-library/jest-dom', '@testing-library/user-event']
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
      task: () => createConfigs(projectName, projectType),
    },
    // TODO: Create jest setup file
    // {
    //   title: 'Creating jest setup file',
    //   task: () => {},
    // },
    {
      title: 'Initializing git repo',
      task: () => initializeGit(projectName),
    },
    // TODO: Add/run any project-specific tasks
  ])
    .run()
    .then(() => {
      if (openCode) openProject(projectName)
    })
}

module.exports = actionHandler
