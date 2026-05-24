import { User } from '../domain/user';
import { UserSelect } from './users.repository';

export class UserMapper {
  static fromDbToDomain(dbUser: UserSelect): User {
    return {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
    };
  }

  static fromDbToDomainMany(dbUsers: UserSelect[]): User[] {
    return dbUsers.map(this.fromDbToDomain);
  }
}
