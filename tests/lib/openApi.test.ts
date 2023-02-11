import { convertOpenApiJsonToCsv, convertOpenApiCsvToJson } from '@/lib/openApi'

import { sampleOpenApiJson, sampleOpenApiCsv } from '../fixtures/openApiJson'

describe('lib/csv', () => {
  describe('convertOpenApiJsonToCsv', () => {
    it('convert to csv', () => {
      const actual = convertOpenApiJsonToCsv(sampleOpenApiJson)
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
})
