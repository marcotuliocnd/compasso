import { StateValidator } from '../presentation/protocols/state-validator'

export class StateValidatorAdapter implements StateValidator {
  private readonly states = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RO', 'RS', 'RR', 'SC', 'SE', 'SP', 'TO']

  validator (state: string): boolean {
    return this.states.includes(state)
  }

  isValid (state: string): boolean {
    return this.validator(state)
  }
}
