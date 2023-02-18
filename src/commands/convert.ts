import type { Arguments, Argv } from 'yargs'

import type { ConvertOptions } from '@/@types'
import {
  getOutputFilePath,
  getOutputType,
  loadApiDocFromYaml,
  writeApiDocJsonToFile,
} from '@/lib/fileio'
import { isValidInputFile, isValidOutputFile } from '@/lib/validator'

export const command = 'convert'
export const desc = 'Create OpenAPI YAML file to CSV/Excel file.'
export const builder = (yargs: Argv<ConvertOptions>): Argv<ConvertOptions> =>
  yargs
    .options({
      input: {
        alias: 'i',
        type: 'string',
        demandOption: true,
        description: 'Input yaml file name',
      },
      output: {
        alias: 'o',
        type: 'string',
        demandOption: false,
        description: 'Output csv/excel file name',
      },
    })
    .check((argv) => {
      if (isValidInputFile(argv.input)) {
        return true
      } else {
        throw new Error('Invalid input file name. Allowed input file is .yaml or .yml.')
      }
    })
    .check((argv) => {
      if (isValidOutputFile(argv.output)) {
        return true
      } else {
        throw new Error('Invalid output file name. Allowed output file is .csv or .xlsx')
      }
    })
export const handler = (args: Arguments<ConvertOptions>) => {
  try {
    const apiDocJson = loadApiDocFromYaml(args.input)
    const outputPath = getOutputFilePath(args.input, args.output)
    const outputType = getOutputType(args.output)
    writeApiDocJsonToFile(outputType, outputPath, apiDocJson)
    console.log(`🎉Successfully converted ${args.input} to ${outputPath}.`)
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}
