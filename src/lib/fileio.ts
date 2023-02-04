import { readFileSync } from 'fs'
import { load } from 'js-yaml'
import { OpenApi } from '@/@types'
import { stringify } from 'csv-stringify/sync'
// import { generate } from 'csv-generate'
import fs from 'fs'
import { join } from 'path'

export const loadApiDocFromYaml = (path: string): OpenApi => {
  const text = readFileSync(path, 'utf-8')
  return load(text) as OpenApi
}

export const writeApiDocToCsv = (path: string, data: OpenApi) => {
  const outputPath = join(process.cwd(), path)

  const csvData = [
    {
      header1: '1',
      header2: '2',
    },
    {
      header1: '3',
      header2: '4',
    },
  ]
  const options = {
    header: true,
    columns: [{ key: 'header1' }, { key: 'header2' }],
  }
  const outputData = stringify(csvData, options)
  fs.writeFileSync(outputPath, outputData)
}
