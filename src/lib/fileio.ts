import fs, { readFileSync } from 'fs'
import { join } from 'path'

import { parse } from 'csv-parse/sync'
import { stringify } from 'csv-stringify/sync'
import { load } from 'js-yaml'
import * as XLSX from 'xlsx'

import type { ConvertedItemsEdited, OpenApi, FileType } from '@/@types'
import { headers, FileType as FileTypeConst } from '@/constants'

import { convertOpenApiJsonToArray } from './openApi'

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

export const loadApiDocFromCsv = (path: string): ConvertedItemsEdited => {
  try {
    fs.accessSync(path, fs.constants.F_OK | fs.constants.R_OK)
  } catch (e) {
    throw new Error(`Error: ${path} does not exist or is not readable.`)
  }

  const text = readFileSync(path, 'utf-8')
  const records = parse(text, {
    columns: true,
    skip_empty_lines: true,
  }) as ConvertedItemsEdited

  return records
}

export const writeApiDocJsonToFile = (type: FileType, path: string, data: OpenApi) => {
  if (type === FileTypeConst.csv) {
    writeApiDocJsonToCsv(path, data)
  } else if (type === FileTypeConst.xlsx) {
    writeApiDocJsonToExcel(path, data)
  }
}

export const writeApiDocJsonToCsv = (path: string, data: OpenApi) => {
  const outputPath = join(process.cwd(), path)
  const csvData = convertOpenApiJsonToArray(data)
  const options = {
    header: true,
    columns: headers.map((header) => ({ key: header })),
  }
  const outputData = stringify(csvData, options)
  fs.writeFileSync(outputPath, outputData)
}

export const writeApiDocJsonToExcel = (path: string, data: OpenApi) => {
  const outputPath = join(process.cwd(), path)
  const outputData = convertOpenApiJsonToArray(data)

  /* generate worksheet and workbook */
  const worksheet = XLSX.utils.json_to_sheet(outputData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'API')

  /* fix headers */
  XLSX.utils.sheet_add_aoa(worksheet, [[...headers]], { origin: 'A1' })

  /* create an XLSX file and try to save to Presidents.xlsx */
  XLSX.writeFile(workbook, outputPath, { compression: true })
}

export const writeApiDocArrayToCsv = (path: string, data: ConvertedItemsEdited) => {
  const outputPath = join(process.cwd(), path)
  const options = {
    header: true,
    columns: Object.keys(data[0]).map((item) => ({ key: item })),
  }
  const outputData = stringify(data, options)
  fs.writeFileSync(outputPath, outputData)
}

export const getOutputFilePath = (inputPath: string, outputPath?: string): string => {
  if (outputPath) {
    return outputPath
  } else {
    return inputPath.replace(/(.yaml|.yml)/, '.xlsx')
  }
}

export const getOutputType = (outputPath?: string, type?: FileType): FileType => {
  if (type) {
    return type
  } else if (outputPath) {
    const regexp = /\.[a-z]*$/i
    const match = outputPath.match(regexp)
    const extension = (match && match[0]) as string
    return extension.substring(1) as FileType
  } else {
    return FileTypeConst.xlsx
  }
}
