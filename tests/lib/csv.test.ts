import { convertOpenApiJsonToCsv } from '@/lib/csv'
import { sampleOpenApiJson } from '../fixtures/openApiJson'

describe('lib/csv', () => {
  describe('convertOpenApiJsonToCsv', () => {
    it.only('convert to csv', () => {
      const actual = convertOpenApiJsonToCsv(sampleOpenApiJson)
      const expected = [
        {
          path: '/pets',
          summary: 'Pets resources',
          description: 'Pets resources description',
          method: 'get',
          tags: 'pets',
          summaryMethod: 'List all pets',
          descriptionMethod: 'List all pets description',
          operationId: 'listPets',
        },
        {
          path: '/pets',
          summary: 'Pets resources',
          description: 'Pets resources description',
          method: 'post',
          tags: 'pets',
          summaryMethod: 'Create a pet',
          descriptionMethod: 'Create a pet description',
          operationId: 'createPets',
        },
        {
          path: '/pets/{petId}',
          summary: 'Pets resources by id',
          description: 'Pets resources by id description',
          method: 'get',
          tags: 'pets',
          summaryMethod: 'Info for a specific pet',
          descriptionMethod: 'Info for a specific pet description',
          operationId: 'showPetById',
        },
      ]

      expect(actual).toEqual(expected)
    })
  })
})
