import fs from 'fs'

function getFilePath(dirName: string) {
  return `${process.cwd()}/${dirName}/package.json`
}

// TODO: Better typing?
export function getPackageJson(dirName: string): any {
  const filePath = getFilePath(dirName)
  return require(filePath)
}

export function updatePackageJson(
  dirName: string,
  properties: Record<string, unknown>
): void {
  const filePath = getFilePath(dirName)
  const file = getPackageJson(dirName)

  const newFile = {
    ...file,
    ...properties,
  }

  fs.writeFileSync(filePath, JSON.stringify(newFile, null, 2))
}
