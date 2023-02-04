export type Csv = CsvItem[]
type CsvItem = {
  path: string
  summary: string
  description: string
  method:
    | 'get'
    | 'put'
    | 'post'
    | 'delete'
    | 'options'
    | 'head'
    | 'patch'
    | 'trace'
  tags: string
  summaryMethod: string
  descriptionMethod: string
  operationId: string
}
