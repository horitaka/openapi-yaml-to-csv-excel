import path from 'path'
import { loadApiDocFromYaml } from '@/lib/fileio'

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
