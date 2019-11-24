const execa = require('execa')

function openProject(dirName) {
  execa('code', ['.'], { cwd: dirName })
}

module.exports = {
  openProject,
}
