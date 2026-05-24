import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUser } from '../domain/user.types';
import { UserResponseDto } from './user-res.dto';
import { UsersService } from '../application/users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userService.finAll();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  }

  @Get(':userId')
  async findById(@Param('userId') userId: string): Promise<UserResponseDto> {
    const user = await this.userService.findById(userId);
    const formattedUser: UserResponseDto = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    return formattedUser;
  }

  @Post(':userId')
  async create(
    @Param('userId') userId: string,
    @Body() user: CreateUser,
  ): Promise<UserResponseDto> {
    const cratedUser = await this.userService.createUser(user);
    const formattedUser: UserResponseDto = {
      id: cratedUser.id,
      name: cratedUser.name,
      email: cratedUser.email,
    };
    return formattedUser;
  }

  @Put(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() user: CreateUser,
  ): Promise<UserResponseDto> {
    const update = await this.userService.updateUser(userId, user);
    const formattedUser: UserResponseDto = {
      id: update.id,
      name: update.name,
      email: update.email,
    };
    return formattedUser;
  }
}
