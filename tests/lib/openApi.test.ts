import { convertOpenApiJsonToArray, convertOpenApiCsvToJson, updateApiDoc } from '@/lib/openApi'

import {
  sampleOpenApiJson,
  sampleOpenApiCsv,
  sampleOpenApiCsvUpdated,
  sampleOpenApiJsonUpdated,
} from '../fixtures/openApiJson'

describe('lib/csv', () => {
  describe('convertOpenApiJsonToCsv', () => {
    it('convert to csv', () => {
      const actual = convertOpenApiJsonToArray(sampleOpenApiJson)
      const expected = sampleOpenApiCsv
      expect(actual).toEqual(expected)
    })
  })

  describe('convertOpenApiCsvToJson', () => {
    it('convert to json', () => {
      const actual = convertOpenApiCsvToJson(sampleOpenApiCsv)
      const expected = sampleOpenApiJson
      expect(actual).toEqual(expected)
    })
  })

  describe('updateApiDoc', () => {
    it('updateApiDoc API doc', () => {
      const actual = updateApiDoc(sampleOpenApiJsonUpdated, sampleOpenApiCsvUpdated)
      const expected = sampleOpenApiCsvUpdated
      expect(actual).toEqual(expected)
    })
  })
})
