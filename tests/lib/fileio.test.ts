import fs from 'fs'
import path from 'path'

import {
  getOutputFilePath,
  loadApiDocFromYaml,
  loadApiDocFromCsv,
  writeApiDocJsonToCsv,
  writeApiDocArrayToCsv,
  writeApiDocJsonToExcel,
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

  describe('writeApiDocJsonToCsv', () => {
    it('output csv', () => {
      const fileName = 'output.csv'

      writeApiDocJsonToCsv(fileName, sampleOpenApiJson)

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
    it.only('output excel', () => {
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
      const outputPath = 'input.csv'

      const actual = getOutputFilePath(inputPath)
      expect(actual).toBe(outputPath)

      const actual2 = getOutputFilePath(inputPath2)
      expect(actual2).toBe(outputPath)
    })
  })
})
