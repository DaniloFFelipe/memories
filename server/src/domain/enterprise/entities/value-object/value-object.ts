export abstract class ValueObject<T> {
  protected value!: T

  toValue(): T {
    return this.value
  }
}
