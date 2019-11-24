module.exports = {
  '*.{js,ts}': ['eslint'],
  '*.{js,ts,json,md}': ['prettier --write', 'git add'],
}
