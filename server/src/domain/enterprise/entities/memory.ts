import { Entity } from './entity'

import { Url, Description, IsPublic } from './value-object'
import { EntityId } from './value-object/entity-id'

export interface MemoryProps {
  description: Description
  coverUrl: Url
  ownerId: EntityId
  isPublic: IsPublic
  createdAt: Date
}

export interface MemoryCreateProps {
  description: string
  ownerId: string
  isPublic: boolean
  createdAt: Date
  coverUrl: string
}

export class Memory extends Entity<MemoryProps> {
  static create(props: MemoryCreateProps, id?: string) {
    return new Memory(
      {
        description: Description.create(props.description),
        coverUrl: Url.create(props.coverUrl),
        ownerId: EntityId.create(props.ownerId),
        isPublic: IsPublic.create(props.isPublic),
        createdAt: props.createdAt,
      },
      id,
    )
  }

  copyWith(props: Partial<MemoryProps>) {
    return new Memory(
      {
        description: props.description ?? this.props.description,
        coverUrl: props.coverUrl ?? this.props.coverUrl,
        ownerId: props.ownerId ?? this.props.ownerId,
        isPublic: props.isPublic ?? this.props.isPublic,
        createdAt: props.createdAt ?? this.props.createdAt,
      },
      this.id.toValue(),
    )
  }

  get description() {
    return this.props.description
  }

  get ownerId() {
    return this.props.ownerId
  }

  get isPublic() {
    return this.props.isPublic
  }

  get createdAt() {
    return this.props.createdAt
  }

  get coverUrl() {
    return this.props.coverUrl
  }
}
