import { StateValidator } from '../presentation/protocols/state-validator'

export class StateValidatorAdapter implements StateValidator {
  isValid (state: string): boolean {
    return false
  }
}
