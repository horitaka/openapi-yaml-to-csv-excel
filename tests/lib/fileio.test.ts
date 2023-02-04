import fs from 'fs'
import path from 'path'

import { loadApiDocFromYaml, writeApiDocToCsv } from '@/lib/fileio'

import { sampleOpenApiJson } from '../fixtures/openApiJson'

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
  })
})

describe('lib/fileio', () => {
  describe('writeApiDocToCsv', () => {
    it('output csv', () => {
      const fileName = 'output.csv'

      writeApiDocToCsv(fileName, sampleOpenApiJson)

      const filePath = path.join(process.cwd(), fileName)
      expect(fs.existsSync(filePath)).toBeTruthy()

      fs.unlinkSync(filePath)
    })
  })
})
