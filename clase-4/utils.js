import { createRequire } from 'node:modules'
const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path)
