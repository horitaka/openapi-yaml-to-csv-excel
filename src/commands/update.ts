import type { Arguments, Argv } from 'yargs'

import type { UpdateOptions } from '@/@types'
import {
  getOutputFilePath,
  loadApiDocFromCsv,
  loadApiDocFromYaml,
  writeApiDocArrayToCsv,
} from '@/lib/fileio'
import { updateApiDoc } from '@/lib/openApi'
import { isValidInputFile, isValidOutputFile, isValidUpdateFile } from '@/lib/validator'

export const command = 'update'
export const desc = 'Update OpenAPI YAML file to CSV/Excel file.'
export const builder = (yargs: Argv<UpdateOptions>): Argv<UpdateOptions> =>
  yargs
    .options({
      input: {
        alias: 'i',
        type: 'string',
        demandOption: true,
        description: 'Input yaml file name',
      },
      update: {
        alias: 'u',
        type: 'string',
        demandOption: true,
        description: 'Update existing csv/excel file name',
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
      if (isValidUpdateFile(argv.update)) {
        return true
      } else {
        throw new Error('Invalid update file name. Allowed update file is .csv')
      }
    })
    .check((argv) => {
      if (isValidOutputFile(argv.output)) {
        return true
      } else {
        throw new Error('Invalid output file name. Allowed output file is .csv')
      }
    })
export const handler = (args: Arguments<UpdateOptions>) => {
  try {
    const apiDocJsonNew = loadApiDocFromYaml(args.input)
    const apiDocCsvOld = loadApiDocFromCsv(args.update)
    const apiDocCsvUpdated = updateApiDoc(apiDocJsonNew, apiDocCsvOld)
    const outputPath = getOutputFilePath(args.input, args.output)
    writeApiDocArrayToCsv(outputPath, apiDocCsvUpdated)
    console.log(`🎉Successfully updated ${args.update} to ${outputPath}.`)
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}
