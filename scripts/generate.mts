import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const inputCssPath = path.resolve(__dirname, 'style.min.css')
const outputTsPath = path.resolve(__dirname, '../src/dom/style.ts')

try {
  const cssContent = await fs.readFile(inputCssPath, 'utf8')

  const tsContent = `export const css = \`${cssContent}\`;`

  await fs.writeFile(outputTsPath, tsContent, 'utf8')

  console.warn('TypeScript file generated successfully.')
}
catch (err) {
  console.error('Error:', err)
}
