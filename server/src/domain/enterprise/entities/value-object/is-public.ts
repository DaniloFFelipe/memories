import { ValueObject } from './value-object'

export class IsPublic extends ValueObject<boolean> {
  private constructor(value?: boolean) {
    super()
    this.value = value ?? false
  }

  static create(value: boolean) {
    return new IsPublic(value)
  }
}
