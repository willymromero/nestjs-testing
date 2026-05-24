import { NotFoundError } from 'rxjs';
import { CreateUser, IUserRepository, UpdateUser } from '../domain/user.types';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async finAll() {
    return this.userRepository.findAll();
  }

  async findById(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (user === null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async createUser(user: CreateUser) {
    return await this.userRepository.create(user);
  }

  async updateUser(userId: string, user: UpdateUser) {
    await this.findById(userId);
    return await this.userRepository.update(userId, user);
  }
}
