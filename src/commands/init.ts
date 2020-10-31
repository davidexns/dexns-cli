import prompts, { Answers, PromptObject } from 'prompts'
import Listr from 'listr'
import {
  createConfigs,
  npxRun,
  initializeGit,
  installDev,
  openProject,
} from '../helpers'
import { ProjectType } from '../typings/globals'

const webProjectTypes = [
  { value: ProjectType.Next, title: 'Next' },
  { value: ProjectType.Sapper, title: 'Sapper (Svelte)' },
  { value: ProjectType.Gatsby, title: 'Gatsby' },
]

// const questions = {
//   projectType: {
//     type: 'select',
//     name: 'projectType',
//     message: 'Which type of project would you like to create?',
//     choices: [
//       ...webProjectTypes,
//       { value: ProjectType.ReactNative, title: 'React Native' },
//     ],
//   },
//   projectName: {
//     type: 'text',
//     name: 'projectName',
//     message: 'What would you like to name your project?',
//     validate: input => input.length > 0 || 'Please provide a project name',
//   },
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
// }

type ProjectConfig = {
  initCommand: string
  devDeps: string[]
}

function getProjectConfig(type: ProjectType): ProjectConfig {
  const reactWebDeps = [
    '@testing-library/react',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
  ]
  switch (type) {
    case ProjectType.Gatsby:
      // TODO: will need a jest-preprocess file with babel-preset-gatsby
      return {
        initCommand: 'gatsby new',
        devDeps: reactWebDeps,
      }
    case ProjectType.Next:
      return {
        initCommand: 'create-next-app',
        devDeps: reactWebDeps,
      }
    case ProjectType.ReactNative:
      return {
        initCommand: 'react-native init',
        devDeps: [
          'eslint-plugin-react-native',
          '@testing-library/jest-native',
          '@testing-library/react-native',
        ],
      }
    case ProjectType.Sapper:
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
      throw new Error()
  }
}

type InitOptions = {
  openCode?: boolean
}

async function actionHandler(
  projectType?: ProjectType,
  projectName?: string,
  options?: InitOptions
): Promise<void> {
  let isCancel = false
  const onCancel = () => (isCancel = true)

  const promptQuestions: PromptObject[] = []
  if (!projectType) {
    promptQuestions.push({
      type: 'select',
      name: 'projectType',
      message: 'Which type of project would you like to create?',
      choices: [
        ...webProjectTypes,
        {
          value: ProjectType.ReactNative,
          title: 'React Native',
        },
      ],
    })
  }
  if (!projectName) {
    promptQuestions.push({
      type: isCancel ? null : 'text',
      name: 'projectName',
      message: 'What would you like to name your project?',
      validate: input => input.length > 0 || 'Please provide a project name',
    })
  }

  const promptAnswers: InitAnswers | any = await prompts(promptQuestions, {
    onCancel,
  })

  const answers = {
    projectType,
    projectName,
    ...promptAnswers,
  }

  // If the user went through the prompt flow, ask about Cypress
  // if (!projectName) {
  // save the options here
  // }

  // Run the init if user didn't cancel
  if (!isCancel) {
    runInit(answers, options)
  }
}

type InitAnswers = {
  projectName: string
  projectType: ProjectType
}

function runInit(answers: InitAnswers, options: InitOptions = {}) {
  const {
    projectType,
    projectName,
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
            'typescript',
            '@typescript-eslint/eslint-plugin',
            '@typescript-eslint/parser',
            'ts-jest',
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

export default actionHandler
