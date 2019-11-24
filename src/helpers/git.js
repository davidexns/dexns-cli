const execa = require('execa')

function initializeGit(dirName) {
  execa('git', ['init', '-q'], { cwd: dirName })
}

module.exports = {
  initializeGit,
}
