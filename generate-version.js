const fs = require('node:fs/promises')
const versionFile = 'src/version.ts'

async function main() {
  const versionParts = JSON.parse( (await fs.readFile('package.json')).toString() ).version.split('.')
  const content = `export const version = '${versionParts[0]}.${versionParts[1]}'`
  await fs.writeFile(versionFile, content)
}

main()
