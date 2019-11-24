module.exports = {
  '*.{js,ts,tsx}': ['eslint'],
  '*.{js,ts,tsx,json,md}': ['prettier --write', 'git add'],
}
