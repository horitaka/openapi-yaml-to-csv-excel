import { isValidInputFile } from './validator'

describe('validator', () => {
  it('return true', () => {
    expect(isValidInputFile()).toBe(true)
  })
})
