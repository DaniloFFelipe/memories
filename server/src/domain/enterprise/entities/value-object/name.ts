import { InvalidResource } from '../../erros/invalid-resource'
import { ValueObject } from './value-object'

export class Name extends ValueObject<string> {
  private constructor(value: string) {
    super()

    if (value.length < 3) throw new InvalidResource('name-invalid-length')
    this.value = value
  }

  static create(value: string) {
    return new Name(value)
  }
}
