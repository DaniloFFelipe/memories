import { FindBy } from '@/core'
import { User, UserProps } from '../../enterprise/entities/user'

export interface UserRepository {
  findBy(field: FindBy<UserProps>, value: string): Promise<User | null>
  findManyBy(field: FindBy<UserProps>, value: string): Promise<User[]>

  save(user: User): Promise<void>
  create(user: User): Promise<void>
}
