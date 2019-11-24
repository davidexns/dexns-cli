const inquirer = require('inquirer')
const init = require('./commands/init')

const webProjectTypes = [
  { value: 'next', name: 'Next' },
  { value: 'gatsby', name: 'Gatsby' },
]

inquirer
  .prompt([
    {
      type: 'list',
      name: 'projectType',
      message: 'Which type of project would you like to create?',
      choices: [
        ...webProjectTypes,
        { value: 'react-native', name: 'React Native' },
      ],
    },
    {
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
  ])
  .then(answers => {
    init(answers)
  })
