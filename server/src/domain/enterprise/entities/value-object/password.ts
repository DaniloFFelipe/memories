import { compare, hashSync } from 'bcrypt'
import { ValueObject } from './value-object'
import { InvalidResource } from '../../erros/invalid-resource'

export class Password extends ValueObject<string> {
  private constructor(value: string, restore: boolean = false) {
    super()
    if (restore) {
      this.value = value
    } else {
      if (value.length < 6) throw new InvalidResource('password-invalid-length')
      this.value = hashSync(value, 10)
    }
  }

  async compare(password: string) {
    return await compare(password, this.value)
  }

  static create(value: string) {
    return new Password(value)
  }

  static restore(value: string) {
    return new Password(value, true)
  }
}
