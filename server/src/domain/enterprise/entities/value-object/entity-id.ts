import { randomUUID } from 'node:crypto'
import { ValueObject } from './value-object'

export class EntityId extends ValueObject<string> {
  static create(id?: string) {
    return new EntityId(id)
  }

  private constructor(id?: string) {
    super()
    if (id) {
      this.value = id
    } else {
      this.value = randomUUID()
    }
  }
}
