import { CreateUser, IUserRepository, UpdateUser } from '../domain/user.types';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@generated/prisma/client';
import { User } from '../domain/user';
import { UserMapper } from './user.mapper';
import { PrismaService } from '@/common/prisma/prisma.service';

export const USER_SELECT = {
  id: true,
  name: true,
  email: true,
} satisfies Prisma.UserSelect;

export type UserSelect = Prisma.UserGetPayload<{
  select: typeof USER_SELECT;
}>;

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      select: USER_SELECT,
    });
    return UserMapper.fromDbToDomainMany(users);
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user ? UserMapper.fromDbToDomain(user) : null;
  }

  async create(user: CreateUser): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
      },
    });

    return UserMapper.fromDbToDomain(createdUser);
  }

  async update(userId: string, user: UpdateUser): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      data: user,
      where: {
        id: userId,
      },
    });

    return UserMapper.fromDbToDomain(updatedUser);
  }
}
