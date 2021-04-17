import { StateValidatorAdapter } from './state-validator-adapter'

describe('StateValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new StateValidatorAdapter()
    const isValid = sut.isValid('invalid_state')
    expect(isValid).toBe(false)
  })

  test('Should return t if validator returns false', () => {
    const sut = new StateValidatorAdapter()
    const isValid = sut.isValid('invalid_state')
    expect(isValid).toBe(false)
  })
})
