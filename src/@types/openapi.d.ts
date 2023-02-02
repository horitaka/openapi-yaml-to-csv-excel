export type OpenApi = {
  openapi: string
  paths?: PathObject
}

export type PathObject = {
  [key: string]: PathItemObject
}

export type PathItemObject = {
  summary?: string
  description?: string
  get?: OperationObject
  put?: OperationObject
  post?: OperationObject
  delete?: OperationObject
  options?: OperationObject
  head?: OperationObject
  patch?: OperationObject
  trace?: OperationObject
}

export type OperationObject = {
  tags?: string[]
  summary?: string
  description?: string
  operationId?: string
}
