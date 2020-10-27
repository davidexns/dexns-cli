module.exports = type => {
  const isReact = ['gatsby', 'next'].includes(type)

  const config = {
    env: {
      browser: true,
      es6: true,
    },
    extends: [
      'eslint:recommended',
      'prettier',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
    ],
    overrides: [
      {
        files: ['*.config.js'],
        env: {
          node: true,
        },
        rules: {
          '@typescript-eslint/no-var-requires': ['off'],
        },
      },
      {
        files: ['**/*.test.js'],
        env: {
          'jest/globals': true,
        },
        extends: [
          'plugin:jest/recommended',
          'plugin:jest-dom/recommended',
          // TODO: Clean this up I hate this tbh
          ...(isReact ? ['plugin:testing-library/react'] : []),
          ...(type === 'sapper' ? ['plugin:testing-library/recommended'] : []),
        ],
        rules: {
          'testing-library/prefer-presence-queries': ['error'],
        },
      },
      // If Cypress
      // {
      //   files: ['cypress/**/*'],
      //   env: {
      //     node: true,
      //   },
      //   extends: ['plugin:cypress/recommended'],
      // },
    ],
    parserOptions: {
      ecmaVersion: 2019,
      sourceType: 'module',
    },
    rules: {
      'import/first': ['error', 'absolute-first'],
    },
  }

  if (isReact) {
    const reactRules = {
      'react/jsx-no-useless-fragment': 'warn',
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/label-has-for': [
        2,
        {
          required: {
            every: ['id'],
          },
        },
      ],
    }

    // TODO: clean up, gross
    if (type === 'next') {
      reactRules['jsx-a11y/anchor-is-valid'] = [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ]
    }

    // add React-specific extends
    config.extends = [
      ...config.extends,
      'plugin:jsx-a11y/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'prettier/react',
    ]
    // add JSX to parserOptions
    config.parserOptions.ecmaFeatures = {
      jsx: true,
    }
    // add rules
    config.rules = Object.assign(config.rules, reactRules)
    // add Settings
    config.settings = {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    }
  }

  return config
}
