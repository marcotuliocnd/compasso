import { StateValidatorAdapter } from './state-validator-adapter'

describe('StateValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new StateValidatorAdapter()
    const isValid = sut.isValid('invalid_state')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = new StateValidatorAdapter()
    jest.spyOn(sut, 'validator').mockImplementationOnce(() => true)

    const isValid = sut.isValid('any_state')
    expect(isValid).toBe(true)
  })
})
