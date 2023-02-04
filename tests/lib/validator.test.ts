import { isValidInputFile, isValidOutputFile } from '@/lib/validator'

describe('validator', () => {
  describe('isValidInputFile', () => {
    it('calls with valid input file', () => {
      expect(isValidInputFile('input.yaml')).toBeTruthy()
      expect(isValidInputFile('input.yml')).toBeTruthy()
      expect(isValidInputFile('dir/input.yaml')).toBeTruthy()
      expect(isValidInputFile('dir/dir2/input.yml')).toBeTruthy()
    })

    it('calls with invalid input file', () => {
      expect(isValidInputFile('dir/input.csv')).toBeFalsy()
      expect(isValidInputFile('dir/input.yaml1')).toBeFalsy()
      expect(isValidInputFile('dir/dir2/input.1yml')).toBeFalsy()
    })
  })

  describe('isValidOutputFile', () => {
    it('calls with valid output file', () => {
      expect(isValidOutputFile('output.csv')).toBeTruthy()
      expect(isValidOutputFile('dir/dir2/output.csv')).toBeTruthy()
    })

    it('calls with invalid output file', () => {
      expect(isValidOutputFile('dir/input.yaml')).toBeFalsy()
      expect(isValidOutputFile('dir/input.csv1')).toBeFalsy()
      expect(isValidOutputFile('dir/dir2/input.1csv')).toBeFalsy()
    })
  })
})
