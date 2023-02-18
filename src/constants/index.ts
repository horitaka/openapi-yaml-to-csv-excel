export const methods = [
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace',
] as const

export const headers = [
  'openapi',
  'path',
  'summary',
  'description',
  'method',
  'tags',
  'summaryMethod',
  'descriptionMethod',
  'operationId',
] as const

export const FileType = {
  csv: 'csv',
  xlsx: 'xlsx',
} as const
