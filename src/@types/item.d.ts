import type { Method } from './openapi.d'

export type ConvertedItems = ConvertedItem[]
export type ConvertedItemsEdited = ConvertedItemEdited[]

type ConvertedItem = {
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

type ConvertedItemEdited = ConvertedItem & { [key: string]: string }
