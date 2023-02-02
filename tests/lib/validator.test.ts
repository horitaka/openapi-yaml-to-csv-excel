import { isValidInputFile } from '@/lib/validator'

describe('validator', () => {
  it('return true', () => {
    expect(isValidInputFile()).toBe(true)
  })
})
