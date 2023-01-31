import type { Arguments, Argv } from 'yargs'

type Options = {
  input: string
  output?: string
}

export const command = 'convert'
export const desc = 'Create an empty repo'
export const builder = (yargs: Argv<Options>): Argv<Options> =>
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
export const handler = (args: any) => {
  console.log('convert')
}

const isValidInputFile = (argv: Options): boolean => {
  return true
}
