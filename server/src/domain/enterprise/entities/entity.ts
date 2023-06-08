import { EntityId } from './value-object/entity-id'

export abstract class Entity<Props> {
  protected _id: EntityId
  protected props: Props

  protected constructor(props: Props, id?: string) {
    this._id = EntityId.create(id)
    this.props = props
  }

  abstract copyWith(props: Partial<Props>): any

  get id() {
    return this._id
  }
}
