const fs = require('fs')

function getFilePath(dirName) {
  return `${process.cwd()}/${dirName}/package.json`
}

function getPackageJson(dirName) {
  const filePath = getFilePath(dirName)
  return require(filePath)
}

function updatePackageJson(dirName, properties) {
  const filePath = getFilePath(dirName)
  const file = getPackageJson(dirName)

  const newFile = {
    ...file,
    ...properties,
  }

  fs.writeFileSync(filePath, JSON.stringify(newFile, null, 2), err => {
    if (err) console.error(err)
  })
}

module.exports = {
  getPackageJson,
  updatePackageJson,
}
