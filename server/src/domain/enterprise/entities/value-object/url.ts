import { z } from 'zod'
import { ValueObject } from './value-object'
import { InvalidResource } from '../../erros/invalid-resource'

const validator = z.string().url()

export class Url extends ValueObject<string> {
  private constructor(value: string) {
    super()

    const check = validator.safeParse(value)
    if (!check.success) throw new InvalidResource('invalid-url')

    this.value = value
  }

  static create(value: string) {
    return new Url(value)
  }
}
