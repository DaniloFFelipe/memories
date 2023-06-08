import { Entity } from './entity'

import { Name, Email, Password, Url } from './value-object'

export interface UserProps {
  name: Name
  email: Email
  password: Password
  pictureUrl: Url
}

export interface UserCreateProps {
  name: string
  email: string
  password: string
  pictureUrl: string
}

export class User extends Entity<UserProps> {
  static create(
    { email, name, password, pictureUrl }: UserCreateProps,
    id?: string,
  ) {
    return new User(
      {
        email: Email.create(email),
        name: Name.create(name),
        password: Password.create(password),
        pictureUrl: Url.create(pictureUrl),
      },
      id,
    )
  }

  static restore(
    { email, name, password, pictureUrl }: UserCreateProps,
    id?: string,
  ) {
    return new User(
      {
        email: Email.create(email),
        name: Name.create(name),
        password: Password.restore(password),
        pictureUrl: Url.create(pictureUrl),
      },
      id,
    )
  }

  copyWith(props: Partial<UserProps>) {
    return new User({
      ...this.props,
      ...props,
    })
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get pictureUrl() {
    return this.props.pictureUrl
  }
}
