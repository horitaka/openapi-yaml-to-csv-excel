import type { FileType } from '@/constants'

export type ConvertOptions = {
  input: string
  output?: string
}

export type UpdateOptions = {
  input: string
  update: string
  output?: string
}

export type FileType = (typeof FileType)[keyof typeof FileType]
