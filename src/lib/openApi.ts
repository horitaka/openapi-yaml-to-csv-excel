import type { OpenApi, Csv, Method, CsvItem, CsvEdited } from '@/@types'
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
        openapi: jsonData.openapi,
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
  const result = csvData.reduce((prev: OpenApi, current: CsvItem): OpenApi => {
    const path = current?.path
    if (!path) return prev

    if (!prev.openapi) {
      prev.openapi = current.openapi
    }

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
  }, {} as OpenApi)

  return result
}

export const updateApiDoc = (newDoc: OpenApi, oldDoc: CsvEdited): CsvEdited => {
  const pathData = newDoc.paths
  if (!pathData) return oldDoc

  // Filter CsvEdited by operationIds in newDoc
  const operationIds: string[] = []
  Object.values(pathData).forEach((pathItem) => {
    methods.forEach((method: Method) => {
      const methodItem = pathItem[method]
      if (methodItem && methodItem.operationId) {
        operationIds.push(methodItem.operationId)
      }
    })
  })
  const updatedDoc = oldDoc.filter((doc) => operationIds.includes(doc.operationId))

  // Update oldDoc
  for (const [path, pathItem] of Object.entries(pathData)) {
    methods.forEach((method: Method) => {
      const methodItem = pathItem[method]
      if (!methodItem) return

      const index = updatedDoc.findIndex((doc) => doc.operationId === methodItem.operationId)
      const newCsvItem = {
        openapi: newDoc.openapi,
        path: path,
        summary: pathItem.summary || '',
        description: pathItem.description || '',
        method: method,
        tags: methodItem.tags ? methodItem.tags.join(' ') : '',
        summaryMethod: methodItem.summary || '',
        descriptionMethod: methodItem.description || '',
        operationId: methodItem.operationId || '',
      }
      if (index >= 0) {
        updatedDoc[index] = {
          ...oldDoc[index], // If newDoc's operationId exists in oldDoc, keep user added columns.
          ...newCsvItem, // Only update newDoc's columns.
        }
      } else {
        updatedDoc.push(newCsvItem)
      }
    })
  }

  // Sort in the same order as operationId in input yaml file
  updatedDoc.sort(
    (prev, next) => operationIds.indexOf(prev.operationId) - operationIds.indexOf(next.operationId)
  )

  return updatedDoc
}
