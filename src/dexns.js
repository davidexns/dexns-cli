const prompts = require('prompts')
const init = require('./commands/init')

const webProjectTypes = [
  { value: 'next', title: 'Next' },
  { value: 'gatsby', title: 'Gatsby' },
]

const questions = [
  {
    type: 'select',
    name: 'projectType',
    message: 'Which type of project would you like to create?',
    choices: [
      ...webProjectTypes,
      { value: 'react-native', title: 'React Native' },
    ],
  },
  {
    type: 'text',
    name: 'projectName',
    message: 'What would you like to name your project?',
    validate: input => input.length > 0 || 'Please provide a project name',
  },
  // {
  //   type: 'confirm',
  //   name: 'includeTypeScript',
  //   message: 'Would you like to use TypeScript?',
  //   default: false,
  // },
  // {
  //   when: answers => webProjectTypes.includes(answers.projectType),
  //   name: 'includeCypress',
  //   type: 'confirm',
  //   message: 'Would you like to include Cypress?',
  //   default: false,
  // },
]

async function run() {
  let isCancel = false
  const response = await prompts(questions, {
    onCancel: () => {
      isCancel = true
    },
  })
  if (!isCancel) {
    init(response)
  }
}

run()
