import { InvalidResource } from '../../erros/invalid-resource'
import { ValueObject } from './value-object'

export class Description extends ValueObject<string> {
  private constructor(value: string) {
    super()

    if (value.length >= 255)
      throw new InvalidResource('description-invalid-length')
    this.value = value
  }

  static create(value: string) {
    return new Description(value)
  }
}
