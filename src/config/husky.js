module.exports = type => {
  return {
    hooks: {
      'pre-commit':
        type === 'sapper' ? 'lint-staged && svelte-check' : 'lint-staged',
      'pre-push': 'npm run lint',
    },
  }
}
