import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { UserController } from './infrastructure/user.controller';
import { UserRepository } from './infrastructure/users.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    UsersService,
  ],
  controllers: [UserController],
})
export class UsersModule {}
