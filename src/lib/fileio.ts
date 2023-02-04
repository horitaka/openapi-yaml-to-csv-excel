import fs, { readFileSync } from 'fs'
import { join } from 'path'

import { stringify } from 'csv-stringify/sync'
import { load } from 'js-yaml'

import type { OpenApi } from '@/@types'
import { csvHeaders } from '@/constants'

import { convertOpenApiJsonToCsv } from './csv'

export const loadApiDocFromYaml = (path: string): OpenApi => {
  const text = readFileSync(path, 'utf-8')
  return load(text) as OpenApi
}

export const writeApiDocToCsv = (path: string, data: OpenApi) => {
  const outputPath = join(process.cwd(), path)

  const csvData = convertOpenApiJsonToCsv(data)
  const options = {
    header: true,
    columns: csvHeaders.map((header) => ({ key: header })),
  }
  const outputData = stringify(csvData, options)
  fs.writeFileSync(outputPath, outputData)
}
