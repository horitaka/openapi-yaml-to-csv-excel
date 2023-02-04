import { OpenApi, Csv, Method } from '@/@types'
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
