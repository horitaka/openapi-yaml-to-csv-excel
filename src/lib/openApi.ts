import type { OpenApi, Csv, Method, CsvItem } from '@/@types'
import { methods } from '@/constants'

export const convertOpenApiJsonToCsv = (jsonData: OpenApi): Csv => {
  const pathData = jsonData.paths
  if (!pathData) return []

  const result = [] as Csv
  for (const [path, pathItem] of Object.entries(pathData)) {
    methods.forEach((method: Method) => {
      const methodItem = pathItem[method]
      if (!methodItem) return

      result.push({
        path: path,
        summary: pathItem.summary || '',
        description: pathItem.description || '',
        method: method,
        tags: methodItem.tags ? methodItem.tags.join(' ') : '',
        summaryMethod: methodItem.summary || '',
        descriptionMethod: methodItem.description || '',
        operationId: methodItem.operationId || '',
      })
    })
  }
  return result
}

export const convertOpenApiCsvToJson = (csvData: Csv): OpenApi => {
  const result = csvData.reduce(
    (prev: OpenApi, current: CsvItem): OpenApi => {
      const path = current?.path
      if (!path) return prev

      if (!prev.paths?.[path]) {
        prev.paths = {
          ...prev.paths,
          [path]: {
            summary: current.summary,
            description: current.description,
          },
        }
      }
      prev.paths[path] = {
        ...prev.paths[path],
        [current.method]: {
          tags: current.tags.split(' '),
          summary: current.summaryMethod,
          description: current.descriptionMethod,
          operationId: current.operationId,
        },
      }

      return prev
    },
    { openapi: '3.0.0' } // TODO
  )

  return result
}

export const updateApiDoc = (newDoc: OpenApi, oldDoc: OpenApi): OpenApi => {
  return { openapi: '' }
}
