import { User } from './user';

export interface CreateUser {
  name: string;
  email: string;
}

export interface UpdateUser {
  name?: string;
  email?: string;
}

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(userId: string): Promise<User | null>;
  create(user: CreateUser): Promise<User>;
  update(userId: string, user: UpdateUser): Promise<User>;
}
