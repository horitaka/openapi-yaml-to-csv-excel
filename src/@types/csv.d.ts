import type { Method } from './openapi.d'
export type Csv = CsvItem[]

type CsvItem = {
  openapi: string
  path: string
  summary: string
  description: string
  method: Method
  tags: string
  summaryMethod: string
  descriptionMethod: string
  operationId: string
}
