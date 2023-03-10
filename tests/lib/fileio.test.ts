import fs from 'fs'
import path from 'path'

import {
  getOutputFilePath,
  loadApiDocFromYaml,
  loadApiDocFromCsv,
  loadApiDocFromExcel,
  writeApiDocJsonToCsv,
  writeApiDocArrayToExcel,
  writeApiDocArrayToCsv,
  writeApiDocJsonToExcel,
  getOutputType,
  getFileExtension,
} from '@/lib/fileio'

import { sampleOpenApiJson, sampleOpenApiCsv } from '../fixtures/openApiJson'

describe('lib/fieio', () => {
  describe('loadApiDocFromYaml', () => {
    it('should return OpenAPI spec in JSON object', () => {
      const filePath = path.join(process.cwd(), 'tests', 'fixtures', 'api.yaml')
      const data = loadApiDocFromYaml(filePath)

      const petsActual = data?.paths?.['/pets']
      const petsExpected = {
        get: {
          summary: 'List all pets',
          operationId: 'listPets',
          tags: ['pets'],
        },
        post: {
          summary: 'Create a pet',
          operationId: 'createPets',
          tags: ['pets'],
        },
      }
      expect(petsActual).toBeDefined()
      expect(petsActual).toMatchObject(petsExpected)

      const petsByIdActual = data?.paths?.['/pets/{petId}']
      const petsByIdExpected = {
        get: {
          summary: 'Info for a specific pet',
          operationId: 'showPetById',
          tags: ['pets'],
        },
      }
      expect(petsByIdActual).toBeDefined()
      expect(petsByIdActual).toMatchObject(petsByIdExpected)
    })

    it('throw error, no input file', () => {
      const filePath = path.join('nofile.yaml')
      const result = new Error('Error: nofile.yaml does not exist or is not readable.')
      expect(() => {
        loadApiDocFromYaml(filePath)
      }).toThrow(result)
    })

    it('throw error, no input file', () => {
      const filePath = path.join(process.cwd(), 'tests', 'fixtures', 'invalid.yaml')
      const result = new Error(`Error: ${filePath} is not a valid yaml file.`)
      expect(() => {
        loadApiDocFromYaml(filePath)
      }).toThrow(result)
    })
  })

  describe('loadApiDocFromCsv', () => {
    it('loads csv and return OpeAPI JSON object', () => {
      const filePath = path.join(process.cwd(), 'tests', 'fixtures', 'api.csv')
      const actual = loadApiDocFromCsv(filePath)
      const expected = sampleOpenApiCsv
      expect(actual).toEqual(expected)
    })

    it('throw error, no input file', () => {
      const filePath = path.join('nofile.csv')
      const result = new Error('Error: nofile.csv does not exist or is not readable.')
      expect(() => {
        loadApiDocFromCsv(filePath)
      }).toThrow(result)
    })
  })

  describe('loadApiDocFromExcel', () => {
    it('loads csv and return OpeAPI JSON object', () => {
      const filePath = path.join(process.cwd(), 'tests', 'fixtures', 'api.xlsx')
      const actual = loadApiDocFromExcel(filePath)
      const expected = sampleOpenApiCsv
      expect(actual).toEqual(expected)
    })

    it('throw error, no input file', () => {
      const filePath = path.join('nofile.xlsx')
      const result = new Error('Error: nofile.xlsx does not exist or is not readable.')
      expect(() => {
        loadApiDocFromExcel(filePath)
      }).toThrow(result)
    })
  })

  describe('writeApiDocJsonToCsv', () => {
    it('output csv', () => {
      const fileName = 'output.csv'

      writeApiDocJsonToCsv(fileName, sampleOpenApiJson)

      const filePath = path.join(process.cwd(), fileName)
      expect(fs.existsSync(filePath)).toBeTruthy()

      fs.unlinkSync(filePath)
    })
  })

  describe('writeApiDocArrayToExcel', () => {
    it('output excel', () => {
      const fileName = 'output.xlsx'

      writeApiDocArrayToExcel(fileName, sampleOpenApiCsv)

      const filePath = path.join(process.cwd(), fileName)
      expect(fs.existsSync(filePath)).toBeTruthy()

      fs.unlinkSync(filePath)
    })
  })

  describe('writeApiDocJsonToCsv', () => {
    it('output csv', () => {
      const fileName = 'output.csv'

      writeApiDocArrayToCsv(fileName, sampleOpenApiCsv)

      const filePath = path.join(process.cwd(), fileName)
      expect(fs.existsSync(filePath)).toBeTruthy()

      fs.unlinkSync(filePath)
    })
  })

  describe('writeApiDocJsonToExcel', () => {
    it('output excel', () => {
      const fileName = 'output.xlsx'

      writeApiDocJsonToExcel(fileName, sampleOpenApiJson)

      const filePath = path.join(process.cwd(), fileName)
      expect(fs.existsSync(filePath)).toBeTruthy()

      fs.unlinkSync(filePath)
    })
  })

  describe('getOutputFilePath', () => {
    it('receive and return output file path', () => {
      const inputPath = 'input.yaml'
      const outputPath = 'output.csv'

      const actual = getOutputFilePath(inputPath, outputPath)

      expect(actual).toBe(outputPath)
    })

    it('receive no output file path and return input file path', () => {
      const inputPath = 'input.yaml'
      const inputPath2 = 'input.yml'
      const outputPath = 'input.xlsx'

      const actual = getOutputFilePath(inputPath)
      expect(actual).toBe(outputPath)

      const actual2 = getOutputFilePath(inputPath2)
      expect(actual2).toBe(outputPath)
    })
  })

  describe('getOutputType', () => {
    it('receive input file and return xlsx', () => {
      const actual = getOutputType()
      expect(actual).toBe('xlsx')
    })

    it('receive input file, output csv file and return csv', () => {
      const outputPath = 'output.csv'
      const actual = getOutputType(outputPath)
      expect(actual).toBe('csv')
    })

    it('receive input file, output xlsx file and return xlsx', () => {
      const outputPath = 'output.xlsx'
      const actual = getOutputType(outputPath)
      expect(actual).toBe('xlsx')
    })

    it('receive input file, output file, filet type and return file type', () => {
      const outputPath = 'output.xlsx'
      const fileType = 'csv'
      const actual = getOutputType(outputPath, fileType)
      expect(actual).toBe('csv')
    })
  })
  describe('getFileExtension', () => {
    it('receive csv file and return csv', () => {
      const path = 'dir/file.csv'
      const actual = getFileExtension(path)
      expect(actual).toBe('csv')
    })

    it('receive csv xlsx and return xlsx', () => {
      const path = 'dir/file.xlsx'
      const actual = getFileExtension(path)
      expect(actual).toBe('xlsx')
    })
  })
})
