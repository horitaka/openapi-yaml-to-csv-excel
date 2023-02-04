import { readFileSync } from 'fs'
import { load } from 'js-yaml'
import { OpenApi } from '@/@types'
import { stringify } from 'csv-stringify/sync'
import fs from 'fs'
import { join } from 'path'
import { convertOpenApiJsonToCsv } from './csv'
import { csvHeaders } from '@/constants'

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
