import { User as PUser } from '@prisma/client'

import { FindBy } from '@/core'
import { UserRepository } from '@/domain/application'
import { UserProps, User } from '@/domain/enterprise'
import { prisma } from '@/infra/lib/prisma'
import { UserMapper } from '@/infra/mappers'

export class PrismaUserRepository implements UserRepository {
  async findBy(field: FindBy<UserProps>, value: string): Promise<User | null> {
    const where = { [field]: value }
    let user: PUser | null = null

    if (field === 'id' || field === 'email') {
      user = await prisma.user.findUnique({
        where,
      })
    } else {
      user = await prisma.user.findFirst({
        where,
      })
    }

    return !user ? null : UserMapper.fromPrisma(user)
  }

  async findManyBy(field: FindBy<UserProps>, value: string): Promise<User[]> {
    const where = { [field]: value }

    const user = await prisma.user.findMany({
      where,
    })

    return user.map(UserMapper.fromPrisma)
  }

  async save(user: User): Promise<void> {
    await prisma.user.update({
      where: {
        id: user.id.toValue(),
      },
      data: UserMapper.toPrisma(user),
    })
  }

  async create(user: User): Promise<void> {
    await prisma.user.create({
      data: UserMapper.toPrisma(user),
    })
  }
}
