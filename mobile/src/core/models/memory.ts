import { Model } from './model'

export interface MemoryProps {
  id: string
  description: string
  ownerId: string
  isPublic: boolean
  createdAt: Date
  coverUrl: string
}

export class Memory extends Model<MemoryProps> {
  static create(props: MemoryProps) {
    return new Memory(props)
  }

  get id() {
    return this.props.id
  }

  get description() {
    return this.props.description
  }

  get shortDescription() {
    return this.props.description.substring(0, 120)
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
