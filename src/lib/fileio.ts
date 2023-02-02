import { readFileSync } from 'fs'
import { load } from 'js-yaml'
import { OpenApi } from '../@types/openapi.d'

export const loadApiDocFromYaml = (path: string): OpenApi => {
  const text = readFileSync(path, 'utf-8')
  return load(text) as OpenApi
}
