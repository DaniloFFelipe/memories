import { User } from '@/domain/enterprise'
import { User as PUser } from '@prisma/client'

export const UserMapper = {
  fromPrisma(user: PUser): User {
    return User.restore(
      {
        email: user.email,
        name: user.name,
        password: user.password,
        pictureUrl: user.pictureUrl,
      },
      user.id,
    )
  },
  toPrisma(user: User): PUser {
    return {
      id: user.id.toValue(),
      email: user.email.toValue(),
      name: user.name.toValue(),
      password: user.password.toValue(),
      pictureUrl: user.pictureUrl.toValue(),
    }
  },
}
