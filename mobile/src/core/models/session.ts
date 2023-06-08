import { Model } from './model'

export interface SessionProps {
  token: string
}

export class Session extends Model<SessionProps> {
  get token() {
    return this.props.token
  }

  static create(props: SessionProps) {
    return new Session(props)
  }
}
