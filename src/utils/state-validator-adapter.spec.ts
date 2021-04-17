import { StateValidatorAdapter } from './state-validator-adapter'

const makeSut = (): StateValidatorAdapter => {
  return new StateValidatorAdapter()
}

describe('StateValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    const isValid = sut.isValid('invalid_state')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    jest.spyOn(sut, 'validator').mockImplementationOnce(() => true)

    const isValid = sut.isValid('any_state')
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct values', () => {
    const sut = makeSut()
    const validatorSpy = jest.spyOn(sut, 'validator').mockImplementationOnce(() => true)

    sut.isValid('any_state')
    expect(validatorSpy).toHaveBeenCalledWith('any_state')
  })
})
