import fs, { readFileSync } from 'fs'
import { join } from 'path'

import { stringify } from 'csv-stringify/sync'
import { load } from 'js-yaml'

import type { OpenApi } from '@/@types'
import { csvHeaders } from '@/constants'

import { convertOpenApiJsonToCsv } from './csv'

export const loadApiDocFromYaml = (path: string): OpenApi => {
  try {
    fs.accessSync(path, fs.constants.F_OK | fs.constants.R_OK)
  } catch (e) {
    throw new Error(`Error: ${path} does not exist or is not readable.`)
  }

  const text = readFileSync(path, 'utf-8')
  const apiDocJosn = load(text) as OpenApi
  if (!apiDocJosn.openapi) {
    throw new Error(`Error: ${path} is not a valid yaml file.`)
  }

  return apiDocJosn
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

export const getOutputFilePath = (inputPath: string, outputPath?: string): string => {
  if (outputPath) {
    return outputPath
  } else {
    return inputPath.replace(/(.yaml|.yml)/, '.csv')
  }
}
