import { z } from 'zod'
import { ValueObject } from './value-object'
import { InvalidResource } from '../../erros/invalid-resource'

const validator = z.string().email()

export class Email extends ValueObject<string> {
  private constructor(value: string) {
    super()

    const check = validator.safeParse(value)
    if (!check.success) throw new InvalidResource('invalid-email')

    this.value = value
  }

  static create(value: string) {
    return new Email(value)
  }
}
