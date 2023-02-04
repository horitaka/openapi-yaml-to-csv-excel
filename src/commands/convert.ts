import type { Arguments, Argv } from 'yargs'

import { getOutputFilePath, loadApiDocFromYaml, writeApiDocToCsv } from '@/lib/fileio'

type ConvertOptions = {
  input: string
  output?: string
}

export const command = 'convert'
export const desc = 'Create an empty repo'
export const builder = (yargs: Argv<ConvertOptions>): Argv<ConvertOptions> =>
  yargs
    .options({
      input: {
        alias: 'i',
        type: 'string',
        demandOption: true,
        description: 'Input yaml file name.',
      },
      output: {
        alias: 'o',
        type: 'string',
        demandOption: false,
        description: 'Output csv/excel file name.',
      },
    })
    .check(isValidInputFile)
export const handler = (args: Arguments<ConvertOptions>) => {
  const apiDocJson = loadApiDocFromYaml(args.input)
  const outputPath = getOutputFilePath(args.input, args.output)
  writeApiDocToCsv(outputPath, apiDocJson)
}

const isValidInputFile = (argv: ConvertOptions): boolean => {
  return true
}
